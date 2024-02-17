import { useEffect, useState } from "react";
import { MappedReviews } from "./";

const RecentReviews = (props) => {
    const [reviews, setReviews] = useState([]);
    const [recentReviews, setRecentReviews] = useState([]); 

    useEffect(() => {
        async function fetchReviews() {
            try {
                const url = `http://localhost:3000/api/reviews`;
                const response = await fetch(url); 
                const data = await response.json();

                if (data && data?.feed.entry) {
                    setReviews(data.feed.entry)
                    const currentTime = new Date();                     
                    const filteredReviews = data.feed.entry.filter((review) => {
                        const convertedDate = new Date(review.updated.label);
                        const differenceInHours = (currentTime - convertedDate) / (1000 * 60 * 60);
                        return differenceInHours <= 168; 
                    });

                    filteredReviews.sort((a, b) => {
                        const dateA = new Date(a.updated.label);
                        const dateB = new Date(b.updated.label);
                        return dateB - dateA; 
                    });

                    console.log(filteredReviews)

                    localStorage.setItem("recentReviews", JSON.stringify(filteredReviews)); 
                    setRecentReviews(filteredReviews);
                }
            } catch (e) {
                console.error(e); 
            }
        };

        fetchReviews(); 
    }, []);

    return (
        <>
            <h3>Reviews from the past 48 hours:</h3>

            {
                recentReviews.length ? (
                    <>
                        <MappedReviews recentReviews={recentReviews}/>
                    </>
                ) : "Ain't got nothin boss"
            }
        </>
    )
}

export default RecentReviews; 