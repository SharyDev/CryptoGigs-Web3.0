// import React from "react";
// import './Gig.scss';
// import { Slider } from "infinite-react-carousel";
// import { useQuery } from "@tanstack/react-query";
// import newRequest from "../../utils/newRequest";
// import { Link, useParams,useNavigate } from "react-router-dom";
// import Reviews from "../../components/reviews/Reviews";
// const Gig = () => {
//     const { id } = useParams();
//    // const { user } = useUser();
//     const navigate = useNavigate();
//     const currentUserString = localStorage.getItem("currentUser");
//     const currentUser = currentUserString ? JSON.parse(currentUserString) : null;
    
//     console.log(currentUser);// Fetch the current user from local storage
    

//     // console.log(id);
//     const { isLoading, error, data } = useQuery({
//         queryKey: ['gig'],
//         queryFn: () =>
//             newRequest.get(`/gigs/single/${id}`)
//                 .then((res) => {
//                     return res.data;
//                 })
//     });
//     const userId=data?.userId;
//     console.log(userId);
   
   
// ;    const { isLoading: isLoadingUser, error: errorUser, data: dataUser } = useQuery({
//         queryKey: ['user'],
//         queryFn: () =>
//             newRequest.get(`/users/${userId}`)
//                 .then((res) => {
//                     return res.data;    
//                 }),enabled:!!userId,
//     });

//     const contactSeller = async () => { 
//         const makePaymentIntent = async () => {
//         try {
           
//           const res = await newRequest.post(`/gig/${id}`);
//         // setClientSecret(res.data.clientSecret);
//           console.log("Payment intent created:", res.data);
//         } catch (err) {
//           console.error("Error creating payment intent:", err);
//         }
//       };
//       makePaymentIntent();
      
//        // console.log(currentUser?._id);
//         const sellerId =userId;
//         const buyerId = currentUser._id;  // Replace with current user's ID fetched from context or state
//         const conversationId = `${sellerId}${buyerId}`;

//         try {
//             const res = await newRequest.get(`/conversations/single/${conversationId}`);
           
//             navigate(`/message/${res.data.id}`);
//         } catch (error) {
//             if (error.response?.status === 404) {
//                 const res = await newRequest.post(`/conversations`, { to: sellerId });
//                 navigate(`/message/${res.data.id}`);
//             } else {
//                 console.error("Failed to handle the conversation:", error);
//             }
//         }
//     };
//     // console.log("------------>>>>>>>>>>");
//     //  console.log(dataUser);
//     //  console.log(data);
//     return ([
       
