import React,{useState, useEffect} from 'react'
import {Routes,Route} from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage';
import RecoverPage from './pages/auth/RecoverPage';
import RegisterPage from './pages/auth/RegisterPage';
import SearchPage from './pages/searchEngine/SearchPage';
import NotFound from './pages/NotFound';
import SuperAdmin from './pages/admin/SuperAdmin';
import Admin from './pages/admin/Admin';
import ProfilePage from './pages/auth/ProfilePage';
import PrivateRoute from './utils/helper/PrivateRoute';


const  App=()=> {
  const session= localStorage.getItem("sessionId")
  const [isAuthenticate,setIsAuthenticate]=useState(session)

  useEffect(()=>{
    const session= localStorage.getItem("sessionId")
    if(session && session!==''){
      console.log("sessonId :",session)
      setIsAuthenticate(true)
    }
  },[])
  console.log('isAuthenticate :', isAuthenticate)
  return (
   <main>
    <Routes>
      <Route path='/' element={<SearchPage/>}/>
      <Route path='/signIn' element={<LoginPage/>}/>
      <Route path='/signUp' element={<RegisterPage/>}/>
      <Route path='/recover' element={<RecoverPage/>}/>
      <Route path='*' element={<NotFound/>}/>

      <Route path='/superAdmin' element={<PrivateRoute isAuthenticated={isAuthenticate}><SuperAdmin/></PrivateRoute>}/>
      <Route path='/admin' element={<PrivateRoute isAuthenticated={isAuthenticate}><Admin/></PrivateRoute>}/>
      <Route path='/Profile' element={<PrivateRoute isAuthenticated={isAuthenticate}><ProfilePage/></PrivateRoute>}/>
    </Routes>
   </main>
  );
}

export default App;
