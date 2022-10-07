import React from 'react';
import styled from 'styled-components';
import ytube from '../img/logo.png';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import HistoryIcon from '@mui/icons-material/History';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HighlightIcon from '@mui/icons-material/Highlight';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Container =styled.div`
 flex:1;
 position: sticky;
 top:0;
 background-color:${({theme}) =>theme.bg};
 height:100vh;
 color:${({theme}) =>theme.text};
 font-size:14px;
`
const Wrapper =styled.div`
 padding:18px 26px;

`
const Logo=styled.div`
    display:flex;
    gap:5px;
    font-weight:bold;
    margin-bottom:15px;
`
const Img=styled.img`
    height:30px;
`
const Item=styled.div`
    display:flex;
    align-items:center;
    gap:20px;
    cursor:pointer;
    padding:7.5px 0;
    &:hover{
        background-color: ${({theme}) =>theme.soft};;
    }

`
const Hr=styled.hr`
 margin:10px 0;
 border:0.5px solid ${({theme}) =>theme.soft};
`
const Login=styled.div`

`
const Button=styled.button`
padding:5px 5px;
background-color: transparent;
border:1px solid #3ea6ff;
color:#3ea6ff;
border-radius: 3px;
font-weight: 500;
margin: 10px;
display: flex;
align-items: center;
gap:5px;
cursor: pointer;
`
function Menu({darkMode,setDarkMode}) {
    
    const {currentUser}=useSelector(state=>state.user);

    return (
        <Container>
        <Wrapper>
        
        <Link to="/" style={{textDecoration:"none",color:"inherit"}}>
        <Logo><Img/><h3>Leks Video Share</h3></Logo>
        </Link>
        <Item>
        <HomeIcon />Home
        </Item>

        <Link to="/trend" style={{textDecoration:"none",color:"inherit"}}>
        <Item>
        <ExploreIcon />Explore
        </Item>
        </Link>
        <Link to="/subvideo" style={{textDecoration:"none",color:"inherit"}}>
        <Item>
        <SubscriptionsIcon />Subsription
        </Item>
        </Link>

        <Hr/>
        {!currentUser &&  <>
        <Login>
        Sign in to Like,comment  subsrube.
        <Link to="/signin"  style={{textDecoration:"none",color:"inherit"}}>
        <Button><AccountCircleIcon/> Sign In</Button>
        </Link>
        </Login>
        <Hr/>
        </>}
       
        <Item>
        <LibraryBooksIcon />Library
        </Item>
        
        <Item>
        <HistoryIcon />History
        </Item>
        
        <Item>
        <LibraryMusicIcon />Music
        </Item>

        <Hr/>
        
        <Item>
        <SportsBaseballIcon />Sports
        </Item>
        <Item>
        <SportsEsportsIcon />Gamming
        </Item>
        
        <Item  onClick={()=>setDarkMode(!darkMode)}>
        <HighlightIcon />
        {darkMode?"Light Mode":"Dark Mode"}
        </Item>

       </Wrapper>
       </Container>
    )
}

export default Menu;
