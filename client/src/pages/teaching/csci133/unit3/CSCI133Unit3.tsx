import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Play, Code, BookOpen, FileText, Database } from 'lucide-react';
import styles from '../unit2/CSCI133Unit2.module.css'; // Reusing the same styles

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

const CSCI133Unit3: React.FC = () => {
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
      title: 'Part 1: Introduction to Dictionaries',
      description: 'Understanding key-value pairs and basic dictionary operations',
      content: (
        <div className={styles.lessonContent}>
          <p>
            A dictionary is a collection of <strong>key-value pairs</strong>. Think of it like a real dictionary where you look up a word (the key) to find its definition (the value).
          </p>
          
          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>Dictionary Basics:</h4>
            <ul className={styles.conceptList}>
              <li>Dictionaries use curly braces <code className={styles.inlineCode}>{`{}`}</code></li>
              <li>Keys and values are separated by colons <code className={styles.inlineCode}>:</code></li>
              <li>Key-value pairs are separated by commas <code className={styles.inlineCode}>,</code></li>
              <li>Keys must be unique (no duplicates)</li>
            </ul>
          </div>

          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <Database className={styles.codeIcon} />
              Password Dictionary Example
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`passwords = {'smith': 'apple', 'jones': 'a34xx', 'brown': 'zzzz'}

username = input('Username: ')
password = input('Password: ')

if password == passwords[username]:
    print('You are logged in.')
else:
    print('Bad password.')`}</code>
            </pre>
          </div>

          <div className={styles.infoBox}>
            <h4 className={styles.infoTitle}>Dictionary Access:</h4>
            <p>
              To look up a value, use square brackets with the key: <code className={styles.inlineCode}>passwords['smith']</code> returns <code className={styles.inlineCode}>'apple'</code>.
            </p>
          </div>

          <div className={styles.warningBox}>
            <h4 className={styles.warningTitle}>Key Error:</h4>
            <p>
              If you try to access a key that doesn't exist, Python will give you a KeyError. Always make sure the key exists before accessing it.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'part2',
      title: 'Part 2: Building Dictionaries Dynamically',
      description: 'Creating word concordances and counting with dictionaries',
      content: (
        <div className={styles.lessonContent}>
          <p>
            Dictionaries are perfect for counting things. You can build them as you process data, adding new keys when you encounter new items.
          </p>
          
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>Building a Word Concordance</h4>
            <pre className={styles.codeBlock}>
              <code>{`concordance = {}
with open('pap.txt') as book:
    linenum = 1
    for line in book:
        for word in line.split():
            if word in concordance:
                concordance[word].append(linenum)
            else:
                concordance[word] = [linenum]
        linenum += 1

print('Test:', concordance['property'])`}</code>
            </pre>
          </div>

          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>Key Concepts:</h4>
            <ul className={styles.conceptList}>
              <li><code className={styles.inlineCode}>if word in concordance:</code> checks if key exists</li>
              <li><code className={styles.inlineCode}>.append()</code> adds to existing list</li>
              <li>First occurrence creates new key with list value</li>
              <li>Subsequent occurrences add to existing list</li>
            </ul>
          </div>

          <div className={styles.tipBox}>
            <h4 className={styles.tipTitle}>Dictionary Pattern:</h4>
            <p>
              This "check if exists, then update or create" pattern is extremely common when building dictionaries from data.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'part3',
      title: 'Part 3: While Loops and Interactive Input',
      description: 'Repeating actions until a condition is met',
      content: (
        <div className={styles.lessonContent}>
          <p>
            While loops continue executing as long as a condition remains true. They're perfect for interactive programs where you don't know how many iterations you'll need.
          </p>
          
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>Interactive Word Lookup</h4>
            <pre className={styles.codeBlock}>
              <code>{`# Build concordance first (same as before)
concordance = {}
# ... concordance building code ...

while True:
    word = input('Enter word: ')
    if word in concordance:
        print('Found on lines:', concordance[word])
    else:
        print('Not found.')`}</code>
            </pre>
          </div>

          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>While Loop Structure:</h4>
            <ul className={styles.conceptList}>
              <li><code className={styles.inlineCode}>while condition:</code> starts the loop</li>
              <li>Indented block executes while condition is True</li>
              <li><code className={styles.inlineCode}>while True:</code> creates infinite loop</li>
              <li>Loop continues until condition becomes False</li>
            </ul>
          </div>

          <div className={styles.warningBox}>
            <h4 className={styles.warningTitle}>Infinite Loops:</h4>
            <p>
              Be careful with <code className={styles.inlineCode}>while True:</code> - make sure you have a way to stop the program (Ctrl+C on Windows, ⌘+C on Mac).
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'part4',
      title: 'Part 4: Text Cleaning and Processing',
      description: 'Handling punctuation and case sensitivity in text analysis',
      content: (
        <div className={styles.lessonContent}>
          <p>
            Real text data is messy. Words like "Property" and "property" should be treated the same, and punctuation can interfere with matching.
          </p>
          
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>Text Cleaning Function</h4>
            <pre className={styles.codeBlock}>
              <code>{`import string

def cleantext(text):
    # Convert to lowercase
    text = text.lower()
    # Remove punctuation
    cleaned = ""
    for char in text:
        if char in string.ascii_letters or char == " ":
            cleaned += char
        else:
            cleaned += " "
    return cleaned

# Example usage
dirty_text = "Hello, World! How are you?"
clean_text = cleantext(dirty_text)
print(clean_text)  # "hello  world  how are you "`}</code>
            </pre>
          </div>

          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>Text Processing Steps:</h4>
            <ul className={styles.conceptList}>
              <li><code className={styles.inlineCode}>.lower()</code> converts to lowercase</li>
              <li>Loop through each character</li>
              <li>Keep letters and spaces, replace punctuation with spaces</li>
              <li>Use <code className={styles.inlineCode}>string.ascii_letters</code> for letter checking</li>
            </ul>
          </div>

          <div className={styles.infoBox}>
            <h4 className={styles.infoTitle}>Why Clean Text?</h4>
            <p>
              Without cleaning, "property" and "Property," would be treated as different words. Cleaning ensures accurate counting and matching.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'part5',
      title: 'Part 5: Function Fundamentals',
      description: 'Creating reusable code with function definitions',
      content: (
        <div className={styles.lessonContent}>
          <p>
            Functions are reusable blocks of code that perform specific tasks. They make programs easier to understand, test, and maintain.
          </p>
          
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>Function Definition and Usage</h4>
            <pre className={styles.codeBlock}>
              <code>{`def cleantext(text):
    """Clean text by converting to lowercase and removing punctuation"""
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    cleantext = ''
    for character in text.lower():
        if character in alphabet:
            cleantext += character
        else:
            cleantext += ' '
    return cleantext

# Using the function
line = "Hello, World!"
cleaned = cleantext(line)
print(cleaned)  # "hello  world "`}</code>
            </pre>
          </div>

          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>Function Parts:</h4>
            <ul className={styles.conceptList}>
              <li><code className={styles.inlineCode}>def</code> keyword starts function definition</li>
              <li>Function name followed by parentheses</li>
              <li>Parameters inside parentheses</li>
              <li><code className={styles.inlineCode}>return</code> statement provides result</li>
              <li>Triple quotes for documentation</li>
            </ul>
          </div>

          <div className={styles.tipBox}>
            <h4 className={styles.tipTitle}>Function Benefits:</h4>
            <p>
              Functions can be reused, tested independently, and shared between programs. Once written and tested, you can use them anywhere!
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'part6',
      title: 'Part 6: Advanced Dictionary Operations',
      description: 'Dictionary methods and efficient data processing',
      content: (
        <div className={styles.lessonContent}>
          <p>
            Dictionaries have built-in methods that make common operations easier and more efficient.
          </p>
          
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>Dictionary Methods</h4>
            <pre className={styles.codeBlock}>
              <code>{`word_counts = {}

# Method 1: Check if key exists
if 'apple' in word_counts:
    word_counts['apple'] += 1
else:
    word_counts['apple'] = 1

# Method 2: Use .get() with default
word_counts['banana'] = word_counts.get('banana', 0) + 1

# Method 3: Use .setdefault()
word_counts.setdefault('orange', 0)
word_counts['orange'] += 1

print(word_counts)  # {'apple': 1, 'banana': 1, 'orange': 1}`}</code>
            </pre>
          </div>

          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>Useful Dictionary Methods:</h4>
            <ul className={styles.conceptList}>
              <li><code className={styles.inlineCode}>.get(key, default)</code> returns value or default</li>
              <li><code className={styles.inlineCode}>.setdefault(key, default)</code> sets if doesn't exist</li>
              <li><code className={styles.inlineCode}>.keys()</code> returns all keys</li>
              <li><code className={styles.inlineCode}>.values()</code> returns all values</li>
              <li><code className={styles.inlineCode}>.items()</code> returns key-value pairs</li>
            </ul>
          </div>

          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>Iterating Through Dictionaries</h4>
            <pre className={styles.codeBlock}>
              <code>{`counts = {'apple': 5, 'banana': 3, 'orange': 7}

# Iterate through keys
for fruit in counts:
    print(f"{fruit}: {counts[fruit]}")

# Iterate through key-value pairs
for fruit, count in counts.items():
    print(f"{fruit}: {count}")

# Find fruit with maximum count
max_fruit = max(counts, key=counts.get)
print(f"Most popular: {max_fruit}")`}</code>
            </pre>
          </div>
        </div>
      )
    }
  ];

  const practiceExercises: Exercise[] = [
    {
      title: "Exercise 1: Password Validator (Beginner)",
      description: "Create a simple login system using a dictionary of usernames and passwords.",
      difficulty: 'beginner',
      starter: `# Create a password dictionary and validate user login
passwords = {'smith': 'apple', 'jones': 'a34xx', 'brown': 'zzzz'}

# Your code here - ask for username and password
# Check if they match and print appropriate message

`,
      solution: `passwords = {'smith': 'apple', 'jones': 'a34xx', 'brown': 'zzzz'}

username = input('Username: ')
password = input('Password: ')

if username in passwords and password == passwords[username]:
    print('You are logged in.')
else:
    print('Bad password.')`
    },
    {
      title: "Exercise 2: Word Counter",
      description: "Count how many times each word appears in a user's input.",
      difficulty: 'beginner',
      starter: `# Ask user for a sentence and count word frequency
sentence = input("Enter a sentence: ")
word_counts = {}

# Your code here - split sentence and count each word

`,
      solution: `sentence = input("Enter a sentence: ")
word_counts = {}

for word in sentence.lower().split():
    if word in word_counts:
        word_counts[word] += 1
    else:
        word_counts[word] = 1

for word, count in word_counts.items():
    print(f"{word}: {count}")`
    },
    {
      title: "Exercise 3: Interactive Translation Dictionary",
      description: "Build a language learning tool that stores word translations.",
      difficulty: 'intermediate',
      starter: `# Create an interactive translation dictionary
translations = {}

# Your code here - use while True loop
# Allow user to add translations and look up words

`,
      solution: `translations = {}

while True:
    english = input("Enter English word (or 'quit' to exit): ")
    if english == 'quit':
        break
    
    if english in translations:
        print(f"{english} = {translations[english]}")
    else:
        foreign = input(f"Enter translation for '{english}': ")
        translations[english] = foreign
        print(f"Added: {english} = {foreign}")`
    },
    {
      title: "Exercise 4: Name Fred Printer",
      description: "Use a loop to print 'Fred' 100 times, one per line.",
      difficulty: 'beginner',
      starter: `# Print "Fred" 100 times using a loop
# Your code here

`,
      solution: `for i in range(100):
    print("Fred")

# Alternative with while loop:
# count = 0
# while count < 100:
#     print("Fred")
#     count += 1`
    },
    {
      title: "Exercise 5: Average Calculator Function",
      description: "Create a function that calculates the average of a list of numbers.",
      difficulty: 'intermediate',
      starter: `# Define an average function that takes a list of numbers
def average(numbers):
    # Your code here
    pass

# Test your function
nums = input("Enter numbers separated by spaces: ").split()
# Convert strings to integers and calculate average

`,
      solution: `def average(numbers):
    if len(numbers) == 0:
        return 0
    total = sum(numbers)
    return total / len(numbers)

nums = input("Enter numbers separated by spaces: ").split()
numbers = []
for num in nums:
    numbers.append(int(num))

result = average(numbers)
print(f"Average: {result}")

# One-liner version:
# numbers = [int(x) for x in input("Enter numbers: ").split()]`
    },
    {
      title: "Exercise 6: Word Length Analysis",
      description: "Create functions to analyze word lengths in sentences.",
      difficulty: 'intermediate',
      starter: `# Define functions for word length analysis
def lengths(word_list):
    # Return list of word lengths
    pass

def cleantext(text):
    # Clean text and return cleaned version
    pass

# Test with user input
while True:
    line = input('Enter a sentence: ')
    # Use your functions to analyze word lengths

`,
      solution: `def lengths(word_list):
    result = []
    for word in word_list:
        result.append(len(word))
    return result

def cleantext(text):
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    clean = ''
    for char in text.lower():
        if char in alphabet:
            clean += char
        else:
            clean += ' '
    return clean

def average(numbers):
    if len(numbers) == 0:
        return 0
    return sum(numbers) / len(numbers)

while True:
    line = input('Enter a sentence: ')
    if line == '':
        break
    words = cleantext(line).split()
    word_lengths = lengths(words)
    avg_length = average(word_lengths)
    print('Average word length:', avg_length)`
    },
    {
      title: "Exercise 7: File Word Frequency Analyzer",
      description: "Analyze word frequency in a text file and find the most common words.",
      difficulty: 'advanced',
      starter: `# Analyze word frequency in pap.txt
# Find the 5 most commonly used words

def cleantext(text):
    # Your clean text function here
    pass

word_counts = {}
# Your code here

`,
      solution: `def cleantext(text):
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    clean = ''
    for char in text.lower():
        if char in alphabet:
            clean += char
        else:
            clean += ' '
    return clean

word_counts = {}

with open('pap.txt') as book:
    for line in book:
        clean_line = cleantext(line)
        for word in clean_line.split():
            if word:  # Skip empty strings
                word_counts[word] = word_counts.get(word, 0) + 1

# Find top 5 most common words
sorted_words = sorted(word_counts.items(), key=lambda x: x[1], reverse=True)
print("Top 5 most common words:")
for word, count in sorted_words[:5]:
    print(f"{word}: {count}")`
    },
    {
      title: "Exercise 8: Advanced Concordance Builder",
      description: "Build a complete word concordance that tracks line numbers and allows interactive lookup.",
      difficulty: 'advanced',
      starter: `# Build a complete concordance system
def cleantext(text):
    # Your function here
    pass

concordance = {}
# Build concordance from pap.txt
# Make it interactive for word lookup

`,
      solution: `def cleantext(text):
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    clean = ''
    for char in text.lower():
        if char in alphabet:
            clean += char
        else:
            clean += ' '
    return clean

concordance = {}

# Build concordance
with open('pap.txt') as book:
    linenum = 1
    for line in book:
        clean_line = cleantext(line)
        for word in clean_line.split():
            if word:  # Skip empty strings
                if word in concordance:
                    concordance[word].append(linenum)
                else:
                    concordance[word] = [linenum]
        linenum += 1

# Interactive lookup
while True:
    word = input('Enter word to look up (or "quit" to exit): ')
    if word == 'quit':
        break
    
    clean_word = cleantext(word).strip()
    if clean_word in concordance:
        lines = concordance[clean_word]
        print(f"'{clean_word}' found on {len(lines)} lines: {lines[:10]}{'...' if len(lines) > 10 else ''}")
    else:
        print(f"'{clean_word}' not found in text.")`
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
          <p className={styles.subtitle}>Unit 3: Dictionaries, While Loops, and Functions</p>
          <div className={styles.courseMeta}>
            <span>Hunter College</span>
            <span>•</span>
            <span>Fall 2025</span>
            <span>•</span>
            <span>6 Parts</span>
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
                Unit 3 introduces advanced data structures and programming concepts that make your programs more 
                powerful and flexible. You'll learn dictionaries for storing key-value relationships, while loops 
                for indefinite iteration, and functions for creating reusable code components. These concepts 
                form the foundation for more sophisticated programming projects.
              </p>
              
              <div className={styles.overviewGrid}>
                <div className={styles.objectivesCard}>
                  <h3 className={styles.cardTitle}>Learning Objectives</h3>
                  <ul className={styles.objectivesList}>
                    <li>Create and manipulate dictionaries with key-value pairs</li>
                    <li>Build interactive programs with while loops</li>
                    <li>Design and implement custom functions</li>
                    <li>Process and clean text data effectively</li>
                    <li>Build word concordances and frequency analyzers</li>
                    <li>Combine dictionaries, loops, and functions in complex programs</li>
                  </ul>
                </div>
                
                <div className={styles.prerequisitesCard}>
                  <h3 className={styles.cardTitle}>Prerequisites</h3>
                  <ul className={styles.objectivesList}>
                    <li>Completion of Units 1 and 2</li>
                    <li>Understanding of lists, strings, and for loops</li>
                    <li>Experience with file reading and text processing</li>
                    <li>Familiarity with conditionals and basic programming logic</li>
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
                These exercises progress from basic dictionary operations to advanced text processing applications. 
                Start with the beginner exercises to master dictionary fundamentals, then tackle the more challenging 
                problems that combine dictionaries, loops, and functions. Many exercises build upon the concepts 
                from the "Learn Something New" section.
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
                Keep these key concepts in mind as you work through the exercises:
              </p>
              <ul className={styles.helpList}>
                <li>Check if a key exists before accessing: <code className={styles.inlineCode}>if key in dictionary:</code></li>
                <li>Use <code className={styles.inlineCode}>.get(key, default)</code> to safely get values</li>
                <li><code className={styles.inlineCode}>while True:</code> creates infinite loops - have an exit strategy</li>
                <li>Functions should do one thing well and return a result</li>
                <li>Clean your text data before processing for better results</li>
                <li>Test functions independently before using them in larger programs</li>
                <li>Build dictionaries incrementally - start empty and add items</li>
                <li>Remember: dictionaries store references, not copies of data</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CSCI133Unit3;