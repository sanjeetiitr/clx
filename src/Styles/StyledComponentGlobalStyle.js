import styled, { createGlobalStyle } from 'styled-components'

export const CustomRow = styled.div`
    flex-direction : row;
    display : flex;
    align-items : ${(props) => props.align || "unset"};
    justify-content : ${(props) => props.justify || "unset"};
    height : ${(props) => props.height || 'unset'};
    width : ${(props) => props.width || 'unset'};
    padding : ${(props) => props.padding || '0'};
    margin : ${(props) => props.margin || '0'};
`

export const CustomColumn = styled.div`
    flex-direction : column;
    display : flex;
    align-items : ${(props) => props.align || "unset"};
    justify-content : ${(props) => props.justify || "unset"};
    height : ${(props) => props.height || 'unset'};
    width : ${(props) => props.width || 'unset'};
    padding : ${(props) => props.padding || '0'};
    margin : ${(props) => props.margin || '0'};
`
export const CustomButton = styled.button`
  font-size: ${(props) => props.mobile ? "16px" : "16px"};
  font-weight: 500;
  cursor : pointer;
  padding : ${(props) => props.mobile ? "9px 30px" : "8px 10px"};
  color : black;
  background : white;
  border : none;

   &:hover{
    border : none;
    outline : none;
    background : #ededed;
   }
      
   &:focus{
    border : none;
    outline : none;
   }
      
   &:active{
    border : none;
    outline : none;
   }
   &:disabled{
    border : none;
    outline : none;
    background: #ededed;
   }
   
   &.selected{
    border : none;
    outline : none;
    background: #ededed;
   }
` 