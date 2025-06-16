import React, { useState, useMemo } from "react";
import styles from "./Blog.module.css";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  category: string;
}

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedPost, setExpandedPost] = useState<number | null>(null);

  // Sample blog posts with full content
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Building Modern Web Applications with React and TypeScript",
      excerpt:
        "Explore the best practices for creating scalable and maintainable web applications using React and TypeScript. Learn about component architecture, state management, and performance optimization.",
      content: `
        <h3>Introduction</h3>
        <p>Modern web development has evolved significantly, and the combination of React and TypeScript has become a powerful duo for building robust applications. In this post, we'll explore the key principles and best practices that can help you create maintainable and scalable web applications.</p>
        
        <h3>Component Architecture</h3>
        <p>When building React applications with TypeScript, proper component architecture is crucial. Start by defining clear interfaces for your props and state. This not only provides better developer experience but also catches errors at compile time.</p>
        
        <h3>State Management</h3>
        <p>Choose your state management solution wisely. For smaller applications, React's built-in useState and useContext might be sufficient. For larger applications, consider Redux Toolkit or Zustand for more complex state management needs.</p>
        
        <h3>Performance Optimization</h3>
        <p>TypeScript helps with performance optimization by providing better IDE support and catching potential issues early. Use React.memo, useMemo, and useCallback strategically to prevent unnecessary re-renders.</p>
        
        <h3>Conclusion</h3>
        <p>The combination of React and TypeScript provides a solid foundation for building modern web applications. Focus on writing clean, typed code and following established patterns for the best results.</p>
      `,
      date: "2024-12-15",
      readTime: "8 min read",
      tags: ["React", "TypeScript", "Web Development"],
      category: "Technology",
    },
    {
      id: 2,
      title: "The Art of Mindful Living in a Digital Age",
      excerpt:
        "Exploring how to maintain presence and mindfulness while navigating our increasingly connected world. Finding balance between digital productivity and mental well-being.",
      content: `
        <h3>The Digital Dilemma</h3>
        <p>We live in an age where our attention is constantly pulled in different directions. Notifications, social media, and the endless stream of information can leave us feeling overwhelmed and disconnected from the present moment.</p>
        
        <h3>What is Mindful Living?</h3>
        <p>Mindful living is about being fully present in each moment, aware of our thoughts, feelings, and surroundings without judgment. It's about creating intentional space between stimulus and response.</p>
        
        <h3>Practical Strategies</h3>
        <p>Start small: dedicate 10 minutes each morning to mindful breathing. Create phone-free zones in your home. Practice single-tasking instead of multitasking. These small changes can have profound effects on your overall well-being.</p>
        
        <h3>Digital Boundaries</h3>
        <p>Setting healthy boundaries with technology doesn't mean becoming a luddite. It means being intentional about when and how we engage with digital tools. Use technology to serve your goals, not the other way around.</p>
        
        <h3>The Ripple Effect</h3>
        <p>When we practice mindful living, it affects not just ourselves but everyone around us. We become more present in our relationships, more focused in our work, and more connected to our values and purpose.</p>
      `,
      date: "2024-12-08",
      readTime: "6 min read",
      tags: ["Mindfulness", "Digital Wellness", "Life"],
      category: "Life & Philosophy",
    },
    {
      id: 3,
      title: "The Psychology of Color in Design",
      excerpt:
        "Understanding how colors affect human psychology and behavior, and how to use this knowledge to create more effective and emotionally resonant designs.",
      content: `
        <h3>Color and Emotion</h3>
        <p>Colors have a profound impact on our emotions and behavior. Red can evoke passion and urgency, while blue often creates feelings of trust and calm. Understanding these associations is crucial for effective design.</p>
        
        <h3>Cultural Context Matters</h3>
        <p>Color meanings vary significantly across cultures. What represents good luck in one culture might symbolize mourning in another. Always consider your audience when making color choices.</p>
        
        <h3>The Science Behind Color</h3>
        <p>Neuroscience research shows that color processing happens in the limbic system, the part of our brain responsible for emotions and memory. This explains why colors can trigger such strong emotional responses.</p>
        
        <h3>Practical Applications</h3>
        <p>In web design, use warm colors for call-to-action buttons to create urgency. Use cool colors for backgrounds to promote focus. Always test your color choices with real users to validate your assumptions.</p>
        
        <h3>Accessibility First</h3>
        <p>Remember that color should never be the only way to convey information. Always consider users with color vision deficiencies and ensure your designs are accessible to everyone.</p>
      `,
      date: "2024-12-01",
      readTime: "7 min read",
      tags: ["Design", "Psychology", "UX"],
      category: "Design",
    },
    {
      id: 4,
      title: "Lessons from Failure: My Startup Journey",
      excerpt:
        "A candid reflection on the lessons learned from building and ultimately shutting down my first startup. What I wish I knew before starting and what I'd do differently.",
      content: `
        <h3>The Beginning</h3>
        <p>Two years ago, I was convinced I had the next big idea. A productivity app that would revolutionize how people manage their tasks. I was wrong, but the journey taught me invaluable lessons.</p>
        
        <h3>The First Mistake: Building in Isolation</h3>
        <p>I spent six months building the perfect product without talking to a single potential customer. By the time I launched, I realized I had built something nobody wanted. Lesson learned: validate your idea early and often.</p>
        
        <h3>The Pivot That Wasn't</h3>
        <p>When initial traction was low, I kept pivoting the product instead of pivoting my approach to customer discovery. I was solving problems that didn't exist for people who didn't care.</p>
        
        <h3>The Hard Decision</h3>
        <p>After 18 months and burning through my savings, I made the difficult decision to shut down. It felt like failure, but it was actually the most educational experience of my career.</p>
        
        <h3>What I Learned</h3>
        <p>Failure is not the opposite of success; it's a stepping stone to success. Every failure teaches you something that success cannot. The key is to fail fast, learn faster, and apply those lessons to your next venture.</p>
        
        <h3>Moving Forward</h3>
        <p>I'm now working on my second startup, but this time with a completely different approach. Customer discovery comes first, MVP comes second, and ego comes last.</p>
      `,
      date: "2024-11-24",
      readTime: "10 min read",
      tags: ["Entrepreneurship", "Startup", "Lessons"],
      category: "Business",
    },
    {
      id: 5,
      title: "The Future of Remote Work: Beyond the Pandemic",
      excerpt:
        "Analyzing the long-term implications of remote work culture and how it's reshaping not just how we work, but how we live, connect, and build communities.",
      content: `
        <h3>The Great Experiment</h3>
        <p>The pandemic forced the world's largest remote work experiment. What started as a necessity has evolved into a fundamental shift in how we think about work, productivity, and work-life balance.</p>
        
        <h3>The Benefits We've Discovered</h3>
        <p>Remote work has eliminated commutes, reduced overhead costs, and opened up global talent pools. It's allowed people to live where they want, not where their job is located. For many, it's been liberating.</p>
        
        <h3>The Challenges We Face</h3>
        <p>But remote work isn't without its challenges. Isolation, communication barriers, and the blurring of work-life boundaries have created new problems we're still learning to solve.</p>
        
        <h3>The Hybrid Future</h3>
        <p>The future likely isn't fully remote or fully in-office, but a hybrid model that combines the best of both. Companies that figure out this balance will have a significant competitive advantage.</p>
        
        <h3>Societal Implications</h3>
        <p>Remote work is changing more than just offices. It's affecting urban planning, real estate markets, and even social structures. Small towns are seeing an influx of remote workers, while major cities are grappling with reduced foot traffic.</p>
        
        <h3>The Human Element</h3>
        <p>At the end of the day, work is about people. Whether remote, hybrid, or in-person, successful teams are built on trust, communication, and shared purpose. The location is just a detail.</p>
      `,
      date: "2024-11-17",
      readTime: "8 min read",
      tags: ["Remote Work", "Future", "Society"],
      category: "Business",
    },
    {
      id: 6,
      title: "Finding Beauty in Everyday Moments",
      excerpt:
        "A reflection on slowing down and appreciating the small, beautiful moments that surround us every day, from morning coffee to sunset walks.",
      content: `
        <h3>The Rush of Modern Life</h3>
        <p>We're always rushing to the next thing, the next achievement, the next milestone. In our hurry to get somewhere, we often miss the beauty of where we are right now.</p>
        
        <h3>The Coffee Cup Meditation</h3>
        <p>This morning, I sat with my coffee and really tasted it. Not while checking emails or scrolling social media, but just tasting. The warmth, the aroma, the moment of quiet before the day began. It was beautiful.</p>
        
        <h3>The Art of Noticing</h3>
        <p>Beauty isn't always grand or obvious. Sometimes it's the way light falls through a window, the sound of rain on the roof, or the smile of a stranger. These moments are everywhere if we learn to notice them.</p>
        
        <h3>Photography as Mindfulness</h3>
        <p>I've started carrying a camera not to capture perfect shots, but to train my eye to see. The act of looking for beauty changes how you experience the world. You become more present, more aware.</p>
        
        <h3>The Gratitude Practice</h3>
        <p>Each evening, I write down three beautiful moments from my day. They're usually small things: a good conversation, a moment of quiet, a particularly delicious meal. This practice has transformed how I see my life.</p>
        
        <h3>An Invitation</h3>
        <p>I invite you to slow down today. Notice one beautiful moment. Really notice it. Let it fill you up. These moments are gifts, and they're available to us every single day.</p>
      `,
      date: "2024-11-10",
      readTime: "5 min read",
      tags: ["Mindfulness", "Beauty", "Gratitude"],
      category: "Life & Philosophy",
    },
  ];

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(blogPosts.map((post) => post.category)),
    ];
    return ["All", ...uniqueCategories];
  }, [blogPosts]);

  // Filter posts based on selected category
  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All") {
      return blogPosts;
    }
    return blogPosts.filter((post) => post.category === selectedCategory);
  }, [blogPosts, selectedCategory]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleReadMore = (postId: number) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  const handleBackToTop = () => {
    setExpandedPost(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Blog</h1>
          <p className={styles.subtitle}>
            Thoughts on technology, life, design, and everything in between
          </p>
        </div>
      </div>

      <div className={styles.main}>
        {/* Category Filters */}
        <div className={styles.filters}>
          <h3 className={styles.filtersTitle}>Topics</h3>
          <div className={styles.filterButtons}>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.filterButton} ${
                  selectedCategory === category ? styles.filterButtonActive : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts */}
        <div className={styles.blogGrid}>
          {filteredPosts.map((post) => (
            <article key={post.id} className={styles.blogCard}>
              <div className={styles.cardContent}>
                <div className={styles.cardMeta}>
                  <span className={styles.date}>{formatDate(post.date)}</span>
                  <span className={styles.readTime}>{post.readTime}</span>
                </div>

                <div className={styles.cardCategory}>{post.category}</div>

                <h2 className={styles.cardTitle}>{post.title}</h2>

                {expandedPost === post.id ? (
                  <div className={styles.fullContent}>
                    <div
                      className={styles.content}
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                    <button
                      className={styles.collapseButton}
                      onClick={() => handleBackToTop()}
                    >
                      ← Back to posts
                    </button>
                  </div>
                ) : (
                  <>
                    <p className={styles.cardExcerpt}>{post.excerpt}</p>

                    <div className={styles.cardTags}>
                      {post.tags.map((tag, index) => (
                        <span key={index} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      className={styles.readMore}
                      onClick={() => handleReadMore(post.id)}
                    >
                      Read More
                      <svg
                        className={styles.arrow}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className={styles.noResults}>
            <p>No posts found for the selected topic.</p>
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <p>&copy; 2025 Manuel Reyes. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Blog;
