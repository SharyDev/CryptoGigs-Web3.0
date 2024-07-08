// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import React from "react";
// import { Link } from "react-router-dom";
// import newRequest from "../../utils/newRequest";
// import "./messages.scss";
// import moment from "moment";

// const Messages = () => {
//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));

//   const queryClient = useQueryClient();

//   const { isLoading, error, data } = useQuery({
//     queryKey: ["conversations"],
//     queryFn: () =>
//       newRequest.get(`/conversations`).then((res) => {
//         return res.data;
//       }),
//   });

//   const mutation = useMutation({
//     mutationFn: (id) => {
//       return newRequest.put(`/conversations/${id}`);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["conversations"]);
//     },
//   });

//   const handleRead = (id) => {
//     mutation.mutate(id);
//   };

//   return (
//     <div className="messages">
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p>Error: {error.message}</p>
//       ) : (
//         <div className="container">
//           <div className="title">
//             <h1>Messages</h1>
//           </div>
//           <table>
//             <thead>
//               <tr>
//                 <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
//                 <th>Last Message</th>
//                 <th>Date</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data && data.length > 0 ? (
//                 data.map((c) => (
//                   <tr
//                     className={
//                       ((currentUser.isSeller && !c.readBySeller) ||
//                         (!currentUser.isSeller && !c.readByBuyer)) ? "active" : ""
//                     }
//                     key={c.id}
//                   >
//                     <td>{currentUser.isSeller ? c.buyerId : c.sellerId}</td>
//                     <td>
//                       <Link to={`/message/${c.id}`} className="link">
//                         {c?.lastMessage?.substring(0, 100)}...
//                       </Link>
//                     </td>
//                     <td>{moment(c.updatedAt).fromNow()}</td>
//                     <td>
//                       {((currentUser.isSeller && !c.readBySeller) ||
//                         (!currentUser.isSeller && !c.readByBuyer)) && (
//                         <button onClick={() => handleRead(c.id)}>
//                           Mark as Read
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="4">No messages found</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Messages;




import React from "react";
import "./messages.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";



const Orders = () => {
 
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const navigate = useNavigate();

    const { isLoading, error, data } = useQuery({
        queryKey: ['firstmessage'],
        queryFn: () =>
            newRequest.get(`/Firstmessage`, { params: { role: currentUser.isSeller ? 'seller' : 'buyer' } })
                .then((res) => {
                    return res.data;
                })
    });
 // console.log(data);
    const handleContact = async (order) => {
       
        const sellerId = order.sellerId;
        const buyerId = order.buyerId;
        const id = sellerId + buyerId;
        try {
           
            const res = await newRequest.get(`/conversations/single/${id}`);
            navigate(`/message/${res.data.id}`);
           
        } catch (error) {
            if (error.response && error.response.status === 404) {
                const res = await newRequest.post(`/conversations`, { to: currentUser.isSeller ? buyerId : sellerId });
                navigate(`/message/${res.data.id}`);
            }
        }
    };
    const handelcontract = async (order) => {
       
        const sellerId = order.sellerId;
        const buyerId = order.buyerId;
        const id = sellerId +"-"+buyerId;
        try {
           
            // const res = await newRequest.get(`/conversations/single/${id}`);
            navigate(`/success/${id}`);
           
        } catch (error) {
            if (error.response && error.response.status === 404) {
               //const res = await newRequest.post(`/conversations`, { to: currentUser.isSeller ? buyerId : sellerId });
                navigate(`/success`);
            }
        }
    };

    return (
        <div className="orders">
            {isLoading ? "loading" : error ? `Error: ${error.message}` : <div className="container">
                <div className="title">
                    <h1>Messages</h1>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>UserNmae</th>
                            <th>User Email </th>
                            {
                                                currentUser?.isSeller && (<th>Create purposel</th>)
                                    
                                               }
                            
                            <th>Message</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 ? data.map((order) => (
                            <tr key={order._id}>
                               
                                
                                <td>{order.username}</td>
                                <td>{order.email}</td>
                                {
                                                currentUser?.isSeller && (<td>
                                                   
                                                    <button  onClick={() => handelcontract(order)}>Create Puposel</button> 
                                                </td>)
                                    
                                               }
                                
                                

                                <td>
                                    <img className="message" src="/images/message.png" alt="" onClick={() => handleContact(order)} />
                                </td>
                            </tr>
                        )) : <tr><td colSpan="4">No orders found</td></tr>}
                    </tbody>
                </table>
            </div>}
        </div>
    //     <div className="messages">
    //     <h1>Messages</h1>
    //     {messages && messages.length > 0 ? (
    //         <table>
    //             <thead>
    //                 <tr>
    //                     <th>Username</th>
    //                     <th>Action</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {messages.map(message => (
    //                     <tr key={message._id}>
    //                         <td>{message.username}</td>
    //                         <td>
    //                                 <img className="message" src="/images/message.png" alt="" onClick={() => handleContact(message._id)} />
    //                             </td>
    //                         <td>
                                
    //                         </td>
    //                     </tr>
    //                 ))}
    //             </tbody>
    //         </table>
    //     ) : <p>No messages found</p>}
    // </div>
    );
}

export default Orders;

