import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Play,
  Code,
  BookOpen,
  Database,
  Filter,
  BarChart3,
  Link as LinkIcon,
  ShieldAlert
} from 'lucide-react';
import styles from '../unit2/CSCI133Unit2.module.css';

interface Lesson {
  id: string;
  title: string;
  description: string;
  content: React.ReactElement;
}

interface Exercise {
  title: string;
  description: string;
  starter: string;
  solution: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const CSCI133Unit6: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'overview' | 'lessons' | 'practice'>('overview');

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  
  const lessons: Lesson[] = [
    {
      id: 'notice',
      title: 'Unit 6 Notice: Certificates for urllib',
      description:
        'If web examples fail to run, your device may need updated certificates for Python’s urllib module.',
      content: (
        <div className={styles.lessonContent}>
          <div className={styles.infoBox}>
            <h4 className={styles.infoTitle}>
              <ShieldAlert className={styles.inlineIcon} /> Read this first
            </h4>
            <p>
              If the example programs that access a URL fail on your computer before any code runs,
              it’s likely a local certificate issue. Follow your OS instructions from our course page to
              install/update the Python certificates. After that, the web programs in this unit should run normally.
            </p>
          </div>
          <p>
            You can still complete most practice by using local files if your machine is offline—web access is
            helpful but not strictly required for learning the core concepts.
          </p>
        </div>
      )
    },
    {
      id: 'part1',
      title: 'Part 1: Reading from the Web with urllib.request',
      description: 'Open a URL, read bytes, decode to text, and work with line lists.',
      content: (
        <div className={styles.lessonContent}>
          <p>
            We’ve been opening local files with <code className={styles.inlineCode}>open()</code>. We can open resources
            on the web in a very similar way using <code className={styles.inlineCode}>urllib.request</code>.
            The key difference is that data arrives as <strong>bytes</strong>, so we need to{' '}
            <code className={styles.inlineCode}>decode()</code> it to get a normal Python string.
          </p>

          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <LinkIcon className={styles.codeIcon} />
              Reading a text file from the web
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`import urllib.request

url = 'https://www.gutenberg.org/files/76/76-0.txt'   # Huckleberry Finn (public domain)
book = urllib.request.urlopen(url)                     # returns a file-like object
lines = book.readlines()                               # returns a list of BYTES
book.close()

# Look at one line (bytes)
print(lines[461])

# Convert bytes -> str with decode()
print(lines[461].decode())

# Trim trailing newline/carriage returns using slicing
print(lines[461].decode()[:-2])`}</code>
            </pre>
          </div>

          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>Bytes vs Strings</h4>
            <ul className={styles.conceptList}>
              <li>
                Web reads return <code className={styles.inlineCode}>bytes</code>.
              </li>
              <li>
                Convert with <code className={styles.inlineCode}>decode()</code> to work with text.
              </li>
              <li>
                Use slicing like <code className={styles.inlineCode}>[:-2]</code> to drop trailing <code>\r\n</code>.
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'part2',
      title: 'Part 2: Persisting Data with shelve',
      description: 'Save processed results once; reuse them instantly in later runs.',
      content: (
        <div className={styles.lessonContent}>
          <p>
            The <code className={styles.inlineCode}>shelve</code> module behaves like a tiny on-disk dictionary.
            Compute once, store the result, and load it later without re-downloading or re-processing.
          </p>

          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <Database className={styles.codeIcon} />
              Save selected lines from the book into a shelf
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`import urllib.request, shelve

url = 'https://www.gutenberg.org/files/76/76-0.txt'
book = urllib.request.urlopen(url)
lines = book.readlines()
book.close()

# Keep only the actual novel (skip front matter)
# In this public text, the novel roughly starts near line 21 and ends near 11990
final_lines = [line.decode()[:-2] for line in lines[21:11990]]

shelf = shelve.open('books')
shelf['Huckleberry Finn'] = final_lines
shelf.close()

# Later: re-open and use
shelf = shelve.open('books')
for line in shelf['Huckleberry Finn'][:5]:
    print(line)
shelf.close()`}</code>
            </pre>
          </div>

          <div className={styles.infoBox}>
            <h4 className={styles.infoTitle}>Why shelve?</h4>
            <p>
              Shelves persist Python objects (lists, dicts, etc.). This speeds up experimentation and lets students
              focus on the analysis steps rather than repeatedly downloading/processing large text.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'part3',
      title: 'Part 3: List Comprehensions for Compact Processing',
      description: 'Rewrite multi-line loops as clean, expressive one-liners.',
      content: (
        <div className={styles.lessonContent}>
          <p>
            A <strong>list comprehension</strong> lets us create a list in a single expression. It’s perfect for
            “decode then trim” operations on every line.
          </p>

          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>Example transformation</h4>
            <pre className={styles.codeBlock}>
              <code>{`# Traditional loop
results = []
for line in lines[21:11990]:
    results.append(line.decode()[:-2])

# List comprehension
results = [line.decode()[:-2] for line in lines[21:11990]]`}</code>
            </pre>
          </div>

          <div className={styles.infoBox}>
            <h4 className={styles.infoTitle}>Tip</h4>
            <p>
              Start with the longer “for/append” version to ensure correctness. Once it works, consider converting
              to a comprehension for readability.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'part4',
      title: 'Part 4: CPI Data — Parsing & Reshaping',
      description: 'Load CPI data from a URL, parse numeric fields, and build a year → monthly-values dictionary.',
      content: (
        <div className={styles.lessonContent}>
          <p>
            The CPI (Consumer Price Index) dataset we’ll use includes header lines and then rows with the year and
            12 monthly values. We’ll skip headers, parse numbers, and store each year’s 12 months in a list.
          </p>

          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <BarChart3 className={styles.codeIcon} />
              Building <code>cpi</code> as a dictionary
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`import urllib.request, shelve

url = 'https://turbvy.org/r/data/cpi/a1.txt'  # Example URL; use your course-provided link if different
f = urllib.request.urlopen(url)
lines = f.readlines()
f.close()

cpi = {}
for raw in lines:
    s = raw.decode().strip()

    # Skip header/blank lines: keep only lines whose first token is a year
    if not s or not s.split()[0].isdigit():
        continue

    items = s.split()
    year = int(items[0])
    # Extract 12 monthly values, convert to float
    months = [float(x) for x in items[1:13]]

    cpi[year] = months

# Persist for later parts
db = shelve.open('cpi')
db['cpi'] = cpi
db.close()`}</code>
            </pre>
          </div>

          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>String Methods You’ll Use</h4>
            <ul className={styles.conceptList}>
              <li>
                <code className={styles.inlineCode}>split()</code> — separate a line into tokens
              </li>
              <li>
                <code className={styles.inlineCode}>isdigit()</code> — check if a token looks like an integer year
              </li>
              <li>List comprehension to convert strings → floats</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'part5',
      title: 'Part 5: Analysis with Logical Operators (and/or/not)',
      description:
        'Filter and summarize CPI using combined conditions. The “and” keyword joins two conditions into one.',
      content: (
        <div className={styles.lessonContent}>
          <p>
            From this unit forward, you may—and should—use logical operators in programs, practice, and tests. The{' '}
            <code className={styles.inlineCode}>and</code> keyword means both conditions must be true;{' '}
            <code className={styles.inlineCode}>or</code> means at least one is true;{' '}
            <code className={styles.inlineCode}>not</code> negates a condition.
          </p>

          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <Filter className={styles.codeIcon} />
              Example: months where prices fell from January to February (1920–1990)
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`import shelve

db = shelve.open('cpi')
cpi = db['cpi']
db.close()

for year in range(1920, 1991):
    jan = cpi[year][0]
    feb = cpi[year][1]
    if jan > feb and year % 10 != 5:  # use 'and' to combine checks
        print(year)`}</code>
            </pre>
          </div>

          <div className={styles.infoBox}>
            <h4 className={styles.infoTitle}>Remember</h4>
            <p>
              Use parentheses to make complex conditions readable, especially when mixing{' '}
              <code className={styles.inlineCode}>and</code> and <code className={styles.inlineCode}>or</code>.
            </p>
          </div>
        </div>
      )
    }
  ];

