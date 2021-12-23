import { ResizableBox, ResizableBoxProps } from "react-resizable";
import './resizable.css';
interface ResizableProps {
    direction: "horizontal" | "vertical";
    children: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
    let resizableProps: ResizableBoxProps;

    if (direction === "horizontal") {
        resizableProps = {
            width: window.innerWidth * 0.75,
            height: Infinity,
            maxConstraints: [window.innerWidth * 0.2, Infinity],
            minConstraints: [window.innerWidth * 0.75, Infinity],
            resizeHandles: ["e"]
        }
    } else {
        resizableProps = {
            width: Infinity,
            height: 300,
            maxConstraints: [Infinity, window.innerHeight * 0.9],
            minConstraints: [Infinity, 100],
            resizeHandles: ["s"]
        }
    }


    return (
        <ResizableBox
            {...resizableProps}
        >
            {children}
        </ResizableBox>
    )
}

export default Resizable;
