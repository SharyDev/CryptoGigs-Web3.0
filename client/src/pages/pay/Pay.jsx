// // import React, { useEffect, useState } from "react";
// import React from "react";
// import "./pay.scss";
// import {ethers} from 'ethers';

// // imp//import { Elements } from "@stripe/react-stripe-js";
// // import newRequest from "../../utils/newRequest";
// // import { useParams } from "react-router-dom";
 //import CheckoutForm from "../../components/checkOutForm/CheckOutForm";

// import { Slider } from "infinite-react-carousel";
// import { useQuery } from "@tanstack/react-query";
// import newRequest from "../../utils/newRequest";
// import { Link, useParams } from "react-router-dom";
// import Reviews from "../../components/reviews/Reviews";


// const Pay = () => {

//   const { id } = useParams();
//   // console.log(id);
//   const { data } = useQuery({
//       queryKey: ['gig'],
//       queryFn: () =>
//           newRequest.get(`/gigs/single/${id}`)
//               .then((res) => {
//                   return res.data;
//               })
//   });
//   const userId=data?.userId;
//   const {  data: dataUser } = useQuery({
//       queryKey: ['user'],
//       queryFn: () =>
//           newRequest.get(`/users/${userId}`)
//               .then((res) => {
//                   return res.data;    
//               }),enabled:!!userId,
//   });
//   console.log("------------>>>>>>>>>>-------");
   
//    console.log("User's Wallet Address:", dataUser?.username);
//    console.log("User's Wallet Address:", dataUser?.wallet_address);

// console.log("Gig's Title:", data?.price);

// const requestAccounts = async () => {
//   try {
   
//     const accounts = await window.ethereum.request({
//       method: 'eth_requestAccounts'
//     });
//     console.log(accounts); // Do something with the accounts

//     // If you're sending a transaction, ensure this is in response to a user action
    
//     const transactionParameters = {
//       from: accounts,
//       to: dataUser?.wallet_address,
//       gas: "0x76c0", // 30400
//       gasPrice: "0x9184e72a000", // 10000000000000
//       value: data?.price, // 2441406250
//       data: "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
//     };

//     const txHash = await window.ethereum.request({
//       method: 'eth_sendTransaction',
//       params: [transactionParameters],
//     });
//     console.log(txHash); // Use the transaction hash as needed
   
//   } catch (error) {
//     console.error(error);
//   }
// };

// requestAccounts();
//   return <div className="pay">
//     {/* {clientSecret && (
//         <Elements options={options} stripe={stripePromise}>
//           <CheckoutForm />
//         </Elements>
//       )} */}
 
  
    
      
//   </div>;
// };

// export default Pay;



// import React, { useEffect } from "react";
// import "./pay.scss";
// import { useQuery } from "@tanstack/react-query";
// import newRequest from "../../utils/newRequest";
// import { useParams } from "react-router-dom";
// import Reviews from "../../components/reviews/Reviews";
// import {ethers} from 'ethers';

// const Pay = () => {
//   const { id } = useParams();

//   c

// //   const userId = gigData?.userId;



//   useEffect(() => {
   

//     // Call requestAccounts if both gigData and userData are loaded
//     if (gigData && userData) {
//       requestAccounts();
//     }
//   }, [gigData, userData]); // useEffect will run when gigData and userData change

//   return (
//     <div className="pay">
//       {/* UI elements */}
//              <Reviews gigId={id} key={id}></Reviews>
//     </div>
//   );
// };

// export default Pay;
// import React, { useEffect,useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { ethers } from 'ethers'
// import newRequest from "../../utils/newRequest";
// import CheckoutForm from "../../components/checkOutForm/CheckOutForm";
// import Reviews from "../../components/reviews/Reviews";
// import "./pay.scss";
// import axios from 'axios';

// const Pay = () => {
//   const [clientSecret, setClientSecret] = useState("");

