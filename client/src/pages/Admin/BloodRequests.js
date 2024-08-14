
import React, {useState,useEffect} from 'react'
import Layout from '../../components/shared/Layout'
import API from '../../services/API'
import { Button, Table, Toast ,ToastContainer} from 'react-bootstrap'
import ToastBox from '../../components/shared/Toast'

const BloodRequests = () => {
    const [show, setShow] = useState(false);
    const [message,setMessage] = useState("")
    const [bloodRequestList, setBloodRequestList] = useState([])
   
    const getBloodRequestList = async () =>{
        
        const res = await API.get("/admin/get-blood-request-list")
        if(res){
            setBloodRequestList(res.data.request)
        }
    }
    useEffect(()=>{
        getBloodRequestList()
},[])
const approve = async(id,bloodGroup,unit) =>{
    const res = await API.post("/admin/remove-from-stocks",{id,bloodGroup,unit})
    if(res.data.success){
        setShow(true)
        setMessage(res.data.message)
        getBloodRequestList()
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

                    
        <Table className='text-start align-middle' hover>
             <thead>
               <tr>
                 <th>#</th>
                 <th>Consumer</th>
                 <th>Blood Group</th>
                 <th>Quantity</th>
                 <th>Status</th>
                 <th>Action</th>
               </tr>
             </thead>
             {bloodRequestList.length > 0 ? ( 
              <>
             {bloodRequestList.map((request,index)=>(
             <tbody>
               <tr>
               <td>{index+1}</td>
                 <td>{request.name}</td>
                 <td>{request.bloodGroup}</td>
                 <td>{request.unit || 1}</td>
                 <td>{request.status}</td>
                 <td>
                    {
                        
                    }
                    <Button onClick={() => approve(request._id,request.bloodGroup,request.unit)}>Approve</Button><Button>Reject</Button></td>
               </tr>
              
             </tbody>
             ))}
             </>
             ) : (
<tbody>
              <tr>
              <td colSpan={6}><h3>No blood requests.</h3></td>
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

export default BloodRequests
