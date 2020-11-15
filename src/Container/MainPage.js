import { Button } from "antd"
import styled from "styled-components"
import { CustomRow } from "../Styles/StyledComponentGlobalStyle"

const MainPageWrapper = styled.div`
    display : flex;
    flex-direction : column;
    padding : 24px;

    img{
        object-fit: contain;
    }

    .boards-preview-container{
        margin-right : 20px;
        width :  200px;
        img{
            border : 1px solid #ededed;
            border-radius : 8px;
            cursor : pointer;
        }
        p{
            font-size : 14px;
            padding : 5px 0;
            margin : 0 !important;
        }
    }

    .create-board-btn{
        width : 200px;
        height :  100px;
        background : #ededed;
        border : none;
        border-radius : 8px;
        margin-right : 20px;
        cursor : pointer;
    }

`


export const MainPage = ({ history, match }) => {

    let boards = window.localStorage.getItem("boards") ? JSON.parse(window.localStorage.getItem("boards")) : {}

    return (
        <MainPageWrapper>
            <h1>CLX Boards</h1>
            <CustomRow style={{ flexFlow: "wrap" }}>
                <Button className="create-board-btn" onClick={() => {
                    let key = Date.now().toString(6)
                    history.push(`/board/${key}`)
                    boards[key] = { title: `Board ${Object.keys(boards).length + 1}` }
                    window.localStorage.setItem("boards", JSON.stringify(boards))
                }}>
                    Create New Board
                </Button>
                {boards && Object.keys(boards).map((el, k) => {
                    return (
                        <div className="boards-preview-container" onClick={() => history.push(`/board/${el}`)}>
                            <img src={boards[el].image} height="100px" width="200px" />
                            <p>{boards[el].title}</p>
                        </div>
                    )
                })}
            </CustomRow>
        </MainPageWrapper>
    )
}