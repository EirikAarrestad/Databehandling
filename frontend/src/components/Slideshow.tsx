import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import CountryGrowth from "./CountryGrowth";

const spanStyle = {
    padding: "20px",
    background: "#efefef",
    color: "#000000",
};

const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "400px",
};

const slideImages = [
    {
        location: "Norway",
        caption: "Slide 1",
    },
    {
        location: "Iceland",
        caption: "Slide 2",
    },
    {
        location: "Denmark",
        caption: "Slide 3",
    },
];

const Slideshow = () => {
    return (
        <div className="slide-container">
            <Slide>
                {slideImages.map((item) => (
                    <div>
                        <div
                            style={{
                                ...divStyle,
                            }}
                        >
                            <span style={spanStyle}>
                                <CountryGrowth country={item.location} />
                            </span>
                        </div>
                    </div>
                ))}
            </Slide>
        </div>
    );
};

export default Slideshow;
