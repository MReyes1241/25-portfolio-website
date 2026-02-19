import InteractiveUnitTemplate, {
  type OverviewData,
  type LessonData,
  type ExerciseData,
} from '../interactiveUnitTemplate';

// ============================================================================
// UNIT 4: LEARN SOMETHING NEW
// Modules and Simulations
// ============================================================================

const overview: OverviewData = {
  intro: `In this unit, you will learn how to organize reusable code into modules and use Python's built-in modules like random. You will also learn to build simulations that can answer complex probability questions through experimentation.`,
  heroImage: {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800',
    alt: 'Dice representing randomness and probability',
    caption: 'Simulations help us explore probability through experimentation',
  },
  objectives: [
    'Create your own modules to organize reusable functions',
    'Import and use modules with the import statement',
    'Use the random module for random selection and shuffling',
    'Use range() to repeat code a specific number of times',
    'Convert generators to lists with list()',
    'Access list items by index position',
    'Build simulations to answer probability questions',
    'Run experiments at scale to discover patterns',
  ],
  prerequisites: [
    'Completion of Unit 3 (dictionaries, functions, while loops)',
    'Ability to define functions with parameters and return values',
    'Familiarity with for loops and conditionals',
  ],
  whyTitle: 'Why Learn Modules and Simulations?',
  whyBullets: [
    'Modules let you organize and share code efficiently',
    'Simulations can answer questions that are hard to solve mathematically',
    'Random number generation is essential for games, testing, and data science',
  ],
  progress: [
    { title: 'Creating Modules', description: 'Organizing reusable code' },
    { title: 'Built-in Modules', description: 'The random module' },
    { title: 'Simulations with range()', description: 'The coin flip game' },
    { title: 'List Indexing', description: 'Accessing items by position' },
    { title: 'Experiments at Scale', description: 'Discovering probability patterns' },
  ],
};

// ============================================================================
// LESSONS
// ============================================================================

