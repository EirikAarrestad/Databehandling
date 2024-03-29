import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import ContinentGrowth from "./ContinentGrowth";
import Choloropleth from "./Choloropleth";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styles from "./Slideshow.module.scss";

const spanStyle = {
    padding: "20px",
    color: "#000000",
};

const slideImages = [
    {
        caption: <ContinentGrowth />,
    },
    {
        caption: <Choloropleth />,
    },
];

// Styles på hvordan pilene skal se ut
const arrowStyle = {
    fontSize: "24px",
    color: "white",
    marginLeft: "120px",
    marginRight: "120px",
    backgroundColor: "transparent",
    borderRadius: "100%",
    padding: "10px 15px",
};

// Karusell
const Slideshow = () => {
    return (
        <div className={styles.container}>
            <div className="slide-container">
                <Slide
                    autoplay={false}
                    prevArrow={
                        <div style={arrowStyle}>
                            <FaArrowLeft />
                        </div>
                    }
                    nextArrow={
                        <div style={arrowStyle}>
                            <FaArrowRight />
                        </div>
                    }
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
