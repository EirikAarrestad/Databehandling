import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import ContinentGrowth from "./ContinentGrowth";
import Choloropleth from "./Choloropleth";
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

const arrowStyle = {
    fontSize: "24px",
    color: "white",
    marginLeft: "180px",
    marginRight: "180px",
    backgroundColor: "transparent",
    borderRadius: "100%",
    padding: "10px 15px",
};

const Slideshow = () => {
    return (
        <div className={styles.container}>
            <div className="slide-container">
                <Slide
                    prevArrow={<div style={arrowStyle}>{"tilbake"}</div>}
                    nextArrow={<div style={arrowStyle}>{"framover"}</div>}
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
