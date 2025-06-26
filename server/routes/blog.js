const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const pool = require('../db');


// Rate limiting for blog operations
const blogReadLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later.' }
});

const blogWriteLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { success: false, message: 'Too many write requests, please try again later.' }
});

// Validation middleware
const validateBlogPost = [
  body('title').trim().isLength({ min: 5, max: 200 }).withMessage('Title must be between 5 and 200 characters'),
  body('excerpt').trim().isLength({ min: 10, max: 500 }).withMessage('Excerpt must be between 10 and 500 characters'),
  body('content').trim().isLength({ min: 50 }).withMessage('Content must be at least 50 characters'),
  body('category').trim().isLength({ min: 2, max: 50 }).withMessage('Category must be between 2 and 50 characters'),
  body('tags').isArray({ min: 1, max: 10 }).withMessage('Tags must be an array with 1-10 items'),
  body('tags.*').trim().isLength({ min: 1, max: 30 }).withMessage('Each tag must be between 1 and 30 characters')
];

// Helper function to calculate read time
function calculateReadTime(content) {
  const wordsPerMinute = 200;
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const readTime = Math.ceil(words / wordsPerMinute);
  return `${readTime} min read`;
}

// GET /api/blog - Fetch blog posts from PostgreSQL
router.get('/', blogReadLimit, async (req, res) => {
  try {
    const { category, tag, limit, offset, search } = req.query;

    // Build base query
    let query = `SELECT * FROM blog_posts WHERE published = true`;
    const params = [];
    let paramIndex = 1;

    // Filtering
    if (category && category !== 'All') {
      query += ` AND LOWER(category) = LOWER($${paramIndex++})`;
      params.push(category);
    }

    if (tag) {
      query += ` AND $${paramIndex++} = ANY(tags)`;
      params.push(tag);
    }

    if (search) {
      query += ` AND (LOWER(title) LIKE LOWER($${paramIndex}) OR LOWER(excerpt) LIKE LOWER($${paramIndex}) OR LOWER(content) LIKE LOWER($${paramIndex}))`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    // Ordering
    query += ` ORDER BY created_at DESC`;

    // Pagination
    const limitNum = parseInt(limit) || 100;
    const offsetNum = parseInt(offset) || 0;
    query += ` LIMIT $${paramIndex++} OFFSET $${paramIndex}`;
    params.push(limitNum, offsetNum);

    const result = await pool.query(query, params);

    // Fetch all categories and tags
    const catResult = await pool.query(
      `SELECT DISTINCT category FROM blog_posts WHERE published = true`
    );
    const tagResult = await pool.query(
      `SELECT DISTINCT UNNEST(tags) AS tag FROM blog_posts WHERE published = true`
    );

    res.json({
      success: true,
      data: {
        posts: result.rows,
        totalPosts: result.rowCount,
        categories: catResult.rows.map(r => r.category),
        tags: [...new Set(tagResult.rows.map(r => r.tag))],
        pagination: {
          limit: limitNum,
          offset: offsetNum,
          hasMore: result.rowCount === limitNum
        }
      }
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog posts'
    });
  }
});

// GET /api/blog/:id - Get a single blog post and increment views
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const client = await pool.connect();

    const result = await pool.query(
        'SELECT * FROM blog_posts WHERE id = $1',
        [id]
    );

    client.release();

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (err) {
    console.error('Error fetching blog post by ID:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog post',
    });
  }
});


// POST /api/blog - Create a new blog post in the database
router.post('/', blogWriteLimit, validateBlogPost, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      title,
      excerpt,
      content,
      category,
      tags,
      read_time,
      author = "Manuel Reyes",
      published = false
    } = req.body;

    const result = await pool.query(
      `INSERT INTO blog_posts
        (title, excerpt, content, category, tags, read_time, author, published, views, created_at, updated_at)
       VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, 0, NOW(), NOW())
       RETURNING *`,
      [title.trim(), excerpt.trim(), content.trim(), category.trim(), tags, read_time, author, published]
    );

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating blog post:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to create blog post'
    });
  }
});

// PUT /api/blog/:id - Update a blog post (admin only)
router.put('/:id', blogWriteLimit, validateBlogPost, (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const postIndex = blogPosts.findIndex(p => p.id === postId);

    if (postIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { title, excerpt, content, category, tags, published } = req.body;
    const existingPost = blogPosts[postIndex];

    blogPosts[postIndex] = {
      ...existingPost,
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      category: category.trim(),
      tags: tags.map(tag => tag.trim()),
      readTime: calculateReadTime(content),
      published: published !== undefined ? Boolean(published) : existingPost.published,
      updatedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'Blog post updated successfully',
      data: blogPosts[postIndex]
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update blog post'
    });
  }
});

// DELETE /api/blog/:id - Delete a blog post (admin only)
router.delete('/:id', blogWriteLimit, (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const postIndex = blogPosts.findIndex(p => p.id === postId);

    if (postIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    const deletedPost = blogPosts.splice(postIndex, 1)[0];

    res.json({
      success: true,
      message: 'Blog post deleted successfully',
      data: deletedPost
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete blog post'
    });
  }
});

// GET /api/blog/admin/all - Get all posts including drafts (admin only)
router.get('/admin/all', blogWriteLimit, (req, res) => {
  try {
    const allPosts = blogPosts.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    
    res.json({
      success: true,
      data: {
        posts: allPosts,
        totalPosts: allPosts.length,
        publishedCount: allPosts.filter(p => p.published).length,
        draftCount: allPosts.filter(p => !p.published).length
      }
    });
  } catch (error) {
    console.error('Error fetching admin blog posts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog posts'
    });
  }
});

// GET /api/blog/stats - Get blog statistics
router.get('/stats/overview', blogReadLimit, (req, res) => {
  try {
    const publishedPosts = blogPosts.filter(p => p.published);
    const totalViews = publishedPosts.reduce((sum, post) => sum + (post.views || 0), 0);
    const categories = [...new Set(publishedPosts.map(p => p.category))];
    const tags = [...new Set(publishedPosts.flatMap(p => p.tags))];

    const popularPosts = publishedPosts
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 5)
      .map(p => ({
        id: p.id,
        title: p.title,
        views: p.views || 0,
        date: p.date
      }));


    const recentPosts = publishedPosts
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5)
      .map(p => ({
        id: p.id,
        title: p.title,
        date: p.date,
        views: p.views || 0
      }));

    res.json({
      success: true,
      data: {
        totalPosts: publishedPosts.length,
        totalViews,
        totalCategories: categories.length,
        totalTags: tags.length,
        popularPosts,
        recentPosts,
        categories,
        tags
      }
    });
  } catch (error) {
    console.error('Error fetching blog stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog statistics'
    });
  }
});

// PATCH /api/blog/:id/view - Increment views for a blog post
router.patch('/:id/view', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `UPDATE blog_posts
       SET views = views + 1, updated_at = NOW()
       WHERE id = $1
       RETURNING views`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.json({
      success: true,
      views: result.rows[0].views
    });
  } catch (error) {
    console.error('Error updating views:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to update views'
    });
  }
});

module.exports = router;