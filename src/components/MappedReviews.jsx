// This component maps through available reviews data stored in our state (which itself is in our Reviews component) and renders each review with the following data:
    // * Author of post
    // * Content
    // * Date (which is converted to a more readable string)
    // * User rating out of 5 stars
// Notes:
        // There is some minor CSS styling for the UI display of the reviews ("../css/mappedReviews.css")
import "../css/mappedReviews.css";

const MappedReviews = (props) => {
    return (
        
        <div id="mapped-reviews-container">
            {
                props.recentReviews.length ? props.recentReviews.map((review) => {
                    return (
                        <div key={review.id.label} className="indiv-review-container">
                            <p><strong>{review.author.name.label}</strong> wrote...</p>
                            <p>"{review.content.label}"</p>
                            <p>Posted {new Date(review.updated.label).toString()}</p>
                            <p>Rated {review["im:rating"].label} ⭐</p>
                        </div>
                    )
                }) : "Loading..."
            }
        </div>
    );
};

export default MappedReviews; 