import React, {useEffect, useState} from "react";
import {review} from "../interfaces/review";
import api from "../classes/API";
import {ProductReviews} from "./ProductReviews";
import {Button} from "./Button";

interface ProductReviewListProps {
    productId: number | string
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
    const [reviews, setReviews] = useState<review[]>([])
    const [averageStars, setAverageStars] = useState<number | null>(null);
    const [sortTitle, setSortTitle] = useState('Date desc');
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        async function getReviews() {
            const reviewsRequest = await api.getReviews({productId: productId, _sort: sortedBy, _page: page});
            if (reviewsRequest) {
                setReviews((prevState) => (page === 1 ? reviewsRequest.data : [...prevState, ...reviewsRequest.data]));
            }


            const totalStars = reviewsRequest.data.reduce((acc: number, review: review) => acc + review.stars, 0);
            const avgStars = reviewsRequest.data.length ? (totalStars / reviewsRequest.data.length) : 0;
            setAverageStars(avgStars);
        }

        getReviews();
    }, [productId, sortedBy, page]);

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
            setPage(1);
            toggleDropdown();
        }
    }

    function loadMoreReviews(event: React.MouseEvent<HTMLButtonElement>){
        setPage( (prevState)=> prevState + 1)
    }

    console.log(page)

    return (
        <div className="flex flex-col gap-6 text-[#0E1422] pb-10"
             onMouseLeave={() => setDropdownVisible(false)}
        >
            <div className="border-b">
                <h5 className="font-semibold text-[1rem] pb-4">Reviews</h5>
                <p className="pb-10">{averageStars ? averageStars.toFixed(1) : 'No ratings yet'} -{1} Reviews</p>
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

            <div className="mb-16">
                <ProductReviews reviews={reviews}/>
            </div>

            <div className="flex items-center justify-center gap-4">
                <Button title={"Load more reviews"} name={"Load more reviews"} type={"whiteBtn"} className="border-[#5C5F6A]" onClick={loadMoreReviews}/>
            </div>

        </div>
    );
}