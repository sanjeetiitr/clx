import { useEffect, useRef, useState } from "react"
import styled from "styled-components";
import { CanvasNavigation } from "../Component/CanvasNavigation";
import { CanvasToolBar } from "../Component/CanvasToolBar";

const CanvasPlaygroundWrapper = styled.div`
    
`
let imagesArray = []
let step = -1


const hexToRGB = (hex, alpha) => {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}



export const CanvasPlaygroundContainerTest = ({ ...props }) => {




    const canvasRef = useRef(null)
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false)
    const [selectedTool, setSelectedTool] = useState(undefined)
    const [color, setColor] = useState("#000000")
    const [strokeValue, setStrokeValue] = useState(1)


    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = window.innerWidth * 2
        canvas.height = window.innerHeight * 2
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        const context = canvas.getContext("2d");
        context.scale(2, 2)
        context.lineCap = "round";
        context.strokeStyle = color;
        context.lineWidth = strokeValue;
        contextRef.current = context;

    }, [])

    useEffect(() => {
        if (selectedTool === "MARKER") {
            console.log(hexToRGB(color, .4), "sasasasasa")
            let val = `#80${color.slice(1, color.length - 1)}`
            contextRef.current.strokeStyle = hexToRGB(color, .4)
            contextRef.current.fillStyle = hexToRGB(color, .4)
            // contextRef.current.globalCompositeOperation = 'destination-in';
            // contextRef.current.globalAlpha = .5
            contextRef.current.lineWidth = 5
        }
    }, [selectedTool])

    const pushCanvasData = () => {
        step++
        if (step < imagesArray.length) { imagesArray.length = step; }
        let data = canvasRef.current.toDataURL("image/png")
        console.log(data)

        imagesArray.push(data);
    }

    function undoCanvasData() {
        if (step >= 0) {
            // step--;
            var canvasPic = new Image();
            canvasPic.src = imagesArray[step];
            canvasPic.onload = function () {
                ClearCanvas()
                contextRef.current.drawImage(canvasPic, 0, 0, canvasPic.width, canvasPic.height, 0, 0, canvasRef.current.width / 2, canvasRef.current.height / 2);
            }
        } else {
            ClearCanvas()
        }
    }

    const ClearCanvas = () => {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }


    const LineDraw = (offsetX, offsetY) => {
        contextRef.current.lineTo(offsetX, offsetY)
        contextRef.current.stroke()
    }

    const HighlighterDraw = (offsetX, offsetY) => {
        contextRef.current.lineTo(offsetX, offsetY)
        contextRef.current.stroke()
    }


    const OnStartDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent
        if (selectedTool === "MARKER") {
            console.log(hexToRGB(color, .4), "sasasasasa")
            let val = `#80${color.slice(1, color.length - 1)}`
            // contextRef.current.strokeStyle = "#f2d9d9"
            // contextRef.current.fillStyle = "#f2d9d9"
            contextRef.current.globalCompositeOperation = 'overlay';

            contextRef.current.lineWidth = 5
        }
        if (selectedTool === "MARKER") {
            undoCanvasData()
        }
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX, offsetY)
        setIsDrawing(true)
        let data = canvasRef.current.toDataURL("image/png")
        window.localStorage.setItem('key', data);
    }

    const OnEndDrawing = ({ nativeEvent }) => {
        // console.log(nativeEvent)
        contextRef.current.closePath()
        setIsDrawing(false)
        if (selectedTool === "MARKER") {
            // undoCanvasData()
        }
        if (selectedTool === "PEN") {
            pushCanvasData()
        }
        if (selectedTool === "ERASER") {
            pushCanvasData()
        }
    }

    const OnDraw = ({ nativeEvent }) => {
        // console.log(nativeEvent)
        const { offsetX, offsetY } = nativeEvent
        if (!isDrawing) {
            return
        } else {
            if (selectedTool === "PEN") {
                LineDraw(offsetX, offsetY)
            } else if (selectedTool === "MARKER") {
                HighlighterDraw(offsetX, offsetY)
            }
            else if (selectedTool === "ERASER") {
                contextRef.current.clearRect(offsetX, offsetY, 10, 10);
            }
        }
    }

    const SetStrokeColor = (value) => {
        setColor(value)
        contextRef.current.strokeStyle = value
    }

    const SetStrokeValue = (value) => {
        setStrokeValue(value)
        contextRef.current.lineWidth = value;
    }


    console.log(imagesArray, step, color, "imagesArray")

    return (<CanvasPlaygroundWrapper>
        <CanvasNavigation />
        <CanvasToolBar
            selectedTool={selectedTool}
            onClick={setSelectedTool}
            clearCanvas={ClearCanvas}
            setColor={SetStrokeColor}
            setStrokeValue={SetStrokeValue}
            color={color}
        />
        <canvas
            onMouseDown={OnStartDrawing}
            onMouseUp={OnEndDrawing}
            onMouseMove={OnDraw}
            ref={canvasRef}
        />
    </CanvasPlaygroundWrapper>)
}