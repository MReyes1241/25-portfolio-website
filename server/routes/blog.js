const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const supabase = require('../supabaseClient');

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

function calculateReadTime(content) {
  const wordsPerMinute = 200;
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const readTime = Math.ceil(words / wordsPerMinute);
  return `${readTime} min read`;
}

// GET /api/blog
router.get('/', blogReadLimit, async (req, res) => {
  try {
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    const categories = [...new Set(posts.map(p => p.category))];
    const tags = [...new Set(posts.flatMap(p => p.tags || []))];

    res.json({
      success: true,
      data: {
        posts,
        totalPosts: posts.length,
        categories,
        tags,
        pagination: {
          limit: posts.length,
          offset: 0,
          hasMore: false
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch blog posts' });
  }
});

// GET /api/blog/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { data: post, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !post) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    res.json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch blog post' });
  }
});

// POST /api/blog
router.post('/', blogWriteLimit, validateBlogPost, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
    }

    const { title, excerpt, content, category, tags, author = "Manuel Reyes", published = false } = req.body;
    const read_time = calculateReadTime(content);

    const { data: newPost, error } = await supabase.from('blog_posts').insert([{
      title,
      excerpt,
      content,
      category,
      tags,
      read_time,
      author,
      published,
      views: 0
    }]).select().single();

    if (error) throw error;

    res.status(201).json({ success: true, message: 'Blog post created successfully', data: newPost });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create blog post' });
  }
});

// PATCH /api/blog/:id/view
router.patch('/:id/view', async (req, res) => {
  const { id } = req.params;

  try {
    const { data: post, error: fetchError } = await supabase
      .from('blog_posts')
      .select('views')
      .eq('id', id)
      .single();

    if (fetchError || !post) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    const { data, error: updateError } = await supabase
      .from('blog_posts')
      .update({ views: post.views + 1 })
      .eq('id', id)
      .select('views')
      .single();

    if (updateError) throw updateError;

    res.json({ success: true, views: data.views });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update views' });
  }
});

module.exports = router;