//   const { id } = useParams();
//   const { data: gigData } = useQuery({
//     queryKey: ['gig'],
//     queryFn: () => newRequest.get(`/gigs/single/${id}`).then(res => res.data)
// });
//   const userId = gigData?.userId;
//   const { data: userData } = useQuery({
//     queryKey: ['user'],
//     queryFn: () => newRequest.get(`/users/${userId}`).then(res => res.data),    
//     enabled: !!userId,
// });

//   useEffect(() => {
//     const requestAccounts = async () => {
//       if (!window.ethereum) {
//         console.error("Ethereum object not found. You need to install MetaMask or another Ethereum wallet.");
//         return;
//       }

//       try {
//         const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//         console.log("Connected accounts:", accounts);

//         // Define the transaction parameters
//         const transactionParameters = {
//           from: accounts[0], // Use the first account
//           to: userData?.wallet_address,
//           gas: "0x5208", // Set to 21000, which is the basic transaction cost
//           gasPrice: "0x3B9ACA00", // Adjusted to a lower typical value, e.g., 1 Gwei
//           value: ethers.utils.parseUnits(gigData?.price.toString() || "0", "ether").toHexString(),
        
//         };

//         // Send the transaction
//         const txHash = await window.ethereum.request({
//           method: 'eth_sendTransaction',
//           params: [transactionParameters],
//         });
//         console.log("Transaction hash:", txHash);

//       } catch (error) {
//         console.error("Error requesting accounts or sending transaction:", error);
//       }
//     };
//   }, [gigData, userData]);
   
   
//     const makeRequest = async () => {
//       if (!clientSecret && id) {  // Only run if clientSecret is not already set and id is present
//         try {
//           const res = await newRequest.post(
//             `/orders/create-payment-intent/${id}`
//           );
//           setClientSecret(res.data.clientSecret);
//         } catch (err) {
//           console.log(err);
//         }
//     };
//     makeRequest();
//   },[id]);



//   return (
//     <div className="pay">
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ethers } from 'ethers';
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";
import "./pay.scss";
import Orders from "../orders/Orders";

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");
  const hasExecuted = useRef(false);
  const { id } = useParams();

  const { data: gigData, isSuccess: gigDataLoaded } = useQuery({
    queryKey: ['gig'],
    queryFn: () => newRequest.get(`/gigs/single/${id}`).then(res => res.data)
  });

  const { data: userData, isSuccess: userDataLoaded } = useQuery({
    queryKey: ['user'],
    queryFn: () => newRequest.get(`/users/${gigData?.userId}`).then(res => res.data),    
    enabled: !!gigData?.userId,
  });

  useEffect(() => {
    const initiateTransaction = async () => {
      if (!window.ethereum) {
        console.error("Ethereum object not found. You need to install MetaMask.");
        return;
      }

      if (!hasExecuted.current && gigDataLoaded && userDataLoaded) {
        hasExecuted.current = true;
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          console.log("Connected accounts:", accounts);

          const transactionParameters = {
            from: accounts[0],
            to: userData?.wallet_address,
            gas: "0x5208",
            gasPrice: "0x3B9ACA00",
            value: ethers.utils.parseUnits(gigData?.price.toString() || "0", "ether").toHexString(),
          };

          const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
          });
          console.log("Transaction hash:", txHash);

          // Proceed to make payment intent after successful transaction
          makePaymentIntent();
        } catch (error) {
          console.error("Error in transaction:", error);
        }
      }
    };

    const makePaymentIntent = async () => {
      try {
        const res = await newRequest.post(`/orders/create-payment-intent/${id}`);
        setClientSecret(res.data.clientSecret);
        console.log("Payment intent created:", res.data);
      } catch (err) {
        console.error("Error creating payment intent:", err);
      }
    };

    initiateTransaction();
  }, [gigDataLoaded, userDataLoaded, gigData, userData, id]);

  return (
    <div className="pay">
      <Orders  key={id} />
    </div>
  );
};

export default Pay;

//       <Reviews gigId={id} key={id} />
//     </div>
//   );
// };

// export default Pay;

