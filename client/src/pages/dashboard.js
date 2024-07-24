import React from 'react'
import Layout from '../components/shared/Layout';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Layout>
      <Link to="/book-appointment" >Book Appointment</Link> 
      <Link to={""}>Appointments</Link>
      <Link to={"/profile"}>Profile</Link>
      <Link to={""}>Donor Stats</Link>
      <Link to={""}>Donation History</Link>
    </Layout>
  )
}

export default Dashboard;
