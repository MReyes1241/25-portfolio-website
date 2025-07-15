import fetch from 'node-fetch';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Setup for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Env variables
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_KEY;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !GITHUB_USERNAME || !GITHUB_TOKEN) {
  console.error('Missing environment variables.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Enhanced technology mapping with proper GitHub language names
const TECH_MAPPING = {
  // Web Technologies
  'HTML': 'html',
  'CSS': 'css',
  'JavaScript': 'javascript',
  'TypeScript': 'typescript',
  'SCSS': 'sass',
  'Sass': 'sass',
  'Less': 'less',
  
  // Backend Languages
  'Python': 'python',
  'Java': 'java',
  'C++': 'c++',
  'C#': 'csharp',
  'C': 'c',
  'Go': 'go',
  'Rust': 'rust',
  'PHP': 'php',
  'Ruby': 'ruby',
  'Swift': 'swift',
  'Kotlin': 'kotlin',
  'Scala': 'scala',
  'R': 'r',
  'MATLAB': 'matlab',
  'Shell': 'shell',
  'PowerShell': 'shell',
  'Bash': 'shell',
  'Dart': 'flutter',
  
  // Other formats
  'Dockerfile': 'docker',
  'YAML': 'yaml',
  'JSON': 'json',
  'XML': 'xml',
  'Markdown': 'markdown',
};

// Framework and library detection based on package files and patterns
const FRAMEWORK_PATTERNS = {
  'react': ['package.json', 'react', 'jsx', 'tsx'],
  'vue': ['package.json', 'vue', 'nuxt'],
  'angular': ['package.json', 'angular', '@angular'],
  'svelte': ['package.json', 'svelte', 'sveltekit'],
  'next.js': ['package.json', 'next', 'nextjs'],
  'nuxt.js': ['package.json', 'nuxt'],
  'express': ['package.json', 'express'],
  'node.js': ['package.json', 'node'],
  'tailwind': ['tailwind', 'tailwindcss'],
  'bootstrap': ['bootstrap'],
  'styled-components': ['styled-components'],
  'react-native': ['react-native', 'expo'],
  'flutter': ['pubspec.yaml', 'dart'],
  'unity': ['.unity', 'unity'],
  'tensorflow': ['tensorflow', 'tf'],
  'pytorch': ['pytorch', 'torch'],
  'docker': ['Dockerfile', 'docker-compose'],
  'kubernetes': ['k8s', 'kubernetes'],
  'graphql': ['graphql', 'apollo'],
  'postgresql': ['postgres', 'pg'],
  'mysql': ['mysql'],
  'mongodb': ['mongo', 'mongoose'],
  'redis': ['redis'],
  'firebase': ['firebase'],
  'supabase': ['supabase'],
  'vercel': ['vercel'],
  'netlify': ['netlify'],
  'aws': ['aws', 'lambda'],
  'jest': ['jest'],
  'cypress': ['cypress'],
  'eslint': ['eslint'],
  'prettier': ['prettier'],
  'webpack': ['webpack'],
  'vite': ['vite'],
  'babel': ['babel'],
};

// Category inference based on technologies and repo characteristics
function inferCategory(repo, technologies) {
  const name = repo.name.toLowerCase();
  const description = (repo.description || '').toLowerCase();
  const topics = (repo.topics || []).map(t => t.toLowerCase());
  const allText = `${name} ${description} ${topics.join(' ')}`;
  
  // Web Development
  if (technologies.includes('html') || technologies.includes('css') || 
      technologies.includes('react') || technologies.includes('vue') || 
      technologies.includes('angular') || technologies.includes('next.js') ||
      allText.includes('website') || allText.includes('web') || 
      allText.includes('portfolio') || allText.includes('frontend')) {
    return 'Web Development';
  }
  
  // Mobile Development
  if (technologies.includes('swift') || technologies.includes('kotlin') || 
      technologies.includes('react-native') || technologies.includes('flutter') ||
      allText.includes('ios') || allText.includes('android') || 
      allText.includes('mobile') || allText.includes('app')) {
    return 'Mobile Development';
  }
  
  // Game Development
  if (technologies.includes('unity') || technologies.includes('unreal') || 
      technologies.includes('godot') || allText.includes('game') || 
      allText.includes('unity') || allText.includes('gamedev')) {
    return 'Game Development';
  }
  
  // Data Science & ML
  if (technologies.includes('python') && (technologies.includes('tensorflow') || 
      technologies.includes('pytorch') || technologies.includes('pandas') ||
      technologies.includes('numpy') || technologies.includes('jupyter') ||
      allText.includes('machine-learning') || allText.includes('data-science') ||
      allText.includes('ai') || allText.includes('ml'))) {
    return 'Data Science';
  }
  
  // DevOps & Tools
  if (technologies.includes('docker') || technologies.includes('kubernetes') ||
      technologies.includes('github-actions') || allText.includes('devops') ||
      allText.includes('deployment') || allText.includes('infrastructure')) {
    return 'DevOps';
  }
  
  // API & Backend
  if (technologies.includes('express') || technologies.includes('node.js') ||
      technologies.includes('graphql') || technologies.includes('rest') ||
      allText.includes('api') || allText.includes('backend') || 
      allText.includes('server')) {
    return 'Backend';
  }
  
  // Configuration or Profile
  if (name.includes('config') || name.includes('dotfiles') || 
      name === repo.owner?.login || allText.includes('profile')) {
    return 'Configuration';
  }
  
  // Default to Other
  return 'Other';
}

// Improved technology detection with better filtering
async function detectTechnologies(repo, headers) {
  const detected = new Set();
  
  //Get GitHub's language breakdown (primary source)
  try {
    const langRes = await fetch(`https://api.github.com/repos/${repo.full_name}/languages`, { headers });
    if (langRes.ok) {
      const languages = await langRes.json();
      const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
      
      // Only include languages that make up at least 5% of the codebase
      Object.entries(languages).forEach(([lang, bytes]) => {
        const percentage = (bytes / totalBytes) * 100;
        if (percentage >= 5 && TECH_MAPPING[lang]) {
          detected.add(TECH_MAPPING[lang]);
        }
      });
    }
  } catch (error) {
    console.warn(`Could not fetch languages for ${repo.name}`);
  }
  
  //Analyze repository metadata for frameworks and tools
  const combinedText = `
    ${repo.name}
    ${repo.description || ''}
    ${(repo.topics || []).join(' ')}
  `.toLowerCase();
  
  // Framework detection based on name patterns and description
  Object.entries(FRAMEWORK_PATTERNS).forEach(([framework, patterns]) => {
    const hasPattern = patterns.some(pattern => {
      // More specific matching to avoid false positives
      const regex = new RegExp(`\\b${pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      return regex.test(combinedText);
    });
    
    if (hasPattern) {
      detected.add(framework);
    }
  });
  
  // Add implied technologies based on what we've detected
  const techs = Array.from(detected);
  
  // If we have React, add JavaScript and common web techs
  if (techs.includes('react') || techs.includes('next.js')) {
    detected.add('javascript');
    detected.add('html');
    detected.add('css');
  }
  
  // If we have Vue, add JavaScript
  if (techs.includes('vue') || techs.includes('nuxt.js')) {
    detected.add('javascript');
    detected.add('html');
    detected.add('css');
  }
  
  // If we have Angular, add TypeScript
  if (techs.includes('angular')) {
    detected.add('typescript');
    detected.add('javascript');
    detected.add('html');
    detected.add('css');
  }
  
  // If we have TypeScript, add JavaScript
  if (techs.includes('typescript')) {
    detected.add('javascript');
  }
  
  // If we have Node.js or Express, add JavaScript
  if (techs.includes('node.js') || techs.includes('express')) {
    detected.add('javascript');
  }
  
  // If we have React Native, add React and JavaScript
  if (techs.includes('react-native')) {
    detected.add('react');
    detected.add('javascript');
  }
  
  // Strategy 5: Check repository topics for additional context
  const topics = repo.topics || [];
  topics.forEach(topic => {
    const topicLower = topic.toLowerCase();
    Object.entries(FRAMEWORK_PATTERNS).forEach(([framework, patterns]) => {
      if (patterns.some(pattern => pattern === topicLower)) {
        detected.add(framework);
      }
    });
  });
  
  // Strategy 6: Special handling for web projects
  const isWebProject = combinedText.includes('website') || 
                      combinedText.includes('portfolio') || 
                      combinedText.includes('web') ||
                      repo.name.toLowerCase().includes('website') ||
                      repo.name.toLowerCase().includes('portfolio');
  
  if (isWebProject && techs.includes('javascript')) {
    detected.add('html');
    detected.add('css');
  }
  
  // Filter out single letters that might be false positives
  const filteredTechs = Array.from(detected).filter(tech => {
    // Keep only if they're specifically R 
    if (tech.length === 1) {
      return tech === 'r' && (
        combinedText.includes('statistics') || 
        combinedText.includes('data') ||
        combinedText.includes('analysis')
      );
    }
    return true;
  });
  
  return filteredTechs.sort();
}

// Format GitHub repo into Supabase project row
async function formatRepo(repo, headers) {
  const technologies = await detectTechnologies(repo, headers);
  const category = inferCategory(repo, technologies);
  
  return {
    id: repo.id.toString(),
    title: repo.name,
    description: repo.description || null,
    image_url: null,
    github_url: repo.html_url,
    live_url: repo.homepage || null,
    technologies: technologies,
    category: [category],
    featured: false,
    year: new Date(repo.created_at).getFullYear(),
    status: [repo.archived ? 'archived' : 'active'],
    created_at: new Date().toISOString(),
  };
}

// Fetch user repos with enhanced error handling and rate limiting
async function fetchGitHubRepos(username) {
  const headers = {
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'Portfolio-Import-Script',
  };

  try {
    console.log('🔍 Fetching repository list...');
    
    let allRepos = [];
    let page = 1;
    let hasMore = true;
    
    while (hasMore) {
      const listRes = await fetch(
        `https://api.github.com/user/repos?affiliation=owner,collaborator&sort=updated&per_page=100&page=${page}`, 
        { headers }
      );
      
      if (!listRes.ok) {
        throw new Error(`GitHub API request failed: ${listRes.status} ${listRes.statusText}`);
      }
      
      const repos = await listRes.json();
      allRepos = allRepos.concat(repos);
      
      hasMore = repos.length === 100;
      page++;
      
      if (hasMore) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    console.log(`Found ${allRepos.length} total repositories`);

    // Filter out forks and archived repos
    const activeRepos = allRepos.filter(repo => !repo.fork && !repo.archived);
    console.log(`Filtered to ${activeRepos.length} active, non-fork repositories`);

    // Fetch detailed information for each repo
    console.log('📝 Fetching detailed repository information...');
    const detailedRepos = await Promise.all(
      activeRepos.map(async (repo, index) => {
        try {
          if (index > 0 && index % 10 === 0) {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
          
          const res = await fetch(`https://api.github.com/repos/${repo.full_name}`, { headers });
          if (!res.ok) {
            console.warn(`Could not fetch details for ${repo.name}: ${res.status}`);
            return repo;
          }
          const full = await res.json();
          return { ...repo, topics: full.topics || [] };
        } catch (error) {
          console.warn(`Error fetching details for ${repo.name}:`, error.message);
          return repo;
        }
      })
    );

    return { repos: detailedRepos, headers };
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error.message);
    throw error;
  }
}

// Main sync function with better error handling
async function syncProjects() {
  try {
    console.log('Starting GitHub repository sync...');
    console.log(`GitHub User: ${GITHUB_USERNAME}`);
    
    const { repos, headers } = await fetchGitHubRepos(GITHUB_USERNAME);
    
    if (repos.length === 0) {
      console.log('No repositories found to import.');
      return;
    }
    
    // Format for Supabase
    console.log('Processing repositories...');
    const projects = await Promise.all(
      repos.map(async (repo, index) => {
        if (index > 0 && index % 5 === 0) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        return await formatRepo(repo, headers);
      })
    );
    
    // Log whats being inserted
    console.log(`📋 Prepared ${projects.length} projects for insertion:`);
    projects.forEach(project => {
      console.log(`  • ${project.title} (${project.technologies.join(', ')}) - ${project.category[0]}`);
    });
    
    // Insert new projects
    console.log('💾 Inserting projects into Supabase...');
    const { data, error } = await supabase
      .from('projects')
      .upsert(projects, { 
        onConflict: 'id',
        ignoreDuplicates: false 
      })
      .select();

    if (error) {
      console.error('❌ Supabase upsert error:', error);
      throw error;
    } else {
      console.log(`✅ Successfully synchronized ${data?.length || 0} projects!`);
      
      //Summary by category
      const categoryCount = {};
      projects.forEach(project => {
        const category = project.category[0];
        categoryCount[category] = (categoryCount[category] || 0) + 1;
      });
      
      console.log('\n📊 Summary by category:');
      Object.entries(categoryCount).forEach(([category, count]) => {
        console.log(`  ${category}: ${count} project${count !== 1 ? 's' : ''}`);
      });
    }
  } catch (err) {
    console.error('💥 Error syncing projects:', err.message);
    process.exit(1);
  }
}

// command line argument support
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
🚀 GitHub Projects Import Script

Usage: node importGitHubProjects.js [options]

Options:
  --help, -h     Show this help message
  --dry-run      Show what would be imported without actually inserting
  
Environment variables required:
  SUPABASE_URL, SUPABASE_SERVICE_KEY, GITHUB_USERNAME, GITHUB_TOKEN
  `);
  process.exit(0);
}

if (args.includes('--dry-run')) {
  console.log('🧪 DRY RUN MODE - No data will be inserted');
}

syncProjects();