//         <div className="gig">
//             {isLoading ? <div className="loader"></div> : error ? <h4>Something Went Wrong</h4> :
//                 <div className="container">
//                     <div className="left">
//                         <span className="breadcrumbs">cryptagig  &gt; GRAPHICS & DESIGN &gt;</span>
//                         <h1>{data.title}</h1>
//                         {isLoadingUser ? "loading" : errorUser ? "something gone wrong" : 
//                         <div className="user">
//                             <img src={dataUser.img||"/images/noavtar.jpeg"} alt="" className="pp" />
//                             <span>{dataUser.username}</span>
//                             {!isNaN(data.totalStars / data.starNumber) &&
//                                 (<div className="stars">
//                                     {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item, i) =>
//                                         <img src="/images/star.png" alt="" key={i} />
//                                     )}
//                                     <span> {Math.round(data.totalStars / data.starNumber)} </span>
//                                 </div>)}
//                         </div>}
//                         <Slider slideToShow={1} arrowsScroll={1} className="slider">
//                             {data.images.map((img) => (
//                                 <img
//                                     key={img}
//                                     src={img}
//                                     alt=""
//                                 />
//                             ))}
//                         </Slider>
//                         <h2>About This gig </h2>
//                         <p>
//                             {data.desc}
//                         </p>
//                         {isLoadingUser?"Loading":errorUser?"something went wrong":
//                         <div className="seller">
//                             <h2>About The Seller</h2>
//                             {isLoading ? "loading" : error ? "Something Went Wrong" : <div className="user">
//                                 <img src={dataUser.img || "/images/noavtar.jpeg"} alt="" />
//                                 <div className="info">
//                                     <span>{dataUser.username}</span>
//                                     {!isNaN(data.totalStars / data.starNumber) &&
//                                         (<div className="stars">
//                                             {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item, i) =>
//                                                 <img src="/images/star.png" alt="" key={i} />
//                                             )}
//                                             <span> {Math.round(data.totalStars / data.starNumber)} </span>
//                                         </div>)}
//                                     <button onClick={contactSeller}>Contact Me</button>
//                                 </div>
//                             </div>}
//                             <div className="box">
//                                 <div className="items">
//                                     <div className="item">
//                                         <span className="title">From</span>
//                                         <span className="desc">{dataUser.country}</span>
//                                     </div>
//                                     <div className="item">
//                                         <span className="title">Member since</span>
//                                         <span className="desc">Aug 2022</span>
//                                     </div>
//                                     <div className="item">
//                                         <span className="title">Avg. response time</span>
//                                         <span className="desc">4 hours</span>
//                                     </div>
//                                     <div className="item">
//                                         <span className="title">Last delivery</span>
//                                         <span className="desc">1 day</span>
//                                     </div>
//                                     <div className="item">
//                                         <span className="title">Languages</span>
//                                         <span className="desc">English</span>
//                                     </div>
//                                 </div>
//                                 <hr />
//                                 <p>
//                                    {dataUser.desc}
//                                 </p>
//                             </div>
//                         </div>}
//                        <Reviews gigId={id} key={id}></Reviews>
//                     </div>
//                     <div className="right">
//                         <div className="price">
//                             <h3>{data.sortTitle}</h3>
//                             <h2>${data.price}</h2>
//                         </div>
//                         <p>{data.sortDesc}</p>
//                         <div className="details">
//                             <div className="item">
//                                 <img src="/images/clock.png" alt="" />
//                                 <span>{data.deliveryTime} days Delivery</span>
//                             </div>
//                             <div className="item">
//                                 <img src="/images/recycle.png" alt="" />
//                                 <span>{data.rivisonNumber} Revisoins</span>
//                             </div>
//                         </div>
//                         <div className="features">
//                             {data.features.map((feature) =>

//                                 <div className="item" key={feature}>
//                                     <img src="/images/greencheck.png" alt="" />
//                                     <span>{feature} </span>
//                                 </div>)}
//                         </div>
//                         <Link to={`/pay/${id}`}>
//                         <button >Continue</button>
//                         </Link>
//                     </div>
//                 </div>}
//         </div>
//     ]);
// }
// export default Gig;

