import React from 'react'
import { Route } from 'react-router-dom'
import CourseList from './course-list'
import CourseForm from './course-form'

const CourseRoutes = () => (
  <>
    <Route path="courses" element={<CourseList />} />
    <Route path="courses/new" element={<CourseForm />} />
    <Route path="courses/:id/edit" element={<CourseForm />} />
  </>
)

export default CourseRoutes
