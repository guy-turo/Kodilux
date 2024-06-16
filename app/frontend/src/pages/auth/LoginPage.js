import React,{useState} from 'react'
import logo from '../../assets/logo.png'
import {Link} from 'react-router-dom'
import { MdNavigateBefore } from "react-icons/md";

function LoginPage() {
  const [email,setEmail]= useState('')
  const [emailChecked, setEmailChecked]=useState(true)
  
  const [password, setPassword]=useState('')
  const [hiddenPassword,setHiddenPassword] = useState(true)

  const checkFunc = ()=>{
    setEmailChecked(!emailChecked)
  }
  return (
    <div className='min-h-screen flex flex-col justify-center space-y-2 items-center bg-gray-100'>
      <div className='bg-white flex justify-between  shadow-md rounded-lg px-8 py-10 w-full  max-w-md md:max-w-lg'>
      <div className="flex-col items-center   w-full justify-start mb-6 ">
        <img src={logo} alt="logo" className='w-20 h-20' />
        <h1 className='text-xl  font-semibold'>Sign in</h1>
        </div>
        {emailChecked?<div className='mb-6 w-full h-full flex   justify-center self-center  '>
         <form className='space-y-2  w-full flex-col justify-end self-end'>
         <input 
          type="text" 
          id='email' 
          value={email} 
          onChange={(e)=>setEmail(e.target.value)}  
          placeholder="Email or phone"
          name="Email" 
          className="py-3 px-2  block w-full border-black   border-solid border rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 \
          disabled:pointer-events-none \
            dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
        />
         
        <div className='flex self-end justify-end space-x-4 '>
      
        <span className=' text-blue-500 text-sm  hover:text-blue-600 cursor-pointer'>
            <Link to="/signup">
            Create account
            </Link>
          </span>
      <button onClick={checkFunc} className='bg-blue-400 rounded-md text-black text-sm font-semibold px-2'>Next</button>
      </div>
      
         </form>
        </div>:
        <div className=' w-full h-full flex justify-around   flex-col items-start'>
         <button onClick={checkFunc} className='flex mb-4 rounded-md border border-solid border-black'>
         <MdNavigateBefore />
          </button>
        <form className='space-y-2  w-full flex-col justify-end self-end'>
        
        <input 
    id="hs-toggle-password-with-checkbox" 
    value={password} 
    onChange={(e)=>setPassword(e.target.value)} 
    type={`${hiddenPassword?"password":"text"}`} 
    class={`py-3 px-4 block w-full   border-solid border  border-black rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 \
    disabled:opacity-50 disabled:pointer-events-none  dark:placeholder-neutral-500 dark:focus:ring-neutral-600`} 
    placeholder="Enter current password" 
    />
        
        <div class="flex mt-4 justify-end">
    <input data-hs-toggle-password='{"target": "#hs-toggle-password-with-checkbox"}' 
      id="hs-toggle-password-checkbox" 
      type="checkbox" 
      value={hiddenPassword}
      onChange={(e)=>setHiddenPassword(!hiddenPassword)}
      class="shrink-0 mt-0.5 border-gray-200 rounded\
       text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 \
       dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500\
        dark:focus:ring-offset-gray-800"
    />
    <label 
      for="hs-toggle-password-checkbox" 
      class="text-sm text-gray-500 ms-3 dark:text-neutral-400">
        Show password
    </label>
    </div>
    <button 
        id='submit' 
        // disabled={isLoading}
        className={`rounded-md p-1 w-full justify-center  font-semibold flex  border border-solid border-gray-400 bg-blue-500 px-2`}>
          Login 
      </button>
   
        </form>
       </div>
        }
     
      </div>
     <div className="flex  justify-between  ">
      <div></div>
      <div className='flex justify-around space-x-4'>
      <h4 className='font-semibold cursor-pointer text-sm'>help</h4>
      <h4 className='font-semibold cursor-pointer text-sm'>Privacy</h4>
      <h4 className='font-semibold cursor-pointer text-sm'>Terms</h4>
      </div>
     </div>
    </div>
  )
}

export default LoginPage
