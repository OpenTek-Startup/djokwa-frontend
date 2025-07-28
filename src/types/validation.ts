import { z } from 'zod'

const loginSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .nonempty({ message: 'Password is required' }),

  email: z
    .string()
    .email({ message: 'Please enter a valid email address' })
    .nonempty({ message: 'Please enter your email address' })
})

export type iLoginUser = z.infer<typeof loginSchema> & {
  from?: string
}

export const registerSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .nonempty({ message: 'Password is required' }),
    confirmPassword: z.string(),
    Email: z
      .string()
      .email({ message: 'Please enter a valid email address' })
      .nonempty({ message: 'Please enter your email address' }),
    First_Name: z.string().nonempty({ message: 'First name is required' }),
    Last_Name: z.string().nonempty({ message: 'Last name is required' }),
    Phone: z
      .string()
      .min(9, { message: 'Phone number must be at least 8 characters long' })
      .max(15, { message: 'Phone number should be less than 15' }),
    role: z.enum(
      [
        'student',
        'teacher',
        'parent',
        'admin',
        'accountant',
        'principal',
        'driver'
      ],
      {
        message: 'Role is required'
      }
    )
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })

export type iRegisterUser = z.infer<typeof registerSchema> & {
  from?: string
  Gender: 'Male' | 'Female'
}

export interface iUser {
  First_Name: string
  Last_Name: string
  Phone?: number
  Email: string
  password: string
  role:
    | 'student'
    | 'teacher'
    | 'admin'
    | 'parent'
    | 'accountant'
    | 'principal'
    | 'driver'
  Gender: 'Male' | 'Female'
  Id: number
  createdAt?: string
  updatedAt?: string
}
export interface iStudent extends iUser {
  role: 'student'
  DOB: string
  address?: string
  classId: number
  Medical_Info?: string
  Image?: string
  // dateOfBirth: string;
  // address: string;
  // parentId: string;
  // enrollmentId: string;
  // disciplineId: string;
  // performanceId: string;
  // DOB: string;
}

export interface iTeacher extends iUser {
  role: 'teacher'
  Specialty: string
  Hiring_Date: Date
  Salary: string
  Image?: string
  address: string
}

export const registerTeacherSchema = z
  .object({
    password: z
      .string({
        error: 'password is required'
      })
      .min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string(),
    Email: z
      .string({ error: 'please enter your email address' })
      .email({ message: 'please enter a valid email address' }),
    First_Name: z.string().min(1, 'First name is required'),
    Last_Name: z.string().min(1, 'Last name is required'),
    Phone: z
      .string({
        error: 'Phone number is required'
      })
      .min(8, 'Phone number must be at least 8 characters long'),
    Gender: z.enum(['Male', 'Female']),
    role: z.literal('teacher'), // Directly set the role to "teacher"
    Specialty: z.string().min(1, 'Specialty is required'),
    Hiring_Date: z.any(),
    Salary: z.coerce.number().min(1, 'Salary is required'),
    address: z.string().min(1, 'Address is required')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })

export type iRegisterTeacher = z.infer<typeof registerTeacherSchema> & {
  from?: string
  Gender: 'Male' | 'Female'
}

export const registerStudentSchema = z
  .object({
    password: z
      .string({
        error: 'password is required'
      })
      .min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string(),
    Email: z
      .string({ error: 'please enter your email address' })
      .email({ message: 'please enter a valid email address' }),
    First_Name: z.string().min(1, 'First name is required'),
    Last_Name: z.string().min(1, 'Last name is required'),
    Phone: z
      .string()
      .min(10, { message: 'Must be 10  or more characters long' }),
    Gender: z.enum(['Male', 'Female']),
    Specialty: z
      .string()
      .min(2, { message: 'Must be 2 or more characters long' }),
    Salary: z.number(),
    Hiring_Date: z.any(),
    address: z
      .string()
      .min(2, { message: 'Must be 2 or more characters long' }),

    DOB: z.any()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })

export type iRegisterStudent = z.infer<typeof registerStudentSchema>

export interface iParent extends iUser {
  role: 'parent'
  Profession?: string
  Address: string
  NIC_Information?: string
}
