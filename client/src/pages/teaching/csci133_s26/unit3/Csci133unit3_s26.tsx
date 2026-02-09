import InteractiveUnitTemplate, {
  type OverviewData,
  type LessonData,
  type ExerciseData,
} from '../interactiveUnitTemplate';

// ============================================================================
// UNIT 3: LEARN SOMETHING NEW
// Dictionaries and Functions
// ============================================================================

const overview: OverviewData = {
  intro: `In this unit, you will learn about dictionaries, a powerful data type for storing key-value pairs, and how to define your own functions. These skills allow you to write more organized, reusable, and professional code.`,
  heroImage: {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800',
    alt: 'Library representing organized data storage',
    caption: 'Dictionaries organize data like a library organizes books',
  },
  objectives: [
    'Create and use dictionaries to store key-value pairs',
    'Look up values and check if keys exist in a dictionary',
    'Use if-else statements to handle two different cases',
    'Build a concordance that tracks word locations in text',
    'Use while loops to repeat code until a condition changes',
    'Clean text by removing punctuation and normalizing case',
    'Define your own functions with parameters and return values',
    'Understand why functions make programs better',
  ],
  prerequisites: [
    'Completion of Unit 2 (file processing, loops, accumulators)',
    'Familiarity with for loops and if statements',
    'Experience with string methods like split() and lower()',
  ],
  whyTitle: 'Why Learn Dictionaries and Functions?',
  whyBullets: [
    'Dictionaries let you associate related pieces of data naturally',
    'Functions help you organize code into reusable building blocks',
    'Professional programmers use these tools constantly',
  ],
  progress: [
    { title: 'Dictionaries', description: 'Key-value pairs and lookups' },
    { title: 'Building a Concordance', description: 'Creating and updating dictionaries' },
    { title: 'While Loops', description: 'Repeating until a condition changes' },
    { title: 'Cleaning Text', description: 'Removing punctuation, normalizing case' },
    { title: 'Defining Functions', description: 'def, parameters, and return' },
    { title: 'Why Functions Matter', description: 'Readability and reusability' },
  ],
};

// ============================================================================
// LESSONS
// ============================================================================

