import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logo } from '../../assets/assets/index'
import { allItems } from '../../constants';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutIcon from '@mui/icons-material/Logout'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HeaderBottom from './HeaderBottom';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { userSignOut } from '../../redux/amazonSlice';
//rafce snippet for making a call-back function
const Header = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const [showALL,setShowAll] = useState(false)
  const products = useSelector((state)=>state.amazon.products)
  const userInfo = useSelector((state)=> state.amazon.userInfo)

  const handleLogOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful. 
      dispatch(userSignOut()) 
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <div className='w-100% sticky top-0 z-50'>
    <div className='w-100%  bg-amazon_blue text-white px-4 py-3 flex items-center gap-4'>
    <Link to='/'>
    <div className='headerHover'>
      <img className='w-24 mt-2' src={logo} alt="" />
    </div>
    </Link>
    
    <div className='headerHover hidden '>
      <LocationOnIcon/>
      <p className='text-sm text-lightText font-light flex flex-col'>Deliver to <span className='text-sm font-semibold -mt-1 text-whiteText'>India</span></p>
      </div>
      <div className='h-10 rounded-md flex flex-grow relative'>
        <span onClick={()=>setShowAll(!showALL)} className='w-14 h-full bg-gray-200 hover:bg-gray-300 border-2 cursor-pointer duration-300 text-sm text-amazon_blue font-titleFont flex items-center  justify-center rounded-t1-md rounded-b1-md'>All <span></span>
        <ArrowDropDownIcon/> 
        </span>
        {
          showALL && (
            <div>
              <ul className='absolute w-56 h-80 top-10 left-0 overflow-y-scroll overflow-x-hidden bg-white border-[1px] border-amazon_blue text-black p-2 flex-col gap-1 z-50'>
                 <li className='text-sm tracking-wide font-titleFont border-b-[1px] border-b-transparent hover:border-b-amazon_blue cursor-pointer duration-200'>All Departments</li>
                {
                  allItems.map((items) =>(
                    <li className='text-sm tracking-wide font-titleFont border-b-[1px] border-b-transparent hover:border-b-amazon_blue cursor-pointer duration-200' key={items._id}>{items.title}</li>
                  ))
                }             
              </ul>
            </div>
          )
        }
        <input type="text" className='  h-full  text-base text-amazon_blue flex-grow outline-none border-none px-2' />
        <span className='w-12 h-full flex items-center justify-center bg-amazon_yellow hover:bg-[#f3a847] duration-300 text-amazon_blue cursor-pointer rounded-tr-md rounded-br-md'>
          <SearchIcon/>
        </span>
      </div>
      <Link to="/signin">
      <div className='flex flex-col items-start justify-center headerHover'>
        {
          userInfo ? (
            <p className='text-sm text-gray-100 font-medium'>
            {userInfo.userName}
            </p>
          ) :(
            <p className='text-xs text-lightText font-light'>Hello, sign in</p>
          )
        }
        <p className='text-sm font-semibold -mt-1 mdl:text-lightText hidden mdl:inline-flex'>Accounts & Lists{" "} <span> <ArrowDropDownIcon/> </span> 
        </p>
      </div>
      </Link>
      <div className=' lgl:flex flex-col items-start justify-center headerHover'>
        <p className='text-xs text-lightText font-light'>Returns</p>
        <p className='text-sm font-semibold -mt-1 text-whiteText'>& Orders</p>
      </div>
      <Link to="/cart">
      <div className='flex items-start justify-center headerHover relative'>
        <ShoppingCartIcon/>
        <p className='text-xs font-semibold mt-3 text-whiteText'>Cart{" "} 
        <span className='absolute text-xs -top-1 left-6 font-semibold p-1 h-4 bg-[#f3a847] text-amazon_blue rounded-full flex justify-center items-center'> {products.length > 0 ?products.length:0} </span></p>
      </div>
      </Link>
      {
        userInfo && (
          <div onClick={handleLogOut} className='flex flex-col justify-center items-center headerHover relative'>
          <LogoutIcon/>
          <p className='hidden mdl:inline-flex text-xs font-semibold text-whiteText'>Log out
          </p>
          </div>
        )
      }
    </div>
        <HeaderBottom/>
    </div>
  )
}

export default Header