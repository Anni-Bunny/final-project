import React, {useEffect, useState} from "react";
import {review} from "../interfaces/review";
import api from "../classes/API";
import {ProductReviews} from "./ProductReviews";
import {Button} from "./Button";

interface ProductReviewListProps {
    productId: number | string
}

interface reviewRequestResponse {
    first: number,
    prev: null | number,
    next: null | number,
    last: number,
    pages: number,
    items: number,
    data: review[]
}

const ReviewRequestResponseDefaultValues = {
    first: 1,
    prev: null,
    next: null,
    last: 1,
    pages: 0,
    items: 0,
    data: []
}


export function ProductReviewList({productId}: ProductReviewListProps) {
    const [reviews, setReviews] = useState<reviewRequestResponse>(ReviewRequestResponseDefaultValues)
    const [averageStars, setAverageStars] = useState<number | null>(null);

    useEffect(() => {
        async function getReviews() {
            const reviews = await api.getReviews({productId: productId});
            if (reviews)
                setReviews(reviews);

            const totalStars = reviews.data.reduce((acc: number, review: review) => acc + review.stars, 0);
            const avgStars = reviews.data.length ? (totalStars / reviews.data.length) : 0;
            setAverageStars(avgStars);
        }

        getReviews();
    }, [productId]);

    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible((prev) => !prev);
    };

    return (
        <div className="flex flex-col gap-6 text-[#0E1422] pb-10">
            <div className="border-b">
                <h5 className="font-semibold text-[1rem] pb-4">Reviews</h5>
                <p className="pb-10">{averageStars ? averageStars.toFixed(1) : 'No ratings yet'} -{reviews.items} Reviews</p>
                <Button title={"Write a review"} type={"whiteBtn"} className=""/>

                <div className="flex relative w-full justify-end">
                    <Button
                        title={"Sort By"}
                        icon={"chevronDown"}
                        className={""}
                        type={"whiteSmallBtn"}
                        onClick={toggleDropdown}
                    />
                    <div
                        id="dropdown"
                        className={`absolute bottom-0 translate-y-full z-10 ${isDropdownVisible ? '' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                            <li>
                                <a href="#"
                                   className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                            </li>
                            <li>
                                <a href="#"
                                   className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

            <div>
                <ProductReviews reviews={reviews.data}/>
            </div>
        </div>
    );
}