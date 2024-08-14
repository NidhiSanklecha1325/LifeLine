import React, { useEffect, useState } from 'react';
import Layout from '../components/shared/Layout';
import { Card, Row, Col } from 'react-bootstrap';
import API from '../services/API';
import './Dashboard.css'; // Create this CSS file for styling

const Dashboard = () => {
    const [appointmentList, setAppointmentList] = useState([]);
    const [donorList, setDonorList] = useState([]);
    const [consumerList, setConsumerList] = useState([]);
    var user = JSON.parse(localStorage.getItem("user"));

    const getAppointmentList = async() => {
        try {
            const res = await API.get("/admin/get-appointment-list")
            console.log(res.data)
            if(res.data.success){
                setAppointmentList(res.data.request)
                setDonorList(res.data.donors)
                setConsumerList(res.data.consumers)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAppointmentList()
    }, []);

    return (
        <Layout>
            {/* <div className="dashboard-container">
                <h2>Dashboard</h2>
                <Row className="mb-4">
                    <Col md={4}>
                        <Card className="metric-card">
                            <Card.Body>
                                <Card.Title>Total Donors</Card.Title>
                                <Card.Text className="metric-value">{metrics.totalDonors}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="metric-card">
                            <Card.Body>
                                <Card.Title>Total Appointments</Card.Title>
                                <Card.Text className="metric-value">{metrics.totalAppointments}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="metric-card">
                            <Card.Body>
                                <Card.Title>Recent Activities</Card.Title>
                                <ul className="activity-list">
                                    {metrics.recentActivities.length > 0 ? (
                                        metrics.recentActivities.map((activity, index) => (
                                            <li key={index}>{activity}</li>
                                        ))
                                    ) : (
                                        <li>No recent activities</li>
                                    )}
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div> */}
            {
                        user.role === "admin" && (
            <div class="content mb-4">
                
            <div class="pt-4 ">
                <div class="row g-4">
                    <div class="col-sm-6 col-xl-3">
                        <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                        <i class="fa-solid fa-droplet text-danger fa-3x"></i>
                            <div class="ms-3">
                            <h5 class="mb-2 text-danger">Requests</h5>
                                <h6 class="mb-0">26</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-xl-3">
                        <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                        
                        <i class="fa-solid fa-hand-holding-droplet text-danger fa-3x"></i>
                            <div class="ms-3">
                            <h5 class="mb-2 text-danger">Donations</h5>
                                <h6 class="mb-0">87</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-xl-3">
                        <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                        <i class="fa-solid fa-users text-danger fa-3x"></i>
                            <div class="ms-3">
                                <h5 class="mb-2 text-danger">Total Users</h5>
                                <h6 class="mb-0">15</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-xl-3">
                        <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                        <i class="fa-solid fa-layer-group text-danger fa-3x"></i>
                            <div class="ms-3">
                            <h5 class="mb-2 text-danger">Stock</h5>
                                <h6 class="mb-0">350</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pt-4 ">
                <div class="row g-4">
                    <div class="col-sm-12 col-xl-6">
                        <div class="bg-light text-center rounded p-4 h-100" >
                            <div class="d-flex align-items-center justify-content-between mb-4">
                            <h2 class="mb-0">Registered Donors</h2>
                            </div>
                            <table class="table text-start align-middle  table-hover mb-0">
                            <thead>
                                <tr class="text-dark">
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email Id</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                            {donorList.map((a,index)=>(
                                    <tr>
                                    <td>{index+1}</td>
                                        <td>{a.firstName } {a.lastName}</td>
                                   
                                    <td>{a.email}</td>
                                    
                                    
                                </tr>
                                ))}
                                </tbody>
                                </table>
                        </div>
                    </div>
                    <div class="col-sm-12 col-xl-6">
                        <div class="bg-light text-center rounded p-4 h-100">
                            <div class="d-flex align-items-center justify-content-between mb-4">
                            <h2 class="mb-0">Registered Consumers</h2>
                            </div>
                            <table class="table text-start align-middle  table-hover mb-0">
                            <thead>
                                <tr class="text-dark">
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email Id</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                            {consumerList.map((a,index)=>(
                                    <tr>
                                    <td>{index+1}</td>
                                        <td>{a.firstName } {a.lastName}</td>
                                   
                                    <td>{a.email}</td>
                                    
                                    
                                </tr>
                                ))}
                                </tbody>
                                </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class=" pt-4">
                <div class="bg-light text-center rounded p-4">
                    <div class="d-flex align-items-center justify-content-between mb-4">
                        <h2 class="mb-0">Recent Activity</h2>
                        
                    </div>
                    <div class="table-responsive">
                        <table class="table text-start align-middle  table-hover mb-0">
                            <thead>
                                <tr class="text-dark">
                                    <th scope="col">#</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Blood Group</th>
                                    
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointmentList.map((a,index)=>(
                                    <tr>
                                    <td>{index+1}</td>
                                    <td>{a.appointmentDate}</td>
                                    {a.name ? (
                                        <td>{a.name }</td>
                                    ): (
                                        <td> {a.userId.firstName} {a.userId.lastName}</td>
                                    )}
                                    
                                    <td>{a.bloodGroup}</td>
                                    <td>{a.unit}</td>
                                    <td><span class="badge rounded-pill  bg-info">{a.requestType}</span></td>
                                    
                                </tr>
                                ))}
                                
                               
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </div>
            )
        }
        </Layout>
    );
};

export default Dashboard;
