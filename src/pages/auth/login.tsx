import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { iUser } from 'types/validation'
import { HttpCommon } from 'config/httpCommon'
import { Link, redirect } from 'react-router-dom'

// Define the schema for form validation using Zod
const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
})

type LoginFormData = z.infer<typeof loginSchema>

export const LoginPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true)
    try {
      const response = await HttpCommon.post<{ teacher: iUser }>(
        '/teacher/sign-in',
        data
      )
      toast.success('Login successful!')
      console.log(response.data)
      redirect('/dashboard')
    } catch (error) {
      toast.error('Login failed. Please check your credentials.')
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg"
      >
        <h2 className="flex items-center justify-center text-center text-xl font-semibold leading-loose tracking-tight text-gray-900 sm:text-2xl">
          Welcome back <span className="ml-2">🙃</span>
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="relative mt-1">
              <input
                id="email"
                type="email"
                {...register('email')}
                className="w-full rounded-lg border px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
              {/* <FiUser className="absolute left-3 top-3 text-gray-400" /> */}
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                type="password"
                {...register('password')}
                className="w-full rounded-lg border px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              {/* <FiLock className="absolute left-3 top-3 text-gray-400" /> */}
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </motion.button>
          <Link
            className="text-[1rem] font-medium !text-black sm:text-xl"
            to="#"
            style={{ marginBottom: '2rem!important' }}
          >
            Forgot password?
          </Link>

          <div>
            <h2 className="text-center text-lg leading-loose tracking-tight sm:text-xl">
              New to this platform?{' '}
              <span>
                <Link to="register">Get Started</Link>
              </span>
            </h2>
          </div>
        </form>
        <ToastContainer />
      </motion.div>
    </div>
  )
}
