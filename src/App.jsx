import 'bootstrap/dist/css/bootstrap.min.css';
// import table component from react bootstrap to distplay data in tabular form
import Table from 'react-bootstrap/Table';
// import button componnet from react bootstarp to create clickable button
import Button from 'react-bootstrap/Button';
// import column from react bootstarp for column layout from rows
import Col from 'react-bootstrap/Col';
// import form from react bootstrap to build input form
import Form from 'react-bootstrap/Form';
// import row from react boostarp to create horizontal row inside form
import Row from 'react-bootstrap/Row';
// import tosatify from react toastify to show success/error notification
import { ToastContainer, toast } from 'react-toastify';
// import axios libary to make http api call (put delete)
import axios from "axios";
// import modal from react bootstrap modal to show delete confirmation popus
import Modal from 'react-bootstrap/Modal';
// import custom css file to additional css styling 
import "./style.css"
// import usestate and useffect hook for react 
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  // useeffect - side effect perform each page load it will be call useeffect
  // usestate - hook we can store value in usestate and we can upadate 
  // useMemo
  // useCallback
  // useref

  // state to store iteam name and enter by user 
  const [iteamName, setIteamName] = useState();
  // state to store descripiton and enter by user 
  const [description, setDescription] = useState();
  // state to store purchasepirce and enter by user 
  const [purchsePrice, setPurchasePrice] = useState();
  // state to store selling price and enter by user 
  const [sellingPrice, setSellingPrice] = useState();
  // state to store quanity and enter by user 
  const [quantity, setQuantity] = useState();
  // state to store unit and selecte user (kg, ltr, )
  const [unit, setUnit] = useState();
  // state to store list of all iteam fected all api 
  const [iteamData, setData] = useState();

  // async function to handle form submited and send data to the backend api 
  async function SubmitForm(e) {
    try {

// prevent default form submited behaviour 
      e.preventDefault();
// create an object with all fomr field value to send api 
      const data = {
        // maping iteamname state to the name field 
        name: iteamName,
         // maping description state to the description field
        description: description,
         // maping purchase price state to the purchase price field
        purchasePrice: purchsePrice,
         // maping selling price state to the selling price field
        sellingPrice: sellingPrice,
         // maping quantity state to the quantity field
        quantity: quantity,
         // maping unit state to the unit field
        unit: unit
      }
// login form data to the console from debugging 
      console.log(data, "Form submitted");
// sending a post to backend  api and create new itema
      const apiResponse = await axios.post("http://localhost:9090/api/create-iteam", data)
      // login success message when request is successful // login error if request fail 
        .then(console.log("yes")).catch((error) => console.log(error))
//  login full api response to console
      console.log(apiResponse);
      // calling getalliteam to refresh the iteam list after creating a new iteam
      getAllIteamData();

// showing toast sucess notfication when form submitted
      toast.success("Form submitted", {
        // setting toast position  is top right
        position: "top-right",
        // toast will auto close after 5000millsecond
        autoClose: 5000,
        // showing progressbar inside the toast
        hideProgressBar: false,
        // disabily close on click behaviour 
        closeOnClick: false,
        // toast pause when user hover it 
        pauseOnHover: true,
        // allow to toast the draggable 
        draggable: true,
        // no custom progress is default
        progress: undefined,
        // setting toast the light
        theme: "light",
      });
// login error that occur fetch iteam
    } catch (error) {
      console.log(error)
    }
  }
// async arrow function to fetch all iteam from the  backend api  
  const getAllIteamData = async () => {
    try {

      const apiResponse = await fetch("http://localhost:9090/api/get-all-iteam")
      // convert the api response to json format 
      const responseData = await apiResponse.json()
      // storting fetch iteam array into the iteamdata state
      setData(responseData.data);
      // login form data to the console from debugging 
      console.log(responseData)
// login error that occur fetch iteam
    } catch (error) {
      console.log(error)
    }
  }
// useEffect run once when the component account 
  useEffect(() => {
    // calling getalliteamdata to load all iteam when the page first load 
    getAllIteamData();
  }, []);

  console.log(iteamData, "iteam data ===>")

  const [show, setShow] = useState(false);
  const [id, setId] = useState()

  const handleClose = () => setShow(false);

  const OpenDeleteModal = (_id) => {
    try {
      setShow(true);
      setId(_id)

      console.log(_id,"_id===>")
      console.log("call deleted function")
    }catch {
      console.log(error)
    }
  }

  const handleDelete = async () => {
    try {
      console.log(id,"_id===>")
     
      const apiResponse = await axios.delete(`http://localhost:9090/api/delete-iteam/${id}` )

      setShow(false)
      console.log(apiResponse)
      getAllIteamData();

    }catch(error) {
      console.log(error)
    }
  }

  return (
    <>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <h2 className='text-danger text-center my-5'>CRUD - MERN STACK PROJECT START</h2>

      <div className='container'>

        <div className='row'>
          <div className='col-md-6'>
            <h3 className='border text-center'>Create Iteam</h3>
            <Form className='my-5'>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Iteam Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Iteam Name"
                    onChange={() => setIteamName(event.target.value)} value={iteamName} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" placholer="Enter description" onChange={(event) => setDescription(event.target.value)} value={description} />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Purchase Price</Form.Label>
                  <Form.Control type="Number" placeholder="Enter Purchase Price" value={purchsePrice} onChange={(event) => setPurchasePrice(event.target.value)} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridAddress1">
                  <Form.Label>Selling Price</Form.Label>
                  <Form.Control type="Number" placeholder="Enter Selling Price" value={sellingPrice} onChange={(event) => setSellingPrice(event.target.value)} />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control type="Number" placholder="Enter Quantity" onChange={(event) => setQuantity(event.target.value)} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Unit</Form.Label>
                  <Form.Select defaultValue="Choose Unit" value={unit}
                    onChange={(event) => setUnit(event.target.value)}>

                    <option>Choose Unit</option>
                    <option>piecs</option>
                    <option>Box</option>
                    <option>Kg</option>
                    <option>gm</option>
                    <option>ltr</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <div className='text-center'>
                <Button variant="primary"
                  type="submit"
                  className='w-50'
                  onClick={SubmitForm}
                >
                  Submit
                </Button>
              </div>
            </Form>
          </div>
          <div className='col-md-6'>
            <h3 className='border text-center'>Get Iteam</h3>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Iteam Name</th>
                  <th>Description</th>
                  <th>Purchase Price</th>
                  <th>Selling Price</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {iteamData && iteamData.map((each, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{each.name}</td>
                      <td>{each.description}</td>
                      <td>{each.purchasePrice}</td>
                      <td>{each.sellingPrice}</td>
                      <td>{each.quantity}</td>
                      <td>{each.unit}</td>
                      <td className='d-flex'>
                        <button className='btn btn-success'>Edit</button>
                        <button className='btn btn-danger mx-2'
                        
                         onClick={ () => OpenDeleteModal(each._id)}
                        >
                          Delete
                          </button>
                      </td>
                    </tr>
                  );
                })}

              </tbody>
            </Table>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete confimation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to delete this iteam</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ handleDelete}>
            Yes
          </Button>
          <Button variant="primary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default App
