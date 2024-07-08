// import React, { useState } from "react";
// import './resgister.scss';
// import upload from "../../utils/upload";
// import newRequest from "../../utils/newRequest";
// import { useNavigate } from "react-router-dom";
// const Register = () => {
//   const [file, setFile] = useState(null);
//   const [user, setUser] = useState({
//     username: "",
//     email: "",
//     passwors: "",
//     img: "",
//     country: "",
//     isSeller: false,
//     desc: "",
//     wollat_addres:"",

//   })

//   const navigate = useNavigate();

//   const handlechange = (e) => {
//     setUser(prev => {
//       return { ...prev, [e.target.name]: e.target.value };
//     })
//   }

//   const handleSeller = (e) => {
//     setUser(prev => {
//       return { ...prev, isSeller: e.target.checked };
//     })
//   }
//   const handleSubmit = async (e) => {
//     console.log("its doing ");
//     e.preventDefault();
//     const url = await upload(file);
//     try {
//       await newRequest.post('/auth/register', {
//         ...user,
//         img: url
//       });
//       navigate('/')
//     } catch (error) {
//       console.log(error);
//     }
//   }


//   return ([
//     <div className="register">
//       <form onSubmit={handleSubmit} >
//         <div className="left">
//           <h1>Create a new account</h1>
//           <label htmlFor="">Username</label>
//           <input
//             name="username"
//             type="text"
//             placeholder="johndoe"
//             onChange={handlechange}
//           />
//           <label htmlFor="">Email</label>
//           <input
//             name="email"
//             type="email"
//             placeholder="email"
//             onChange={handlechange}
//           />
//           <label htmlFor="">Password</label>
//           <input
//             name="password"
//             type="password"
//             onChange={handlechange}
//           />
//           <label htmlFor="">Profile Picture</label>
//           <input
//             type="file"
//             onChange={e => {
//               setFile(e.target.files[0]);
//             }}
//           />
//           <label htmlFor="">Country</label>
//           <input
//             name="country"
//             type="text"
//             placeholder="Usa"
//             onChange={handlechange}
//           />
//           <button type="submit">Register</button>
//         </div>
//         <div className="right">
//           <h1>I want to become a seller</h1>
//           <div className="toggle">
//             <label htmlFor="">Activate the seller account</label>
//             <label className="switch">
//               <input type="checkbox"
//                 onChange={handleSeller} />
//               <span className="slider round"></span>
//             </label>
//           </div>
//           <label htmlFor="">Phone Number</label>
//           <input
//             name="phone"
//             type="text"
//             placeholder="+1 234 567 89"
//             onChange={handlechange}
//           />
//           <label htmlFor="">Description</label>
//           <textarea
//             placeholder="A short description of yourself"
//             name="desc"
//             id=""
//             cols="30"
//             rows="10"
//             onChange={handlechange}
//           ></textarea>
//         </div>
//       </form>
//     </div>
//   ]);
// }
// export default Register;




import React, { useState } from "react";
// Example using ethers.js
//import { Web3Provider } from '@ethersproject/providers';
import './resgister.scss';
import upload from "../../utils/upload";
import {ethers} from 'ethers';
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "", // Corrected typo
    img: "",
    country: "",
    isSeller: false,
    desc: "",
    wallet_address:"", // Corrected typo and naming convention
  });

  const navigate = useNavigate();
  async function getWalletAddress() {
    if (window.ethereum) {
        try {
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            return address;
        } catch (error) {
            console.error('Error accessing wallet:', error);
            throw error; // Re-throw to handle it in the calling function
        }
    } else {
        console.log('MetaMask is not installed!');
        throw new Error('MetaMask is not installed!');
    }
}


  const handlechange = (e) => {
    setUser(prev => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser(prev => {
      return { ...prev, isSeller: e.target.checked };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submission in progress");
    
    try {
        const address = await getWalletAddress(); // Get wallet address
        console.log(address);
        
        // Update user state or directly prepare the payload for registration
        const userData = {
            ...user, // Your existing user data
            img: await upload(file), // Assuming `upload` function returns the URL
            wallet_address: address, // Add wallet address to the user data
            
    
        };
        
        // Submit the form with the wallet address
        await newRequest.post('/auth/register', userData);

        // Navigate on success or show success message
        navigate('/');
    } catch (error) {
        console.error('Error during registration:', error);
        // Handle errors, such as showing a user-friendly message
    }
};


  return (
    <div className="register">
      
      <form onSubmit={handleSubmit} >
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="johndoe"
            onChange={handlechange}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handlechange}
          />
          <label htmlFor="">Password</label>
          <input
            name="password"
            type="password"
            onChange={handlechange}
          />
          <label htmlFor="">Profile Picture</label>
          <input
            type="file"
            onChange={e => {
              setFile(e.target.files[0]);
            }}
          />
          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            placeholder="Usa"
            onChange={handlechange}
          />
          <button type="submit">Register</button>
        </div>
        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox"
                onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 234 567 89"
            onChange={handlechange}
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handlechange}
          ></textarea>
        </div>
        </form>
     
    </div>
  );
};

export default Register;
