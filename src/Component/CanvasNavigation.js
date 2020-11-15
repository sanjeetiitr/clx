import styled from "styled-components"
import { Icon } from "antd"
import { CustomButton, CustomRow } from "../Styles/StyledComponentGlobalStyle"


const CanvasNavigationWrapper = styled.div`
    display : flex;
    flex-direction: row;
    position : absolute;
    border: 1px solid #ededed;
    left : 10px;
    top : 10px;
    z-index : 3;

    .back-nav{
        border-right : 1px solid #ededed !important;
        .back-icon{
            margin-right : 8px;
        }
    }
`

export const CanvasNavigation = ({ selectedTool, title, clearCanvas, history }) => {
    return (<CanvasNavigationWrapper>
        <CustomButton className={`${selectedTool === "PEN" && "selected"} back-nav`}><CustomRow align="center" justify="center" onClick={() => history.push('/')}><Icon className="back-icon" type="left" /> Projects</CustomRow></CustomButton>
        <CustomButton className={`${selectedTool === "MARKER" && "selected"}`}>Title : {title ? title : "Untitled"}</CustomButton>
    </CanvasNavigationWrapper>)
}