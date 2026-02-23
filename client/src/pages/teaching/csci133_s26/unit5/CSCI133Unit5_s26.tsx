import InteractiveUnitTemplate, {
  type OverviewData,
  type LessonData,
  type ExerciseData,
} from '../interactiveUnitTemplate';

// ============================================================================
// UNIT 5: LEARN SOMETHING NEW
// The os Module and Recursion
// ============================================================================

const overview: OverviewData = {
  intro: `In this unit, you will learn how to work with files and folders using Python's os module, and discover recursion - one of the most powerful concepts in programming. You will also master string indexing and slicing to manipulate text precisely.`,
  heroImage: {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1544396821-4dd40b938ad3?w=800',
    alt: 'Folder structure representing file system navigation',
    caption: 'Navigate and process entire folder hierarchies with Python',
  },
  objectives: [
    'Use the os module to list files and folders',
    'Understand file paths and special shortcuts (. and ..)',
    'Distinguish between files and directories with os.path.isdir()',
    'Build paths that work on any operating system with os.path.join()',
    'Create recursive functions that call themselves',
    'Add indentation to show nested structure',
    'Access individual characters with string indexing',
    'Extract portions of strings with slicing',
  ],
  prerequisites: [
    'Completion of Unit 4 (modules, random, range, simulations)',
    'Ability to define and call functions',
    'Familiarity with for loops and conditionals',
  ],
  whyTitle: 'Why Learn the os Module and Recursion?',
  whyBullets: [
    'File system navigation is essential for processing real-world data',
    'Recursion elegantly solves problems with nested structure',
    'String manipulation is fundamental to text processing',
  ],
  progress: [
    { title: 'The os Module', description: 'Listing files and folders' },
    { title: 'Files vs Folders', description: 'isdir() and path.join()' },
    { title: 'Reusable Functions', description: 'Creating a lister function' },
    { title: 'Recursion', description: 'Functions that call themselves' },
    { title: 'Indentation', description: 'Visualizing nested structure' },
    { title: 'String Indexing', description: 'Accessing characters by position' },
    { title: 'String Slicing', description: 'Extracting portions of strings' },
  ],
};

// ============================================================================
// LESSONS
// ============================================================================

