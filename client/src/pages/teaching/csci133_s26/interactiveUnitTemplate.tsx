import React, { useState } from 'react';
import { BookOpen, Play, Monitor, ChevronDown, ChevronRight, Maximize2, X } from 'lucide-react';
import InteractivePythonBlock from './interactivePythonBlock';
import styles from './InteractiveUnitTemplate.module.css';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

// Image/Media types
export interface MediaData {
  type: 'image' | 'gif';
  src: string;
  alt: string;
  caption?: string;
  width?: string | number;
}

// Code sample with optional interactive flag
export interface CodeSample {
  title?: string;
  code: string;
  interactive?: boolean; // If true, renders as runnable Python block
  language?: string; // For syntax highlighting hints (default: python)
}

// Content block - flexible content type for lessons
export type ContentBlock =
  | { type: 'paragraph'; content: string }
  | { type: 'heading'; level: 1 | 2 | 3; content: string }
  | { type: 'code'; data: CodeSample }
  | { type: 'media'; data: MediaData }
  | { type: 'tip'; items: string[] }
  | { type: 'warning'; items: string[] }
  | { type: 'info'; items: string[] }
  | { type: 'callout'; title: string; content: string; variant?: 'default' | 'success' | 'warning' | 'error' };

export interface LessonData {
  id: string;
  title: string;
  summary: string;
  // Legacy support
  paragraphs?: string[];
  code?: CodeSample[];
  tips?: string[];
  warnings?: string[];
  infos?: string[];
  images?: MediaData[];
  // New flexible content blocks (preferred)
  content?: ContentBlock[];
  // Or custom JSX body
  body?: React.ReactNode;
}

export interface ExerciseData {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  starter?: string;
  solution?: string;
  hints?: string[];
  interactive?: boolean; // If true, provides runnable code environment
  images?: MediaData[]; // Supporting images for the exercise
}

export interface OverviewData {
  intro?: string;
  objectives: string[];
  prerequisites: string[];
  whyTitle?: string;
  whyBullets?: string[];
  topics?: string[];
  progress?: { title: string; description?: string }[];
  heroImage?: MediaData;
}

export interface InteractiveUnitTemplateProps {
  unitTitle: string;
  unitSubtitle: string;
  overview: OverviewData;
  lessons: LessonData[];
  exercises: ExerciseData[];
}

// Utility functions
const escapeTpl = (s?: string) => (s ?? '').replace(/\$\{/g, '\\${');

const parseMarkdown = (text: string): React.ReactNode => {
  // Handle bold, italic, inline code, and links
  const parts = text.split(/(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={index} className={styles.inlineCode}>{part.slice(1, -1)}</code>;
    }
    // Basic link support [text](url)
    const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
    if (linkMatch) {
      return <a key={index} href={linkMatch[2]} target="_blank" rel="noopener noreferrer">{linkMatch[1]}</a>;
    }
    return part;
  });
};

// Image component with lightbox
const ImageBlock: React.FC<{ data: MediaData; onExpand?: (data: MediaData) => void }> = ({ data, onExpand }) => {
  return (
    <figure className={styles.imageBlock}>
      <div className={styles.imageWrapper}>
        <img
          src={data.src}
          alt={data.alt}
          className={styles.image}
          style={{ maxWidth: data.width || '100%' }}
          loading="lazy"
        />
        {onExpand && (
          <button
            className={styles.expandButton}
            onClick={() => onExpand(data)}
            aria-label="Expand image"
          >
            <Maximize2 size={18} />
          </button>
        )}
        {data.type === 'gif' && <span className={styles.gifBadge}>GIF</span>}
      </div>
      {data.caption && (
        <figcaption className={styles.imageCaption}>{parseMarkdown(data.caption)}</figcaption>
      )}
    </figure>
  );
};

// Lightbox component
const Lightbox: React.FC<{ data: MediaData; onClose: () => void }> = ({ data, onClose }) => {
  return (
    <div className={styles.lightboxOverlay} onClick={onClose}>
      <button className={styles.lightboxClose} onClick={onClose}>
        <X size={24} />
      </button>
      <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
        <img src={data.src} alt={data.alt} className={styles.lightboxImage} />
        {data.caption && (
          <p className={styles.lightboxCaption}>{data.caption}</p>
        )}
      </div>
    </div>
  );
};

// Static code block (non-interactive)
const StaticCodeBlock: React.FC<{ data: CodeSample }> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(data.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={styles.codeExample}>
      {data.title && <h4 className={styles.codeTitle}>{data.title}</h4>}
      <div className={styles.staticCodeWrapper}>
        <button className={styles.copyButton} onClick={copyCode}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <pre className={styles.codeBlock}>{escapeTpl(data.code)}</pre>
      </div>
    </div>
  );
};

