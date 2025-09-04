// src/pages/courses/CoursesHome.tsx
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
      totalStudents: 45,
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
        }
        // Add more units as needed
      ]
    }
    // Add more courses as needed
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