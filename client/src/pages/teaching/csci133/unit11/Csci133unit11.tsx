import React from 'react';
import UnitTemplate from '../UnitTemplate';
import type { 
  OverviewData, 
  LessonData, 
  ExerciseData 
} from '../UnitTemplate';

const Unit11: React.FC = () => {
  const overview: OverviewData = {
    intro: "Learn to create interactive graphical applications with Python's tkinter library by building a complete arcade game from scratch. This unit combines event-driven programming, animation, collision detection, and user interaction to create engaging visual programs.",
    objectives: [
      "Create windows and graphical user interfaces using tkinter",
      "Draw shapes and graphics on a canvas widget",
      "Implement animation using the after method for scheduling",
      "Handle mouse and keyboard events to create interactive programs",
      "Use coordinate systems and collision detection for game logic",
      "Apply performance counters for timing and game mechanics",
      "Integrate multiple GUI components (buttons, labels, canvas)",
      "Organize code structure for event-driven applications"
    ],
    prerequisites: [
      "Unit 9: Object-Oriented Programming - Understanding classes and methods",
      "Unit 7: Functions and Modules - Importing modules and using the random module",
      "Unit 4: Control Flow - Conditionals and boolean logic"
    ],
    whyTitle: "Why Learn GUI Programming?",
    whyBullets: [
      "**Visual Interactivity**: Move beyond command-line programs to create applications people can see and interact with",
      "**Real-World Applications**: Most software people use daily has a graphical interface—from games to productivity tools",
      "**Event-Driven Programming**: Learn a fundamental paradigm used in game development, web applications, and mobile apps",
      "**Immediate Feedback**: GUI programs provide instant visual confirmation, making programming more engaging and fun",
      "**Career Skills**: GUI programming is essential for software development, game design, and application engineering",
      "**Creative Expression**: Combine programming logic with visual design to create unique, personalized applications"
    ],
    topics: [
      "Creating windows with Tk() and organizing layouts",
      "Drawing on canvas widgets: rectangles, ovals, and other shapes",
      "Understanding coordinate systems and positioning",
      "Implementing animation with root.after()",
      "Handling click events and user input",
      "Managing game state and collision detection",
      "Using global variables in event-driven programs",
      "Working with time.perf_counter() for timing",
      "Building complete game mechanics from components"
    ],
    progress: [
      { title: "Part 1: Basic GUI Setup", description: "Windows, canvas, and buttons" },
      { title: "Part 2: Drawing Shapes", description: "Canvas drawing methods" },
      { title: "Part 3: Random Placement", description: "Using random and choice" },
      { title: "Part 4: Tracking Objects", description: "Getting coordinates from canvas" },
      { title: "Part 5: Animation Basics", description: "Moving objects with after()" },
      { title: "Part 6: Event Handling", description: "Processing mouse clicks" },
      { title: "Part 7: Advanced Events", description: "Multiple event types" },
      { title: "Part 8: Collision Detection", description: "Checking positions and boundaries" },
      { title: "Part 9: Time Display", description: "Performance timing" },
      { title: "Part 10: Complete Integration", description: "Bringing it all together" }
    ]
  };

  const lessons: LessonData[] = [
    {
      id: '1',
      title: "Part 1: Setting Up the Basic GUI",
      summary: "Create your first tkinter window with a canvas for drawing and a button to control the program.",
      paragraphs: [
        "Let's write an arcade game. We'll start with a simple GUI—a playing field and a button to start the game.",
        "Every tkinter program needs a root window created with Tk(). This is the main container for all your GUI elements.",
        "The Canvas widget provides a drawing surface where we can create shapes, images, and animations. Think of it as a blank sheet of paper where you can draw anything you want.",
        "Widgets need to be displayed using a geometry manager. The pack() method is the simplest—it just adds the widget to the window and sizes it appropriately.",
        "The Button widget responds to clicks. We connect it to a function using the command parameter. When the button is clicked, that function will be called automatically.",
        "The mainloop() function starts the event loop—it keeps the window open and responsive to user actions. Without it, the window would appear and immediately close."
      ],
      code: [
        {
          title: "Basic GUI Structure",
          code: `from tkinter import *

def startGame():  # not yet defined
    return

root = Tk()

field = Canvas(root, width=300, height=300, bg='light blue')
field.pack()

startButton = Button(root, command=startGame, text='Go')
startButton.pack()

mainloop()`
        },
        {
          title: "Alternative: Using Keyword Argument Format",
          code: `# The same canvas can be created using explicit keyword arguments
field = Canvas(root)
field['width'] = 300
field['height'] = 300
field['bg'] = 'light blue'`
        }
      ],
      tips: [
        "The playing field is a light blue canvas widget that's 300 pixels wide and 300 pixels high",
        "We haven't defined what startGame does yet, but we need to include it to avoid errors",
        "Python comments start with # and are ignored by the interpreter—use them to leave notes",
        "All values are given as keyword arguments when the canvas is created"
      ],
      warnings: [
        "If you forget mainloop(), your window will appear briefly and then close immediately",
        "Make sure to define functions before you reference them, even if they're just placeholders"
      ],
      infos: [
        "**Why Comments Matter**: In this course, the text provides extensive commentary explaining the code. Normal programs—outside the context of a course—should always be carefully commented. Comments help others (and future you!) understand what the code does and why.",
        "**The Event Loop**: The mainloop() function is what makes GUI programs different from regular programs. Instead of running top to bottom, GUI programs wait for events (clicks, key presses) and respond to them."
      ]
    },
    {
      id: '2',
      title: "Part 2: Drawing on the Canvas",
      summary: "Learn how to use canvas drawing methods to create shapes like rectangles and understand the coordinate system.",
      paragraphs: [
        "Now that we have a canvas, we can draw on it. For example, adding the following line at the end of our code (before mainloop) draws a red square at the lower left-hand corner of the playing field:",
        "The create_rectangle method is part of the canvas widget. Like most canvas drawing methods, it takes numerical arguments that specify a bounding box for the drawn object—the area where it should be placed.",
        "For a rectangle, we indicate the bounding box by giving the location of its upper-left-hand and lower-right-hand corners. Locations are specified by measuring in pixels across and down from the upper-left-hand corner of the canvas.",
        "Our goal is a 25-pixel by 25-pixel square. The canvas starts at (0, 0) in the upper-left corner. To position a square in the lower-left corner, we calculate: if upper-left is at (0, 275), then lower-right will be at (25, 300).",
        "Think of the canvas as graph paper. The x-coordinate increases as you move right, and the y-coordinate increases as you move down—note this is opposite from mathematical graphs where y increases upward!"
      ],
      code: [
        {
          title: "Drawing a Rectangle",
          code: `field.create_rectangle(0, 275, 25, 300, fill='red')`
        },
        {
          title: "Complete Program with Drawing",
          code: `from tkinter import *

def startGame():
    return

root = Tk()

field = Canvas(root, width=300, height=300, bg='light blue')
field.pack()

startButton = Button(root, command=startGame, text='Go')
startButton.pack()

# Draw a red goal area in the lower-left corner
field.create_rectangle(0, 275, 25, 300, fill='red')

mainloop()`
        }
      ],
      tips: [
        "Canvas coordinates start at (0, 0) in the upper-left corner",
        "X increases to the right, Y increases downward (opposite of mathematical graphs)",
        "The bounding box for create_rectangle takes: (x1, y1, x2, y2) where (x1,y1) is upper-left and (x2,y2) is lower-right",
        "Try changing the coordinates to see how it affects the position and size!"
      ],
      warnings: [
        "Don't confuse canvas coordinates with mathematical coordinates—Y goes down, not up",
        "If coordinates don't make sense (like x2 < x1), you might get unexpected results"
      ],
      infos: [
        "**Coordinate Systems**: Different graphics libraries use different coordinate systems. Tkinter (and most GUI libraries) put (0,0) at the top-left because that's how screens are typically scanned. Mathematical plots put (0,0) at the bottom-left. Always check which convention your library uses!",
        "**Why Pixels?**: GUI programming uses pixels because that's how screens are built—a grid of tiny colored dots. A 300×300 canvas contains 90,000 pixels arranged in a grid."
      ]
    },
    {
      id: '3',
      title: "Part 3: Random Placement and the Choice Function",
      summary: "Use the random module to place the ball at a random starting location within defined boundaries.",
      paragraphs: [
        "The ball in our game will be a blue circle just small enough to fit into a 10-pixel by 10-pixel square bounding box. We want to start it at a random location within certain limits.",
        "The ball needs to stay on the playing field (within the 300 × 300 canvas). Since it's 10 pixels across, the upper-left corner must be no more than 289 over and 289 down. We don't want the ball off the canvas!",
        "Additionally, if the upper-left corner of the bounding box is, say, 125 over and 205 down, then the lower-right corner will be 10 pixels farther in each direction—135 over and 215 down.",
        "We'll use the choice function from the random module to pick random numbers. This function takes a list and returns one randomly selected element.",
        "By creating lists with range() and converting them to lists, we can pick any number from a range. For example, list(range(290)) creates [0, 1, 2, ..., 289], and choice picks one randomly."
      ],
      code: [
        {
          title: "Importing and Using Random Choice",
          code: `from random import choice

# This picks a random number from 0 to 289
upperLeftX = choice(list(range(290)))
upperLeftY = choice(list(range(290)))`
        },
        {
          title: "Modified startGame Function",
          code: `from tkinter import *
from random import choice

def startGame():  # so far just places ball at random
    global ball
    upperLeftX = choice(list(range(290)))
    upperLeftY = choice(list(range(290)))
    ball = field.create_oval(upperLeftX, upperLeftY,
                            upperLeftX+10, upperLeftY+10,
                            fill='blue')

root = Tk()

field = Canvas(root, width=300, height=300, bg='light blue')
field.pack()

startButton = Button(root, command=startGame, text='Go')
startButton.pack()

mainloop()`
        }
      ],
      tips: [
        "from tkinter import * makes all names from tkinter available without prefixes",
        "from random import choice imports just the choice function",
        "The ball is created with create_oval—when width and height are equal, it's a circle",
        "We use global ball so the variable is accessible outside the function",
        "Following standard mathematical practice, we use x for horizontal and y for vertical measurements"
      ],
      warnings: [
        "The line from random import choice imports just one function. If we want more (like randint), we'd need to import those too, or use import random",
        "Forgetting global means the ball variable only exists inside startGame and can't be accessed elsewhere"
      ],
      infos: [
        "**Why Global Variables?**: In event-driven programs, different functions need to access shared data. The ball needs to be accessed by both startGame (which creates it) and animate (which moves it). Global variables are one way to share data between functions, though later you'll learn other approaches using classes.",
        "**Variable Naming Conventions**: Following mathematics conventions, we use x for 'over' and y for 'down'. This makes the code more intuitive for anyone familiar with coordinate systems."
      ]
    },
    {
      id: '4',
      title: "Part 4: Getting Ball Position with coords()",
      summary: "Learn how to retrieve the position of canvas objects and calculate their center coordinates.",
      paragraphs: [
        "When we created our ball, we assigned a name to it. We can pass this name to various useful canvas methods.",
        "The coords canvas method returns an object that can be converted to a list of the four numbers specifying the bounding box. This lets us find out where the ball currently is.",
        "Notice that we return the averages of the two horizontal numbers and of the two vertical numbers. If the top-left of the bounding box is 100 over and the bottom-right is 110 over, then the center is 105 over—the average of 100 and 110.",
        "This calculation gives us the position of the center of the ball, not the corner. The center is more intuitive for game logic—we usually think about where the ball is, not where its bounding box corner is."
      ],
      code: [
        {
          title: "The ballPosition Function",
          code: `def ballPosition():
    x1, y1, x2, y2 = list(field.coords(ball))
    return [(x1+x2)/2, (y1+y2)/2]`
        },
        {
          title: "Testing ballPosition in startGame",
          code: `def startGame():  # so far just places ball at random
    global ball
    upperLeftX = choice(list(range(290)))
    upperLeftY = choice(list(range(290)))
    ball = field.create_oval(upperLeftX, upperLeftY,
                            upperLeftX+10, upperLeftY+10,
                            fill='blue')
    print(ballPosition())`
        }
      ],
      tips: [
        "The coords method returns the bounding box: [x1, y1, x2, y2]",
        "We unpack these four values directly into separate variables",
        "Averaging the x-coordinates gives the horizontal center position",
        "Averaging the y-coordinates gives the vertical center position"
      ],
      warnings: [
        "Don't confuse the bounding box corners with the center position",
        "coords returns the actual bounding box values, which may have changed if the object moved"
      ],
      infos: [
        "**Why Return Averages?**: The center of the ball is more useful for game logic than the corner of its bounding box. When checking if the ball hit something, we care about where the ball actually is (its center), not where its invisible bounding box starts.",
        "**Coordinate Math**: For a 10-pixel ball, if the upper-left is at (125, 205), the lower-right is at (135, 215). The center is at ((125+135)/2, (205+215)/2) = (130, 210)."
      ]
    },
    {
      id: '5',
      title: "Part 5: Animating the Ball with move()",
      summary: "Implement smooth animation using the canvas move method and root.after() for scheduling repeated updates.",
      paragraphs: [
        "To get our ball in motion, we'll use the canvas move method. It takes the name of an object drawn on a canvas and two numbers—the number of pixels to move it over and the number to move it down.",
        "The animate function will move the ball 5 pixels horizontally and 0 pixels vertically each time it's called. This creates smooth horizontal motion.",
        "The key to animation is calling animate repeatedly. We use root.after(100, animate) which schedules animate to be called again after 100 milliseconds (1/10 of a second).",
        "Now clicking the 'Go' button starts a series of calls to animate, one every 1/10 of a second. Each call moves the ball 5 pixels over and 0 pixels down, then schedules another call. The ball glides rightward off the field!"
      ],
      code: [
        {
          title: "Simple Animation",
          code: `def animate():
    field.move(ball, 5, 0)
    root.after(100, animate)

def startGame():  # still needs lots of work
    global ball
    upperLeftX = choice(list(range(290)))
    upperLeftY = choice(list(range(290)))
    ball = field.create_oval(upperLeftX, upperLeftY,
                            upperLeftX+10, upperLeftY+10,
                            fill='blue')
    animate()`
        }
      ],
      tips: [
        "move(object, dx, dy) moves an object by dx pixels horizontally and dy pixels vertically",
        "Positive dx moves right, negative dx moves left",
        "Positive dy moves down, negative dy moves up",
        "after(milliseconds, function) schedules a function to be called later",
        "1000 milliseconds = 1 second, so 100 milliseconds = 1/10 second"
      ],
      warnings: [
        "The ball will move off the screen unless we add boundary checking!",
        "Each call to animate schedules another call—this creates an infinite loop of animation"
      ],
      infos: [
        "**The Animation Loop**: This pattern—do something, then schedule yourself to run again—is fundamental to animation and game programming. It creates smooth motion by updating the display many times per second.",
        "**Why after() Instead of a Loop?**: We can't just use a while loop because that would block the GUI from responding. The after() method lets tkinter handle other events (like button clicks) between animation frames."
      ]
    },
    {
      id: '6',
      title: "Part 6: Handling Click Events",
      summary: "Respond to user mouse clicks by binding event handlers to the canvas widget.",
      paragraphs: [
        "Now our ball is moving, but we can't control it. What we'd like to be able to do is click anywhere on the field and have a rectangle appear at that position.",
        "Our only experience so far in handling user events is with the command attribute of the button widget. Buttons are designed to be clicked, so it's natural they provide a specialized way to indicate what function to call.",
        "In general, though, a widget may have to respond to any of a large number of different events. The universal approach to associating (or binding) functions to events is with a call using the following pattern:",
        "widget.bind('<EventType>', function)",
        "Here we specify a widget, something the user can do to it, and a function to call in response. For example, '<ButtonPress-1>' is a left click, '<ButtonPress-3>' is a right click on Windows (or '<ButtonPress-2>' on Mac).",
        "The function specified by the button's command attribute is always called with no arguments. The one listed bind, by contrast, is always automatically called with one argument—an object that contains all kinds of useful information about the event."
      ],
      code: [
        {
          title: "Handling Left Clicks",
          code: `def leftClick(event):
    global block, blockType
    block = field.create_rectangle(event.x-20, event.y,
                                   event.x+20, event.y+6,
                                   fill='light green')
    blockType = 'horizontal'`
        },
        {
          title: "Binding the Event",
          code: `field.create_rectangle(0, 275, 25, 300, fill='red')
field.bind('<ButtonPress-1>', leftClick)  # use '<ButtonPress-2>' for Mac devices

mainloop()`
        }
      ],
      tips: [
        "event.x and event.y give the horizontal and vertical position of the user's click",
        "We use these coordinates to center a rectangle at the click position",
        "The rectangle is 40 pixels wide (20 pixels on each side of the click) and 6 pixels tall",
        "blockType tracks whether the current block is horizontal or vertical"
      ],
      warnings: [
        "On Mac devices, use '<ButtonPress-2>' for right click instead of '<ButtonPress-3>'",
        "If you run this code and click several times, the playing field quickly fills up with rectangles. We only want one block at a time—we'll fix this soon!"
      ],
      infos: [
        "**Event Objects**: When tkinter calls an event handler, it passes an event object with useful information: x and y coordinates, which key was pressed, which mouse button was clicked, and more. This lets one handler function respond intelligently to different specific events.",
        "**Platform Differences**: Different operating systems handle mouse events slightly differently. Right-click is '<ButtonPress-3>' on Windows but '<ButtonPress-2>' on Mac. Good programs account for these platform differences."
      ]
    },
    {
      id: '7',
      title: "Part 7: Creating Vertical Blocks with Right Click",
      summary: "Add a second event handler for right clicks to create vertical obstacles instead of horizontal ones.",
      paragraphs: [
        "We can easily make good on our promise to arrange for right clicks to produce vertical blocks. The code is simply a variation on what we've already seen:",
        "Hitting a vertical block is like hitting a side wall—it reverses the ball's horizontal direction. Hitting a horizontal block reverses its vertical direction.",
        "The hitBlock function should check if the center of the ball is inside the block—that is, if the ball's horizontal position is between the horizontal positions of the upper-left and lower-right corners of the block, and likewise for the ball's vertical position."
      ],
      code: [
        {
          title: "Right Click Handler",
          code: `def rightClick(event):
    global block, blockType
    if block:
        field.delete(block)
    block = field.create_rectangle(event.x, event.y-20,
                                   event.x+6, event.y+20,
                                   fill='light green')
    blockType = 'vertical'`
        },
        {
          title: "Binding Both Events",
          code: `field.bind('<ButtonPress-1>', leftClick)
field.bind('<ButtonPress-3>', rightClick)  # use '<ButtonPress-2>' for Mac devices`
        }
      ],
      tips: [
        "We can bind multiple event types to the same widget",
        "Before creating a new block, we delete the old one using field.delete(block)",
        "The condition if block checks if a block exists (if it's not None)"
      ],
      warnings: [
        "This uses the canvas method delete in a natural way to get rid of a rectangle that may have been created in a previous call",
        "Remember to use the correct button press event for your operating system"
      ],
      infos: [
        "**Managing State**: By deleting the old block before creating a new one, we ensure only one block exists at a time. This is important for game logic—we don't want the ball bouncing off invisible old blocks!",
        "**Boolean Values**: In Python, empty values (None, 0, empty strings) are considered 'falsy'. So if block checks if block has been assigned a value. If block is None (not yet created), the condition is false and we skip the delete."
      ]
    },
    {
      id: '8',
      title: "Part 8: Collision Detection and Stopping the Game",
      summary: "Implement hit detection to check if the ball enters the goal area and stop the animation accordingly.",
      paragraphs: [
        "Our last main job is to stop the animation when the ball enters the goal. We'll create a function called inGoal that returns True when the center of the ball is in the goal area.",
        "The goal area is a 25×25 pixel rectangle in the lower-left corner. Its boundaries are: 0 ≤ x ≤ 25 and 275 ≤ y ≤ 300.",
        "We modify the animate function to check if the ball is in the goal. If not, we call root.after to schedule the next animation frame. If the ball is in the goal, we simply don't schedule another call—the animation stops!",
        "This creates a conditional loop: animate keeps calling itself until inGoal() returns True. Then it stops, and the game ends."
      ],
      code: [
        {
          title: "The inGoal Function",
          code: `def inGoal():
    ballX, ballY = ballPosition()
    return 0 <= ballX <= 25 and 275 <= ballY <= 300`
        },
        {
          title: "Modified animate Function",
          code: `def animate():
    global sx, sy
    pattern = f'elapsed time: {0:.1f} seconds'
    timeDisplay['text'] = pattern.format(perf_counter()-startTime)
    x, y = ballPosition()
    hitVertical = hitBlock() and blockType == 'vertical'
    if x+sx>300 or x+sx<0 or hitVertical:
        sx *= -1
    
    hitHorizontal = hitBlock() and blockType == 'horizontal'
    if y+sy>300 or y+sy<0 or hitHorizontal:
        sy *= -1
    
    field.move(ball, sx, sy)
    if not inGoal():
        root.after(20, animate)`
        }
      ],
      tips: [
        "The condition uses and to combine two checks: x-position AND y-position",
        "0 <= ballX <= 25 is Python shorthand for: 0 <= ballX and ballX <= 25",
        "When inGoal() returns True, we simply don't schedule another animate call"
      ],
      warnings: [
        "Notice that we've also reduced the time between calls to animate from 100 milliseconds to 20 milliseconds",
        "This makes the ball move faster, increasing the game's difficulty"
      ],
      infos: [
        "**Compound Conditions**: Python lets you chain comparisons: 0 <= x <= 25 means 'x is between 0 and 25 inclusive'. This is more readable than writing 0 <= x and x <= 25.",
        "**Stopping Animation**: By not calling root.after when the goal is reached, we break the animation loop. This is cleaner than using a flag variable or other methods to stop the animation."
      ]
    },
    {
      id: '9',
      title: "Part 9: Adding a Time Display",
      summary: "Use time.perf_counter() to track elapsed time and display it in a label widget.",
      paragraphs: [
        "Our game is quite playable as it is, but we can improve it considerably with just a little more effort. First, we'll add a time display at the top of the game window.",
        "The time module includes clock, which returns a floating point number—the current time in seconds. If we subtract two values returned by clock at different times, we get the number of seconds between those times.",
        "The perf_counter function is part of the time module. It returns the value (in fractional seconds) of a performance counter—a clock with the highest available resolution to measure short durations.",
        "We'll use perf_counter to get the elapsed time, subtract the start time from the current time, and display the result. The pattern string formats it to one decimal place."
      ],
      code: [
        {
          title: "Import and Setup",
          code: `from time import perf_counter

def startGame():
    global startTime, ball, block
    # remember to delete block and ball from previous game
    if block:
        field.delete(block)
        block = None
    if ball:
        field.delete(ball)
    upperLeftX = choice(list(range(290)))
    upperLeftY = choice(list(range(290)))
    ball = field.create_oval(upperLeftX, upperLeftY,
                            upperLeftX+10, upperLeftY+10,
                            fill='blue')
    
    startTime = perf_counter()
    animate()`
        },
        {
          title: "Display in animate()",
          code: `def animate():
    global sx, sy
    pattern = 'elapsed time: {0:.1f} seconds'
    timeDisplay['text'] = pattern.format(perf_counter()-startTime)
    # ... rest of animation code`
        },
        {
          title: "Creating the Label Widget",
          code: `root = Tk()

timeDisplay = Label(root)
timeDisplay.pack()

field = Canvas(root, width=300, height=300, bg='light blue')
field.pack()`
        }
      ],
      tips: [
        "perf_counter() returns the time in fractional seconds since some arbitrary starting point",
        "By subtracting the start time, we get the elapsed time in seconds",
        "The format string {0:.1f} means: format argument 0 as a floating point with 1 decimal place",
        "Updating the label text in each animation frame creates a running timer"
      ],
      warnings: [
        "time.clock is deprecated since Python 3.3—use time.perf_counter instead",
        "The starting point for perf_counter is arbitrary and system-dependent, so only differences matter"
      ],
      infos: [
        "**Performance Counters**: Modern computers have high-resolution timers specifically for measuring short intervals. perf_counter accesses these with the best available precision on your system.",
        "**String Formatting**: Python's format method is powerful for creating nicely formatted strings. The pattern {0:.1f} means: take the first argument (0), format it as a float (f) with 1 digit after the decimal point (.1)."
      ]
    },
    {
      id: '10',
      title: "Part 10: Putting It All Together",
      summary: "Review the complete game code with all features integrated: animation, collision detection, events, and timing.",
      paragraphs: [
        "A game program is never really complete because we can always think of ways to improve it. Already, though, we have a game that's fairly fun to play.",
        "The complete code integrates all the components we've built: GUI setup, drawing, random placement, animation, event handling, collision detection, and timing.",
        "Notice how the program is organized: imports at the top, function definitions in the middle, and GUI setup code at the bottom ending with mainloop().",
        "The game uses global variables to share state between functions. While this works for a small program, larger programs would benefit from using classes to organize the code better.",
        "This is a foundation you can build on. Consider adding features: multiple balls, different block types, power-ups, score keeping, difficulty levels, or different goal positions!"
      ],
      code: [
        {
          title: "Complete Blocker Game",
          code: `from tkinter import *
from random import choice
from time import perf_counter

# sx and sy are the horizontal and vertical speed of the ball
# in pixels per animation step.
block, ball, sx, sy = None, None, 5, 5

# returns the 'center' of the 'scatter' of the ball
def ballPosition():
    x1, y1, x2, y2 = list(field.coords(ball))
    return [(x1+x2)/2, (y1+y2)/2]

def startGame():
    global startTime, ball, block
    # remember to delete block and ball from previous game
    if block:
        field.delete(block)
        block = None
    if ball:
        field.delete(ball)
    # place ball at random
    upperLeftX = choice(list(range(290)))
    upperLeftY = choice(list(range(290)))
    ball = field.create_oval(upperLeftX, upperLeftY,
                            upperLeftX+10, upperLeftY+10,
                            fill='blue')
    
    startTime = perf_counter()
    animate()

def animate():
    global sx, sy
    pattern = 'elapsed time: {0:.1f} seconds'
    timeDisplay['text'] = pattern.format(perf_counter()-startTime)
    x, y = ballPosition()
    hitVertical = hitBlock() and blockType == 'vertical'
    if x+sx>300 or x+sx<0 or hitVertical:
        sx *= -1
    
    hitHorizontal = hitBlock() and blockType == 'horizontal'
    if y+sy>300 or y+sy<0 or hitHorizontal:
        sy *= -1
    
    field.move(ball, sx, sy)
    if not inGoal():
        root.after(20, animate)

# Only one block at a time; delete one before creating the next
def leftClick(event):
    global block, blockType
    if block:
        field.delete(block)
    block = field.create_rectangle(event.x-20, event.y,
                                   event.x+20, event.y+6,
                                   fill='light green')
    blockType = 'horizontal'

def rightClick(event):
    global block, blockType
    if block:
        field.delete(block)
    block = field.create_rectangle(event.x, event.y-20,
                                   event.x+6, event.y+20,
                                   fill='light green')
    blockType = 'vertical'

# return True if the center of the ball is inside the
# block—if so, it will likely collide
def hitBlock():
    if not block:
        return False
    
    ballX, ballY = ballPosition()
    blockX1, blockY1, blockX2, blockY2 = field.coords(block)
    return (blockX1 <= ballX <= blockX2 and
            blockY1 <= ballY <= blockY2)

# return True if the center of the ball is inside the
# goal area
def inGoal():
    ballX, ballY = ballPosition()
    return 0 <= ballX <= 25 and 275 <= ballY <= 300

root = Tk()

timeDisplay = Label(root)
timeDisplay.pack()

field = Canvas(root, width=300, height=300, bg='light blue')
field.pack()

startButton = Button(root, command=startGame, text='Go')
startButton.pack()

# the goal
field.create_rectangle(0, 275, 25, 300, fill='red')
field.bind('<ButtonPress-1>', leftClick)
field.bind('<ButtonPress-3>', rightClick)  # use '<ButtonPress-2>' for Mac devices

mainloop()`
        }
      ],
      tips: [
        "The program structure: imports → functions → GUI setup → mainloop()",
        "Global variables declared at the top make them accessible everywhere",
        "Comments explain what sections of code do—essential for complex programs",
        "The game is playable but has room for many improvements and additions"
      ],
      warnings: [
        "This code uses global variables extensively, which works for small programs but doesn't scale well",
        "For larger projects, consider using classes to encapsulate related data and functions"
      ],
      infos: [
        "**Program Organization**: Notice the clear structure: all imports at the top, helper functions, event handlers, then the main GUI setup. This organization makes the code easier to understand and modify.",
        "**Extension Opportunities**: This is a foundation for creativity. You could add: multiple difficulty levels, obstacles that move, scoring systems, sound effects, multiple balls, time bonuses, or even two-player mode!"
      ]
    }
  ];

  const exercises: ExerciseData[] = [
    {
      id: '0',
      title: "Question 0: Build the Complete Blocker Game",
      description: "Build the Blocker game step-by-step following the specifications. This comprehensive exercise walks you through creating the full game from scratch.",
      difficulty: "intermediate",
      starter: `# Blocker Game - Starter Template
# Follow the steps to build the complete game

from tkinter import *
from random import choice
from time import perf_counter

# TODO: Follow these steps:
# 0.1. Begin to write the Blocker arcade game.
#      Include a 300x300 pixel light blue playing field,
#      a 25x25 pixel red goal area in the lower-left corner
#      and a 'Go' button to start the game.

# 0.2. Continue writing the Blocker game by adding a blue ball
#      that fills a 10x10 pixel bounding box.
#      Clicking 'Go' should place ball at random on playing area.

# 0.3. Continue writing the Blocker game by animating the ball.
#      It should move diagonally, 5 pixels horizontally and 5 pixels
#      vertically with each step. Steps should occur 10 times per second.
#      The ball should bounce when it reaches edge of playing field.

# 0.4. Continue writing the Blocker game by adding player control.
#      Left clicking on field should create a 40x6 pixel horizontal block.
#      Right clicking should create a 6x40 pixel vertical block.
#      Creating a block should remove any existing one.
#      Only one block present at any time.
#      The ball should bounce appropriately when it hits each kind of block.

# 0.5. Finish the Blocker game by:
#      - causing it to stop when ball enters goal
#      - increasing animation step rate to 50 per second
#      - adding a display of elapsed time
#      - arranging for click of 'Go' button to remove ball and block
#        from previous game before starting new one

# Your complete implementation:
`,
      solution: `# Blocker Game - COMPLETE SOLUTION

from tkinter import *
from random import choice
from time import perf_counter

# Global variables for game state
block, ball, sx, sy = None, None, 5, 5

def ballPosition():
    """Return the center coordinates of the ball."""
    x1, y1, x2, y2 = list(field.coords(ball))
    return [(x1+x2)/2, (y1+y2)/2]

def startGame():
    """Initialize a new game: clean up previous game and place new ball."""
    global startTime, ball, block
    # Delete objects from previous game
    if block:
        field.delete(block)
        block = None
    if ball:
        field.delete(ball)
    
    # Place ball at random location
    upperLeftX = choice(list(range(290)))
    upperLeftY = choice(list(range(290)))
    ball = field.create_oval(upperLeftX, upperLeftY,
                            upperLeftX+10, upperLeftY+10,
                            fill='blue')
    
    # Start timing
    startTime = perf_counter()
    animate()

def animate():
    """Move the ball, check collisions, update display."""
    global sx, sy
    
    # Update time display
    pattern = 'elapsed time: {0:.1f} seconds'
    timeDisplay['text'] = pattern.format(perf_counter()-startTime)
    
    # Get current position
    x, y = ballPosition()
    
    # Check vertical collisions (sides or vertical block)
    hitVertical = hitBlock() and blockType == 'vertical'
    if x+sx>300 or x+sx<0 or hitVertical:
        sx *= -1
    
    # Check horizontal collisions (top/bottom or horizontal block)
    hitHorizontal = hitBlock() and blockType == 'horizontal'
    if y+sy>300 or y+sy<0 or hitHorizontal:
        sy *= -1
    
    # Move the ball
    field.move(ball, sx, sy)
    
    # Continue animation if not in goal
    if not inGoal():
        root.after(20, animate)  # 50 times per second

def leftClick(event):
    """Create a horizontal block at click position."""
    global block, blockType
    if block:
        field.delete(block)
    block = field.create_rectangle(event.x-20, event.y,
                                   event.x+20, event.y+6,
                                   fill='light green')
    blockType = 'horizontal'

def rightClick(event):
    """Create a vertical block at click position."""
    global block, blockType
    if block:
        field.delete(block)
    block = field.create_rectangle(event.x, event.y-20,
                                   event.x+6, event.y+20,
                                   fill='light green')
    blockType = 'vertical'

def hitBlock():
    """Check if ball center is inside the block."""
    if not block:
        return False
    
    ballX, ballY = ballPosition()
    blockX1, blockY1, blockX2, blockY2 = field.coords(block)
    return (blockX1 <= ballX <= blockX2 and
            blockY1 <= ballY <= blockY2)

def inGoal():
    """Check if ball center is in goal area."""
    ballX, ballY = ballPosition()
    return 0 <= ballX <= 25 and 275 <= ballY <= 300

# GUI Setup
root = Tk()

timeDisplay = Label(root)
timeDisplay.pack()

field = Canvas(root, width=300, height=300, bg='light blue')
field.pack()

startButton = Button(root, command=startGame, text='Go')
startButton.pack()

# Goal area
field.create_rectangle(0, 275, 25, 300, fill='red')

# Event bindings
field.bind('<ButtonPress-1>', leftClick)
field.bind('<ButtonPress-3>', rightClick)  # '<ButtonPress-2>' for Mac

mainloop()`
    },
    {
      id: '1',
      title: "Question 1: Adjustable Field Size",
      description: "Modify the Blocker game to make it easy to change the size of the playing field by using a global variable.",
      difficulty: "beginner",
      starter: `# Modify the Blocker game to use a global fieldSize variable

from tkinter import *
from random import choice
from time import perf_counter

# TODO: Add a global variable for field size
# fieldSize = 600

# TODO: Modify the code to use fieldSize instead of hard-coded 300
# - Canvas width and height
# - Ball placement range (fieldSize - 10)
# - Boundary checking in animate()
# - Use fieldSize appropriately throughout

# Then test with different field sizes!
`,
      solution: `# Blocker Game with Adjustable Field Size - SOLUTION

from tkinter import *
from random import choice
from time import perf_counter

# Global variables
fieldSize = 600  # Easy to change!
block, ball, sx, sy = None, None, 5, 5

def ballPosition():
    """Return the center coordinates of the ball."""
    x1, y1, x2, y2 = list(field.coords(ball))
    return [(x1+x2)/2, (y1+y2)/2]

def startGame():
    """Initialize a new game."""
    global startTime, ball, block
    if block:
        field.delete(block)
        block = None
    if ball:
        field.delete(ball)
    
    # Use fieldSize-10 for max ball position
    maxPos = fieldSize - 10
    upperLeftX = choice(list(range(maxPos)))
    upperLeftY = choice(list(range(maxPos)))
    ball = field.create_oval(upperLeftX, upperLeftY,
                            upperLeftX+10, upperLeftY+10,
                            fill='blue')
    
    startTime = perf_counter()
    animate()

def animate():
    """Move the ball, check collisions."""
    global sx, sy
    pattern = 'elapsed time: {0:.1f} seconds'
    timeDisplay['text'] = pattern.format(perf_counter()-startTime)
    
    x, y = ballPosition()
    
    # Use fieldSize for boundary checking
    hitVertical = hitBlock() and blockType == 'vertical'
    if x+sx>fieldSize or x+sx<0 or hitVertical:
        sx *= -1
    
    hitHorizontal = hitBlock() and blockType == 'horizontal'
    if y+sy>fieldSize or y+sy<0 or hitHorizontal:
        sy *= -1
    
    field.move(ball, sx, sy)
    if not inGoal():
        root.after(20, animate)

def leftClick(event):
    global block, blockType
    if block:
        field.delete(block)
    block = field.create_rectangle(event.x-20, event.y,
                                   event.x+20, event.y+6,
                                   fill='light green')
    blockType = 'horizontal'

def rightClick(event):
    global block, blockType
    if block:
        field.delete(block)
    block = field.create_rectangle(event.x, event.y-20,
                                   event.x+6, event.y+20,
                                   fill='light green')
    blockType = 'vertical'

def hitBlock():
    if not block:
        return False
    ballX, ballY = ballPosition()
    blockX1, blockY1, blockX2, blockY2 = field.coords(block)
    return (blockX1 <= ballX <= blockX2 and
            blockY1 <= ballY <= blockY2)

def inGoal():
    ballX, ballY = ballPosition()
    return 0 <= ballX <= 25 and 275 <= ballY <= 300

# GUI Setup - using fieldSize
root = Tk()

timeDisplay = Label(root)
timeDisplay.pack()

field = Canvas(root, width=fieldSize, height=fieldSize, bg='light blue')
field.pack()

startButton = Button(root, command=startGame, text='Go')
startButton.pack()

field.create_rectangle(0, 275, 25, 300, fill='red')
field.bind('<ButtonPress-1>', leftClick)
field.bind('<ButtonPress-3>', rightClick)

mainloop()

# Now you can easily test with different sizes:
# Try fieldSize = 400, 500, 600, etc.`
    },
    {
      id: '2',
      title: "Question 2: Goal Requires User Intervention",
      description: "Modify the game so the ball won't enter the goal unless the user creates a block to guide it in—making the game more strategic.",
      difficulty: "intermediate",
      starter: `# Modify the game so ball won't enter goal automatically

from tkinter import *
from random import choice
from time import perf_counter

# TODO: Modify the inGoal function or add collision logic
# The ball should not be able to enter the goal area unless
# the user has created a block that deflects it in.

# Hint: You could check if ball would collide with goal boundary
# and bounce it away, similar to how it bounces off edges.
# The goal only counts if the ball enters through creating a block.

# This makes the game require more strategy!
`,
      solution: `# Blocker Game - Goal Requires Block Strategy - SOLUTION

from tkinter import *
from random import choice
from time import perf_counter

block, ball, sx, sy = None, None, 5, 5
blockUsed = False  # Track if user created a block

def ballPosition():
    x1, y1, x2, y2 = list(field.coords(ball))
    return [(x1+x2)/2, (y1+y2)/2]

def startGame():
    global startTime, ball, block, blockUsed
    blockUsed = False  # Reset for new game
    
    if block:
        field.delete(block)
        block = None
    if ball:
        field.delete(ball)
    
    upperLeftX = choice(list(range(290)))
    upperLeftY = choice(list(range(290)))
    ball = field.create_oval(upperLeftX, upperLeftY,
                            upperLeftX+10, upperLeftY+10,
                            fill='blue')
    
    startTime = perf_counter()
    animate()

def animate():
    global sx, sy
    pattern = 'elapsed time: {0:.1f} seconds'
    timeDisplay['text'] = pattern.format(perf_counter()-startTime)
    
    x, y = ballPosition()
    
    # Check if ball would hit goal boundary (and bounce it away)
    inGoalX = 0 <= x <= 25
    inGoalY = 275 <= y <= 300
    
    # Bounce off goal area unless block was used
    if inGoalX and y+sy > 275 and not blockUsed:
        sy *= -1  # Bounce off goal top edge
    
    hitVertical = hitBlock() and blockType == 'vertical'
    if x+sx>300 or x+sx<0 or hitVertical:
        sx *= -1
    
    hitHorizontal = hitBlock() and blockType == 'horizontal'
    if y+sy>300 or y+sy<0 or hitHorizontal:
        sy *= -1
    
    field.move(ball, sx, sy)
    
    # Only stop if in goal AND block was used
    if not (inGoal() and blockUsed):
        root.after(20, animate)
    else:
        timeDisplay['text'] += ' - SUCCESS!'

def leftClick(event):
    global block, blockType, blockUsed
    blockUsed = True  # Mark that user created a block
    if block:
        field.delete(block)
    block = field.create_rectangle(event.x-20, event.y,
                                   event.x+20, event.y+6,
                                   fill='light green')
    blockType = 'horizontal'

def rightClick(event):
    global block, blockType, blockUsed
    blockUsed = True  # Mark that user created a block
    if block:
        field.delete(block)
    block = field.create_rectangle(event.x, event.y-20,
                                   event.x+6, event.y+20,
                                   fill='light green')
    blockType = 'vertical'

def hitBlock():
    if not block:
        return False
    ballX, ballY = ballPosition()
    blockX1, blockY1, blockX2, blockY2 = field.coords(block)
    return (blockX1 <= ballX <= blockX2 and
            blockY1 <= ballY <= blockY2)

def inGoal():
    ballX, ballY = ballPosition()
    return 0 <= ballX <= 25 and 275 <= ballY <= 300

root = Tk()

timeDisplay = Label(root)
timeDisplay.pack()

field = Canvas(root, width=300, height=300, bg='light blue')
field.pack()

startButton = Button(root, command=startGame, text='Go')
startButton.pack()

field.create_rectangle(0, 275, 25, 300, fill='red')
field.bind('<ButtonPress-1>', leftClick)
field.bind('<ButtonPress-3>', rightClick)

mainloop()`
    },
    {
      id: '3',
      title: "Question 3: Moving Goal",
      description: "Make the goal move horizontally, bouncing back and forth across the bottom of the playing field.",
      difficulty: "advanced",
      starter: `# Make the goal move horizontally

from tkinter import *
from random import choice
from time import perf_counter

block, ball, sx, sy = None, None, 5, 5
goalX = 0  # TODO: Track goal position
goalSpeed = 1  # TODO: Speed of goal movement

def ballPosition():
    x1, y1, x2, y2 = list(field.coords(ball))
    return [(x1+x2)/2, (y1+y2)/2]

def moveGoal():
    """TODO: Move the goal and bounce at edges."""
    # Move goal horizontally
    # Check boundaries (0 to 275 since goal is 25 pixels wide)
    # Reverse direction when hitting edges
    # Schedule next move
    pass

def startGame():
    # TODO: Start goal movement
    # TODO: Reset goal position
    pass

# TODO: Modify inGoal() to use current goal position
def inGoal():
    """Check if ball is in current goal position."""
    pass

# Rest of the game code...
`,
      solution: `# Blocker Game with Moving Goal - SOLUTION

from tkinter import *
from random import choice
from time import perf_counter

block, ball, sx, sy = None, None, 5, 5
goal = None
goalX = 0
goalSpeed = 2

def ballPosition():
    x1, y1, x2, y2 = list(field.coords(ball))
    return [(x1+x2)/2, (y1+y2)/2]

def moveGoal():
    """Animate the goal moving horizontally."""
    global goalX, goalSpeed
    
    # Move goal
    field.move(goal, goalSpeed, 0)
    goalX += goalSpeed
    
    # Bounce at edges
    if goalX <= 0 or goalX >= 275:  # 275 because goal is 25 wide
        goalSpeed *= -1
    
    # Schedule next movement
    root.after(50, moveGoal)  # Move every 50ms

def startGame():
    global startTime, ball, block, goalX, goal
    
    # Reset goal position
    if goal:
        field.delete(goal)
    goalX = 0
    goal = field.create_rectangle(0, 275, 25, 300, fill='red')
    
    if block:
        field.delete(block)
        block = None
    if ball:
        field.delete(ball)
    
    upperLeftX = choice(list(range(290)))
    upperLeftY = choice(list(range(290)))
    ball = field.create_oval(upperLeftX, upperLeftY,
                            upperLeftX+10, upperLeftY+10,
                            fill='blue')
    
    startTime = perf_counter()
    animate()
    moveGoal()  # Start goal movement

def animate():
    global sx, sy
    pattern = 'elapsed time: {0:.1f} seconds'
    timeDisplay['text'] = pattern.format(perf_counter()-startTime)
    
    x, y = ballPosition()
    
    hitVertical = hitBlock() and blockType == 'vertical'
    if x+sx>300 or x+sx<0 or hitVertical:
        sx *= -1
    
    hitHorizontal = hitBlock() and blockType == 'horizontal'
    if y+sy>300 or y+sy<0 or hitHorizontal:
        sy *= -1
    
    field.move(ball, sx, sy)
    if not inGoal():
        root.after(20, animate)

def leftClick(event):
    global block, blockType
    if block:
        field.delete(block)
    block = field.create_rectangle(event.x-20, event.y,
                                   event.x+20, event.y+6,
                                   fill='light green')
    blockType = 'horizontal'

def rightClick(event):
    global block, blockType
    if block:
        field.delete(block)
    block = field.create_rectangle(event.x, event.y-20,
                                   event.x+6, event.y+20,
                                   fill='light green')
    blockType = 'vertical'

def hitBlock():
    if not block:
        return False
    ballX, ballY = ballPosition()
    blockX1, blockY1, blockX2, blockY2 = field.coords(block)
    return (blockX1 <= ballX <= blockX2 and
            blockY1 <= ballY <= blockY2)

def inGoal():
    """Check if ball is in current goal position."""
    ballX, ballY = ballPosition()
    goalLeft = goalX
    goalRight = goalX + 25
    return goalLeft <= ballX <= goalRight and 275 <= ballY <= 300

root = Tk()

timeDisplay = Label(root)
timeDisplay.pack()

field = Canvas(root, width=300, height=300, bg='light blue')
field.pack()

startButton = Button(root, command=startGame, text='Go')
startButton.pack()

# Initial goal will be created in startGame
field.bind('<ButtonPress-1>', leftClick)
field.bind('<ButtonPress-3>', rightClick)

mainloop()`
    },
    {
      id: '4',
      title: "Question 4: Multi-Round Tournament",
      description: "Extend the game so the user plays five rounds, keeping track of total elapsed time across all rounds.",
      difficulty: "advanced",
      starter: `# Multi-round tournament version

from tkinter import *
from random import choice
from time import perf_counter

block, ball, sx, sy = None, None, 5, 5
roundNumber = 0  # TODO: Track current round
totalTime = 0    # TODO: Accumulate total time
maxRounds = 5    # TODO: Number of rounds to play

def startGame():
    """TODO: Check round number and handle tournament logic."""
    # If starting new tournament (round 0), reset totalTime
    # Increment round number
    # If exceeded maxRounds, show final results
    # Otherwise, start new round
    pass

def animate():
    """TODO: When round ends, add to totalTime and prepare next round."""
    # Move ball and check collisions as before
    # When goal reached:
    #   - Add elapsed time to totalTime
    #   - If more rounds remain, prompt for next round
    #   - If tournament complete, show final results
    pass

# Rest of the game...
`,
      solution: `# Blocker Game - Multi-Round Tournament - SOLUTION

from tkinter import *
from random import choice
from time import perf_counter

block, ball, sx, sy = None, None, 5, 5
roundNumber = 0
totalTime = 0.0
maxRounds = 5

def ballPosition():
    x1, y1, x2, y2 = list(field.coords(ball))
    return [(x1+x2)/2, (y1+y2)/2]

def startGame():
    """Start a new round or new tournament."""
    global startTime, ball, block, roundNumber, totalTime
    
    # Check if starting new tournament
    if roundNumber >= maxRounds:
        roundNumber = 0
        totalTime = 0.0
    
    # Increment round
    roundNumber += 1
    
    # Clean up
    if block:
        field.delete(block)
        block = None
    if ball:
        field.delete(ball)
    
    # Place ball
    upperLeftX = choice(list(range(290)))
    upperLeftY = choice(list(range(290)))
    ball = field.create_oval(upperLeftX, upperLeftY,
                            upperLeftX+10, upperLeftY+10,
                            fill='blue')
    
    # Update round display
    statusDisplay['text'] = f'Round {roundNumber} of {maxRounds}'
    
    startTime = perf_counter()
    animate()

def animate():
    """Move ball and check for round completion."""
    global sx, sy, totalTime
    
    # Update time display
    elapsed = perf_counter() - startTime
    pattern = 'elapsed time: {0:.1f} seconds'
    timeDisplay['text'] = pattern.format(elapsed)
    
    x, y = ballPosition()
    
    hitVertical = hitBlock() and blockType == 'vertical'
    if x+sx>300 or x+sx<0 or hitVertical:
        sx *= -1
    
    hitHorizontal = hitBlock() and blockType == 'horizontal'
    if y+sy>300 or y+sy<0 or hitHorizontal:
        sy *= -1
    
    field.move(ball, sx, sy)
    
    if not inGoal():
        root.after(20, animate)
    else:
        # Round complete!
        totalTime += elapsed
        
        if roundNumber < maxRounds:
            statusDisplay['text'] = (
                f'Round {roundNumber} complete! '
                f'Total time so far: {totalTime:.1f}s'
            )
        else:
            # Tournament complete!
            statusDisplay['text'] = (
                f'Tournament Complete! '
                f'Total time: {totalTime:.1f}s '
                f'(Average: {totalTime/maxRounds:.1f}s per round)'
            )

def leftClick(event):
    global block, blockType
    if block:
        field.delete(block)
    block = field.create_rectangle(event.x-20, event.y,
                                   event.x+20, event.y+6,
                                   fill='light green')
    blockType = 'horizontal'

def rightClick(event):
    global block, blockType
    if block:
        field.delete(block)
    block = field.create_rectangle(event.x, event.y-20,
                                   event.x+6, event.y+20,
                                   fill='light green')
    blockType = 'vertical'

def hitBlock():
    if not block:
        return False
    ballX, ballY = ballPosition()
    blockX1, blockY1, blockX2, blockY2 = field.coords(block)
    return (blockX1 <= ballX <= blockX2 and
            blockY1 <= ballY <= blockY2)

def inGoal():
    ballX, ballY = ballPosition()
    return 0 <= ballX <= 25 and 275 <= ballY <= 300

root = Tk()

statusDisplay = Label(root, text='Click Go to start Round 1', 
                     font=('Arial', 12, 'bold'))
statusDisplay.pack()

timeDisplay = Label(root)
timeDisplay.pack()

field = Canvas(root, width=300, height=300, bg='light blue')
field.pack()

startButton = Button(root, command=startGame, text='Go')
startButton.pack()

field.create_rectangle(0, 275, 25, 300, fill='red')
field.bind('<ButtonPress-1>', leftClick)
field.bind('<ButtonPress-3>', rightClick)

mainloop()`
    },
    {
      id: '5',
      title: "Simple Drawing App",
      description: "Create a simple drawing application where clicking and dragging draws lines on the canvas.",
      difficulty: "beginner",
      starter: `# Simple Drawing App - Starter

from tkinter import *

root = Tk()
root.title("Drawing App")

canvas = Canvas(root, width=400, height=400, bg='white')
canvas.pack()

# TODO: Create variables to track if mouse is pressed
# and last position

# TODO: Create function for mouse press (starts drawing)
def mousePress(event):
    pass

# TODO: Create function for mouse drag (draws line)
def mouseDrag(event):
    pass

# TODO: Create function for mouse release (stops drawing)
def mouseRelease(event):
    pass

# TODO: Bind events to canvas
# canvas.bind('<ButtonPress-1>', mousePress)
# canvas.bind('<B1-Motion>', mouseDrag)
# canvas.bind('<ButtonRelease-1>', mouseRelease)

# TODO: Add a clear button

mainloop()`,
      solution: `# Simple Drawing App - SOLUTION

from tkinter import *

root = Tk()
root.title("Drawing App")

canvas = Canvas(root, width=400, height=400, bg='white')
canvas.pack()

# Track drawing state
drawing = False
lastX = 0
lastY = 0

def mousePress(event):
    """Start drawing at click position."""
    global drawing, lastX, lastY
    drawing = True
    lastX = event.x
    lastY = event.y

def mouseDrag(event):
    """Draw line from last position to current position."""
    global lastX, lastY
    if drawing:
        canvas.create_line(lastX, lastY, event.x, event.y, 
                         width=2, fill='black')
        lastX = event.x
        lastY = event.y

def mouseRelease(event):
    """Stop drawing."""
    global drawing
    drawing = False

def clearCanvas():
    """Clear all drawings."""
    canvas.delete('all')

# Bind mouse events
canvas.bind('<ButtonPress-1>', mousePress)
canvas.bind('<B1-Motion>', mouseDrag)
canvas.bind('<ButtonRelease-1>', mouseRelease)

# Clear button
clearButton = Button(root, text='Clear', command=clearCanvas)
clearButton.pack()

mainloop()`
    },
    {
      id: '6',
      title: "Color Mixer GUI",
      description: "Create an interactive color mixer with sliders for red, green, and blue values that updates a color display in real-time.",
      difficulty: "intermediate",
      starter: `# Color Mixer - Starter

from tkinter import *

def updateColor(val):
    """TODO: Update the color display based on slider values."""
    # Get values from sliders
    # Convert to hex color string
    # Update canvas background color
    # Update label text with RGB values
    pass

root = Tk()
root.title("Color Mixer")

# TODO: Create color display canvas
# colorDisplay = Canvas(root, width=200, height=200, bg='black')
# colorDisplay.pack()

# TODO: Create RGB value label
# rgbLabel = Label(root, text="RGB: (0, 0, 0)")
# rgbLabel.pack()

# TODO: Create three scales (sliders) for R, G, B
# Each should go from 0 to 255
# Each should call updateColor when changed

# TODO: Call updateColor once to initialize

mainloop()`,
      solution: `# Color Mixer - SOLUTION

from tkinter import *

def updateColor(val=None):
    """Update the color display based on slider values."""
    # Get current slider values
    r = redScale.get()
    g = greenScale.get()
    b = blueScale.get()
    
    # Convert to hex color string
    hexColor = f'#{r:02x}{g:02x}{b:02x}'
    
    # Update canvas color
    colorDisplay.config(bg=hexColor)
    
    # Update label
    rgbLabel.config(text=f'RGB: ({r}, {g}, {b})  Hex: {hexColor}')

root = Tk()
root.title("Color Mixer")

# Color display
colorDisplay = Canvas(root, width=300, height=200, bg='black')
colorDisplay.pack(pady=10)

# RGB value label
rgbLabel = Label(root, text="RGB: (0, 0, 0)", font=('Arial', 12))
rgbLabel.pack(pady=5)

# Frame for sliders
sliderFrame = Frame(root)
sliderFrame.pack(pady=10)

# Red slider
Label(sliderFrame, text="Red:").grid(row=0, column=0, sticky='e')
redScale = Scale(sliderFrame, from_=0, to=255, orient=HORIZONTAL,
                length=250, command=updateColor)
redScale.grid(row=0, column=1, padx=5)

# Green slider
Label(sliderFrame, text="Green:").grid(row=1, column=0, sticky='e')
greenScale = Scale(sliderFrame, from_=0, to=255, orient=HORIZONTAL,
                  length=250, command=updateColor)
greenScale.grid(row=1, column=1, padx=5)

# Blue slider
Label(sliderFrame, text="Blue:").grid(row=2, column=0, sticky='e')
blueScale = Scale(sliderFrame, from_=0, to=255, orient=HORIZONTAL,
                 length=250, command=updateColor)
blueScale.grid(row=2, column=1, padx=5)

# Preset buttons
presetFrame = Frame(root)
presetFrame.pack(pady=10)

def setColor(r, g, b):
    """Set all sliders to specific values."""
    redScale.set(r)
    greenScale.set(g)
    blueScale.set(b)
    updateColor()

Button(presetFrame, text="Red", command=lambda: setColor(255, 0, 0)).pack(side=LEFT, padx=5)
Button(presetFrame, text="Green", command=lambda: setColor(0, 255, 0)).pack(side=LEFT, padx=5)
Button(presetFrame, text="Blue", command=lambda: setColor(0, 0, 255)).pack(side=LEFT, padx=5)
Button(presetFrame, text="Yellow", command=lambda: setColor(255, 255, 0)).pack(side=LEFT, padx=5)
Button(presetFrame, text="Purple", command=lambda: setColor(128, 0, 128)).pack(side=LEFT, padx=5)
Button(presetFrame, text="Black", command=lambda: setColor(0, 0, 0)).pack(side=LEFT, padx=5)
Button(presetFrame, text="White", command=lambda: setColor(255, 255, 255)).pack(side=LEFT, padx=5)

# Initialize
updateColor()

mainloop()`
    },
    {
      id: '7',
      title: "Keyboard-Controlled Character",
      description: "Create a simple game where arrow keys control a character moving around the screen, avoiding obstacles.",
      difficulty: "intermediate",
      starter: `# Keyboard-Controlled Character - Starter

from tkinter import *
import random

# TODO: Create global variables for player position
playerX = 200
playerY = 200
playerSize = 20

# TODO: Handle keyboard events
def keyPress(event):
    """TODO: Move player based on arrow key pressed."""
    # event.keysym will be 'Up', 'Down', 'Left', or 'Right'
    pass

# TODO: Create obstacles
obstacles = []

def createObstacle():
    """TODO: Create a random obstacle on canvas."""
    pass

def checkCollision():
    """TODO: Check if player hits any obstacle."""
    pass

# TODO: Setup GUI
# Create canvas
# Draw player
# Bind keyboard events
# Create some obstacles

mainloop()`,
      solution: `# Keyboard-Controlled Character - SOLUTION

from tkinter import *
import random

# Global variables
playerX = 250
playerY = 250
playerSize = 15
speed = 10
obstacles = []
score = 0
gameOver = False

def updatePlayer():
    """Redraw player at current position."""
    canvas.coords(player,
                 playerX - playerSize,
                 playerY - playerSize,
                 playerX + playerSize,
                 playerY + playerSize)

def keyPress(event):
    """Move player based on arrow key."""
    global playerX, playerY
    
    if gameOver:
        return
    
    # Store old position
    oldX, oldY = playerX, playerY
    
    # Move based on key
    if event.keysym == 'Up':
        playerY -= speed
    elif event.keysym == 'Down':
        playerY += speed
    elif event.keysym == 'Left':
        playerX -= speed
    elif event.keysym == 'Right':
        playerX += speed
    
    # Keep in bounds
    playerX = max(playerSize, min(500 - playerSize, playerX))
    playerY = max(playerSize, min(500 - playerSize, playerY))
    
    # Update display
    updatePlayer()
    
    # Check collisions
    if checkCollision():
        # Collision - move back
        playerX, oldY = oldX, oldY
        updatePlayer()
        endGame()

def createObstacle():
    """Create a random obstacle."""
    x = random.randint(50, 450)
    y = random.randint(50, 450)
    size = random.randint(20, 40)
    
    # Make sure not on player
    if abs(x - playerX) < 50 and abs(y - playerY) < 50:
        return  # Too close to player
    
    obstacle = canvas.create_rectangle(
        x - size, y - size,
        x + size, y + size,
        fill='red'
    )
    obstacles.append({
        'id': obstacle,
        'x': x,
        'y': y,
        'size': size
    })

def checkCollision():
    """Check if player collides with any obstacle."""
    for obs in obstacles:
        # Simple box collision
        if (abs(playerX - obs['x']) < playerSize + obs['size'] and
            abs(playerY - obs['y']) < playerSize + obs['size']):
            return True
    return False

def collectCoin():
    """Collect coin and increase score."""
    global score
    coinX, coinY = canvas.coords(coin)[:2]
    coinX += 10  # Adjust for coin center
    coinY += 10
    
    if abs(playerX - coinX) < playerSize + 10:
        if abs(playerY - coinY) < playerSize + 10:
            # Collected!
            score += 1
            scoreLabel.config(text=f'Score: {score}')
            # Move coin to new location
            newX = random.randint(30, 470)
            newY = random.randint(30, 470)
            canvas.coords(coin, newX-10, newY-10, newX+10, newY+10)

def gameLoop():
    """Main game loop for collectibles."""
    if not gameOver:
        collectCoin()
        root.after(50, gameLoop)

def endGame():
    """End the game."""
    global gameOver
    gameOver = True
    canvas.create_text(250, 250,
                      text=f'Game Over!\\nFinal Score: {score}',
                      font=('Arial', 24, 'bold'),
                      fill='red')

def resetGame():
    """Reset the game."""
    global playerX, playerY, score, gameOver, obstacles
    
    # Clear obstacles
    for obs in obstacles:
        canvas.delete(obs['id'])
    obstacles.clear()
    
    # Reset player
    playerX = 250
    playerY = 250
    updatePlayer()
    
    # Reset score
    score = 0
    scoreLabel.config(text='Score: 0')
    gameOver = False
    
    # Create new obstacles
    for _ in range(10):
        createObstacle()
    
    # Remove game over text
    canvas.delete('all')
    
    # Redraw everything
    global player, coin
    player = canvas.create_oval(
        playerX - playerSize,
        playerY - playerSize,
        playerX + playerSize,
        playerY + playerSize,
        fill='blue'
    )
    
    coin = canvas.create_oval(200, 200, 220, 220, fill='gold')
    
    for obs in obstacles:
        obs['id'] = canvas.create_rectangle(
            obs['x'] - obs['size'],
            obs['y'] - obs['size'],
            obs['x'] + obs['size'],
            obs['y'] + obs['size'],
            fill='red'
        )
    
    gameLoop()

# GUI Setup
root = Tk()
root.title("Navigate the Maze")

# Instructions
instructLabel = Label(root, 
                     text="Use arrow keys to move. Collect gold circles. Avoid red obstacles!",
                     font=('Arial', 10))
instructLabel.pack(pady=5)

# Score display
scoreLabel = Label(root, text='Score: 0', font=('Arial', 14, 'bold'))
scoreLabel.pack(pady=5)

# Canvas
canvas = Canvas(root, width=500, height=500, bg='white')
canvas.pack(pady=10)

# Player
player = canvas.create_oval(
    playerX - playerSize,
    playerY - playerSize,
    playerX + playerSize,
    playerY + playerSize,
    fill='blue'
)

# Coin to collect
coin = canvas.create_oval(200, 200, 220, 220, fill='gold')

# Create obstacles
for _ in range(10):
    createObstacle()

# Control buttons
buttonFrame = Frame(root)
buttonFrame.pack(pady=10)

resetButton = Button(buttonFrame, text="Reset Game", command=resetGame)
resetButton.pack(side=LEFT, padx=5)

addObsButton = Button(buttonFrame, text="Add Obstacle", command=createObstacle)
addObsButton.pack(side=LEFT, padx=5)

# Bind keyboard
root.bind('<KeyPress>', keyPress)

# Start game loop
gameLoop()

mainloop()`
    }
  ];

  return (
    <UnitTemplate
      unitTitle="Unit 11"
      unitSubtitle="GUI Programming with tkinter"
      overview={overview}
      lessons={lessons}
      exercises={exercises}
    />
  );
};

export default Unit11;