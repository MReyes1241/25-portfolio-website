import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Play, Code, BookOpen, Terminal } from 'lucide-react';
import styles from './CSCI133Unit1.module.css';

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
}

const CSCI133Unit1: React.FC = () => {
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
      title: 'Part 1: Getting Started with Python',
      description: 'Setting up IDLE and running your first Python program',
      content: (
        <div className={styles.lessonContent}>
          <p>
            In this first lesson, you'll learn how to set up the Python IDLE environment and run your very first Python program.
          </p>
          
          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>Key Concepts:</h4>
            <ul className={styles.conceptList}>
              <li>Starting IDLE (Python Shell)</li>
              <li>Understanding the interpreter window vs program file window</li>
              <li>Creating and saving Python files (.py extension)</li>
              <li>Running programs with F5</li>
            </ul>
          </div>

          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <Code className={styles.codeIcon} />
              Your First Program
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`print(5)
print(6)`}</code>
            </pre>
            <p className={styles.codeNote}>
              Save this as a .py file and run it with F5 to see your first Python output!
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'part2',
      title: 'Part 2: Using the Python Interpreter',
      description: 'Interactive programming with the Python shell',
      content: (
        <div className={styles.lessonContent}>
          <p>
            Learn how to use Python's interactive interpreter for quick experiments and calculations.
          </p>
          
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <Terminal className={styles.codeIcon} />
              Interactive Example
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`>>> print(5)
5
>>>`}</code>
            </pre>
            <p className={styles.codeNote}>
              The {'>>>'} prompt indicates where you can type Python commands directly.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'part3',
      title: 'Part 3: Variables and Strings',
      description: 'Creating variables and working with text',
      content: (
        <div className={styles.lessonContent}>
          <p>
            Variables allow us to store and reuse data. In Python, we use the equals sign (=) to assign values to variable names.
          </p>

          <div className={styles.warningBox}>
            <h4 className={styles.warningTitle}>Important Note:</h4>
            <p>
              The equals sign (=) in Python is <strong>assignment</strong>, not mathematical equality. 
              Read "student = 'Fred'" as "student refers to the string Fred."
            </p>
          </div>
          
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>Example: Creating Variables</h4>
            <pre className={styles.codeBlock}>
              <code>{`student = 'Fred'
print('Hello', student)

# Output: Hello Fred`}</code>
            </pre>
          </div>

          <div className={styles.comparisonBox}>
            <h4 className={styles.comparisonTitle}>Variable Naming:</h4>
            <p>Choose meaningful variable names! Compare these two equivalent programs:</p>
            <div className={styles.comparisonGrid}>
              <div className={styles.goodExample}>
                <p className={styles.exampleLabel}>Good (Clear)</p>
                <pre className={styles.codeBlockSmall}>
                  <code>{`students = ['Fred', 'Ted', 'Ed']
for student in students:
    print('Hello', student)`}</code>
                </pre>
              </div>
              <div className={styles.badExample}>
                <p className={styles.exampleLabel}>Bad (Confusing)</p>
                <pre className={styles.codeBlockSmall}>
                  <code>{`xy34q = ['Fred', 'Ted', 'Ed']
for prz in xy34q:
    print('Hello', prz)`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'part4',
      title: 'Part 4: Working with Multiple Values',
      description: 'Reassigning variables and preparing for loops',
      content: (
        <div className={styles.lessonContent}>
          <p>
            Variables can be reassigned to different values. This sets the stage for understanding loops.
          </p>
          
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>Example: Reassignment</h4>
            <pre className={styles.codeBlock}>
              <code>{`student = 'Fred'
print('Hello', student)
student = 'Ted'  # Reassign to new value
print('Hello', student)

# Output:
# Hello Fred
# Hello Ted`}</code>
            </pre>
          </div>
        </div>
      )
    },
    {
      id: 'part5',
      title: 'Part 5: Introduction to Lists',
      description: 'Creating and using Python lists',
      content: (
        <div className={styles.lessonContent}>
          <p>
            Lists are ordered collections of objects in Python. They're written with square brackets and comma-separated items.
          </p>
          
          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>List Syntax:</h4>
            <ul className={styles.conceptList}>
              <li>Use square brackets: [ ]</li>
              <li>Separate items with commas</li>
              <li>Can contain different types: numbers, strings, even other lists</li>
            </ul>
          </div>

          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>List Examples</h4>
            <pre className={styles.codeBlock}>
              <code>{`# List of strings
students = ['Fred', 'Ted', 'Ed']

# List of strings and numbers  
mixed = ['cat', 'dog']

# List with different types
complex_list = [5, 'Fred', [7, 19]]`}</code>
            </pre>
          </div>
        </div>
      )
    },
    {
      id: 'part6',
      title: 'Part 6: For Loops with Lists',
      description: 'Iterating through lists with for loops',
      content: (
        <div className={styles.lessonContent}>
          <p>
            For loops let us repeat actions for each item in a list, eliminating the need to write repetitive code.
          </p>
          
          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>For Loop Structure:</h4>
            <ul className={styles.conceptList}>
              <li>Starts with <code className={styles.inlineCode}>for</code></li>
              <li>Variable name to hold each item</li>
              <li><code className={styles.inlineCode}>in</code> keyword</li>
              <li>List or collection to iterate over</li>
              <li>Colon (:) to end the header</li>
              <li>Indented block of code to repeat</li>
            </ul>
          </div>

          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>Basic For Loop</h4>
            <pre className={styles.codeBlock}>
              <code>{`for student in ['Fred', 'Ted', 'Ed']:
    print('Hello', student)

# Output:
# Hello Fred
# Hello Ted  
# Hello Ed`}</code>
            </pre>
          </div>

          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>Using a Variable for the List</h4>
            <pre className={styles.codeBlock}>
              <code>{`students = ['Fred', 'Ted', 'Ed']
for student in students:
    print('Hello', student)`}</code>
            </pre>
          </div>
        </div>
      )
    },
    {
      id: 'part7',
      title: 'Part 7: Nested Loops',
      description: 'Using loops inside other loops',
      content: (
        <div className={styles.lessonContent}>
          <p>
            When you need to combine items from multiple lists, nested loops provide a powerful solution.
          </p>
          
          <div className={styles.infoBox}>
            <h4 className={styles.infoTitle}>Understanding Nested Loops:</h4>
            <p>
              Read from the bottom up: the inner loop runs completely for each iteration of the outer loop.
            </p>
          </div>

          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>Sandwich Combinations Example</h4>
            <pre className={styles.codeBlock}>
              <code>{`meats = ['ham', 'pastrami', 'roast beef', 'chicken']
breads = ['rye', 'whole wheat', 'a roll']

for meat in meats:
    for bread in breads:
        print(meat, 'on', bread)

# This creates 12 combinations:
# ham on rye
# ham on whole wheat  
# ham on a roll
# pastrami on rye
# pastrami on whole wheat
# pastrami on a roll
# ... and so on`}</code>
            </pre>
          </div>

          <div className={styles.tipBox}>
            <h4 className={styles.tipTitle}>Efficiency Tip:</h4>
            <p>
              Define lists outside loops when possible. Don't recreate the same list repeatedly inside a loop.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'part8',
      title: 'Part 8: Loops with Strings',
      description: 'Iterating through characters in strings',
      content: (
        <div className={styles.lessonContent}>
          <p>
            Strings are ordered collections of characters, so for loops work with them just like with lists.
          </p>
          
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>Looping Through String Characters</h4>
            <pre className={styles.codeBlock}>
              <code>{`vowels = 'aeiou'
for letter in vowels:
    print(letter)

# Output:
# a
# e  
# i
# o
# u`}</code>
            </pre>
          </div>

          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>The 'in' Operator:</h4>
            <p>
              Use 'in' to check if an item exists in a collection (string, list, etc.)
            </p>
          </div>

          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>Checking for Characters</h4>
            <pre className={styles.codeBlock}>
              <code>{`if 'a' in 'pineapple':
    print('found a')    # This prints

if 'b' in 'pineapple':
    print('found b')    # This doesn't print`}</code>
            </pre>
          </div>
        </div>
      )
    },
    {
      id: 'part9',
      title: 'Part 9: Combining Loops and Conditionals',
      description: 'Using if statements inside for loops',
      content: (
        <div className={styles.lessonContent}>
          <p>
            Combining for loops with if statements lets you selectively process items based on conditions.
          </p>
          
          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>Conditional Processing:</h4>
            <p>
              Use if statements inside loops to perform actions only when certain conditions are met.
            </p>
          </div>

          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>Finding Vowels in a Word</h4>
            <pre className={styles.codeBlock}>
              <code>{`vowels = 'aeiou'
word = 'pineapple'

for letter in vowels:
    if letter in word:
        print(letter, 'is in', word)

# Output:
# i is in pineapple
# e is in pineapple
# a is in pineapple`}</code>
            </pre>
          </div>

          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>Structure Review:</h4>
            <ul className={styles.conceptList}>
              <li><strong>for</strong>: "Do this for each item in the collection"</li>
              <li><strong>if</strong>: "Do this only when a condition is true"</li>
              <li>Both end with colons and use indented blocks</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  const practiceExercises: Exercise[] = [
    {
      title: "Exercise 1: Personal Greetings",
      description: "Create a list of your friends' names and greet each one.",
      starter: `friends = ['Alice', 'Bob', 'Charlie']
# Your code here`,
      solution: `friends = ['Alice', 'Bob', 'Charlie']
for friend in friends:
    print('Hello', friend, '!')`
    },
    {
      title: "Exercise 2: Menu Combinations", 
      description: "Create all possible combinations from two food categories.",
      starter: `drinks = ['coffee', 'tea', 'juice']
pastries = ['croissant', 'muffin', 'donut']
# Your code here`,
      solution: `drinks = ['coffee', 'tea', 'juice']
pastries = ['croissant', 'muffin', 'donut']

for drink in drinks:
    for pastry in pastries:
        print(drink, 'with', pastry)`
    },
    {
      title: "Exercise 3: Consonant Finder",
      description: "Find which consonants appear in a given word.",
      starter: `consonants = 'bcdfghjklmnpqrstvwxyz'
word = 'programming'
# Your code here`,
      solution: `consonants = 'bcdfghjklmnpqrstvwxyz'
word = 'programming'

for letter in consonants:
    if letter in word:
        print(letter, 'is in', word)`
    }
  ];

  return (
    <>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>CSCI 133: Computer Programming</h1>
            <p className={styles.subtitle}>Unit 1: Python Fundamentals</p>
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
                  Welcome to Unit 1 of CSCI 133! This unit introduces you to the fundamental concepts of Python programming. 
                  You'll learn how to write, save, and run Python programs, work with variables and data types, and use control 
                  structures like loops and conditionals.
                </p>
                
                <div className={styles.overviewGrid}>
                  <div className={styles.objectivesCard}>
                    <h3 className={styles.cardTitle}>Learning Objectives</h3>
                    <ul className={styles.objectivesList}>
                      <li>Set up and use the Python IDLE environment</li>
                      <li>Understand variables, strings, and lists</li>
                      <li>Write and use for loops effectively</li>
                      <li>Combine loops with conditional statements</li>
                    </ul>
                  </div>
                  
                  <div className={styles.prerequisitesCard}>
                    <h3 className={styles.cardTitle}>Prerequisites</h3>
                    <ul className={styles.objectivesList}>
                      <li>Basic computer literacy</li>
                      <li>No prior programming experience required</li>
                      <li>Python 3.x installed with IDLE</li>
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
                  Try these exercises to reinforce what you've learned in Unit 1. Each exercise builds on the concepts 
                  covered in the lessons.
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
                        <h3 className={styles.exerciseTitle}>{exercise.title}</h3>
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
                  <li>Use meaningful variable names</li>
                  <li>Remember that for loops iterate through each item in a collection</li>
                  <li>if statements only execute when their condition is True</li>
                  <li>Indentation is crucial in Python - all code in a block must be aligned</li>
                  <li>Don't forget the colons (:) after for and if statements</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CSCI133Unit1;