// This component displays all reviews made within the past week in order from newest to oldest. 
    // Functionality:
        // * Upon loading, the client will fetch the reviews data from the backend server. 
        // * A button is included which, when clicked, manually refreshes the reviews data available from the Apple Store RSS feed. 
    // Notes: 
        // There are two states being managed - reviews and recentReviews. 
            // recentReviews stores all reviews made within the past week. 
            // reviews stores all reviews. 
                // If desired, further extensions of functionality could include a toggle option to show different categories of reviews, including all reviews. 
    

import { useEffect, useState } from "react";
import { ManualButton, MappedReviews } from ".";

const RecentReviews = (props) => {
    const [reviews, setReviews] = useState([]);
    const [recentReviews, setRecentReviews] = useState([]); 

    useEffect(() => {
        async function fetchReviews() {
            try {
                const url = "http://localhost:3000/api/reviews";
                const response = await fetch(url); 
                const data = await response.json();
                if (data && data.length) {
                    setReviews(data)
                    const currentTime = new Date();                     
                    const filteredReviews = data.filter((review) => {
                        const convertedDate = new Date(review.updated.label);
                        const differenceInHours = (currentTime - convertedDate) / (1000 * 60 * 60);
                        return differenceInHours <= 168; 
                    });

                    filteredReviews.sort((a, b) => {
                        const dateA = new Date(a.updated.label);
                        const dateB = new Date(b.updated.label);
                        return dateB - dateA; 
                    });

                    setRecentReviews(filteredReviews);
                };
            } catch (e) {
                console.error(e); 
            };
        };
        fetchReviews(); 
    }, []);

    return (
        <>
            <h3>AllTrails' Reviews from the past week:</h3>
            <ManualButton setReviews={setReviews} setRecentReviews={setRecentReviews} />
            {
                recentReviews.length ? (
                    <>
                        <MappedReviews recentReviews={recentReviews}/>
                    </>
                ) : "No reviews available at the moment."
            }
        </>
    )
};

export default RecentReviews; 