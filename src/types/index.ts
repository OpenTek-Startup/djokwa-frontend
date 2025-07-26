// User Types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export enum UserRole {
  ADMIN = 'admin',
  TEACHER = 'teacher',
  STUDENT = 'student',
  PARENT = 'parent'
}

// Student Types
export interface Student {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  dateOfBirth: Date
  address: string
  enrollmentDate: Date
  studentId: string
  grade: string
  status: StudentStatus
  parentContact?: Contact
  emergencyContact?: Contact
  avatar?: string
  courses: Course[]
  grades: Grade[]
  createdAt: Date
  updatedAt: Date
}

export enum StudentStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  GRADUATED = 'graduated',
  TRANSFERRED = 'transferred'
}

// Teacher Types
export interface Teacher {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  address: string
  hireDate: Date
  teacherId: string
  department: string
  credit?: number
  specialization: string[]
  status: TeacherStatus
  avatar?: string
  courses: Course[]
  createdAt: Date
  updatedAt: Date
}

export enum TeacherStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ON_LEAVE = 'on_leave'
}

// Course Types
export interface Course {
  id: string
  title: string
  description: string
  code: string
  credits: number
  department: string
  semester: string
  year: number
  schedule: Schedule[]
  teacherId: string
  teacher: Teacher
  students: Student[]
  maxEnrollment: number
  currentEnrollment: number
  status: CourseStatus
  createdAt: Date
  updatedAt: Date
}

export enum CourseStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

// Schedule Types
export interface Schedule {
  id: string
  dayOfWeek: DayOfWeek
  startTime: string
  endTime: string
  room: string
}

export enum DayOfWeek {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday'
}

// Grade Types
export interface Grade {
  id: string
  studentId: string
  courseId: string
  assignmentName: string
  grade: number
  maxGrade: number
  gradedDate: Date
  feedback?: string
  gradeType: GradeType
}

export enum GradeType {
  ASSIGNMENT = 'assignment',
  QUIZ = 'quiz',
  EXAM = 'exam',
  PROJECT = 'project',
  PARTICIPATION = 'participation'
}

// export type GradeType =
//   | "assignment"
//   | "quiz"
//   | "exam"
//   | "project"
//   | "participation";
// Contact Types
export interface Contact {
  name: string
  relationship: string
  phone: string
  email?: string
  address?: string
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Form Types
export interface StudentFormData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  dateOfBirth: string
  address: string
  enrollmentDate: string
  studentId: string
  grade: string
  parentContact?: Partial<Contact>
  emergencyContact?: Partial<Contact>
}

export interface TeacherFormData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  address: string
  hireDate: string
  teacherId: string
  department: string
  credit?: number
  specialization: string[]
}

export interface CourseFormData {
  title: string
  description: string
  code: string
  credits: number
  department: string
  semester: string
  year: number
  teacherId: string
  maxEnrollment: number
  schedule: Partial<Schedule>[]
}

// Search and Filter Types
export interface SearchFilters {
  query?: string
  status?: string
  grade?: string
  department?: string
  credit?: number
  semester?: string
  year?: number
}

export interface SortConfig {
  field: string
  direction: 'asc' | 'desc'
}

// Dashboard Types
export interface DashboardStats {
  totalStudents: number
  totalTeachers: number
  totalCourses: number
  activeEnrollments: number
  newStudentsThisMonth: number
  completedCourses: number
}

export interface DashboardActivity {
  id: string
  type: ActivityType
  title: string
  description: string
  timestamp: Date
  userId?: string
  userName?: string
}

export enum ActivityType {
  STUDENT_ENROLLED = 'student_enrolled',
  STUDENT_GRADUATED = 'student_graduated',
  COURSE_CREATED = 'course_created',
  GRADE_SUBMITTED = 'grade_submitted',
  TEACHER_HIRED = 'teacher_hired'
}

export interface UpcomingEvent {
  id: string
  title: string
  description: string
  date: Date
  type: EventType
  location?: string
}

export enum EventType {
  EXAM = 'exam',
  ASSIGNMENT_DUE = 'assignment_due',
  HOLIDAY = 'holiday',
  MEETING = 'meeting',
  GRADUATION = 'graduation'
}

// Navigation Types
export interface NavigationItem {
  key: string
  label: string
  icon: string
  path: string
  children?: NavigationItem[]
  permission?: UserRole[]
}

// Theme Types
export interface ThemeConfig {
  mode: 'light' | 'dark'
  primaryColor: string
  borderRadius: 'small' | 'medium' | 'large'
  fontSize: 'small' | 'medium' | 'large'
}

// Language Types
export interface LanguageConfig {
  code: string
  name: string
  flag?: string
  rtl?: boolean
}

// Error Types
export interface AppError {
  code: string
  message: string
  details?: any
  timestamp: Date
}
