import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { MdMenu } from "react-icons/md";
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBookMedical, faCalendarCheck, faUser, faHeartPulse, faHandHoldingDroplet } from '@fortawesome/free-solid-svg-icons';

const SidebarMenu = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [collapsed, setCollapsed] = useState(false);
  
    const donorMenu = [
    {
        name: "Book Appointments",
        link: "/book-appointment",
        icon: faBookMedical
    },
    {
        name: "Appointments",
        link: "/appointments",
        icon: faCalendarCheck
    },
    {
        name: "Profile",
        link: "/profile",
        icon: faUser
    },
    {
        name: "Donation History",
        link: "/donation-history",
        icon: faHandHoldingDroplet
    },
    
    ];
    const receiverMenu = [
       
        {
            name: "Request List",
            link: "/requests",
            icon: faBookMedical
        },
    {
        name: "Profile",
        link: "/profile",
        icon: faUser
    }
    ];
    const adminMenu = [
        {
            name: "Dashboard",
            link:"/dashboard",
            icon:  faBookMedical
        },
        {
            name: "Donations",
            link: "/donation-requests",
            icon: faBookMedical
        },
        {
            name: "Requests",
            link:"/blood-requests",
            icon:  faBookMedical
        },
        {
            name: "Inventory",
            link:"/inventory",
            icon: faBookMedical 
        },
        
    ];
    const handleClick = () => {
        setCollapsed(!collapsed);
    };
    return (
        <div style={{ width: "100%", height: "100%" }}>
            <Sidebar className="sidebar" collapsed={collapsed} style={{height: "100%"}}>
                <div className="sidebar-header">
                    <MdMenu className="hamburger" onClick={handleClick} >Menu </MdMenu>
                    <h2>Menu</h2>
                </div>
                <Menu>
                    {
                        user.role === "donor" && (
                            donorMenu.map((menu) => (
                                <MenuItem className='mt-3 mb-3  '
                                    key={menu.name}
                                    icon={<FontAwesomeIcon icon={menu.icon}  size='lg' />}
                                    component={<Link to={menu.link}  />}
                                   
                                >
                                    {menu.name}
                                </MenuItem>
                            ))
                        )
                    }
                    {
                        user.role === "receiver" && (
                            receiverMenu.map((menu) => (
                                <MenuItem className='mt-3 mb-3 ' 
                                    key={menu.name}
                                    icon={<FontAwesomeIcon icon={menu.icon} size='lg'  />}
                                    component={<Link to={menu.link}  />}
                                   
                                >
                                    {menu.name}
                                </MenuItem>
                            ))
                        )
                    }{
                        user.role === "admin" && (
                            adminMenu.map((menu) => (
                                <MenuItem className='mt-3 mb-3  ' 
                                    key={menu.name}
                                    icon={<FontAwesomeIcon icon={menu.icon} size='lg'  />}
                                    component={<Link to={menu.link}  />}
                                    
                                >
                                    {menu.name}
                                </MenuItem>
                            ))
                        )
                    }
                </Menu>
            </Sidebar>
        </div>
    );
};

export default SidebarMenu;
