    import React from "react";
    import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

    const Stars = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
        } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
        } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500" />);
        }
    }
    return <div className="flex">{stars}</div>;
    };

    export default Stars;
