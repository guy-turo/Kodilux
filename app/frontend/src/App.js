import React,{useState} from 'react'
import {Routes,Route}from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage';
import RecoverPage from './pages/auth/RecoverPage';
import RegisterPage from './pages/auth/RegisterPage';
import SearchPage from './pages/searchEngine/SearchPage';
import NotFound from './pages/NotFound';
import SuperAdmin from './pages/admin/SuperAdmin';
import Admin from './pages/admin/Admin';
import ProfilePage from './pages/auth/ProfilePage';


const  App=()=> {
  return (
   <main>
    <Routes>
      <Route path='/' element={<SearchPage/>}/>
      <Route path='/signIn' element={<LoginPage/>}/>
      <Route path='/signUp' element={<RegisterPage/>}/>
      <Route path='/recover' element={<RecoverPage/>}/>
      <Route path='*' element={<NotFound/>}/>

      <Route path='/superAdmin' element={<SuperAdmin/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/Profile' element={<ProfilePage/>}/>
    </Routes>
   </main>
  );
}

export default App;
