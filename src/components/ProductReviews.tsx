import {review} from "../interfaces/review";
import {Review} from "./Review";

interface ProductReviewProps{
    reviews: review[];
}

export function ProductReviews({reviews}: ProductReviewProps) {
    return (
        <div>
            {
                reviews.map((review,index) =>(
                    <Review key={index} review={review}/>
                ))
            }
        </div>
    );
}