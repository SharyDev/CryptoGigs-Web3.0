// import { useLocation, useNavigate } from 'react-router-dom';
// import './success.scss'
// import { useEffect } from 'react';
// import newRequest from '../../utils/newRequest';
// const Success = () => {
//     const { search } = useLocation();
//     const navigate = useNavigate();
//     const params = new URLSearchParams(search);
//     const payment_intent = params.get('payment_intent');
//     useEffect(() => {
//         const makeRequest = async () => {
//             try {
//                 console.log("payment_intent------------>");
//                 console.log(payment_intent);
//                 await newRequest.put('/Orders', { payment_intent });
//                 setTimeout(() => {
//                     navigate("Orders");
//                 }, 5000);
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         makeRequest();
//     }, []);
//     return (
//        [  <div className="cm">
//       <img src="images/successfully-done.gif" alt="" />
//        </div>,
//        <div className='success'>
//             payment successfulYou are being redirected to the order page.<br></br>
//         </div>,
//          <span className='close'>please do not close page</span>]
//     );
// }
// export default Success;
// import React, { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import newRequest from '../../utils/newRequest';
// import './success.scss';

// const Success = () => {
//   const { search } = useLocation();
//   const navigate = useNavigate();
//   const params = new URLSearchParams(search);
//   const paymentIntent = params.get('payment_intent');

//   useEffect(() => {
//     const makeRequest = async () => {
//       try {
//         if (!paymentIntent) {
//           throw new Error('Payment intent not found');
//         }

//         // This assumes your endpoint is correctly set up to receive POST requests
//         const response = await newRequest.post('/order/intent', {
//           ethTransactionId: paymentIntent,
//           id: "6626a89578e22eaaec83fb5d" // Make sure to pass the correct gig ID
//         });
//         const data = await response.json();

//         // Navigate to the order details page with the newly created order ID
//         navigate(`/Orders/${data.order._id}`);
//       } catch (error) {
//         console.error('Error creating order:', error);
//       }
//     }

//     makeRequest();
//   }, [navigate, paymentIntent]);

//   return (
//     <>
//       <div className="cm">
//         <img src="images/successfully-done.gif" alt="Transaction Completed Successfully" />
//       </div>
//       <div className='success'>
//         Payment successful! You are being redirected to your order.<br></br>
//       </div>
//       <span className='close'>Please do not close this page.</span>
//     </>
//   );
// }

// export default Success;


import React, { useReducer, useState } from "react";
import './upload.scss';
import { INITIAL_STATE, gigReducer } from "../../reducers/gigReducers";
import upload from '../../utils/upload.js';
import { useQueryClient,useMutation } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Web3 from 'web3';
const Success = () => {
    // const [singleFile, setsingleFile] = useState(undefined);
    // const [files, setFiles] = useState([]);
    // const [uploading, setUploading] = useState(false);
    const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);
    const { id } = useParams();
    const [userlink, setUserlink] = useState("")


    const handlechange = (event) => {
       
        if (event.target.name === 'title') {
            setUserlink(event.target.value);
          }
    }
    // const handlefeature = (e) => {
    //     e.preventDefault();
    //     dispatch({
    //         type: "ADD_FEATURE", payload: e.target[0].value,
    //     });
    //     e.target.value = ''
    // }
    // const handleupload = async () => {
    //     setUploading(true);
    //     try {
    //         const cover = await upload(singleFile);

    //         const images = await Promise.all(
    //             [...files].map(async file => {
    //                 const url = await upload(file);
    //                 return url;
    //             })
    //         );
    //         setUploading(false);
    //         dispatch({
    //             type: "ADD_IMAGES", payload: {
    //                 cover, images
    //             }
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    const queryClient = useQueryClient()
  
  const mutation = useMutation({
    
    mutationFn:async ( proposal) => {
        console.log(userlink);
      return await newRequest.get(`/proposel`,userlink);
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(["myProposals"])
    }
  });



  const navigate = useNavigate();
    const handlesubmit=async(e)=>{
       e.preventDefault();
        // make sure this is inside a component or hook

       try {
       
           const res = await newRequest.post('/proposel', { userlink, id });
           
           console.log("Response data:", res.data);
           localStorage.setItem('currentUser', JSON.stringify(res.data));
        
           navigate('/project');
       } catch (error) {
        console.error('Failed to submit proposal:', error);
        console.error(error.response ? error.response.data : error.message);
           // Handle errors, maybe set an error message in your state
       }
        
    }
    return ([
        <div className="add">
            <div className="container">
                <h1>Add New Gig</h1>
                <div className="sections">
                    <div className="left">
                        <label htmlFor="">Link of Project</label>
                        <input type="text"
                            name="title"
                            id=""
                            placeholder="e.g. I will do something I'm really good at"
                            onChange={handlechange}
                        />
                     
                       
                        <label htmlFor="">Description</label>
                        <textarea
                            name="desc"
                            id=""
                            cols="30"
                            rows="16"
                            placeholder="A brief description to introduce your service to cusmoters"
                            onChange={handlechange}
                        ></textarea>
                        <button onClick={handlesubmit}>Create</button>
                    </div>
                 
                </div>
            </div>
        </div>
    ]);
}
export default Success;