// Render content blocks
const renderContentBlock = (
  block: ContentBlock,
  index: number,
  onExpandImage?: (data: MediaData) => void
): React.ReactNode => {
  switch (block.type) {
    case 'paragraph':
      return <p key={index}>{parseMarkdown(block.content)}</p>;
    
    case 'heading':
      const headingContent = parseMarkdown(block.content);
      switch (block.level) {
        case 1:
          return <h1 key={index}>{headingContent}</h1>;
        case 2:
          return <h2 key={index}>{headingContent}</h2>;
        case 3:
          return <h3 key={index}>{headingContent}</h3>;
        default:
          return <h3 key={index}>{headingContent}</h3>;
      }
    
    case 'code':
      return block.data.interactive ? (
        <InteractivePythonBlock
          key={index}
          initialCode={block.data.code}
          title={block.data.title}
        />
      ) : (
        <StaticCodeBlock key={index} data={block.data} />
      );
    
    case 'media':
      return <ImageBlock key={index} data={block.data} onExpand={onExpandImage} />;
    
    case 'tip':
      return (
        <div key={index} className={styles.tipBox}>
          <h4 className={styles.tipTitle}>💡 Tips</h4>
          <ul className={styles.conceptList}>
            {block.items.map((item, i) => <li key={i}>{parseMarkdown(item)}</li>)}
          </ul>
        </div>
      );
    
    case 'warning':
      return (
        <div key={index} className={styles.warningBox}>
          <h4 className={styles.warningTitle}>⚠️ Heads up</h4>
          <ul className={styles.conceptList}>
            {block.items.map((item, i) => <li key={i}>{parseMarkdown(item)}</li>)}
          </ul>
        </div>
      );
    
    case 'info':
      return (
        <div key={index} className={styles.infoBox}>
          <h4 className={styles.infoTitle}>ℹ️ Info</h4>
          <ul className={styles.conceptList}>
            {block.items.map((item, i) => <li key={i}>{parseMarkdown(item)}</li>)}
          </ul>
        </div>
      );
    
    case 'callout':
      const variantClass = block.variant ? styles[`callout${block.variant.charAt(0).toUpperCase() + block.variant.slice(1)}`] : '';
      return (
        <div key={index} className={`${styles.callout} ${variantClass}`}>
          <h4 className={styles.calloutTitle}>{block.title}</h4>
          <p>{parseMarkdown(block.content)}</p>
        </div>
      );
    
    default:
      return null;
  }
};

