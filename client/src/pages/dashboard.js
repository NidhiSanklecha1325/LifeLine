import React from 'react'
import Layout from '../components/shared/Layout';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Layout>
      <Link to="/book-appointment" >Book Appointment</Link> <br/>
      <Link to={""}>Appointments</Link><br/>
      <Link to={"/profile"}>Profile</Link><br/>
      <Link to={""}>Donor Stats</Link><br/>
      <Link to={""}>Donation History</Link><br/>
    </Layout>
  )
}

export default Dashboard;
