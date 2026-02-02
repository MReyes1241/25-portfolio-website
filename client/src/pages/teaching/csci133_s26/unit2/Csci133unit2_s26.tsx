import InteractiveUnitTemplate, {
  type OverviewData,
  type LessonData,
  type ExerciseData,
} from '../interactiveUnitTemplate';

// ============================================================================
// UNIT 2: LEARN SOMETHING NEW
// Working with Files and Data
// ============================================================================

const overview: OverviewData = {
  intro: `In this unit, you will learn how to work with real data by reading text files and processing their contents. You will discover powerful patterns for counting, finding extremes, and searching through data. These skills form the foundation of data analysis and text processing.`,
  heroImage: {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800',
    alt: 'Stack of books representing text file processing',
    caption: 'Processing real-world data from text files',
  },
  objectives: [
    'Use shortcut operators (+=, -=, *=, /=) to update variables efficiently',
    'Master the accumulator pattern for counting and summing',
    'Read and process text files line by line using with open()',
    'Use len(), split(), and count() to analyze text',
    'Apply comparison operators (==, !=, <, >, <=, >=) for decision-making',
    'Find extreme values (longest, shortest, maximum, minimum)',
    'Use nested loops to process words within lines',
    'Create interactive programs with user input',
  ],
  prerequisites: [
    'Completion of Unit 1 (variables, strings, lists, for loops, conditionals)',
    'Familiarity with the if statement and in operator',
    'Ability to write and run Python programs in IDLE',
  ],
  whyTitle: 'Why Learn File Processing?',
  whyBullets: [
    'Real-world data lives in files: documents, logs, data exports',
    'Text analysis is foundational to data science and AI',
    'The patterns you learn here apply to any kind of data processing',
  ],
  progress: [
    { title: 'Arithmetic and Shortcuts', description: 'Review operators and learn +=, -=' },
    { title: 'len(), split(), count()', description: 'Essential string and list methods' },
    { title: 'Reading Files', description: 'Opening and processing text files' },
    { title: 'Counting with Files', description: 'The accumulator pattern applied' },
    { title: 'Comparison Operators', description: '==, !=, <, >, <=, >= and booleans' },
    { title: 'Finding Extremes', description: 'Longest, shortest, max, min patterns' },
    { title: 'Nested Loops', description: 'Processing words within lines' },
    { title: 'User Input', description: 'Interactive programs with input()' },
    { title: 'Iteration Review', description: 'Understanding what Python iterates over' },
  ],
};

// ============================================================================
// LESSONS
// ============================================================================

