import { useEffect, useRef, useState } from "react"
import styled from "styled-components";
import { CanvasNavigation } from "../Component/CanvasNavigation";
import { CanvasToolBar } from "../Component/CanvasToolBar";

const CanvasPlaygroundWrapper = styled.div`
    .highter-canvas{
        position: absolute;
        top: 0;
        left: 0;
        z-index : 1;
        opacity : 0.5
    }
`

export const CanvasPlaygroundContainer = ({ history, match, ...props }) => {
    let boards = window.localStorage.getItem("boards") ? JSON.parse(window.localStorage.getItem("boards")) : {}
    const canvasRef = useRef(null)
    const maincanvasContextRef = useRef(null);
    const highlighterCanvasRef = useRef(null)
    const highlighterContextRef = useRef(null);

    const [isDrawing, setIsDrawing] = useState(false)
    const [selectedTool, setSelectedTool] = useState(undefined)
    const [color, setColor] = useState("#000000")
    const [strokeValue, setStrokeValue] = useState(1)


    useEffect(() => {
        const maincanvas = canvasRef.current
        const width = window.innerWidth
        const height = window.innerHeight

        maincanvas.width = width * 2
        maincanvas.height = height * 2
        maincanvas.style.width = `${width}px`;
        maincanvas.style.height = `${height}px`;

        const maincontext = maincanvas.getContext("2d");
        maincontext.scale(2, 2)
        maincontext.lineCap = "round";
        maincontext.strokeStyle = color;
        maincontext.globalAlpha = 1;
        maincontext.lineWidth = strokeValue;
        maincanvasContextRef.current = maincontext;

        //highlighter canvas 

        const highlighterCanvas = highlighterCanvasRef.current
        highlighterCanvas.width = width * 2
        highlighterCanvas.height = height * 2
        highlighterCanvas.style.width = `${width}px`;
        highlighterCanvas.style.height = `${height}px`;

        const highlighterContext = highlighterCanvas.getContext("2d");
        highlighterContext.scale(2, 2)
        highlighterContext.lineCap = "round";
        highlighterContext.strokeStyle = color;
        highlighterContext.globalAlpha = 0.5;
        highlighterContext.lineWidth = strokeValue;
        highlighterContextRef.current = highlighterContext;

        //Draw image if it exists
        let boardData = boards[match.params.id]
        let imageData = boardData.image
        if (boardData && boardData.image && canvasRef && imageData) {
            const canvasPic = new Image();
            canvasPic.src = imageData;
            canvasPic.onload = function () {
                maincanvasContextRef.current.drawImage(canvasPic, 0, 0, canvasPic.width, canvasPic.height, 0, 0, canvasRef.current.width / 2, canvasRef.current.height / 2);
            }
        }

    }, [])

    useEffect(() => {
        highlighterContextRef.current.clearRect(0, 0, highlighterCanvasRef.current.width, highlighterCanvasRef.current.height);
    }, [selectedTool])

    const ClearCanvas = () => {
        maincanvasContextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        highlighterContextRef.current.clearRect(0, 0, highlighterCanvasRef.current.width, highlighterCanvasRef.current.height);
    }

    const LineDraw = (offsetX, offsetY) => {
        maincanvasContextRef.current.lineTo(offsetX, offsetY)
        maincanvasContextRef.current.stroke()
    }

    const HighlighterDraw = (offsetX, offsetY) => {
        highlighterContextRef.current.lineWidth = 5
        highlighterContextRef.current.lineTo(offsetX, offsetY)
        highlighterContextRef.current.stroke()
    }

    const OnStartDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent
        if (selectedTool === "MARKER") {
            highlighterContextRef.current.clearRect(0, 0, highlighterCanvasRef.current.width, highlighterCanvasRef.current.height);
        }

        //main canvas 
        maincanvasContextRef.current.beginPath()
        maincanvasContextRef.current.moveTo(offsetX, offsetY)

        //highlighter canvas 
        highlighterContextRef.current.beginPath()
        highlighterContextRef.current.moveTo(offsetX, offsetY)

        setIsDrawing(true)

    }

    const OnEndDrawing = ({ nativeEvent }) => {
        //main canvas 
        maincanvasContextRef.current.closePath()

        //highlighter canvas 
        highlighterContextRef.current.closePath()

        setIsDrawing(false)
        let imageData = canvasRef.current.toDataURL("image/png")
        let boardObj = boards[match.params.id]
        if (!boardObj) {
            boards[match.params.id] = { title: `Board ${Object.keys(boards).length + 1}`, image: imageData }
        } else {
            boardObj["image"] = imageData
            boards[match.params.id] = boardObj
        }
        window.localStorage.setItem("boards", JSON.stringify(boards));
    }

    const OnDraw = ({ nativeEvent }) => {
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
                maincanvasContextRef.current.clearRect(offsetX, offsetY, 10, 10);
            }
        }
    }

    const SetStrokeColor = (value) => {
        setColor(value)
        maincanvasContextRef.current.strokeStyle = value
        highlighterContextRef.current.strokeStyle = value
    }

    const SetStrokeValue = (value) => {
        setStrokeValue(value)
        maincanvasContextRef.current.lineWidth = value;
    }


    return (<CanvasPlaygroundWrapper>
        <CanvasNavigation history={history} title={boards[match.params.id].title} />
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
        <canvas
            className="highter-canvas"
            onMouseDown={OnStartDrawing}
            onMouseUp={OnEndDrawing}
            onMouseMove={OnDraw}
            ref={highlighterCanvasRef}
        />
    </CanvasPlaygroundWrapper>)
}