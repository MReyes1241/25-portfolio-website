import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Play, Code, BookOpen, FileText, Shuffle, BarChart3 } from 'lucide-react';
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

const CSCI133Unit4: React.FC = () => {
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
      title: 'Part 1: Creating and Using Modules',
      description: 'Organizing code into reusable modules and importing functions',
      content: (
        <div className={styles.lessonContent}>
          <p>
            Modules are Python files containing functions and variables that can be reused across multiple programs. 
            They help organize code and avoid repetition.
          </p>
          
          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>Module Benefits:</h4>
            <ul className={styles.conceptList}>
              <li>Reuse functions across multiple programs</li>
              <li>Organize related functions together</li>
              <li>Share code with other programmers</li>
              <li>Keep programs clean and focused</li>
            </ul>
          </div>

          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <FileText className={styles.codeIcon} />
              Creating a Module (my.py)
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`# Contents of my.py
def cleantext(text):
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    cleantext = ''
    for character in text.lower():
        if character in alphabet:
            cleantext += character
        else:
            cleantext += ' '
    return cleantext

def average(numbers):
    total = 0
    for number in numbers:
        total += number
    return total / len(numbers)`}</code>
            </pre>
          </div>

          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>Using the Module</h4>
            <pre className={styles.codeBlock}>
              <code>{`import my

print(my.average([1, 2, 3, 4]))
print(my.cleantext('This—NOW—is ready for split()!'))`}</code>
            </pre>
          </div>

          <div className={styles.infoBox}>
            <h4 className={styles.infoTitle}>Import Statement Rules:</h4>
            <p>
              When importing, don't include the <code className={styles.inlineCode}>.py</code> extension. 
              Access functions using <code className={styles.inlineCode}>module_name.function_name</code>.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'part2',
      title: 'Part 2: Random Numbers and Simulations',
      description: 'Using the random module for probability and simulations',
      content: (
        <div className={styles.lessonContent}>
          <p>
            The <code className={styles.inlineCode}>random</code> module provides functions for generating 
            random numbers and making random choices, essential for simulations and games.
          </p>
          
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <Shuffle className={styles.codeIcon} />
              Random Module Examples
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`import random

colors = ['red', 'blue', 'green', 'yellow', 'orange']
print(random.choice(colors))  # Picks one randomly

random.shuffle(colors)  # Mixes up the list
print(colors)  # Now in random order

# Random numbers
print(random.randint(1, 6))     # Dice roll (1-6)
print(random.random())          # Decimal between 0 and 1`}</code>
            </pre>
          </div>

          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>Key Random Functions:</h4>
            <ul className={styles.conceptList}>
              <li><code className={styles.inlineCode}>random.choice(list)</code> - randomly picks one item</li>
              <li><code className={styles.inlineCode}>random.shuffle(list)</code> - randomly reorders items</li>
              <li><code className={styles.inlineCode}>random.randint(a, b)</code> - random integer between a and b</li>
              <li><code className={styles.inlineCode}>random.random()</code> - random decimal between 0 and 1</li>
            </ul>
          </div>

          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>Simple Guessing Game</h4>
            <pre className={styles.codeBlock}>
              <code>{`import random

# Computer picks a number between 1 and 10
secret = random.randint(1, 10)
guess = int(input("Guess a number (1-10): "))

if guess == secret:
    print("You win!")
else:
    print(f"Sorry, the number was {secret}")`}</code>
            </pre>
          </div>
        </div>
      )
    },
    {
      id: 'part3',
      title: 'Part 3: Gambling Simulation and Probability',
      description: 'Modeling real-world scenarios with random events',
      content: (
        <div className={styles.lessonContent}>
          <p>
            Simulations help us understand probability and test theories about random events. 
            Let's explore this with a simple gambling game.
          </p>
          
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>Coin Flip Game</h4>
            <pre className={styles.codeBlock}>
              <code>{`import random

def oneGame(initial):
    bankroll = initial
    bets = 0
    
    while bankroll > 0 and bankroll < 2 * initial:
        flip = random.choice(['heads', 'tails'])
        if flip == 'heads':
            bankroll += 1
        else:
            bankroll -= 1
        bets += 1
    
    return bets

# Run the game once
print(oneGame(10))  # Starting with $10`}</code>
            </pre>
          </div>

          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>Simulation Components:</h4>
            <ul className={styles.conceptList}>
              <li>Initial conditions (starting money)</li>
              <li>Random events (coin flips)</li>
              <li>Rules (win/lose conditions)</li>
              <li>Stopping criteria (broke or doubled money)</li>
              <li>Measurement (number of bets)</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'part4',
      title: 'Part 4: Generators and Memory Efficiency',
      description: 'Understanding generators for handling large datasets',
      content: (
        <div className={styles.lessonContent}>
          <p>
            Generators create values on-demand rather than storing everything in memory. 
            They're essential for working with large amounts of data efficiently.
          </p>
          
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>Range vs List Comparison</h4>
            <pre className={styles.codeBlock}>
              <code>{`# Memory-efficient generator
for number in range(1000000):
    print(number)  # Only one number in memory at a time

# Memory-heavy list (avoid for large numbers!)
huge_list = list(range(1000000))  # All million numbers in memory
for number in huge_list:
    print(number)`}</code>
            </pre>
          </div>

          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>Generator Benefits:</h4>
            <ul className={styles.conceptList}>
              <li>Use minimal memory regardless of size</li>
              <li>Generate values only when needed</li>
              <li>Can represent infinite sequences</li>
              <li>Perfect for large datasets</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'part5',
      title: 'Part 5: Statistical Analysis and Experiments',
      description: 'Running multiple trials and analyzing results',
      content: (
        <div className={styles.lessonContent}>
          <p>
            Statistical analysis requires running many trials to get reliable results. 
            We use functions to organize experiments and collect data systematically.
          </p>
          
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <BarChart3 className={styles.codeIcon} />
              Multi-Trial Experiment
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`import random

def paperStatus(classSize):
    papers = list(range(classSize))
    random.shuffle(papers)
    for student in range(classSize):
        if papers[student] == student:
            return 'warning'
    return 'okay'

def experiment(classSizes, repetitions):
    for classSize in classSizes:
        print('Class size:', classSize)
        warnings = 0
        for number in range(repetitions):
            if paperStatus(classSize) == 'warning':
                warnings += 1
        print('Warnings:', warnings, 'out of', repetitions)

experiment([30, 300, 3000], 1000)`}</code>
            </pre>
          </div>

          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>Experimental Design:</h4>
            <ul className={styles.conceptList}>
              <li>Define parameters to test (class sizes)</li>
              <li>Choose number of repetitions for reliability</li>
              <li>Run systematic trials</li>
              <li>Collect and analyze results</li>
              <li>Look for patterns and trends</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'part6',
      title: 'Part 6: Card Games and Complex Simulations',
      description: 'Modeling real-world systems with multiple components',
      content: (
        <div className={styles.lessonContent}>
          <p>
            Complex simulations combine multiple elements. Card games provide excellent examples 
            of systems with rules, randomness, and measurable outcomes.
          </p>
          
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>Playing Card Representation</h4>
            <pre className={styles.codeBlock}>
              <code>{`import random

# Create a standard deck
suits = ['clubs', 'diamonds', 'hearts', 'spades']
values = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king']

deck = []
for suit in suits:
    for value in values:
        deck.append(f"{value} of {suit}")

print(f"Deck has {len(deck)} cards")

# Deal a hand
random.shuffle(deck)
hand = deck[:5]  # First 5 cards
for card in hand:
    print(card)`}</code>
            </pre>
          </div>

          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>Complex Simulation Elements:</h4>
            <ul className={styles.conceptList}>
              <li>Data structures (deck of cards)</li>
              <li>State management (shuffling, dealing)</li>
              <li>Rules implementation (game logic)</li>
              <li>Statistical tracking (wins, losses)</li>
              <li>Function organization (modular design)</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  const practiceExercises: Exercise[] = [
    {
      title: "Exercise 1: Create a Utility Module",
      description: "Build a module with the cleantext and average functions from Unit 3.",
      difficulty: 'beginner',
      starter: `# Create a file called my.py with these functions:
# - cleantext(text): removes punctuation and converts to lowercase
# - average(numbers): calculates the average of a list

# Then create a test program that imports and uses both functions

`,
      solution: `# my.py file:
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
    total = sum(numbers)
    return total / len(numbers)

# test.py file:
import my

text = "Hello, World! How are you?"
numbers = [1, 2, 3, 4, 5]

print(my.cleantext(text))
print(my.average(numbers))`
    },
    {
      title: "Exercise 2: Random Name Generator",
      description: "Create a program that generates random combinations of first and last names.",
      difficulty: 'beginner',
      starter: `import random

first_names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve']
last_names = ['Johnson', 'Smith', 'Brown', 'Davis', 'Wilson']

# Generate 5 random full names
# Your code here

`,
      solution: `import random

first_names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve']
last_names = ['Johnson', 'Smith', 'Brown', 'Davis', 'Wilson']

# Generate 5 random full names
for i in range(5):
    first = random.choice(first_names)
    last = random.choice(last_names)
    print(f"{first} {last}")`
    },
    {
      title: "Exercise 3: Simple Gambling Game",
      description: "Implement the coin flip gambling game where you try to double your money.",
      difficulty: 'intermediate',
      starter: `import random

def oneGame(starting_money):
    # Implement the gambling game
    # Flip a coin each round
    # Win $1 on heads, lose $1 on tails
    # Stop when broke (0) or doubled money
    # Return number of flips it took
    pass

# Test the game
print(oneGame(10))

`,
      solution: `import random

def oneGame(starting_money):
    money = starting_money
    target = starting_money * 2
    flips = 0
    
    while money > 0 and money < target:
        flip = random.choice(['heads', 'tails'])
        if flip == 'heads':
            money += 1
        else:
            money -= 1
        flips += 1
    
    return flips

# Test the game multiple times
results = []
for i in range(100):
    flips = oneGame(10)
    results.append(flips)

average_flips = sum(results) / len(results)
print(f"Average flips to end game: {average_flips:.1f}")
print(f"Shortest game: {min(results)} flips")
print(f"Longest game: {max(results)} flips")`
    },
    {
      title: "Exercise 4: Card Deck Builder",
      description: "Create a standard deck of cards and implement basic card game functions.",
      difficulty: 'advanced',
      starter: `import random

def createDeck():
    # Create a standard 52-card deck
    # Return as a list of strings like "ace of hearts"
    pass

def shuffleDeck(deck):
    # Shuffle the deck in place
    pass

def dealHand(deck, size):
    # Deal 'size' cards from the deck
    # Return the hand and modify the deck
    pass

# Test your functions
deck = createDeck()
print(f"Deck size: {len(deck)}")

`,
      solution: `import random

def createDeck():
    suits = ['clubs', 'diamonds', 'hearts', 'spades']
    values = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king']
    
    deck = []
    for suit in suits:
        for value in values:
            deck.append(f"{value} of {suit}")
    
    return deck

def shuffleDeck(deck):
    random.shuffle(deck)

def dealHand(deck, size):
    hand = []
    for i in range(size):
        if deck:  # Check if deck is not empty
            hand.append(deck.pop())
    return hand

# Test the functions
deck = createDeck()
print(f"New deck size: {len(deck)}")

shuffleDeck(deck)
print("Deck shuffled")

hand = dealHand(deck, 5)
print(f"Hand: {hand}")
print(f"Remaining deck size: {len(deck)}")`
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
          <p className={styles.subtitle}>Unit 4: Modules, Random Numbers, and Simulations</p>
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
                Unit 4 introduces advanced programming concepts that enable you to write more sophisticated 
                and organized programs. You'll learn to create reusable code modules, work with random numbers 
                for simulations, and analyze probability through computational experiments. These skills are 
                fundamental for data science, game development, and scientific computing.
              </p>
              
              <div className={styles.overviewGrid}>
                <div className={styles.objectivesCard}>
                  <h3 className={styles.cardTitle}>Learning Objectives</h3>
                  <ul className={styles.objectivesList}>
                    <li>Create and import custom Python modules</li>
                    <li>Use the random module for simulations and games</li>
                    <li>Design and run statistical experiments</li>
                    <li>Understand generators and memory efficiency</li>
                    <li>Build complex simulations like card games</li>
                    <li>Analyze probability through computational methods</li>
                  </ul>
                </div>
                
                <div className={styles.prerequisitesCard}>
                  <h3 className={styles.cardTitle}>Prerequisites</h3>
                  <ul className={styles.objectivesList}>
                    <li>Completion of Units 1-3</li>
                    <li>Solid understanding of functions and dictionaries</li>
                    <li>Experience with loops and conditional statements</li>
                    <li>Basic file management and Python environment setup</li>
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
                These exercises progress from basic module creation to advanced statistical simulations. 
                Start with the beginner exercises to master modules and random numbers, then advance to 
                complex probability experiments and card game simulations.
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
                <li>Modules organize related functions - save them as <code className={styles.inlineCode}>.py</code> files</li>
                <li>Import modules without the <code className={styles.inlineCode}>.py</code> extension</li>
                <li>Random functions give different results each time - perfect for simulations</li>
                <li>Use generators like <code className={styles.inlineCode}>range()</code> for memory efficiency</li>
                <li>Run many trials in experiments to get reliable statistical results</li>
                <li>Functions should be small, focused, and testable independently</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CSCI133Unit4;