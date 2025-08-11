import React from 'react'
import { Route } from 'react-router-dom'

// These components will need to be created.
import StudentList from '../../components/students/student-list'
import StudentForm from '../../components/students/student-form'

const StudentRoutes = () => (
  <>
    <Route path="students" element={<StudentList />} />
    <Route path="students/new" element={<StudentForm />} />
    <Route path="students/:id/edit" element={<StudentForm />} />
  </>
)

export default StudentRoutes