    const practiceExercises: Exercise[] = [
    {
        title: 'Exercise 1: Read and Decode Web Data',
        description:
        'Use urllib.request to open a text file from the web, read all lines, decode them, and strip the trailing characters. Print only the first 5 lines to verify your output.',
        difficulty: 'beginner',
        starter: `import urllib.request

    url = 'https://www.gutenberg.org/files/76/76-0.txt'  # Huckleberry Finn
    book = urllib.request.urlopen(url)

    # TODO:
    # 1. Read all lines (as bytes)
    # 2. Decode each to a string
    # 3. Trim trailing \\r\\n with slicing
    # 4. Print the first 5 lines

    `,
        solution: `import urllib.request
    url = 'https://www.gutenberg.org/files/76/76-0.txt'
    book = urllib.request.urlopen(url)
    lines = book.readlines()
    book.close()

    decoded = [b.decode()[:-2] for b in lines]
    for line in decoded[:5]:
        print(line)`
    },
    {
        title: 'Exercise 2: Persist Text Data with shelve',
        description:
        'Store a cleaned list of lines in a shelve database so it can be reused later. Save the text under a key like "Huck" and confirm it reloads correctly.',
        difficulty: 'beginner',
        starter: `import shelve

    # Suppose final_lines is your cleaned list of strings
    final_lines = ["Sample", "Lines", "Go", "Here"]

    # TODO:
    # 1. Save to shelf under key 'Huck'
    # 2. Reopen shelf, load it back, and print the first 3 lines
    `,
        solution: `import shelve

    final_lines = ["Sample", "Lines", "Go", "Here"]

    s = shelve.open('books')
    s['Huck'] = final_lines
    s.close()

    s = shelve.open('books')
    restored = s['Huck']
    s.close()

    for line in restored[:3]:
        print(line)`
    },
    {
        title: 'Exercise 3: Filtering Lines by Keyword',
        description:
        'Write code that finds and prints all lines from your Huckleberry Finn data containing the word "cat". Later, you’ll use this to solve Q0.4.',
        difficulty: 'intermediate',
        starter: `# Assume you have: lines = [...]
    # TODO:
    # 1. Loop through all lines
    # 2. If 'cat' (in any case) appears, print the line
    `,
        solution: `for line in lines:
        if 'cat' in line.lower():
            print(line)`
    },
    {
        title: 'Exercise 4: Transform to a List Comprehension',
        description:
        'Rewrite your loop from Exercise 3 as a list comprehension that collects all "cat" lines in a single list variable called cat_lines.',
        difficulty: 'intermediate',
        starter: `# Original:
    cat_lines = []
    for line in lines:
        if 'cat' in line.lower():
            cat_lines.append(line)

    # TODO: rewrite as list comprehension
    `,
        solution: `cat_lines = [line for line in lines if 'cat' in line.lower()]`
    },
    {
        title: 'Exercise 5: Create a CPI Dictionary',
        description:
        'Use urllib.request to load CPI data, skip headers, and create a dictionary cpi where each key is a year and the value is a list of 12 monthly floats.',
        difficulty: 'intermediate',
        starter: `import urllib.request

    url = 'https://futureboy.us/finkdata/cpiai.txt'
    f = urllib.request.urlopen(url)
    lines = f.readlines()
    f.close()

    cpi = {}
    # TODO:
    # 1. Skip headers and blank lines
    # 2. Split lines into tokens
    # 3. Convert 12 monthly values to float
    `,
        solution: `import urllib.request

    url = 'https://futureboy.us/finkdata/cpiai.txt'
    f = urllib.request.urlopen(url)
    lines = f.readlines()
    f.close()

    cpi = {}
    for raw in lines:
        s = raw.decode().strip()
        if not s or not s.split()[0].isdigit():
            continue
        items = s.split()
        year = int(items[0])
        cpi[year] = [float(x) for x in items[1:13]]`
    },
    {
        title: 'Exercise 6: Persist and Reuse CPI Data',
        description:
        'Save your CPI dictionary to a shelve file called "cpi" and reload it to verify persistence. You’ll need this for Q0.6.',
        difficulty: 'beginner',
        starter: `import shelve

    # Assume you built a cpi dictionary
    # TODO:
    # 1. Save it to shelve
    # 2. Load it again and print one year’s data
    `,
        solution: `import shelve

    db = shelve.open('cpi')
    db['cpi'] = cpi
    db.close()

    db = shelve.open('cpi')
    cpi_loaded = db['cpi']
    db.close()

    print(cpi_loaded[2020])`
    },
    {
        title: 'Exercise 7: Combine Conditions with and/or/not',
        description:
        'Practice filtering data using multiple logical conditions. For example, print all years where the CPI for January is greater than February and the year is even.',
        difficulty: 'advanced',
        starter: `for year, months in cpi.items():
        # TODO: use 'and' to check both conditions
        pass
    `,
        solution: `for year, months in cpi.items():
        if months[0] > months[1] and year % 2 == 0:
            print(year)`
    },
    {
        title: 'Exercise 8: Practice Writing Small Functions',
        description:
        'Define a function lengths that returns a list of string lengths given a list of strings — a warmup for Q1.',
        difficulty: 'beginner',
        starter: `def lengths(strings):
        # TODO: return list of lengths using list comprehension
        pass

    print(lengths(['Ed', 'Ted', 'Fred', 'Jennifer']))  # [2, 3, 4, 8]
    `,
        solution: `def lengths(strings):
        return [len(s) for s in strings]

    print(lengths(['Ed', 'Ted', 'Fred', 'Jennifer']))`
    },
    {
        title: 'Exercise 9: Percentage Change Function',
        description:
        'Write a function percent_increase(begin, end) that returns 100*(end/begin - 1). Use it to print CPI summer increases for each year. This prepares you for Q4.',
        difficulty: 'advanced',
        starter: `def percent_increase(begin, end):
        # TODO: implement formula 100*(end/begin - 1)
        pass
    `,
        solution: `def percent_increase(begin, end):
        return 100 * (end / begin - 1)

    print(percent_increase(2, 3))  # 50.0`
    },
    {
        title: 'Exercise 10: Apply Logic and Shelve Together',
        description:
        'Open your CPI shelve, use a logical condition with and/or to print the years where prices fell from January to February — exactly like Q0.6.',
        difficulty: 'advanced',
        starter: `import shelve
    db = shelve.open('cpi')
    cpi = db['cpi']
    db.close()

    # TODO: print years where January > February
    `,
        solution: `import shelve
    db = shelve.open('cpi')
    cpi = db['cpi']
    db.close()

    for year in range(1920, 1991):
        if cpi[year][0] > cpi[year][1]:
            print(year)`
    }
    ];


