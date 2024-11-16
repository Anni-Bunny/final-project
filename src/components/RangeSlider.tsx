import React, { useState, useRef } from 'react';

export function RangeSlider(){
    const [leftValue, setLeftValue] = useState<number>(0);  // Left bullet initial position
    const [rightValue, setRightValue] = useState<number>(50); // Right bullet initial position
    const [showLeftTooltip, setShowLeftTooltip] = useState<boolean>(false); // Left tooltip visibility
    const [showRightTooltip, setShowRightTooltip] = useState<boolean>(false); // Right tooltip visibility

    const sliderRef = useRef<HTMLDivElement>(null);  // Ref to get the slider's width

    // Function to handle the left bullet drag
    const handleLeftBulletDrag = (event: MouseEvent) => {
        if (!sliderRef.current) return;

        const sliderRect = sliderRef.current.getBoundingClientRect();
        const mouseX = event.clientX - sliderRect.left; // Get mouse position relative to slider
        const newLeftValue = Math.min(Math.max((mouseX / sliderRect.width) * 100, 0), rightValue - 1); // Ensure it doesn't go beyond the right bullet
        setLeftValue(newLeftValue);
    };

    // Function to handle the right bullet drag
    const handleRightBulletDrag = (event: MouseEvent) => {
        if (!sliderRef.current) return;

        const sliderRect = sliderRef.current.getBoundingClientRect();
        const mouseX = event.clientX - sliderRect.left; // Get mouse position relative to slider
        const newRightValue = Math.max(Math.min((mouseX / sliderRect.width) * 100, 100), leftValue + 1); // Ensure it doesn't go beyond the left bullet
        setRightValue(newRightValue);
    };

    // Function to start dragging the left bullet
    const startLeftDrag = (e: React.MouseEvent) => {
        e.preventDefault();
        document.addEventListener('mousemove', handleLeftBulletDrag as EventListener);
        document.addEventListener('mouseup', stopDragging);
    };

    // Function to start dragging the right bullet
    const startRightDrag = (e: React.MouseEvent) => {
        e.preventDefault();
        document.addEventListener('mousemove', handleRightBulletDrag as EventListener);
        document.addEventListener('mouseup', stopDragging);
    };

    // Function to stop dragging
    const stopDragging = () => {
        document.removeEventListener('mousemove', handleLeftBulletDrag as EventListener);
        document.removeEventListener('mousemove', handleRightBulletDrag as EventListener);
        document.removeEventListener('mouseup', stopDragging);
    };

    // Tooltip position calculation
    const getTooltipPosition = (value: number) => {
        if (!sliderRef.current) return 0;
        const sliderRect = sliderRef.current.getBoundingClientRect();
        return (value / 100) * sliderRect.width; // Calculate the position based on the slider width
    };

    return (
        <div className="p-6 text-center">

            {/* Slider container */}
            <div
                className="relative w-full h-2 bg-gray-300 rounded-lg"
                ref={sliderRef}
            >
                {/* Slider Line between Bullets */}
                <div
                    className="absolute top-0 h-2 bg-gray-400 rounded-lg"
                    style={{
                        left: `${leftValue}%`,
                        width: `${rightValue - leftValue}%`, // The line width is calculated based on the distance between the bullets
                    }}
                />

                {/* Left Bullet */}
                <div
                    className="absolute left-0 transform -translate-y-1/2 w-4 h-4 bg-black rounded-full cursor-pointer"
                    style={{ left: `${leftValue}%`, top: '50%' }}  // Center vertically within the slider
                    onMouseDown={startLeftDrag}
                    onMouseEnter={() => setShowLeftTooltip(true)} // Show tooltip on hover
                    onMouseLeave={() => setShowLeftTooltip(false)} // Hide tooltip on mouse leave
                />

                {/* Left Tooltip */}
                {showLeftTooltip && (
                    <div
                        className="absolute bottom-[-50px] left-1/2 transform -translate-y-1/2 text-sm font-bold text-white bg-black px-2 py-1 rounded"
                        style={{
                            left: `${getTooltipPosition(leftValue)}px`, // Dynamically position based on leftValue
                        }}
                    >
                        {leftValue.toFixed(0)}%
                    </div>
                )}

                {/* Right Bullet */}
                <div
                    className="absolute right-0 transform -translate-y-1/2 w-4 h-4 bg-black rounded-full cursor-pointer"
                    style={{ left: `${rightValue}%`, top: '50%' }} // Center vertically within the slider
                    onMouseDown={startRightDrag}
                    onMouseEnter={() => setShowRightTooltip(true)} // Show tooltip on hover
                    onMouseLeave={() => setShowRightTooltip(false)} // Hide tooltip on mouse leave
                />

                {/* Right Tooltip */}
                {showRightTooltip && (
                    <div
                        className="absolute bottom-[-50px] left-1/2 transform -translate-y-1/2 text-sm font-bold text-white bg-black px-2 py-1 rounded"
                        style={{
                            left: `${getTooltipPosition(rightValue)}px`, // Dynamically position based on rightValue
                        }}
                    >
                        {rightValue.toFixed(0)}%
                    </div>
                )}
            </div>
        </div>
    );
}
