import React,{useEffect,useState} from 'react';
import API from '../../services/API';
import Layout from '../../components/shared/Layout';
import { Card, Col, Row, Button,Table } from 'react-bootstrap';
import './DonorStats.css';

const DonationHistory = () => {
  // Sample data
  /* const stats = {
    totalDonations: 1245,
    totalDonors: 980,
    upcomingAppointments: 15
  }; */
  var user = JSON.parse(localStorage.getItem("user"));
  const [donationList, setDonationList] = useState([])
  const getDonationList = async () =>{
        
    const res = await API.get("/donor/get-donation-list",{params: {userId : user._id}})
    if(res){
      console.log(res.data.request)
        setDonationList(res.data.request)
    }
}
useEffect(()=>{
  getDonationList()
},[])

  return (
    <Layout>
      {/* <div className="donor-stats">
        <h2 className="stats-heading">Donor Statistics</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          <Col>
            <Card className="stats-card">
              <Card.Body>
                <Card.Title>Total Donations</Card.Title>
                <Card.Text className="stats-value">{stats.totalDonations}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="stats-card">
              <Card.Body>
                <Card.Title>Total Donors</Card.Title>
                <Card.Text className="stats-value">{stats.totalDonors}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="stats-card">
              <Card.Body>
                <Card.Title>Upcoming Appointments</Card.Title>
                <Card.Text className="stats-value">{stats.upcomingAppointments}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Button className="btn-view-details" onClick={() => alert('View more details clicked')}>
          View Details
        </Button>
      </div> */}

<div class=" pt-4">
                <div class="bg-light text-center rounded p-4">
                    <div class="d-flex align-items-center justify-content-between mb-4">
                        <h2 class="mb-0">Donations</h2>
                        
                    </div>
                    <div class="table-responsive">
             <Table hover className='text-start align-middle'>
             <thead>
               <tr>
                 <th>#</th>
                 <th>Date</th>
                 <th>Center</th>
                 
                 <th>Blood Group</th>
                 <th>Quantity</th>
                 <th>Status</th>
               </tr>
             </thead>
             {donationList.length > 0 ? (
            <>
             {donationList.map((appointment)=>(
             <tbody>
               <tr>
                 <td>1</td>
                 <td>{appointment.appointmentDate}</td>
                 <td>{appointment.locationId.centerName}<br/>{appointment.locationId.centerAddress} </td>
                 <td>{appointment.bloodGroup}</td>
                 <td>{appointment.unit}</td>
                 <td>{appointment.status === "approved" && 
                 <span class="badge rounded-pill  bg-success p-2">{appointment.status}</span>
                }
                {appointment.status === "pending" && 
                 <span class="badge rounded-pill  bg-warning p-2">{appointment.status}</span>
                }
                {appointment.status === "rejected" && 
                 <span class="badge rounded-pill  bg-danger p-2">{appointment.status}</span>
                }
                </td>
               </tr>
              
             </tbody>
             ))}
              </>
          ) : (
            <tbody>
              <tr>
              <td colSpan={6}><h3>No donations.</h3></td>
              </tr>
            </tbody>
            
           )}
           </Table>
           </div>
                </div>
            </div>
    </Layout>
  );
};

export default DonationHistory;
