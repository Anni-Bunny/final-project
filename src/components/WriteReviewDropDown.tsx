import {Dropdown} from "./DropDown";
import React, {useState} from "react";
import {Button} from "./Button";

export function WriteReviewDropDown() {
    const [rating, setRating] = useState<number>(0);

    // State to temporarily store the hover rating
    const [hoveredRating, setHoveredRating] = useState<number>(0);

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

    return (
        <Dropdown
            title={"Write a review"}
            btnType={"whiteBtn"}
            mainDivClassName={"justify-start"}
            child2={
                <div className="flex flex-col w-[24rem] h-[22rem] px-10 py-8 gap-6">
                    <h5 className="text-[#0E1422] font-bold border-b py-2">Write Review</h5>

                    <div className="flex flex-col">
                        <h5>Review</h5>
                        <textarea name={"review"} required={true} className="rounded-md border border-[#E6E7E8] py-2.5 px-[0.938rem] h-[2.813rem]text-black text-sm
                                focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 required:"/>
                    </div>

                    <div className="flex space-x-1">
                        {stars}
                    </div>

                    <Button title="Submit Your Review"/>
                </div>}
            child2ClassName=""

        />
    );
}