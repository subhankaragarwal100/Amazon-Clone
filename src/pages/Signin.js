import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {RotatingLines} from 'react-loader-spinner';
import { setUserInfo } from '../redux/amazonSlice';
import { useDispatch } from 'react-redux';
const Signin = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [erremail,setErrEmail] = useState("");
  const [errpassword,setErrPassword] = useState("");
  const [userEmailErr, setUserEmailErr] = useState("");
  const [userpasswordErr, setUserPasswordErr] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleEmail = (e) =>{
    setEmail(e.target.value);
    setErrEmail("");
  }

  const handlePassword = (e) =>{
    setPassword(e.target.value);
    setErrPassword("");
  }

  const handleLogin=(e) =>{
    e.preventDefault()
    if(!email){
      setErrEmail("Enter your email")
    }
    if(!password){
      setErrPassword("Enter your password")
    }
    if (email && password) {
      setLoading(true)
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          dispatch(setUserInfo({
            _id:user.uid,
            userName:user.displayName,
            email:user.email
          }))
          // ...
          setLoading(false)
          setSuccessMsg("You are logged in successfully!")
          setTimeout(() =>{
            navigate("/")
          },2000)
        })
        .catch((error) => {
          setLoading(false);
          const errorCode = error.code;
          if (errorCode.includes("auth/invalid-email")){
            setUserEmailErr("Invalid Email");
          }
          if (errorCode.includes("auth/wrong-password")) {
            setUserPasswordErr("Wrong password! try again");
          }
        });
        setEmail("")
        setPassword("")
    }
  }

  return (
    <div className='w-full'>
    <div className='w-full  bg-gray-100 pb-10'>
    {
      successMsg ? (
        <div className='text-base font-titleFont font-semibold text-green-500 border-[1px] border-green-500 px-2 text-center'>{successMsg}</div>
      ) : (
        <form className='w-[350px] mx-auto flex flex-col items-center'>
      <img className='w-32' src="https://img.etimg.com/thumb/msid-59738992,width-640,resizemode-4,imgsize-25499/amazon.jpg" alt="" />
      <div className='w-full border border-zinc-200 p-6'>
      <h2 className='font-titleFont text-3xl font-medium mb-4'>Sign in</h2>
      <div className='flex flex-col gap-3'>
      <div className='flex flex-col gap-2'>
      <p className='text-sm font-medium'>Email or mobile phone number</p>
      <input onChange={handleEmail} value={email} className='w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100' type="email"/>
      {
        erremail && (
          <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>{erremail}</p>
        )
      }
      {
        userEmailErr && (
          <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>{userEmailErr}</p>
        )
      }
      </div>  
      <div className='flex flex-col gap-2'>
      <p className='text-sm font-medium'>Password</p>
      <input onChange={handlePassword} value={password} className='w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100' type="password"/>
      {
        errpassword && (
          <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>{errpassword}</p>
        )
      }
      {
        userpasswordErr && (
          <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>{userpasswordErr}</p>
        )
      }
      </div>
      <button onClick={handleLogin} className='w-full font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border hover:from-yellow-300 hover:to-yellow-400 border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md mt-3'>Continue</button>
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
      </div>
      
      <p className='text-xs text-black leading-4 mt-4'>By Continuing, you agree to Amazon's <span className='text-blue-600'>Conditions of Use{" "}</span></p>
      <p className='text-xs text-gray-600 mt-4 cursor-pointer group'><ArrowRightIcon/> <span className='text-blue-600 group-hover:text-orange-700 group-hover:underline underline-offset-1'>Need help?</span> </p>
      </div>
      <p className='w-full text-xs text-gray-600 mt-4 flex items-center'>
        <span className='w-1/3 h-[1px] bg-zinc-400 inline-flex '></span>
        <span className='w-1/3 text-center'>New to Amazon?</span>
        <span className='w-1/3 h-[1px] bg-zinc-400 inline-flex'></span>
        </p>
        <Link className='w-full' to="/registration"> 
        <button className='w-full py-1.5 mt-4 text-sm font-normal rounded-sm bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput'>Create your Amazon account</button>
        </Link>
    </form>
      )
    }
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

export default Signin