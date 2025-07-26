import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { type Teacher, TeacherStatus } from '../../types'

import PageHeader from '../../components/layout/page-header'
import { Input } from '../../components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../../components/ui/form'
import { Button } from '../../components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../components/ui/select'

// Schema for form validation using Zod
const teacherSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  department: z.string().min(2, 'Department is required'),
  status: z.nativeEnum(TeacherStatus)
})

type TeacherFormValues = z.infer<typeof teacherSchema>

// Mock function to get a teacher by ID
const getTeacherById = (id: string): Partial<Teacher> | undefined => {
  // In a real app, this would be an API call.
  const mockTeachers: Partial<Teacher>[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      department: 'Science',
      status: TeacherStatus.ACTIVE
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      department: 'Arts',
      status: TeacherStatus.ON_LEAVE
    },
    {
      id: '3',
      firstName: 'Peter',
      lastName: 'Jones',
      email: 'peter.jones@example.com',
      department: 'Math',
      status: TeacherStatus.INACTIVE
    }
  ]
  return mockTeachers.find((t) => t.id === id)
}

const TeacherForm: React.FC = () => {
  const { t } = useTranslation('teachers') // Assuming a 'teachers.json' locale file
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEditMode = !!id

  const form = useForm<TeacherFormValues>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      department: '',
      status: TeacherStatus.ACTIVE
    }
  })

  useEffect(() => {
    if (isEditMode) {
      // In a real app, you would fetch teacher data from an API
      // const teacherData = await api.get(`/teachers/${id}`);
      const teacherData = getTeacherById(id)
      if (teacherData) {
        form.reset(teacherData)
      }
    }
  }, [id, isEditMode, form])

  const onSubmit = async (data: TeacherFormValues) => {
    console.log('Form submitted:', data)
    // In a real app, you would send this data to your API
    // if (isEditMode) {
    //   await api.put(`/teachers/${id}`, data);
    // } else {
    //   await api.post('/teachers', data);
    // }
    // You could show a success toast here, e.g., toast.success(t("messages.saveSuccess"));
    navigate('/teachers')
  }

  return (
    <div className="p-4 md:p-6">
      <PageHeader
        title={
          isEditMode
            ? t('editTeacher', 'Edit Teacher')
            : t('addTeacher', 'Add New Teacher')
        }
        description={t(
          'teacherDetails',
          'Fill in the details for the teacher.'
        )}
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-8 max-w-2xl space-y-6"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.firstName', 'First Name')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.lastName', 'Last Name')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.email', 'Email')}</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                        <SelectValue
                          placeholder={t(
                            'form.selectStatus',
                            'Select a status'
                          )}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(TeacherStatus).map((status) => (
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
              onClick={() => navigate('/teachers')}
            >
              {t('actions.cancel', 'Cancel')}
            </Button>
            <Button type="submit">
              {isEditMode
                ? t('actions.save', 'Save Changes')
                : t('addTeacher', 'Add Teacher')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default TeacherForm
