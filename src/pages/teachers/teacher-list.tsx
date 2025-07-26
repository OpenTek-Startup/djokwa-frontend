import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { type Teacher, TeacherStatus } from '../../types'
import { formatDate } from '../../utils'
// import { api } from "../../services/api"; // Assuming an api service exists
import LoadingSpinner from '../../components/common/loading-spinner'
import PageHeader from '../../components/layout/page-header' // Assuming a PageHeader component
import { Button } from '../../components/ui/button' // Assuming a UI library like shadcn/ui
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../../components/ui/table' // Assuming a UI library like shadcn/ui
import { Badge } from '../../components/ui/badge' // Assuming a UI library like shadcn/ui
import { PlusCircle, Edit, Trash2 } from 'lucide-react'

// Mock data - replace with your actual API call
const mockTeachers: Teacher[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    department: 'Science',
    status: TeacherStatus.ACTIVE,
    hireDate: new Date('2020-08-15'),
    teacherId: 'T-123',
    address: '',
    specialization: ['Physics'],
    courses: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    department: 'Arts',
    status: TeacherStatus.ON_LEAVE,
    hireDate: new Date('2018-06-20'),
    teacherId: 'T-124',
    address: '',
    specialization: ['History'],
    courses: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    firstName: 'Peter',
    lastName: 'Jones',
    email: 'peter.jones@example.com',
    department: 'Math',
    status: TeacherStatus.INACTIVE,
    hireDate: new Date('2019-01-10'),
    teacherId: 'T-125',
    address: '',
    specialization: ['Calculus'],
    courses: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const TeacherList: React.FC = () => {
  const { t } = useTranslation('teachers')
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true)
        // const response = await api.get<Teacher[]>("/teachers");
        // setTeachers(response.data);
        setTimeout(() => {
          // Mocking API delay
          setTeachers(mockTeachers)
          setLoading(false)
        }, 1000)
      } catch (err) {
        setError(t('errors.fetchFailed', 'Failed to fetch teachers.'))
        console.error(err)
        setLoading(false)
      }
    }

    fetchTeachers()
  }, [t])

  const handleDelete = async (id: string) => {
    if (
      window.confirm(
        t('common.confirmDelete', 'Are you sure you want to delete this item?')
      )
    ) {
      // await api.delete(`/teachers/${id}`);
      setTeachers(teachers.filter((teacher) => teacher.id !== id))
    }
  }

  if (loading) return <LoadingSpinner />
  if (error) return <div className="p-4 text-red-500">{error}</div>

  const getStatusVariant = (status: TeacherStatus) => {
    if (status === TeacherStatus.ACTIVE) return 'success'
    if (status === TeacherStatus.ON_LEAVE) return 'warning'
    return 'destructive'
  }

  return (
    <div className="p-4 md:p-6">
      <PageHeader
        title={t('title', 'Teachers')}
        description={t('description', 'Manage all teachers in the system.')}
      >
        <Button asChild>
          <Link to="/teachers/new">
            <PlusCircle className="mr-2 size-4" />
            {t('addNew', 'Add New Teacher')}
          </Link>
        </Button>
      </PageHeader>

      <div className="mt-8 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('table.name', 'Name')}</TableHead>
              <TableHead>{t('table.department', 'Department')}</TableHead>
              <TableHead>{t('table.status', 'Status')}</TableHead>
              <TableHead>{t('table.hireDate', 'Hire Date')}</TableHead>
              <TableHead>
                <span className="sr-only">
                  {t('common.actions', 'Actions')}
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell className="font-medium">{`${teacher.firstName} ${teacher.lastName}`}</TableCell>
                <TableCell>{teacher.department}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(teacher.status)}>
                    {t(`status.${teacher.status}`, teacher.status)}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(teacher.hireDate)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="icon" asChild>
                      <Link to={`/teachers/${teacher.id}/edit`}>
                        <Edit className="size-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(teacher.id)}
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

export default TeacherList
