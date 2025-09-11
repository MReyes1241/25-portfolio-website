import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Play, Code, BookOpen, FileText } from 'lucide-react';
import styles from './CSCI133Unit2.module.css';

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

const CSCI133Unit2: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'overview' | 'lessons' | 'practice'>('overview');

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const lessons: Lesson[] = [
    {
      id: 'part1',
      title: 'Part 1: Functions and String Methods',
      description: 'Introduction to built-in functions and string manipulation',
      content: (
        <div className={styles.lessonContent}>
          <p>
            Functions are pre-built tools that perform specific tasks. Python comes with many built-in functions like <code className={styles.inlineCode}>len()</code> and <code className={styles.inlineCode}>print()</code>.
          </p>
          
          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>Key Functions:</h4>
            <ul className={styles.conceptList}>
              <li><code className={styles.inlineCode}>len()</code> - Returns the length of a string or list</li>
              <li><code className={styles.inlineCode}>split()</code> - Divides a string into a list of parts</li>
              <li>Functions use parentheses <code className={styles.inlineCode}>()</code> to pass information</li>
            </ul>
          </div>

          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <Code className={styles.codeIcon} />
              Function Examples
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`line = 'This is a sample line of text.'

# len() function returns the length
print(len(line))  # Output: 30

# split() method divides the string
words = line.split()
print(words)  # Output: ['This', 'is', 'a', 'sample', 'line', 'of', 'text.']

# Combining functions
print(len(line.split()))  # Output: 7 (number of words)`}</code>
            </pre>
          </div>

          <div className={styles.infoBox}>
            <h4 className={styles.infoTitle}>Method vs Function:</h4>
            <p>
              Methods like <code className={styles.inlineCode}>split()</code> are attached to objects with a dot. 
              Functions like <code className={styles.inlineCode}>len()</code> work on objects passed to them.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'part2',
      title: 'Part 2: Mathematical Operations',
      description: 'Working with numbers and arithmetic operators',
      content: (
        <div className={styles.lessonContent}>
          <p>
            Python handles mathematical operations intuitively, following standard order of operations (PEMDAS).
          </p>
          
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>Basic Arithmetic</h4>
            <pre className={styles.codeBlock}>
              <code>{`print(2 + 3)        # Addition: 5
print(7 * (5 - 2))   # Parentheses first: 21
print(36 / 3)        # Division: 12.0
print(2 ** 1000)     # Exponentiation: very large number!

# Using variables makes calculations clearer
numberOfBoxes = 4
itemsPerBox = 20
print('Total items:', numberOfBoxes * itemsPerBox)`}</code>
            </pre>
          </div>

          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>Mathematical Operators:</h4>
            <ul className={styles.conceptList}>
              <li><code className={styles.inlineCode}>+</code> Addition</li>
              <li><code className={styles.inlineCode}>-</code> Subtraction</li>
              <li><code className={styles.inlineCode}>*</code> Multiplication</li>
              <li><code className={styles.inlineCode}>/</code> Division</li>
              <li><code className={styles.inlineCode}>**</code> Exponentiation</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'part3',
      title: 'Part 3: Variable Assignment and Memory',
      description: 'Understanding how Python manages variable assignment',
      content: (
        <div className={styles.lessonContent}>
          <p>
            Variable assignment in Python creates references to objects in memory. Understanding this helps avoid common mistakes.
          </p>

          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>Assignment Examples</h4>
            <pre className={styles.codeBlock}>
              <code>{`x = 4
print(x * 2)  # Output: 8
print(x)      # Output: 4 (x hasn't changed)

# Reassignment replaces the old value
x = x * 2     # Use current value of x to calculate new value
print(x)      # Output: 8`}</code>
            </pre>
          </div>

          <div className={styles.warningBox}>
            <h4 className={styles.warningTitle}>Important Concept:</h4>
            <p>
              The equals sign <code className={styles.inlineCode}>=</code> means "assign" not "equals". 
              <code className={styles.inlineCode}>x = x * 2</code> means "calculate x * 2 and assign the result back to x."
            </p>
          </div>

          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>Python vs Other Languages:</h4>
            <ul className={styles.conceptList}>
              <li>Python automatically manages memory</li>
              <li>Variables can change type (x = 4, then x = "hello")</li>
              <li>No need to declare variable types beforehand</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'part4',
      title: 'Part 4: Augmented Assignment Operators',
      description: 'Shortcuts for common assignment patterns',
      content: (
        <div className={styles.lessonContent}>
          <p>
            Python provides shortcut operators for common assignment patterns, making code more concise and readable.
          </p>
          
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>Shortcut Operators</h4>
            <pre className={styles.codeBlock}>
              <code>{`# Instead of: x = x * 2
x *= 2

# Instead of: x = x + 1  
x += 1

# These are equivalent:
x = x * 2     # Long form
x *= 2        # Short form`}</code>
            </pre>
          </div>

          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>Common Augmented Operators:</h4>
            <ul className={styles.conceptList}>
              <li><code className={styles.inlineCode}>+=</code> Add and assign</li>
              <li><code className={styles.inlineCode}>-=</code> Subtract and assign</li>
              <li><code className={styles.inlineCode}>*=</code> Multiply and assign</li>
              <li><code className={styles.inlineCode}>/=</code> Divide and assign</li>
            </ul>
          </div>

          <div className={styles.tipBox}>
            <h4 className={styles.tipTitle}>When to Use:</h4>
            <p>
              Use augmented operators when you're updating a variable based on its current value. 
              They make the intention clear and reduce typing errors.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'part5',
      title: 'Part 5: File Input and Output',
      description: 'Reading from external files with the with statement',
      content: (
        <div className={styles.lessonContent}>
          <p>
            Reading data from files allows us to work with larger datasets and real-world information.
          </p>
          
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <FileText className={styles.codeIcon} />
              Basic File Reading
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`# Download pap.txt and place it in your program folder
with open('pap.txt') as book:
    for line in book:
        if 'property' in line:
            print(line)`}</code>
            </pre>
          </div>

          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>The with Statement:</h4>
            <ul className={styles.conceptList}>
              <li>Safely opens and closes files automatically</li>
              <li>Prevents memory leaks and file corruption</li>
              <li>Best practice for file handling in Python</li>
            </ul>
          </div>

          <div className={styles.infoBox}>
            <h4 className={styles.infoTitle}>File as Collection:</h4>
            <p>
              A file behaves like a list where each line is an item. You can use <code className={styles.inlineCode}>for</code> loops 
              to process files line by line.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'part6',
      title: 'Part 6: Text Processing and Counting',
      description: 'Analyzing text data with accumulator patterns',
      content: (
        <div className={styles.lessonContent}>
          <p>
            The accumulator pattern is fundamental for counting and collecting data as you process information.
          </p>
          
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>Word Counting Example</h4>
            <pre className={styles.codeBlock}>
              <code>{`count = 0  # Start with zero
with open('pap.txt') as book:
    for line in book:
        words_in_line = len(line.split())
        count += words_in_line  # Add to running total
        
print('Total words:', count)`}</code>
            </pre>
          </div>

          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>Accumulator Pattern:</h4>
            <ul className={styles.conceptList}>
              <li>Initialize a variable (usually to 0 or empty list)</li>
              <li>Loop through data</li>
              <li>Update the accumulator variable each iteration</li>
              <li>Use the final result after the loop</li>
            </ul>
          </div>

          <div className={styles.tipBox}>
            <h4 className={styles.tipTitle}>Common Use Cases:</h4>
            <p>
              Counting items, calculating sums, building lists, finding maximums/minimums, 
              or any situation where you need to "accumulate" results across multiple iterations.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'part7',
      title: 'Part 7: String Comparison and Nested Loops',
      description: 'Comparing values and nested iteration patterns',
      content: (
        <div className={styles.lessonContent}>
          <p>
            String comparison and nested loops enable sophisticated text analysis and pattern matching.
          </p>
          
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>String Comparison</h4>
            <pre className={styles.codeBlock}>
              <code>{`count = 0
with open('pap.txt') as book:
    for line in book:
        for word in line.split():
            if word == 'the':  # Exact match
                count += 1
                
print("Number of times 'the' is used:", count)`}</code>
            </pre>
          </div>

          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>Comparison Operators:</h4>
            <ul className={styles.conceptList}>
              <li><code className={styles.inlineCode}>==</code> Equal to</li>
              <li><code className={styles.inlineCode}>!=</code> Not equal to</li>
              <li><code className={styles.inlineCode}>&lt;</code> Less than</li>
              <li><code className={styles.inlineCode}>&gt;</code> Greater than</li>
              <li><code className={styles.inlineCode}>&lt;=</code> Less than or equal</li>
              <li><code className={styles.inlineCode}>&gt;=</code> Greater than or equal</li>
            </ul>
          </div>

          <div className={styles.warningBox}>
            <h4 className={styles.warningTitle}>Common Mistake:</h4>
            <p>
              Don't confuse <code className={styles.inlineCode}>=</code> (assignment) with <code className={styles.inlineCode}>==</code> (comparison). 
              Use <code className={styles.inlineCode}>==</code> to check if two values are the same.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'part8',
      title: 'Part 8: Finding Maximum Values',
      description: 'Tracking extremes with comparison logic',
      content: (
        <div className={styles.lessonContent}>
          <p>
            Finding maximum (or minimum) values requires keeping track of the "best so far" as you examine data.
          </p>
          
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>Finding the Longest Line</h4>
            <pre className={styles.codeBlock}>
              <code>{`maxcount = 0
maxline = ""

with open('pap.txt') as book:
    for line in book:
        count = len(line.split())
        if count > maxcount:  # Found a new champion
            maxline = line
            maxcount = count
            
print(maxline)  # Line with most words`}</code>
            </pre>
          </div>

          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>Maximum Pattern:</h4>
            <ul className={styles.conceptList}>
              <li>Initialize "best so far" variable</li>
              <li>Compare each new value to current best</li>
              <li>Update both value and additional info when you find a new maximum</li>
              <li>Result is guaranteed to be the maximum after checking all data</li>
            </ul>
          </div>

          <div className={styles.infoBox}>
            <h4 className={styles.infoTitle}>Programming Technique:</h4>
            <p>
              This "keep the best" pattern is extremely common in programming. 
              It works for finding minimums, maximums, or any "best" according to your criteria.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'part9',
      title: 'Part 9: Advanced String Processing',
      description: 'Complex text analysis and list manipulation',
      content: (
        <div className={styles.lessonContent}>
          <p>
            Advanced string processing combines multiple techniques to analyze and transform text data effectively.
          </p>
          
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>Processing User Input</h4>
            <pre className={styles.codeBlock}>
              <code>{`# Get input from user
words = input("Enter words separated by spaces: ").split()

# Process each word
for word in words:
    print(word)`}</code>
            </pre>
          </div>

          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>The input() Function:</h4>
            <ul className={styles.conceptList}>
              <li>Displays a prompt and waits for user input</li>
              <li>Returns everything the user types as a string</li>
              <li>Often combined with <code className={styles.inlineCode}>split()</code> to process multiple items</li>
            </ul>
          </div>

          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>List Processing Patterns</h4>
            <pre className={styles.codeBlock}>
              <code>{`# Create a new list with processed data
numbers = [3, 17, 1, 44, 239]
lengths = []

for num in numbers:
    lengths.append(len(str(num)))  # Convert to string, get length
    
print(lengths)  # [1, 2, 1, 2, 3]`}</code>
            </pre>
          </div>

          <div className={styles.tipBox}>
            <h4 className={styles.tipTitle}>Real-World Applications:</h4>
            <p>
              These patterns are used in data analysis, web scraping, text processing, 
              user interface development, and many other programming domains.
            </p>
          </div>
        </div>
      )
    }
  ];

  const practiceExercises: Exercise[] = [
    {
      title: "Exercise 1: File Analysis (Beginner)",
      description: "Practice basic file reading and text searching from the course materials.",
      difficulty: 'beginner',
      starter: `# Download pap.txt file first
# Question: Count lines containing the word 'property'

`,
      solution: `with open('pap.txt') as book:
    count = 0
    for line in book:
        if 'property' in line:
            count += 1
            print(line.strip())  # strip() removes newline characters
    
print(f"Found {count} lines containing 'property'")`
    },
    {
      title: "Exercise 2: Character Counting",
      description: "Count specific characters in a file (like counting lowercase 'e').",
      difficulty: 'beginner',
      starter: `# Count the lowercase letter 'e' in pap.txt
count = 0
# Your code here

`,
      solution: `count = 0
with open('pap.txt') as book:
    for line in book:
        for character in line:
            if character == 'e':
                count += 1

print(f"The letter 'e' appears {count} times")`
    },
    {
      title: "Exercise 3: Find Shortest Word",
      description: "Determine which word is shortest among: apple, banana, peach, plum, grapefruit.",
      difficulty: 'intermediate',
      starter: `fruits = ['apple', 'banana', 'peach', 'plum', 'grapefruit']
# Find the shortest word
# Your code here

`,
      solution: `fruits = ['apple', 'banana', 'peach', 'plum', 'grapefruit']

shortest_word = fruits[0]  # Start with first word
shortest_length = len(fruits[0])

for fruit in fruits:
    if len(fruit) < shortest_length:
        shortest_word = fruit
        shortest_length = len(fruit)

print(f"The shortest word is '{shortest_word}' with {shortest_length} letters")`
    },
    {
      title: "Exercise 4: Calculate Average",
      description: "Calculate the average of numbers in a list.",
      difficulty: 'intermediate',
      starter: `numbers = [3, 17, 1, 44, 239]
# Calculate and print the average
# Your code here

`,
      solution: `numbers = [3, 17, 1, 44, 239]

total = 0
for number in numbers:
    total += number

average = total / len(numbers)
print(f"The average is {average}")`
    },
    {
      title: "Exercise 5: List Length Analysis",
      description: "Create a list showing the length of each word in a given list.",
      difficulty: 'intermediate',
      starter: `students = ['Ed', 'Ted', 'Fred', 'Jennifer']
# Create a list of the lengths: [2, 3, 4, 8]
lengths = []
# Your code here

`,
      solution: `students = ['Ed', 'Ted', 'Fred', 'Jennifer']
lengths = []

for name in students:
    lengths.append(len(name))

print(lengths)  # [2, 3, 4, 8]

# Alternative one-liner (advanced):
# lengths = [len(name) for name in students]`
    },
    {
      title: "Exercise 6: Interactive Word Analysis",
      description: "Ask user for words and find the one with most vowels.",
      difficulty: 'advanced',
      starter: `# Ask user to type words, find word with most vowels
# Example: if user types "please", it has 3 vowels (e, a, e)

`,
      solution: `user_input = input("Enter words separated by spaces: ")
words = user_input.split()

max_vowels = 0
word_with_most_vowels = ""

for word in words:
    vowel_count = 0
    for letter in word.lower():  # Convert to lowercase
        if letter in 'aeiou':
            vowel_count += 1
    
    if vowel_count > max_vowels:
        max_vowels = vowel_count
        word_with_most_vowels = word

print(f"'{word_with_most_vowels}' has the most vowels ({max_vowels})")`
    },
    {
      title: "Exercise 7: Self-Analyzing Program",
      description: "Write a program that analyzes its own source code file.",
      difficulty: 'advanced',
      starter: `# Save this program as 'analyzer.py'
# Make it count lines containing 'for' in its own code

`,
      solution: `# Save this file as 'analyzer.py' first
count = 0

with open('analyzer.py') as file:
    for line in file:
        if 'for' in line:
            count += 1
            print(f"Line with 'for': {line.strip()}")

print(f"Found {count} lines containing 'for' in this program")

# Note: This is a clever example of self-referential programming!`
    }
  ];

  const getDifficultyColor = (difficulty: Exercise['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return 'rgba(34, 197, 94, 0.8)';
      case 'intermediate': return 'rgba(251, 191, 36, 0.8)';
      case 'advanced': return 'rgba(239, 68, 68, 0.8)';
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>CSCI 133: Computer Programming</h1>
          <p className={styles.subtitle}>Unit 2: Functions, Files, and Text Processing</p>
          <div className={styles.courseMeta}>
            <span>Hunter College</span>
            <span>•</span>
            <span>Fall 2025</span>
            <span>•</span>
            <span>9 Parts</span>
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
                Unit 2 builds on the Python fundamentals from Unit 1, introducing you to functions, file handling, 
                and text processing. You'll learn to work with external data, manipulate strings, and use important 
                programming patterns like the accumulator pattern for counting and data collection.
              </p>
              
              <div className={styles.overviewGrid}>
                <div className={styles.objectivesCard}>
                  <h3 className={styles.cardTitle}>Learning Objectives</h3>
                  <ul className={styles.objectivesList}>
                    <li>Use built-in functions like len() and split()</li>
                    <li>Read and process data from external files</li>
                    <li>Apply mathematical operations and augmented operators</li>
                    <li>Implement text analysis and counting patterns</li>
                    <li>Compare strings and find maximum/minimum values</li>
                    <li>Handle user input and process dynamic data</li>
                  </ul>
                </div>
                
                <div className={styles.prerequisitesCard}>
                  <h3 className={styles.cardTitle}>Prerequisites</h3>
                  <ul className={styles.objectivesList}>
                    <li>Completion of Unit 1 (Python Fundamentals)</li>
                    <li>Understanding of variables, strings, and lists</li>
                    <li>Familiarity with for loops and conditionals</li>
                    <li>Basic file management skills</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.progressSection}>
              <h3 className={styles.sectionTitle}>Unit Progress</h3>
              <div className={styles.progressGrid}>
                {lessons.map((lesson, index) => (
                  <div key={lesson.id} className={styles.progressItem}>
                    <div className={styles.progressNumber}>
                      {index + 1}
                    </div>
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
              {lessons.map((lesson) => (
                <div key={lesson.id} className={styles.lessonCard}>
                  <button
                    onClick={() => toggleSection(lesson.id)}
                    className={styles.lessonHeader}
                  >
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
                  
                  {expandedSections[lesson.id] && (
                    <div className={styles.lessonBody}>
                      {lesson.content}
                    </div>
                  )}
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
                These exercises range from beginner to advanced levels. Start with the beginner exercises 
                to reinforce basic concepts, then progress to more challenging problems. Each exercise builds 
                on the concepts covered in the lessons.
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
                          <summary className={styles.solutionSummary}>
                            View Solution
                          </summary>
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
                Remember these key concepts as you work through the exercises:
              </p>
              <ul className={styles.helpList}>
                <li>Always use the <code className={styles.inlineCode}>with</code> statement when opening files</li>
                <li>The accumulator pattern: initialize, loop, update, use result</li>
                <li>Use <code className={styles.inlineCode}>==</code> for comparison, <code className={styles.inlineCode}>=</code> for assignment</li>
                <li>Break complex problems into smaller steps</li>
                <li>Test your code with simple examples first</li>
                <li><code className={styles.inlineCode}>split()</code> turns strings into lists of words</li>
                <li><code className={styles.inlineCode}>len()</code> works on strings, lists, and other collections</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CSCI133Unit2;