import React from "react";
import './Gig.scss';
import { Slider } from "infinite-react-carousel";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { Link, useParams,useNavigate } from "react-router-dom";
import Reviews from "../../components/reviews/Reviews";
const Gig = () => {
    const { id } = useParams();
   // const { user } = useUser();
    const navigate = useNavigate();
    const currentUserString = localStorage.getItem("currentUser");
    const currentUser = currentUserString ? JSON.parse(currentUserString) : null;
    
    console.log(currentUser);// Fetch the current user from local storage
    

    // console.log(id);
    const { isLoading, error, data } = useQuery({
        queryKey: ['gig'],
        queryFn: () =>
            newRequest.get(`/gigs/single/${id}`)
                .then((res) => {
                    return res.data;
                })
    });
    const userId=data?.userId;
    console.log(userId);
   
   
;    const { isLoading: isLoadingUser, error: errorUser, data: dataUser } = useQuery({
        queryKey: ['user'],
        queryFn: () =>
            newRequest.get(`/users/${userId}`)
                .then((res) => {
                    return res.data;    
                }),enabled:!!userId,
    });

    const contactSeller = async () => { 
        const makePaymentIntent = async () => {
        try {
           const che=id+"-"+currentUser._id;
          const res = await newRequest.post(`/Firstmessage/${che}`);
        // setClientSecret(res.data.clientSecret);
          console.log("Payment intent created:", res.data);
        } catch (err) {
          console.error("Error creating payment intent:", err);
        }
      };
      makePaymentIntent();
      
       // console.log(currentUser?._id);
        const sellerId =userId;
        const buyerId = currentUser._id;  // Replace with current user's ID fetched from context or state
        const conversationId = `${sellerId}${buyerId}`;

        try {
            const res = await newRequest.get(`/conversations/single/${conversationId}`);
           
            navigate(`/message/${res.data.id}`);
        } catch (error) {
            if (error.response?.status === 404) {
                const res = await newRequest.post(`/conversations`, { to: sellerId });
                navigate(`/message/${res.data.id}`);
            } else {
                console.error("Failed to handle the conversation:", error);
            }
        }
    };
    // console.log("------------>>>>>>>>>>");
    //  console.log(dataUser);
    //  console.log(data);
    return ([
       
        <div className="gig">
            {isLoading ? <div className="loader"></div> : error ? <h4>Something Went Wrong</h4> :
                <div className="container">
                    <div className="left">
                        <span className="breadcrumbs">cryptagig  &gt; GRAPHICS & DESIGN &gt;</span>
                        <h1>{data.title}</h1>
                        {isLoadingUser ? "loading" : errorUser ? "something gone wrong" : 
                        <div className="user">
                            <img src={dataUser.img||"/images/noavtar.jpeg"} alt="" className="pp" />
                            <span>{dataUser.username}</span>
                            {!isNaN(data.totalStars / data.starNumber) &&
                                (<div className="stars">
                                    {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item, i) =>
                                        <img src="/images/star.png" alt="" key={i} />
                                    )}
                                    <span> {Math.round(data.totalStars / data.starNumber)} </span>
                                </div>)}
                        </div>}
                        <Slider slideToShow={1} arrowsScroll={1} className="slider">
                            {data.images.map((img) => (
                                <img
                                    key={img}
                                    src={img}
                                    alt=""
                                />
                            ))}
                        </Slider>
                        <h2>About This gig </h2>
                        <p>
                            {data.desc}
                        </p>
                        {isLoadingUser?"Loading":errorUser?"something went wrong":
                        <div className="seller">
                            <h2>About The Seller</h2>
                            {isLoading ? "loading" : error ? "Something Went Wrong" : <div className="user">
                                <img src={dataUser.img || "/images/noavtar.jpeg"} alt="" />
                                <div className="info">
                                    <span>{dataUser.username}</span>
                                    {!isNaN(data.totalStars / data.starNumber) &&
                                        (<div className="stars">
                                            {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item, i) =>
                                                <img src="/images/star.png" alt="" key={i} />
                                            )}
                                            <span> {Math.round(data.totalStars / data.starNumber)} </span>
                                        </div>)}
                                    <button onClick={contactSeller}>Contact Me</button>
                                </div>
                            </div>}
                            <div className="box">
                                <div className="items">
                                    <div className="item">
                                        <span className="title">From</span>
                                        <span className="desc">{dataUser.country}</span>
                                    </div>
                                    <div className="item">
                                        <span className="title">Member since</span>
                                        <span className="desc">Aug 2022</span>
                                    </div>
                                    <div className="item">
                                        <span className="title">Avg. response time</span>
                                        <span className="desc">4 hours</span>
                                    </div>
                                    <div className="item">
                                        <span className="title">Last delivery</span>
                                        <span className="desc">1 day</span>
                                    </div>
                                    <div className="item">
                                        <span className="title">Languages</span>
                                        <span className="desc">English</span>
                                    </div>
                                </div>
                                <hr />
                                <p>
                                   {dataUser.desc}
                                </p>
                            </div>
                        </div>}
                       <Reviews gigId={id} key={id}></Reviews>
                    </div>
                    <div className="right">
                        <div className="price">
                            <h3>{data.sortTitle}</h3>
                            <h2>${data.price}</h2>
                        </div>
                        <p>{data.sortDesc}</p>
                        <div className="details">
                            <div className="item">
                                <img src="/images/clock.png" alt="" />
                                <span>{data.deliveryTime} days Delivery</span>
                            </div>
                            <div className="item">
                                <img src="/images/recycle.png" alt="" />
                                <span>{data.rivisonNumber} Revisoins</span>
                            </div>
                        </div>
                        <div className="features">
                            {data.features.map((feature) =>

                                <div className="item" key={feature}>
                                    <img src="/images/greencheck.png" alt="" />
                                    <span>{feature} </span>
                                </div>)}
                        </div>
                       
                    </div>
                </div>}
        </div>
    ]);
}
export default Gig;