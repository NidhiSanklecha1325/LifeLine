import React from 'react'
import NavBarComponent from './Nav'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <>
      <div className='header'><NavBarComponent /></div>

      <div className='content'>
       
        {children}</div>

        <div className='footer'><Footer/></div>
    </>
  )
}

export default Layout
