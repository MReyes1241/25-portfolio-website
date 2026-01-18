import InteractiveUnitTemplate, {
  type OverviewData,
  type LessonData,
  type ExerciseData,
} from '../interactiveUnitTemplate';

// UNIT 1: LEARN SOMETHING NEW
// Getting Started with Python Programming
const overview: OverviewData = {
  intro: `Welcome to Python programming! In this unit, you'll learn the fundamental building blocks of Python through hands-on examples you can run directly in your browser. By the end of this unit, you'll be able to write simple programs that work with text, numbers, and lists.`,
  heroImage: {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800',
    alt: 'Python programming code on a screen',
    caption: 'Python — Simple, powerful, and beginner-friendly',
  },
  objectives: [
    'Set up and use IDLE (Python\'s development environment)',
    'Write and run Python programs',
    'Use variables to store strings and other data',
    'Create lists and iterate through them with for loops',
    'Use conditionals to make decisions in your programs',
  ],
  prerequisites: [
    'No prior programming experience required',
    'Access to a computer with Python 3 installed',
    'Willingness to experiment and make mistakes!',
  ],
  whyTitle: 'Why Learn Python?',
  whyBullets: [
    'Python is one of the most popular and beginner-friendly programming languages',
    'Used in web development, data science, AI, automation, and more',
    'Clean syntax that reads almost like English',
  ],
  progress: [
    { title: 'Getting Started', description: 'Setting up Python and IDLE' },
    { title: 'First Commands', description: 'Using print() and the interpreter' },
    { title: 'Writing Programs', description: 'Creating and running .py files' },
    { title: 'Variables & Strings', description: 'Storing and displaying data' },
    { title: 'Reassigning Variables', description: 'Changing variable values' },
    { title: 'Lists & For Loops', description: 'Working with collections' },
    { title: 'Named Lists', description: 'Using variables for lists' },
    { title: 'Iterating Strings', description: 'Looping through characters' },
    { title: 'Conditionals', description: 'Making decisions with if' },
    { title: 'Nested Loops', description: 'Preview of combining loops' },
  ],
};

