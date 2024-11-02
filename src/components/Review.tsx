import {review} from "../interfaces/review";
import {Icon} from "./Icon";
import moment from "moment";

interface ReviewProps{
    review: review
}

export function Review({review}:ReviewProps) {
    return (
        <div className="flex">
            <div>{review.name[0]}{review.surName[0]}</div>
            <div className="w-full">
                <div className="flex justify-between">
                    <h3>{review.name}{review.surName}</h3>
                    <div className="flex">
                        {Array(review.stars).fill(<Icon name="star"/>)}
                        {Array(5-(review.stars)).fill(<Icon name="emptyStar"/>)}
                    </div>
                </div>
                <p>{moment(review.date).fromNow()}</p>
                <p>{review.comment}</p>
            </div>
        </div>
    );
}