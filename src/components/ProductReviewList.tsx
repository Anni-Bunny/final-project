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

const sortByList = [
    {
        title: 'Date',
        sortKey: 'date',
    },
    {
        title: 'Stars',
        sortKey: 'stars',
    }
]


export function ProductReviewList({productId}: ProductReviewListProps) {
    const [sortedBy, setSortedBy] = useState('-date');
    const [reviews, setReviews] = useState<reviewRequestResponse>(ReviewRequestResponseDefaultValues)
    const [averageStars, setAverageStars] = useState<number | null>(null);
    const [sortTitle, setSortTitle] = useState('Date desc');

    useEffect(() => {
        async function getReviews() {
            const reviews = await api.getReviews({productId: productId, _sort: sortedBy});
            if (reviews)
                setReviews(reviews);

            const totalStars = reviews.data.reduce((acc: number, review: review) => acc + review.stars, 0);
            const avgStars = reviews.data.length ? (totalStars / reviews.data.length) : 0;
            setAverageStars(avgStars);
        }

        getReviews();
    }, [productId, sortedBy]);

    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible((prev) => !prev);
    };

    function sortReviews(event: React.MouseEvent<HTMLElement>) {
        const value = event.currentTarget.dataset.sortBy;
        const title = event.currentTarget.textContent?.trim();

        if (value && title) {
            setSortedBy(value);
            setSortTitle(title);
            toggleDropdown();
        }
    }

    return (
        <div className="flex flex-col gap-6 text-[#0E1422] pb-10"
             onMouseLeave={() => setDropdownVisible(false)}
        >
            <div className="border-b">
                <h5 className="font-semibold text-[1rem] pb-4">Reviews</h5>
                <p className="pb-10">{averageStars ? averageStars.toFixed(1) : 'No ratings yet'} -{reviews.items} Reviews</p>
                <Button title={"Write a review"} type={"whiteBtn"} className=""/>

                <div className="flex relative w-full justify-end">
                    <Button
                        title={`Sort By ${sortTitle}`}
                        icon={"chevronDown"}
                        className={""}
                        type={"whiteSmallBtn"}
                        onClick={toggleDropdown}
                    />
                    <div
                        id="dropdown"
                        className={`absolute bottom-0 translate-y-full z-10 ${isDropdownVisible ? '' : 'hidden'} bg-gray-500 rounded shadow-2xl w-44`}
                    >
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                            {
                                sortByList.map((item, index) => (
                                    <React.Fragment key={index}>
                                        {sortedBy !== `-${item.sortKey}` &&
                                            <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                                                data-sort-by={`-${item.sortKey}`}
                                                onClick={sortReviews}
                                            >
                                                {item.title} desc
                                            </li>
                                        }

                                        {sortedBy !== `${item.sortKey}` &&
                                            <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                                                data-sort-by={item.sortKey}
                                                onClick={sortReviews}
                                            >
                                                {item.title} asc
                                            </li>
                                        }
                                    </React.Fragment>
                                ))
                            }
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