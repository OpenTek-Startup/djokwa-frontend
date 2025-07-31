import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import {
  iParent,
  iRegisterUser,
  iStudent,
  iTeacher,
  iUser
} from 'types/validation'
import toast from 'react-hot-toast'
import { Input } from 'components/ui/input'
import LoadingSpinner from 'components/common/loading-spinner'
import { Button } from 'components/ui/button'
import Heading from 'components/ui/heading'
import { HttpCommon } from 'config/httpCommon'
import HandleGetFileFromStorage from 'components/ui/HandleGetFileFromStorage'
import { Label } from 'components/ui/label'
import { useApp } from 'contexts/use-app'
import { type User } from 'contexts/app-context'
import { UserRole } from 'types'

export const RegisterPage = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<iRegisterUser>()
  const { setUser } = useApp()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  })

  const onSubmit = async (formData: iRegisterUser) => {
    console.log('Data to be submitted:', formData)

    const role = formData.role as UserRole

    let apiEndpoint = ''
    let userPayload: iStudent | iTeacher | iParent | null = null

    switch (role) {
      case 'student':
        apiEndpoint = '/student/create'
        userPayload = formData as unknown as iStudent
        break
      case 'teacher':
        apiEndpoint = '/teacher/sign-up'
        userPayload = formData as unknown as iTeacher
        break
      case 'parent':
        apiEndpoint = '/parent/create'
        userPayload = formData as unknown as iParent
        break
      default:
        toast.error('Invalid user role.')
        return
    }

    try {
      const response = await HttpCommon.post<{ user: iUser; token?: string }>(
        apiEndpoint,
        userPayload
      )
      console.log('The response:', response)
      toast.success('Account created successfully!')

      if (response.data.token) {
        document.cookie = `token=${response.data.token}; path=/; max-age=${
          60 * 60 * 24 * 7
        }; SameSite=Lax`
      }

      // Map API response (iUser) to application's User type
      const { user: apiUser } = response.data
      const userForState: User = {
        id: apiUser.Id,
        email: apiUser.Email,
        firstName: apiUser.First_Name,
        lastName: apiUser.Last_Name,
        phone: String(apiUser.Phone), // Ensure phone is a string
        role: apiUser.role
      }
      setUser(userForState)

      switch (role) {
        case 'student':
          return navigate('/student/dashboard')
        case 'teacher':
          return navigate('/teacher/dashboard')
        case 'parent':
          return navigate('/parent/dashboard')
        default:
          return navigate('/dashboard')
      }
    } catch (error) {
      console.error('Error during registration:', error)
      toast.error('An error occurred during registration.') // Show error to user
    }
  }
  return (
    <>
      <Heading className="mb-8 text-center text-2xl font-bold">
        Please Enter Your Information Below
      </Heading>

      <form
        method="post"
        id="sigin-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 rounded-lg p-6 shadow-md"
      >
        <HandleGetFileFromStorage onFileChange={() => {}} />

        <div className="space-y-2">
          <Label htmlFor="role">
            Role <span className="text-error/60">*</span>
          </Label>
          <select
            {...register('role', { required: 'Role is required' })}
            className={`w-full cursor-pointer rounded border bg-transparent p-2${
              errors.role ? 'border-error/50' : ''
            }`}
            name="role"
          >
            <option value="">Select Role</option>
            <option value="parent">Parent</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
          {errors.role && (
            <span className="text-error/50">{errors.role.message}</span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="Gender">
            Gender <span className="text-error/60">*</span>
          </Label>
          <select
            {...register('Gender', { required: 'Gender is required' })}
            className={`w-full cursor-pointer rounded border bg-transparent p-2${
              errors.Gender ? 'border-error/50' : ''
            }`}
            name="Gender"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.Gender && (
            <span className="text-error/50">{errors.Gender.message}</span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="First_Name">
            First Name <span className="text-error/60">*</span>
          </Label>
          <Input
            type="text"
            {...register('First_Name', {
              required: 'First name is required',
              maxLength: { value: 30, message: 'Max length is 30' }
            })}
            name="First_Name"
            id="First_Name"
            placeholder="Enter your first name"
            className={`w-full rounded border p-2 ${
              errors.First_Name ? 'border-error/50' : ''
            }`}
          />
          {errors.First_Name && (
            <span className="text-error/50">{errors.First_Name.message}</span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="Last_Name">
            Last Name <span className="text-error/60">*</span>
          </Label>
          <Input
            type="text"
            {...register('Last_Name', {
              required: 'Last name is required',
              maxLength: { value: 30, message: 'Max length is 30' }
            })}
            name="Last_Name"
            id="Last_Name"
            placeholder="Enter your last name"
            className={`w-full rounded border p-2 ${
              errors.Last_Name ? 'border-error/50' : ''
            }`}
          />
          {errors.Last_Name && (
            <span className="text-error/50">{errors.Last_Name.message}</span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="Email">
            Institutional Email <span className="text-error/60">*</span>
          </Label>
          <Input
            type="email"
            {...register('Email', {
              required: 'Email is required',
              maxLength: { value: 30, message: 'Max length is 30' }
            })}
            name="Email"
            id="Email"
            placeholder="Enter your email"
            className={`w-full rounded border p-2 ${
              errors.Email ? 'border-error/50' : ''
            }`}
          />
          {errors.Email && (
            <span className="text-error/50">{errors.Email.message}</span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="Phone">
            Phone Number <span className="text-error/60">*</span>
          </Label>
          <Input
            type="text"
            {...register('Phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9]+$/,
                message: 'Please enter only numbers'
              },
              minLength: {
                value: 8,
                message: 'Phone number must be at least 8 digits'
              }
            })}
            name="Phone"
            id="Phone"
            placeholder="Enter your phone number"
            className={`w-full rounded border p-2 ${
              errors.Phone ? 'border-error/50' : ''
            }`}
          />
          {errors.Phone && (
            <span className="text-error/50">{errors.Phone.message}</span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">
            Password <span className="text-error/60">*</span>
          </Label>
          <Input
            type={showPassword.password ? 'text' : 'password'}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Minimum length is 8' }
            })}
            name="password"
            id="password"
            placeholder="Enter your password"
            className={`w-full rounded border p-2 ${
              errors.password ? 'border-error/50' : ''
            }`}
          />
          <button
            type="button"
            onClick={() =>
              setShowPassword({
                ...showPassword,
                password: !showPassword.password
              })
            }
          >
            {showPassword.password ? 'Hide' : 'Show'}
          </button>
          {errors.password && (
            <span className="text-error/50">{errors.password.message}</span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">
            Confirm Password <span className="text-error/60">*</span>
          </Label>
          <Input
            type={showPassword.confirmPassword ? 'text' : 'password'}
            {...register('confirmPassword', {
              required: 'Confirm password is required',
              validate: (value) =>
                value === watch('password') || 'Passwords do not match'
            })}
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm your password"
            className={`w-full rounded border p-2 ${
              errors.confirmPassword ? 'border-error/50' : ''
            }`}
          />
          <button
            type="button"
            onClick={() =>
              setShowPassword({
                ...showPassword,
                confirmPassword: !showPassword.confirmPassword
              })
            }
          >
            {showPassword.confirmPassword ? 'Hide' : 'Show'}
          </button>
          {errors.confirmPassword && (
            <span className="text-error/50">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <Button
          type="submit"
          variant={'default'}
          submittingText={<LoadingSpinner className="relative z-10 h-full" />}
        >
          Create An Account
        </Button>

        <h2 className="text-center text-lg leading-loose tracking-tight">
          Already have an account?{' '}
          <span>
            <Link
              to="/login"
              className="font-medium transition-colors duration-300 hover:text-blue-600"
            >
              Login
            </Link>
          </span>
        </h2>
      </form>
    </>
  )
}
