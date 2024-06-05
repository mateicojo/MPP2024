import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './crud/Home'
import Create from './crud/Create'
import Update from './crud/Update'
import Read from './crud/Read'
import CreateReview from './crud/CreateReview'
import ReadReview from './crud/ReadReview'
import UpdateReview from './crud/UpdateReview'
import Login from './login register/Login'
import Register from './login register/Register'


function App(props) {
  

  return (
      <BrowserRouter>
        <Routes>
          <Route path = '/register' element={<Register/>}></Route>
          <Route path = '/' element={<Home/>}></Route>
          <Route path = '/login' element={<Login/>}></Route>
          <Route path = '/create' element={<Create/>}></Route>
          <Route path = '/update/:id' element={<Update/>}></Route>
          <Route path = '/read/:id' element={<Read/>}></Route>
          <Route path = '/createreview' element={<CreateReview/>}></Route>
          <Route path = '/updatereview/:id' element={<UpdateReview/>}></Route>
          <Route path = '/readreview/:id' element={<ReadReview/>}></Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App