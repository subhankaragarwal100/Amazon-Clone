import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {RotatingLines} from 'react-loader-spinner';
import {motion} from 'framer-motion';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


const Registration = () => {
  const navigate = useNavigate()
  const auth = getAuth()
  const [clientName,setClientName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [cPassword,setCPassword] = useState("");

  const [errclientName,setErrClientName] = useState("");
  const [erremail,setErrEmail] = useState("");
  const [errpassword,setErrPassword] = useState("");
  const [errcPassword,setErrCPassword] = useState("");
  const [firebaseErr, setFirebaseErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleName=(e) =>{
    setClientName(e.target.value)
    setErrClientName("")
  }

  const handleEmail=(e)=>{
    setEmail(e.target.value)
    setErrEmail("")
  }

  const handlePassword=(e)=>{
    setPassword(e.target.value)
    setErrPassword("")
  }

  const handleCPassword=(e)=>{
    setCPassword(e.target.value)
    setErrCPassword("")
  }

  const emailValidation = (email) =>{
    return String(email).toLowerCase().match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  }

  const handleRegistration = (e)=>{
    e.preventDefault()
    if (!clientName) {
      setErrClientName("Enter your name")
    }
    if (!email) {
      setErrEmail("Enter your email")
    } else{
      if(!emailValidation(email)){
        setErrEmail("Enter a valid email")
        setFirebaseErr("")
      }
    }
    if (!password) {
      setErrPassword("Enter a password")
    }else {
      if(password.length < 6){
      setErrPassword("Password should be atleast 6 characters")
      }
    }
    if(!cPassword){
      setErrCPassword("Confirm your password");
    }else{
      if(cPassword !== password){
        setErrCPassword("Password not matched")
      }
    }
    if (clientName && email && emailValidation(email) && password && password.length >=6 && cPassword && cPassword === password) 
    {
      setLoading(true)  
      // 
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(auth.currentUser,{
          displayName:clientName
        })
        // Signed in 
        const user = userCredential.user;
        // console.log(user)
        setLoading(false)
        setSuccessMsg("Account created successfully")
        setTimeout(() =>{
          navigate("/signin")
        },1000)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode.includes("auth/email-already-in-use")){
          setFirebaseErr("Email Already in use, Try another one");
        }
        // ..
      });
      setClientName("")
      setEmail("")
      setPassword("")
      setCPassword("")
      setErrCPassword("")
      setFirebaseErr("")
    }
  }
  return (
    <div className='w-full'>
    <div className='w-full bg-gray-100 pb-10'>
    <form className='w-[370px] mx-auto flex flex-col items-center'>
    <img className='w-32' src="https://img.etimg.com/thumb/msid-59738992,width-640,resizemode-4,imgsize-25499/amazon.jpg" alt="" />
    <div className='w-full border border-zinc-200 p-6'>
    <h2 className='font-titleFont text-3xl font-medium mb-4'>Create Account
    </h2>
    <div className='flex flex-col gap-3'>
    <div className='flex flex-col gap-2'>
    <p>Your name</p>
    <input value={clientName} onChange={handleName} type="text" className='w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100'/>
    {
      errclientName && (
        <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>{errclientName}</p>
      )
    }
    </div>
    <div className='flex flex-col gap-2'>
    <p>Email or phone number</p>
    <input value={email}
    onChange={handleEmail}
    type="email" className='w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100'/>
    {
      erremail && (
        <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>{erremail}</p>
      )
    }
    {
      firebaseErr && (
        <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>{firebaseErr}</p>
      )
    }
    </div>
    <div className='flex flex-col gap-2'>
    <p>Password</p>
    <input value={password}
    onChange={handlePassword}
    type="password" className='w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100'/>
    {
      errpassword && (
        <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>{errpassword}</p>
      )
    }
    </div>
    <div className='flex flex-col gap-2'>
    <p>Re-enter Password</p>
    <input value={cPassword}
    onChange={handleCPassword}
    type="password" className='w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100'/>
    </div>
    {
      errcPassword && (
        <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>{errcPassword}</p>
      )
    }
    <p>Passwords must be atleast 6 characters.</p>
    <button onClick={handleRegistration} className='w-full font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border hover:from-yellow-300 hover:to-yellow-400 border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md mt-3'>Continue</button>
    {
      loading && (
        <div className='flex justify-center'>
        <RotatingLines
            strokeColor="#febd69"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
         </div>
      )
    }
    {
      successMsg && (
        <div>
        <motion.p initial={{y:10, opacity:0}}
        animate={{y:0, opacity:1}}
        transition={{ duration:0.5}}
        className='text-base font-titleFont font-semibold text-green-500 border-[1px] border-green-500 px-2 text-center'>{successMsg}</motion.p>
        </div> 
      )
    }
    </div>
    <p className='text-xs text-black leading-4 mt-4'>By Continuing, you agree to Amazon's <span className='text-blue-600'>Conditions of Use{" "}</span>
    </p>
    <div>
    <p className='text-xs text-black'>Already have an account? 
    <Link to="/signin">
    <span className='text-xs text-blue- hover:text-orange-600 hover:underline  underline-offset-1 cursor-pointer duration-100'>Sign in <span> <ArrowRightIcon/>  </span></span>
    </Link>
    </p>
    <p className='text-xs text-black -mt-2'>Buying for work? <span className='text-xs text-blue- hover:text-orange-600 hover:underline  underline-offset-1 cursor-pointer duration-100'>Create a free business account</span></p>
    </div>
    </div>
    </form>
    </div>
    <div className='w-full bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col gap-4 justify-center items-center py-10'>
    <div className='flex items-center gap-6'>
    <p className='text-xs text-blue-600 hover:text-orange-700 hover:underline underline-offset-1 cursor-pointer duration-100'>Conditions of use</p>
    <p className='text-xs text-blue-600 hover:text-orange-700 hover:underline underline-offset-1 cursor-pointer duration-100'>Privacy Notice</p>
    <p className='text-xs text-blue-600 hover:text-orange-700 hover:underline underline-offset-1 cursor-pointer duration-100'>Privacy Notice</p>
    </div>
    <p className='text-xs text-gray-600'>© 2023-24, ReactBd.com, Inc. or its affiliates</p>
    </div>
    </div>
  )
}

export default Registration