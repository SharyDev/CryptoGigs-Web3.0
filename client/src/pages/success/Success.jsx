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
import './success.scss';
import { INITIAL_STATE, gigReducer } from "../../reducers/gigReducers";
import upload from '../../utils/upload.js';
import { useQueryClient,useMutation } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const Success = () => {
    const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);
    const { id } = useParams(); 

    const handlechange = (e) => {
       
        dispatch({
            type: "CHANGE_INPUT", payload: {
                name: e.target.name, value: e.target.value
            }
        })
    }
    const handlefeature = (e) => {
        e.preventDefault();
        dispatch({
            type: "ADD_FEATURE", payload: e.target[0].value,
        });
        e.target.value = ''
    }

    const navigate=useNavigate();
    const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationFn: (proposal) => {
      return newRequest.post(`/proposel/${id}`, proposal);
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(["myProposals"])
    }
  });
 
    const handlesubmit=(e)=>{
        e.preventDefault();
        // if (!state.title || !state.cat || !state.desc || !state.sortTitle || !state.deliveryTime || !state.rivisonNumbers || !state.features || !state.price) {
        //     // If any field is empty, show an alert
        //     alert("Please fill in all fields before submitting.");
        //     return; // Stop the submission process
        // }
        mutation.mutate(state);
        navigate(`/project`);
        
    }
    return ([
        <div className="add">
            <div className="container">
                <h1>Add New Gig</h1>
                <div className="sections">
                    <div className="left">
                        <label htmlFor="">Title</label>
                        <input type="text"
                            name="title"
                            id=""
                            placeholder="e.g. I will do something I'm really good at"
                            onChange={handlechange}
                        />
                        <select name="cat" id="cat" onChange={handlechange}>
                            <option value="Design">Design</option>
                            <option value="Web developer">Web Developer</option>
                            <option value="Animation">Animation</option>
                            <option value="Music">Music</option>
                        </select>
                       
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
                    <div className="right">
                        <label htmlFor="">Service Title</label>
                        <input
                            type="text"
                            placeholder="e.g. One-page web design"
                            name="sortTitle"
                        />
                
                        <label htmlFor="">Delivery Time (e.g. 3 days)</label>
                        <input 
                        type="number" 
                        name="deliveryTime" 
                        min={2} 
                        onChange={handlechange} 
                        />
                        <label htmlFor="">Revision Number</label>
                        <input 
                        type="number" 
                        name="rivisonNumbers" 
                        min={2} 
                        onChange={handlechange} 
                        />
                        <label htmlFor="">Add Features</label>
                        <form action="" className="add" onSubmit={handlefeature}>
                            <input 
                            type="text" 
                            placeholder="e.g. page design" 
                            />
                            <button type="submit">add </button>
                        </form>
                        <div className="addedFeatures">
                            {state?.features?.map(f => (
                                <div className="item" key={f}>
                                    <button onClick={() => dispatch(
                                        {
                                            type: "REMOVE_FEATURE", payload: f
                                        })
                                    }>{f}
                                        <span>X</span>
                                    </button>
                                </div>))}
                        </div>
                        <label htmlFor="">Price</label>
                        <input 
                        type="number" 
                        onChange={handlechange}
                         name="price" />
                    </div>
                </div>
            </div>
        </div>
    ]);
}
export default Success;