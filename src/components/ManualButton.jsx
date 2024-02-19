// This component is designed to allow users of the frontend client to manually refresh the reviews data available from the Apple Store RSS feed. 
// It is a button that, when clicked, retrieves the reviews data from the backend, filters the dataset for reviews made within the last week, and then sorts it from newest to oldest. 
// The appropriate states are updated as well. 

const ManualButton = (props) => {
    const { setRecentReviews, setReviews, setUpdateTime } = props; 

    async function handleClick() {
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

                if (filteredReviews.length) {
                    setRecentReviews(filteredReviews);
                    const currentTime = new Date();
                    setUpdateTime(currentTime.toString());
                };
            };
        } catch (e) {
            console.error(e); 
        };
    };
    
    return (
        <button onClick={handleClick}>
            Manual Update
        </button>
    );
};

export default ManualButton; 