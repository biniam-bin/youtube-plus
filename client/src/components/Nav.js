import React, {useState} from 'react'
import { BsCameraVideo, BsBell } from "react-icons/bs"
import { FiSearch } from "react-icons/fi"
import {Link} from "react-router-dom"


const Nav = () => {
    const [searchText, setSearchText] = useState("")
  return (
      <div className="h-16 shadow-2xl shadow-gray-800 flex items-center fixed bg-[#020304] w-full z-50 md:px-5">
          <div className="logo-section flex items-center w-1/5">
              <Link to={`/`} className="flex items-center"><img src="/yt-plus.jpeg" className="h-16 rounded-md" alt="" />
                  <p className="text-2xl font-bold text-gray-400 hidden md:flex">Youtube Plus</p></Link>
          </div>
          <div className="search-section w-3/5 h-full flex items-center justify-center">
              <div className="search-wrapper bg-[#272728] px-5 py-2 w-4/5 rounded-md flex justify-center items-center text-gray-400 ">
                  <input value={searchText} onChange={(e) => setSearchText(e.target.value)} type="text" placeholder="Search..." className="w-full bg-transparent focus:outline-none" />
                  <Link to={{
                      pathname: '/results',
                      search: `search_query=${searchText}`,
                  }}><FiSearch size={ 20}/></Link>
              </div>
          </div>
          <div className="icons-section w-1/5 h-full flex items-center justify-evenly pl-5 ">
              <BsCameraVideo size={25} className=" text-gray-300 cursor-pointer hidden md:flex" />
              <BsBell size={25} className=" text-gray-300 cursor-pointer hidden md:flex" />
              <div className="profile h-14 w-14 rounded-full ">
                  <img className="h-12 w-12 rounded-full cursor-pointer" src="https://www.picsum.photos/400/400" alt="" />
              </div>
          </div>
    </div>
  )
}

export default Nav