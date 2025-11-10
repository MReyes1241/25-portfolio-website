// src/pages/CSCI133Unit8.tsx
import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Play,
  Code,
  BookOpen,
  Monitor,
  MousePointer,
  Layout,
  Palette,
  Zap,
  TrendingUp
} from 'lucide-react';
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

const CSCI133Unit8: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'overview' | 'lessons' | 'practice'>('overview');

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const lessons: Lesson[] = [
    {
      id: 'part1',
      title: 'Part 1: Introduction to GUI Programming',
      description: 'Understanding graphical user interfaces and creating your first tkinter window with a button.',
      content: (
        <div className={styles.lessonContent}>
          <p>
            Up until now, all our programs have run in the <strong>command line</strong> or <strong>IDLE shell</strong>.
            Users type input, hit Enter, and see text output. But most programs you use daily have a
            <strong> graphical user interface (GUI)</strong> with windows, buttons, and interactive elements.
          </p>
          <p>
            In Python, we can create GUIs using the <code className={styles.inlineCode}>tkinter</code> module.
            Tkinter is Python's standard GUI library and comes pre-installed with Python.
          </p>
          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>What You'll Learn</h4>
            <ul>
              <li>How to create windows and widgets (GUI elements)</li>
              <li>How to respond to user actions like button clicks</li>
              <li>How to build interactive programs with visual interfaces</li>
              <li>How GUIs use an "event loop" to wait for user interactions</li>
            </ul>
          </div>
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <Code className={styles.codeIcon} />
              Your First GUI Program - A Window with a Button
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`from tkinter import *

# Create the main window
root = Tk()

# Create a button widget
pick = Button(root)
pick['text'] = 'Pick a card'
pick['command'] = lambda: print('You clicked the button!')
pick.pack()

# Start the event loop
mainloop()`}</code>
            </pre>
          </div>
          <div className={styles.infoBox}>
            <h4 className={styles.infoTitle}>Understanding the Code</h4>
            <p><strong>Line 1:</strong> <code className={styles.inlineCode}>from tkinter import *</code> imports everything from the tkinter module.</p>
            <p><strong>Line 4:</strong> <code className={styles.inlineCode}>root = Tk()</code> creates the main window. This is required for every tkinter program.</p>
            <p><strong>Line 7-9:</strong> We create a Button widget and set its properties:</p>
            <ul>
              <li><code className={styles.inlineCode}>pick['text']</code> sets the label on the button</li>
              <li><code className={styles.inlineCode}>pick['command']</code> sets what happens when clicked</li>
            </ul>
            <p><strong>Line 10:</strong> <code className={styles.inlineCode}>pick.pack()</code> adds the button to the window</p>
            <p><strong>Line 13:</strong> <code className={styles.inlineCode}>mainloop()</code> starts the event loop - the program waits for user actions</p>
          </div>
          <div className={styles.warningBox}>
            <h4 className={styles.warningTitle}>Important: The Event Loop</h4>
            <p>
              The <code className={styles.inlineCode}>mainloop()</code> function is crucial. It keeps your window
              open and responsive, constantly checking for user interactions. Without it, your window would appear
              and immediately close. Think of it as a <code className={styles.inlineCode}>while True:</code> loop
              that checks "Did the user click anything? Did they type anything?" over and over.
            </p>
          </div>
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <Code className={styles.codeIcon} />
              Running Your GUI Program
            </h4>
            <p>
              To run a tkinter program, you can't just run it from IDLE like before. You need to save your
              program as a <code className={styles.inlineCode}>.py</code> file and double-click it, or run
              it from the command line. On Windows, you might want to change the extension to
              <code className={styles.inlineCode}>.pyw</code> to run it without showing a console window.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'part2',
      title: 'Part 2: The Event Loop and mainloop()',
      description: 'Understanding how GUI programs wait for and respond to user interactions.',
      content: (
        <div className={styles.lessonContent}>
          <p>
            After you create your window and widgets, you need to tell Python to wait for the user to do something.
            This is where <code className={styles.inlineCode}>mainloop()</code> comes in.
          </p>
          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>The Event Loop Concept</h4>
            <p>
              In a command-line program, code runs from top to bottom, then exits. In a GUI program, we need the
              window to stay open and responsive. The event loop continuously checks:
            </p>
            <ul>
              <li>Did the user click a button?</li>
              <li>Did the user type in a text box?</li>
              <li>Did the user close the window?</li>
              <li>Does anything need to be redrawn?</li>
            </ul>
            <p>
              When something happens, the event loop triggers the appropriate response (like calling the function
              you specified in <code className={styles.inlineCode}>command</code>).
            </p>
          </div>
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <Code className={styles.codeIcon} />
              Conceptual Event Loop
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`# This is conceptually what mainloop() does:
while True:
    if user_clicked_something:
        call_appropriate_function()
    if user_typed_something:
        handle_keyboard_input()
    if window_needs_update:
        redraw_window()
    # ... and so on`}</code>
            </pre>
          </div>
          <div className={styles.infoBox}>
            <h4 className={styles.infoTitle}>Multiple Events</h4>
            <p>
              A GUI program can respond to many different events:
            </p>
            <ul>
              <li><strong>Button clicks</strong> - User clicks a button</li>
              <li><strong>Window resize</strong> - User resizes or minimizes the window</li>
              <li><strong>Window close</strong> - User clicks the X button</li>
              <li><strong>Keyboard input</strong> - User types or presses keys</li>
              <li><strong>Timer events</strong> - Scheduled actions that happen automatically</li>
            </ul>
            <p>
              In our simple program, we only specified what happens when the button is clicked (the
              <code className={styles.inlineCode}>command</code> property). All other event responses are
              handled by default behaviors built into tkinter.
            </p>
          </div>
          <div className={styles.warningBox}>
            <h4 className={styles.warningTitle}>Running from IDLE vs Double-Click</h4>
            <p>
              <strong>From IDLE:</strong> If you run a tkinter program from within IDLE, IDLE itself is also a
              tkinter program, and they can interfere with each other. You might see strange behavior.
            </p>
            <p>
              <strong>Recommended:</strong> Save your program and run it by double-clicking the file icon, or
              run it from the terminal/command prompt. This gives it its own process and event loop.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'part3',
      title: 'Part 3: Labels and Frames - Organizing Your GUI',
      description: 'Adding text displays and organizing widgets with frames.',
      content: (
        <div className={styles.lessonContent}>
          <p>
            A single button isn't very useful. Real programs have multiple widgets organized in a logical layout.
            Two fundamental widgets for building GUIs are:
          </p>
          <ul>
            <li><strong>Label</strong> - Displays text or images (non-interactive)</li>
            <li><strong>Frame</strong> - A container that groups other widgets together</li>
          </ul>
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <Code className={styles.codeIcon} />
              Using Labels
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`from tkinter import *

root = Tk()

status = Label(root)
status['text'] = 'Shapes Frame'
status.pack()

info = Label(root)
info['text'] = 'Click a button to draw a shape'
info['fg'] = 'blue'
info['bg'] = 'light gray'
info.pack()

mainloop()`}</code>
            </pre>
          </div>
          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>Label Properties</h4>
            <ul>
              <li><code className={styles.inlineCode}>text</code></li>
              <li><code className={styles.inlineCode}>fg</code></li>
              <li><code className={styles.inlineCode}>bg</code></li>
              <li><code className={styles.inlineCode}>font</code></li>
              <li><code className={styles.inlineCode}>width/height</code></li>
            </ul>
          </div>
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <Code className={styles.codeIcon} />
              Using Frames to Organize Widgets
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`from tkinter import *

root = Tk()

status = Frame(root)
status.pack()

Label(status, text='Number of shapes:').pack(side=LEFT)
Label(status, text='0').pack(side=LEFT)

action = Frame(root)
action.pack()

Button(action, text='Circle').pack(side=LEFT)
Button(action, text='Square').pack(side=LEFT)
Button(action, text='Triangle').pack(side=LEFT)

mainloop()`}</code>
            </pre>
          </div>
          <div className={styles.infoBox}>
            <h4 className={styles.infoTitle}>The pack() Geometry Manager</h4>
            <p>
              <code className={styles.inlineCode}>pack()</code> is one way to add widgets to their parent container.
              By default, it stacks widgets vertically (top to bottom). You can change this:
            </p>
            <ul>
              <li><code className={styles.inlineCode}>pack(side=LEFT)</code> - Arrange horizontally, left to right</li>
              <li><code className={styles.inlineCode}>pack(side=RIGHT)</code> - Arrange horizontally, right to left</li>
              <li><code className={styles.inlineCode}>pack(side=TOP)</code> - Default, stack vertically downward</li>
              <li><code className={styles.inlineCode}>pack(side=BOTTOM)</code> - Stack vertically upward</li>
            </ul>
          </div>
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <Code className={styles.codeIcon} />
              Practical Example: Card Game Status
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`from tkinter import *

root = Tk()
root.title('Card Game')

status_frame = Frame(root)
status_frame.pack()

Label(status_frame, text='Cards in deck:').pack(side=LEFT)
deck_count = Label(status_frame, text='52')
deck_count.pack(side=LEFT)

card_frame = Frame(root, bg='green', width=200, height=300)
card_frame.pack()

action_frame = Frame(root)
action_frame.pack()

Button(action_frame, text='Draw Card').pack(side=LEFT)
Button(action_frame, text='Shuffle').pack(side=LEFT)

mainloop()`}</code>
            </pre>
          </div>
          <div className={styles.warningBox}>
            <h4 className={styles.warningTitle}>Don't Mix pack() and grid()</h4>
            <p>
              Tkinter has multiple geometry managers (<code className={styles.inlineCode}>pack</code>,
              <code className={styles.inlineCode}>grid</code>, <code className={styles.inlineCode}>place</code>).
              <strong>Never mix them in the same container!</strong> Pick one and stick with it for all widgets
              in that container, or your program will crash.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'part4',
      title: 'Part 4: Entry Widgets and Getting User Input',
      description: 'Creating text input fields and retrieving user-entered data.',
      content: (
        <div className={styles.lessonContent}>
          <p>
            So far, our GUIs can only display information. To make them truly interactive, we need widgets that
            accept user input. The <strong>Entry widget</strong> is a single-line text input field - like a
            text box on a website.
          </p>
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <Code className={styles.codeIcon} />
              Basic Entry Widget
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`from tkinter import *

root = Tk()

name_input = Entry(root)
name_input.pack()

def greet():
    user_name = name_input.get()
    print(f'Hello, {user_name}!')

Button(root, text='Greet Me', command=greet).pack()

mainloop()`}</code>
            </pre>
          </div>
          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>Entry Widget Methods</h4>
            <ul>
              <li><code className={styles.inlineCode}>entry.get()</code> - Returns the current text as a string</li>
              <li><code className={styles.inlineCode}>entry.insert(0, 'text')</code> - Inserts text at position 0</li>
              <li><code className={styles.inlineCode}>entry.delete(0, END)</code> - Clears all text</li>
            </ul>
          </div>
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <Code className={styles.codeIcon} />
              Entry with Label - Building a Form
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`from tkinter import *

root = Tk()
root.title('Login Form')

frame = Frame(root)
frame.pack()

Label(frame, text='Username:').pack(side=LEFT)
username = Entry(frame)
username.pack(side=LEFT)

def login():
    name = username.get()
    if name:
        print(f'Logging in as {name}')
    else:
        print('Please enter a username')

Button(root, text='Login', command=login).pack()

mainloop()`}</code>
            </pre>
          </div>
          <div className={styles.infoBox}>
            <h4 className={styles.infoTitle}>Accessing Entry Values in Functions</h4>
            <p>
              Notice that the entry widget (<code className={styles.inlineCode}>username</code>) is created in
              the main program, but we access it inside the <code className={styles.inlineCode}>login()</code>
              function. This works because:
            </p>
            <ul>
              <li>The entry widget exists in the outer scope</li>
              <li>The function can access variables from outer scopes</li>
              <li>The function isn't called until the button is clicked</li>
            </ul>
          </div>
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <Code className={styles.codeIcon} />
              Calculator Example - Multiple Entries
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`from tkinter import *

root = Tk()
root.title('Simple Calculator')

frame1 = Frame(root)
frame1.pack()
Label(frame1, text='Number 1:').pack(side=LEFT)
num1 = Entry(frame1)
num1.pack(side=LEFT)

frame2 = Frame(root)
frame2.pack()
Label(frame2, text='Number 2:').pack(side=LEFT)
num2 = Entry(frame2)
num2.pack(side=LEFT)

result = Label(root, text='Result will appear here')
result.pack()

def add_numbers():
    try:
        a = float(num1.get())
        b = float(num2.get())
        result['text'] = f'Result: {a + b}'
    except ValueError:
        result['text'] = 'Please enter valid numbers'

Button(root, text='Add', command=add_numbers).pack()

mainloop()`}</code>
            </pre>
          </div>
          <div className={styles.warningBox}>
            <h4 className={styles.warningTitle}>Remember: Entry.get() Returns Strings</h4>
            <p>
              <code className={styles.inlineCode}>entry.get()</code> always returns a string, even if the user
              typed numbers. Convert with <code className={styles.inlineCode}>int()</code> or <code className={styles.inlineCode}>float()</code>.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'part5',
      title: 'Part 5: Updating GUI Elements - Building a Stock Trading Game',
      description: 'Dynamically updating labels and creating interactive applications with real-time displays.',
      content: (
        <div className={styles.lessonContent}>
          <p>
            Static GUIs are boring. Real applications need to update based on user actions. In this part, we'll
            build a stock trading game that updates displays in real-time as the user buys and sells shares.
          </p>
          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>Key Concept: Updating Widget Properties</h4>
            <p>
              You can change any widget property at any time by reassigning it:
            </p>
            <pre className={styles.codeBlock}>
              <code>{`label['text'] = 'New text'
button['bg'] = 'red'
entry.delete(0, END)`}</code>
            </pre>
          </div>
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <Code className={styles.codeIcon} />
              Stock Trading Game - Complete Program
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`from tkinter import *

numberShares = 0
account = 10000
sharePrice = 97

def update():
    shares['text'] = f'You own {numberShares} shares'
    cash['text'] = f'Cash balance: \${account:.0f}'
    totalWorth = account + numberShares * sharePrice
    worth['text'] = f'Total worth: \${totalWorth:.0f}'
    price['text'] = f'\${sharePrice:.2f}/share'

def doBuy():
    global account, numberShares
    if account >= 10 * sharePrice:
        numberShares += 10
        account -= 10 * sharePrice
        update()

def doSell():
    global account, numberShares
    if numberShares >= 10:
        numberShares -= 10
        account += 10 * sharePrice
        update()

root = Tk()
root.title('Stock Trading Game')

status = Frame(root)
status.pack()

shares = Label(status, text='You own 0 shares')
shares.pack()
cash = Label(status, text='Cash balance: $10000')
cash.pack()
worth = Label(status, text='Total worth: $10000')
worth.pack()
price = Label(status, text='$97.00/share')
price.pack()

action = Frame(root)
action.pack()

sell = Button(action, text='Sell')
sell['command'] = doSell
sell.pack(side=LEFT)

buy = Button(action, text='Buy')
buy['command'] = doBuy
buy.pack(side=LEFT)

mainloop()`}</code>
            </pre>
          </div>
          <div className={styles.infoBox}>
            <h4 className={styles.infoTitle}>Breaking Down the Update Pattern</h4>
            <p>
              This program uses a common GUI pattern:
            </p>
            <ol>
              <li><strong>State variables</strong> (<code className={styles.inlineCode}>numberShares</code>,
                  <code className={styles.inlineCode}>account</code>) store the program's data</li>
              <li><strong>Display widgets</strong> (<code className={styles.inlineCode}>shares</code>,
                  <code className={styles.inlineCode}>cash</code>) show the data to the user</li>
              <li><strong>Action functions</strong> (<code className={styles.inlineCode}>doBuy</code>,
                  <code className={styles.inlineCode}>doSell</code>) modify the state</li>
              <li><strong>Update function</strong> (<code className={styles.inlineCode}>update</code>)
                  refreshes all displays to match the current state</li>
            </ol>
          </div>
          <div className={styles.warningBox}>
            <h4 className={styles.warningTitle}>Global Variables in GUI Programs</h4>
            <p>
              In the <code className={styles.inlineCode}>doBuy()</code> and <code className={styles.inlineCode}>doSell()</code>
              functions, we use <code className={styles.inlineCode}>global account, numberShares</code>. This tells
              Python we want to modify the global variables, not create local ones with the same names.
            </p>
            <p>
              We don't need global for the widget variables because we're just modifying their properties.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'part6',
      title: 'Part 6: Scheduled Actions with after()',
      description: 'Creating animations and automatic updates using timer events.',
      content: (
        <div className={styles.lessonContent}>
          <p>
            The <code className={styles.inlineCode}>after()</code> method lets
            us schedule functions to run after a delay.
          </p>
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <Code className={styles.codeIcon} />
              Basic after() Usage
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`from tkinter import *

def say_hello():
    print('Hello!')

root = Tk()

root.after(2000, say_hello)

mainloop()`}</code>
            </pre>
          </div>
          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>after() Syntax</h4>
            <pre className={styles.codeBlock}>
              <code>{`widget.after(delay_milliseconds, function_to_call)
root.after(2000, fn)
label.after(500, fn)`}</code>
            </pre>
            <ul>
              <li>1000 milliseconds = 1 second</li>
              <li>500 milliseconds = 0.5 seconds</li>
              <li>5000 milliseconds = 5 seconds</li>
            </ul>
          </div>
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <Code className={styles.codeIcon} />
              Creating Repeating Actions - Stock Price Changes
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`from tkinter import *
import random

numberShares = 0
account = 10000
sharePrice = 97

def update():
    shares['text'] = f'You own {numberShares} shares'
    cash['text'] = f'Cash balance: \${account:.0f}'
    totalWorth = account + numberShares * sharePrice
    worth['text'] = f'Total worth: \${totalWorth:.0f}'
    price['text'] = f'\${sharePrice:.2f}/share'

def changePrice():
    global sharePrice
    sharePrice += random.random() * 4 - 2
    update()
    root.after(2000, changePrice)

root = Tk()`}</code>
            </pre>
          </div>
          <div className={styles.infoBox}>
            <h4 className={styles.infoTitle}>Understanding the Recursive Pattern</h4>
            <pre className={styles.codeBlock}>
              <code>{`root.after(2000, changePrice)`}</code>
            </pre>
          </div>
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <Code className={styles.codeIcon} />
              Complete Stock Game with Automatic Price Changes
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`from tkinter import *
import random

numberShares = 0
account = 10000
sharePrice = 97

def update():
    shares['text'] = f'You own {numberShares} shares'
    cash['text'] = f'Cash balance: \${account:.0f}'
    totalWorth = account + numberShares * sharePrice
    worth['text'] = f'Total worth: \${totalWorth:.0f}'
    price['text'] = f'\${sharePrice:.2f}/share'

def doBuy():
    global account, numberShares
    if account >= 10 * sharePrice:
        numberShares += 10
        account -= 10 * sharePrice
        update()

def doSell():
    global account, numberShares
    if numberShares >= 10:
        numberShares -= 10
        account += 10 * sharePrice
        update()

def changePrice():
    global sharePrice
    sharePrice += random.random() * 4 - 2
    update()
    root.after(2000, changePrice)

root = Tk()
status = Frame(root)
status.pack()

shares = Label(status)
cash = Label(status)
worth = Label(status)
price = Label(status)

shares.pack()
cash.pack()
worth.pack()
price.pack()

action = Frame(root)
action.pack()

sell = Button(action, text='sell', command=doSell)
sell.pack(side=LEFT)

buy = Button(action, text='buy', command=doBuy)
buy.pack(side=LEFT)

changePrice()

mainloop()`}</code>
            </pre>
          </div>
        </div>
      )
    },
    {
      id: 'part7',
      title: 'Part 7: Scope and Global Variables in GUI Programs',
      description: 'Understanding variable scope in event handlers and when to use global.',
      content: (
        <div className={styles.lessonContent}>
          <p>
            GUI programs often need to share data between different functions (event handlers). This brings up
            the question of <strong>variable scope</strong>.
          </p>
          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>Three Types of Variable Scope in GUI Programs</h4>
            <ol>
              <li>Local variables</li>
              <li>Global variables</li>
              <li>Widget variables</li>
            </ol>
          </div>
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <Code className={styles.codeIcon} />
              Example: Variable Scope Issues
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`from tkinter import *

def nextYear(year):
    year += 1
    print('***', year, '***')

def decade(start):
    for year in range(start, start+10):
        nextYear(year)

year = 1832
nextYear(year)
print()
decade(1492)
print()
print(year)`}</code>
            </pre>
          </div>
          <div className={styles.infoBox}>
            <h4 className={styles.infoTitle}>What Happens?</h4>
            <p>
              The local variable changes do not affect the outer variable unless you reassign with <code className={styles.inlineCode}>global</code>.
            </p>
          </div>
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <Code className={styles.codeIcon} />
              Using global to Modify Module-Level Variables
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`from tkinter import *

def nextYear(year):
    year += 1
    print('***', year, '***')

def makeItBeNextYear():
    global year
    year += 1

year = 1832
nextYear(year)
print(year)
makeItBeNextYear()
print(year)`}</code>
            </pre>
          </div>
          <div className={styles.warningBox}>
            <h4 className={styles.warningTitle}>When to Use global</h4>
            <p>Use it only when reassigning a module-level variable.</p>
          </div>
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <Code className={styles.codeIcon} />
              GUI Example: When You Need global
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`from tkinter import *

account = 10000
numberShares = 0
sharePrice = 97

shares_label = None
cash_label = None

def doBuy():
    global account, numberShares
    if account >= 10 * sharePrice:
        account = account - 10 * sharePrice
        numberShares = numberShares + 10
        shares_label['text'] = f'Shares: {numberShares}'
        cash_label['text'] = f'Cash: \${account:.0f}'

root = Tk()
shares_label = Label(root)
shares_label.pack()
cash_label = Label(root)
cash_label.pack()

Button(root, text='Buy', command=doBuy).pack()

mainloop()`}</code>
            </pre>
          </div>
          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>Summary: Global Variables in GUI Programs</h4>
            <ul>
              <li>Use global for reassignment</li>
              <li>Modifying widget properties does not require global</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  const exercises: Exercise[] = [
    {
      title: 'Hello World GUI',
      description: 'Create a simple GUI with a label that says "Hello, World!" and a button that prints a message when clicked.',
      difficulty: 'beginner',
      starter: `from tkinter import *

root = Tk()
root.title('Hello World')

label = Label(root, text='Hello, World!')
label.pack()

def say_hello():
    pass

button = Button(root, text='Click Me', command=say_hello)
button.pack()

mainloop()`,
      solution: `from tkinter import *

root = Tk()
root.title('Hello World')

label = Label(root, text='Hello, World!')
label.pack()

def say_hello():
    print('Button clicked!')

button = Button(root, text='Click Me', command=say_hello)
button.pack()

mainloop()`
    },
    {
      title: 'Name Greeter',
      description: 'Create a GUI with an Entry widget for the user\'s name and a button that displays "Hello, [name]!" in a label when clicked.',
      difficulty: 'beginner',
      starter: `from tkinter import *

root = Tk()
root.title('Name Greeter')

Label(root, text='Enter your name:').pack()
name_entry = Entry(root)
name_entry.pack()

greeting = Label(root, text='')
greeting.pack()

def greet():
    pass

Button(root, text='Greet Me', command=greet).pack()

mainloop()`,
      solution: `from tkinter import *

root = Tk()
root.title('Name Greeter')

Label(root, text='Enter your name:').pack()
name_entry = Entry(root)
name_entry.pack()

greeting = Label(root, text='')
greeting.pack()

def greet():
    name = name_entry.get()
    if name:
        greeting['text'] = f'Hello, {name}!'
    else:
        greeting['text'] = 'Please enter a name'

Button(root, text='Greet Me', command=greet).pack()

mainloop()`
    },
    {
      title: 'Simple Counter',
      description: 'Create a counter GUI with a label showing a number (starting at 0) and buttons to increment and decrement the count.',
      difficulty: 'beginner',
      starter: `from tkinter import *

count = 0

def update_display():
    pass

def increment():
    pass

def decrement():
    pass

root = Tk()
root.title('Counter')

label = Label(root, text=f'Count: {count}', font=('Arial', 24))
label.pack()

frame = Frame(root)
frame.pack()

Button(frame, text='-', command=decrement, width=10).pack(side=LEFT)
Button(frame, text='+', command=increment, width=10).pack(side=LEFT)

mainloop()`,
      solution: `from tkinter import *

count = 0

def update_display():
    label['text'] = f'Count: {count}'

def increment():
    global count
    count += 1
    update_display()

def decrement():
    global count
    count -= 1
    update_display()

root = Tk()
root.title('Counter')

label = Label(root, text=f'Count: {count}', font=('Arial', 24))
label.pack()

frame = Frame(root)
frame.pack()

Button(frame, text='-', command=decrement, width=10).pack(side=LEFT)
Button(frame, text='+', command=increment, width=10).pack(side=LEFT)

mainloop()`
    },
    {
      title: 'Temperature Converter',
      description: 'Create a temperature converter with entries for Celsius and Fahrenheit, and buttons to convert between them. Formula: F = C * 9/5 + 32',
      difficulty: 'intermediate',
      starter: `from tkinter import *

def celsius_to_fahrenheit():
    pass

def fahrenheit_to_celsius():
    pass

root = Tk()
root.title('Temperature Converter')

c_frame = Frame(root)
c_frame.pack()
Label(c_frame, text='Celsius:').pack(side=LEFT)
celsius_entry = Entry(c_frame, width=15)
celsius_entry.pack(side=LEFT)
Button(c_frame, text='→ F', command=celsius_to_fahrenheit).pack(side=LEFT)

f_frame = Frame(root)
f_frame.pack()
Label(f_frame, text='Fahrenheit:').pack(side=LEFT)
fahrenheit_entry = Entry(f_frame, width=15)
fahrenheit_entry.pack(side=LEFT)
Button(f_frame, text='→ C', command=fahrenheit_to_celsius).pack(side=LEFT)

result = Label(root, text='Enter a temperature and click a button', fg='blue')
result.pack()

mainloop()`,
      solution: `from tkinter import *

def celsius_to_fahrenheit():
    try:
        c = float(celsius_entry.get())
        f = c * 9/5 + 32
        fahrenheit_entry.delete(0, END)
        fahrenheit_entry.insert(0, f'{f:.2f}')
        result['text'] = f'{c}°C = {f:.2f}°F'
    except ValueError:
        result['text'] = 'Invalid input'

def fahrenheit_to_celsius():
    try:
        f = float(fahrenheit_entry.get())
        c = (f - 32) * 5/9
        celsius_entry.delete(0, END)
        celsius_entry.insert(0, f'{c:.2f}')
        result['text'] = f'{f}°F = {c:.2f}°C'
    except ValueError:
        result['text'] = 'Invalid input'

root = Tk()
root.title('Temperature Converter')

c_frame = Frame(root)
c_frame.pack()
Label(c_frame, text='Celsius:').pack(side=LEFT)
celsius_entry = Entry(c_frame, width=15)
celsius_entry.pack(side=LEFT)
Button(c_frame, text='→ F', command=celsius_to_fahrenheit).pack(side=LEFT)

f_frame = Frame(root)
f_frame.pack()
Label(f_frame, text='Fahrenheit:').pack(side=LEFT)
fahrenheit_entry = Entry(f_frame, width=15)
fahrenheit_entry.pack(side=LEFT)
Button(f_frame, text='→ C', command=fahrenheit_to_celsius).pack(side=LEFT)

result = Label(root, text='Enter a temperature and click a button', fg='blue')
result.pack()

mainloop()`
    },
    {
      title: 'Simple Calculator',
      description: 'Create a calculator with two number entries and buttons for add, subtract, multiply, and divide operations.',
      difficulty: 'intermediate',
      starter: `from tkinter import *

def calculate(operation):
    pass

root = Tk()
root.title('Calculator')

frame1 = Frame(root)
frame1.pack()
Label(frame1, text='Number 1:').pack(side=LEFT)
entry1 = Entry(frame1, width=15)
entry1.pack(side=LEFT)

frame2 = Frame(root)
frame2.pack()
Label(frame2, text='Number 2:').pack(side=LEFT)
entry2 = Entry(frame2, width=15)
entry2.pack(side=LEFT)

button_frame = Frame(root)
button_frame.pack()

Button(button_frame, text='+', command=lambda: calculate('add'), width=5).pack(side=LEFT)
Button(button_frame, text='-', command=lambda: calculate('subtract'), width=5).pack(side=LEFT)
Button(button_frame, text='×', command=lambda: calculate('multiply'), width=5).pack(side=LEFT)
Button(button_frame, text='÷', command=lambda: calculate('divide'), width=5).pack(side=LEFT)

result_label = Label(root, text='Enter numbers and select operation', font=('Arial', 12))
result_label.pack()

mainloop()`,
      solution: `from tkinter import *

def calculate(operation):
    try:
        num1 = float(entry1.get())
        num2 = float(entry2.get())
        if operation == 'add':
            result = num1 + num2
            op_symbol = '+'
        elif operation == 'subtract':
            result = num1 - num2
            op_symbol = '-'
        elif operation == 'multiply':
            result = num1 * num2
            op_symbol = '×'
        elif operation == 'divide':
            if num2 == 0:
                result_label['text'] = 'Error: Division by zero'
                return
            result = num1 / num2
            op_symbol = '÷'
        result_label['text'] = f'{num1} {op_symbol} {num2} = {result}'
    except ValueError:
        result_label['text'] = 'Error: Invalid input'

root = Tk()
root.title('Calculator')

frame1 = Frame(root)
frame1.pack()
Label(frame1, text='Number 1:').pack(side=LEFT)
entry1 = Entry(frame1, width=15)
entry1.pack(side=LEFT)

frame2 = Frame(root)
frame2.pack()
Label(frame2, text='Number 2:').pack(side=LEFT)
entry2 = Entry(frame2, width=15)
entry2.pack(side=LEFT)

button_frame = Frame(root)
button_frame.pack()

Button(button_frame, text='+', command=lambda: calculate('add'), width=5).pack(side=LEFT)
Button(button_frame, text='-', command=lambda: calculate('subtract'), width=5).pack(side=LEFT)
Button(button_frame, text='×', command=lambda: calculate('multiply'), width=5).pack(side=LEFT)
Button(button_frame, text='÷', command=lambda: calculate('divide'), width=5).pack(side=LEFT)

result_label = Label(root, text='Enter numbers and select operation', font=('Arial', 12))
result_label.pack()

mainloop()`
    },
    {
      title: 'Digital Clock',
      description: 'Create a digital clock that displays the current time and updates every second using after().',
      difficulty: 'intermediate',
      starter: `from tkinter import *
from datetime import datetime

def update_time():
    pass

root = Tk()
root.title('Digital Clock')

time_label = Label(root, font=('Arial', 48), fg='blue')
time_label.pack(padx=20, pady=20)

update_time()

mainloop()`,
      solution: `from tkinter import *
from datetime import datetime

def update_time():
    current_time = datetime.now().strftime('%H:%M:%S')
    time_label['text'] = current_time
    root.after(1000, update_time)

root = Tk()
root.title('Digital Clock')

time_label = Label(root, font=('Arial', 48), fg='blue')
time_label.pack(padx=20, pady=20)

update_time()

mainloop()`
    },
    {
      title: 'Random Color Changer',
      description: 'Create a GUI with a button that changes the window background to a random color when clicked. Use after() to automatically change colors every 2 seconds.',
      difficulty: 'intermediate',
      starter: `from tkinter import *
import random

def change_color():
    pass

def auto_change():
    pass

root = Tk()
root.title('Color Changer')

label = Label(root, text='Click button or wait for auto-change', 
              font=('Arial', 14), padx=20, pady=20)
label.pack()

Button(root, text='Change Color Now', command=change_color).pack()

auto_change()

mainloop()`,
      solution: `from tkinter import *
import random

def change_color():
    r = random.randint(0, 255)
    g = random.randint(0, 255)
    b = random.randint(0, 255)
    color = f'#{r:02x}{g:02x}{b:02x}'
    root['bg'] = color
    label['bg'] = color
    label['text'] = f'Color: {color}'

def auto_change():
    change_color()
    root.after(2000, auto_change)

root = Tk()
root.title('Color Changer')

label = Label(root, text='Click button or wait for auto-change', 
              font=('Arial', 14), padx=20, pady=20)
label.pack()

Button(root, text='Change Color Now', command=change_color).pack()

auto_change()

mainloop()`
    },
    {
      title: 'Guessing Game GUI',
      description: 'Create a number guessing game where the computer picks a random number 1-100 and the user tries to guess it. Show feedback (too high/too low) and count attempts.',
      difficulty: 'advanced',
      starter: `from tkinter import *
import random

def new_game():
    pass

def check_guess():
    pass

target = random.randint(1, 100)
attempts = 0

root = Tk()
root.title('Number Guessing Game')

Label(root, text='Guess the Number!', font=('Arial', 16, 'bold')).pack(pady=10)
attempts_label = Label(root, text='Attempts: 0', font=('Arial', 12))
attempts_label.pack()

entry_frame = Frame(root)
entry_frame.pack(pady=10)
Label(entry_frame, text='Your guess:').pack(side=LEFT)
guess_entry = Entry(entry_frame, width=10)
guess_entry.pack(side=LEFT)

button_frame = Frame(root)
button_frame.pack(pady=5)
Button(button_frame, text='Submit Guess', command=check_guess, width=15).pack(side=LEFT, padx=5)
Button(button_frame, text='New Game', command=new_game, width=15).pack(side=LEFT, padx=5)

feedback = Label(root, text='Guess a number between 1 and 100', 
                font=('Arial', 12), wraplength=300, pady=10)
feedback.pack()

mainloop()`,
      solution: `from tkinter import *
import random

def new_game():
    global target, attempts
    target = random.randint(1, 100)
    attempts = 0
    feedback['text'] = 'Guess a number between 1 and 100'
    guess_entry.delete(0, END)
    attempts_label['text'] = 'Attempts: 0'

def check_guess():
    global attempts
    try:
        guess = int(guess_entry.get())
        attempts += 1
        attempts_label['text'] = f'Attempts: {attempts}'
        if guess < target:
            feedback['text'] = f'{guess} is too low! Try again.'
            feedback['fg'] = 'blue'
        elif guess > target:
            feedback['text'] = f'{guess} is too high! Try again.'
            feedback['fg'] = 'red'
        else:
            feedback['text'] = f'Correct! You won in {attempts} attempts!'
            feedback['fg'] = 'green'
        guess_entry.delete(0, END)
    except ValueError:
        feedback['text'] = 'Please enter a valid number'
        feedback['fg'] = 'red'

target = random.randint(1, 100)
attempts = 0

root = Tk()
root.title('Number Guessing Game')

Label(root, text='Guess the Number!', font=('Arial', 16, 'bold')).pack(pady=10)
attempts_label = Label(root, text='Attempts: 0', font=('Arial', 12))
attempts_label.pack()

entry_frame = Frame(root)
entry_frame.pack(pady=10)
Label(entry_frame, text='Your guess:').pack(side=LEFT)
guess_entry = Entry(entry_frame, width=10)
guess_entry.pack(side=LEFT)

button_frame = Frame(root)
button_frame.pack(pady=5)
Button(button_frame, text='Submit Guess', command=check_guess, width=15).pack(side=LEFT, padx=5)
Button(button_frame, text='New Game', command=new_game, width=15).pack(side=LEFT, padx=5)

feedback = Label(root, text='Guess a number between 1 and 100', 
                font=('Arial', 12), wraplength=300, pady=10)
feedback.pack()

mainloop()`
    },
    {
      title: 'Todo List GUI',
      description: 'Create a todo list application where users can add tasks (Entry + Button), view them in labels, and mark them as complete.',
      difficulty: 'advanced',
      starter: `from tkinter import *

tasks = []

def add_task():
    pass

def toggle_task(index):
    pass

def delete_task(index):
    pass

def update_display():
    pass

root = Tk()
root.title('Todo List')

add_frame = Frame(root)
add_frame.pack(pady=10)

Label(add_frame, text='New Task:').pack(side=LEFT)
task_entry = Entry(add_frame, width=30)
task_entry.pack(side=LEFT, padx=5)
Button(add_frame, text='Add', command=add_task).pack(side=LEFT)

count_label = Label(root, text='Total tasks: 0 | Completed: 0')
count_label.pack()

tasks_frame = Frame(root)
tasks_frame.pack(fill='both', expand=True, padx=10, pady=10)

mainloop()`,
      solution: `from tkinter import *

tasks = []

def add_task():
    task_text = task_entry.get()
    if task_text:
        tasks.append({'text': task_text, 'done': False})
        task_entry.delete(0, END)
        update_display()

def toggle_task(index):
    tasks[index]['done'] = not tasks[index]['done']
    update_display()

def delete_task(index):
    tasks.pop(index)
    update_display()

def update_display():
    for widget in tasks_frame.winfo_children():
        widget.destroy()
    for i, task in enumerate(tasks):
        frame = Frame(tasks_frame, relief='raised', borderwidth=1)
        frame.pack(fill='x', padx=5, pady=2)
        check_text = '✓' if task['done'] else '○'
        Button(frame, text=check_text, width=2, command=lambda idx=i: toggle_task(idx)).pack(side=LEFT)
        style = {'font': ('Arial', 12)}
        if task['done']:
            style['fg'] = 'gray'
        Label(frame, text=task['text'], **style).pack(side=LEFT, padx=10)
        Button(frame, text='X', fg='red', command=lambda idx=i: delete_task(idx)).pack(side=RIGHT)
    count_label['text'] = f'Total tasks: {len(tasks)} | Completed: {sum(1 for t in tasks if t["done"])}'

root = Tk()
root.title('Todo List')

add_frame = Frame(root)
add_frame.pack(pady=10)

Label(add_frame, text='New Task:').pack(side=LEFT)
task_entry = Entry(add_frame, width=30)
task_entry.pack(side=LEFT, padx=5)
Button(add_frame, text='Add', command=add_task).pack(side=LEFT)

count_label = Label(root, text='Total tasks: 0 | Completed: 0')
count_label.pack()

tasks_frame = Frame(root)
tasks_frame.pack(fill='both', expand=True, padx=10, pady=10)

mainloop()`
    },
    {
      title: 'Animated Ball Bouncer',
      description: 'Create a canvas with a ball that bounces around the screen automatically using after(). The ball should bounce off the walls.',
      difficulty: 'advanced',
      starter: `from tkinter import *

x, y = 50, 50
dx, dy = 3, 2
ball_size = 20

def move_ball():
    pass

root = Tk()
root.title('Bouncing Ball')

canvas = Canvas(root, width=400, height=400, bg='white')
canvas.pack()

ball = canvas.create_oval(x, y, x + ball_size, y + ball_size, fill='red')

move_ball()

mainloop()`,
      solution: `from tkinter import *

x, y = 50, 50
dx, dy = 3, 2
ball_size = 20

def move_ball():
    global x, y, dx, dy
    x += dx
    y += dy
    if x <= 0 or x >= 380:
        dx = -dx
    if y <= 0 or y >= 380:
        dy = -dy
    canvas.coords(ball, x, y, x + ball_size, y + ball_size)
    root.after(16, move_ball)

root = Tk()
root.title('Bouncing Ball')

canvas = Canvas(root, width=400, height=400, bg='white')
canvas.pack()

ball = canvas.create_oval(x, y, x + ball_size, y + ball_size, fill='red')

move_ball()

mainloop()`
    }
  ];

  const renderExercises = () => {
    const beginnerEx = exercises.filter(e => e.difficulty === 'beginner');
    const intermediateEx = exercises.filter(e => e.difficulty === 'intermediate');
    const advancedEx = exercises.filter(e => e.difficulty === 'advanced');

    const renderExerciseGroup = (title: string, exercises: Exercise[], icon: React.ReactElement) => (
      <div className={styles.exerciseSection}>
        <div className={styles.exerciseSectionHeader}>
          {icon}
          <h3>{title}</h3>
        </div>
        <div className={styles.exerciseGrid}>
          {exercises.map((exercise, index) => (
            <div key={index} className={styles.exerciseCard}>
              <div className={styles.exerciseCardHeader}>
                <h4>{exercise.title}</h4>
                <span className={`${styles.difficultyBadge} ${styles[exercise.difficulty]}`}>
                  {exercise.difficulty}
                </span>
              </div>
              <p className={styles.exerciseDescription}>{exercise.description}</p>
              <button
                onClick={() => toggleSection(`exercise-${title}-${index}`)}
                className={styles.expandButton}
              >
                {expandedSections[`exercise-${title}-${index}`] ? 'Hide' : 'Show'} Starter Code
                {expandedSections[`exercise-${title}-${index}`] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
              {expandedSections[`exercise-${title}-${index}`] && (
                <div className={styles.codeSection}>
                  <div className={styles.codeExample}>
                    <h5 className={styles.codeTitle}>
                      <Code className={styles.codeIcon} />
                      Starter Code
                    </h5>
                    <pre className={styles.codeBlock}>
                      <code>{exercise.starter}</code>
                    </pre>
                  </div>
                  <button
                    onClick={() => toggleSection(`solution-${title}-${index}`)}
                    className={styles.solutionButton}
                  >
                    {expandedSections[`solution-${title}-${index}`] ? 'Hide' : 'Show'} Solution
                  </button>
                  {expandedSections[`solution-${title}-${index}`] && (
                    <div className={styles.codeExample}>
                      <h5 className={styles.codeTitle}>
                        <Zap className={styles.codeIcon} />
                        Solution
                      </h5>
                      <pre className={styles.codeBlock}>
                        <code>{exercise.solution}</code>
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <div className={styles.practiceContent}>
        {renderExerciseGroup('Beginner Exercises', beginnerEx, <Play className={styles.sectionIcon} />)}
        {renderExerciseGroup('Intermediate Exercises', intermediateEx, <TrendingUp className={styles.sectionIcon} />)}
        {renderExerciseGroup('Advanced Exercises', advancedEx, <Zap className={styles.sectionIcon} />)}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Unit 8: Graphical User Interfaces with tkinter</h1>
          <p className={styles.subtitle}>
            Learn to build interactive programs with buttons, windows, and graphical displays using Python's tkinter library
          </p>
        </div>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'overview' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <BookOpen size={20} />
          Overview
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'lessons' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('lessons')}
        >
          <Code size={20} />
          Lessons
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'practice' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('practice')}
        >
          <Play size={20} />
          Practice
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'overview' && (
          <div className={styles.overviewContent}>
            <div className={styles.learningObjectives}>
              <h2 className={styles.sectionTitle}>
                <Monitor className={styles.sectionIcon} />
                What You'll Learn
              </h2>
              <div className={styles.objectivesGrid}>
                <div className={styles.objectiveCard}>
                  <Monitor className={styles.objectiveIcon} />
                  <h3>GUI Fundamentals</h3>
                  <p>Understand how graphical interfaces work, from event loops to widget hierarchies.</p>
                </div>
                <div className={styles.objectiveCard}>
                  <MousePointer className={styles.objectiveIcon} />
                  <h3>Interactive Widgets</h3>
                  <p>Create buttons, labels, entry fields, and respond to user clicks and input.</p>
                </div>
                <div className={styles.objectiveCard}>
                  <Layout className={styles.objectiveIcon} />
                  <h3>Layout Management</h3>
                  <p>Organize widgets using frames and the pack() geometry manager for professional layouts.</p>
                </div>
                <div className={styles.objectiveCard}>
                  <Palette className={styles.objectiveIcon} />
                  <h3>Dynamic Updates</h3>
                  <p>Update displays in real-time, create animations, and use scheduled events with after().</p>
                </div>
              </div>
            </div>

            <div className={styles.prerequisites}>
              <h2 className={styles.sectionTitle}>Prerequisites</h2>
              <ul className={styles.prereqList}>
                <li>Functions and variable scope (Unit 7)</li>
                <li>Lists and dictionaries (Unit 3)</li>
                <li>Control structures (if/else, loops) (Unit 1)</li>
                <li>Basic understanding of modules and imports</li>
              </ul>
            </div>

            <div className={styles.realWorldApplications}>
              <h2 className={styles.sectionTitle}>Real-World Applications</h2>
              <div className={styles.applicationsList}>
                <div className={styles.applicationCard}>
                  <h3>Desktop Applications</h3>
                  <p>Build complete desktop programs with professional user interfaces - calculators, text editors, games, and productivity tools.</p>
                </div>
                <div className={styles.applicationCard}>
                  <h3>Data Visualization</h3>
                  <p>Create interactive charts and graphs that users can explore and manipulate in real-time.</p>
                </div>
                <div className={styles.applicationCard}>
                  <h3>Control Panels</h3>
                  <p>Design control interfaces for scientific equipment, automation systems, or monitoring dashboards.</p>
                </div>
                <div className={styles.applicationCard}>
                  <h3>Educational Tools</h3>
                  <p>Develop interactive learning applications, simulations, and tutorials with visual feedback.</p>
                </div>
              </div>
            </div>

            <div className={styles.topicsOverview}>
              <h2 className={styles.sectionTitle}>Topics Covered</h2>
              <div className={styles.topicsList}>
                {lessons.map((lesson, index) => (
                  <div key={lesson.id} className={styles.topicCard}>
                    <div className={styles.topicNumber}>{index + 1}</div>
                    <div className={styles.topicInfo}>
                      <h3>{lesson.title}</h3>
                      <p>{lesson.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'lessons' && (
          <div className={styles.lessonsContent}>
            {lessons.map((lesson) => (
              <div key={lesson.id} className={styles.lessonSection}>
                <button
                  onClick={() => toggleSection(lesson.id)}
                  className={styles.lessonHeader}
                >
                  <h3 className={styles.lessonTitle}>{lesson.title}</h3>
                  <div className={styles.lessonHeaderRight}>
                    <span className={styles.lessonDescription}>{lesson.description}</span>
                    {expandedSections[lesson.id] ? (
                      <ChevronDown className={styles.chevron} />
                    ) : (
                      <ChevronRight className={styles.chevron} />
                    )}
                  </div>
                </button>
                {expandedSections[lesson.id] && lesson.content}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'practice' && renderExercises()}
      </div>
    </div>
  );
};

export default CSCI133Unit8;