// LESSONS
const lessons: LessonData[] = [
  // PART 1: Getting Started with Python
  {
    id: 'part1',
    title: 'Part 1: Getting Started with Python',
    summary: 'Setting up your programming environment',
    content: [
      {
        type: 'paragraph',
        content: `Welcome to Python programming! In this course, we'll use Python to learn the fundamentals of computer programming. Python is an excellent first language because its syntax is clear and readable, making it easier to focus on programming concepts rather than fighting with complicated rules.`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'Setting Up Your Environment',
      },
      {
        type: 'paragraph',
        content: `We'll use IDLE (Integrated Development and Learning Environment) for this course. IDLE comes bundled with Python, so there's nothing extra to install.`,
      },
      {
        type: 'tip',
        items: [`Already comfortable with another editor? If you prefer VS Code, PyCharm, Thonny, or another IDE, you're welcome to use it. Just make sure you can create .py files and run them.`],
      },
      {
        type: 'heading',
        level: 2,
        content: 'Starting IDLE',
      },
      {
        type: 'paragraph',
        content: `On Windows: Click the Start menu, type "IDLE" and look for "IDLE (Python 3.x)", then click to open it.`,
      },
      {
        type: 'paragraph',
        content: `On Mac: Open Finder, go to Applications, look for the Python folder (e.g., "Python 3.x"), and double-click on IDLE.`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'The Two Windows in IDLE',
      },
      {
        type: 'paragraph',
        content: `When you start IDLE, you'll see a window that says "Python Shell" at the top. This is the interpreter—a place where you can type Python instructions and see them carried out immediately. The >>> symbol is called the prompt. It marks the place where you type your commands.`,
      },
      {
        type: 'info',
        items: [`The Python Shell (interpreter) is great for quick experiments, but for real programs, you'll want to use a separate program file that you can save and run multiple times.`],
      },
      {
        type: 'heading',
        level: 2,
        content: 'Opening a New Program File',
      },
      {
        type: 'paragraph',
        content: `Most of the time, we'll save our instructions in a file and run them all at once. To open a new program file, choose "File → New File" (or Ctrl+N on Windows, ⌘N on Mac).`,
      },
      {
        type: 'warning',
        items: [`Be sure to save your file with a .py extension — this tells your computer it's a Python program. For example: hello.py, myprogram.py, or unit1_practice.py`],
      },
    ],
  },

  // PART 2: Your First Python Commands
  {
    id: 'part2',
    title: 'Part 2: Your First Python Commands',
    summary: 'Using the print function',
    content: [
      {
        type: 'paragraph',
        content: `You're now ready to start using Python. Let's begin by learning the most fundamental command: print().`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'Using the Interpreter',
      },
      {
        type: 'paragraph',
        content: `At the >>> prompt in the interpreter window, try typing the following command:`,
      },
      {
        type: 'code',
        data: {
          code: `print(5)`,
          interactive: true,
        },
      },
      {
        type: 'paragraph',
        content: `You told Python to print the number 5, and it did! Let's break down what happened:`,
      },
      {
        type: 'callout',
        title: 'Understanding print()',
        content: `• print is a function — a command that tells Python to do something\n• The parentheses ( ) contain what we want to print (called the argument)\n• 5 is the value we passed to the print function`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'Try a Few More',
      },
      {
        type: 'paragraph',
        content: `Python can do arithmetic! Try these commands:`,
      },
      {
        type: 'code',
        data: {
          code: `print(10)
print(100 + 50)
print(7 * 8)`,
          interactive: true,
        },
      },
      {
        type: 'tip',
        items: [`The + symbol adds numbers, and the * symbol multiplies them. Python follows standard mathematical order of operations.`],
      },
      {
        type: 'heading',
        level: 2,
        content: 'Printing Text',
      },
      {
        type: 'paragraph',
        content: `You can also print text (called strings in programming). To print text, put it inside quotation marks:`,
      },
      {
        type: 'code',
        data: {
          code: `print('Hello')
print("Hello, World!")`,
          interactive: true,
        },
      },
      {
        type: 'info',
        items: [`You can use either single quotes 'Hello' or double quotes "Hello" — both work the same way in Python. Just be consistent: if you start with a single quote, end with a single quote.`],
      },
    ],
  },

  // PART 3: Writing and Running Programs
  {
    id: 'part3',
    title: 'Part 3: Writing and Running Programs',
    summary: 'Creating your first Python file',
    content: [
      {
        type: 'paragraph',
        content: `Giving instructions directly to the interpreter can be useful for quick experiments. More typically, though, we'll save instructions in a file and pass a whole collection of instructions to the interpreter all at once. This is called writing a program — a set of instructions for a computer written in a programming language.`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'Creating Your First Program',
      },
      {
        type: 'paragraph',
        content: `Type the following in a program file window (not the interpreter):`,
      },
      {
        type: 'code',
        data: {
          code: `print(5)
print(6)`,
          interactive: true,
        },
      },
      {
        type: 'info',
        items: [`Notice that we don't type the >>> prompt — that's only in the interpreter window.`],
      },
      {
        type: 'heading',
        level: 2,
        content: 'The Workflow',
      },
      {
        type: 'paragraph',
        content: `From now on, when we ask you to run a program, follow these steps:`,
      },
      {
        type: 'callout',
        title: 'Edit-Save-Run Cycle',
        content: `1. Type the program in the program file window\n2. Save it with Ctrl+S (Windows) or ⌘S (Mac)\n3. Run it with F5`,
      },
      {
        type: 'warning',
        items: [`You must be using the program file window — not the interpreter window — when you save and run. IDLE will prompt you to save before running if you forget.`],
      },
      {
        type: 'heading',
        level: 2,
        content: 'Making Changes',
      },
      {
        type: 'paragraph',
        content: `One advantage of writing programs in a file is that you can easily make changes. Try changing the numbers and running again:`,
      },
      {
        type: 'code',
        data: {
          code: `print(100)
print(200)`,
          interactive: true,
        },
      },
      {
        type: 'tip',
        items: [`This edit-save-run cycle is something you'll do hundreds of times as a programmer. The keyboard shortcuts (Ctrl+S and F5) will become second nature.`],
      },
    ],
  },

  // PART 4: Variables and Strings
  {
    id: 'part4',
    title: 'Part 4: Variables and Strings',
    summary: 'Storing data with meaningful names',
    content: [
      {
        type: 'paragraph',
        content: `The programs we've written so far are pretty boring. As a first step toward something more interesting, let's learn about variables — names that refer to data.`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'Your First Variable',
      },
      {
        type: 'paragraph',
        content: `Try running this program:`,
      },
      {
        type: 'code',
        data: {
          code: `student = 'Fred'
print(f'Hello, {student}')`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Understanding Strings',
      },
      {
        type: 'paragraph',
        content: `The first line creates a string (a sequence of characters, in this case "Fred") and gives it a name: student. To indicate a string, we enclose it in quotes.`,
      },
      {
        type: 'info',
        items: [`The equals sign (=) doesn't mean "equals" like in math. Instead, it means "assign" or "is the name for." Read student = 'Fred' as "student is the name for the string Fred."`],
      },
      {
        type: 'heading',
        level: 2,
        content: 'Understanding f-strings',
      },
      {
        type: 'paragraph',
        content: `The f before the opening quote makes this an f-string (formatted string). Inside an f-string, anything in curly braces {} gets replaced with its value:`,
      },
      {
        type: 'code',
        data: {
          code: `name = 'Alice'
age = 20
print(f'{name} is {age} years old')
print(f'Next year, {name} will be {age + 1}')`,
          interactive: true,
        },
      },
      {
        type: 'tip',
        items: [`F-strings can include expressions like {age + 1}. Python evaluates the expression and inserts the result.`],
      },
      {
        type: 'heading',
        level: 2,
        content: 'Naming Variables',
      },
      {
        type: 'paragraph',
        content: `Good variable names make your code easier to understand:`,
      },
      {
        type: 'code',
        data: {
          code: `# Clear and descriptive
student_name = 'Fred'
course_number = 133

# Not as clear
x = 'Fred'
n = 133

print(f'{student_name} is in CSCI {course_number}')`,
          interactive: true,
        },
      },
      {
        type: 'warning',
        items: [`Variable names must start with a letter or underscore (not a number), can only contain letters, numbers, and underscores, and are case-sensitive (Student and student are different).`],
      },
    ],
  },

  // PART 5: Reassigning Variables
  {
    id: 'part5',
    title: 'Part 5: Reassigning Variables',
    summary: 'Variables can change',
    content: [
      {
        type: 'paragraph',
        content: `Variables aren't permanent — you can change what they refer to at any time. This is called reassignment.`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'Changing Variable Values',
      },
      {
        type: 'code',
        data: {
          code: `student = 'Fred'
print(f'Hello, {student}')

student = 'Ted'
print(f'Hello, {student}')`,
          interactive: true,
        },
      },
      {
        type: 'paragraph',
        content: `After greeting Fred, we reassign the name student to refer to a new string and use it to say hello to Ted.`,
      },
      {
        type: 'info',
        items: [`Think of a variable as a label or sticky note. When we write student = 'Ted', we're moving that label to a different string. The old value 'Fred' is no longer accessible through the name student.`],
      },
      {
        type: 'heading',
        level: 2,
        content: 'Order Matters',
      },
      {
        type: 'paragraph',
        content: `Python executes your program line by line, from top to bottom. This means the order of your statements matters:`,
      },
      {
        type: 'code',
        data: {
          code: `# Version A
student = 'Fred'
student = 'Ted'
print(f'Hello, {student}')  # Prints: Hello, Ted`,
          interactive: true,
        },
      },
      {
        type: 'code',
        data: {
          code: `# Version B
student = 'Ted'
student = 'Fred'
print(f'Hello, {student}')  # Prints: Hello, Fred`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Using Multiple Variables',
      },
      {
        type: 'paragraph',
        content: `You can have as many variables as you need:`,
      },
      {
        type: 'code',
        data: {
          code: `first_student = 'Fred'
second_student = 'Ted'
third_student = 'Ed'

print(f'Hello, {first_student}')
print(f'Hello, {second_student}')
print(f'Hello, {third_student}')`,
          interactive: true,
        },
      },
      {
        type: 'tip',
        items: [`This is getting repetitive. What if we had 100 students? In the next part, we'll learn a much better way to handle this situation using lists and loops.`],
      },
    ],
  },

  // PART 6: Lists and For Loops
  {
    id: 'part6',
    title: 'Part 6: Lists and For Loops',
    summary: 'Working with collections of data',
    content: [
      {
        type: 'paragraph',
        content: `Now suppose we have a long list of students to greet. Rather than writing nearly identical lines many times, we can use a for loop to repeat code for each item in a list.`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'Your First For Loop',
      },
      {
        type: 'code',
        data: {
          code: `for student in ['Fred', 'Ted', 'Ed']:
    print(f'Hello, {student}')`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Understanding Lists',
      },
      {
        type: 'paragraph',
        content: `In this program, ['Fred', 'Ted', 'Ed'] is a list — a sequence of objects. A list is written with square brackets [ ], with items separated by commas.`,
      },
      {
        type: 'callout',
        title: 'Parts of a For Loop',
        content: `• for — tells Python we're starting a loop\n• student — the variable that takes each value, one at a time\n• in — connects the variable to the list\n• : — marks the end of the for line (required!)\n• Indented code — what to do for each item`,
      },
      {
        type: 'warning',
        items: [`The indented statements MUST be indented. This is how Python knows what code belongs inside the loop. IDLE helps by indenting automatically when you press Enter after the colon.`],
      },
      {
        type: 'heading',
        level: 2,
        content: 'Another Example: Numbers',
      },
      {
        type: 'paragraph',
        content: `For loops work with any kind of list, including numbers:`,
      },
      {
        type: 'code',
        data: {
          code: `for num in [1, 2, 3, 4, 5]:
    print(num * 2)`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Multiple Statements in a Loop',
      },
      {
        type: 'paragraph',
        content: `You can have more than one indented statement — all of them execute for each item:`,
      },
      {
        type: 'code',
        data: {
          code: `for num in [1, 2, 3]:
    doubled = num * 2
    print(f'{num} doubled is {doubled}')`,
          interactive: true,
        },
      },
    ],
  },

  // PART 7: Using Variables for Lists
  {
    id: 'part7',
    title: 'Part 7: Using Variables for Lists',
    summary: 'Naming your collections',
    content: [
      {
        type: 'paragraph',
        content: `Just like we use variables for strings and numbers, we can use variables for lists too. This makes our programs clearer and easier to modify.`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'Naming Your Lists',
      },
      {
        type: 'code',
        data: {
          code: `students = ['Fred', 'Ted', 'Ed']
for student in students:
    print(f'Hello, {student}')`,
          interactive: true,
        },
      },
      {
        type: 'paragraph',
        content: `Here, we use the name students to refer to the list. We use student (singular) to refer to each item one at a time.`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'Why Use Variable Names for Lists?',
      },
      {
        type: 'paragraph',
        content: `Compare these two versions — they do exactly the same thing:`,
      },
      {
        type: 'code',
        data: {
          code: `# Confusing version
xy34q = ['Fred', 'Ted', 'Ed']
for prz in xy34q:
    print(f'Hello, {prz}')`,
          interactive: true,
        },
      },
      {
        type: 'tip',
        items: [`The interpreter doesn't care what names you use, but YOU will care when you try to read your code later! Use descriptive names.`],
      },
      {
        type: 'heading',
        level: 2,
        content: 'Reusing Lists',
      },
      {
        type: 'paragraph',
        content: `You can use the same list in multiple places:`,
      },
      {
        type: 'code',
        data: {
          code: `students = ['Fred', 'Ted', 'Ed']

# Use it once
for student in students:
    print(f'Hello, {student}')

print('---')

# Use it again
for student in students:
    print(f'Goodbye, {student}')`,
          interactive: true,
        },
      },
      {
        type: 'callout',
        title: 'Naming Conventions',
        content: `• Use plural names for lists: students, numbers, prices\n• Use singular names for loop variables: student, number, price\n• This makes it clear which is the collection and which is the individual item`,
      },
    ],
  },

  // PART 8: Iterating Over Strings
  {
    id: 'part8',
    title: 'Part 8: Iterating Over Strings',
    summary: 'Looping through characters',
    content: [
      {
        type: 'paragraph',
        content: `We've been using for to iterate through lists, but for works just as well with strings! A string is an ordered collection of characters, so we can loop through each character one at a time.`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'Looping Through a String',
      },
      {
        type: 'code',
        data: {
          code: `vowels = 'aeiou'
for letter in vowels:
    print(letter)`,
          interactive: true,
        },
      },
      {
        type: 'paragraph',
        content: `Just like with a list, Python goes through the string one item (character) at a time.`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'Another Example',
      },
      {
        type: 'code',
        data: {
          code: `word = 'python'
for letter in word:
    print(f'The letter is: {letter}')`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'Lists vs Strings',
      },
      {
        type: 'paragraph',
        content: `Both strings and lists are sequences. The key difference:`,
      },
      {
        type: 'code',
        data: {
          code: `# Looping through a list - each item is a complete string
print('List of words:')
for word in ['cat', 'dog']:
    print(word)

print('---')

# Looping through a string - each item is a single character
print('Characters in "cat":')
for char in 'cat':
    print(char)`,
          interactive: true,
        },
      },
      {
        type: 'info',
        items: [`When you loop through a list of strings, each item is a complete string. When you loop through a string itself, each item is a single character.`],
      },
    ],
  },

  // PART 9: Conditionals with in
  {
    id: 'part9',
    title: 'Part 9: Conditionals with in',
    summary: 'Making decisions in your programs',
    content: [
      {
        type: 'paragraph',
        content: `We can use the word in to check if an item is contained in a collection. Combined with if, this lets us make decisions in our programs.`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'Checking Membership',
      },
      {
        type: 'code',
        data: {
          code: `if 'a' in 'pineapple':
    print('found a')

if 'b' in 'pineapple':
    print('found b')`,
          interactive: true,
        },
      },
      {
        type: 'paragraph',
        content: `This prints 'found a' but not 'found b'. The if statement checks whether a condition is true — if it is, Python executes the indented code. If not, Python skips it.`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'Combining for and if',
      },
      {
        type: 'paragraph',
        content: `Now for something powerful — combining loops and conditionals:`,
      },
      {
        type: 'code',
        data: {
          code: `vowels = 'aeiou'
word = 'pineapple'

for letter in vowels:
    if letter in word:
        print(f'{letter} is in {word}')`,
          interactive: true,
        },
      },
      {
        type: 'warning',
        items: [`Notice the double indentation. The print statement is inside the if, which is inside the for. Each level of nesting requires another level of indentation.`],
      },
      {
        type: 'heading',
        level: 2,
        content: 'Using in with Lists',
      },
      {
        type: 'paragraph',
        content: `The in operator works with lists too:`,
      },
      {
        type: 'code',
        data: {
          code: `fruits = ['apple', 'banana', 'cherry']

if 'banana' in fruits:
    print('We have bananas!')

if 'grape' in fruits:
    print('We have grapes!')`,
          interactive: true,
        },
      },
      {
        type: 'callout',
        title: 'What You Can Do Now',
        content: `• Store values in variables\n• Create lists and loop through them with for\n• Loop through characters in a string\n• Check if something is in a collection\n• Use if to execute code only when a condition is true\n• Combine for and if for more complex programs`,
      },
    ],
  },

  // PART 10: Combining Loops (Preview)
  {
    id: 'part10',
    title: 'Part 10: Combining Loops (Preview)',
    summary: 'Nested loops — a preview of what\'s to come',
    content: [
      {
        type: 'info',
        items: [`This part introduces nested loops — putting one loop inside another. This is preview material that will be covered in more depth in Unit 2. You won't be tested on nested loops in the Unit 1 test.`],
      },
      {
        type: 'heading',
        level: 2,
        content: 'The Idea of Nested Loops',
      },
      {
        type: 'paragraph',
        content: `Sometimes we want to pair up items from two different lists. For example, if we have sizes and colors, we might want every combination:`,
      },
      {
        type: 'code',
        data: {
          code: `sizes = ['small', 'medium', 'large']
colors = ['red', 'blue']

for size in sizes:
    for color in colors:
        print(f'{size} {color}')`,
          interactive: true,
        },
      },
      {
        type: 'heading',
        level: 2,
        content: 'How Nested Loops Work',
      },
      {
        type: 'paragraph',
        content: `When you put one loop inside another: the outer loop starts with its first item, then the inner loop runs completely through all its items. Then the outer loop moves to its next item, and the inner loop runs completely again.`,
      },
      {
        type: 'heading',
        level: 2,
        content: 'A Practical Example',
      },
      {
        type: 'paragraph',
        content: `Imagine you're at a deli and want to see all possible sandwich combinations:`,
      },
      {
        type: 'code',
        data: {
          code: `meats = ['ham', 'turkey', 'roast beef']
breads = ['white', 'wheat', 'rye']

for meat in meats:
    for bread in breads:
        print(f'{meat} on {bread}')`,
          interactive: true,
        },
      },
      {
        type: 'tip',
        items: [`That's 3 meats × 3 breads = 9 sandwich combinations, all generated automatically! If the outer loop has m items and the inner loop has n items, the code inside runs m × n times.`],
      },
    ],
  },
];

// PRACTICE EXERCISES
const exercises: ExerciseData[] = [
  {
    id: 'exercise1',
    title: 'Greeting Names',
    description: 'Write a program that greets Fred, Ted, and Ed using a for loop — do not simply write three separate print statements.',
    difficulty: 'beginner',
    interactive: true,
    starter: `# Write a program that produces:
# Hello, Fred
# Hello, Ted
# Hello, Ed
# 
# Use a for loop, not three separate print statements!

`,
    solution: `names = ['Fred', 'Ted', 'Ed']
for name in names:
    print(f'Hello, {name}')`,
    hints: [
      'You need a list containing the three names: Fred, Ted, and Ed.',
      'Use a for loop to iterate through the list: for name in [\'Fred\', \'Ted\', \'Ed\']:',
      'Inside the loop, use print() with an f-string to greet each name: print(f\'Hello, {name}\')',
    ],
  },
  {
    id: 'exercise2',
    title: 'Printing the Alphabet',
    description: 'Write a program that prints each letter of the alphabet, one per line. Remember: you can loop through a string!',
    difficulty: 'beginner',
    interactive: true,
    starter: `# Print each letter of the alphabet, one per line:
# a
# b
# c
# ... and so on to z
#
# Hint: A string is a sequence of characters!

`,
    solution: `alphabet = 'abcdefghijklmnopqrstuvwxyz'
for letter in alphabet:
    print(letter)`,
    hints: [
      'Create a string containing all 26 letters: \'abcdefghijklmnopqrstuvwxyz\'',
      'Remember that you can loop through a string just like a list — each item is a single character.',
      'Use: for letter in \'abcdefghijklmnopqrstuvwxyz\': and then print(letter) inside the loop.',
    ],
  },
  {
    id: 'exercise3',
    title: 'Countdown',
    description: 'Write a program that counts down from 10 to 1. Each number should be on its own line.',
    difficulty: 'beginner',
    interactive: true,
    starter: `# Count down from 10 to 1:
# 10
# 9
# 8
# ... and so on to 1
#
# Hint: Create a list with the numbers in the right order!

`,
    solution: `countdown = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
for num in countdown:
    print(num)`,
    hints: [
      'You need a list of numbers from 10 down to 1.',
      'Create the list explicitly: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]',
      'Loop through the list and print each number: for num in [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]: print(num)',
    ],
  },
  {
    id: 'exercise4',
    title: 'Letter Positions',
    description: 'Print each letter of the word "Hunter" along with its position number (starting from 1).',
    difficulty: 'intermediate',
    interactive: true,
    starter: `# Print each letter with its position:
# Position 1: H
# Position 2: u
# Position 3: n
# Position 4: t
# Position 5: e
# Position 6: r
#
# Hint: You'll need a counter variable!

`,
    solution: `word = 'Hunter'
position = 1
for letter in word:
    print(f'Position {position}: {letter}')
    position = position + 1`,
    hints: [
      'You need two things: a way to loop through each letter, and a counter to track the position.',
      'Create a variable (like position = 1) before the loop, and add 1 to it inside the loop after each print.',
      'Use: position = 1, then for letter in \'Hunter\':, then print(f\'Position {position}: {letter}\'), then position = position + 1',
    ],
  },
  {
    id: 'exercise5',
    title: 'Finding Vowels',
    description: 'Check the word "programming" and print each vowel it contains. Each vowel should only be printed once, even if it appears multiple times.',
    difficulty: 'intermediate',
    interactive: true,
    starter: `# Find vowels in "programming" and print each unique vowel:
# o is a vowel in programming
# a is a vowel in programming
# i is a vowel in programming
#
# Note: Each vowel should only print once!

`,
    solution: `vowels = 'aeiou'
word = 'programming'

for vowel in vowels:
    if vowel in word:
        print(f'{vowel} is a vowel in {word}')`,
    hints: [
      'Loop through the vowels (aeiou), not through the word. This way each vowel is only checked once.',
      'For each vowel, use an if statement to check if that vowel is in the word.',
      'Use: for vowel in \'aeiou\': if vowel in \'programming\': print(f\'{vowel} is a vowel in programming\')',
    ],
  },
  {
    id: 'exercise6',
    title: 'NYC Subway Challenge',
    description: 'This is similar to your Unit 1 test! Find the unique letters in "Manhattan" (lowercase). Print each unique letter only once.',
    difficulty: 'advanced',
    interactive: true,
    starter: `# Find and print unique letters in "manhattan"
# Expected output (order may vary):
# Manhattan contains m
# Manhattan contains a
# Manhattan contains n
# Manhattan contains h
# Manhattan contains t
#
# Challenge: Don't print any letter more than once!
# Hint: Keep track of which letters you've already seen.

`,
    solution: `word = 'manhattan'
seen = ''

for letter in word:
    if letter not in seen:
        print(f'Manhattan contains {letter}')
        seen = seen + letter`,
    hints: [
      'You need to track which letters you\'ve already printed so you don\'t print them again.',
      'Create an empty string (like seen = \'\') and add each new letter to it after printing.',
      'Use: seen = \'\', then for letter in \'manhattan\': if letter not in seen: print(...) and seen = seen + letter',
    ],
  },
];

// COMPONENT EXPORT
export default function CSCI133Unit1_s26() {
  return (
    <InteractiveUnitTemplate
      unitTitle="Unit 1: Learn Something New"
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