const lessons: LessonData[] = [
  // --------------------------------------------------------------------------
  // PART 1: Introduction to the os Module
  // --------------------------------------------------------------------------
  {
    id: 'part1',
    title: 'Part 1: Introduction to the os Module',
    summary: 'Working with files and folders',
    content: [
      {
        type: 'media',
        data: {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=700',
          alt: 'Organized folders',
          caption: 'Files on a computer are organized into folders (directories)',
        },
      },
      {
        type: 'paragraph',
        content: `Files on a computer are organized into folders (also called directories). Understanding how to work with files and folders programmatically is an essential skill.`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'What is a Path?',
      },
      {
        type: 'paragraph',
        content: `A path is a string that specifies the location of a file or folder. Paths look different on different operating systems: Windows uses backslashes (C:\\Projects\\Python) while Mac/Linux use forward slashes (/Projects/Python).`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'The os Module',
      },
      {
        type: 'paragraph',
        content: `Python's os module lets us interact with the operating system, including working with files and folders. The os.listdir(path) function returns a list of all items at a location.`,
      },
      {
        type: 'code',
        data: {
          code: `# Note: os.listdir() requires a real file system
# In IDLE, this would list files in the current folder:
# import os
# for filename in os.listdir('.'):
#     print(filename)

# For demonstration, let's simulate a file listing:
simulated_files = ['cards.py', 'my_program.py', 'treasure_island.txt', 'Unit4', 'Unit5']

print("Simulated directory listing:")
for filename in simulated_files:
    print(f"  {filename}")`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Special Path Shortcuts',
      },
      {
        type: 'callout',
        title: 'Path Shortcuts',
        content: `- '.' (single dot) - The current directory (where your Python program is located)\n- '..' (two dots) - The parent directory (the folder containing the current folder)\n- '../..' - The parent of the parent directory`,
      },
      {
        type: 'code',
        data: {
          code: `# Path shortcuts explained
current = '.'      # Current directory
parent = '..'      # Parent directory
grandparent = '../..'  # Two levels up

print(f"Current directory: {current}")
print(f"Parent directory: {parent}")
print(f"Grandparent directory: {grandparent}")

# In a real file system:
# os.listdir('.')  - Lists files in current folder
# os.listdir('..') - Lists files in parent folder`,
          interactive: true,
        },
      },
      {
        type: 'info',
        items: [
          `import os - Load the operating system module`,
          `os.listdir(path) - Get a list of items at the given path`,
          `'.' - Current directory`,
          `'..' - Parent directory`,
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PART 2: Distinguishing Files from Folders
  // --------------------------------------------------------------------------
  {
    id: 'part2',
    title: 'Part 2: Distinguishing Files from Folders',
    summary: 'Using isdir() and path.join()',
    content: [
      {
        type: 'media',
        data: {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=700',
          alt: 'Files and folders',
          caption: 'The os module helps distinguish files from folders',
        },
      },
      {
        type: 'paragraph',
        content: `The output from os.listdir() does not tell us which items are files and which are folders. It would be helpful to flag directories in our listing so they stand out from regular files.`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'Checking if Something is a Directory',
      },
      {
        type: 'paragraph',
        content: `The function os.path.isdir() takes a path and returns True if it is a directory, False otherwise.`,
      },
      {
        type: 'code',
        data: {
          code: `# Simulating os.path.isdir() behavior
# In real code: os.path.isdir('Unit5') returns True for folders

def simulated_isdir(name):
    """Simulate checking if something is a directory"""
    directories = ['Unit4', 'Unit5', 'Documents', 'Python']
    return name in directories

# Test the function
items = ['cards.py', 'Unit4', 'treasure_island.txt', 'Unit5']

for item in items:
    if simulated_isdir(item):
        print(f"*** {item}")  # Mark directories with stars
    else:
        print(item)`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Building Paths with os.path.join()',
      },
      {
        type: 'paragraph',
        content: `Different operating systems use different separators in paths. The os.path.join() function builds paths correctly for any system:`,
      },
      {
        type: 'code',
        data: {
          code: `# os.path.join() creates paths that work on any OS
# On Windows: os.path.join('..', 'Unit4') gives '..\\\\Unit4'
# On Mac/Linux: os.path.join('..', 'Unit4') gives '../Unit4'

# Simulating path joining
def join_path(*parts):
    """Simulate os.path.join (using forward slashes)"""
    return '/'.join(parts)

# Examples
path1 = join_path('..', 'Unit4')
path2 = join_path('Projects', 'Python', 'Unit5')

print(f"Path 1: {path1}")
print(f"Path 2: {path2}")`,
          interactive: true,
        },
      },
      {
        type: 'callout',
        title: 'Why Use os.path.join()?',
        content: `Using os.path.join() instead of string concatenation makes your code work on any operating system. It automatically uses the correct separator (backslash on Windows, forward slash on Mac/Linux).`,
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PART 3: Creating a Reusable Lister Function
  // --------------------------------------------------------------------------
  {
    id: 'part3',
    title: 'Part 3: Creating a Reusable Lister Function',
    summary: 'Organizing code into functions',
    content: [
      {
        type: 'media',
        data: {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700',
          alt: 'Building blocks',
          caption: 'Functions make code reusable and easier to maintain',
        },
      },
      {
        type: 'paragraph',
        content: `For reasons that will become clear soon, it will be handy to put our file listing code into a function. This allows us to call it multiple times with different paths.`,
      },
      {
        type: 'code',
        data: {
          code: `# Simulating a lister function
def lister(path, files_dict):
    """List items at a path, flagging directories with stars"""
    print(f"Listing: {path}")
    for filename in files_dict.get(path, []):
        if filename.endswith('/'):  # Convention: folders end with /
            print(f"  *** {filename[:-1]}")
        else:
            print(f"  {filename}")
    print()

# Simulated file system
file_system = {
    '.': ['cards.py', 'my_program.py', 'treasure_island.txt'],
    '..': ['Unit4/', 'Unit5/', 'notes.txt'],
}

# Call the function for different paths
lister('.', file_system)
lister('..', file_system)`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Benefits of Using a Function',
      },
      {
        type: 'callout',
        title: 'Why Put Code in Functions?',
        content: `- Reusability: Call the same code with different inputs\n- Readability: lister('.') is clearer than 5 lines of loop code\n- Maintainability: Fix a bug once, and it is fixed everywhere\n- Composition: Functions can call other functions (coming up next!)`,
      },
      {
        type: 'paragraph',
        content: `By making path a parameter, our function can list any directory. This function is about to become much more powerful. In the next part, we will add a single line that transforms it into something remarkable: a function that can list entire folder hierarchies automatically!`,
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PART 4: Recursion
  // --------------------------------------------------------------------------
  {
    id: 'part4',
    title: 'Part 4: Recursion',
    summary: 'Functions that call themselves',
    content: [
      {
        type: 'media',
        data: {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=700',
          alt: 'Mirrors reflecting infinitely',
          caption: 'Recursion is like mirrors reflecting mirrors - a function calling itself',
        },
      },
      {
        type: 'paragraph',
        content: `Now here is a big payoff. When we encounter a directory, it would be even better to show the files it contains. A function that calls itself is called a recursive function. This is one of the most powerful concepts in programming!`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'A Simple Recursive Example',
      },
      {
        type: 'code',
        data: {
          code: `def countdown(n):
    """Count down from n to 1, then say Liftoff!"""
    if n <= 0:
        print("Liftoff!")
    else:
        print(n)
        countdown(n - 1)  # Function calls itself!

countdown(5)`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Recursive Directory Listing',
      },
      {
        type: 'code',
        data: {
          code: `# Simulating recursive directory listing
file_system = {
    '..': ['Unit4/', 'Unit5/', 'notes.txt'],
    '../Unit4': ['test4.py', 'cards.py'],
    '../Unit5': ['my_program.py', 'treasure_island.txt'],
}

def lister(path, indent=''):
    """Recursively list directory contents"""
    for item in file_system.get(path, []):
        if item.endswith('/'):  # It's a directory
            dirname = item[:-1]
            print(f"{indent}*** {dirname}")
            # Recursive call to list subdirectory contents
            newpath = f"{path}/{dirname}"
            lister(newpath, indent + '    ')
        else:
            print(f"{indent}{item}")

print("Recursive listing of parent directory:")
lister('..')`,
          interactive: true,
        },
      },
      {
        type: 'callout',
        title: 'How Recursion Works',
        content: `When we encounter a directory:\n1. We print it flagged with stars\n2. We call lister(newpath) to list its contents\n3. That call might find more directories and call lister again\n4. The function keeps calling itself as deep as the folder structure goes`,
      },
      {
        type: 'info',
        items: [`Recursion is perfect for problems that have a self-similar structure - where the solution involves solving smaller versions of the same problem. A directory listing is exactly this: to list a directory, you list its files and then list each subdirectory (which is the same problem, just one level deeper).`],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PART 5: Adding Indentation for Clarity
  // --------------------------------------------------------------------------
  {
    id: 'part5',
    title: 'Part 5: Adding Indentation for Clarity',
    summary: 'Visualizing nested structure',
    content: [
      {
        type: 'media',
        data: {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=700',
          alt: 'Nested structure',
          caption: 'Indentation makes nested structure clear',
        },
      },
      {
        type: 'paragraph',
        content: `Our recursive lister works, but the output is hard to read. With indentation, it is immediately clear which files are inside which folders.`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'The Solution: Pass an Indent String',
      },
      {
        type: 'paragraph',
        content: `We add a second parameter to our function: a string of spaces to print before each filename. Each time we go one level deeper, we make this string a little longer.`,
      },
      {
        type: 'code',
        data: {
          code: `# Demonstrating indentation in recursive calls
def show_structure(items, indent=''):
    """Show nested structure with indentation"""
    for item in items:
        if isinstance(item, dict):
            # It's a folder with contents
            for folder_name, contents in item.items():
                print(f"{indent}*** {folder_name}")
                show_structure(contents, indent + '    ')
        else:
            # It's a file
            print(f"{indent}{item}")

# Simulated nested folder structure
structure = [
    {'Python': [
        {'Unit4': ['test4.py', 'cards.py']},
        {'Unit5': ['my_program.py', 'treasure_island.txt']},
    ]},
    {'Documents': ['notes.txt']},
]

print("Nested folder structure:")
show_structure(structure)`,
          interactive: true,
        },
      },
      {
        type: 'callout',
        title: 'How Indentation Works',
        content: `- The initial call passes an empty string for indent\n- Each recursive call adds '    ' (4 spaces) to the indent\n- Deeper folders get more indentation automatically\n- The structure becomes crystal clear!`,
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PART 6: String Indexing
  // --------------------------------------------------------------------------
  {
    id: 'part6',
    title: 'Part 6: String Indexing',
    summary: 'Accessing characters by position',
    content: [
      {
        type: 'media',
        data: {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=700',
          alt: 'Letters in sequence',
          caption: 'String indexing lets you access individual characters',
        },
      },
      {
        type: 'paragraph',
        content: `Rather than displaying all files, we might want to select only certain ones. For example, suppose we want to list only Python program files, those ending in .py. To do this, we need to examine individual characters in a filename.`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'Positive Indices',
      },
      {
        type: 'code',
        data: {
          code: `filename = 'cards.py'

# Positive indices start at 0
#  c  a  r  d  s  .  p  y
#  0  1  2  3  4  5  6  7

print(f"filename[0]: '{filename[0]}'")  # 'c'
print(f"filename[1]: '{filename[1]}'")  # 'a'
print(f"filename[5]: '{filename[5]}'")  # '.'
print(f"filename[7]: '{filename[7]}'")  # 'y'`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Negative Indices',
      },
      {
        type: 'paragraph',
        content: `Python supports negative indices that count backward from the end. This makes it easy to access the last character without calculating the length.`,
      },
      {
        type: 'code',
        data: {
          code: `filename = 'cards.py'

# Negative indices count from the end
#  c   a   r   d   s   .   p   y
#  0   1   2   3   4   5   6   7
# -8  -7  -6  -5  -4  -3  -2  -1

print(f"filename[-1]: '{filename[-1]}'")  # 'y' (last)
print(f"filename[-2]: '{filename[-2]}'")  # 'p' (second-to-last)
print(f"filename[-3]: '{filename[-3]}'")  # '.' (third-to-last)`,
          interactive: true,
        },
      },
      {
        type: 'callout',
        title: 'Why Negative Indices?',
        content: `- [-1] always gives you the last character\n- [-2] always gives you the second-to-last\n- No need to calculate len(string) - 1`,
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PART 7: String Slicing
  // --------------------------------------------------------------------------
  {
    id: 'part7',
    title: 'Part 7: String Slicing',
    summary: 'Extracting portions of strings',
    content: [
      {
        type: 'media',
        data: {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1555617778-02518510b9fa?w=700',
          alt: 'Slicing',
          caption: 'Slicing extracts a section of a string all at once',
        },
      },
      {
        type: 'paragraph',
        content: `Rather than checking characters one at a time, Python provides a powerful mechanism called slicing that lets us extract a section of a string all at once.`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'Basic Slicing',
      },
      {
        type: 'code',
        data: {
          code: `filename = 'cards.py'

# A slice uses two indices: string[start:end]
# The end index is EXCLUSIVE (not included)

print(f"filename[0:5]: '{filename[0:5]}'")  # 'cards'
print(f"filename[5:8]: '{filename[5:8]}'")  # '.py'

# Shortcuts: omit start or end
print(f"filename[:5]: '{filename[:5]}'")    # 'cards' (same as [0:5])
print(f"filename[5:]: '{filename[5:]}'")    # '.py' (to the end)
print(f"filename[:]: '{filename[:]}'")      # 'cards.py' (entire string)`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Negative Indices in Slices',
      },
      {
        type: 'code',
        data: {
          code: `filename = 'cards.py'

# Negative indices work in slices too
print(f"filename[-3:]: '{filename[-3:]}'")   # '.py' (last 3 chars)
print(f"filename[:-3]: '{filename[:-3]}'")   # 'cards' (all but last 3)

# Checking file extensions
if filename[-3:] == '.py':
    print("It's a Python file!")
    
# Even cleaner with endswith()
if filename.endswith('.py'):
    print("Confirmed: Python file!")`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Filtering Files by Extension',
      },
      {
        type: 'code',
        data: {
          code: `# Filter to show only Python files
files = ['cards.py', 'notes.txt', 'my_program.py', 'data.csv', 'test.py']

print("Python files only:")
for filename in files:
    if filename[-3:] == '.py':
        print(f"  {filename}")`,
          interactive: true,
        },
      },
      {
        type: 'callout',
        title: 'Slicing Summary',
        content: `- s[start:end] - Characters from start to end-1\n- s[:n] - First n characters\n- s[n:] - Everything from index n to the end\n- s[-n:] - Last n characters\n- s[:-n] - Everything except the last n characters`,
      },
      {
        type: 'info',
        items: [
          `The endswith() method is even cleaner: filename.endswith('.py')`,
          `There is also startswith() for checking the beginning of strings`,
          `Slicing works on lists too: numbers[:3] gives the first 3 items`,
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
    title: 'Recursive Printing',
    description: `Write a program that prints the name "Fred" 100 times using recursion. Do NOT use for or while loops. Create a function called print_fred that takes a number and prints "Fred" that number of times by calling itself.`,
    difficulty: 'beginner',
    interactive: true,
    starter: `# Print "Fred" 100 times using RECURSION (no loops!)
# Create a function that prints Fred once, then calls itself with n-1

# Your code here

`,
    solution: `def print_fred(n):
    """Print Fred n times using recursion"""
    if n > 0:
        print("Fred")
        print_fred(n - 1)  # Recursive call with smaller n

# Print Fred 100 times
# (showing just a few for demonstration)
print("First 5 Freds:")
print_fred(5)

print("\\n(In IDLE, print_fred(100) would print 100 times)")`,
    hints: [
      `A recursive function needs two things: a base case (when to stop) and a recursive case (call itself with a smaller number).`,
      `The base case is when n reaches 0 - do nothing. The recursive case prints Fred and calls print_fred(n - 1).`,
      `Structure: if n > 0: print('Fred') then call print_fred(n - 1)`,
    ],
  },
  {
    id: 'exercise2',
    title: 'String Extension Checker',
    description: `Write a function called is_python_file that takes a filename and returns True if it ends with '.py', False otherwise. Use string slicing. Then test it with several filenames.`,
    difficulty: 'beginner',
    interactive: true,
    starter: `# Write a function that checks if a filename ends with .py
# Use string slicing: filename[-3:]

# Your code here

# Test with these files:
test_files = ['cards.py', 'notes.txt', 'program.py', 'data.csv', 'test.PY']

`,
    solution: `def is_python_file(filename):
    """Check if filename ends with .py"""
    return filename[-3:] == '.py'

# Test with these files:
test_files = ['cards.py', 'notes.txt', 'program.py', 'data.csv', 'test.PY']

print("Checking files:")
for filename in test_files:
    result = is_python_file(filename)
    print(f"  {filename}: {result}")

# Note: 'test.PY' returns False because .PY != .py
# For case-insensitive matching, use:
def is_python_file_v2(filename):
    return filename[-3:].lower() == '.py'

print("\\nCase-insensitive check:")
print(f"  test.PY: {is_python_file_v2('test.PY')}")`,
    hints: [
      `Use filename[-3:] to get the last 3 characters of the filename.`,
      `Compare with == '.py' to check if it matches.`,
      `Return the result of the comparison directly: return filename[-3:] == '.py'`,
    ],
  },
  {
    id: 'exercise3',
    title: 'Recursive Sum',
    description: `Write a recursive function called recursive_sum that takes a list of numbers and returns their sum. Do not use the built-in sum() function or any loops.`,
    difficulty: 'intermediate',
    interactive: true,
    starter: `# Write a recursive function to sum a list of numbers
# Base case: empty list returns 0
# Recursive case: first element + sum of the rest

# Your code here

# Test cases
print(recursive_sum([1, 2, 3, 4, 5]))  # Should print 15
print(recursive_sum([10, 20, 30]))     # Should print 60
print(recursive_sum([]))               # Should print 0

`,
    solution: `def recursive_sum(numbers):
    """Recursively sum a list of numbers"""
    if len(numbers) == 0:
        return 0  # Base case: empty list
    else:
        # First element + sum of the rest
        return numbers[0] + recursive_sum(numbers[1:])

# Test cases
print(f"Sum of [1, 2, 3, 4, 5]: {recursive_sum([1, 2, 3, 4, 5])}")
print(f"Sum of [10, 20, 30]: {recursive_sum([10, 20, 30])}")
print(f"Sum of []: {recursive_sum([])}")

# Trace through [1, 2, 3]:
# recursive_sum([1, 2, 3])
#   = 1 + recursive_sum([2, 3])
#   = 1 + (2 + recursive_sum([3]))
#   = 1 + (2 + (3 + recursive_sum([])))
#   = 1 + (2 + (3 + 0))
#   = 6`,
    hints: [
      `Base case: if the list is empty (len(numbers) == 0), return 0.`,
      `Recursive case: return the first element (numbers[0]) plus the sum of the rest (numbers[1:]).`,
      `numbers[1:] creates a new list with everything except the first element.`,
    ],
  },
  {
    id: 'exercise4',
    title: 'Anagram Finder',
    description: `Write a function called alphabetize that takes a word and returns its letters sorted alphabetically. Then use it to group words that are anagrams of each other (contain the same letters).`,
    difficulty: 'intermediate',
    interactive: true,
    starter: `# Write alphabetize(word) that returns sorted letters
# Example: alphabetize('race') returns 'acer'

# Your code here

# Test words
words = ['race', 'care', 'acre', 'listen', 'silent', 'hello']

# Group anagrams using a dictionary

`,
    solution: `def alphabetize(word):
    """Return the letters of a word in alphabetical order"""
    letters = list(word.lower())
    letters.sort()
    return ''.join(letters)

# Test the function
print("Testing alphabetize:")
print(f"  'race' -> '{alphabetize('race')}'")
print(f"  'care' -> '{alphabetize('care')}'")
print(f"  'listen' -> '{alphabetize('listen')}'")

# Group anagrams using a dictionary
words = ['race', 'care', 'acre', 'listen', 'silent', 'hello']

anagrams = {}
for word in words:
    key = alphabetize(word)
    if key in anagrams:
        anagrams[key].append(word)
    else:
        anagrams[key] = [word]

print("\\nAnagram groups:")
for key, word_list in anagrams.items():
    if len(word_list) > 1:
        print(f"  {word_list}")`,
    hints: [
      `To alphabetize: convert to list with list(word), sort with letters.sort(), join back with ''.join(letters).`,
      `Words that are anagrams will have the same alphabetized key (e.g., 'race' and 'care' both become 'acer').`,
      `Use a dictionary where keys are alphabetized strings and values are lists of words with that key.`,
    ],
  },
  {
    id: 'exercise5',
    title: 'Most Common Ending',
    description: `Write a program that finds the 5 most common words ending with 'ing' in a given text. Count occurrences, convert to a list of [count, word] pairs, sort, and get the top 5.`,
    difficulty: 'advanced',
    interactive: true,
    starter: `text = """
The sailing ship was carrying precious cargo.
The captain was thinking about the coming storm.
The crew was working hard, pulling ropes and checking sails.
Nothing was stopping them from reaching their destination.
They kept sailing through the night, hoping for calmer seas.
The morning brought clearing skies and singing birds.
"""

# Find the 5 most common words ending in 'ing'
# Steps:
# 1. Count all words ending in 'ing'
# 2. Convert dictionary to list of [count, word]
# 3. Sort the list
# 4. Get the last 5 (highest counts)

# Your code here

`,
    solution: `text = """
The sailing ship was carrying precious cargo.
The captain was thinking about the coming storm.
The crew was working hard, pulling ropes and checking sails.
Nothing was stopping them from reaching their destination.
They kept sailing through the night, hoping for calmer seas.
The morning brought clearing skies and singing birds.
"""

# Step 1: Count words ending in 'ing'
counts = {}
for line in text.split('\\n'):
    for word in line.split():
        word = word.lower().strip('.,!?')
        if word.endswith('ing'):
            if word in counts:
                counts[word] += 1
            else:
                counts[word] = 1

print(f"Words ending in 'ing': {len(counts)}")

# Step 2: Convert to list of [count, word]
count_list = []
for word in counts:
    count_list.append([counts[word], word])

# Step 3: Sort the list
count_list.sort()

# Step 4: Get top 5
top_five = count_list[-5:]

print("\\nTop 5 words ending in 'ing':")
for count, word in reversed(top_five):
    print(f"  {word}: {count}")`,
    hints: [
      `Check if a word ends with 'ing' using word.endswith('ing') or word[-3:] == 'ing'.`,
      `Build a dictionary where keys are words and values are counts. Then convert to a list of [count, word] pairs.`,
      `After sorting, the highest counts are at the end. Use count_list[-5:] to get the last 5.`,
    ],
  },
  {
    id: 'exercise6',
    title: 'Recursive Factorial',
    description: `Write a recursive function called factorial that computes n! (n factorial). Remember: 5! = 5 x 4 x 3 x 2 x 1 = 120, and 0! = 1 by definition.`,
    difficulty: 'advanced',
    interactive: true,
    starter: `# Write a recursive factorial function
# factorial(5) = 5 * factorial(4)
#              = 5 * 4 * factorial(3)
#              = 5 * 4 * 3 * factorial(2)
#              = 5 * 4 * 3 * 2 * factorial(1)
#              = 5 * 4 * 3 * 2 * 1 * factorial(0)
#              = 5 * 4 * 3 * 2 * 1 * 1 = 120

# Your code here

# Test cases
print(f"factorial(0) = {factorial(0)}")  # 1
print(f"factorial(1) = {factorial(1)}")  # 1
print(f"factorial(5) = {factorial(5)}")  # 120
print(f"factorial(10) = {factorial(10)}")  # 3628800

`,
    solution: `def factorial(n):
    """Compute n! recursively"""
    if n <= 1:
        return 1  # Base case: 0! = 1! = 1
    else:
        return n * factorial(n - 1)  # Recursive case

# Test cases
print(f"factorial(0) = {factorial(0)}")
print(f"factorial(1) = {factorial(1)}")
print(f"factorial(5) = {factorial(5)}")
print(f"factorial(10) = {factorial(10)}")

# Trace through factorial(4):
print("\\nTrace of factorial(4):")
print("  factorial(4)")
print("  = 4 * factorial(3)")
print("  = 4 * 3 * factorial(2)")
print("  = 4 * 3 * 2 * factorial(1)")
print("  = 4 * 3 * 2 * 1")
print("  = 24")`,
    hints: [
      `Base case: factorial(0) = factorial(1) = 1. This is when you stop recursing.`,
      `Recursive case: factorial(n) = n * factorial(n - 1)`,
      `Structure: if n <= 1: return 1, else: return n * factorial(n - 1)`,
    ],
  },
];

// ============================================================================
// COMPONENT EXPORT
// ============================================================================

export default function CSCI133Unit5_s26() {
  return (
    <InteractiveUnitTemplate
      unitTitle="Unit 5: The os Module and Recursion"
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