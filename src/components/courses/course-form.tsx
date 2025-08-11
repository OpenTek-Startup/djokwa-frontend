import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { type Course, CourseStatus } from '../../types'

import PageHeader from '../layout/page-header'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'

const courseSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  code: z.string().min(3, 'Course code is required'),
  department: z.string().min(2, 'Department is required'),
  credits: z.coerce.number().min(0, 'Credits must be a positive number'),
  status: z.nativeEnum(CourseStatus)
})

type CourseFormValues = z.infer<typeof courseSchema>

const getCourseById = (id: string): Partial<Course> | undefined => {
  const mockCourses: Partial<Course>[] = [
    {
      id: 'C1',
      title: 'Introduction to Physics',
      code: 'PHY101',
      department: 'Science',
      credits: 3,
      status: CourseStatus.ACTIVE
    },
    {
      id: 'C2',
      title: 'World History',
      code: 'HIS202',
      department: 'Arts',
      credits: 3,
      status: CourseStatus.COMPLETED
    }
  ]
  return mockCourses.find((c) => c.id === id)
}

const CourseForm: React.FC = () => {
  const { t } = useTranslation('courses')
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEditMode = !!id

  const form = useForm<CourseFormValues>({
    // resolver: zodResolver(courseSchema),
    defaultValues: {
      title: '',
      code: '',
      department: '',
      credits: 0,
      status: CourseStatus.ACTIVE
    }
  })

  useEffect(() => {
    if (isEditMode) {
      const courseData = getCourseById(id)
      if (courseData) {
        form.reset(courseData)
      }
    }
  }, [id, isEditMode, form])

  const onSubmit = async (data: CourseFormValues) => {
    console.log('Form submitted:', data)
    // In a real app, you would send this data to your API
    // if (isEditMode) { await api.put(`/courses/${id}`, data); }
    // else { await api.post('/courses', data); }
    navigate('/courses')
  }

  return (
    <div className="p-4 md:p-6">
      <PageHeader
        title={
          isEditMode
            ? t('editCourse', 'Edit Course')
            : t('addCourse', 'Add New Course')
        }
        description={t('courseDetails', 'Fill in the details for the course.')}
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-8 max-w-2xl space-y-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.title', 'Title')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.code', 'Course Code')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.department', 'Department')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="credits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.credits', 'Credits')}</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('table.status', 'Status')}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(CourseStatus).map((status) => (
                        <SelectItem key={status} value={status}>
                          {t(`status.${status}`, status)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/courses')}
            >
              {t('actions.cancel', 'Cancel')}
            </Button>
            <Button type="submit">
              {isEditMode
                ? t('actions.save', 'Save Changes')
                : t('addCourse', 'Add Course')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CourseForm
