import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { type Student, StudentStatus } from '../../types'

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

// NOTE: For a real application, you would install react-hook-form and zod:
// npm install react-hook-form zod @hookform/resolvers

const studentSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  grade: z.string().min(1, 'Grade is required'),
  status: z.nativeEnum(StudentStatus)
  // Add other fields as necessary from your Student type
})

type StudentFormValues = z.infer<typeof studentSchema>

const StudentForm: React.FC = () => {
  const { t } = useTranslation('students')
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEditMode = !!id

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      grade: '',
      status: StudentStatus.ACTIVE
    }
  })

  useEffect(() => {
    if (isEditMode) {
      // In a real app, fetch the student data by id
      // const studentData = await api.get(`/students/${id}`);
      const studentData: Partial<Student> = {
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.j@example.com',
        grade: '10',
        status: StudentStatus.ACTIVE
      }
      form.reset(studentData)
    }
  }, [id, isEditMode, form])

  const onSubmit = async (data: StudentFormValues) => {
    console.log('Form submitted:', data)
    // In a real app, you would send this data to your API
    // if (isEditMode) {
    //   await api.put(`/students/${id}`, data);
    // } else {
    //   await api.post('/students', data);
    // }
    // toast.success(t("messages.saveSuccess"));
    navigate('/students')
  }

  return (
    <div className="p-4 md:p-6">
      <PageHeader
        title={isEditMode ? t('editStudent') : t('addStudent')}
        description={t('studentDetails')}
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
                  <FormLabel>{t('form.firstName')}</FormLabel>
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
                  <FormLabel>{t('form.lastName')}</FormLabel>
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
                <FormLabel>{t('form.email')}</FormLabel>
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
              name="grade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.grade')}</FormLabel>
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
                  <FormLabel>{t('table.status')}</FormLabel>
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
                      {Object.values(StudentStatus).map((status) => (
                        <SelectItem key={status} value={status}>
                          {t(`status.${status}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/students')}
            >
              {t('actions.cancel', 'Cancel')}
            </Button>
            <Button type="submit">
              {isEditMode ? t('actions.edit') : t('addStudent')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default StudentForm
