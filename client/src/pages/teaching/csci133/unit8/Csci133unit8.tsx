import React from 'react';
import UnitTemplate, { type UnitTemplateProps, type LessonData } from '../UnitTemplate';
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

const escapeTpl = (s?: string) => (s ?? '').replace(/\$\{/g, '\\${');

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
          <h4 className={styles.codeTitle}>Your First GUI Program - A Window with a Button</h4>
          <pre className={styles.codeBlock}>
            <code>{`from tkinter import *

root = Tk()
pick = Button(root)
pick['text'] = 'Pick a card'
pick['command'] = lambda: print('You clicked the button!')
pick.pack()
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
          <h4 className={styles.codeTitle}>Running Your GUI Program</h4>
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
          <h4 className={styles.codeTitle}>Conceptual Event Loop</h4>
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
            <li><strong>Button clicks</strong></li>
            <li><strong>Window resize</strong></li>
            <li><strong>Window close</strong></li>
            <li><strong>Keyboard input</strong></li>
            <li><strong>Timer events</strong></li>
          </ul>
          <p>
            In our simple program, we only specified what happens when the button is clicked.
          </p>
        </div>

        <div className={styles.warningBox}>
          <h4 className={styles.warningTitle}>Running from IDLE vs Double-Click</h4>
          <p>
            If you run a tkinter program from within IDLE, IDLE itself is also a tkinter program, and they can interfere.
          </p>
          <p>
            Save your program and run it by double-clicking the file icon, or run it from the terminal/command prompt.
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
        </p>

        <ul>
          <li><strong>Label</strong> - Displays text or images</li>
          <li><strong>Frame</strong> - A container that groups other widgets together</li>
        </ul>

        <div className={styles.codeExample}>
          <h4 className={styles.codeTitle}>Using Labels</h4>
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
          <h4 className={styles.codeTitle}>Using Frames to Organize Widgets</h4>
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
          <ul>
            <li><code className={styles.inlineCode}>pack(side=LEFT)</code></li>
            <li><code className={styles.inlineCode}>pack(side=RIGHT)</code></li>
            <li><code className={styles.inlineCode}>pack(side=TOP)</code></li>
            <li><code className={styles.inlineCode}>pack(side=BOTTOM)</code></li>
          </ul>
        </div>

        <div className={styles.codeExample}>
          <h4 className={styles.codeTitle}>Practical Example: Card Game Status</h4>
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
          <p>Pick one geometry manager per container.</p>
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
          The Entry widget is a single-line text input field.
        </p>

        <div className={styles.codeExample}>
          <h4 className={styles.codeTitle}>Basic Entry Widget</h4>
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
            <li><code className={styles.inlineCode}>entry.get()</code></li>
            <li><code className={styles.inlineCode}>entry.insert(0, 'text')</code></li>
            <li><code className={styles.inlineCode}>entry.delete(0, END)</code></li>
          </ul>
        </div>

        <div className={styles.codeExample}>
          <h4 className={styles.codeTitle}>Entry with Label - Building a Form</h4>
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
          <ul>
            <li>The entry widget exists in outer scope</li>
            <li>The handler runs after the widget exists</li>
          </ul>
        </div>

        <div className={styles.codeExample}>
          <h4 className={styles.codeTitle}>Calculator Example - Multiple Entries</h4>
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
          <h4 className={styles.warningTitle}>Remember</h4>
          <p><code className={styles.inlineCode}>entry.get()</code> returns a string.</p>
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
          Build a stock trading game that updates displays in real-time as the user buys and sells shares.
        </p>

        <div className={styles.conceptBox}>
          <h4 className={styles.conceptTitle}>Key Concept: Updating Widget Properties</h4>
          <pre className={styles.codeBlock}>
            <code>{`label['text'] = 'New text'
button['bg'] = 'red'
entry.delete(0, END)`}</code>
          </pre>
        </div>

        <div className={styles.codeExample}>
          <h4 className={styles.codeTitle}>Stock Trading Game - Complete Program</h4>
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

sell = Button(action, text='Sell', command=doSell)
sell.pack(side=LEFT)

buy = Button(action, text='Buy', command=doBuy)
buy.pack(side=LEFT)
mainloop()`}</code>
          </pre>
        </div>

        <div className={styles.infoBox}>
          <h4 className={styles.infoTitle}>Update Pattern</h4>
          <ol>
            <li>State variables</li>
            <li>Display widgets</li>
            <li>Action functions</li>
            <li>Central update()</li>
          </ol>
        </div>

        <div className={styles.warningBox}>
          <h4 className={styles.warningTitle}>Global Variables</h4>
          <p>Use <code className={styles.inlineCode}>global</code> only when reassigning.</p>
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
          Use <code className={styles.inlineCode}>after()</code> to schedule functions to run later.
        </p>

        <div className={styles.codeExample}>
          <h4 className={styles.codeTitle}>Basic after() Usage</h4>
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
            <code>{`widget.after(delay_ms, fn)
root.after(2000, fn)
label.after(500, fn)`}</code>
          </pre>
        </div>

        <div className={styles.codeExample}>
          <h4 className={styles.codeTitle}>Creating Repeating Actions - Stock Price Changes</h4>
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
    root.after(2000, changePrice)`}</code>
          </pre>
        </div>

        <div className={styles.infoBox}>
          <h4 className={styles.infoTitle}>Recursive Timer Pattern</h4>
          <pre className={styles.codeBlock}>
            <code>{`root.after(2000, changePrice)`}</code>
          </pre>
        </div>

        <div className={styles.codeExample}>
          <h4 className={styles.codeTitle}>Complete Stock Game with Automatic Price Changes</h4>
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
status = Frame(root); status.pack()
shares = Label(status); cash = Label(status); worth = Label(status); price = Label(status)
shares.pack(); cash.pack(); worth.pack(); price.pack()

action = Frame(root); action.pack()
Button(action, text='sell', command=doSell).pack(side=LEFT)
Button(action, text='buy', command=doBuy).pack(side=LEFT)

changePrice()
mainloop()`}</code>
          </pre>
        </div>

        <div className={styles.warningBox}>
          <h4 className={styles.warningTitle}>Notes About after()</h4>
          <ul>
            <li>The event loop must be running</li>
            <li>Timing is not exact</li>
            <li>Use <code className={styles.inlineCode}>after_cancel</code> to stop</li>
          </ul>
        </div>

        <div className={styles.codeExample}>
          <h4 className={styles.codeTitle}>Bonus: Canceling Scheduled Actions</h4>
          <pre className={styles.codeBlock}>
            <code>{`def changePrice():
    global sharePrice, timer_id
    sharePrice += random.random() * 4 - 2
    update()
    timer_id = root.after(2000, changePrice)

def stopChanges():
    global timer_id
    if timer_id:
        root.after_cancel(timer_id)

Button(root, text='Stop Price Changes', command=stopChanges).pack()`}</code>
          </pre>
        </div>

        <div className={styles.conceptBox}>
          <h4 className={styles.conceptTitle}>Common Uses for after()</h4>
          <ul>
            <li>Animations</li>
            <li>Auto-updates</li>
            <li>Game loops</li>
            <li>Countdowns</li>
            <li>Delayed validation</li>
          </ul>
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
        <p>GUI programs often need to share data between different functions.</p>

        <div className={styles.conceptBox}>
          <h4 className={styles.conceptTitle}>Three Types of Variable Scope</h4>
          <ol>
            <li>Local</li>
            <li>Global</li>
            <li>Widget references</li>
          </ol>
        </div>

        <div className={styles.codeExample}>
          <h4 className={styles.codeTitle}>Example: Variable Scope Issues</h4>
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
          <p>The main variable remains unchanged unless reassigned.</p>
        </div>

        <div className={styles.codeExample}>
          <h4 className={styles.codeTitle}>Using global to Modify Module-Level Variables</h4>
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
          <ul>
            <li>Only when reassigning a module-level variable</li>
          </ul>
        </div>

        <div className={styles.codeExample}>
          <h4 className={styles.codeTitle}>GUI Example: When You Need global</h4>
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
shares_label = Label(root); shares_label.pack()
cash_label = Label(root); cash_label.pack()
Button(root, text='Buy', command=doBuy).pack()
mainloop()`}</code>
          </pre>
        </div>

        <div className={styles.conceptBox}>
          <h4 className={styles.conceptTitle}>Summary</h4>
          <ul>
            <li>Use global for reassignment</li>
            <li>Modifying widget properties does not require global</li>
          </ul>
        </div>

        <div className={styles.infoBox}>
          <h4 className={styles.infoTitle}>Alternative: Dictionary State</h4>
          <pre className={styles.codeBlock}>
            <code>{`game_state = {'account': 10000, 'shares': 0, 'price': 97}

