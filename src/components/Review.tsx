import {review} from "../interfaces/review";
import {Icon} from "./Icon";
import moment from "moment";

interface ReviewProps{
    review: review
}

export function Review({review}:ReviewProps) {

    let stars = []

    for (let i = 0; i < 5; i++) {
            stars.push(<Icon key={i} name={i < review.stars ? 'star' : 'emptyStar'}/>)
    }

    return (
        <div className="flex gap-6 pt-[2.375rem] pb-[1.688rem]">
            <div className="w-12 h-12 flex items-center justify-center bg-[#F0F1FF] rounded-full px-[0.906rem] py-[0.719rem] text-[#0070F3] font-semibold">{review.name[0]}{review.surName[0]}</div>
            <div className="w-full">
                <div className="flex justify-between">
                    <h3 className="text-sm font-medium mb-1.5">{review.name}{review.surName}</h3>
                    <div className="flex">
                        {
                            stars.map(star => (
                                star
                            ))
                        }
                    </div>
                </div>
                <p className="text-xs mb-4 text-[#5C5F6A]">{moment(review.date).fromNow()}</p>
                <p className="text-sm text-[#5C5F6A]">{review.comment}</p>
            </div>
        </div>
    );
}