

import React, { useEffect } from "react";
import './project.scss';
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import Web3 from 'web3';


const Orders = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const navigate = useNavigate();
  //  const { id } = useParams();
  //  console.log(currentUser._id);
    const { isLoading, error, data } = useQuery({
        queryKey: ['confirm'],
        queryFn: () =>
                newRequest.get(`/confirm/${currentUser._id}`)
                .then((res) => {
                    return res.data;
                })
    });
    const { isLoading1, error1, record } = useQuery({
        queryKey: ['confirm', currentUser._id],
        queryFn: () =>
                newRequest.get(`/confirm/record/${currentUser._id}`)
                .then((res) => {
                    return res.data;
                })
    });
    const sendTransaction = async (sender, receiver, amount) => {
        // const tx = {
        //     from: sender,
        //     to:'0x924ADF06D0663BEaa3EcAaFAC5D6D3105C9C2FbC',
        //     value: web3.utils.toWei(amount, 'ether'),
        //     gas: 21000,
        //     gasPrice: web3.utils.toWei('1', 'gwei')
        // };

        // try {
        //     const receipt = await web3.eth.sendTransaction(tx);
        //     console.log('Transaction successful: ', receipt);
        // } catch (error) {
        //     console.error('Transaction failed: ', error);
        // }
    };
  
    async function interactWithBlockchain(orderss) {
      //  const contractABI = process.env.contractABI;
      const contractABI =[
        {
            "inputs": [
                {
                    "internalType": "address payable",
                    "name": "_freelancer",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "_description",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_revisions",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_deployDate",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_deliveryDate",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_finePerDay",
                    "type": "uint256"
                }
            ],
            "stateMutability": "payable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "client",
            "outputs": [
                {
                    "internalType": "address payable",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "deliveryDate",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "deployDate",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "description",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_lateDays",
                    "type": "uint256"
                }
            ],
            "name": "distributeFine",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "finePerDay",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "freelancer",
            "outputs": [
                {
                    "internalType": "address payable",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getContractDetails",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "_client",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_freelancer",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_website",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_price",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_description",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_revisions",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_deployDate",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_deliveryDate",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_finePerDay",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "price",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "release",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "revisions",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_deliveryDate",
                    "type": "uint256"
                }
            ],
            "name": "setDeliveryDate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_deployDate",
                    "type": "uint256"
                }
            ],
            "name": "setDeployDate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_description",
                    "type": "string"
                }
            ],
            "name": "setDescription",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_finePerDay",
                    "type": "uint256"
                }
            ],
            "name": "setFinePerDay",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_price",
                    "type": "uint256"
                }
            ],
            "name": "setPrice",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_revisions",
                    "type": "uint256"
                }
            ],
            "name": "setRevisions",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "website",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        }
    ];
    
        const contractAddress = orderss; // Your contract address

            if (window.ethereum) {
               
                const web3 = new Web3(window.ethereum);
                
                window.ethereum.request({ method: 'eth_requestAccounts' })
                    .then(accounts => {
                        if (accounts.length === 0) {
                            console.error("No accounts found.");
                            return;
                        }
                     
                        const contract = new web3.eth.Contract(contractABI, contractAddress);
                        console.log("Contract initialized!");
    
                        // Assign the fetchDetails function to window to be called from outside
                       
                            console.log("Fetching contract details...");
    
                            contract.methods.getContractDetails().call({from: accounts[0]})
                                .then(details => {
                                    const detailString = `
                                        <strong>Client:</strong> ${details._client}<br>
                                        <strong>Freelancer:</strong> ${details._freelancer}<br>
                                        <strong>Website:</strong> ${details._website}<br>
                                      
                                    `;
                                    console.log(detailString);
    
                                    // Now call the release function
                                    console.log("Attempting to call release function...");
                                    return contract.methods.release().send({ from: accounts[0] });
                                })
                                .then(receipt => {
                                    console.log("Release function executed successfully:", receipt);
                                })
                                .catch(error => {
                                    console.error("Failed to execute release function:", error);
                                    console.log("Error data:", error.message);
                                    alert("please try again somting went wrong");
                                });
                        
                        
                    })
                    .catch(error => {
                        console.error("Error requesting accounts:", error);
                    });
            } else {
                console.error('MetaMask is not installed!');
            }
       
    
        return null; // No need to return anything for now
    };
    
    const handleContact = async (order) => {
     


       interactWithBlockchain(order.contract);

    };
    const handelrejection = async (order) => {
     
        await newRequest.get( `/proposel/data/${order._id}`);
       
       
 
     };
    
   

    return (
        <div className="orders">
            {isLoading ? "loading" : error ? `Error: ${error.message}` : <div className="container">
                <div className="title">
                    <h1>current project</h1>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>contract Address</th>
                            <th>status</th>
                            <th>deployDate</th>
                           
                            {
                                                !currentUser?.isSeller && (<>   <th>Link</th></>)
                                    
                                               }
                            <th>Worksubmit</th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 ? data.map((order) => (
                            <tr key={order._id}>
                               {
                                                currentUser?.isSeller && (<>  <td>{order.buyername}</td></>)
                                    
                                               }
                                                {
                                                !currentUser?.isSeller && (<>  <td>{order.Sellername}</td></>)
                                    
                                               }
                              
                                 <td>{order.contract}</td>

                                <td>{order.status}</td> 
                               
                                <td>{moment(order.createdAt).format('MMMM Do YYYY , h:mm:ss a')}</td>
                                {!currentUser?.isSeller && order.status === 'submitted' && (
                                            <td>{order.link}</td> 
                                        )}
                                      {!currentUser?.isSeller && order.status === 'submitted' && (
                                          <> <td>
                                          <button  onClick={() => handleContact(order)}>Accepted</button>  </td></>
                                        )}
                                         {!currentUser?.isSeller && order.status === 'submitted' && (
                                            <> <td>
                                            <button  onClick={() => handelrejection(order)}>Rejected</button>  </td></>
                                            
                                        )}
                                        
                                {
                                                currentUser?.isSeller && (<> <td>
                                                   <button onClick={e => navigate(`/upload/${order._id}`)}>Upload_project</button>   </td></>)
                                    
                                               }
                                
                            </tr>
                        )) : <tr><td colSpan="4">No orders found</td></tr>}
                    </tbody>
                </table>
            </div>}
        </div>
    );
}

export default Orders;
