import React from 'react'
import { useState } from 'react'
import './App.css'
import Signup from './components/signup'
import Login from './components/login'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './components/Home'
import Nav from './components/Nav'
import ToDoList from './components/ToDoList'
import Timer from './components/Timer'
import Notes from './components/Notes'
import Chart from './components/Chart'
import Syllabus from './components/Syllabus'
import Calendar from './components/Calendar'
import Footer from './components/Footer'
import Game from './components/Game'
import Fileupload from './components/Fileupload'


function App() {
  return (
    <div className='m-[-32px]  lg:-mx-10 xl:-mx-24 min-h-screen'>
      <Nav/>
    <Routes>
      {/* <Route path='/Nav' element={<Nav/>}/> */}
      <Route path='/' element={<Home/>}/>  
      <Route path='/Signup' element={<Signup/>}/>    
      <Route path='/Login' element={<Login />}/>
      <Route path='/ToDoList' element={<ToDoList/>}/>
      <Route path='/Timer' element={<Timer/>}/>
      <Route path='/Notes' element={<Notes/>}/>
      <Route path='/Chart' element={<Chart/>}/>
      <Route path='/Syllabus' element={<Syllabus/>}/>
      <Route path='/Calendar' element={<Calendar/>}/>
      <Route path='/Game' element={<Game/>}/>
      <Route path='/Fileupload' element={<Fileupload/>}/>
    </Routes>
    <Footer/>
    </div>
  )
};

export default App
