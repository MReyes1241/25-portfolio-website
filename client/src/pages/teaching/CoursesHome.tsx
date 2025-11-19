import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, Users, ExternalLink } from 'lucide-react';
import styles from './CoursesHome.module.css';

interface Unit {
  id: string;
  title: string;
  description: string;
  path: string;
  status: 'available';
}

interface Course {
  id: string;
  code: string;
  title: string;
  description: string;
  semester: string;
  year: string;
  institution: string;
  totalStudents?: number;
  units: Unit[];
  color: {
    primary: string;
    secondary: string;
  };
}

const CoursesHome: React.FC = () => {
  const [expandedCourses, setExpandedCourses] = useState<Record<string, boolean>>({});

  const toggleCourse = (courseId: string) => {
    setExpandedCourses(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  const courses: Course[] = [
    {
      id: 'csci133',
      code: 'CSCI 133',
      title: 'Computer Programming',
      description: 'Introduction to computer programming using Python. Covers fundamental programming concepts including variables, control structures, functions, and basic data structures.',
      semester: 'Fall',
      year: '2025',
      institution: 'Hunter College',
      totalStudents: 30,
      color: {
        primary: '#60a5fa',
        secondary: '#3b82f6'
      },
      units: [
        {
          id: 'unit1',
          title: 'Unit 1: Python Fundamentals',
          description: 'Getting started with Python, variables, strings, lists, and basic control structures',
          path: '/teaching/csci133/unit1',
          status: 'available'
        },
        {
          id: 'unit2',
          title: 'Unit 2: Functions, Files, and Text Processing',
          description: 'Built-in functions, file I/O, string methods, and advanced data processing techniques',
          path: '/teaching/csci133/unit2',
          status: 'available'
        },
        {
          id: 'unit3',
          title: 'Unit 3: Data Structures and Algorithms',
          description: 'Lists, dictionaries, sets, tuples, and basic algorithms for searching and sorting',
          path: '/teaching/csci133/unit3',
          status: 'available'
        },
        {
          id: 'unit4',
          title: 'Unit 4: Modules and Simulations',
          description: 'Creating reusable modules, random number generation, statistical simulations, and probability analysis through computational experiments',
          path: '/teaching/csci133/unit4',
          status: 'available'
        },
        {
          id: 'unit5',
          title: 'Unit 5: File Systems and Directory Navigation',
          description: 'Working with the OS module, navigating directories, handling file operations, and understanding recursion through file system exploration',
          path: '/teaching/csci133/unit5',
          status: 'available'
        },
        {
          id: 'unit6',
          title: 'Unit 6: Data Processing and Logical Operators',
          description: 'Reading from the web, persisting data with shelve, list comprehensions, and applying logical operators to data analysis',
          path: '/teaching/csci133/unit6',
          status: 'available'
        },
        {
          id: 'unit7',
          title: 'Unit 7: Higher-Order Functions and Functional Programming',
          description: 'Functions as first-class objects, passing functions as arguments, creating closures, and building sophisticated programs with functional programming techniques',
          path: '/teaching/csci133/unit7',
          status: 'available'
        },
        {
          id: 'unit8',
          title: 'Unit 8: Graphical User Interfaces with tkinter',
          description: 'Building interactive desktop applications with windows, buttons, and event-driven programming using Python\'s tkinter library',
          path: '/teaching/csci133/unit8',
          status: 'available'
        },
        {
          id: 'unit9',
          title: 'Unit 9: Object-Oriented Programming',
          description: 'Understanding classes and objects, encapsulation, inheritance, and polymorphism to design robust software systems',
          path: '/teaching/csci133/unit9',
          status: 'available'
        },
        // Add more units later
      ]
    }
    // Add more courses later if needed
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1 className={styles.title}>Teaching</h1>
            <p className={styles.subtitle}>
              Course materials, resources, and interactive content for my students at Hunter College
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.main}>
        <div className={styles.coursesSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Current Courses</h2>
            <p className={styles.sectionDescription}>
              Click on any course to explore available units and materials
            </p>
          </div>

          <div className={styles.coursesGrid}>
            {courses.map((course) => (
              <div key={course.id} className={styles.courseCard}>
                {/* Course Header */}
                <button
                  onClick={() => toggleCourse(course.id)}
                  className={styles.courseHeader}
                  style={{
                    '--course-primary': course.color.primary,
                    '--course-secondary': course.color.secondary
                  } as React.CSSProperties}
                >
                  <div className={styles.courseHeaderContent}>
                    <div className={styles.courseTitle}>
                      <span className={styles.courseCode}>{course.code}</span>
                      <span className={styles.courseName}>{course.title}</span>
                    </div>
                    <div className={styles.courseMeta}>
                      <span>{course.semester} {course.year}</span>
                      <span>•</span>
                      <span>{course.institution}</span>
                      {course.totalStudents && (
                        <>
                          <span>•</span>
                          <span className={styles.studentCount}>
                            <Users className={styles.studentIcon} />
                            {course.totalStudents} students
                          </span>
                        </>
                      )}
                    </div>
                    <p className={styles.courseDescription}>{course.description}</p>
                  </div>
                  <div className={styles.expandIcon}>
                    {expandedCourses[course.id] ? (
                      <ChevronDown className={styles.chevron} />
                    ) : (
                      <ChevronRight className={styles.chevron} />
                    )}
                  </div>
                </button>

                {/* Units Dropdown */}
                {expandedCourses[course.id] && (
                  <div className={styles.unitsContainer}>
                    <div className={styles.unitsHeader}>
                      <h3 className={styles.unitsTitle}>Available Units</h3>
                    </div>
                    
                    <div className={styles.unitsList}>
                      {course.units.map((unit, index) => (
                        <div key={unit.id} className={styles.unitCard}>
                          <div className={styles.unitContent}>
                            <div className={styles.unitNumber}>{index + 1}</div>
                            <div className={styles.unitInfo}>
                              <div className={styles.unitHeader}>
                                <h4 className={styles.unitTitle}>{unit.title}</h4>
                              </div>
                              <p className={styles.unitDescription}>{unit.description}</p>
                            </div>
                          </div>
                          <div className={styles.unitActions}>
                            <Link 
                              to={unit.path} 
                              className={styles.unitLink}
                              style={{
                                '--course-primary': course.color.primary
                              } as React.CSSProperties}
                            >
                              <span>View Unit</span>
                              <ExternalLink className={styles.linkIcon} />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesHome;