const express = require('express');
const rateLimit = require('express-rate-limit');
const supabase = require('../supabaseClient');

const router = express.Router();

// Rate limiting
const readLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later.' },
});

const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many write requests, please try again later.' },
});

// GET /api/projects
router.get('/', readLimiter, async (req, res) => {
  try {
    const { featured, category } = req.query;

    let query = supabase.from('projects').select('*');

    if (featured === 'true') {
      query = query.eq('featured', true);
    }

    // Updated category filtering to handle array format
    if (category) {
      // Since categories are stored as arrays in your database, we need to use contains
      // But we need to match the exact category format from your database
      const categoryMap = {
        'web': 'Web Development',
        'mobile': 'Mobile Development',
        'game': 'Game Development',
        'app': 'Application Development',
        'config': 'Configuration',
        'other': 'Other'
      };
      
      const dbCategory = categoryMap[category.toLowerCase()] || category;
      query = query.contains('category', [dbCategory]);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      projects: data,
      total: data.length,
    });
  } catch (error) {
    console.error('Projects fetch error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch projects' });
  }
});

// GET /api/projects/:id
router.get('/:id', readLimiter, async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.json({ success: true, project: data });
  } catch (error) {
    console.error('Project fetch error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch project' });
  }
});

// POST /api/projects
router.post('/', writeLimiter, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .insert(req.body)
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, project: data });
  } catch (error) {
    console.error('Project creation error:', error);
    res.status(400).json({ success: false, message: 'Failed to create project' });
  }
});

// PATCH /api/projects/:id
router.patch('/:id', writeLimiter, async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('projects')
      .update(req.body)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, project: data });
  } catch (error) {
    console.error('Project update error:', error);
    res.status(400).json({ success: false, message: 'Failed to update project' });
  }
});

// DELETE /api/projects/:id
router.delete('/:id', writeLimiter, async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.status(204).end();
  } catch (error) {
    console.error('Project deletion error:', error);
    res.status(400).json({ success: false, message: 'Failed to delete project' });
  }
});

module.exports = router;