const InteractiveUnitTemplate: React.FC<InteractiveUnitTemplateProps> = ({
  unitTitle,
  unitSubtitle,
  overview,
  lessons,
  exercises
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'lessons' | 'practice'>('overview');
  const [openLesson, setOpenLesson] = useState<string | null>(null);
  const [openExercise, setOpenExercise] = useState<string | null>(null);
  const [openSolution, setOpenSolution] = useState<Record<string, boolean>>({});
  const [openHints, setOpenHints] = useState<Record<string, number>>({});
  const [lightboxImage, setLightboxImage] = useState<MediaData | null>(null);

  const revealNextHint = (exerciseId: string, totalHints: number) => {
    setOpenHints((prev) => ({
      ...prev,
      [exerciseId]: Math.min((prev[exerciseId] || 0) + 1, totalHints)
    }));
  };

  return (
    <div className={styles.container}>
      {lightboxImage && (
        <Lightbox data={lightboxImage} onClose={() => setLightboxImage(null)} />
      )}

      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>{unitTitle}</h1>
          <p className={styles.subtitle}>{unitSubtitle}</p>
        </div>
      </header>

      <nav className={styles.navigation}>
        <div className={styles.navContent}>
          <div className={styles.navTabs}>
            <button
              className={`${styles.navTab} ${activeTab === 'overview' ? styles.navTabActive : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <BookOpen className={styles.navTabIcon} /> Overview
            </button>
            <button
              className={`${styles.navTab} ${activeTab === 'lessons' ? styles.navTabActive : ''}`}
              onClick={() => setActiveTab('lessons')}
            >
              <Play className={styles.navTabIcon} /> Lessons
            </button>
            <button
              className={`${styles.navTab} ${activeTab === 'practice' ? styles.navTabActive : ''}`}
              onClick={() => setActiveTab('practice')}
            >
              <Monitor className={styles.navTabIcon} /> Practice
            </button>
          </div>
        </div>
      </nav>

      <main className={styles.main}>
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className={styles.tabContent}>
            <section className={styles.overviewSection}>
              <h2 className={styles.sectionTitle}>Unit Overview</h2>
              
              {overview.heroImage && (
                <ImageBlock data={overview.heroImage} onExpand={setLightboxImage} />
              )}
              
              {overview.intro && (
                <p className={styles.progressDescription}>{parseMarkdown(overview.intro)}</p>
              )}
              
              <div className={styles.overviewGrid}>
                <div className={styles.objectivesCard}>
                  <h3 className={styles.cardTitle}>Learning Objectives</h3>
                  <ul className={styles.objectivesList}>
                    {overview.objectives.map((o, i) => <li key={i}>{parseMarkdown(o)}</li>)}
                  </ul>
                </div>
                <div className={styles.prerequisitesCard}>
                  <h3 className={styles.cardTitle}>Prerequisites</h3>
                  <ul className={styles.objectivesList}>
                    {overview.prerequisites.map((p, i) => <li key={i}>{parseMarkdown(p)}</li>)}
                  </ul>
                </div>
              </div>

              {(overview.whyTitle || overview.whyBullets?.length) && (
                <div className={styles.tipBox}>
                  <h3 className={styles.tipTitle}>{overview.whyTitle || 'Why This Unit Matters'}</h3>
                  {overview.whyBullets && (
                    <ul className={styles.conceptList}>
                      {overview.whyBullets.map((b, i) => <li key={i}>{parseMarkdown(b)}</li>)}
                    </ul>
                  )}
                </div>
              )}
            </section>

            {overview.progress && overview.progress.length > 0 && (
              <section className={styles.progressSection}>
                <h2 className={styles.sectionTitle}>Unit Progress</h2>
                <div className={styles.progressGrid}>
                  {overview.progress.map((p, i) => (
                    <div key={i} className={styles.progressItem}>
                      <div className={styles.progressNumber}>{i + 1}</div>
                      <div className={styles.progressContent}>
                        <div className={styles.progressTitle}>{p.title}</div>
                        {p.description && (
                          <p className={styles.progressDescription}>{parseMarkdown(p.description)}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* Lessons Tab */}
        {activeTab === 'lessons' && (
          <div className={styles.lessonsGrid}>
            {lessons.map((lsn) => {
              const open = openLesson === lsn.id;
              return (
                <article key={lsn.id} className={styles.lessonCard}>
                  <button
                    className={styles.lessonHeader}
                    onClick={() => setOpenLesson(open ? null : lsn.id)}
                    aria-expanded={open}
                  >
                    <div className={styles.lessonHeaderContent}>
                      <h3 className={styles.lessonTitle}>{lsn.title}</h3>
                      <p className={styles.lessonDescription}>{lsn.summary}</p>
                    </div>
                    {open ? <ChevronDown className={styles.chevron} /> : <ChevronRight className={styles.chevron} />}
                  </button>

                  {open && (
                    <div className={styles.lessonBody}>
                      <div className={styles.lessonContent}>
                        {/* New content blocks approach */}
                        {lsn.content ? (
                          lsn.content.map((block, i) => renderContentBlock(block, i, setLightboxImage))
                        ) : lsn.body ? (
                          typeof lsn.body === 'string' ? (
                            lsn.body.split('\n\n').map((paragraph, i) => {
                              if (paragraph.startsWith('### ')) {
                                return <h3 key={i}>{parseMarkdown(paragraph.substring(4))}</h3>;
                              } else if (paragraph.startsWith('## ')) {
                                return <h2 key={i}>{parseMarkdown(paragraph.substring(3))}</h2>;
                              } else if (paragraph.startsWith('# ')) {
                                return <h1 key={i}>{parseMarkdown(paragraph.substring(2))}</h1>;
                              } else {
                                return <p key={i}>{parseMarkdown(paragraph)}</p>;
                              }
                            })
                          ) : (
                            lsn.body
                          )
                        ) : (
                          <>
                            {/* Legacy support */}
                            {lsn.paragraphs?.map((p, i) => <p key={i}>{parseMarkdown(p)}</p>)}
                            
                            {lsn.images?.map((img, i) => (
                              <ImageBlock key={`img-${i}`} data={img} onExpand={setLightboxImage} />
                            ))}
                            
                            {lsn.infos && (
                              <div className={styles.infoBox}>
                                <h4 className={styles.infoTitle}>ℹ️ Info</h4>
                                <ul className={styles.conceptList}>
                                  {lsn.infos.map((x, i) => <li key={i}>{parseMarkdown(x)}</li>)}
                                </ul>
                              </div>
                            )}
                            
                            {lsn.warnings && (
                              <div className={styles.warningBox}>
                                <h4 className={styles.warningTitle}>⚠️ Heads up</h4>
                                <ul className={styles.conceptList}>
                                  {lsn.warnings.map((x, i) => <li key={i}>{parseMarkdown(x)}</li>)}
                                </ul>
                              </div>
                            )}
                            
                            {lsn.tips && (
                              <div className={styles.tipBox}>
                                <h4 className={styles.tipTitle}>💡 Tips</h4>
                                <ul className={styles.conceptList}>
                                  {lsn.tips.map((x, i) => <li key={i}>{parseMarkdown(x)}</li>)}
                                </ul>
                              </div>
                            )}
                            
                            {lsn.code?.map((c, i) => (
                              c.interactive ? (
                                <InteractivePythonBlock
                                  key={i}
                                  initialCode={c.code}
                                  title={c.title}
                                />
                              ) : (
                                <StaticCodeBlock key={i} data={c} />
                              )
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}

        {/* Practice Tab */}
        {activeTab === 'practice' && (
          <div className={styles.tabContent}>
            <section className={styles.overviewSection}>
              <h2 className={styles.sectionTitle}>Practice Exercises</h2>
              <p className={styles.practiceIntro}>
                Put your knowledge to the test! Exercises marked with the <span className={styles.interactiveBadge}>Interactive</span> badge 
                let you write and run Python code directly in your browser.
              </p>
              
              <div className={styles.progressGrid}>
                {exercises.map((ex) => {
                  const open = openExercise === ex.id;
                  const solOpen = !!openSolution[ex.id];
                  const hintsRevealed = openHints[ex.id] || 0;
                  
                  return (
                    <article key={ex.id} className={styles.lessonCard}>
                      <div
                        className={styles.lessonHeader}
                        onClick={() => setOpenExercise(open ? null : ex.id)}
                      >
                        <div className={styles.lessonHeaderContent}>
                          <h3 className={styles.lessonTitle}>
                            {ex.title}
                            {ex.interactive && (
                              <span className={styles.interactiveBadge}>Interactive</span>
                            )}
                          </h3>
                          <p className={styles.lessonDescription}>{parseMarkdown(ex.description)}</p>
                        </div>
                        <span className={`${styles.difficultyBadge} ${styles[ex.difficulty]}`}>
                          {ex.difficulty}
                        </span>
                        {open ? <ChevronDown className={styles.chevron} /> : <ChevronRight className={styles.chevron} />}
                      </div>

                      {open && (
                        <div className={styles.lessonBody}>
                          {/* Exercise images */}
                          {ex.images?.map((img, i) => (
                            <ImageBlock key={i} data={img} onExpand={setLightboxImage} />
                          ))}
                          
                          {/* Starter code - interactive or static */}
                          {ex.starter && (
                            ex.interactive ? (
                              <InteractivePythonBlock
                                initialCode={ex.starter}
                                title="Your Code"
                              />
                            ) : (
                              <div className={styles.codeExample}>
                                <h4 className={styles.codeTitle}>Starter Code</h4>
                                <pre className={styles.codeBlock}>{escapeTpl(ex.starter)}</pre>
                              </div>
                            )
                          )}

                          {/* Hints system */}
                          {ex.hints && ex.hints.length > 0 && (
                            <div className={styles.hintsSection}>
                              <button
                                className={styles.hintButton}
                                onClick={() => revealNextHint(ex.id, ex.hints!.length)}
                                disabled={hintsRevealed >= ex.hints.length}
                              >
                                {hintsRevealed >= ex.hints.length
                                  ? 'All hints revealed'
                                  : `Show Hint ${hintsRevealed + 1} of ${ex.hints.length}`}
                              </button>
                              
                              {hintsRevealed > 0 && (
                                <div className={styles.hintsList}>
                                  {ex.hints.slice(0, hintsRevealed).map((hint, i) => (
                                    <div key={i} className={styles.hintItem}>
                                      <span className={styles.hintNumber}>Hint {i + 1}:</span>
                                      {parseMarkdown(hint)}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Solution toggle */}
                          {ex.solution && (
                            <button
                              className={styles.solutionButton}
                              onClick={() =>
                                setOpenSolution((m) => ({ ...m, [ex.id]: !m[ex.id] }))
                              }
                            >
                              {solOpen ? 'Hide Solution' : 'View Solution'}
                            </button>
                          )}

                          {ex.solution && solOpen && (
                            <div className={styles.codeExample}>
                              <h4 className={styles.codeTitle}>Solution</h4>
                              <pre className={styles.codeBlock}>{escapeTpl(ex.solution)}</pre>
                            </div>
                          )}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default InteractiveUnitTemplate;