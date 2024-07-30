import React, { useEffect } from 'react'
import Layout from '../../components/shared/Layout'
import { Button, Form, FormControl, FormGroup,Dropdown, ButtonGroup,Row,Col, InputGroup, ButtonToolbar,Stack, Card } from 'react-bootstrap';
import { useState } from 'react';
import MultiStepProgressBar from '../../components/shared/MultiStepProgressBar';
import API from '../../services/API';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const BookAppointment = () => {
  const [page, setPage] = useState("locationsearch");
  const [location,setLocation] = useState('')

  const nextPage = (page) => {
    setPage(page);
  };

  const nextPageNumber = (pageNumber) => {
    switch (pageNumber) {
      case "1":
        setPage("locationsearch");
        break;
      case "2":
        setPage("donorcenter");
        break;
      case "3":
        setPage("dateandtime");
        break;
      case "4":
        setPage("reviewandbook")
        break;
      case "5":
        alert("Booking completed")
      default:
        setPage("1");
    }
  };

  const LocationSearch = ({onButtonClick}) => {
    const [searchResult, setSearchResult] = useState([])
    const [key,setKey] = useState("")
    const handleDropdownSelect = (eventKey, event) => {
      setKey(eventKey);
      setLocation(eventKey)
    };
  
    useEffect(() => {
      const search = async() =>{
        
        try {
          if(!key.trim()){
            setSearchResult([])
            return 
          }
          const res = await API.get("/donor/search-location",{params: {key:key,limit:5}})
          setSearchResult(res.data.results)
          console.log(res.data.results)
        } catch (error) {
          console.log(error)
        }
      }
      search()
    },[key])

    return(
      <div>
        <Stack direction="horizontal" gap={3}
        >
          <div> 
            
            <Dropdown  onSelect={handleDropdownSelect} autoClose="false">
            
              <Dropdown.Menu className="dropdown-menu text-center" show align={"end"}>
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={(e) => setKey(e.target.value)}
                  style={{ margin: "8px 10px", borderRadius: "5px" }}
                />
                {searchResult.map((location) => (
                  <Dropdown.Item key={location} eventKey={location}>
                    {location}, ON
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            
                </div>
                <InputGroup>
                {searchResult.map((location) => (
                  <p>
                    {location}, ON
                  </p>
                ))}
            <Button size='sm' onClick={() => onButtonClick("donorcenter")} >Search</Button>
            </InputGroup>
        </Stack>

        
        </div>
    )
  }
  const DonorCenter = ({onButtonClick}) => {
    const [centerList,setCenterList] = useState([])
    console.log(location)

      const searchCenters = async() =>{
        try{
          if(!location.trim()){
            setCenterList([])
            return 
          }
          const res = await API.get("/donor/search-center",{params: {key:location,limit:5}})
          if(res){
            setCenterList(res.data.results)
            console.log(res.data.results)
            return
          }
          

        }catch(error){
          console.log(error)
        }
      }
    useEffect(()=>{
      searchCenters()
    }, [])

    const onSelectingCenter = async(centerId) =>{
      setLocation(centerId)
    }
    return(
      <div>
        <Row xs={1} md={2} className="g-4">
          {centerList.map((center)=>(
            <Col >
          <Card>
            
            <Card.Body>
              <Card.Title>{center.centerName}</Card.Title>
              <Row>
              <Card.Text as={Col}>
               {center.centerAddress}
              </Card.Text>
              <Card.Text as={Col}>
              <Button onClick={() => {onSelectingCenter(center._id);  onButtonClick("dateandtime");}} >Next</Button>
              </Card.Text>
              </Row>
              
            </Card.Body>
          </Card>
        </Col>
          ))}
        
        </Row>
       
        
      </div>
    )
  }
  const DateAndTime = ({onButtonClick}) => {
    const [date,setDate] = useState(new Date())
    return(
      <div>DateAndTime
        <Calendar onChange={setDate} value={date} />
        <Button onClick={() => onButtonClick("reviewandbook")} >Next</Button>
      </div>
    )
  }
  const ReviewAndBook = ({onButtonClick}) => {
    return(
      <div>ReviewAndBook
        <Button onClick={() => onButtonClick("complete")} >Next</Button>
      </div>
    )
  }
  const CompleteBooking = ({onButtonClick}) => {
    return(
      <div>DonorCenter
        
      </div>
    )
  }
  return (
    <Layout>
        <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} />
      {
        {
          locationsearch: <LocationSearch onButtonClick={nextPage} />,
          donorcenter: <DonorCenter onButtonClick={nextPage} />,
          dateandtime : <DateAndTime onButtonClick={nextPage} />,
          reviewandbook : <ReviewAndBook onButtonClick={nextPage}/>,
          complete : <CompleteBooking/> 
          
        }[page]
      }
    </Layout>
  )
}

export default BookAppointment
