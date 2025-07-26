import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { type Student, StudentStatus } from '../../types'
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
const mockStudents: Student[] = [
  {
    id: 'S1',
    studentId: 'ST-001',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.j@example.com',
    grade: '10',
    enrollmentDate: new Date('2022-09-01'),
    status: StudentStatus.ACTIVE,
    dateOfBirth: new Date('2008-05-12'),
    address: '123 Maple St',
    parentContact: {
      name: 'John Johnson',
      relationship: 'Father',
      phone: '123-456-7890'
    },
    emergencyContact: {
      name: 'John Johnson',
      relationship: 'Father',
      phone: '123-456-7890'
    },
    courses: [],
    grades: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'S2',
    studentId: 'ST-002',
    firstName: 'Bob',
    lastName: 'Williams',
    email: 'bob.w@example.com',
    grade: '11',
    enrollmentDate: new Date('2021-09-01'),
    status: StudentStatus.INACTIVE,
    dateOfBirth: new Date('2007-02-20'),
    address: '456 Oak Ave',
    parentContact: {
      name: 'Mary Williams',
      relationship: 'Mother',
      phone: '123-456-7891'
    },
    emergencyContact: {
      name: 'Mary Williams',
      relationship: 'Mother',
      phone: '123-456-7891'
    },
    courses: [],
    grades: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'S3',
    studentId: 'ST-003',
    firstName: 'Charlie',
    lastName: 'Brown',
    email: 'charlie.b@example.com',
    grade: '9',
    enrollmentDate: new Date('2023-09-01'),
    status: StudentStatus.GRADUATED,
    dateOfBirth: new Date('2009-11-30'),
    address: '789 Pine Ln',
    parentContact: {
      name: 'Lucy Brown',
      relationship: 'Mother',
      phone: '123-456-7892'
    },
    emergencyContact: {
      name: 'Lucy Brown',
      relationship: 'Mother',
      phone: '123-456-7892'
    },
    courses: [],
    grades: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const StudentList: React.FC = () => {
  const { t } = useTranslation('students')
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true)
        // In a real app: const response = await api.get<Student[]>("/students");
        // setStudents(response.data);
        setTimeout(() => {
          // Mocking API delay
          setStudents(mockStudents)
          setLoading(false)
        }, 1000)
      } catch (err) {
        setError(t('messages.saveError')) // Assuming a generic fetch error message
        console.error(err)
        setLoading(false)
      }
    }

    fetchStudents()
  }, [t])

  const handleDelete = async (id: string) => {
    if (window.confirm(t('messages.deleteConfirm'))) {
      // await api.delete(`/students/${id}`);
      setStudents(students.filter((student) => student.id !== id))
      // You might want to show a success toast here, e.g., toast.success(t("messages.deleteSuccess"))
    }
  }

  if (loading) return <LoadingSpinner />
  if (error) return <div className="p-4 text-red-500">{error}</div>

  const getStatusVariant = (status: StudentStatus) => {
    switch (status) {
      case StudentStatus.ACTIVE:
        return 'success'
      case StudentStatus.GRADUATED:
        return 'default'
      case StudentStatus.TRANSFERRED:
        return 'warning'
      case StudentStatus.INACTIVE:
      default:
        return 'destructive'
    }
  }

  return (
    <div className="p-4 md:p-6">
      <PageHeader title={t('studentList')} description={t('title')}>
        <Button asChild>
          <Link to="/students/new">
            <PlusCircle className="mr-2 size-4" />
            {t('addStudent')}
          </Link>
        </Button>
      </PageHeader>

      <div className="mt-8 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('table.name')}</TableHead>
              <TableHead>{t('table.email')}</TableHead>
              <TableHead>{t('table.grade')}</TableHead>
              <TableHead>{t('table.status')}</TableHead>
              <TableHead>
                <span className="sr-only">{t('table.actions')}</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{`${student.firstName} ${student.lastName}`}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.grade}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(student.status)}>
                    {t(`status.${student.status}`)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="icon" asChild>
                      <Link to={`/students/${student.id}/edit`}>
                        <Edit className="size-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(student.id)}
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

export default StudentList
