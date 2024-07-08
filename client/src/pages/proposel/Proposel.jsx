

import React from "react";
import './proposel.scss';
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import moment from 'moment';

const Orders = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const navigate = useNavigate();
  //  const { id } = useParams();
    
    const { isLoading, error, data } = useQuery({
        queryKey: ['proposels'],
        queryFn: () =>
                newRequest.get(`/proposel/${currentUser._id}`)
                .then((res) => {
                    return res.data;
                })
    });
  

    const handleContact = async (order) => {

      
        const sellerId = order.sellerId;
        const buyerId = order.buyerId;
        const id = sellerId + buyerId;
        try {
           // const res = await newRequest.get(`/conversations/single/${id}`);
            navigate(`/confirm`);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                const res = await newRequest.post(`/conversations`, { to: currentUser.isSeller ? buyerId : sellerId });
                navigate(`/message/${res.data.id}`);
            }
        }
    };

    return (
        <div className="orders">
            {isLoading ? "loading" : error ? `Error: ${error.message}` : <div className="container">
                <div className="title">
                    <h1>Orders</h1>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 ? data.map((order) => (
                            <tr key={order._id}>
                               
                                <td>{order.Sellername}</td>
                                <td>{order.title}</td>
                                <td>{order.desc}</td>
                                <td>{moment(order.createdAt).format('MMMM Do YYYY , h:mm:ss a')}</td>
                                <td>
                                <button onClick={e => navigate(`/confirm`)}>confirm</button> </td>
                            </tr>
                        )) : <tr><td colSpan="4">No orders found</td></tr>}
                    </tbody>
                </table>
            </div>}
        </div>
    );
}

export default Orders;
