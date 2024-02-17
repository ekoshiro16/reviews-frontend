const MappedReviews = (props) => {
    return (
        
        <>
            {
                props.recentReviews.length ? props.recentReviews.map((review) => {
                    return (
                        <div style={{"borderBottom": "1px solid black"}}>
                            <p><strong>{review.author.name.label}</strong> wrote...</p>
                            <p>"{review.content.label}"</p>
                            <p>Posted {new Date(review.updated.label).toString()}</p>
                            <p>Rated {review["im:rating"].label} ⭐</p>
                        </div>
                    )
                }) : "Loading..."
            }
        </>

    )
}

export default MappedReviews; 