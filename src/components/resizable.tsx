import { useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import './resizable.css';
interface ResizableProps {
    direction: "horizontal" | "vertical";
    children: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
    let resizableProps: ResizableBoxProps;
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);


    if (direction === "horizontal") {
        resizableProps = {
            className: "resize-horizontal",
            width: innerWidth * 0.75,
            height: Infinity,
            minConstraints: [innerWidth * 0.2, Infinity],
            maxConstraints: [innerWidth * 0.75, Infinity],
            resizeHandles: ["e"]
        }
    } else {
        resizableProps = {
            width: Infinity,
            height: 300,
            maxConstraints: [Infinity, innerHeight * 0.9],
            minConstraints: [Infinity, 100],
            resizeHandles: ["s"]
        }
    }

    useEffect(() => {
        const listener = () => {
            setInnerHeight(window.innerHeight);
            setInnerWidth(window.innerWidth);
        }
        window.addEventListener('resize', listener);

        return () => {
            window.removeEventListener('resize', listener);
        }
    }, [])


    return (
        <ResizableBox
            {...resizableProps}
        >
            {children}
        </ResizableBox>
    )
}

export default Resizable;
