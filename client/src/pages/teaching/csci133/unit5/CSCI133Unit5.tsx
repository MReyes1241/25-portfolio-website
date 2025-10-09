import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Play, Code, BookOpen, FolderTree, FileText, HardDrive, Terminal } from 'lucide-react';
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

const CSCI133Unit5: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'overview' | 'lessons' | 'practice'>('overview');

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const lessons: Lesson[] = [
    {
      id: 'part1',
      title: 'Part 1: Working with Files and Folders',
      description: 'Understanding the OS module and navigating the file system',
      content: (
        <div className={styles.lessonContent}>
          <p>
            Files on your computer are organized into folders (directories). Python's <code className={styles.inlineCode}>os</code> module 
            provides powerful tools to navigate and manipulate this file system programmatically.
          </p>
          
          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>File System Concepts:</h4>
            <ul className={styles.conceptList}>
              <li><strong>Path</strong>: Location of a file or folder (e.g., C:\Users\Documents\file.txt)</li>
              <li><strong>Directory</strong>: A folder that contains files and other folders</li>
              <li><strong>Current Directory</strong>: Where your Python program is currently "looking"</li>
              <li><strong>Parent Directory</strong>: The folder containing the current folder</li>
            </ul>
          </div>

          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <FolderTree className={styles.codeIcon} />
              Basic OS Module Usage
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`import os

# Get the current working directory
current_dir = os.getcwd()
print(f"Currently in: {current_dir}")

# List files in current directory
files = os.listdir()
print(f"Files here: {files}")

# List files in a specific directory
files = os.listdir('/path/to/folder')

# Check if something exists
if os.path.exists('myfile.txt'):
    print("File exists!")

# Check if it's a file or directory
if os.path.isfile('document.txt'):
    print("It's a file")
if os.path.isdir('folder'):
    print("It's a directory")`}</code>
            </pre>
          </div>

          <div className={styles.infoBox}>
            <h4 className={styles.infoTitle}>Path Separators:</h4>
            <p>
              Windows uses backslash (\) while Mac/Linux use forward slash (/). 
              Python's <code className={styles.inlineCode}>os.path.join()</code> automatically uses the correct separator for your system.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'part2',
      title: 'Part 2: Listing Files and Directories',
      description: 'Creating programs that explore and report on file structures',
      content: (
        <div className={styles.lessonContent}>
          <p>
            The <code className={styles.inlineCode}>os.listdir()</code> function returns a list of everything in a directory. 
            We can filter and process this list to find specific files or organize them.
          </p>
          
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <FileText className={styles.codeIcon} />
              Directory Listing Examples
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`import os

# Question 0.1: List all items in current directory
items = os.listdir()
for item in items:
    print(item)

# Question 0.2: List items in parent directory with stars for folders
parent_items = os.listdir('..')
for item in parent_items:
    path = os.path.join('..', item)
    if os.path.isdir(path):
        print(f"* {item}")
    else:
        print(f"  {item}")`}</code>
            </pre>
          </div>

          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>Special Directory Symbols:</h4>
            <ul className={styles.conceptList}>
              <li><code className={styles.inlineCode}>.</code> (single dot) = current directory</li>
              <li><code className={styles.inlineCode}>..</code> (two dots) = parent directory</li>
              <li><code className={styles.inlineCode}>~</code> (tilde) = home directory (Unix/Mac)</li>
            </ul>
          </div>

          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>Filtering Directory Contents</h4>
            <pre className={styles.codeBlock}>
              <code>{`# Question 0.6: List only Python files and directories
for item in os.listdir():
    if os.path.isdir(item):
        print(f"[DIR] {item}")
    elif item.endswith('.py'):
        print(f"[PY]  {item}")`}</code>
            </pre>
          </div>
        </div>
      )
    },
    {
      id: 'part3',
      title: 'Part 3: Creating a lister() Function',
      description: 'Building reusable functions for directory exploration',
      content: (
        <div className={styles.lessonContent}>
          <p>
            Let's create a versatile <code className={styles.inlineCode}>lister()</code> function that can display 
            directory contents in different ways. This demonstrates how to make code more reusable and flexible.
          </p>
          
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>Basic lister() Function</h4>
            <pre className={styles.codeBlock}>
              <code>{`import os

def lister(path):
    """List items in a directory with stars for subdirectories"""
    for filename in os.listdir(path):
        newpath = os.path.join(path, filename)
        if os.path.isdir(newpath):
            print(f"*** {filename}")
        else:
            print(f"    {filename}")

# Use the function
lister('.')  # Current directory
lister('..')  # Parent directory`}</code>
            </pre>
          </div>

          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>Enhanced lister() with Indentation</h4>
            <pre className={styles.codeBlock}>
              <code>{`# Question 0.5: Modify to show subdirectory contents indented
def lister(path):
    for filename in os.listdir(path):
        newpath = os.path.join(path, filename)
        if os.path.isdir(newpath):
            print(f"*** {filename}")
            # Show what's inside subdirectories (indented)
            try:
                for subitem in os.listdir(newpath):
                    print(f"        {subitem}")
            except PermissionError:
                print("        [Permission Denied]")
        else:
            print(f"    {filename}")`}</code>
            </pre>
          </div>

          <div className={styles.infoBox}>
            <h4 className={styles.infoTitle}>Why Use Functions?</h4>
            <p>
              Functions like <code className={styles.inlineCode}>lister()</code> can be called multiple times with different paths, 
              avoiding code duplication and making programs easier to maintain.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'part4',
      title: 'Part 4: Recursive Directory Exploration',
      description: 'Understanding recursion through file system navigation',
      content: (
        <div className={styles.lessonContent}>
          <p>
            Recursion is when a function calls itself. It's perfect for exploring nested directories 
            because each folder can contain more folders, creating a tree-like structure.
          </p>
          
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <Terminal className={styles.codeIcon} />
              Question 1: Recursive printFred Function
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`# Print "Fred" 100 times using recursion
def printFred(n):
    if n >= 1:  # Base case: stop when n is 0
        print("Fred")
        printFred(n - 1)  # Recursive call with n-1

# Call it
printFred(100)

# How it works:
# printFred(3) prints "Fred", then calls printFred(2)
# printFred(2) prints "Fred", then calls printFred(1)
# printFred(1) prints "Fred", then calls printFred(0)
# printFred(0) does nothing (base case)`}</code>
            </pre>
          </div>

          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>Recursion Components:</h4>
            <ul className={styles.conceptList}>
              <li><strong>Base Case</strong>: Condition to stop recursing (e.g., n = 0)</li>
              <li><strong>Recursive Case</strong>: Function calls itself with modified input</li>
              <li><strong>Progress</strong>: Each call moves closer to base case</li>
            </ul>
          </div>

          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>Recursive vs Loop</h4>
            <pre className={styles.codeBlock}>
              <code>{`# Using a loop (iterative)
for i in range(100):
    print("Fred")

# Using recursion
def printFred(n):
    if n >= 1:
        print("Fred")
        printFred(n - 1)

printFred(100)

# Both do the same thing!`}</code>
            </pre>
          </div>
        </div>
      )
    },
    {
      id: 'part5',
      title: 'Part 5: Handling Errors with UnicodeDecodeError',
      description: 'Managing file encoding issues and non-text files',
      content: (
        <div className={styles.lessonContent}>
          <p>
            Not all files are text files. When Python tries to read binary files (images, executables) as text, 
            it encounters <code className={styles.inlineCode}>UnicodeDecodeError</code>. We need to handle these gracefully.
          </p>
          
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>
              <HardDrive className={styles.codeIcon} />
              Question 2: Listing Files with Random Content
            </h4>
            <pre className={styles.codeBlock}>
              <code>{`import os

# List all files containing 'random' (handling errors)
for filename in os.listdir():
    if os.path.isfile(filename):
        try:
            with open(filename, 'r') as file:
                content = file.read()
                if 'random' in content.lower():
                    print(f"Found in: {filename}")
        except UnicodeDecodeError:
            # Binary file - can't read as text
            pass
        except Exception as e:
            print(f"Error reading {filename}: {e}")`}</code>
            </pre>
          </div>

          <div className={styles.conceptBox}>
            <h4 className={styles.conceptTitle}>Common File Types:</h4>
            <ul className={styles.conceptList}>
              <li><strong>Text files</strong>: .txt, .py, .html, .csv (readable)</li>
              <li><strong>Binary files</strong>: .jpg, .exe, .pdf, .mp3 (not text)</li>
              <li><strong>Mixed</strong>: Some files may have both text and binary data</li>
            </ul>
          </div>

          <div className={styles.infoBox}>
            <h4 className={styles.infoTitle}>Error Handling Best Practice:</h4>
            <p>
              Always use try-except blocks when reading files. You never know what type of file you might encounter, 
              and graceful error handling prevents your program from crashing.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'part6',
      title: 'Part 6: Counting Files and Analyzing Directories',
      description: 'Building tools to analyze file system statistics',
      content: (
        <div className={styles.lessonContent}>
          <p>
            Let's create programs that gather statistics about directories, count different types of files, 
            and recursively explore entire directory trees.
          </p>
          
          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>Question 3: Counting All Files</h4>
            <pre className={styles.codeBlock}>
              <code>{`import os

def count_files(path):
    """Count total files in directory and all subdirectories"""
    total = 0
    
    for item in os.listdir(path):
        item_path = os.path.join(path, item)
        
        if os.path.isfile(item_path):
            total += 1
        elif os.path.isdir(item_path):
            try:
                # Recursively count files in subdirectory
                total += count_files(item_path)
            except PermissionError:
                pass  # Skip directories we can't access
    
    return total

# Report file counts
current_files = count_files('.')
print(f"Files in current directory tree: {current_files}")

if os.path.exists('..'):
    parent_files = count_files('..')
    print(f"Files in parent directory tree: {parent_files}")`}</code>
            </pre>
          </div>

          <div className={styles.codeExample}>
            <h4 className={styles.codeTitle}>Advanced: File Type Analysis</h4>
            <pre className={styles.codeBlock}>
              <code>{`import os

def analyze_directory(path):
    """Analyze file types in a directory"""
    stats = {
        'python': 0,
        'text': 0,
        'other': 0,
        'directories': 0
    }
    
    for item in os.listdir(path):
        item_path = os.path.join(path, item)
        
        if os.path.isdir(item_path):
            stats['directories'] += 1
        elif item.endswith('.py'):
            stats['python'] += 1
        elif item.endswith(('.txt', '.md', '.csv')):
            stats['text'] += 1
        else:
            stats['other'] += 1
    
    return stats

# Analyze current directory
stats = analyze_directory('.')
print(f"Python files: {stats['python']}")
print(f"Text files: {stats['text']}")
print(f"Directories: {stats['directories']}")
print(f"Other files: {stats['other']}")`}</code>
            </pre>
          </div>
        </div>
      )
    }
  ];

  const practiceExercises: Exercise[] = [
    {
      title: "Exercise 1: Basic Directory Explorer",
      description: "Create a program that lists all items in the current directory, marking directories with stars.",
      difficulty: 'beginner',
      starter: `import os

# Write a program that:
# 1. Lists all items in the current directory
# 2. Puts a * before directory names
# 3. Shows regular files without any prefix

`,
      solution: `import os

# List all items in current directory
items = os.listdir()

for item in items:
    if os.path.isdir(item):
        print(f"* {item}")
    else:
        print(f"  {item}")

# Alternative with sorted output
print("\\nSorted version:")
items.sort()
for item in items:
    if os.path.isdir(item):
        print(f"[DIR]  {item}")
    else:
        print(f"[FILE] {item}")`
    },
    {
      title: "Exercise 2: Python File Finder",
      description: "Write a program that finds all Python files in the current directory and its subdirectories.",
      difficulty: 'intermediate',
      starter: `import os

def find_python_files(directory):
    """Find all .py files in directory and subdirectories"""
    # Your code here
    pass

# Test your function
python_files = find_python_files('.')
for file in python_files:
    print(file)

`,
      solution: `import os

def find_python_files(directory):
    """Find all .py files in directory and subdirectories"""
    python_files = []
    
    for item in os.listdir(directory):
        item_path = os.path.join(directory, item)
        
        if os.path.isfile(item_path) and item.endswith('.py'):
            python_files.append(item_path)
        elif os.path.isdir(item_path):
            try:
                # Recursively search subdirectories
                subdir_files = find_python_files(item_path)
                python_files.extend(subdir_files)
            except PermissionError:
                print(f"Cannot access: {item_path}")
    
    return python_files

# Test the function
python_files = find_python_files('.')
print(f"Found {len(python_files)} Python files:")
for file in python_files:
    print(f"  {file}")`
    },
    {
      title: "Exercise 3: Word Searcher",
      description: "Create a program that searches for a specific word in all text files in the current directory.",
      difficulty: 'intermediate',
      starter: `import os

def search_word_in_files(word):
    """Search for a word in all readable files"""
    # Your code here
    # Should return list of files containing the word
    pass

# Test: search for 'python'
files = search_word_in_files('python')
print(f"Files containing 'python': {files}")

`,
      solution: `import os

def search_word_in_files(word):
    """Search for a word in all readable files"""
    matching_files = []
    word_lower = word.lower()
    
    for filename in os.listdir():
        if os.path.isfile(filename):
            try:
                with open(filename, 'r') as file:
                    content = file.read().lower()
                    if word_lower in content:
                        matching_files.append(filename)
            except UnicodeDecodeError:
                # Skip binary files
                pass
            except Exception as e:
                print(f"Error reading {filename}: {e}")
    
    return matching_files

# Test the function
word = input("Enter word to search for: ")
files = search_word_in_files(word)

if files:
    print(f"\\nFound '{word}' in {len(files)} files:")
    for f in files:
        print(f"  - {f}")
else:
    print(f"No files contain '{word}'")`
    },
    {
      title: "Exercise 4: Directory Tree Visualizer",
      description: "Build a function that displays the directory structure with proper indentation for nested folders.",
      difficulty: 'advanced',
      starter: `import os

def show_tree(path, indent=0):
    """Display directory tree with indentation"""
    # Your code here
    # Should recursively show all folders and files
    # with proper indentation for each level
    pass

# Display tree starting from current directory
show_tree('.')

`,
      solution: `import os

def show_tree(path, indent=0):
    """Display directory tree with indentation"""
    # Get the directory name for the current level
    if indent == 0:
        print(os.path.basename(os.path.abspath(path)) + '/')
    
    try:
        items = os.listdir(path)
        items.sort()  # Sort for consistent output
        
        for i, item in enumerate(items):
            item_path = os.path.join(path, item)
            
            # Create the tree branches
            is_last = (i == len(items) - 1)
            prefix = '    ' * indent
            branch = '└── ' if is_last else '├── '
            
            if os.path.isdir(item_path):
                print(f"{prefix}{branch}{item}/")
                # Recursively show subdirectory contents
                show_tree(item_path, indent + 1)
            else:
                print(f"{prefix}{branch}{item}")
                
    except PermissionError:
        prefix = '    ' * indent
        print(f"{prefix}[Permission Denied]")
    except Exception as e:
        prefix = '    ' * indent
        print(f"{prefix}[Error: {e}]")

# Display tree
print("Directory Structure:")
print("-" * 40)
show_tree('.')`
    },
    {
      title: "Exercise 5: File Statistics Reporter",
      description: "Create a comprehensive report about files in a directory including counts, sizes, and types.",
      difficulty: 'advanced',
      starter: `import os

def generate_report(path):
    """Generate detailed statistics about a directory"""
    # Should count:
    # - Total files and directories
    # - Files by extension
    # - Total size (if possible)
    # - Deepest nesting level
    pass

# Generate and display report
report = generate_report('.')
print(report)

`,
      solution: `import os

def generate_report(path, max_depth=0, current_depth=0):
    """Generate detailed statistics about a directory"""
    stats = {
        'total_files': 0,
        'total_dirs': 0,
        'total_size': 0,
        'extensions': {},
        'max_depth': current_depth,
        'errors': 0
    }
    
    try:
        items = os.listdir(path)
        
        for item in items:
            item_path = os.path.join(path, item)
            
            if os.path.isfile(item_path):
                stats['total_files'] += 1
                
                # Get file size
                try:
                    stats['total_size'] += os.path.getsize(item_path)
                except:
                    stats['errors'] += 1
                
                # Count extensions
                if '.' in item:
                    ext = item.rsplit('.', 1)[1].lower()
                    stats['extensions'][ext] = stats['extensions'].get(ext, 0) + 1
                    
            elif os.path.isdir(item_path):
                stats['total_dirs'] += 1
                
                # Recursively analyze subdirectory
                try:
                    sub_stats = generate_report(item_path, max_depth, current_depth + 1)
                    stats['total_files'] += sub_stats['total_files']
                    stats['total_dirs'] += sub_stats['total_dirs']
                    stats['total_size'] += sub_stats['total_size']
                    stats['max_depth'] = max(stats['max_depth'], sub_stats['max_depth'])
                    
                    # Merge extension counts
                    for ext, count in sub_stats['extensions'].items():
                        stats['extensions'][ext] = stats['extensions'].get(ext, 0) + count
                except:
                    stats['errors'] += 1
                    
    except PermissionError:
        stats['errors'] += 1
        
    return stats

def format_size(bytes):
    """Convert bytes to human readable format"""
    for unit in ['B', 'KB', 'MB', 'GB']:
        if bytes < 1024.0:
            return f"{bytes:.2f} {unit}"
        bytes /= 1024.0
    return f"{bytes:.2f} TB"

# Generate report
print("\\n" + "=" * 50)
print("DIRECTORY ANALYSIS REPORT")
print("=" * 50)

stats = generate_report('.')

print(f"\\nTotal files: {stats['total_files']}")
print(f"Total directories: {stats['total_dirs']}")
print(f"Total size: {format_size(stats['total_size'])}")
print(f"Maximum depth: {stats['max_depth']} levels")

if stats['extensions']:
    print(f"\\nFile types found ({len(stats['extensions'])} types):")
    # Sort by count, descending
    sorted_ext = sorted(stats['extensions'].items(), key=lambda x: x[1], reverse=True)
    for ext, count in sorted_ext[:10]:  # Show top 10
        print(f"  .{ext}: {count} files")
        
if stats['errors'] > 0:
    print(f"\\nNote: {stats['errors']} items could not be accessed")

print("=" * 50)`
    },
    {
      title: "Exercise 6: Recursive printFred Challenge",
      description: "Practice recursion by creating variations of the printFred function.",
      difficulty: 'beginner',
      starter: `# Create these recursive functions:

def printFred(n):
    # Print "Fred" n times using recursion
    pass

def countdown(n):
    # Print numbers from n down to 1
    pass

def factorial(n):
    # Calculate n! using recursion
    pass

# Test your functions
printFred(5)
print()
countdown(10)
print()
print(f"5! = {factorial(5)}")

`,
      solution: `# Recursive functions practice

def printFred(n):
    """Print 'Fred' n times using recursion"""
    if n > 0:
        print("Fred")
        printFred(n - 1)

def countdown(n):
    """Print numbers from n down to 1"""
    if n > 0:
        print(n)
        countdown(n - 1)

def factorial(n):
    """Calculate n! using recursion"""
    if n <= 1:
        return 1
    else:
        return n * factorial(n - 1)

# Test the functions
print("Printing Fred 5 times:")
printFred(5)

print("\\nCountdown from 10:")
countdown(10)

print("\\nFactorials:")
for i in range(1, 8):
    print(f"{i}! = {factorial(i)}")

# Bonus: Fibonacci sequence
def fibonacci(n):
    """Return the nth Fibonacci number"""
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)

print("\\nFibonacci sequence:")
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")`
    }
  ];

  const getDifficultyColor = (difficulty: Exercise['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return 'rgba(34, 197, 94, 0.8)';
      case 'intermediate': return 'rgba(251, 191, 36, 0.8)';
      case 'advanced': return 'rgba(239, 68, 68, 0.8)';
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>CSCI 133: Computer Programming</h1>
          <p className={styles.subtitle}>Unit 5: File Systems and Directory Navigation</p>
          <div className={styles.courseMeta}>
            <span>Hunter College</span>
            <span>•</span>
            <span>Fall 2025</span>
            <span>•</span>
            <span>6 Parts</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className={styles.navigation}>
        <div className={styles.navContent}>
          <nav className={styles.navTabs}>
            {[
              { id: 'overview' as const, label: 'Overview', icon: BookOpen },
              { id: 'lessons' as const, label: 'Lessons', icon: Code },
              { id: 'practice' as const, label: 'Practice', icon: Play }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
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
                Unit 5 explores how Python interacts with your computer's file system. You'll learn to navigate 
                directories, find and analyze files, and understand recursion through practical file system operations. 
                These skills are essential for automating tasks, organizing data, and building real-world applications 
                that interact with files and folders.
              </p>
              
              <div className={styles.overviewGrid}>
                <div className={styles.objectivesCard}>
                  <h3 className={styles.cardTitle}>Learning Objectives</h3>
                  <ul className={styles.objectivesList}>
                    <li>Navigate the file system using the os module</li>
                    <li>List and filter directory contents programmatically</li>
                    <li>Understand paths, directories, and file operations</li>
                    <li>Handle errors when reading different file types</li>
                    <li>Implement recursion for directory tree exploration</li>
                    <li>Build practical file management utilities</li>
                  </ul>
                </div>
                
                <div className={styles.prerequisitesCard}>
                  <h3 className={styles.cardTitle}>Prerequisites</h3>
                  <ul className={styles.objectivesList}>
                    <li>Completion of Units 1-4</li>
                    <li>Understanding of functions and modules</li>
                    <li>Experience with try-except error handling</li>
                    <li>Basic knowledge of file reading and writing</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.progressSection}>
              <h3 className={styles.sectionTitle}>Unit Progress</h3>
              <div className={styles.progressGrid}>
                {lessons.map((lesson, index) => (
                  <div key={lesson.id} className={styles.progressItem}>
                    <div className={styles.progressNumber}>
                      {index + 1}
                    </div>
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
              {lessons.map((lesson) => (
                <div key={lesson.id} className={styles.lessonCard}>
                  <button
                    onClick={() => toggleSection(lesson.id)}
                    className={styles.lessonHeader}
                  >
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
                  
                  {expandedSections[lesson.id] && (
                    <div className={styles.lessonBody}>
                      {lesson.content}
                    </div>
                  )}
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
                These exercises progress from basic directory exploration to advanced file system analysis. 
                Start with the beginner exercises to master the OS module and directory navigation, then advance to 
                recursive file searching and comprehensive directory statistics.
              </p>
            </div>

            <div className={styles.exercisesGrid}>
              {practiceExercises.map((exercise, index) => (
                <div key={index} className={styles.exerciseCard}>
                  <button
                    onClick={() => toggleSection(`exercise-${index}`)}
                    className={styles.exerciseHeader}
                  >
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
                          <summary className={styles.solutionSummary}>
                            View Solution
                          </summary>
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
              <h3 className={styles.helpTitle}>Need Help?</h3>
              <p className={styles.helpDescription}>
                Remember these key concepts as you work through the exercises:
              </p>
              <ul className={styles.helpList}>
                <li>The <code className={styles.inlineCode}>os</code> module is your gateway to the file system</li>
                <li>Use <code className={styles.inlineCode}>os.path.join()</code> for cross-platform path handling</li>
                <li><code className={styles.inlineCode}>.</code> means current directory, <code className={styles.inlineCode}>..</code> means parent directory</li>
                <li>Always handle <code className={styles.inlineCode}>UnicodeDecodeError</code> when reading unknown files</li>
                <li>Recursion is perfect for exploring nested directory structures</li>
                <li>Test your code on small directories first before running on large ones</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CSCI133Unit5;