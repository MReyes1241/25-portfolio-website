import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// GET /api/projects?featured=true&category=Web%20Development
router.get('/', async (req, res) => {
  const { featured, category } = req.query;
  let query = supabase.from('projects').select('*');

  if (featured === 'true') {
    query = query.eq('featured', true);
  }

  if (category) {
    query = query.contains('category', [category]);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// GET /api/projects/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return res.status(404).json({ error: 'Project not found' });
  res.json(data);
});

// POST /api/projects
router.post('/', async (req, res) => {
  const { data, error } = await supabase
    .from('projects')
    .insert(req.body)
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
});

// PATCH /api/projects/:id
router.patch('/:id', async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('projects')
    .update(req.body)
    .eq('id', id)
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// DELETE /api/projects/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase.from('projects').delete().eq('id', id);

  if (error) return res.status(400).json({ error: error.message });
  res.status(204).end();
});

export default router;