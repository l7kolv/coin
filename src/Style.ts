import styled from "styled-components";

export const Title = styled.h1 `
color:${props => props.theme.accentColor};
font-size: 48px;
`;

export const Container = styled.div `
padding: 0px 20px;
`

export const Header = styled.header `
height : 10vh;
margin-top: 100px;
display: flex;
justify-content: center;
align-content: center;

button {
    height: 30px;
}
`

export const CoinsList = styled.ul`

`

export const Coin = styled.li`
background-color: white;
color:${props => props.theme.textColor};
margin-bottom: 10px;
border-radius: 15px;
a{
    transition: color 0.2s ease-in;
    display: block;
    padding: 20px;

}
&:hover {
    a{
        color:${props => props.theme.accentColor}
    }
}

`
export const CoinWrapper = styled.div`
display: flex;
align-items: center;

`
export const Img = styled.img `
width: 25px;
height: 25px;
margin-right: 15px;
`

export const Loader = styled.span`
text-align: center;
display: block;
`

export const InfoWrap = styled.div `
    width: 100%;
    background: #ccc;
    height: 60px;
    border-radius: 10px;
    color:#333;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 24px;
    
    h4{
        font-size: 20px;
        margin-bottom: 4px;
    }
    span{
        display: block;
        text-align: center;
    }
  
`

export const ButtonGroup = styled.div `
display: flex;
width: 100%;
justify-content: space-between;
margin-bottom: 24px;

a{
    display: block;
    width: 100%;
}

`

export const Button = styled.button<{isActive : boolean}>`
cursor: pointer;
    width: 98%;
    font-size: 24px;
    height: 50px;
    border-radius:10px;
    background: ${props =>  props.isActive ? "#6382a1" : "#ccc"};

`