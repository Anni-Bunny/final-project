import React, {useEffect, useState} from "react";
import {review} from "../interfaces/review";
import api from "../classes/API";
import {ProductReviews} from "./ProductReviews";
import {Button} from "./Button";
import {product} from "../interfaces/product";
import {SortDropdown} from "./SortDropdown";
import {WriteReviewDropDown} from "./WriteReviewDropDown";

interface ProductReviewListProps {
    product: product;
}

export function ProductReviewList({product}: ProductReviewListProps) {
    const [sortedBy, setSortedBy] = useState('-date');
    const [reviews, setReviews] = useState<review[]>([]);
    const [averageStars, setAverageStars] = useState<number | null>(null);
    const [sortTitle, setSortTitle] = useState('Date desc');
    const [page, setPage] = useState<number>(1);
    const [reviewCount, setReviewCount] = useState<number>(0);

    const sortByList = [
        {
            title: 'Date',
            sortKey: 'date',
        },
        {
            title: 'Stars',
            sortKey: 'stars',
        }
    ];

    useEffect(() => {
        async function getReviews() {
            const reviewsRequest = await api.getReviews({productId: product.id, _sort: sortedBy, _page: page});
            if (reviewsRequest) {
                setReviews((prevState) => (page === 1 ? reviewsRequest.data : [...prevState, ...reviewsRequest.data]));
                setReviewCount(reviewsRequest.items);
            }
            setAverageStars(product.score);
        }

        getReviews();
    }, [product.id, sortedBy, page]);

    const sortReviews = (sortBy: string, title: string) => {
        setSortedBy(sortBy);
        setSortTitle(title);
        setPage(1);
    };

    const loadMoreReviews = () => {
        setPage((prevState) => prevState + 1);
    };

    return (
        <div className="flex flex-col gap-6 text-[#0E1422] pb-10">
            <div className="border-b">
                <h5 className="font-semibold text-[1rem] pb-4">Reviews</h5>
                <p className="pb-10">{averageStars ? averageStars : 'No ratings yet'} - {reviewCount} Reviews</p>
                <WriteReviewDropDown setReviews={setReviews}/>

                <SortDropdown
                    sortedBy={sortedBy}
                    sortTitle={sortTitle}
                    sortByList={sortByList}
                    onSortChange={sortReviews}
                />
            </div>

            <div className="mb-16">
                <ProductReviews reviews={reviews}/>
            </div>

            <div className="flex items-center justify-center gap-4">
                <Button title={"Load more reviews"} name={"Load more reviews"} type={"whiteBtn"}
                        className="border-[#5C5F6A]" onClick={loadMoreReviews}/>
            </div>
        </div>
    );
}
