import { useState } from "react"
import styled from "styled-components"
import { CustomButton, CustomRow } from "../Styles/StyledComponentGlobalStyle"
import CircleStrokeIcon from "../SvgComponents/CircleStrokeIcon"
import DeleteIcon from "../SvgComponents/DeleteIcon"
import EraserIcon from "../SvgComponents/EraserIcon"
import MarkerIcon from "../SvgComponents/MarkerIcon"
import PencilIcon from "../SvgComponents/PencilIcon"


const CanvasToolWrapper = styled.div`
    display : flex;
    flex-direction: column;
    position : absolute;
    width : 50px;
    border: 1px solid #ededed;
    left : 10px;
    top :30%;
    z-index : 3;

    input{
        height : 24px !important;
        width : 24px !important;
        cursor : pointer;
    }

    .pen-tool-extend-options{
        position : absolute;
        left : 50px;
        top : 0;
        background : white;
        border: .5px solid #ededed;
        margin-top : -1px;

        button{
            min-width : 50px;
        }
    }
`

export const CanvasToolBar = ({ selectedTool, onClick, clearCanvas, setColor, setStrokeValue, color }) => {

    const [strokeOptionsVisiblity, setStrokeOptionsVisiblity] = useState(false)

    const handleStrokeOptionClick = (value) => {
        setStrokeOptionsVisiblity(false)
        setStrokeValue(value)
    }

    const handleToobarItemsClick = (value) => {
        setStrokeOptionsVisiblity(false)
        onClick(value)
    }

    return (<CanvasToolWrapper>
        <CustomButton
            onClick={() => {
                onClick("PEN")
                setStrokeOptionsVisiblity(true)
            }}
            className={`${selectedTool === "PEN" && "selected"}`}
        >
            <PencilIcon height="24" width="24" />
        </CustomButton>
        <CustomButton
            onClick={() => handleToobarItemsClick("MARKER")}
            className={`${selectedTool === "MARKER" && "selected"}`}
        >
            <MarkerIcon height="24" width="24" />
        </CustomButton>
        <CustomButton
            onClick={() => handleToobarItemsClick("ERASER")}
            className={`${selectedTool === "ERASER" && "selected"}`}
        >
            <EraserIcon height="24" width="24" />
        </CustomButton>
        <CustomButton
            onClick={clearCanvas}
        >
            <DeleteIcon height="24" width="24" />
        </CustomButton>
        <CustomButton >
            <input onChange={(e) => setColor(e.target.value)} type="color" />
        </CustomButton>
        {strokeOptionsVisiblity && <CustomRow className="pen-tool-extend-options">
            <CustomButton onClick={() => handleStrokeOptionClick(1)}>
                <CircleStrokeIcon style={{ fill: color }} height="10" width="10" />
            </CustomButton>
            <CustomButton onClick={() => handleStrokeOptionClick(3)}>
                <CircleStrokeIcon style={{ fill: color }} height="16" width="16" />
            </CustomButton>
            <CustomButton onClick={() => handleStrokeOptionClick(5)}>
                <CircleStrokeIcon style={{ fill: color }} height="24" width="24" />
            </CustomButton>
        </CustomRow>}
    </CanvasToolWrapper>)
}