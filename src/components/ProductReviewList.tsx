import {useEffect, useState} from "react";
import {review} from "../interfaces/review";
import api from "../classes/API";
import {ProductReviews} from "./ProductReviews";

interface ProductReviewListProps {
    productId: number | string
}

export function ProductReviewList({productId}: ProductReviewListProps) {
    const [reviews, setReviews] = useState<review[]>([])

    useEffect(() => {
        async function getReviews() {
            const reviews = await api.getReviews({productId: productId});
            if (reviews)
                setReviews(reviews.data);
        }

        getReviews();
    }, []);

    return (
        <div className="">
            <div>
                <h5>Reviews</h5>
                <p></p>
            </div>

            <div>
                <ProductReviews reviews={reviews}/>
            </div>
        </div>
    );
}