def doBuy():
    if game_state['account'] >= 10 * game_state['price']:
        game_state['account'] -= 10 * game_state['price']
        game_state['shares'] += 10`}</code>
          </pre>
        </div>
      </div>
    )
  }
];

const exercises: Exercise[] = [
  {
    title: 'Hello World GUI',
    description: 'Create a window with a label and a button that prints to the console.',
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
    description: 'Use an Entry for the name and show a greeting in a label.',
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
name_entry = Entry(root); name_entry.pack()

greeting = Label(root, text=''); greeting.pack()

def greet():
    name = name_entry.get()
    greeting['text'] = f'Hello, {name}!' if name else 'Please enter a name'

Button(root, text='Greet Me', command=greet).pack()

mainloop()`
  },
  {
    title: 'Simple Counter',
    description: 'A counter with + and − buttons and a large display.',
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

frame = Frame(root); frame.pack()
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

frame = Frame(root); frame.pack()
Button(frame, text='-', command=decrement, width=10).pack(side=LEFT)
Button(frame, text='+', command=increment, width=10).pack(side=LEFT)

mainloop()`
  },
  {
    title: 'Temperature Converter',
    description: 'Convert between Celsius and Fahrenheit with two entries.',
    difficulty: 'intermediate',
    starter: `from tkinter import *

def c_to_f():
    pass

def f_to_c():
    pass

root = Tk()
root.title('Temperature Converter')

c_frame = Frame(root); c_frame.pack()
Label(c_frame, text='Celsius:').pack(side=LEFT)
celsius_entry = Entry(c_frame, width=15); celsius_entry.pack(side=LEFT)
Button(c_frame, text='→ F', command=c_to_f).pack(side=LEFT)

f_frame = Frame(root); f_frame.pack()
Label(f_frame, text='Fahrenheit:').pack(side=LEFT)
fahrenheit_entry = Entry(f_frame, width=15); fahrenheit_entry.pack(side=LEFT)
Button(f_frame, text='→ C', command=f_to_c).pack(side=LEFT)

result = Label(root, text='Enter a value to convert')
result.pack()

mainloop()`,
    solution: `from tkinter import *

def c_to_f():
    try:
        c = float(celsius_entry.get())
        f = c * 9/5 + 32
        fahrenheit_entry.delete(0, END)
        fahrenheit_entry.insert(0, f'{f:.2f}')
        result['text'] = f'{c}°C = {f:.2f}°F'
    except ValueError:
        result['text'] = 'Invalid input'

def f_to_c():
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

c_frame = Frame(root); c_frame.pack()
Label(c_frame, text='Celsius:').pack(side=LEFT)
celsius_entry = Entry(c_frame, width=15); celsius_entry.pack(side=LEFT)
Button(c_frame, text='→ F', command=c_to_f).pack(side=LEFT)

f_frame = Frame(root); f_frame.pack()
Label(f_frame, text='Fahrenheit:').pack(side=LEFT)
fahrenheit_entry = Entry(f_frame, width=15); fahrenheit_entry.pack(side=LEFT)
Button(f_frame, text='→ C', command=f_to_c).pack(side=LEFT)

result = Label(root, text='Enter a value to convert')
result.pack()

mainloop()`
  },
  {
    title: 'Simple Calculator',
    description: 'Two numbers with buttons for +, −, ×, ÷.',
    difficulty: 'intermediate',
    starter: `from tkinter import *

def calculate(op):
    pass

root = Tk()
root.title('Calculator')

f1 = Frame(root); f1.pack()
Label(f1, text='Number 1:').pack(side=LEFT)
e1 = Entry(f1, width=12); e1.pack(side=LEFT)

f2 = Frame(root); f2.pack()
Label(f2, text='Number 2:').pack(side=LEFT)
e2 = Entry(f2, width=12); e2.pack(side=LEFT)

btns = Frame(root); btns.pack()
Button(btns, text='+', width=5, command=lambda: calculate('add')).pack(side=LEFT)
Button(btns, text='-', width=5, command=lambda: calculate('sub')).pack(side=LEFT)
Button(btns, text='×', width=5, command=lambda: calculate('mul')).pack(side=LEFT)
Button(btns, text='÷', width=5, command=lambda: calculate('div')).pack(side=LEFT)

out = Label(root, text='Enter numbers and choose an operation'); out.pack()

mainloop()`,
    solution: `from tkinter import *

def calculate(op):
    try:
        a = float(e1.get()); b = float(e2.get())
        if op == 'add':
            r, sym = a + b, '+'
        elif op == 'sub':
            r, sym = a - b, '-'
        elif op == 'mul':
            r, sym = a * b, '×'
        else:
            if b == 0:
                out['text'] = 'Division by zero'
                return
            r, sym = a / b, '÷'
        out['text'] = f'{a} {sym} {b} = {r}'
    except ValueError:
        out['text'] = 'Invalid input'

root = Tk()
root.title('Calculator')

f1 = Frame(root); f1.pack()
Label(f1, text='Number 1:').pack(side=LEFT)
e1 = Entry(f1, width=12); e1.pack(side=LEFT)

f2 = Frame(root); f2.pack()
Label(f2, text='Number 2:').pack(side=LEFT)
e2 = Entry(f2, width=12); e2.pack(side=LEFT)

btns = Frame(root); btns.pack()
Button(btns, text='+', width=5, command=lambda: calculate('add')).pack(side=LEFT)
Button(btns, text='-', width=5, command=lambda: calculate('sub')).pack(side=LEFT)
Button(btns, text='×', width=5, command=lambda: calculate('mul')).pack(side=LEFT)
Button(btns, text='÷', width=5, command=lambda: calculate('div')).pack(side=LEFT)

out = Label(root, text='Enter numbers and choose an operation'); out.pack()

mainloop()`
  },
  {
    title: 'Digital Clock',
    description: 'Display the current time and update every second with after().',
    difficulty: 'intermediate',
    starter: `from tkinter import *
from datetime import datetime

def update_time():
    pass

root = Tk()
root.title('Digital Clock')

time_label = Label(root, font=('Arial', 48))
time_label.pack(padx=20, pady=20)

update_time()
mainloop()`,
    solution: `from tkinter import *
from datetime import datetime

def update_time():
    time_label['text'] = datetime.now().strftime('%H:%M:%S')
    root.after(1000, update_time)

root = Tk()
root.title('Digital Clock')

time_label = Label(root, font=('Arial', 48))
time_label.pack(padx=20, pady=20)

update_time()
mainloop()`
  },
  {
    title: 'Random Color Changer',
    description: 'Change the background to a random color; also auto-change every 2 seconds.',
    difficulty: 'intermediate',
    starter: `from tkinter import *
import random

def change_color():
    pass

def auto_change():
    pass

root = Tk()
root.title('Color Changer')

label = Label(root, text='Click the button or wait 2s', padx=20, pady=20)
label.pack()

Button(root, text='Change Color Now', command=change_color).pack()

auto_change()
mainloop()`,
    solution: `from tkinter import *
import random

def change_color():
    r = random.randint(0,255); g = random.randint(0,255); b = random.randint(0,255)
    color = f'#{r:02x}{g:02x}{b:02x}'
    root['bg'] = color
    label['bg'] = color
    label['text'] = f'Color: {color}'

def auto_change():
    change_color()
    root.after(2000, auto_change)

root = Tk()
root.title('Color Changer')

label = Label(root, text='Click the button or wait 2s', padx=20, pady=20)
label.pack()

Button(root, text='Change Color Now', command=change_color).pack()

auto_change()
mainloop()`
  },
  {
    title: 'Guessing Game GUI',
    description: 'Computer picks 1–100; user guesses with feedback and attempt count.',
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
attempts_label = Label(root, text='Attempts: 0'); attempts_label.pack()

entry_frame = Frame(root); entry_frame.pack(pady=10)
Label(entry_frame, text='Your guess:').pack(side=LEFT)
guess_entry = Entry(entry_frame, width=10); guess_entry.pack(side=LEFT)

button_frame = Frame(root); button_frame.pack(pady=5)
Button(button_frame, text='Submit Guess', command=check_guess, width=15).pack(side=LEFT, padx=5)
Button(button_frame, text='New Game', command=new_game, width=15).pack(side=LEFT, padx=5)

feedback = Label(root, text='Guess a number between 1 and 100', pady=10)
feedback.pack()

mainloop()`,
    solution: `from tkinter import *
import random

def new_game():
    global target, attempts
    target = random.randint(1, 100)
    attempts = 0
    feedback['text'] = 'Guess a number between 1 and 100'
    attempts_label['text'] = 'Attempts: 0'
    guess_entry.delete(0, END)

def check_guess():
    global attempts
    try:
        guess = int(guess_entry.get())
        attempts += 1
        attempts_label['text'] = f'Attempts: {attempts}'
        if guess < target:
            feedback['text'] = f'{guess} is too low!'
            feedback['fg'] = 'blue'
        elif guess > target:
            feedback['text'] = f'{guess} is too high!'
            feedback['fg'] = 'red'
        else:
            feedback['text'] = f'Correct! You won in {attempts} attempts!'
            feedback['fg'] = 'green'
        guess_entry.delete(0, END)
    except ValueError:
        feedback['text'] = 'Enter a valid integer'
        feedback['fg'] = 'red'

target = random.randint(1, 100)
attempts = 0

root = Tk()
root.title('Number Guessing Game')

Label(root, text='Guess the Number!', font=('Arial', 16, 'bold')).pack(pady=10)
attempts_label = Label(root, text='Attempts: 0'); attempts_label.pack()

entry_frame = Frame(root); entry_frame.pack(pady=10)
Label(entry_frame, text='Your guess:').pack(side=LEFT)
guess_entry = Entry(entry_frame, width=10); guess_entry.pack(side=LEFT)

button_frame = Frame(root); button_frame.pack(pady=5)
Button(button_frame, text='Submit Guess', command=check_guess, width=15).pack(side=LEFT, padx=5)
Button(button_frame, text='New Game', command=new_game, width=15).pack(side=LEFT, padx=5)

feedback = Label(root, text='Guess a number between 1 and 100', pady=10)
feedback.pack()

mainloop()`
  },
  {
    title: 'Todo List GUI',
    description: 'Add tasks, toggle complete, and delete.',
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

add_frame = Frame(root); add_frame.pack(pady=10)
Label(add_frame, text='New Task:').pack(side=LEFT)
task_entry = Entry(add_frame, width=30); task_entry.pack(side=LEFT, padx=5)
Button(add_frame, text='Add', command=add_task).pack(side=LEFT)

count_label = Label(root, text='Total tasks: 0 | Completed: 0'); count_label.pack()

tasks_frame = Frame(root); tasks_frame.pack(fill='both', expand=True, padx=10, pady=10)

mainloop()`,
    solution: `from tkinter import *

tasks = []

def add_task():
    t = task_entry.get()
    if t:
        tasks.append({'text': t, 'done': False})
        task_entry.delete(0, END)
        update_display()

def toggle_task(i):
    tasks[i]['done'] = not tasks[i]['done']
    update_display()

def delete_task(i):
    tasks.pop(i)
    update_display()

def update_display():
    for w in tasks_frame.winfo_children():
        w.destroy()
    for i, t in enumerate(tasks):
        row = Frame(tasks_frame, relief='raised', borderwidth=1); row.pack(fill='x', padx=5, pady=2)
        Button(row, text=('✓' if t['done'] else '○'), width=2, command=lambda idx=i: toggle_task(idx)).pack(side=LEFT)
        style = {'font': ('Arial', 12)}
        if t['done']:
            style['fg'] = 'gray'
        Label(row, text=t['text'], **style).pack(side=LEFT, padx=10)
        Button(row, text='X', fg='red', command=lambda idx=i: delete_task(idx)).pack(side=RIGHT)
    count_label['text'] = f'Total tasks: {len(tasks)} | Completed: {sum(1 for t in tasks if t["done"])}'

root = Tk()
root.title('Todo List')

add_frame = Frame(root); add_frame.pack(pady=10)
Label(add_frame, text='New Task:').pack(side=LEFT)
task_entry = Entry(add_frame, width=30); task_entry.pack(side=LEFT, padx=5)
Button(add_frame, text='Add', command=add_task).pack(side=LEFT)

count_label = Label(root, text='Total tasks: 0 | Completed: 0'); count_label.pack()

tasks_frame = Frame(root); tasks_frame.pack(fill='both', expand=True, padx=10, pady=10)

mainloop()`
  },
  {
    title: 'Animated Ball Bouncer',
    description: 'Canvas with a ball that bounces using after().',
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
    x += dx; y += dy
    if x <= 0 or x >= 380: dx = -dx
    if y <= 0 or y >= 380: dy = -dy
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

const data: UnitTemplateProps = {
  unitTitle: 'Unit 8: Graphical User Interfaces with tkinter',
  unitSubtitle: 'Learn to build interactive programs with buttons, windows, and graphical displays using Python’s tkinter library',
  overview: {
    intro:
      'Learn the foundations of building interactive desktop programs with tkinter: widgets, layout, event handling, and timed updates.',
    objectives: [
      'Understand GUI structure: windows, widgets, event loop',
      'Create interactive widgets and callbacks',
      'Organize layout with Frame and pack()',
      'Update widgets dynamically',
      'Schedule actions and animations with after()'
    ],
    prerequisites: [
      'Functions and variable scope',
      'Loops and conditionals',
      'Lists and dictionaries',
      'Modules and imports'
    ],
    whyTitle: 'Why GUI Programming Matters',
    whyBullets: [
      'Enables user-friendly tools beyond the command line',
      'Introduces event-driven programming patterns',
      'Builds intuition for state, callbacks, and timers'
    ],
    progress: lessons.map(l => ({ title: l.title, description: l.description }))
  },
  lessons: lessons.map<LessonData>((l) => ({
    id: l.id,
    title: l.title,
    summary: l.description,
    body: l.content
  })),
  exercises: exercises.map((e, i) => ({
    id: `ex-${i + 1}`,
    title: e.title,
    description: e.description,
    difficulty: e.difficulty,
    starter: escapeTpl(e.starter),
    solution: escapeTpl(e.solution)
  }))
};

const Unit8Page: React.FC = () => <UnitTemplate {...data} />;

export default Unit8Page;
