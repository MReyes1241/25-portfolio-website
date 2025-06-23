const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');

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

// mock blog posts data
let blogPosts = [
  {
    id: 1,
    title: "Building Modern Web Applications with React and TypeScript",
    excerpt: "Explore the best practices for creating scalable and maintainable web applications using React and TypeScript. Learn about component architecture, state management, and performance optimization.",
    content: `<h3>Introduction</h3><p>Modern web development has evolved significantly, and the combination of React and TypeScript has become a powerful duo for building robust applications. In this post, we'll explore the key principles and best practices that can help you create maintainable and scalable web applications.</p><h3>Component Architecture</h3><p>When building React applications with TypeScript, proper component architecture is crucial. Start by defining clear interfaces for your props and state. This not only provides better developer experience but also catches errors at compile time.</p><h3>State Management</h3><p>Choose your state management solution wisely. For smaller applications, React's built-in useState and useContext might be sufficient. For larger applications, consider Redux Toolkit or Zustand for more complex state management needs.</p><h3>Performance Optimization</h3><p>TypeScript helps with performance optimization by providing better IDE support and catching potential issues early. Use React.memo, useMemo, and useCallback strategically to prevent unnecessary re-renders.</p><h3>Conclusion</h3><p>The combination of React and TypeScript provides a solid foundation for building modern web applications. Focus on writing clean, typed code and following established patterns for the best results.</p>`,
    date: "2024-12-15",
    readTime: "8 min read",
    tags: ["React", "TypeScript", "Web Development"],
    category: "Technology",
    author: "Manuel Reyes",
    published: true,
    views: 145,
    createdAt: new Date('2024-12-15').toISOString(),
    updatedAt: new Date('2024-12-15').toISOString()
  },
  {
    id: 2,
    title: "The Art of Mindful Living in a Digital Age",
    excerpt: "Exploring how to maintain presence and mindfulness while navigating our increasingly connected world. Finding balance between digital productivity and mental well-being.",
    content: `<h3>The Digital Dilemma</h3><p>We live in an age where our attention is constantly pulled in different directions. Notifications, social media, and the endless stream of information can leave us feeling overwhelmed and disconnected from the present moment.</p><h3>What is Mindful Living?</h3><p>Mindful living is about being fully present in each moment, aware of our thoughts, feelings, and surroundings without judgment. It's about creating intentional space between stimulus and response.</p><h3>Practical Strategies</h3><p>Start small: dedicate 10 minutes each morning to mindful breathing. Create phone-free zones in your home. Practice single-tasking instead of multitasking. These small changes can have profound effects on your overall well-being.</p><h3>Digital Boundaries</h3><p>Setting healthy boundaries with technology doesn't mean becoming a luddite. It means being intentional about when and how we engage with digital tools. Use technology to serve your goals, not the other way around.</p><h3>The Ripple Effect</h3><p>When we practice mindful living, it affects not just ourselves but everyone around us. We become more present in our relationships, more focused in our work, and more connected to our values and purpose.</p>`,
    date: "2024-12-08",
    readTime: "6 min read",
    tags: ["Mindfulness", "Digital Wellness", "Life"],
    category: "Life & Philosophy", 
    author: "Manuel Reyes",
    published: true,
    views: 89,
    createdAt: new Date('2024-12-08').toISOString(),
    updatedAt: new Date('2024-12-08').toISOString()
  }
];

let nextId = 3;

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

// GET /api/blog - Get all published blog posts
router.get('/', blogReadLimit, (req, res) => {
  try {
    const { category, tag, limit, offset, search } = req.query;
    let filteredPosts = blogPosts.filter(post => post.published);

    if (category && category !== 'All') {
      filteredPosts = filteredPosts.filter(post => 
        post.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (tag) {
      filteredPosts = filteredPosts.filter(post =>
        post.tags.some(postTag => 
          postTag.toLowerCase().includes(tag.toLowerCase())
        )
      );
    }

    if (search) {
      const searchTerm = search.toLowerCase();
      filteredPosts = filteredPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    const limitNum = parseInt(limit) || filteredPosts.length;
    const offsetNum = parseInt(offset) || 0;
    const paginatedPosts = filteredPosts.slice(offsetNum, offsetNum + limitNum);

    const categories = [...new Set(blogPosts.filter(p => p.published).map(p => p.category))];
    const tags = [...new Set(blogPosts.filter(p => p.published).flatMap(p => p.tags))];

    res.json({
      success: true,
      data: {
        posts: paginatedPosts,
        totalPosts: filteredPosts.length,
        categories,
        tags,
        pagination: {
          limit: limitNum,
          offset: offsetNum,
          hasMore: offsetNum + limitNum < filteredPosts.length
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

// GET /api/blog/:id - Get a specific blog post
router.get('/:id', blogReadLimit, (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const post = blogPosts.find(p => p.id === postId && p.published);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    post.views = (post.views || 0) + 1;

    const relatedPosts = blogPosts
      .filter(p => p.published && p.id !== postId && p.category === post.category)
      .slice(0, 3)
      .map(p => ({
        id: p.id,
        title: p.title,
        excerpt: p.excerpt,
        date: p.date,
        readTime: p.readTime,
        category: p.category,
        tags: p.tags
      }));

    res.json({
      success: true,
      data: {
        post,
        relatedPosts
      }
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog post'
    });
  }
});

// POST /api/blog - Create a new blog post (admin only)
router.post('/', blogWriteLimit, validateBlogPost, (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { title, excerpt, content, category, tags, published = false } = req.body;

    const newPost = {
      id: nextId++,
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      category: category.trim(),
      tags: tags.map(tag => tag.trim()),
      date: new Date().toISOString().split('T')[0],
      readTime: calculateReadTime(content),
      author: "Manuel Reyes",
      published: Boolean(published),
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    blogPosts.push(newPost);

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: newPost
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
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

module.exports = router;