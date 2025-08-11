import React from 'react'
import { Route } from 'react-router-dom'
import TeacherList from './teacher-list'
import TeacherForm from './teacher-form'

const TeacherRoutes = () => (
  <>
    <Route path="teachers" element={<TeacherList />} />
    <Route path="teachers/new" element={<TeacherForm />} />
    <Route path="teachers/:id/edit" element={<TeacherForm />} />
  </>
)

export default TeacherRoutes