const lessons: LessonData[] = [
  // --------------------------------------------------------------------------
  // PART 1: Dictionaries
  // --------------------------------------------------------------------------
  {
    id: 'part1',
    title: 'Part 1: Dictionaries',
    summary: 'Key-value pairs and the if-else statement',
    content: [
      {
        type: 'media',
        data: {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=700',
          alt: 'Dictionary book',
          caption: 'A Python dictionary associates keys with values, like words with definitions',
        },
      },
      {
        type: 'paragraph',
        content: `In this unit, we will learn about a powerful new data type called a dictionary. A dictionary is a collection of key-value pairs, like a real dictionary where words (keys) are associated with definitions (values).`,
      },
      {
        type: 'paragraph',
        content: `Let us start with a simple example: a login system that checks usernames and passwords.`,
      },
      {
        type: 'code',
        data: {
          code: `# A dictionary of usernames and passwords
passwords = {'silver': 'treasure', 'jim': 'hawkins', 'billy': 'bones'}

# Look up a password by username
print(passwords['silver'])  # prints: treasure
print(passwords['jim'])     # prints: hawkins`,
          interactive: true,
        },
      },
      {
        type: 'paragraph',
        content: `In this dictionary, there are three key-value pairs. The first key is 'silver' and it is associated with the value 'treasure'. We use colons (:) to connect each key with its value and commas (,) to separate pairs. The whole dictionary is wrapped in curly brackets: { and }.`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'Looking Up Values in a Dictionary',
      },
      {
        type: 'paragraph',
        content: `To look up a value, place a key in square brackets after the dictionary's name:`,
      },
      {
        type: 'code',
        data: {
          code: `passwords = {'silver': 'treasure', 'jim': 'hawkins', 'billy': 'bones'}

# Looking up values by key
print(f"silver's password: {passwords['silver']}")
print(f"jim's password: {passwords['jim']}")
print(f"billy's password: {passwords['billy']}")`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'The if-else Statement',
      },
      {
        type: 'paragraph',
        content: `The if-else statement lets us handle two different cases. If the condition is True, the indented block after if runs. If the condition is False, the indented block after else runs. Exactly one of the two blocks will always execute.`,
      },
      {
        type: 'code',
        data: {
          code: `# Simulating a login check
passwords = {'silver': 'treasure', 'jim': 'hawkins', 'billy': 'bones'}
username = 'silver'
password = 'treasure'

if password == passwords[username]:
    print('You are logged in.')
else:
    print('Bad password.')`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Checking if a Key Exists',
      },
      {
        type: 'paragraph',
        content: `Looking up a key that does not exist will cause an error! We can check if a key exists using the in operator:`,
      },
      {
        type: 'code',
        data: {
          code: `crew = {'Long John Silver': 'cook', 'Jim Hawkins': 'cabin boy', 'Captain Smollett': 'captain'}

# Check if a name is in the crew
name = 'Jim Hawkins'
if name in crew:
    print(f"{name} is the {crew[name]}.")
else:
    print(f"{name} is not in the crew.")

# Try a name that doesn't exist
name = 'Blackbeard'
if name in crew:
    print(f"{name} is the {crew[name]}.")
else:
    print(f"{name} is not in the crew.")`,
          interactive: true,
        },
      },
      {
        type: 'callout',
        title: 'Key Points',
        content: `- Dictionaries use curly brackets { }\n- Each entry is a key: value pair\n- Look up values using dictionary[key]\n- Check if a key exists using key in dictionary\n- The else block runs when the if condition is False`,
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PART 2: Building a Concordance
  // --------------------------------------------------------------------------
  {
    id: 'part2',
    title: 'Part 2: Building a Concordance',
    summary: 'Creating and updating dictionaries dynamically',
    content: [
      {
        type: 'media',
        data: {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=700',
          alt: 'Index cards',
          caption: 'A concordance is like an index that tells you where words appear',
        },
      },
      {
        type: 'paragraph',
        content: `Now let us build something more substantial: a concordance. A concordance is a reference that tells you which lines in a text contain any given word. Scholars have created concordances for important works like the Bible and Shakespeare's plays.`,
      },
      {
        type: 'paragraph',
        content: `Our dictionary will use words as keys, and lists of line numbers as values. For example, if the word "treasure" appears on lines 15, 466, and 901, we would have:`,
      },
      {
        type: 'code',
        data: {
          code: `# Example concordance structure
concordance = {'treasure': [15, 466, 901], 'island': [1, 23, 456]}
print(concordance['treasure'])  # [15, 466, 901]`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Creating an Empty Dictionary',
      },
      {
        type: 'paragraph',
        content: `We start with an empty dictionary and fill it as we read through the file:`,
      },
      {
        type: 'code',
        data: {
          code: `# Creating an empty dictionary
concordance = {}
print(f"Empty dictionary: {concordance}")

# Adding entries one at a time
concordance['treasure'] = [15]
print(f"After adding treasure: {concordance}")

concordance['island'] = [1, 23]
print(f"After adding island: {concordance}")`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'The Key Decision: First Time or Not?',
      },
      {
        type: 'paragraph',
        content: `When we encounter a word, we need to ask: have we seen this word before? If it is the first time, we create a new entry. If we have seen it before, we add to the existing list.`,
      },
      {
        type: 'code',
        data: {
          code: `# Simulating building a concordance
text = """The treasure was hidden.
The pirates found the treasure.
They buried more treasure."""

concordance = {}
linenum = 1

for line in text.split('\\n'):
    for word in line.lower().split():
        if word in concordance:
            # Already seen this word - add to existing list
            concordance[word].append(linenum)
        else:
            # First time seeing this word - create new list
            concordance[word] = [linenum]
    linenum += 1

print(f"'the' appears on lines: {concordance['the']}")
print(f"'treasure' appears on lines: {concordance['treasure']}")`,
          interactive: true,
        },
      },
      {
        type: 'callout',
        title: 'Adding New Key-Value Pairs',
        content: `To add a new entry to a dictionary, use: dictionary[key] = value\n\nNote the difference:\n- concordance['island'] = 42 sets value to the integer 42\n- concordance['island'] = [42] sets value to a list containing 42\n\nWe want lists so we can append more line numbers later.`,
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PART 3: While Loops
  // --------------------------------------------------------------------------
  {
    id: 'part3',
    title: 'Part 3: While Loops',
    summary: 'Repeating until a condition changes',
    content: [
      {
        type: 'media',
        data: {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=700',
          alt: 'Circular arrows representing loops',
          caption: 'While loops repeat as long as a condition is true',
        },
      },
      {
        type: 'paragraph',
        content: `So far, the only way we have of repeating instructions is with a for loop, but that limits repetition to once for each item in a collection. What if we want to let the user look up an unlimited number of words? For this, we introduce the while statement.`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'The while Statement',
      },
      {
        type: 'paragraph',
        content: `Like if, the while statement specifies a condition. The indented block that follows is carried out over and over, as long as the condition remains true. As soon as the condition becomes false, Python skips the indented block and continues.`,
      },
      {
        type: 'code',
        data: {
          code: `# Countdown using while
count = 5
while count > 0:
    print(count)
    count -= 1
print("Liftoff!")`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'while True: The Infinite Loop',
      },
      {
        type: 'paragraph',
        content: `If we use True directly as the condition in a while, we get an infinite loop: a repetition that never stops on its own. This is useful when we want the user to interact with our program indefinitely.`,
      },
      {
        type: 'code',
        data: {
          code: `# Example of while True structure (this would run forever in IDLE)
# while True:
#     word = input('Enter word: ')
#     print(f'You entered: {word}')

# For demonstration, let's simulate a few iterations:
words_to_process = ['treasure', 'island', 'pirate']
for word in words_to_process:
    print(f'Processing: {word}')`,
          interactive: true,
        },
      },
      {
        type: 'info',
        items: [`To stop an infinite loop in IDLE: Windows uses Ctrl+C, Mac uses Control+C. This sends an interrupt signal that stops the program.`],
      },
      {
        type: 'heading',
        level: 2,
        content: 'for vs while',
      },
      {
        type: 'code',
        data: {
          code: `# for loop: Use when you know how many times to repeat
pirates = ['Jim', 'Silver', 'Smollett']
for pirate in pirates:
    print(pirate)

print("---")

# while loop: Use when you want to repeat until a condition changes
count = 0
while count < 3:
    print(f"Count is {count}")
    count += 1`,
          interactive: true,
        },
      },
      {
        type: 'callout',
        title: 'When to Use Each',
        content: `- for loop: Use when you know how many times to repeat (once per item in a collection)\n- while loop: Use when you want to repeat until some condition changes, or indefinitely`,
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PART 4: Cleaning Text
  // --------------------------------------------------------------------------
  {
    id: 'part4',
    title: 'Part 4: Cleaning Text',
    summary: 'Removing punctuation and normalizing case',
    content: [
      {
        type: 'media',
        data: {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=700',
          alt: 'Clean paper',
          caption: 'Cleaning text makes it easier to analyze',
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'The Problem: Same Word, Different Entries',
      },
      {
        type: 'paragraph',
        content: `If you search for "treasure" in our concordance, you might be surprised. The problem is that split() uses whitespace to separate words, so punctuation stays attached. Our concordance has separate entries for "treasure", "treasure.", "treasure,", and "Treasure"!`,
      },
      {
        type: 'code',
        data: {
          code: `# The problem with punctuation
text = "Treasure! The treasure, and more treasure."
words = text.split()
print("Words with punctuation attached:")
for word in words:
    print(f"  '{word}'")`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'How the Cleaning Works',
      },
      {
        type: 'paragraph',
        content: `We fix this by cleaning up each line before processing. We convert everything to lowercase and replace non-letter characters with spaces.`,
      },
      {
        type: 'code',
        data: {
          code: `# Cleaning text: keep only letters, replace everything else with spaces
alphabet = 'abcdefghijklmnopqrstuvwxyz'

line = "Treasure! The treasure, and more treasure."
cleanline = ''

for character in line.lower():
    if character in alphabet:
        cleanline += character
    else:
        cleanline += ' '

print(f"Original: {line}")
print(f"Cleaned:  {cleanline}")
print(f"Words: {cleanline.split()}")`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Building Strings Character by Character',
      },
      {
        type: 'paragraph',
        content: `We start with an empty string and add characters one by one using +=:`,
      },
      {
        type: 'code',
        data: {
          code: `# Building a string character by character
result = ''
result += 't'
print(f"After adding 't': '{result}'")

result += 'r'
print(f"After adding 'r': '{result}'")

result += 'e'
print(f"After adding 'e': '{result}'")`,
          interactive: true,
        },
      },
      {
        type: 'warning',
        items: [`Common Mistake: Empty String vs Space. If we replace punctuation with nothing (''), "sample--with" becomes "samplewith". If we replace with a space (' '), it correctly becomes "sample with". The space preserves word boundaries when we use split().`],
      },
      {
        type: 'callout',
        title: 'Key Points',
        content: `- string.lower() returns a lowercase copy of the string\n- Build new strings by starting with '' and using +=\n- Replace punctuation with spaces (not nothing) to preserve word boundaries`,
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PART 5: Defining Functions
  // --------------------------------------------------------------------------
  {
    id: 'part5',
    title: 'Part 5: Defining Functions',
    summary: 'Using def, parameters, and return',
    content: [
      {
        type: 'media',
        data: {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700',
          alt: 'Building blocks',
          caption: 'Functions are reusable building blocks for your programs',
        },
      },
      {
        type: 'paragraph',
        content: `Our text-cleaning code works, but it makes the program hard to read. The cleanup logic is tangled up with the concordance-building logic. Would it not be nicer if we could write something like: for word in cleanedup(line).split()? We can create our own functions!`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'The def Statement',
      },
      {
        type: 'paragraph',
        content: `We use def (short for "define") to create a function:`,
      },
      {
        type: 'code',
        data: {
          code: `# Defining a simple function
def double(x):
    return x * 2

# Calling the function
result = double(5)
print(f"double(5) = {result}")

result = double(17)
print(f"double(17) = {result}")`,
          interactive: true,
        },
      },
      {
        type: 'paragraph',
        content: `In this example: double is the name of the function, x is a parameter (a placeholder for input the function will receive), the indented block is the function body, and return specifies what value the function sends back.`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'The cleanedup Function',
      },
      {
        type: 'code',
        data: {
          code: `def cleanedup(s):
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    cleantext = ''
    for character in s.lower():
        if character in alphabet:
            cleantext += character
        else:
            cleantext += ' '
    return cleantext

# Test the function
print(cleanedup("Hello, World!"))
print(cleanedup("Treasure! said the captain."))
print(cleanedup("Test...123"))`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Calling the Function',
      },
      {
        type: 'paragraph',
        content: `When we write cleanedup(line), the value of line is passed to the function. Inside the function, s refers to that value. The function body executes, and when return cleantext runs, the cleaned-up text is sent back.`,
      },
      {
        type: 'code',
        data: {
          code: `def cleanedup(s):
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    cleantext = ''
    for character in s.lower():
        if character in alphabet:
            cleantext += character
        else:
            cleantext += ' '
    return cleantext

# Using cleanedup with split
line = "The pirates, found TREASURE!"
words = cleanedup(line).split()
print(f"Original: {line}")
print(f"Cleaned words: {words}")`,
          interactive: true,
        },
      },
      {
        type: 'callout',
        title: 'The return Statement',
        content: `The return statement does two things:\n1. Specifies the value to send back to the caller\n2. Immediately exits the function\n\nFunction definitions must appear before they are called. That is why def cleanedup(s): is at the top of our program.`,
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PART 6: Why Functions Matter
  // --------------------------------------------------------------------------
  {
    id: 'part6',
    title: 'Part 6: Why Functions Matter',
    summary: 'Readability, testing, and reusability',
    content: [
      {
        type: 'media',
        data: {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=700',
          alt: 'Organized tools',
          caption: 'Functions help you organize code into reusable pieces',
        },
      },
      {
        type: 'paragraph',
        content: `Defining functions is a central part of programming. We have seen that using functions makes programs easier to understand, but that is just the beginning.`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'Benefit 1: Readability',
      },
      {
        type: 'paragraph',
        content: `Functions let us break complex programs into smaller, named pieces. Compare these two approaches:`,
      },
      {
        type: 'code',
        data: {
          code: `# Without functions (hard to read)
line = "Hello, World!"
alphabet = 'abcdefghijklmnopqrstuvwxyz'
cleanline = ''
for character in line.lower():
    if character in alphabet:
        cleanline += character
    else:
        cleanline += ' '
words = cleanline.split()
print(words)`,
          interactive: true,
        },
      },
      {
        type: 'code',
        data: {
          code: `# With functions (easy to read)
def cleanedup(s):
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    cleantext = ''
    for character in s.lower():
        if character in alphabet:
            cleantext += character
        else:
            cleantext += ' '
    return cleantext

line = "Hello, World!"
words = cleanedup(line).split()
print(words)`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Benefit 2: Easier to Write and Test',
      },
      {
        type: 'paragraph',
        content: `Small pieces are easier to write and debug than large ones. You can test a function in isolation:`,
      },
      {
        type: 'code',
        data: {
          code: `def cleanedup(s):
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    cleantext = ''
    for character in s.lower():
        if character in alphabet:
            cleantext += character
        else:
            cleantext += ' '
    return cleantext

# Test the function by itself
print(f"Test 1: '{cleanedup('Hello, World!')}'")
print(f"Test 2: '{cleanedup('Test...123')}'")
print(f"Test 3: '{cleanedup('ALL CAPS!')}'")`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Benefit 3: Reusability',
      },
      {
        type: 'paragraph',
        content: `Once defined, a function can be called multiple times. If you had to write out the cleaning code each time, you would have the same lines repeated!`,
      },
      {
        type: 'code',
        data: {
          code: `def cleanedup(s):
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    cleantext = ''
    for character in s.lower():
        if character in alphabet:
            cleantext += character
        else:
            cleantext += ' '
    return cleantext

# Reusing the function multiple times
title = cleanedup("TREASURE ISLAND!")
chapter = cleanedup("Chapter 1: The Old Sea-Dog")
notes = cleanedup("Notes & Comments...")

print(f"Title: {title}")
print(f"Chapter: {chapter}")
print(f"Notes: {notes}")`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Building Programs from Functions',
      },
      {
        type: 'paragraph',
        content: `Professional programmers often build programs by breaking the problem into small tasks, writing and testing a function for each task, and then combining the functions to accomplish the main goal.`,
      },
      {
        type: 'code',
        data: {
          code: `# Three simple functions that work together
def cleanedup(s):
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    cleantext = ''
    for character in s.lower():
        if character in alphabet:
            cleantext += character
        else:
            cleantext += ' '
    return cleantext

def lengths(words):
    result = []
    for word in words:
        result.append(len(word))
    return result

def average(numbers):
    return sum(numbers) / len(numbers)

# Main program becomes beautifully simple
sentence = "The quick brown fox jumps over the lazy dog"
words = cleanedup(sentence).split()
print(f"Words: {words}")
print(f"Lengths: {lengths(words)}")
print(f"Average word length: {average(lengths(words))}")`,
          interactive: true,
        },
      },
      {
        type: 'callout',
        title: 'Key Takeaway',
        content: `Functions are one of the most powerful tools in programming. They let you:\n- Write clearer, more organized code\n- Test small pieces independently\n- Avoid repeating yourself\n- Build complex programs from simple building blocks`,
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
    title: 'Finding the Longest Word',
    description: `Write a program that finds the longest word in a text. Use the cleanedup function to clean each line before processing. Your output should display the longest word and its length.`,
    difficulty: 'beginner',
    interactive: true,
    starter: `def cleanedup(s):
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    cleantext = ''
    for character in s.lower():
        if character in alphabet:
            cleantext += character
        else:
            cleantext += ' '
    return cleantext

text = """The pirates discovered an extraordinary treasure.
Unfortunately, the captain was extraordinarily suspicious.
They sailed away with unbelievable riches."""

# Find the longest word in the text
# Your code here

`,
    solution: `def cleanedup(s):
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    cleantext = ''
    for character in s.lower():
        if character in alphabet:
            cleantext += character
        else:
            cleantext += ' '
    return cleantext

text = """The pirates discovered an extraordinary treasure.
Unfortunately, the captain was extraordinarily suspicious.
They sailed away with unbelievable riches."""

longest_word = ''
for line in text.split('\\n'):
    for word in cleanedup(line).split():
        if len(word) > len(longest_word):
            longest_word = word

print(f"The longest word is: {longest_word}")
print(f"It has {len(longest_word)} letters.")`,
    hints: [
      `Start with longest_word = '' and update it whenever you find a longer word.`,
      `Use nested loops: outer loop for lines, inner loop for words. Remember to use cleanedup(line).split() to get clean words.`,
      `Compare len(word) > len(longest_word) to check if the current word is longer. If so, update longest_word = word.`,
    ],
  },
  {
    id: 'exercise2',
    title: 'Vocabulary Translator',
    description: `Write a program that learns vocabulary in a language other than English. It asks the user for words in English, gives the translation if it has seen the word before, and if not, asks the user to enter the translation. Use a dictionary to store the translations.`,
    difficulty: 'intermediate',
    interactive: true,
    starter: `# Vocabulary Translator
# The program should:
# 1. Ask for an English word
# 2. If the word is in the dictionary, print the translation
# 3. If the word is NOT in the dictionary, ask for the translation and save it

# For browser demo, we'll simulate some interactions
translations = {}

# Simulated user inputs (in IDLE, you'd use input())
interactions = [
    ('cat', 'gato'),      # New word, provide translation
    ('dog', 'perro'),     # New word, provide translation
    ('cat', None),        # Known word, should print translation
    ('bird', 'pajaro'),   # New word, provide translation
]

# Your code here - process the interactions

`,
    solution: `# Vocabulary Translator
translations = {}

# Simulated user inputs
interactions = [
    ('cat', 'gato'),
    ('dog', 'perro'),
    ('cat', None),
    ('bird', 'pajaro'),
    ('dog', None),
]

for english, new_translation in interactions:
    print(f"Enter English word: {english}")
    if english in translations:
        print(f"{english} = {translations[english]}")
    else:
        print(f"Enter translation: {new_translation}")
        translations[english] = new_translation
    print()

print(f"Final dictionary: {translations}")`,
    hints: [
      `Use an empty dictionary translations = {} to store word pairs. Check if a word exists using word in translations.`,
      `Use if-else: if the word is in the dictionary, print the translation. Otherwise, get the translation and add it to the dictionary.`,
      `To add a new entry: translations[english_word] = translation. To look up: translations[english_word].`,
    ],
  },
  {
    id: 'exercise3',
    title: 'Word Frequency Counter',
    description: `Write a program that counts how many times each word appears in a text. After counting, look up specific words to see how many times they were used. Use a dictionary where keys are words and values are counts.`,
    difficulty: 'intermediate',
    interactive: true,
    starter: `def cleanedup(s):
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    cleantext = ''
    for character in s.lower():
        if character in alphabet:
            cleantext += character
        else:
            cleantext += ' '
    return cleantext

text = """The ship sailed into the harbor.
The pirates found the treasure on the island.
The captain hid the map in the cabin.
The crew searched the ship for the gold."""

# Count how many times each word appears
# Your code here

`,
    solution: `def cleanedup(s):
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    cleantext = ''
    for character in s.lower():
        if character in alphabet:
            cleantext += character
        else:
            cleantext += ' '
    return cleantext

text = """The ship sailed into the harbor.
The pirates found the treasure on the island.
The captain hid the map in the cabin.
The crew searched the ship for the gold."""

frequency = {}
for line in text.split('\\n'):
    for word in cleanedup(line).split():
        if word in frequency:
            frequency[word] += 1
        else:
            frequency[word] = 1

# Look up some words
words_to_check = ['the', 'ship', 'treasure', 'pirate']
for word in words_to_check:
    if word in frequency:
        print(f"'{word}' appears {frequency[word]} times.")
    else:
        print(f"'{word}' was not found.")`,
    hints: [
      `Use an empty dictionary frequency = {} where keys are words and values are counts.`,
      `When you see a word: if it is already in the dictionary, add 1 to its count. If not, set its count to 1.`,
      `The pattern is: if word in frequency: frequency[word] += 1 else: frequency[word] = 1`,
    ],
  },
  {
    id: 'exercise4',
    title: 'Repeat 100 Times',
    description: `Write a program that prints the name "Fred" 100 times, one time per line. Use a while loop with a counter variable.`,
    difficulty: 'beginner',
    interactive: true,
    starter: `# Print "Fred" 100 times using a while loop
# Your code here

`,
    solution: `# Print "Fred" 100 times using a while loop
count = 0
while count < 100:
    print("Fred")
    count += 1

print(f"\\nPrinted Fred {count} times.")`,
    hints: [
      `Start with count = 0 and use while count < 100 to repeat.`,
      `Inside the loop, print "Fred" and then increment count by 1.`,
      `The loop continues while count < 100, so it will print exactly 100 times (0 through 99).`,
    ],
  },
  {
    id: 'exercise5',
    title: 'Average Function',
    description: `Define a function called average that takes a list of numbers and returns the average. Then use it to calculate averages for several lists of numbers.`,
    difficulty: 'intermediate',
    interactive: true,
    starter: `# Define the average function
# It should take a list of numbers and return the average

# Your function definition here

# Test the function
numbers1 = [1, 4, 3, 2]
numbers2 = [1, 2, 3, 999]
numbers3 = [5, 2, -7]

# Print averages here

`,
    solution: `# Define the average function
def average(numbers):
    total = 0
    for num in numbers:
        total += num
    return total / len(numbers)

# Test the function
numbers1 = [1, 4, 3, 2]
numbers2 = [1, 2, 3, 999]
numbers3 = [5, 2, -7]

print(f"Average of {numbers1}: {average(numbers1)}")
print(f"Average of {numbers2}: {average(numbers2)}")
print(f"Average of {numbers3}: {average(numbers3)}")`,
    hints: [
      `The average is the sum of all numbers divided by how many numbers there are.`,
      `Use def average(numbers): to define the function. Inside, sum up all the numbers and divide by len(numbers).`,
      `You can use a loop to calculate the sum, or use the built-in sum() function: return sum(numbers) / len(numbers)`,
    ],
  },
  {
    id: 'exercise6',
    title: 'Combining Functions',
    description: `Write a function called lengths that takes a list of strings and returns a list of their lengths. For example, lengths(['Ed', 'Ted', 'Fred']) returns [2, 3, 4]. Then combine it with average and cleanedup to calculate the average word length in a sentence.`,
    difficulty: 'advanced',
    interactive: true,
    starter: `def cleanedup(s):
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    cleantext = ''
    for character in s.lower():
        if character in alphabet:
            cleantext += character
        else:
            cleantext += ' '
    return cleantext

def average(numbers):
    return sum(numbers) / len(numbers)

# Define the lengths function here
# It should take a list of strings and return a list of their lengths

# Test with sentences
sentences = [
    "The quick brown fox",
    "I am here",
    "Supercalifragilisticexpialidocious is a long word"
]

# Calculate and print average word length for each sentence

`,
    solution: `def cleanedup(s):
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    cleantext = ''
    for character in s.lower():
        if character in alphabet:
            cleantext += character
        else:
            cleantext += ' '
    return cleantext

def average(numbers):
    return sum(numbers) / len(numbers)

def lengths(words):
    result = []
    for word in words:
        result.append(len(word))
    return result

# Test with sentences
sentences = [
    "The quick brown fox",
    "I am here",
    "Supercalifragilisticexpialidocious is a long word"
]

for sentence in sentences:
    words = cleanedup(sentence).split()
    avg = average(lengths(words))
    print(f"Sentence: '{sentence}'")
    print(f"  Words: {words}")
    print(f"  Lengths: {lengths(words)}")
    print(f"  Average word length: {avg}")
    print()`,
    hints: [
      `The lengths function should loop through each word and append len(word) to a result list.`,
      `Start with result = [], then for each word: result.append(len(word)), and finally return result.`,
      `To get average word length: first get words with cleanedup(sentence).split(), then pass to lengths(), then pass that result to average().`,
    ],
  },
];

// ============================================================================
// COMPONENT EXPORT
// ============================================================================

export default function CSCI133Unit3_s26() {
  return (
    <InteractiveUnitTemplate
      unitTitle="Unit 3: Dictionaries and Functions"
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