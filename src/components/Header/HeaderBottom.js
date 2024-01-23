import React, { useEffect, useRef, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import {motion} from "framer-motion"
import Sidenav from './Sidenav';
import { useSelector } from 'react-redux';

const HeaderBottom = () => {
  const userInfo = useSelector((state) => state.amazon.userInfo)
  const ref = useRef()
  const [sidebar, setSidebar] = useState(false)
  useEffect(() =>{
    document.body.addEventListener("click",(e) =>{
      if(e.target.contains(ref.current)){
        setSidebar(false)
      }
    })
  },[ref,sidebar])
  return (
    <div className='w-full px-4 h-[36px] bg-amazon_light text-white flex items-center'>
    <ul className='flex items-center gap-2 text-sm tracking-wide'>
    <li onClick={()=>setSidebar(true)} className='headerHover flex items-center gap-1'> <MenuIcon/> All</li>
    <li className='headerHover'>Today's Deals</li>
    <li className='headerHover'>Customer Service</li>
    <li className='headerHover'>Gift Cards</li>
    <li className='headerHover'>Registry</li>
    <li className='headerHover'>Sell</li>
    </ul>
    {sidebar && (
      <div className='w-full h-screen text-black fixed top-0 left-0 bg-amazon_blue bg-opacity-50'>
      
        <div className='w-full h-full relative'>
        <motion.div ref={ref} initial={{x:-500,opacity:0}} animate={{x:0, opacity:1}} transition={{duration:.5}} className='w-[350px] h-full bg-white border border-black'>
        <div className='w-full bg-amazon_light text-white py-3 px-6 flex items-center gap-4'>
        <AccountCircleIcon/>
        {
          userInfo ? (
            <h3 className='font-titleFont font-bold text-lg tracking-wide'>Hello,{userInfo.userName}</h3>
          ) : (
            <h3 className='font-titleFont font-bold text-lg tracking-wide'>Hello, Sign In</h3>
          )
        }
        </div>
        <Sidenav title="Digital Content & Devices"
        one="Amazon Music"
        two="Kindle E-readers & Books"
        three="Amazon Appstore"/>
        <Sidenav
        title="Shop By Department"
        one="Electronis"
        two="Computers"
        three="Smart Home"/>
        <Sidenav
        title="Programs & Features"
        one="Gift Cards"
        two="Amazon Live"
        three="International Shopping"/>
        <Sidenav
        title="Help & Settings"
        one="Your Account"
        two="Customer Service"
        three="Contact Us"/>      
         <span onClick={()=>setSidebar(false)} className='cursor-pointer absolute
          top-0 left-[360px] w-10 h-10 text-black flex items-center justify-center border bg-gray-200 hover:bg-red-500 hover:text-white duration-300'>
          <CloseIcon/>
          </span>
        </motion.div>
      </div>
      </div>
    )}
    </div>
  )
}

export default HeaderBottom