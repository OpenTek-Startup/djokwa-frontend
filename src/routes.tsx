import React from 'react'
import { Route } from 'react-router-dom'
import { UserRole } from './types'

// Import pages/route components
import Dashboard from './pages/admin/dashboard-admin'
import StudentRoutes from './pages/admin/StudentRoutes'
import TeacherRoutes from './components/teachers/TeacherRoutes'
import CourseRoutes from './components/courses/CourseRoutes'
// Assuming you might have other role-specific pages
// import AdminPage from './pages/admin/AdminPage';

/**
 * Route definitions for different user roles.
 */

const commonRoutes = (
  <>
    <Route path="/dashboard" element={<Dashboard />} />
  </>
)

const adminRoutes = (
  <>
    {commonRoutes}
    {/* Admin can see all routes */}
    {StudentRoutes()}
    {TeacherRoutes()}
    {CourseRoutes()}
    {/* <Route path="/admin" element={<AdminPage />} /> */}
  </>
)

const teacherRoutes = (
  <>
    {commonRoutes}
    {/* Teacher can see students and courses */}
    {StudentRoutes()}
    {CourseRoutes()}
  </>
)

const studentRoutes = (
  <>
    {commonRoutes}
    {/* Student can see their courses */}
    {CourseRoutes()}
  </>
)

/**
 * Returns the appropriate routes for a given user role.
 * @param role The user's role.
 * @returns A React fragment containing the routes.
 */
export const getRoutesForRole = (role?: UserRole) => {
  switch (role) {
    case UserRole.ADMIN:
      return adminRoutes
    case UserRole.TEACHER:
      return teacherRoutes
    case UserRole.STUDENT:
      return studentRoutes
    // case UserRole.Parent:
    //   return parentRoutes;
    default:
      // Fallback for authenticated users with no specific/known role
      // or for when the user object is not yet available.
      return <Route path="/dashboard" element={<Dashboard />} />
  }
}
