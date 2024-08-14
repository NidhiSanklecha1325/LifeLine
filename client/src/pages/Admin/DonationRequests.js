import React, {useState,useEffect} from 'react'
import Layout from '../../components/shared/Layout'
import API from '../../services/API'
import { Button, Table, Toast ,ToastContainer} from 'react-bootstrap'
const DonationRequests = () => {
    const [show, setShow] = useState(false);
    const [message,setMessage] = useState("")
    const [donationRequestList, setDonationRequestList] = useState([])
    const [upcomingDonationList, setUpcomingDonationList] = useState([])
    const getDonationRequestList = async () =>{
        
        const res = await API.get("/admin/get-donation-request-list")
        if(res){
            setDonationRequestList(res.data.currentResult)
            setUpcomingDonationList(res.data.pendingResult)
            console.log(res.data.currentResult)
        }
    }
    useEffect(()=>{
        getDonationRequestList()
},[])

const rejectRequest = async(id) =>{
  const res = await API.post("/admin/reject-request",{id})
  console.log(res)
  if(res.data.success){

      setShow(true)
      setMessage(res.data.message)
      getDonationRequestList()
  }
}
const approve = async(id,bloodGroup,unit) =>{
    const res = await API.post("/admin/add-to-stocks",{id,bloodGroup,unit})
    if(res.data.success){

        setShow(true)
        setMessage(res.data.message)
        getDonationRequestList()
    }
}
  return (
    <Layout>
        <ToastContainer
          className="p-3"
          position={'top-center'}
          style={{ zIndex: 100 }}
        >
        <Toast bg='danger' onClose={() => setShow(false)} show={show} delay={10000} autohide animation>
          
          <Toast.Body className='text-white p-4'>{message}</Toast.Body>
        </Toast>
        </ToastContainer>
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
                 <th>Donated Date</th>
                 <th>Donor Name</th>
                 <th>Blood Group</th>
                  <th>Quantity</th>
                 <th>Action</th>
               </tr>
             </thead>
        {donationRequestList.length > 0 ? (
            <>
            
             {donationRequestList.map((donationRequest,index)=>(
             <tbody>
               <tr>
                 <td>{index+1}</td>
                 <td>{donationRequest.appointmentDate}</td>
                 <td>{donationRequest.userId.firstName} {donationRequest.userId.lastName}</td>
                <td>{donationRequest.bloodGroup}</td>
                 <td>{donationRequest.unit || 1}</td>
                 <td>
                    {
                        
                    }
                    <Button variant='outline-danger me-2' onClick={() => approve(donationRequest._id,donationRequest.bloodGroup,2)}>Approve</Button>
                    <Button variant='danger' onClick={() => rejectRequest(donationRequest._id)}>Reject</Button></td>
               </tr>
              
             </tbody>
             ))}
          
           </>
          ) : (
            <td colSpan={6}><h3>No upcoming donations.</h3></td>
           )}
            </Table>
           </div>
                </div>
            </div>
            <div class=" pt-4">
                <div class="bg-light text-center rounded p-4">
                    <div class="d-flex align-items-center justify-content-between mb-4">
                        <h2 class="mb-0">Upcoming Donations</h2>
                        
                    </div>
                    <div class="table-responsive">
        <Table hover className='text-start align-middle'>
             <thead>
               <tr>
                 <th>#</th>
                 <th>Donated Date</th>
                 <th>Donor Name</th>
                 <th>Blood Group</th>
                  <th>Quantity</th>
                 <th>Action</th>
               </tr>
             </thead>
        {upcomingDonationList.length > 0 ? (
            <>
            
             {upcomingDonationList.map((donationRequest,index)=>(
             <tbody>
               <tr>
                 <td>{index+1}</td>
                 <td>{donationRequest.appointmentDate}</td>
                 <td>{donationRequest.userId.firstName} {donationRequest.userId.lastName}</td>
                <td>{donationRequest.bloodGroup}</td>
                 <td>{donationRequest.unit || 1}</td>
                 <td>
                    {
                        
                    }
                    <Button className='btn btn-success' onClick={() => approve(donationRequest._id,donationRequest.bloodGroup,2)}>Approve</Button><Button>Reject</Button></td>
               </tr>
              
             </tbody>
             ))}
          
           </>
          ) : (
            <tbody>
              <tr>
              <td colSpan={6}><h3>No upcoming donations.</h3></td>
              </tr>
            </tbody>
            
           )}
            </Table>
           </div>
                </div>
            </div>
             
      
    </Layout>
  )
}

export default DonationRequests
