import React, { useState } from 'react';
import { BookOpen, Play, Monitor, ChevronDown, ChevronRight } from 'lucide-react';
import styles from '../csci133/unit2/CSCI133Unit2.module.css';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface CodeSample { title?: string; code: string; }

export interface LessonData {
  id: string;
  title: string;
  summary: string;
  paragraphs?: string[];
  code?: CodeSample[];
  tips?: string[];
  warnings?: string[];
  infos?: string[];
  body?: React.ReactNode;
}

export interface ExerciseData {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  starter?: string;
  solution?: string;
}

export interface OverviewData {
  intro?: string;
  objectives: string[];
  prerequisites: string[];
  whyTitle?: string;
  whyBullets?: string[];
  topics?: string[];
  progress?: { title: string; description?: string }[];
}

export interface UnitTemplateProps {
  unitTitle: string;
  unitSubtitle: string;
  overview: OverviewData;
  lessons: LessonData[];
  exercises: ExerciseData[];
}

const escapeTpl = (s?: string) => (s ?? '').replace(/\$\{/g, '\\${');

const parseMarkdown = (text: string): React.ReactNode => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const UnitTemplate: React.FC<UnitTemplateProps> = ({
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

  return (
    <div className={styles.container}>
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
        {activeTab === 'overview' && (
          <div className={styles.tabContent}>
            <section className={styles.overviewSection}>
              <h2 className={styles.sectionTitle}>Unit Overview</h2>
              {overview.intro && <p className={styles.progressDescription}>{parseMarkdown(overview.intro)}</p>}
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
                        {lsn.body ? (
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
                            {lsn.paragraphs?.map((p, i) => <p key={i}>{parseMarkdown(p)}</p>)}
                            {lsn.infos && (
                              <div className={styles.infoBox}>
                                <h4 className={styles.infoTitle}>Info</h4>
                                <ul className={styles.conceptList}>
                                  {lsn.infos.map((x, i) => <li key={i}>{parseMarkdown(x)}</li>)}
                                </ul>
                              </div>
                            )}
                            {lsn.warnings && (
                              <div className={styles.warningBox}>
                                <h4 className={styles.warningTitle}>Heads up</h4>
                                <ul className={styles.conceptList}>
                                  {lsn.warnings.map((x, i) => <li key={i}>{parseMarkdown(x)}</li>)}
                                </ul>
                              </div>
                            )}
                            {lsn.tips && (
                              <div className={styles.tipBox}>
                                <h4 className={styles.tipTitle}>Tips</h4>
                                <ul className={styles.conceptList}>
                                  {lsn.tips.map((x, i) => <li key={i}>{parseMarkdown(x)}</li>)}
                                </ul>
                              </div>
                            )}
                            {lsn.code?.map((c, i) => (
                              <div className={styles.codeExample} key={i}>
                                {c.title && <h4 className={styles.codeTitle}>{c.title}</h4>}
                                <pre className={styles.codeBlock}>{escapeTpl(c.code)}</pre>
                              </div>
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

        {activeTab === 'practice' && (
          <div className={styles.tabContent}>
            <section className={styles.overviewSection}>
              <h2 className={styles.sectionTitle}>Practice Exercises</h2>
              <div className={styles.progressGrid}>
                {exercises.map((ex) => {
                  const open = openExercise === ex.id;
                  const solOpen = !!openSolution[ex.id];
                  return (
                    <article key={ex.id} className={styles.lessonCard}>
                      <div
                        className={styles.lessonHeader}
                        onClick={() => setOpenExercise(open ? null : ex.id)}
                      >
                        <div className={styles.lessonHeaderContent}>
                          <h3 className={styles.lessonTitle}>{ex.title}</h3>
                          <p className={styles.lessonDescription}>{parseMarkdown(ex.description)}</p>
                        </div>
                        <span className={`${styles.difficultyBadge} ${styles[ex.difficulty]}`}>
                          {ex.difficulty}
                        </span>
                        {open ? <ChevronDown className={styles.chevron} /> : <ChevronRight className={styles.chevron} />}
                      </div>

                      {open && (
                        <div className={styles.lessonBody}>
                          {ex.starter && (
                            <div className={styles.codeExample}>
                              <h4 className={styles.codeTitle}>Starter Code</h4>
                              <pre className={styles.codeBlock}>{escapeTpl(ex.starter)}</pre>
                            </div>
                          )}

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

export default UnitTemplate;