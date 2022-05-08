import React from 'react'
import Logo from '../logo.png'
import { Link } from 'react-router-dom'
function NavBar() {
  return (
    <div className="border flex space-x-6 items-center justify-space-between pl-12 py-4">
      <Link to="/"><img className='w-[70px] md:w-[120px]' src={Logo} alt="LogoImg" /></Link>
      <Link to="/favourites">
        <div className="text-blue-400 font-bold text-xl md:text-2xl">Favourites</div>
      </Link>

    </div>
  )
}

export default NavBar