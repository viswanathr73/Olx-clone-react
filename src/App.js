import React,{useEffect,useContext} from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create';
import View from './Pages/ViewPost';
import Post from './store/PostContext';

import './App.css';
import {AuthContext, FirebaseContext} from './store/Context';


import Home from './Pages/Home';

function App() {

  const {setUser}=useContext(AuthContext)
  const {firebase}=useContext(FirebaseContext)

  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      setUser(user)
    })
  })

  return (
    <div>
      <Post>
      <Router>
        <Routes>
        <Route exact path='/' element={<Home/>} /> 
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/create' element={<Create/>}/>
        <Route path='/view' element={<View/>}></Route>
        </Routes>
      </Router>
      </Post>
    </div>
  );
}

export default App;