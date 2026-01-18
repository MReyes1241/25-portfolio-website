import React from 'react';
import UnitTemplate, { type UnitTemplateProps } from '../UnitTemplate';

const Unit9Data: UnitTemplateProps = {
  unitTitle: 'Unit 9: Object-Oriented Programming',
  unitSubtitle: 'Learn to design and build programs using classes, objects, inheritance, and encapsulation',

  overview: {
    intro: 'Object-oriented programming (OOP) is a programming paradigm that organizes code around objects and classes rather than functions and logic. This approach helps create more maintainable, reusable, and organized code.',
    
    objectives: [
      'Understand the principles of object-oriented programming',
      'Create custom classes with attributes and methods',
      'Use __init__ constructors to initialize objects',
      'Implement inheritance to create specialized classes',
      'Apply encapsulation to protect and organize data',
      'Work with class methods and instance methods',
      'Design programs using OOP principles'
    ],
    
    prerequisites: [
      'Functions and variable scope (Unit 7)',
      'Lists and dictionaries (Unit 3)',
      'Control structures (if/else, loops) (Unit 1)',
      'Basic understanding of modules and imports'
    ],

    whyTitle: 'Why Learn Object-Oriented Programming?',
    whyBullets: [
      'OOP mirrors real-world entities, making programs more intuitive to design and understand',
      'Classes enable code reuse - write once, use many times with different data',
      'Inheritance allows you to extend existing code without modifying it',
      'Encapsulation helps manage complexity in large programs',
      'OOP is fundamental to modern software development and many Python libraries',
      'Understanding OOP is essential for frameworks like Django, Flask, and game development'
    ],

    progress: [
      {
        title: 'Part 1: Introduction to Classes',
        description: 'Learn what classes are, how to define them, and how they differ from built-in data types'
      },
      {
        title: 'Part 2: Building a Deck Class',
        description: 'Create a practical Deck class with methods for shuffling, dealing, and managing cards'
      },
      {
        title: 'Part 3: Inheritance and Specialization',
        description: 'Extend existing classes to create specialized versions with additional functionality'
      },
      {
        title: 'Part 4: GUI Widgets as Classes',
        description: 'Apply class concepts to create custom GUI widgets by specializing tkinter classes'
      },
      {
        title: 'Part 5: Advanced Class Features',
        description: 'Explore enhanced entry widgets and building reusable GUI components'
      }
    ]
  },

  lessons: [
    {
      id: 'part1',
      title: 'Part 1: Introduction to Classes',
      summary: 'Understanding classes, objects, and creating your first custom data type',
      paragraphs: [
        'Python provides built-in data types like string and list. Each has methods - string.split(), list.format(), etc. We can create our own data types using the class statement.',
        'A class means a data type. When we create a new data type, we can use any name we like (starting with an uppercase letter by convention), and we can give it custom methods.',
        'When we create an instance of a class, we call the __init__ method automatically. This special method initializes the object with specific values.',
      ],
      code: [
        {
          title: 'Creating a Simple Card Class',
          code: `class Card:
    def __init__(self, f, s):
        self.myFaceValue = f
        self.mySuit = s
    
    def faceValue(self):
        return self.myFaceValue
    
    def suit(self):
        return self.mySuit

# Create card instances
card1 = Card('jack', 'spades')
card2 = Card('3', 'hearts')

print(card1.faceValue())  # prints: jack
print(card2.suit())       # prints: hearts`
        },
        {
          title: 'Understanding __init__ and self',
          code: `class Card:
    def __init__(self, f, s):
        # __init__ is automatically called when creating instances
        # self refers to the current instance
        # self.myFaceValue = f creates an attribute for this instance
        self.myFaceValue = f
        self.mySuit = s`
        }
      ],
      infos: [
        'The class name starts with an uppercase letter (Card, Deck, BankAccount) by convention',
        'self is always the first parameter in class methods and refers to the instance',
        'Attributes (like self.myFaceValue) are just variables associated with an instance',
        'When you call Card("jack", "spades"), Python automatically calls __init__'
      ],
      tips: [
        'Use meaningful attribute names like self.myFaceValue rather than abbreviations',
        'Methods that just return attributes (getters) help encapsulate your data',
        'Think of a class as a blueprint and an instance as an actual object built from that blueprint'
      ]
    },

    {
      id: 'part2',
      title: 'Part 2: Building a Deck Class',
      summary: 'Creating a practical Deck class with methods to shuffle, deal, and manage playing cards',
      paragraphs: [
        'Now that we can create individual cards, let\'s build a Deck class that manages a collection of 52 cards. The deck will have methods to shuffle the cards, deal cards, and track how many remain.',
        'Each instance of the Deck class will contain a list called theCards that holds Card objects. We\'ll also track which cards have been dealt using methods.',
      ],
      code: [
        {
          title: 'The Deck Class Structure',
          code: `import random

class Deck:
    faceValues = ['ace', '2', '3', '4', '5', '6', '7', '8', 
                  '9', '10', 'jack', 'queen', 'king']
    suits = ['clubs', 'diamonds', 'hearts', 'spades']
    
    def __init__(self):
        # Create a list to hold all the cards
        self.theCards = [Card(faceValue, suit) 
                        for faceValue in Deck.faceValues 
                        for suit in Deck.suits]
    
    def shuffle(self):
        random.shuffle(self.theCards)
    
    def deal(self):
        return self.theCards.pop()
    
    def cardsLeft(self):
        return len(self.theCards)`
        },
        {
          title: 'Using the Deck Class',
          code: `# Create and shuffle a deck
deck1 = Deck()
deck1.shuffle()

# Deal cards
card1 = deck1.deal()
card2 = deck1.deal()

print(f'First card: {card1.faceValue()} of {card1.suit()}')
print(f'Cards remaining: {deck1.cardsLeft()}')`
        }
      ],
      infos: [
        'faceValues and suits are class attributes - shared by all instances of Deck',
        'theCards is an instance attribute - each Deck instance has its own list',
        'The __init__ method uses list comprehension to create all 52 cards',
        'pop() removes and returns the last item from a list - perfect for dealing cards'
      ],
      warnings: [
        'Remember to shuffle() before dealing, or cards will always be in the same order',
        'Dealing from an empty deck will cause an error - check cardsLeft() first',
        'Each time you create a Deck(), you get a fresh set of 52 cards'
      ]
    },

    {
      id: 'part3',
      title: 'Part 3: Inheritance and Specialization',
      summary: 'Creating specialized classes that inherit and extend functionality from existing classes',
      paragraphs: [
        'One of the most powerful features of OOP is inheritance - the ability to create new classes based on existing ones. The new class inherits all methods and attributes from the parent class and can add its own.',
        'For example, we can create a personalDeck class that is a specialized version of Deck. Each personal deck has an owner whose name is displayed when we print the deck.',
        'This technique lets us reuse code without copying it. The personalDeck automatically gets shuffle(), deal(), and all other Deck methods - we just add what\'s new.'
      ],
      code: [
        {
          title: 'Creating a Specialized Deck with Inheritance',
          code: `class personalDeck(Deck):
    def __init__(self, name):
        # Call the parent class __init__ to set up the deck
        Deck.__init__(self)
        # Add our own attribute for the owner's name
        self.owner = name
    
    def __str__(self):
        return f"{self.owner}'s deck"

# Use the personalized deck
pd = personalDeck("John")
print(pd)               # Output: John's deck
print(pd.cardsLeft())   # Output: 52 (inherited method)`
        },
        {
          title: 'How Inheritance Works',
          code: `# personalDeck inherits from Deck
class personalDeck(Deck):
    # This means personalDeck IS A Deck
    # It gets all Deck methods automatically
    pass

# We can use all Deck methods
my_deck = personalDeck("Alice")
my_deck.shuffle()    # Inherited from Deck
my_deck.deal()       # Inherited from Deck
my_deck.cardsLeft()  # Inherited from Deck`
        }
      ],
      infos: [
        'The syntax class personalDeck(Deck): means personalDeck inherits from Deck',
        'We must call Deck.__init__(self) to initialize the parent class',
        '__str__ is a special method that defines how objects are printed',
        'Inheritance represents an "is-a" relationship: personalDeck IS A Deck'
      ],
      tips: [
        'Use inheritance when you want to extend existing functionality, not replace it',
        'Always call the parent __init__ if you override __init__ in the child class',
        'You can override any parent method by defining it again in the child class'
      ]
    },

    {
      id: 'part4',
      title: 'Part 4: Specialized GUI Widgets',
      summary: 'Applying class specialization to create custom tkinter widgets',
      paragraphs: [
        'GUI widgets like Button, Label, and Entry are all classes in tkinter. We can specialize them to create our own custom widgets with built-in functionality.',
        'For example, we might want a "Quit Button" that always exits the program when clicked. Instead of creating this manually every time, we can make a quitButton class.',
        'This is exactly how professional GUI frameworks work - they provide base widgets that you specialize for your specific needs.'
      ],
      code: [
        {
          title: 'Creating a Quit Button Class',
          code: `from tkinter import *

class quitButton(Button):
    def __init__(self, parent):
        # Initialize the Button parent class
        Button.__init__(self, parent)
        # Set our custom text and command
        self['text'] = 'Quit'
        self['command'] = parent.destroy
        # Pack it at the bottom
        self.pack(side=BOTTOM, anchor=E)

# Use it in a program
root = Tk()
quitButton(root)  # That's it! No need to configure
mainloop()`
        },
        {
          title: 'Understanding Widget Specialization',
          code: `# quitButton IS A Button
# It inherits all Button methods and properties
class quitButton(Button):
    def __init__(self, parent):
        Button.__init__(self, parent)
        # Add default configuration
        self['text'] = 'Quit'
        self['command'] = parent.destroy
        self.pack(side=BOTTOM, anchor=E)

# This makes it easy to add quit buttons anywhere
root = Tk()
quitButton(root)  # Automatically configured!`
        }
      ],
      infos: [
        'tkinter widgets (Button, Label, Entry) are all classes we can inherit from',
        'parent.destroy is a method that closes the window',
        'Self-packing widgets are convenient but slightly non-standard',
        'You can override the default text by setting self["text"] after creating the button'
      ],
      warnings: [
        'Make sure to call the parent __init__ with the correct parameters',
        'Be careful with self-packing widgets - they can make layout harder to control',
        'Remember that parent.destroy closes the entire application, not just the widget'
      ]
    },

    {
      id: 'part5',
      title: 'Part 5: Enhanced Entry Widget',
      summary: 'Building a reusable enhanced entry widget combining labels, entry fields, and buttons',
      paragraphs: [
        'Let\'s create a more complex custom widget: an enhanced entry box that combines a label, an entry field, and a button into one reusable component.',
        'This widget will be a Frame (a container) that holds other widgets. It provides methods to get the entered text and set the button\'s action.',
        'This is a common pattern in GUI programming - creating composite widgets that bundle related functionality.'
      ],
      code: [
        {
          title: 'Enhanced Entry Widget Class',
          code: `from tkinter import *

class enhancedEntry(Frame):
    def __init__(self, parent, prompt, actionText, action):
        Frame.__init__(self, parent)
        
        # Create the label
        self.inputBoxLabel = Label(self)
        self.inputBoxLabel['text'] = prompt
        self.inputBoxLabel.pack(side=LEFT, fill=X)
        
        # Create the entry box
        self.inputBox = Entry(self)
        self.inputBox.pack(side=LEFT, fill=X)
        
        # Create the button
        self.button = Button(self)
        self.button['text'] = actionText
        self.button['command'] = action
        self.button.pack(side=LEFT, fill=X)
    
    def get(self):
        return self.inputBox.get()
    
    def setActionText(self, actionText):
        self.button['text'] = actionText
    
    def setAction(self, cmd):
        self.button['command'] = cmd`
        },
        {
          title: 'Using the Enhanced Entry Widget',
          code: `def slide():
    word = userInput.get()
    result['text'] = word[::-1]  # Reverse the word

root = Tk()

userInput = enhancedEntry(root, 'Enter text:', 'Go', slide)
userInput.pack(fill=X)

result = Label(root)
result.pack(side=LEFT, fill=X, anchor=W)

mainloop()`
        }
      ],
      infos: [
        'enhancedEntry inherits from Frame, so it can contain other widgets',
        'The get() method provides easy access to the entry box text',
        'Methods like setAction() allow reconfiguring the widget after creation',
        'This widget pattern makes complex GUIs much easier to build and maintain'
      ],
      tips: [
        'Create custom widgets when you use the same combination of widgets repeatedly',
        'Provide methods (like get()) that hide the internal structure from users',
        'Use descriptive parameter names in __init__ to make the widget easy to use',
        'Consider what methods users of your widget will need and provide them'
      ]
    }
  ],

  exercises: [
    {
      id: 'ex1',
      title: 'Hello World GUI',
      description: 'Create a simple GUI with a label that says "Hello, World!" and a button that prints a message when clicked.',
      difficulty: 'beginner' as const,
      starter: `from tkinter import *

# Your code here`,
      solution: `from tkinter import *

root = Tk()
root.title('Hello World')

# Create a label
label = Label(root, text="Hello, World!", font=('Arial', 16))
label.pack(pady=10)

# Create a button
def say_hello():
    print('Button clicked!')

button = Button(root, text='Click Me', command=say_hello)
button.pack(pady=10)

mainloop()`
    },

    {
      id: 'ex2',
      title: 'Name Greeter',
      description: 'Create a GUI with an Entry widget for the user\'s name and a button that displays "Hello, [name]!" in a label when clicked.',
      difficulty: 'beginner' as const,
      starter: `from tkinter import *

# Your code here`,
      solution: `from tkinter import *

def greet():
    name = name_entry.get()
    if name:
        output_label['text'] = f'Hello, {name}!'
    else:
        output_label['text'] = 'Please enter your name'

root = Tk()
root.title('Name Greeter')

# Input section
Label(root, text='Enter your name:').pack()
name_entry = Entry(root, width=30)
name_entry.pack()

# Button
Button(root, text='Greet', command=greet).pack(pady=10)

# Output section
output_label = Label(root, text='', font=('Arial', 14))
output_label.pack()

mainloop()`
    },

    {
      id: 'ex3',
      title: 'Simple Counter',
      description: 'Create a counter GUI with a label showing the count (starting at 0) and buttons to increment and decrement the count.',
      difficulty: 'beginner' as const,
      starter: `from tkinter import *

count = 0

# Your code here`,
      solution: `from tkinter import *

count = 0

def increment():
    global count
    count += 1
    label['text'] = f'Count: {count}'

def decrement():
    global count
    count -= 1
    label['text'] = f'Count: {count}'

root = Tk()
root.title('Counter')

label = Label(root, text='Count: 0', font=('Arial', 24))
label.pack(pady=20)

button_frame = Frame(root)
button_frame.pack()

Button(button_frame, text='-', command=decrement, width=10).pack(side=LEFT, padx=5)
Button(button_frame, text='+', command=increment, width=10).pack(side=LEFT, padx=5)

mainloop()`
    },

    {
      id: 'ex4',
      title: 'Temperature Converter',
      description: 'Create a temperature converter with entries for Celsius and Fahrenheit, and buttons to convert between them. Formula: F = C * 9/5 + 32',
      difficulty: 'intermediate' as const,
      starter: `from tkinter import *

# Your code here`,
      solution: `from tkinter import *

def celsius_to_fahrenheit():
    try:
        celsius = float(celsius_entry.get())
        fahrenheit = celsius * 9/5 + 32
        fahrenheit_entry.delete(0, END)
        fahrenheit_entry.insert(0, f'{fahrenheit:.2f}')
    except ValueError:
        fahrenheit_entry.delete(0, END)
        fahrenheit_entry.insert(0, 'Invalid')

def fahrenheit_to_celsius():
    try:
        fahrenheit = float(fahrenheit_entry.get())
        celsius = (fahrenheit - 32) * 5/9
        celsius_entry.delete(0, END)
        celsius_entry.insert(0, f'{celsius:.2f}')
    except ValueError:
        celsius_entry.delete(0, END)
        celsius_entry.insert(0, 'Invalid')

root = Tk()
root.title('Temperature Converter')

# Celsius section
celsius_frame = Frame(root)
celsius_frame.pack(pady=5)
Label(celsius_frame, text='Celsius:').pack(side=LEFT)
celsius_entry = Entry(celsius_frame, width=15)
celsius_entry.pack(side=LEFT, padx=5)
Button(celsius_frame, text='Convert to F', command=celsius_to_fahrenheit).pack(side=LEFT)

# Fahrenheit section
fahrenheit_frame = Frame(root)
fahrenheit_frame.pack(pady=5)
Label(fahrenheit_frame, text='Fahrenheit:').pack(side=LEFT)
fahrenheit_entry = Entry(fahrenheit_frame, width=15)
fahrenheit_entry.pack(side=LEFT, padx=5)
Button(fahrenheit_frame, text='Convert to C', command=fahrenheit_to_celsius).pack(side=LEFT)

mainloop()`
    },

    {
      id: 'ex5',
      title: 'Simple Calculator',
      description: 'Create a calculator with two number entries and buttons for add, subtract, multiply, and divide operations.',
      difficulty: 'intermediate' as const,
      starter: `from tkinter import *

# Your code here`,
      solution: `from tkinter import *

def calculate(operation):
    try:
        num1 = float(entry1.get())
        num2 = float(entry2.get())
        
        if operation == 'add':
            result = num1 + num2
        elif operation == 'subtract':
            result = num1 - num2
        elif operation == 'multiply':
            result = num1 * num2
        elif operation == 'divide':
            if num2 == 0:
                result_label['text'] = 'Error: Division by zero'
                return
            result = num1 / num2
        
        result_label['text'] = f'Result: {result:.2f}'
    except ValueError:
        result_label['text'] = 'Error: Invalid input'

root = Tk()
root.title('Calculator')

# Number inputs
frame1 = Frame(root)
frame1.pack(pady=5)
Label(frame1, text='Number 1:').pack(side=LEFT)
entry1 = Entry(frame1, width=15)
entry1.pack(side=LEFT)

frame2 = Frame(root)
frame2.pack(pady=5)
Label(frame2, text='Number 2:').pack(side=LEFT)
entry2 = Entry(frame2, width=15)
entry2.pack(side=LEFT)

# Operation buttons
button_frame = Frame(root)
button_frame.pack(pady=10)
Button(button_frame, text='+', command=lambda: calculate('add'), width=5).pack(side=LEFT, padx=2)
Button(button_frame, text='-', command=lambda: calculate('subtract'), width=5).pack(side=LEFT, padx=2)
Button(button_frame, text='×', command=lambda: calculate('multiply'), width=5).pack(side=LEFT, padx=2)
Button(button_frame, text='÷', command=lambda: calculate('divide'), width=5).pack(side=LEFT, padx=2)

# Result
result_label = Label(root, text='Result will appear here', font=('Arial', 12), fg='blue')
result_label.pack(pady=10)

mainloop()`
    },

    {
      id: 'ex6',
      title: 'Digital Clock',
      description: 'Create a digital clock that displays the current time and updates every second using after().',
      difficulty: 'intermediate' as const,
      starter: `from tkinter import *
import time

# Your code here`,
      solution: `from tkinter import *
import time

def update_clock():
    current_time = time.strftime('%H:%M:%S')
    clock_label['text'] = current_time
    root.after(1000, update_clock)

root = Tk()
root.title('Digital Clock')

clock_label = Label(root, text='', font=('Arial', 48), fg='blue')
clock_label.pack(pady=20)

update_clock()

mainloop()`
    },

    {
      id: 'ex7',
      title: 'Random Color Changer',
      description: 'Create a GUI with a button that changes the window background to a random color when clicked. Use after() to automatically change colors every 2 seconds.',
      difficulty: 'intermediate' as const,
      starter: `from tkinter import *
import random

# Your code here`,
      solution: `from tkinter import *
import random

def change_color():
    colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 
              'pink', 'cyan', 'light green', 'light blue']
    color = random.choice(colors)
    root.config(bg=color)
    root.after(2000, change_color)

root = Tk()
root.title('Color Changer')
root.geometry('400x300')

label = Label(root, text='Watch the colors change!', font=('Arial', 16))
label.pack(pady=50)

Button(root, text='Start', command=change_color).pack()

mainloop()`
    },

    {
      id: 'ex8',
      title: 'Guessing Game GUI',
      description: 'Create a number guessing game where the computer picks a random number 1-100 and the user tries to guess it. Show feedback (too high/too low) and count attempts.',
      difficulty: 'advanced' as const,
      starter: `from tkinter import *
import random

# Your code here`,
      solution: `from tkinter import *
import random

target = random.randint(1, 100)
attempts = 0

def check_guess():
    global attempts
    try:
        guess = int(entry.get())
        attempts += 1
        
        if guess < target:
            feedback['text'] = f'Too low! Try again. (Attempt {attempts})'
            feedback['fg'] = 'blue'
        elif guess > target:
            feedback['text'] = f'Too high! Try again. (Attempt {attempts})'
            feedback['fg'] = 'orange'
        else:
            feedback['text'] = f'Correct! You got it in {attempts} attempts!'
            feedback['fg'] = 'green'
            guess_button['state'] = 'disabled'
        
        entry.delete(0, END)
    except ValueError:
        feedback['text'] = 'Please enter a valid number'
        feedback['fg'] = 'red'

def reset_game():
    global target, attempts
    target = random.randint(1, 100)
    attempts = 0
    feedback['text'] = 'I\'m thinking of a number between 1 and 100'
    feedback['fg'] = 'black'
    guess_button['state'] = 'normal'
    entry.delete(0, END)

root = Tk()
root.title('Guessing Game')

Label(root, text='Number Guessing Game', font=('Arial', 16, 'bold')).pack(pady=10)

feedback = Label(root, text='I\'m thinking of a number between 1 and 100', 
                font=('Arial', 12))
feedback.pack(pady=10)

entry_frame = Frame(root)
entry_frame.pack(pady=10)
Label(entry_frame, text='Your guess:').pack(side=LEFT)
entry = Entry(entry_frame, width=10)
entry.pack(side=LEFT, padx=5)

button_frame = Frame(root)
button_frame.pack(pady=10)
guess_button = Button(button_frame, text='Guess', command=check_guess, width=10)
guess_button.pack(side=LEFT, padx=5)
Button(button_frame, text='New Game', command=reset_game, width=10).pack(side=LEFT, padx=5)

mainloop()`
    },

    {
      id: 'ex9',
      title: 'Todo List GUI',
      description: 'Create a todo list application where users can add tasks (with Entry + Button), view them in labels, and mark them complete.',
      difficulty: 'advanced' as const,
      starter: `from tkinter import *

# Your code here`,
      solution: `from tkinter import *

tasks = []

def add_task():
    task = task_entry.get()
    if task:
        tasks.append(task)
        update_display()
        task_entry.delete(0, END)

def remove_task(index):
    if 0 <= index < len(tasks):
        tasks.pop(index)
        update_display()

def update_display():
    # Clear existing task labels
    for widget in tasks_frame.winfo_children():
        widget.destroy()
    
    # Create new labels for each task
    for i, task in enumerate(tasks):
        task_frame = Frame(tasks_frame)
        task_frame.pack(fill=X, pady=2)
        
        Label(task_frame, text=f'{i+1}. {task}', anchor=W, width=40).pack(side=LEFT)
        Button(task_frame, text='Done', command=lambda idx=i: remove_task(idx), 
               width=8).pack(side=LEFT)

root = Tk()
root.title('Todo List')

# Input section
input_frame = Frame(root)
input_frame.pack(pady=10)
Label(input_frame, text='New Task:').pack(side=LEFT)
task_entry = Entry(input_frame, width=30)
task_entry.pack(side=LEFT, padx=5)
Button(input_frame, text='Add', command=add_task).pack(side=LEFT)

# Tasks display
Label(root, text='Your Tasks:', font=('Arial', 12, 'bold')).pack()
tasks_frame = Frame(root)
tasks_frame.pack(fill=BOTH, expand=True, padx=10, pady=10)

mainloop()`
    },

    {
      id: 'ex10',
      title: 'Animated Ball Bouncer',
      description: 'Create an animation of a ball bouncing around the window using Canvas and after(). The ball should bounce off the edges.',
      difficulty: 'advanced' as const,
      starter: `from tkinter import *

# Your code here`,
      solution: `from tkinter import *

# Ball properties
x, y = 200, 200
dx, dy = 5, 5
radius = 20

def move_ball():
    global x, y, dx, dy
    
    # Update position
    x += dx
    y += dy
    
    # Bounce off edges
    if x - radius <= 0 or x + radius >= 400:
        dx = -dx
    if y - radius <= 0 or y + radius >= 400:
        dy = -dy
    
    # Update ball position on canvas
    canvas.coords(ball, x-radius, y-radius, x+radius, y+radius)
    
    # Schedule next update (50ms = ~20 FPS)
    root.after(50, move_ball)

root = Tk()
root.title('Bouncing Ball')

canvas = Canvas(root, width=400, height=400, bg='white')
canvas.pack()

# Create the ball
ball = canvas.create_oval(x-radius, y-radius, x+radius, y+radius, 
                         fill='blue', outline='')

# Start animation
move_ball()

mainloop()`
    }
  ]
};

const CSCI133Unit9: React.FC = () => {
  return <UnitTemplate {...Unit9Data} />;
};

export default CSCI133Unit9;