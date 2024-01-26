import React from "react";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import ContinentGrowth from "./ContinentGrowth";
import Choloropleth from "./Choloropleth";
import styles from "./Slideshow.module.scss";

const spanStyle = {
    padding: "20px",
    color: "#000000",
};

const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "500px",
    position: "relative",
};

const slideImages = [
    {
        caption: <ContinentGrowth />,
    },
    {
        caption: <Choloropleth />,
    },
];

const arrowStyle = {
    fontSize: "24px",
    color: "red",
    marginLeft: "200px",
    marginRight: "200px",
};

const Slideshow = () => {
    return (
        <div className={styles.container}>
            <div className="slide-container">
                <Slide
                    prevArrow={<div style={arrowStyle}>{"<-"}</div>}
                    nextArrow={<div style={arrowStyle}>{"->"}</div>}
                >
                    {slideImages.map((item, index) => (
                        <div key={index}>
                            <div className={styles.divStyle}>
                                <span style={spanStyle}>{item.caption}/</span>
                            </div>
                        </div>
                    ))}
                </Slide>
            </div>
        </div>
    );
};

export default Slideshow;
