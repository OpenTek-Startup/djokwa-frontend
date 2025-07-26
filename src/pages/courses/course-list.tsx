import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { type Course, CourseStatus } from '../../types'
import LoadingSpinner from '../../components/common/loading-spinner'
import PageHeader from '../../components/layout/page-header'
import { Button } from '../../components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../../components/ui/table'
import { Badge } from '../../components/ui/badge'
import { PlusCircle, Edit, Trash2 } from 'lucide-react'

// Mock data - replace with your actual API call
const mockCourses: Course[] = [
  {
    id: 'C1',
    title: 'Introduction to Physics',
    code: 'PHY101',
    department: 'Science',
    credits: 3,
    semester: 'Fall',
    year: 2023,
    status: CourseStatus.ACTIVE,
    teacherId: '1',
    maxEnrollment: 50,
    currentEnrollment: 45,
    schedule: [],
    teacher: {} as any,
    students: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    description: ''
  },
  {
    id: 'C2',
    title: 'World History',
    code: 'HIS202',
    department: 'Arts',
    credits: 3,
    semester: 'Fall',
    year: 2023,
    status: CourseStatus.COMPLETED,
    teacherId: '2',
    maxEnrollment: 40,
    currentEnrollment: 38,
    schedule: [],
    teacher: {} as any,
    students: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    description: ''
  },
  {
    id: 'C3',
    title: 'Calculus I',
    code: 'MTH150',
    department: 'Math',
    credits: 4,
    semester: 'Spring',
    year: 2024,
    status: CourseStatus.INACTIVE,
    teacherId: '3',
    maxEnrollment: 30,
    currentEnrollment: 0,
    schedule: [],
    teacher: {} as any,
    students: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    description: ''
  },
  {
    id: 'C4',
    title: 'Advanced Composition',
    code: 'ENG300',
    department: 'Arts',
    credits: 3,
    semester: 'Spring',
    year: 2024,
    status: CourseStatus.CANCELLED,
    teacherId: '2',
    maxEnrollment: 25,
    currentEnrollment: 5,
    schedule: [],
    teacher: {} as any,
    students: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    description: ''
  }
]

const CourseList: React.FC = () => {
  const { t } = useTranslation('courses') // Assuming a 'courses.json' locale file
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        // In a real app: const response = await api.get<Course[]>("/courses");
        // setCourses(response.data);
        setTimeout(() => {
          // Mocking API delay
          setCourses(mockCourses)
          setLoading(false)
        }, 1000)
      } catch (err) {
        setError(t('messages.fetchError', 'Failed to fetch courses.'))
        console.error(err)
        setLoading(false)
      }
    }

    fetchCourses()
  }, [t])

  const handleDelete = async (id: string) => {
    if (
      window.confirm(
        t(
          'messages.deleteConfirm',
          'Are you sure you want to delete this course?'
        )
      )
    ) {
      // await api.delete(`/courses/${id}`);
      setCourses(courses.filter((course) => course.id !== id))
    }
  }

  if (loading) return <LoadingSpinner />
  if (error) return <div className="p-4 text-red-500">{error}</div>

  const getStatusVariant = (status: CourseStatus) => {
    switch (status) {
      case CourseStatus.ACTIVE:
        return 'success'
      case CourseStatus.COMPLETED:
        return 'default'
      case CourseStatus.INACTIVE:
        return 'secondary'
      case CourseStatus.CANCELLED:
      default:
        return 'destructive'
    }
  }

  return (
    <div className="p-4 md:p-6">
      <PageHeader
        title={t('courseList', 'Course List')}
        description={t('title', 'Manage all courses in the system.')}
      >
        <Button asChild>
          <Link to="/courses/new">
            <PlusCircle className="mr-2 size-4" />
            {t('addCourse', 'Add New Course')}
          </Link>
        </Button>
      </PageHeader>

      <div className="mt-8 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('table.title', 'Title')}</TableHead>
              <TableHead>{t('table.code', 'Code')}</TableHead>
              <TableHead>{t('table.department', 'Department')}</TableHead>
              <TableHead>{t('table.status', 'Status')}</TableHead>
              <TableHead>
                <span className="sr-only">{t('table.actions', 'Actions')}</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">{course.title}</TableCell>
                <TableCell>{course.code}</TableCell>
                <TableCell>{course.department}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(course.status)}>
                    {t(`status.${course.status}`, course.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="icon" asChild>
                      <Link to={`/courses/${course.id}/edit`}>
                        <Edit className="size-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(course.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default CourseList