const lessons: LessonData[] = [
  // --------------------------------------------------------------------------
  // PART 1: Creating and Using Modules
  // --------------------------------------------------------------------------
  {
    id: 'part1',
    title: 'Part 1: Creating and Using Modules',
    summary: 'Organizing reusable code with import',
    content: [
      {
        type: 'media',
        data: {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700',
          alt: 'Organized toolbox',
          caption: 'Modules are like toolboxes that organize your reusable code',
        },
      },
      {
        type: 'paragraph',
        content: `Once we have developed useful functions like average and cleanedup (from Unit 3), we naturally want to reuse them. So far we have been copying and pasting function definitions into each new program file. But since this kind of reuse is so common and important, Python provides a much better method: modules.`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'What is a Module?',
      },
      {
        type: 'paragraph',
        content: `A module is a Python file containing functions meant to be used by other programs. To use a module, we employ an import statement. This executes the instructions in the module and makes available any names assigned by those instructions, typically function names.`,
      },
      {
        type: 'code',
        data: {
          code: `# Imagine we have a file called my.py containing:
# def cleanedup(s): ...
# def average(numbers): ...

# In another file, we would write:
# import my
# print(my.average([1, 2, 3, 4]))
# print(my.cleanedup('This--WOW--is ready!'))

# For this demo, let's define the functions directly:
def cleanedup(s):
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    cleantext = ''
    for character in s.lower():
        if character in alphabet:
            cleantext += character
        else:
            cleantext += ' '
    return cleantext

def average(numbers):
    total = 0
    for number in numbers:
        total += number
    return total / len(numbers)

# Now we can use them:
print(average([1, 2, 3, 4]))
print(cleanedup('This--WOW--is ready!'))`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Two Essential Rules',
      },
      {
        type: 'callout',
        title: 'Module Import Rules',
        content: `1. In the import statement, do not use the .py extension.\n   Write import my, not import my.py\n\n2. When using a name from a module, prefix it with the module name and a dot.\n   Write my.average, not just average`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'Why Modules Matter',
      },
      {
        type: 'paragraph',
        content: `As you continue programming, you can add new functions to your module, making it a handy collection of useful tools. Then you can get access to the whole collection in any new program with just one line: import my.`,
      },
      {
        type: 'info',
        items: [
          `No more copy-pasting function definitions`,
          `Keep related functions organized together`,
          `Easy to share code with others`,
          `One change to the module updates all programs that use it`,
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PART 2: Built-in Modules
  // --------------------------------------------------------------------------
  {
    id: 'part2',
    title: 'Part 2: Built-in Modules',
    summary: 'Using the random module',
    content: [
      {
        type: 'media',
        data: {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1596451190630-186aff535bf2?w=700',
          alt: 'Colorful dice',
          caption: 'The random module brings randomness to your programs',
        },
      },
      {
        type: 'paragraph',
        content: `The really good news is that we can get prepackaged code as easily as we can share ours. Python comes with a huge number of handy modules already built in. Let us explore the random module.`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'The random Module',
      },
      {
        type: 'code',
        data: {
          code: `import random

colors = ['red', 'blue', 'green', 'yellow', 'orange']

# Randomly select one item
print(f"Random color: {random.choice(colors)}")

# Shuffle the list (modifies it in place)
random.shuffle(colors)
print(f"Shuffled: {colors}")`,
          interactive: true,
        },
      },
      {
        type: 'paragraph',
        content: `If you run this program several times, you will get a different output each time: one of the five colors chosen at random, and then a list of all five in a random order.`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'More random Functions',
      },
      {
        type: 'code',
        data: {
          code: `import random

# Random integer between 1 and 10 (inclusive)
print(f"Random int 1-10: {random.randint(1, 10)}")

# Random decimal between 0 and 1
print(f"Random float: {random.random()}")

# Random item from a range (0, 5, 10, 15, ... 95)
print(f"Random from range: {random.randrange(0, 100, 5)}")`,
          interactive: true,
        },
      },
      {
        type: 'callout',
        title: 'The random Module Functions',
        content: `- random.choice(collection) - Randomly selects and returns one item\n- random.shuffle(list) - Rearranges a list into random order (modifies in place)\n- random.randint(a, b) - Random integer from a to b (inclusive)\n- random.random() - Random decimal between 0 and 1`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'Python\'s Standard Library',
      },
      {
        type: 'paragraph',
        content: `Python includes hundreds of built-in modules in what is called the "standard library." Some popular ones include: random (random number generation), math (mathematical functions), datetime (working with dates and times), and os (operating system interactions). We will use random extensively in this unit to build simulations.`,
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PART 3: Simulations with range()
  // --------------------------------------------------------------------------
  {
    id: 'part3',
    title: 'Part 3: Simulations with range()',
    summary: 'The coin flip game and running experiments',
    content: [
      {
        type: 'media',
        data: {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?w=700',
          alt: 'Coin flip',
          caption: 'Simulations can answer probability questions through experimentation',
        },
      },
      {
        type: 'paragraph',
        content: `We can use our new knowledge to answer some interesting questions through simulation. Let us explore a betting game.`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'The Coin Flip Game',
      },
      {
        type: 'paragraph',
        content: `You start with $10 and flip a coin over and over. Each time it comes up heads, you win a dollar; each time it comes up tails, you lose a dollar. You keep playing until either you lose all your money or double your initial bankroll (ending up with $20). Question: On average, how many flips will this game take?`,
      },
      {
        type: 'code',
        data: {
          code: `import random

def one_game(initial):
    count_flips = 0
    bankroll = initial
    while 0 < bankroll < 2 * initial:
        flip = random.choice(['heads', 'tails'])
        count_flips += 1
        if flip == 'heads':
            bankroll += 1
        else:
            bankroll -= 1
    return count_flips

# Play a few games
print(f"Game 1: {one_game(10)} flips")
print(f"Game 2: {one_game(10)} flips")
print(f"Game 3: {one_game(10)} flips")`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'The range() Function',
      },
      {
        type: 'paragraph',
        content: `We want to call one_game 1,000 times. Writing for number in [1, 2, 3, ..., 1000]: would be tedious. Python provides an easier way with range().`,
      },
      {
        type: 'code',
        data: {
          code: `# range(n) produces the numbers 0, 1, 2, ..., n-1
for i in range(5):
    print(i)

print("---")
print("The loop ran 5 times!")`,
          interactive: true,
        },
      },
      {
        type: 'info',
        items: [`range(n) produces n numbers starting from 0. Even though it starts at 0, the loop still runs exactly n times, which is what we usually care about.`],
      },
      {
        type: 'heading',
        level: 2,
        content: 'Running Many Games',
      },
      {
        type: 'code',
        data: {
          code: `import random

def one_game(initial):
    count_flips = 0
    bankroll = initial
    while 0 < bankroll < 2 * initial:
        flip = random.choice(['heads', 'tails'])
        count_flips += 1
        if flip == 'heads':
            bankroll += 1
        else:
            bankroll -= 1
    return count_flips

# Run 1000 games and find the average
total_flips = 0
for i in range(1000):
    total_flips += one_game(10)

print(f"Average number of flips: {total_flips / 1000}")`,
          interactive: true,
        },
      },
      {
        type: 'callout',
        title: 'Result',
        content: `It takes about 100 flips on average to go broke or double your money when starting with $10! This is a surprising result that would be difficult to calculate mathematically, but easy to discover through simulation.`,
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PART 4: List Indexing and More Simulations
  // --------------------------------------------------------------------------
  {
    id: 'part4',
    title: 'Part 4: List Indexing and More Simulations',
    summary: 'Accessing items by position',
    content: [
      {
        type: 'media',
        data: {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=700',
          alt: 'Numbered items',
          caption: 'List indexing lets you access items by their position',
        },
      },
      {
        type: 'paragraph',
        content: `Here is another interesting probability question: A teacher collects exam papers from a class of students and then gives them back out at random, so students can grade each other's work. Question: What is the chance that at least one student will end up grading their own paper?`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'The list() Function',
      },
      {
        type: 'paragraph',
        content: `Remember that range() does not actually create a list. It is a generator that produces values one at a time to save memory. But sometimes we actually need a real list. The list() function converts things into lists:`,
      },
      {
        type: 'code',
        data: {
          code: `# Convert range to a list
print(list(range(5)))

# Convert a string to a list of characters
print(list('hello'))`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'List Indexing',
      },
      {
        type: 'paragraph',
        content: `Just like dictionaries use keys to access values, lists use indices (positions) to access items. The first position is 0, the next is 1, and so on.`,
      },
      {
        type: 'code',
        data: {
          code: `colors = ['red', 'green', 'blue', 'yellow']

print(f"colors[0]: {colors[0]}")  # First item
print(f"colors[1]: {colors[1]}")  # Second item
print(f"colors[3]: {colors[3]}")  # Fourth item`,
          interactive: true,
        },
      },
      {
        type: 'warning',
        items: [`Remember: indices start at 0! colors[0] is the 1st item, colors[1] is the 2nd item, and colors[n] is the (n+1)th item.`],
      },
      {
        type: 'heading',
        level: 2,
        content: 'The Paper Distribution Simulation',
      },
      {
        type: 'code',
        data: {
          code: `import random

def paper_status(class_size):
    # Create papers numbered 0 to class_size-1
    papers = list(range(class_size))
    # Shuffle the papers randomly
    random.shuffle(papers)
    # Check if any student got their own paper
    for student in range(class_size):
        if papers[student] == student:
            return 'warning'  # Someone got their own paper!
    return 'okay'

# Test a few times with 30 students
print(paper_status(30))
print(paper_status(30))
print(paper_status(30))`,
          interactive: true,
        },
      },
      {
        type: 'callout',
        title: 'How It Works',
        content: `1. papers = list(range(30)) creates [0, 1, 2, ..., 29]\n2. random.shuffle(papers) randomizes the order\n3. We check if papers[student] == student for any student\n4. If Student 3 gets Paper 3, they got their own paper!`,
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PART 5: Running Experiments at Scale
  // --------------------------------------------------------------------------
  {
    id: 'part5',
    title: 'Part 5: Running Experiments at Scale',
    summary: 'Discovering probability patterns',
    content: [
      {
        type: 'media',
        data: {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700',
          alt: 'Data visualization',
          caption: 'Running many experiments reveals surprising patterns',
        },
      },
      {
        type: 'paragraph',
        content: `Our paper_status function gives papers out once and returns 'warning' if any student gets their own paper. Now let us run many experiments to find out how often this happens.`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'The Complete Experiment',
      },
      {
        type: 'code',
        data: {
          code: `import random

def paper_status(class_size):
    papers = list(range(class_size))
    random.shuffle(papers)
    for student in range(class_size):
        if papers[student] == student:
            return 'warning'
    return 'okay'

def experiment(class_sizes, repetitions):
    for class_size in class_sizes:
        print(f"Class size: {class_size}")
        warnings = 0
        for i in range(repetitions):
            if paper_status(class_size) == 'warning':
                warnings += 1
        print(f"Warnings: {warnings} out of {repetitions}")
        print()

experiment([30, 100, 300], 500)`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Surprising Result!',
      },
      {
        type: 'paragraph',
        content: `You might expect that with more students, there is a higher chance someone gets their own paper. But look at the results: the probability stays almost exactly the same regardless of class size!`,
      },
      {
        type: 'callout',
        title: 'Mathematical Fact',
        content: `Whether you have 30 students or 3,000, there is about a 63% chance that at least one student will get their own paper. This is a famous result in probability theory. The exact probability approaches 1 - 1/e (approximately 0.632) as class size increases, where e is Euler's number (approximately 2.718).`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'The Power of Simulation',
      },
      {
        type: 'paragraph',
        content: `We just discovered a mathematical fact that took mathematicians centuries to prove, but we found it in minutes by running experiments! This is the power of simulation: even without advanced math, we can explore complex questions and discover surprising patterns.`,
      },
      {
        type: 'info',
        items: [
          `Modules: Package reusable code with import`,
          `random module: choice(), shuffle(), randint()`,
          `range(): Generate sequences of numbers for loops`,
          `list(): Convert generators or strings to actual lists`,
          `List indexing: Access items by position with list[index]`,
          `Simulations: Run many trials to discover patterns`,
        ],
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
    title: 'Print Fred 100 Times',
    description: `Write a program that prints the name "Fred" 100 times, one time per line. Use the range() function.`,
    difficulty: 'beginner',
    interactive: true,
    starter: `# Print "Fred" 100 times using range()
# Your code here

`,
    solution: `# Print "Fred" 100 times using range()
for i in range(100):
    print("Fred")

print("\\n(Printed Fred 100 times)")`,
    hints: [
      `Use range(100) to repeat something 100 times.`,
      `The pattern is: for i in range(100): followed by an indented print statement.`,
      `The variable i is not used inside the loop, but it still counts 100 iterations (0 through 99).`,
    ],
  },
  {
    id: 'exercise2',
    title: 'Word Scramble Functions',
    description: `Write three functions for a word scramble game:\n1. rejoin(chars) - takes a list of characters and returns them as a single string\n2. scramble(word) - takes a string and returns it with letters in random order\n\nTest both functions to make sure they work.`,
    difficulty: 'intermediate',
    interactive: true,
    starter: `import random

# Write the rejoin function
# It should take a list like ['c', 'a', 't'] and return 'cat'

# Write the scramble function
# It should take a word like 'treasure' and return the letters in random order

# Test your functions
# print(rejoin(['c', 'a', 't']))  # Should print: cat
# print(scramble('treasure'))     # Should print something like: ueraerts

`,
    solution: `import random

def rejoin(chars):
    result = ''
    for char in chars:
        result += char
    return result

def scramble(word):
    letters = list(word)
    random.shuffle(letters)
    return rejoin(letters)

# Test the functions
print(f"rejoin(['c', 'a', 't']): {rejoin(['c', 'a', 't'])}")
print(f"scramble('treasure'): {scramble('treasure')}")
print(f"scramble('treasure'): {scramble('treasure')}")
print(f"scramble('pirate'): {scramble('pirate')}")`,
    hints: [
      `For rejoin: start with an empty string and add each character using +=`,
      `For scramble: convert the word to a list of letters with list(word), shuffle it with random.shuffle(), then rejoin it.`,
      `Remember that random.shuffle() modifies the list in place and returns None, so call it on a separate line before rejoining.`,
    ],
  },
  {
    id: 'exercise3',
    title: 'Organize Words by Length',
    description: `Create a dictionary where keys are word lengths (3, 4, 5, etc.) and values are lists of words with that length. Use the sample text provided. Then write code to pick a random word of a specific length.`,
    difficulty: 'intermediate',
    interactive: true,
    starter: `import random

def cleanedup(s):
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    cleantext = ''
    for character in s.lower():
        if character in alphabet:
            cleantext += character
        else:
            cleantext += ' '
    return cleantext

text = """The pirates discovered treasure on the island.
They found gold coins and silver bars hidden in a cave.
The captain marked the location on his secret map."""

# Create a dictionary where keys are word lengths
# and values are lists of words with that length
# Example: wordlists[4] should contain all 4-letter words

# Your code here

`,
    solution: `import random

def cleanedup(s):
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    cleantext = ''
    for character in s.lower():
        if character in alphabet:
            cleantext += character
        else:
            cleantext += ' '
    return cleantext

text = """The pirates discovered treasure on the island.
They found gold coins and silver bars hidden in a cave.
The captain marked the location on his secret map."""

# Build the dictionary
wordlists = {}
for line in text.split('\\n'):
    for word in cleanedup(line).split():
        length = len(word)
        if length in wordlists:
            if word not in wordlists[length]:  # Avoid duplicates
                wordlists[length].append(word)
        else:
            wordlists[length] = [word]

# Display the results
for length in sorted(wordlists.keys()):
    print(f"{length}-letter words: {wordlists[length]}")

# Pick a random 4-letter word
print(f"\\nRandom 4-letter word: {random.choice(wordlists[4])}")`,
    hints: [
      `Use len(word) to get the length of each word. This becomes the key in your dictionary.`,
      `The pattern is similar to building a concordance: check if the key exists, if so append, if not create a new list.`,
      `To pick a random word of length n: random.choice(wordlists[n])`,
    ],
  },
  {
    id: 'exercise4',
    title: 'Deal a Hand of Cards',
    description: `Write a function shuffled_deck() that creates and returns a shuffled deck of 52 cards. Each card should be a string like "ace of spades" or "7 of hearts". Then deal a hand of 5 cards.`,
    difficulty: 'intermediate',
    interactive: true,
    starter: `import random

# A standard deck has:
# - 13 face values: ace, 2, 3, 4, 5, 6, 7, 8, 9, 10, jack, queen, king
# - 4 suits: clubs, diamonds, hearts, spades

# Write the shuffled_deck function
# It should return a shuffled list of 52 cards

# Your code here

# Deal and display 5 cards

`,
    solution: `import random

def shuffled_deck():
    faces = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king']
    suits = ['clubs', 'diamonds', 'hearts', 'spades']
    
    deck = []
    for suit in suits:
        for face in faces:
            deck.append(f"{face} of {suit}")
    
    random.shuffle(deck)
    return deck

# Deal a hand of 5 cards
deck = shuffled_deck()
hand = deck[:5]  # Take the first 5 cards

print("Your hand:")
for card in hand:
    print(f"  {card}")`,
    hints: [
      `Create two lists: one for face values (ace through king) and one for suits (clubs, diamonds, hearts, spades).`,
      `Use nested loops to create all 52 combinations: for suit in suits: for face in faces: deck.append(...)`,
      `After building the deck, shuffle it with random.shuffle(deck), then return it.`,
    ],
  },
  {
    id: 'exercise5',
    title: 'Count Aces and Clubs',
    description: `Add two helper functions to your card program:\n- face_value_of(card) - returns the face value (e.g., "queen" from "queen of diamonds")\n- suit_of(card) - returns the suit (e.g., "diamonds" from "queen of diamonds")\n\nThen count how many aces and how many clubs are in a hand of 5 cards.`,
    difficulty: 'intermediate',
    interactive: true,
    starter: `import random

def shuffled_deck():
    faces = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king']
    suits = ['clubs', 'diamonds', 'hearts', 'spades']
    deck = []
    for suit in suits:
        for face in faces:
            deck.append(f"{face} of {suit}")
    random.shuffle(deck)
    return deck

# Write face_value_of(card) function
# Example: face_value_of("queen of diamonds") returns "queen"

# Write suit_of(card) function
# Example: suit_of("queen of diamonds") returns "diamonds"

# Your code here

# Deal a hand and count aces and clubs

`,
    solution: `import random

def shuffled_deck():
    faces = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king']
    suits = ['clubs', 'diamonds', 'hearts', 'spades']
    deck = []
    for suit in suits:
        for face in faces:
            deck.append(f"{face} of {suit}")
    random.shuffle(deck)
    return deck

def face_value_of(card):
    parts = card.split()
    return parts[0]

def suit_of(card):
    parts = card.split()
    return parts[2]

# Deal a hand
deck = shuffled_deck()
hand = deck[:5]

# Count aces and clubs
ace_count = 0
club_count = 0

print("Your hand:")
for card in hand:
    print(f"  {card}")
    if face_value_of(card) == 'ace':
        ace_count += 1
    if suit_of(card) == 'clubs':
        club_count += 1

print(f"\\nAces in hand: {ace_count}")
print(f"Clubs in hand: {club_count}")`,
    hints: [
      `A card like "queen of diamonds" can be split into ["queen", "of", "diamonds"] using split().`,
      `face_value_of returns the first part (index 0), suit_of returns the last part (index 2).`,
      `Loop through the hand and use your helper functions to check each card, incrementing counters as needed.`,
    ],
  },
  {
    id: 'exercise6',
    title: 'Coin Flip Experiment',
    description: `Write an experiment function that tests the coin flip game with different starting bankrolls. The function should take a list of starting amounts and the number of games to run for each, then report the average number of flips for each starting amount.`,
    difficulty: 'advanced',
    interactive: true,
    starter: `import random

def one_game(initial):
    count_flips = 0
    bankroll = initial
    while 0 < bankroll < 2 * initial:
        flip = random.choice(['heads', 'tails'])
        count_flips += 1
        if flip == 'heads':
            bankroll += 1
        else:
            bankroll -= 1
    return count_flips

# Write an experiment function that:
# - Takes a list of initial bankrolls and number of repetitions
# - For each initial amount, runs the game many times
# - Reports the average number of flips

# Your code here

# Test with starting amounts of $5, $10, and $20, running 500 games each

`,
    solution: `import random

def one_game(initial):
    count_flips = 0
    bankroll = initial
    while 0 < bankroll < 2 * initial:
        flip = random.choice(['heads', 'tails'])
        count_flips += 1
        if flip == 'heads':
            bankroll += 1
        else:
            bankroll -= 1
    return count_flips

def experiment(initials, repetitions):
    for initial in initials:
        print(f"Starting bankroll: \${initial}")
        total_flips = 0
        for i in range(repetitions):
            total_flips += one_game(initial)
        average = total_flips / repetitions
        print(f"Average flips to finish: {average:.1f}")
        print()

# Run the experiment
experiment([5, 10, 20], 500)`,
    hints: [
      `The experiment function needs two nested loops: outer loop for each initial amount, inner loop to run many games.`,
      `Inside the inner loop, call one_game(initial) and add the result to a running total.`,
      `After the inner loop, calculate the average by dividing the total by the number of repetitions.`,
    ],
  },
];

// ============================================================================
// COMPONENT EXPORT
// ============================================================================

export default function CSCI133Unit4_s26() {
  return (
    <InteractiveUnitTemplate
      unitTitle="Unit 4: Modules and Simulations"
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