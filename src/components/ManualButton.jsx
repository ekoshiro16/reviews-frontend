const ManualButton = (props) => {
    const { setRecentReviews, setReviews } = props; 

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

    return (
        <button onClick={fetchReviews}>
            Manual Update
        </button>
    );
};

export default ManualButton; 