import React from "react";
import "./PhoneBlock.css";

const PhoneBlock = ({ image, title, text, reverse = false }) => {
    return (
        <div className={`PhoneBlock ${reverse ? "reverse" : ""}`}>
            {!reverse && (
                <>
                    <div className="PhoneText">
                        <h3>{title}</h3>
                        <p>{text}</p>
                        <button className="btnCustom">Learn More</button>
                    </div>
                    <div className="PhoneImageWrapper cropBottom">
                        <img src={image} alt={title} className="PhoneImage" />
                    </div>
                </>
            )}

            {reverse && (
                <>
                    <div className="PhoneImageWrapper cropTop">
                        <img src={image} alt={title} className="PhoneImage" />
                    </div>
                    <div className="PhoneText">
                        <h3>{title}</h3>
                        <p>{text}</p>
                        <button className="btnCustom">Learn More</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default PhoneBlock;