  const getDifficultyColor = (difficulty: Exercise['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'rgba(34, 197, 94, 0.8)';
      case 'intermediate':
        return 'rgba(251, 191, 36, 0.8)';
      case 'advanced':
      default:
        return 'rgba(239, 68, 68, 0.8)';
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>CSCI 133: Computer Programming</h1>
          <p className={styles.subtitle}>Unit 6: Data Processing and Logical Operators</p>
          <div className={styles.courseMeta}>
            <span>Hunter College</span>
            <span>•</span>
            <span>Fall 2025</span>
            <span>•</span>
            <span>{lessons.length} Parts</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className={styles.navigation}>
        <div className={styles.navContent}>
          <nav className={styles.navTabs}>
            {[
              { id: 'overview' as const, label: 'Overview', icon: BookOpen },
              { id: 'lessons' as const, label: 'Lessons', icon: Code },
              { id: 'practice' as const, label: 'Practice', icon: Play }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`${styles.navTab} ${activeTab === id ? styles.navTabActive : ''}`}
              >
                <Icon className={styles.navTabIcon} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className={styles.main}>
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className={styles.tabContent}>
            <div className={styles.overviewSection}>
              <h2 className={styles.sectionTitle}>Unit Overview</h2>
              <p className={styles.sectionDescription}>
                In this unit you’ll learn how to fetch data from the web, decode and clean it, store it with
                <code className={styles.inlineCode}> shelve</code>, and analyze it using list comprehensions and
                logical operators—especially the <strong>and</strong> keyword for combining conditions. Our capstone
                example processes CPI data to answer questions about price changes over time.
              </p>

              <div className={styles.overviewGrid}>
                <div className={styles.objectivesCard}>
                  <h3 className={styles.cardTitle}>Learning Objectives</h3>
                  <ul className={styles.objectivesList}>
                    <li>Open URLs and read bytes with <code>urllib.request</code></li>
                    <li>Decode bytes to strings; clean text with slicing</li>
                    <li>Persist Python objects using <code>shelve</code></li>
                    <li>Write concise list comprehensions</li>
                    <li>Parse tabular text into typed structures</li>
                    <li>
                      Apply <code>and</code>, <code>or</code>, and <code>not</code> to combine conditions in analyses
                    </li>
                  </ul>
                </div>

                <div className={styles.prerequisitesCard}>
                  <h3 className={styles.cardTitle}>Prerequisites</h3>
                  <ul className={styles.objectivesList}>
                    <li>Comfort with loops, indexing, and slicing</li>
                    <li>Basic file reading/writing from earlier units</li>
                    <li>Try/except awareness is helpful but optional</li>
                  </ul>
                </div>
              </div>

              <div className={styles.infoBox}>
                <h4 className={styles.infoTitle}>Policy for this unit and going forward</h4>
                <p>
                  You may use the logical operator <code className={styles.inlineCode}>and</code> in all example runs,
                  practice programs, and at-home tests from now on. Feel free to use <code>or</code> and{' '}
                  <code>not</code> as well when appropriate.
                </p>
              </div>
            </div>

            <div className={styles.progressSection}>
              <h3 className={styles.sectionTitle}>Unit Progress</h3>
              <div className={styles.progressGrid}>
                {lessons.map((lesson, index) => (
                  <div key={lesson.id} className={styles.progressItem}>
                    <div className={styles.progressNumber}>{index + 1}</div>
                    <div className={styles.progressContent}>
                      <h4 className={styles.progressTitle}>{lesson.title}</h4>
                      <p className={styles.progressDescription}>{lesson.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Lessons Tab */}
        {activeTab === 'lessons' && (
          <div className={styles.tabContent}>
            <div className={styles.lessonsGrid}>
              {lessons.map(lesson => (
                <div key={lesson.id} className={styles.lessonCard}>
                  <button onClick={() => toggleSection(lesson.id)} className={styles.lessonHeader}>
                    <div className={styles.lessonHeaderContent}>
                      <h3 className={styles.lessonTitle}>{lesson.title}</h3>
                      <p className={styles.lessonDescription}>{lesson.description}</p>
                    </div>
                    {expandedSections[lesson.id] ? (
                      <ChevronDown className={styles.chevron} />
                    ) : (
                      <ChevronRight className={styles.chevron} />
                    )}
                  </button>

                  {expandedSections[lesson.id] && <div className={styles.lessonBody}>{lesson.content}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Practice Tab */}
        {activeTab === 'practice' && (
          <div className={styles.tabContent}>
            <div className={styles.practiceIntro}>
              <h2 className={styles.sectionTitle}>Practice Exercises</h2>
              <p className={styles.sectionDescription}>
                Start with decoding and shelves, then move to CPI parsing and multi-condition filters. Use small sample
                files first, then scale up once you’re confident.
              </p>
            </div>

            <div className={styles.exercisesGrid}>
              {practiceExercises.map((exercise, index) => (
                <div key={index} className={styles.exerciseCard}>
                  <button
                    onClick={() => toggleSection(`exercise-${index}`)}
                    className={styles.exerciseHeader}
                  >
                    <div className={styles.exerciseHeaderContent}>
                      <div className={styles.exerciseTitleRow}>
                        <h3 className={styles.exerciseTitle}>{exercise.title}</h3>
                        <span
                          className={styles.difficultyBadge}
                          style={{ backgroundColor: getDifficultyColor(exercise.difficulty) }}
                        >
                          {exercise.difficulty}
                        </span>
                      </div>
                      <p className={styles.exerciseDescription}>{exercise.description}</p>
                    </div>
                    {expandedSections[`exercise-${index}`] ? (
                      <ChevronDown className={styles.chevron} />
                    ) : (
                      <ChevronRight className={styles.chevron} />
                    )}
                  </button>

                  {expandedSections[`exercise-${index}`] && (
                    <div className={styles.exerciseBody}>
                      <div className={styles.exerciseContent}>
                        <div className={styles.starterSection}>
                          <h4 className={styles.starterTitle}>Starter Code:</h4>
                          <pre className={styles.codeBlock}>
                            <code>{exercise.starter}</code>
                          </pre>
                        </div>

                        <details className={styles.solutionDetails}>
                          <summary className={styles.solutionSummary}>View Solution</summary>
                          <div className={styles.solutionContent}>
                            <pre className={styles.codeBlock}>
                              <code>{exercise.solution}</code>
                            </pre>
                          </div>
                        </details>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className={styles.helpSection}>
              <h3 className={styles.helpTitle}>Need Help?</h3>
              <p className={styles.helpDescription}>
                Keep these points in mind while you work:
              </p>
              <ul className={styles.helpList}>
                <li>
                  Web reads return <code className={styles.inlineCode}>bytes</code>. Use{' '}
                  <code className={styles.inlineCode}>decode()</code> to turn them into strings.
                </li>
                <li>
                  Use <code className={styles.inlineCode}>[:-2]</code> to trim trailing <code>\r\n</code> if needed.
                </li>
                <li>
                  <code className={styles.inlineCode}>shelve</code> lets you save Python objects and reload them later.
                </li>
                <li>
                  <strong>Logical operators:</strong> <code className={styles.inlineCode}>and</code> (both),
                  <code className={styles.inlineCode}> or</code> (either), <code className={styles.inlineCode}>not</code>{' '}
                  (negate).
                </li>
                <li>Parentheses make complex conditions clearer.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CSCI133Unit6;