const lessons: LessonData[] = [
  // --------------------------------------------------------------------------
  // PART 1: Review - Arithmetic and Shortcuts
  // --------------------------------------------------------------------------
  {
    id: 'part1',
    title: 'Part 1: Review - Arithmetic and Shortcuts',
    summary: 'Shortcut operators and the accumulator pattern',
    content: [
      {
        type: 'media',
        data: {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=700',
          alt: 'Calculator representing arithmetic operations',
          caption: 'Python works like a powerful calculator',
        },
      },
      {
        type: 'paragraph',
        content: `In Unit 1, we learned that Python can work like a calculator. Let us quickly review the arithmetic operators we covered and then learn some powerful shortcuts.`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'Quick Review: Arithmetic Operators',
      },
      {
        type: 'code',
        data: {
          code: `# Basic arithmetic operators
print("5 + 3 =", 5 + 3)    # Addition
print("10 - 4 =", 10 - 4)  # Subtraction
print("6 * 7 =", 6 * 7)    # Multiplication
print("15 / 4 =", 15 / 4)  # Division
print("15 // 4 =", 15 // 4) # Integer Division
print("15 % 4 =", 15 % 4)  # Modulo (remainder)
print("2 ** 3 =", 2 ** 3)  # Exponentiation`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Introducing Shortcut Operators',
      },
      {
        type: 'paragraph',
        content: `Often in programming, we need to update a variable based on its current value. For example, imagine you are counting something:`,
      },
      {
        type: 'code',
        data: {
          code: `# The long way
count = 0
count = count + 1
count = count + 1
count = count + 1
print("The long way:", count)

# The shortcut way
count = 0
count += 1
count += 1
count += 1
print("The shortcut way:", count)`,
          interactive: true,
        },
      },
      {
        type: 'info',
        items: [`The += operator means "add this value to the variable." It is exactly the same as writing count = count + 1, just shorter and cleaner.`],
      },
      {
        type: 'heading',
        level: 2,
        content: 'All the Shortcut Operators',
      },
      {
        type: 'code',
        data: {
          code: `# Demonstrating all shortcut operators
score = 100
print(f"Starting score: {score}")

score += 10   # Same as: score = score + 10
print(f"After += 10: {score}")

score -= 25   # Same as: score = score - 25
print(f"After -= 25: {score}")

score *= 2    # Same as: score = score * 2
print(f"After *= 2: {score}")

score /= 2    # Same as: score = score / 2
print(f"After /= 2: {score}")`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'The Accumulator Pattern',
      },
      {
        type: 'paragraph',
        content: `One of the most important patterns in programming is the accumulator. An accumulator is a variable that starts at some initial value and gets updated repeatedly as we process data.`,
      },
      {
        type: 'code',
        data: {
          code: `# Accumulator for counting
count = 0      # Start at zero
count += 1     # Add 1 each time something happens
count += 1
count += 1
print(f"Count: {count}")

# Accumulator for summing
total = 0
total += 10    # Add first value
total += 25    # Add second value
total += 7     # Add third value
print(f"Total: {total}")`,
          interactive: true,
        },
      },
      {
        type: 'callout',
        title: 'Practice: Predict the Output',
        content: `Try to predict what this code will print before running it:`,
      },
      {
        type: 'code',
        data: {
          code: `x = 5
x += 3
x *= 2
x -= 4
print(x)`,
          interactive: true,
        },
      },
      {
        type: 'tip',
        items: [`Work through it step by step: x starts at 5, then becomes 8, then 16, then 12.`],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PART 2: len(), split(), and count()
  // --------------------------------------------------------------------------
  {
    id: 'part2',
    title: 'Part 2: len(), split(), and count()',
    summary: 'Essential tools for analyzing text',
    content: [
      {
        type: 'media',
        data: {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=700',
          alt: 'Open book with text',
          caption: 'Analyzing text with Python string methods',
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Measuring with len()',
      },
      {
        type: 'paragraph',
        content: `The len() function tells you how many items something contains. What it counts depends on what you give it:`,
      },
      {
        type: 'code',
        data: {
          code: `# len() on a string counts characters
sentence = "Long John Silver had a parrot"
print(f"Characters in sentence: {len(sentence)}")

# len() on a list counts items
pirates = ["Jim", "Silver", "Smollett", "Trelawney"]
print(f"Pirates in list: {len(pirates)}")`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Breaking Strings Apart with split()',
      },
      {
        type: 'paragraph',
        content: `The .split() method breaks a string into a list of words. By default, it splits on whitespace (spaces, tabs, newlines):`,
      },
      {
        type: 'code',
        data: {
          code: `sentence = "Long John Silver had a parrot"
words = sentence.split()
print("The words:", words)
print(f"Number of words: {len(words)}")`,
          interactive: true,
        },
      },
      {
        type: 'callout',
        title: 'Characters vs. Words',
        content: `Remember the key difference:\n- len(sentence) counts characters (including spaces)\n- len(sentence.split()) counts words`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'Counting Occurrences with count()',
      },
      {
        type: 'paragraph',
        content: `The .count() method tells you how many times something appears:`,
      },
      {
        type: 'code',
        data: {
          code: `sentence = "Long John Silver had a parrot"

# Count a letter
print(f"Letter 'a' appears: {sentence.count('a')} times")

# Count a word/substring
print(f"'Silver' appears: {sentence.count('Silver')} time(s)")
print(f"'z' appears: {sentence.count('z')} times")

# count() on a list
grades = ["A", "B", "A", "C", "A", "B"]
print(f"Grade 'A' appears: {grades.count('A')} times")`,
          interactive: true,
        },
      },
      {
        type: 'warning',
        items: [`The .count() method is case-sensitive. "Silver" and "silver" are considered different strings.`],
      },
      {
        type: 'heading',
        level: 2,
        content: 'Functions vs. Methods',
      },
      {
        type: 'paragraph',
        content: `You may have noticed that we write len(sentence) but sentence.split(). Functions take the thing inside parentheses, while methods use dot notation.`,
      },
      {
        type: 'code',
        data: {
          code: `sentence = "Fifteen men on a dead man's chest"

# Putting it all together
print(f"Characters: {len(sentence)}")
print(f"Words: {len(sentence.split())}")
print(f"Times 'man' appears: {sentence.count('man')}")

# Why does 'man' appear twice?
# It is in "men" AND "man's"!`,
          interactive: true,
        },
      },
      {
        type: 'tip',
        items: [`The .count() method finds substrings anywhere they occur. "man" appears inside "men" and also in "man's".`],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PART 3: Reading Files
  // --------------------------------------------------------------------------
  {
    id: 'part3',
    title: 'Part 3: Reading Files',
    summary: 'Opening and processing text files',
    content: [
      {
        type: 'media',
        data: {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=700',
          alt: 'Library with many books',
          caption: 'Files store data that programs can read and process',
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Why Read Files?',
      },
      {
        type: 'paragraph',
        content: `So far, all our data has been typed directly into our programs. But real-world data usually lives in files: text documents, data exports, logs, and more. In this part, we will learn how to read text files into our Python programs.`,
      },
      {
        type: 'info',
        items: [`For the examples in this unit, we use treasure_island.txt, a text file containing Robert Louis Stevenson's classic adventure novel. When running locally in IDLE, make sure you have downloaded this file and saved it in the same folder as your Python program.`],
      },
      {
        type: 'heading',
        level: 2,
        content: 'Opening a File',
      },
      {
        type: 'paragraph',
        content: `To read a file, we use the open() function along with the with keyword:`,
      },
      {
        type: 'code',
        data: {
          code: `# File reading pattern (use this in IDLE with a real file):
# with open("treasure_island.txt") as file:
#     for line in file:
#         print(line.strip())

# For these browser examples, we simulate with strings:
text = """The Hispaniola lay some way out,
and we went under the figureheads
and round the sterns of many other ships."""

# Simulating reading line by line
for line in text.split('\\n'):
    print(line)`,
          interactive: true,
        },
      },
      {
        type: 'callout',
        title: 'Understanding the File Pattern',
        content: `- open("filename.txt") opens the file\n- as file gives us a name to refer to the opened file\n- with ensures the file gets properly closed when we are done\n- Everything indented underneath is the code that works with the file`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'The Hidden Newline Character',
      },
      {
        type: 'paragraph',
        content: `Each line from a file includes a special character at the end called a newline, written as \\n. This can cause double-spacing when printing. We fix this with .strip():`,
      },
      {
        type: 'code',
        data: {
          code: `# The strip() method removes whitespace from both ends
line = "  Hello, world!  \\n"
print(f"Before strip: '{line}'")
print(f"After strip: '{line.strip()}'")`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'The break Statement',
      },
      {
        type: 'paragraph',
        content: `Sometimes you want to stop a loop early. The break statement immediately exits the loop:`,
      },
      {
        type: 'code',
        data: {
          code: `# Print only the first 3 items
items = ["apple", "banana", "cherry", "date", "elderberry"]
count = 0

for item in items:
    print(item)
    count += 1
    if count == 3:
        break  # Exit the loop early

print("Done!")`,
          interactive: true,
        },
      },
      {
        type: 'warning',
        items: [`Common error: FileNotFoundError means the file is not in the same folder as your Python program, or the filename is spelled differently (including capitalization).`],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PART 4: Counting with Files
  // --------------------------------------------------------------------------
  {
    id: 'part4',
    title: 'Part 4: Counting with Files',
    summary: 'The accumulator pattern applied to file processing',
    content: [
      {
        type: 'media',
        data: {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=700',
          alt: 'Counting beads on an abacus',
          caption: 'Counting patterns are fundamental to data processing',
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'The Accumulator Pattern with Files',
      },
      {
        type: 'paragraph',
        content: `In Part 1, we learned the accumulator pattern: start with a variable at zero, then add to it each time something happens. Now we will apply this pattern to count things in files.`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'Counting Lines',
      },
      {
        type: 'code',
        data: {
          code: `# Simulating counting lines in a file
text = """Line one
Line two
Line three
Line four
Line five"""

line_count = 0
for line in text.split('\\n'):
    line_count += 1

print(f"The text has {line_count} lines.")`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Counting Words',
      },
      {
        type: 'code',
        data: {
          code: `text = """The ship sailed into the harbor.
Pirates were waiting on the dock.
Treasure maps in their hands."""

word_count = 0
for line in text.split('\\n'):
    word_count += len(line.split())

print(f"The text has {word_count} words.")`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Combining Multiple Counts',
      },
      {
        type: 'paragraph',
        content: `We can count multiple things in a single pass through the data:`,
      },
      {
        type: 'code',
        data: {
          code: `text = """The ship sailed into the harbor.
Pirates were waiting on the dock.

Treasure maps in their hands."""

line_count = 0
word_count = 0
blank_count = 0

for line in text.split('\\n'):
    line_count += 1
    word_count += len(line.split())
    if len(line.strip()) == 0:
        blank_count += 1

print(f"Lines: {line_count}")
print(f"Words: {word_count}")
print(f"Blank lines: {blank_count}")`,
          interactive: true,
        },
      },
      {
        type: 'callout',
        title: 'The Pattern',
        content: `- Counting lines: line_count += 1 (add 1 for each line)\n- Counting words: word_count += len(line.split()) (add the number of words in each line)\n- Counting conditionally: only add when a condition is met (like blank lines)`,
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PART 5: Comparison Operators
  // --------------------------------------------------------------------------
  {
    id: 'part5',
    title: 'Part 5: Comparison Operators',
    summary: 'Making decisions with ==, !=, <, >, <=, >=',
    content: [
      {
        type: 'media',
        data: {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=700',
          alt: 'Balance scale for comparison',
          caption: 'Comparison operators help programs make decisions',
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Comparing Values',
      },
      {
        type: 'paragraph',
        content: `Programs often need to make decisions: Is this word what we are looking for? Is this number bigger than that one? To answer these questions, we use comparison operators that return True or False.`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'The Equality Operator: ==',
      },
      {
        type: 'code',
        data: {
          code: `word = "treasure"
print(f"word == 'treasure': {word == 'treasure'}")
print(f"word == 'gold': {word == 'gold'}")`,
          interactive: true,
        },
      },
      {
        type: 'warning',
        items: [`Common mistake: = is for assignment (putting a value into a variable). == is for comparison (checking if two things are equal). Do not confuse them.`],
      },
      {
        type: 'heading',
        level: 2,
        content: 'All Comparison Operators',
      },
      {
        type: 'code',
        data: {
          code: `# All comparison operators
print("5 == 5:", 5 == 5)   # Equal to
print("5 != 3:", 5 != 3)   # Not equal to
print("7 > 3:", 7 > 3)     # Greater than
print("2 < 8:", 2 < 8)     # Less than
print("5 >= 5:", 5 >= 5)   # Greater than or equal to
print("4 <= 3:", 4 <= 3)   # Less than or equal to`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Case Sensitivity',
      },
      {
        type: 'code',
        data: {
          code: `word = "Treasure"
print(f"word == 'treasure': {word == 'treasure'}")  # False!
print(f"word.lower() == 'treasure': {word.lower() == 'treasure'}")  # True`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Counting with Conditions',
      },
      {
        type: 'code',
        data: {
          code: `# Count lines with more than 5 words
text = """The ship sailed into the harbor at dawn.
Pirates waited.
The treasure was hidden beneath the old oak tree.
X marks the spot."""

long_line_count = 0
for line in text.split('\\n'):
    word_count = len(line.split())
    if word_count > 5:
        long_line_count += 1
        print(f"Long line ({word_count} words): {line}")

print(f"\\nTotal lines with more than 5 words: {long_line_count}")`,
          interactive: true,
        },
      },
      {
        type: 'callout',
        title: 'True and False',
        content: `True and False are special values in Python called booleans. When you use a comparison operator, the result is always a boolean value.`,
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PART 6: Finding Extremes
  // --------------------------------------------------------------------------
  {
    id: 'part6',
    title: 'Part 6: Finding Extremes',
    summary: 'Finding the longest, shortest, maximum, and minimum',
    content: [
      {
        type: 'media',
        data: {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700',
          alt: 'Mountain peak representing extremes',
          caption: 'Finding the highest, lowest, longest, and shortest values',
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'The Best So Far Pattern',
      },
      {
        type: 'paragraph',
        content: `Sometimes we do not just want to count things. We want to find the best one. The longest word. The shortest line. The highest score. The pattern: as we look at each item, we ask "Is this better than the best I have seen so far?" If yes, it becomes the new best.`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'Finding the Longest Word',
      },
      {
        type: 'code',
        data: {
          code: `words = ["ship", "treasure", "island", "captain", "map"]

longest = ""
for word in words:
    if len(word) > len(longest):
        longest = word
        print(f"New longest: {word} ({len(word)} letters)")

print(f"\\nThe longest word is: {longest}")`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Tracking Multiple Values',
      },
      {
        type: 'paragraph',
        content: `What if we want to know both the longest line and how many words it has? We need to track two things:`,
      },
      {
        type: 'code',
        data: {
          code: `text = """The ship sailed.
Pirates were waiting on the dock with weapons drawn.
Treasure ahead!
The captain shouted orders to the crew."""

longest_line = ""
max_words = 0

for line in text.split('\\n'):
    word_count = len(line.split())
    if word_count > max_words:
        max_words = word_count
        longest_line = line

print(f"The longest line has {max_words} words:")
print(longest_line)`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Finding the Minimum',
      },
      {
        type: 'code',
        data: {
          code: `numbers = [42, 17, 93, 8, 55]

# Method 1: Start with the first item
smallest = numbers[0]
for num in numbers:
    if num < smallest:
        smallest = num
print(f"Smallest (method 1): {smallest}")

# Method 2: Start with infinity
smallest = float('inf')  # Nothing is bigger than infinity!
for num in numbers:
    if num < smallest:
        smallest = num
print(f"Smallest (method 2): {smallest}")`,
          interactive: true,
        },
      },
      {
        type: 'callout',
        title: 'Choosing Initial Values',
        content: `- For maximum: Start with 0, an empty string, or float('-inf')\n- For minimum: Start with the first item, or float('inf')`,
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PART 7: Nested Loops
  // --------------------------------------------------------------------------
  {
    id: 'part7',
    title: 'Part 7: Nested Loops',
    summary: 'Processing words within lines',
    content: [
      {
        type: 'media',
        data: {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700',
          alt: 'Nested Russian dolls',
          caption: 'Nested loops are like loops inside loops',
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'When One Loop Is Not Enough',
      },
      {
        type: 'paragraph',
        content: `So far, we have looped through text line by line. But sometimes we need to examine each word on each line. That requires a loop inside a loop: a nested loop.`,
      },
      {
        type: 'code',
        data: {
          code: `text = """The pirates found treasure.
Gold coins everywhere!
Silver and jewels too."""

print("All words in the text:")
for line in text.split('\\n'):       # Outer loop: each line
    for word in line.split():        # Inner loop: each word
        print(f"  {word}")
    print("---")  # Separator between lines`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Counting a Specific Word',
      },
      {
        type: 'code',
        data: {
          code: `text = """Silver coins in the silver chest.
The silver key unlocked silver treasures."""

count = 0
for line in text.split('\\n'):
    for word in line.split():
        if word.lower() == "silver":
            count += 1

print(f"The word 'silver' appears {count} times.")`,
          interactive: true,
        },
      },
      {
        type: 'warning',
        items: [`Important distinction: word == "silver" checks for an exact match. "silver" in word checks if "silver" appears anywhere in the word (like "silverware").`],
      },
      {
        type: 'heading',
        level: 2,
        content: 'The in Operator',
      },
      {
        type: 'code',
        data: {
          code: `# "in" checks if something appears inside something else
print("'silver' in 'silverware':", "silver" in "silverware")
print("'silver' in 'gold':", "silver" in "gold")

# Works with lists too
pirates = ["Jim", "Silver", "Smollett"]
print("'Silver' in pirates:", "Silver" in pirates)
print("'Flint' in pirates:", "Flint" in pirates)`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Using break to Count Lines (Not Occurrences)',
      },
      {
        type: 'code',
        data: {
          code: `# Count LINES that contain "treasure" (not total occurrences)
text = """The treasure map was old.
Pirates love treasure hunting.
Gold is valuable.
More treasure awaits."""

count = 0
for line in text.split('\\n'):
    for word in line.split():
        if word.lower() == "treasure":
            count += 1
            break  # Found it on this line, move to next

print(f"Lines containing 'treasure': {count}")`,
          interactive: true,
        },
      },
      {
        type: 'callout',
        title: 'Common Mistake',
        content: `for word in line loops through CHARACTERS, not words!\nfor word in line.split() loops through WORDS.\nAlways use .split() when you want words.`,
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PART 8: User Input
  // --------------------------------------------------------------------------
  {
    id: 'part8',
    title: 'Part 8: User Input',
    summary: 'Creating interactive programs with input()',
    content: [
      {
        type: 'media',
        data: {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=700',
          alt: 'Computer keyboard for user input',
          caption: 'The input() function lets users interact with your program',
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'The input() Function',
      },
      {
        type: 'paragraph',
        content: `The input() function pauses the program, displays a message, and waits for the user to type something. Whatever they type gets stored in a variable.`,
      },
      {
        type: 'info',
        items: [`Note: The interactive code blocks below cannot use input() since they run in your browser. Try these examples in IDLE on your computer.`],
      },
      {
        type: 'code',
        data: {
          code: `# In IDLE, this would pause and wait for input:
# name = input("What is your name? ")
# print(f"Hello, {name}!")

# For demonstration, let us simulate it:
name = "Captain"  # Simulated user input
print(f"Hello, {name}!")`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'input() Always Returns a String',
      },
      {
        type: 'paragraph',
        content: `No matter what the user types, input() always gives you a string. If you need to do math with it, convert it:`,
      },
      {
        type: 'code',
        data: {
          code: `# Simulating: age = input("How old are you? ")
age_string = "25"  # User typed "25"
print(f"Type of input: {type(age_string)}")

# Convert to integer for math
age = int(age_string)
next_year = age + 1
print(f"Next year you will be {next_year}!")`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Building a Search Program',
      },
      {
        type: 'code',
        data: {
          code: `# Simulating an interactive search
text = """The treasure was hidden on the island.
Pirates searched everywhere for gold.
The map showed the treasure location."""

search_word = "treasure"  # Simulated user input

count = 0
for line in text.split('\\n'):
    if search_word.lower() in line.lower():
        count += 1
        print(f"Found: {line}")

if count > 0:
    print(f"\\nFound on {count} lines.")
else:
    print("Not found.")`,
          interactive: true,
        },
      },
      {
        type: 'tip',
        items: [`Using .lower() on both the search word and the line makes the search case-insensitive. "Treasure" and "treasure" will both be found.`],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PART 9: Iteration Review
  // --------------------------------------------------------------------------
  {
    id: 'part9',
    title: 'Part 9: Iteration Review',
    summary: 'Understanding what Python iterates over',
    content: [
      {
        type: 'media',
        data: {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1494059980473-813e73ee784b?w=700',
          alt: 'Winding path representing iteration',
          caption: 'Understanding iteration is key to mastering loops',
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'How Does Python Know What to Iterate Over?',
      },
      {
        type: 'paragraph',
        content: `By now, we have used for statements to go character by character, word by word, and line by line. How does Python know which we mean? The answer: Python looks at the type of the target, which is the last thing on the header line.`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'Example 1: Iterating Over a List',
      },
      {
        type: 'code',
        data: {
          code: `pirates = ['Jim', 'Silver', 'Smollett', 'Trelawney']
print("Iterating over a list:")
for name in pirates:
    print(f"  {name}")`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Example 2: Iterating Over a String',
      },
      {
        type: 'code',
        data: {
          code: `word = 'treasure'
print("Iterating over a string (character by character):")
for letter in word:
    print(f"  {letter}")`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Example 3: Iterating Over Words (Using split)',
      },
      {
        type: 'code',
        data: {
          code: `sentence = 'Long John Silver had a parrot'
print("The split creates:", sentence.split())
print()
print("Iterating over words:")
for word in sentence.split():
    print(f"  {word}")`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Combining Iterations',
      },
      {
        type: 'code',
        data: {
          code: `# Going word by word through multi-line text
text = """The ship sailed.
Pirates waited."""

print("=== Words in the text ===")
for line in text.split('\\n'):
    print(f"Line: {line}")
    for word in line.split():
        print(f"    Word: {word}")`,
          interactive: true,
        },
      },
      {
        type: 'callout',
        title: 'Summary: What Gets Iterated',
        content: `- List: items in the list\n- String: characters in the string\n- string.split(): words in the string\n- File object: lines in the file`,
      },
    ],
  },
];

// ============================================================================
// PRACTICE EXERCISES
// ============================================================================

const exercises: ExerciseData[] = [
  {
    id: 'exercise1',
    title: 'Counting a Letter',
    description: `Write a program that counts how many times the lowercase letter 'e' appears in the given text. Use the accumulator pattern with the .count() method.`,
    difficulty: 'beginner',
    interactive: true,
    starter: `# Count how many times 'e' appears in this text
text = """The treasure was buried beneath the ancient tree.
Everyone searched everywhere but found nothing.
The secret remained hidden for centuries."""

# Your code here - count the letter 'e' in each line
# and print the total

`,
    solution: `text = """The treasure was buried beneath the ancient tree.
Everyone searched everywhere but found nothing.
The secret remained hidden for centuries."""

total = 0
for line in text.split('\\n'):
    total += line.count('e')

print(f"The letter 'e' appears {total} times.")`,
    hints: [
      `You will need to loop through each line and count how many times 'e' appears in that line. Keep a running total.`,
      `Strings have a .count() method: my_string.count('e') returns how many times 'e' appears.`,
      `Create total = 0 before the loop. Inside the loop: total += line.count('e'). After the loop, print the total.`,
    ],
  },
  {
    id: 'exercise2',
    title: 'Finding the Shortest Word',
    description: `Given a list of words, find and print the shortest word in the list. Use the "find extreme" pattern.`,
    difficulty: 'beginner',
    interactive: true,
    starter: `words = ["captain", "treasure", "map", "island", "ship", "parrot", "gold"]

# Find the shortest word in the list
# Your code here

`,
    solution: `words = ["captain", "treasure", "map", "island", "ship", "parrot", "gold"]

shortest_word = words[0]
shortest_length = len(words[0])

for word in words:
    if len(word) < shortest_length:
        shortest_word = word
        shortest_length = len(word)

print(f"The shortest word is: {shortest_word}")`,
    hints: [
      `This is the "find extreme" pattern. You are looking for the minimum length. Track both the shortest word AND its length.`,
      `Start by assuming the first word is the shortest: shortest_word = words[0] and shortest_length = len(words[0])`,
      `Loop through each word. If len(word) < shortest_length, update both shortest_word and shortest_length.`,
    ],
  },
  {
    id: 'exercise3',
    title: 'Summing Numbers',
    description: `Calculate and print the sum of all numbers in the given list using the accumulator pattern.`,
    difficulty: 'beginner',
    interactive: true,
    starter: `numbers = [12, 45, 7, 23, 56, 89, 34]

# Calculate the sum of all numbers
# Your code here

`,
    solution: `numbers = [12, 45, 7, 23, 56, 89, 34]

total = 0
for number in numbers:
    total += number

print(f"The sum is: {total}")`,
    hints: [
      `This is the classic accumulator pattern. You need a variable that starts at 0 and grows as you add each number.`,
      `Create total = 0 before the loop. Inside the loop: total += number`,
      `After the loop completes, total contains the sum. Print it with an f-string: print(f"The sum is: {total}")`,
    ],
  },
  {
    id: 'exercise4',
    title: 'Finding the Longest Line',
    description: `Find the longest line (by word count) in the given text. Print both the line and how many words it contains.`,
    difficulty: 'intermediate',
    interactive: true,
    starter: `text = """The ship sailed into the harbor at dawn.
Pirates waited.
The treasure was hidden beneath the old oak tree on the hill.
X marks the spot.
Captain Silver drew his sword and prepared for battle."""

# Find the longest line by word count
# Your code here

`,
    solution: `text = """The ship sailed into the harbor at dawn.
Pirates waited.
The treasure was hidden beneath the old oak tree on the hill.
X marks the spot.
Captain Silver drew his sword and prepared for battle."""

max_words = 0
longest_line = ""

for line in text.split('\\n'):
    word_count = len(line.split())
    if word_count > max_words:
        max_words = word_count
        longest_line = line

print(f"The longest line has {max_words} words:")
print(longest_line)`,
    hints: [
      `This combines the accumulator pattern with finding an extreme. Track the maximum word count AND the line that had it.`,
      `Use len(line.split()) to count words in a line. Keep two variables: max_words (start at 0) and longest_line (start as empty string).`,
      `When word_count > max_words, update BOTH variables. After the loop, print both the count and the line.`,
    ],
  },
  {
    id: 'exercise5',
    title: 'Counting Lines with a Word',
    description: `Count how many lines contain the word "treasure" (case-insensitive, as a complete word). Use a nested loop and break to avoid double-counting.`,
    difficulty: 'intermediate',
    interactive: true,
    starter: `text = """The treasure map was old and worn.
Pirates searched for buried treasure everywhere.
Gold and silver filled the chest.
The greatest treasure of all was friendship.
Maps can lead to unexpected discoveries."""

# Count lines that contain the word "treasure" (as a complete word)
# Your code here

`,
    solution: `text = """The treasure map was old and worn.
Pirates searched for buried treasure everywhere.
Gold and silver filled the chest.
The greatest treasure of all was friendship.
Maps can lead to unexpected discoveries."""

count = 0
for line in text.split('\\n'):
    for word in line.split():
        if word.lower() == "treasure":
            count += 1
            break  # Found it on this line, move to next line

print(f"Lines containing 'treasure': {count}")`,
    hints: [
      `Use a nested loop: outer loop for lines, inner loop for words. Use break after finding the word to avoid counting the same line twice.`,
      `Compare word.lower() == "treasure" for exact, case-insensitive matching.`,
      `When you find "treasure", increment count and break out of the inner loop to move to the next line.`,
    ],
  },
  {
    id: 'exercise6',
    title: 'Vowel Counter Challenge',
    description: `For each word in the list, count how many vowels it contains. Find and print the word with the most vowels (a, e, i, o, u).`,
    difficulty: 'advanced',
    interactive: true,
    starter: `words = ["treasure", "island", "adventure", "pirate", "gold", "mysterious"]

# Find the word with the most vowels
# Vowels are: a, e, i, o, u
# Your code here

`,
    solution: `words = ["treasure", "island", "adventure", "pirate", "gold", "mysterious"]

max_vowels = 0
best_word = ""

for word in words:
    # Count vowels in this word
    vowel_count = 0
    for char in word.lower():
        if char in "aeiou":
            vowel_count += 1
    
    # Check if this word has the most vowels
    if vowel_count > max_vowels:
        max_vowels = vowel_count
        best_word = word

print(f"The word with the most vowels is '{best_word}' with {max_vowels} vowels.")`,
    hints: [
      `You need a nested loop: outer loop for each word, inner loop to count vowels in that word.`,
      `To count vowels: for char in word.lower(): if char in "aeiou": vowel_count += 1`,
      `Track max_vowels and best_word. After counting vowels in each word, check if vowel_count > max_vowels and update both variables.`,
    ],
  },
];

// ============================================================================
// COMPONENT EXPORT
// ============================================================================

export default function CSCI133Unit2_s26() {
  return (
    <InteractiveUnitTemplate
      unitTitle="Unit 2: Working with Files and Data"
      unitSubtitle="CSCI 133 - Computer Programming | Spring 2026"
      overview={overview}
      lessons={lessons}
      exercises={exercises}
      backLink={{
        to: '/teaching',
        label: 'Back to Courses',
      }}
    />
  );
}