import {Dropdown} from "./DropDown";
import React, {Dispatch, SetStateAction, useState} from "react";
import {Button} from "./Button";
import {review} from "../interfaces/review";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import moment from "moment/moment";
import api from "../classes/API";

interface WriteReviewDropDownProps {
    setReviews: React.Dispatch<React.SetStateAction<review[]>>;
}

export function WriteReviewDropDown({setReviews}: WriteReviewDropDownProps) {
    const [rating, setRating] = useState<number>(0);
    const [hoveredRating, setHoveredRating] = useState<number>(0);
    const [coment, setComent] = useState<string>("")
    const user = useSelector((state: RootState) => state.user.data)

    // Function to handle click to set rating
    const handleClick = (index: number) => {
        if (rating === index + 1) {
            setRating(0); // If clicked on the same star, reset the rating
        } else {
            setRating(index + 1); // Otherwise set the rating to the clicked star
        }
    };

    // Function to handle hover effect
    const handleMouseEnter = (index: number) => {
        setHoveredRating(index + 1); // Show the stars up to the hovered one
    };

    // Function to handle mouse leave
    const handleMouseLeave = () => {
        setHoveredRating(0); // Reset hover effect
    };

    // Render stars
    const stars = [];
    for (let i = 0; i < 5; i++) {
        const starClass = i < (hoveredRating || rating) ? 'text-yellow-800' : 'text-gray-300';
        stars.push(
            <div
                key={i}
                className={`text-3xl cursor-pointer ${starClass}`}
                onClick={() => handleClick(i)}
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={handleMouseLeave}
            >
                ★
            </div>
        );
    }

    function onChangeTextarea(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const val = event.currentTarget.value

        setComent(val)
    }

    async function addReview(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (user && user.name && user.id) {
            const review: review = {
                productId: user.id,
                name: user.name.firstname,
                surName: user.name.lastname,
                date: moment().format("YYYY-MM-DD"),
                comment: coment,
                stars: rating,
            }
            const response = await api.postReview(review)
            console.log(response)

            if (response) {
                setComent("")
                setRating(0)
                setHoveredRating(0)

                setReviews((prevState) => ([response, ...prevState]));
            }

        }


    }

    return (
        <Dropdown
            title={"Write a review"}
            btnType={"whiteBtn"}
            mainDivClassName={"justify-start"}
            child2={
                <form onSubmit={addReview} className="flex flex-col w-[24rem] h-[22rem] px-10 py-8 gap-6">
                    <h5 className="text-[#0E1422] font-bold border-b py-2">Write Review</h5>

                    <div className="flex flex-col">
                        <h5>Review</h5>
                        <textarea onChange={onChangeTextarea} value={coment} name={"review"} required={true} className="rounded-md border border-[#E6E7E8] py-2.5 px-[0.938rem] h-[2.813rem]text-black text-sm
                                focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 required:"/>
                    </div>

                    <div className="flex space-x-1">
                        {stars}
                    </div>

                    <Button title="Submit Your Review"/>
                </form>}
            child2ClassName=""

        />
    );
}