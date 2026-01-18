import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Play,
  Code,
  BookOpen,
  Zap,
  TrendingUp,
  Calculator,
  ArrowRight
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

const CSCI133Unit7: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'overview' | 'lessons' | 'practice'>('overview');

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const lessons: Lesson[] = [
    {
      id: 'part1',
      title: 'Part 1: Introduction to Functions as Data',
      description: 'Understanding that functions can be stored, passed, and returned just like any other value.',
      content: (
        <div className={styles.lessonContent}>
          <p>
            In Python, <strong>functions are first-class objects</strong>. This means we can treat them just like 
            integers, strings, or lists: we can assign them to variables, store them in data structures, pass them 
            as arguments to other functions, and even return them from functions.
          </p>

          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <Code className={styles.codeIcon} />
              Storing functions in variables
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`# Define a simple function
def greet(name):
    return f"Hello, {name}!"

# Assign the function to a variable
say_hello = greet

# Call it through the variable
print(say_hello("Alice"))  # Output: Hello, Alice!

# Store functions in a list
def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

operations = [add, multiply]
print(operations[0](3, 4))  # Output: 7
print(operations[1](3, 4))  # Output: 12`}</code>
            </pre>
          </div>

          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>Key Insight</h4>
            <p>
              When you write <code className={styles.inlineCode}>greet</code> without parentheses, you're referring 
              to the function object itself. When you write <code className={styles.inlineCode}>greet("Alice")</code> 
              with parentheses, you're <em>calling</em> the function.
            </p>
          </div>

          <div className={styles.infoBox}>
            <h4 className={styles.infoTitle}>Why does this matter?</h4>
            <p>
              Being able to pass functions as arguments allows us to write more flexible, reusable code. Instead of 
              writing separate versions of similar operations, we can write one general function that accepts 
              different behaviors as parameters.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'part2',
      title: 'Part 2: Functions That Take Functions as Arguments',
      description: 'Using higher-order functions to create flexible, reusable code.',
      content: (
        <div className={styles.lessonContent}>
          <p>
            A <strong>higher-order function</strong> is a function that takes another function as an argument, 
            returns a function, or both. This allows us to write generic algorithms that can be customized with 
            different behaviors.
          </p>

          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <Zap className={styles.codeIcon} />
              Building on the CPI example from Unit 6
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`# From the previous unit, we had functions like:
def pctIncrease(begin, end):
    return 100*(end/begin-1)

def increaseByPct(begin, pct):
    return begin+begin*pct/100

# Create a generic function that takes starting value and years
def makeTotalPct(startValue, years):
    def totalPct(pct):
        value = startValue
        for year in range(years):
            value = increaseByPct(value, pct)
        return(pctIncrease(startValue, value))
    return totalPct

# Now we can create specialized functions for different scenarios
totalPct = makeTotalPct(175.1, 5)
totalPct2 = makeTotalPct(154.4, 10)

# Use them to find the annual rate needed for specific increases
print(goalSeek(totalPct, -100, 100, 13.2, .0001))
print(goalSeek(totalPct2, -100, 100, 13.2, .0001))`}</code>
            </pre>
          </div>

          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>Understanding Higher-Order Functions</h4>
            <ul className={styles.conceptList}>
              <li>
                <code className={styles.inlineCode}>makeTotalPct</code> is a function that <strong>returns</strong> 
                another function
              </li>
              <li>
                The returned function "remembers" the <code className={styles.inlineCode}>startValue</code> and{' '}
                <code className={styles.inlineCode}>years</code> values (this is called a <strong>closure</strong>)
              </li>
              <li>
                This lets us create customized functions without duplicating code
              </li>
            </ul>
          </div>

          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <TrendingUp className={styles.codeIcon} />
              The goalSeek function - a powerful higher-order function
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`def goalSeek(function, lowLimit, highLimit, target, maxError=.01):
    """
    Find the input value that makes function(input) approximately equal to target.
    Uses binary search to efficiently find the answer.
    """
    error = maxError + 1
    
    while error > maxError:
        guess = (lowLimit + highLimit) / 2
        result = function(guess)
        error = abs(result - target)
        
        if result > target:
            highLimit = guess
        if result < target:
            lowLimit = guess
    
    return guess

# Example: Find the square root of 2
def square(x):
    return x * x

sqrt_2 = goalSeek(square, 0, 5, 2, 0.0001)
print(f"Square root of 2 ≈ {sqrt_2}")`}</code>
            </pre>
          </div>

          <div className={styles.infoBox}>
            <h4 className={styles.infoTitle}>Real-World Application</h4>
            <p>
              The <code className={styles.inlineCode}>goalSeek</code> function is incredibly useful for solving 
              problems where you need to find an input that produces a desired output. Financial analysts use this 
              technique to determine interest rates, engineers use it to find optimal parameters, and data scientists 
              use it in machine learning optimization.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'part3',
      title: 'Part 3: Functions That Return Functions (Closures)',
      description: 'Creating function factories that generate customized functions.',
      content: (
        <div className={styles.lessonContent}>
          <p>
            When a function returns another function, the inner function can "remember" variables from the outer 
            function's scope. This is called a <strong>closure</strong>, and it's an incredibly powerful technique 
            for creating specialized functions.
          </p>

          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <Code className={styles.codeIcon} />
              A simple closure example
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`def make_multiplier(n):
    """Returns a function that multiplies its input by n"""
    def multiplier(x):
        return x * n
    return multiplier

# Create specialized functions
times_2 = make_multiplier(2)
times_10 = make_multiplier(10)

print(times_2(5))   # Output: 10
print(times_10(5))  # Output: 50`}</code>
            </pre>
          </div>

          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>How Closures Work</h4>
            <ul className={styles.conceptList}>
              <li>
                The inner function (<code className={styles.inlineCode}>multiplier</code>) has access to variables 
                from the outer function (<code className={styles.inlineCode}>n</code>)
              </li>
              <li>
                Even after <code className={styles.inlineCode}>make_multiplier</code> finishes executing, the 
                returned function still "remembers" the value of <code className={styles.inlineCode}>n</code>
              </li>
              <li>
                Each call to <code className={styles.inlineCode}>make_multiplier</code> creates a new closure with 
                its own independent copy of the variables
              </li>
            </ul>
          </div>

          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <Calculator className={styles.codeIcon} />
              Creating function generators for complex calculations
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`def make_root_finder(n):
    """
    Returns a function that finds the nth root of a number.
    For example, make_root_finder(2) creates a square root finder.
    """
    def nth_power(x):
        return x ** n
    
    def find_root(target):
        return goalSeek(nth_power, 0, target, target, 0.0001)
    
    return find_root

# Create specialized root finders
sqrt = make_root_finder(2)      # Square root
cube_root = make_root_finder(3) # Cube root

print(f"√4 = {sqrt(4)}")          # Output: 2.0
print(f"∛8 = {cube_root(8)}")     # Output: 2.0`}</code>
            </pre>
          </div>

          <div className={styles.infoBox}>
            <h4 className={styles.infoTitle}>Practical Benefits</h4>
            <p>
              Function factories like these allow you to:
            </p>
            <ul className={styles.conceptList}>
              <li>Eliminate code duplication</li>
              <li>Create families of related functions efficiently</li>
              <li>Encapsulate configuration and state</li>
              <li>Build more maintainable and testable code</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'part4',
      title: 'Part 4: Combining Higher-Order Functions',
      description: 'Building sophisticated programs by composing higher-order functions.',
      content: (
        <div className={styles.lessonContent}>
          <p>
            The real power of higher-order functions emerges when we combine them. Let's revisit the CPI inflation 
            problem from the course materials and see how all these concepts work together.
          </p>

          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <TrendingUp className={styles.codeIcon} />
              The complete inflation calculator
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`# Helper functions
def pctIncrease(begin, end):
    return 100*(end/begin-1)

def increaseByPct(begin, pct):
    return begin+begin*pct/100

def goalSeek(function, lowLimit, highLimit, target, maxError=.01):
    error = maxError + 1
    while error > maxError:
        guess = (lowLimit+highLimit)/2
        result = function(guess)
        error = abs(result-target)
        if result > target:
            highLimit = guess
        if result < target:
            lowLimit = guess
    return guess

# Function factory that creates inflation calculators
def makeTotalPct(startValue, years):
    """
    Returns a function that calculates the total percentage increase
    over a given number of years for a specified annual rate.
    """
    def totalPct(pct):
        value = startValue
        for year in range(years):
            value = increaseByPct(value, pct)
        return(pctIncrease(startValue, value))
    return totalPct

# Create specialized functions for different time periods
totalPct = makeTotalPct(175.1, 5)
totalPct2 = makeTotalPct(154.4, 10)

# Find the annual rate that produces a 13.2% increase
annual_rate_5yr = goalSeek(totalPct, -100, 100, 13.2, .0001)
annual_rate_10yr = goalSeek(totalPct2, -100, 100, 13.2, .0001)

print(f"For a 13.2% increase over 5 years: {annual_rate_5yr:.2f}% per year")
print(f"For a 13.2% increase over 10 years: {annual_rate_10yr:.2f}% per year")`}</code>
            </pre>
          </div>

          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>Understanding the Flow</h4>
            <ol className={styles.conceptList}>
              <li>
                <code className={styles.inlineCode}>makeTotalPct</code> creates a function customized for specific 
                starting values and time periods
              </li>
              <li>
                We pass that generated function to <code className={styles.inlineCode}>goalSeek</code>
              </li>
              <li>
                <code className={styles.inlineCode}>goalSeek</code> repeatedly calls the function with different 
                inputs until it finds the answer
              </li>
              <li>
                The closure mechanism ensures each generated function "remembers" its starting value and years
              </li>
            </ol>
          </div>

          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <ArrowRight className={styles.codeIcon} />
              Creating a more flexible version
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`def printAnnualizedRate(year, n):
    """
    Finds and prints the annualized rate needed to match
    a specific year's total increase over n years.
    """
    # pattern is a tuple: (start_index, current_index)
    pattern = (0, 2, 17)
    
    # Get the CPI values for the specified year
    start_cpi = cpi[year-1][1]
    current_cpi = cpi[year-1][pattern[1]]
    
    # Calculate the total percentage increase
    pct = pctIncrease(start_cpi, current_cpi)
    
    # Create a function for this specific scenario
    totalPct = makeTotalPct(start_cpi, n)
    
    # Find the annual rate
    annual = goalSeek(totalPct, -100, 100, pct, .0001)
    
    print(f"{year}: {annual:.2f}% annualized over {n} years")

# Use it for multiple years
for year in range(1913, 2009):
    if year >= 1923:  # Need at least 10 years of data
        printAnnualizedRate(year, 10)`}</code>
            </pre>
          </div>

          <div className={styles.infoBox}>
            <h4 className={styles.infoTitle}>Why This Approach is Powerful</h4>
            <p>
              By combining higher-order functions:
            </p>
            <ul className={styles.conceptList}>
              <li>We write the complex logic once (<code>makeTotalPct</code> and <code>goalSeek</code>)</li>
              <li>We can easily apply it to different scenarios without rewriting code</li>
              <li>The code reads more like a description of the problem we're solving</li>
              <li>Testing and debugging become easier because each function has a single, clear purpose</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'part5',
      title: 'Part 5: Advanced Applications and Best Practices',
      description: 'Real-world patterns and techniques for using higher-order functions effectively.',
      content: (
        <div className={styles.lessonContent}>
          <p>
            Now that we understand the fundamentals, let's explore some advanced patterns and best practices for 
            working with higher-order functions in Python.
          </p>

          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <Zap className={styles.codeIcon} />
              Creating function pipelines
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`def compose(*functions):
    """
    Returns a function that applies multiple functions in sequence.
    compose(f, g, h)(x) is equivalent to f(g(h(x)))
    """
    def inner(arg):
        result = arg
        for func in reversed(functions):
            result = func(result)
        return result
    return inner

# Example: Create a pipeline for data processing
def clean_text(text):
    return text.strip().lower()

def remove_punctuation(text):
    import string
    return text.translate(str.maketrans('', '', string.punctuation))

def count_words(text):
    return len(text.split())

# Combine them into a single operation
process_text = compose(count_words, remove_punctuation, clean_text)

text = "  Hello, World! This is Python.  "
word_count = process_text(text)
print(f"Word count: {word_count}")  # Output: Word count: 4`}</code>
            </pre>
          </div>

          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>The Map-Filter-Reduce Pattern</h4>
            <p>
              Python provides built-in higher-order functions that are fundamental to functional programming:
            </p>
            <ul className={styles.conceptList}>
              <li>
                <code className={styles.inlineCode}>map(func, iterable)</code> - Apply a function to every element
              </li>
              <li>
                <code className={styles.inlineCode}>filter(func, iterable)</code> - Keep only elements where 
                function returns True
              </li>
              <li>
                <code className={styles.inlineCode}>reduce(func, iterable)</code> - Combine elements using a function
              </li>
            </ul>
          </div>

          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <Calculator className={styles.codeIcon} />
              Using map, filter, and reduce
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`from functools import reduce

# Sample data: CPI values
cpi_values = [175.1, 180.2, 185.5, 190.8, 195.2]

# Map: Calculate year-over-year percentage changes
def pct_change(pair):
    return 100 * (pair[1] / pair[0] - 1)

# Create pairs of consecutive years
pairs = zip(cpi_values[:-1], cpi_values[1:])
changes = list(map(pct_change, pairs))
print(f"Year-over-year changes: {changes}")

# Filter: Keep only years with inflation > 2.5%
high_inflation = list(filter(lambda x: x > 2.5, changes))
print(f"High inflation years: {high_inflation}")

# Reduce: Calculate average inflation
average = reduce(lambda x, y: x + y, changes) / len(changes)
print(f"Average inflation: {average:.2f}%")`}</code>
            </pre>
          </div>

          <div className={styles.infoBox}>
            <h4 className={styles.infoTitle}>Lambda Functions</h4>
            <p>
              For simple functions, Python provides <code className={styles.inlineCode}>lambda</code> expressions 
              - anonymous functions defined in a single line:
            </p>
            <pre className={styles.codeBlock}>
              <code>{`# These are equivalent:
def square(x):
    return x ** 2

square = lambda x: x ** 2

# Lambdas are useful for quick operations:
numbers = [1, 2, 3, 4, 5]
squares = list(map(lambda x: x ** 2, numbers))
evens = list(filter(lambda x: x % 2 == 0, numbers))`}</code>
            </pre>
          </div>

          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>Best Practices</h4>
            <ul className={styles.conceptList}>
              <li>
                Use descriptive names for functions, even when passing them as arguments
              </li>
              <li>
                Keep lambda functions simple - if it's complex, define a regular function
              </li>
              <li>
                Document what your higher-order functions expect and return
              </li>
              <li>
                Consider using list comprehensions instead of map/filter for better readability
              </li>
              <li>
                Test functions independently before combining them
              </li>
            </ul>
          </div>

          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <BookOpen className={styles.codeIcon} />
              Practical example: Data analysis with higher-order functions
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`def analyze_cpi_data(cpi_data, start_year, end_year, threshold):
    """
    Analyze CPI data to find years with inflation above a threshold.
    
    Args:
        cpi_data: List of (year, cpi_value) tuples
        start_year: First year to analyze
        end_year: Last year to analyze
        threshold: Minimum inflation rate to report
    
    Returns:
        List of (year, inflation_rate) tuples for years above threshold
    """
    # Filter to get years in range
    in_range = filter(
        lambda item: start_year <= item[0] <= end_year,
        cpi_data
    )
    
    # Calculate inflation rates
    data_list = list(in_range)
    inflation_rates = []
    
    for i in range(len(data_list) - 1):
        year = data_list[i+1][0]
        rate = pctIncrease(data_list[i][1], data_list[i+1][1])
        inflation_rates.append((year, rate))
    
    # Filter for high inflation years
    high_inflation = list(filter(
        lambda item: item[1] > threshold,
        inflation_rates
    ))
    
    return high_inflation

# Example usage
cpi_data = [
    (2018, 251.1),
    (2019, 255.7),
    (2020, 258.8),
    (2021, 271.0),
    (2022, 292.7)
]

results = analyze_cpi_data(cpi_data, 2019, 2022, 5.0)
print("Years with inflation > 5%:")
for year, rate in results:
    print(f"  {year}: {rate:.2f}%")`}</code>
            </pre>
          </div>
        </div>
      )
    }
  ];

  const practiceExercises: Exercise[] = [
    {
      title: 'Question 1: Finding Square Roots',
      description:
        'Use the goalSeek function to find the square root of 2. Start by defining a function that squares numbers, then see what argument value causes this function to return 2.',
      difficulty: 'beginner',
      starter: `def goalSeek(function, lowLimit, highLimit, target, maxError=.01):
    error = maxError + 1
    while error > maxError:
        guess = (lowLimit+highLimit)/2
        result = function(guess)
        error = abs(result-target)
        if result > target:
            highLimit = guess
        if result < target:
            lowLimit = guess
    return guess

# Your code here:
# 1. Define a function that squares numbers
# 2. Use goalSeek to find what value squared equals 2`,
      solution: `def goalSeek(function, lowLimit, highLimit, target, maxError=.01):
    error = maxError + 1
    while error > maxError:
        guess = (lowLimit+highLimit)/2
        result = function(guess)
        error = abs(result-target)
        if result > target:
            highLimit = guess
        if result < target:
            lowLimit = guess
    return guess

def square(x):
    return x * x

# Find the square root of 2
sqrt_2 = goalSeek(square, 0, 5, 2, .0001)
print(f"The square root of 2 is approximately {sqrt_2}")
print(f"Verification: {sqrt_2} squared = {square(sqrt_2)}")`
    },
    {
      title: 'Question 2: Finding Multiple Roots',
      description:
        'Use the goalSeek function to find all roots from the square root to the 10th root. Instead of manually writing different functions for each root, use a function that creates them for you.',
      difficulty: 'intermediate',
      starter: `def goalSeek(function, lowLimit, highLimit, target, maxError=.01):
    error = maxError + 1
    while error > maxError:
        guess = (lowLimit+highLimit)/2
        result = function(guess)
        error = abs(result-target)
        if result > target:
            highLimit = guess
        if result < target:
            lowLimit = guess
    return guess

# Your code here:
# 1. Create a function that creates power functions (x^n)
# 2. Use it to find roots from 2 to 10`,
      solution: `def goalSeek(function, lowLimit, highLimit, target, maxError=.01):
    error = maxError + 1
    while error > maxError:
        guess = (lowLimit+highLimit)/2
        result = function(guess)
        error = abs(result-target)
        if result > target:
            highLimit = guess
        if result < target:
            lowLimit = guess
    return guess

def make_power_function(n):
    """Returns a function that raises its input to the nth power"""
    def power(x):
        return x ** n
    return power

# Find roots from 2 to 10
target = 2
for n in range(2, 11):
    power_func = make_power_function(n)
    root = goalSeek(power_func, 0, target, target, 0.0001)
    print(f"The {n}{'th' if n > 3 else ['st', 'nd', 'rd'][n-1]} root of {target} is approximately {root:.6f}")
    print(f"  Verification: {root}^{n} = {power_func(root):.6f}")
    print()`
    },
    {
      title: 'Question 3: Multiplication Table Generator',
      description:
        'Write a program to produce a neat multiplication table. Use functions to organize your code effectively.',
      difficulty: 'intermediate',
      starter: `# Your code here:
# Create a function that prints a formatted multiplication table
# The table should show products from 1x1 to 10x10
# Format the output so numbers align properly in columns`,
      solution: `def print_multiplication_table(size=10):
    """
    Prints a formatted multiplication table.
    
    Args:
        size: The size of the table (default 10 for 10x10)
    """
    # Print header row
    print("    ", end="")
    for i in range(1, size + 1):
        print(f"{i:4}", end="")
    print()
    
    # Print separator
    print("   " + "-" * (4 * size + 1))
    
    # Print each row
    for i in range(1, size + 1):
        print(f"{i:2} |", end="")
        for j in range(1, size + 1):
            print(f"{i*j:4}", end="")
        print()

# Alternative approach using higher-order functions
def create_row_generator(multiplier):
    """Returns a function that generates a row of the multiplication table"""
    def generate_row(size):
        return [multiplier * i for i in range(1, size + 1)]
    return generate_row

def print_table_functional(size=10):
    """Print multiplication table using functional approach"""
    # Print header
    print("    ", end="")
    for i in range(1, size + 1):
        print(f"{i:4}", end="")
    print()
    print("   " + "-" * (4 * size + 1))
    
    # Generate and print each row
    for i in range(1, size + 1):
        row_gen = create_row_generator(i)
        row = row_gen(size)
        print(f"{i:2} |", end="")
        for num in row:
            print(f"{num:4}", end="")
        print()

# Use either version
print("Standard approach:")
print_multiplication_table(10)
print("\\nFunctional approach:")
print_table_functional(10)`
    },
    {
      title: 'Question 4: Debugging goalSeek',
      description:
        'The following function returns 10 for some argument value between 0 and 5. Find that value using goalSeek, but first identify and fix the problem in the mystery function.',
      difficulty: 'intermediate',
      starter: `def goalSeek(function, lowLimit, highLimit, target, maxError=.01):
    error = maxError + 1
    while error > maxError:
        guess = (lowLimit+highLimit)/2
        result = function(guess)
        error = abs(result-target)
        if result > target:
            highLimit = guess
        if result < target:
            lowLimit = guess
    return guess

def mystery(x):
    return x*x - 10*x + 25

# This function returns 10 somewhere between 0 and 5
# But if you try goalSeek(mystery, 0, 5, 10, .001), something goes wrong
# Find and fix the problem`,
      solution: `def goalSeek(function, lowLimit, highLimit, target, maxError=.01):
    error = maxError + 1
    while error > maxError:
        guess = (lowLimit+highLimit)/2
        result = function(guess)
        error = abs(result-target)
        if result > target:
            highLimit = guess
        if result < target:
            lowLimit = guess
    return guess

def mystery(x):
    return x*x - 10*x + 25

# The problem: mystery(x) = (x-5)^2, which means it has a minimum value of 0 at x=5
# It equals 10 at TWO points: when (x-5)^2 = 10
# This means x-5 = ±√10, so x ≈ 1.84 or x ≈ 8.16

# The issue is that goalSeek gets confused because the function is not monotonic
# It has both an increasing and decreasing section

# Solution: We need to search in a range where the function is monotonic
print("Finding where mystery(x) = 10:")
print(f"In range [0, 5]: x ≈ {goalSeek(mystery, 0, 5, 10, .001)}")

# To verify, let's look at the function behavior:
print("\\nFunction values:")
for x in [0, 1, 2, 3, 4, 5]:
    print(f"mystery({x}) = {mystery(x)}")

# The function decreases from 0 to 5, reaching minimum at 5
# So we can only find values ≥ 0 in this range
# To find where it equals 10, we need x < 5 where the function is decreasing`
    },
    {
      title: 'Question 5: Phone Directory Formatter',
      description:
        'Write a program to produce an alphabetized phone directory from a tab-delimited file. The data uses a specific format, and the output should use a different, more readable format.',
      difficulty: 'advanced',
      starter: `# phoneData.txt contains:
# Smith    John    212-745-1234
# Mayflower    Abigail Lou    718-255-6656
# Brown-Appleby    Anthony    516-778-9813

# Output should be:
# Brown-Appleby, Anthony (516) 778-9813
# Mayflower, Abigail Lou (718) 255-6656
# Smith, John (212) 745-1234

# Hint: The string method split includes an optional argument for separator
# For example, 'a:b:cd:e'.split(':') returns ['a', 'b', 'cd', 'e']

# Your code here:`,
      solution: `def format_phone_number(phone):
    """
    Formats a phone number from XXX-YYY-ZZZZ to (XXX) YYY-ZZZZ
    """
    parts = phone.split('-')
    return f"({parts[0]}) {parts[1]}-{parts[2]}"

def format_directory_entry(line):
    """
    Converts a tab-delimited line to formatted directory entry.
    Input: "LastName    FirstName    PhoneNumber"
    Output: "LastName, FirstName (XXX) YYY-ZZZZ"
    """
    parts = line.strip().split('\\t')
    last_name = parts[0]
    first_name = parts[1]
    phone = parts[2]
    
    formatted_phone = format_phone_number(phone)
    return f"{last_name}, {first_name} {formatted_phone}"

def create_phone_directory(filename):
    """
    Reads a phone data file and returns a sorted, formatted directory.
    """
    entries = []
    
    with open(filename, 'r') as file:
        for line in file:
            if line.strip():  # Skip empty lines
                formatted = format_directory_entry(line)
                entries.append(formatted)
    
    # Sort alphabetically
    entries.sort()
    return entries

def print_directory(filename):
    """
    Prints a formatted phone directory from a file.
    """
    directory = create_phone_directory(filename)
    for entry in directory:
        print(entry)

# Alternative functional approach
def create_directory_functional(filename):
    """
    Creates directory using map and filter for a more functional style.
    """
    with open(filename, 'r') as file:
        lines = file.readlines()
    
    # Filter out empty lines and format each entry
    entries = list(map(
        format_directory_entry,
        filter(lambda line: line.strip(), lines)
    ))
    
    return sorted(entries)

# Usage
print("Phone Directory")
print("-" * 50)
try:
    print_directory('phoneData.txt')
except FileNotFoundError:
    print("Error: phoneData.txt not found")
    print("\\nExample with sample data:")
    sample_data = [
        "Smith\\tJohn\\t212-745-1234",
        "Mayflower\\tAbigail Lou\\t718-255-6656",
        "Brown-Appleby\\tAnthony\\t516-778-9813"
    ]
    for line in sample_data:
        print(format_directory_entry(line))`
    }
  ];

  const getDifficultyColor = (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
    switch (difficulty) {
      case 'beginner':
        return '#4ade80';
      case 'intermediate':
        return '#fbbf24';
      case 'advanced':
        return '#f87171';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
            <div className={styles.headerContent}>
                <h1 className={styles.title}>Unit 7: Higher-Order Functions and Functional Programming</h1>
                <p className={styles.subtitle}>
                    Learn to treat functions as data, create function factories, and build sophisticated programs using 
                    higher-order functions
                </p>
            </div>
      </div>

      {/* Navigation Tabs */}
      <div className={styles.nav}>
        <div className={styles.navContent}>
          <nav className={styles.navTabs}>
            {[
              { id: 'overview', label: 'Overview', Icon: BookOpen },
              { id: 'lessons', label: 'Lessons', Icon: Play },
              { id: 'practice', label: 'Practice', Icon: Code }
            ].map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
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
                In this unit, you'll discover one of Python's most powerful features: the ability to treat functions 
                as first-class objects. You'll learn to pass functions as arguments, return functions from other 
                functions, and use these techniques to write elegant, reusable code. We'll apply these concepts to 
                solve real-world problems like finding roots, analyzing inflation data, and automating calculations.
              </p>

              <div className={styles.overviewGrid}>
                <div className={styles.objectivesCard}>
                  <h3 className={styles.cardTitle}>Learning Objectives</h3>
                  <ul className={styles.objectivesList}>
                    <li>Understand functions as first-class objects in Python</li>
                    <li>Pass functions as arguments to other functions</li>
                    <li>Create functions that return other functions (closures)</li>
                    <li>Use the <code>goalSeek</code> function to solve equations numerically</li>
                    <li>Build function factories for creating specialized functions</li>
                    <li>Apply higher-order functions to data analysis problems</li>
                    <li>Understand and use <code>map</code>, <code>filter</code>, and lambda functions</li>
                  </ul>
                </div>

                <div className={styles.prerequisitesCard}>
                  <h3 className={styles.cardTitle}>Prerequisites</h3>
                  <ul className={styles.objectivesList}>
                    <li>Strong understanding of function definitions and calls</li>
                    <li>Familiarity with loops and conditionals</li>
                    <li>Understanding of variable scope</li>
                    <li>Basic knowledge of lists and data structures</li>
                    <li>Comfort with mathematical concepts like percentages</li>
                  </ul>
                </div>
              </div>

              <div className={styles.infoBox}>
                <h4 className={styles.infoTitle}>Why Higher-Order Functions Matter</h4>
                <p>
                  Higher-order functions are fundamental to writing clean, maintainable code. They allow you to:
                </p>
                <ul className={styles.objectivesList}>
                  <li>
                    <strong>Eliminate code duplication</strong> - Write general solutions that work for many cases
                  </li>
                  <li>
                    <strong>Separate concerns</strong> - Keep different aspects of your program independent
                  </li>
                  <li>
                    <strong>Increase flexibility</strong> - Change behavior without rewriting code
                  </li>
                  <li>
                    <strong>Express intent clearly</strong> - Code that reads like the problem it solves
                  </li>
                </ul>
                <p>
                  These concepts are used extensively in professional programming, data science, web development, and 
                  virtually every modern software system.
                </p>
              </div>
            </div>

            <div className={styles.progressSection}>
              <h3 className={styles.sectionTitle}>Unit Progress</h3>
              <div className={styles.progressGrid}>
                {lessons.map((lesson, index) => (
                  <div key={lesson.id} className={styles.progressItem}>
                    <div className={styles.progressNumber}>{index + 1}</div>
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
              {lessons.map(lesson => (
                <div key={lesson.id} className={styles.lessonCard}>
                  <button onClick={() => toggleSection(lesson.id)} className={styles.lessonHeader}>
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

                  {expandedSections[lesson.id] && <div className={styles.lessonBody}>{lesson.content}</div>}
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
                These exercises will help you master higher-order functions. Start with the basics of using 
                goalSeek, then progress to creating your own function factories and solving complex problems. 
                Remember: the goal is to write elegant, reusable code that clearly expresses your intent.
              </p>
            </div>

            <div className={styles.exercisesGrid}>
              {practiceExercises.map((exercise, index) => (
                <div key={index} className={styles.exerciseCard}>
                  <button onClick={() => toggleSection(`exercise-${index}`)} className={styles.exerciseHeader}>
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
                          <summary className={styles.solutionSummary}>View Solution</summary>
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
              <h3 className={styles.helpTitle}>Tips for Success</h3>
              <p className={styles.helpDescription}>Keep these principles in mind as you work through the exercises:</p>
              <ul className={styles.helpList}>
                <li>
                  <strong>Start simple:</strong> Test your functions with simple inputs before tackling complex problems
                </li>
                <li>
                  <strong>Use descriptive names:</strong> Function names should clearly indicate what they do
                </li>
                <li>
                  <strong>Write docstrings:</strong> Document what your functions expect and return
                </li>
                <li>
                  <strong>Think about reusability:</strong> Can your function be used in different contexts?
                </li>
                <li>
                  <strong>Test incrementally:</strong> Make sure each piece works before combining them
                </li>
                <li>
                  <strong>Don't over-complicate:</strong> Sometimes a simple solution is better than a clever one
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CSCI133Unit7;