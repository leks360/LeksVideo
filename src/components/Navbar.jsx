import React from 'react'
import  styled  from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { logout } from '../redux/userSlice';
import { current } from '@reduxjs/toolkit';
import Upload from './Upload.jsx';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import  axios  from 'axios';
import { axiosInstance } from '../config';
const Container=styled.div`
position: sticky;
top:0;
background-color: ${({theme}) =>theme.bgLighter};
height: 56px;
`
const Wrapper=styled.div`
  position:relative;
  display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    padding: 0px 20px;
`
const Search=styled.div`
  width: 50%;
  position:absolute;
  left:0;
  right:0;
  margin:auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding:5px;
  border:1px solid #ccc;
  border-radius: 3px;
`
const Input=styled.input`
  border:none;
  background-color: transparent;
  width: 100%;
  height: 100%;
  outline: none;
  color:white;

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
const User=styled.div`
    display: flex;
    align-items: center;
    gap:10px;
    font-weight: 500;

`
const Avatar=styled.img`
    width: 32px;
    height:32px;
    border-radius: 50%;
    background-color: yellow;
`
const Logout=styled.div`
    position:absolute;
    top:100%;
    width: 100px;
    background-color:orange;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
`
export default function Navbar(props) {
     
    const {currentUser}=useSelector(state=>state.user);
    const navigate=useNavigate();
    const [log,setlog]=useState(false);
    const dispatch=useDispatch();
    const logOut=async()=>{
        console.log("ok");
        dispatch(logout());
        await axiosInstance.post('/auth/logout/',{},{withCredentials: true, credentials: 'include'});
        navigate("/");
        window.location.reload(false);
    }
    const [open,setOpen]=useState(false);
    const [q,setQ]=useState("");
    
    return (
        <>
        <Container>
            <Wrapper>
                <Search>
                    <Input placeholder='search' onChange={(e)=>setQ(e.target.value)}/>
                    <SearchIcon onClick={()=>navigate(`/search?q=${q}`)}/>
                </Search >
                {currentUser? 
                (<>
                <User onClick={()=>setlog(!log)}>
                    <VideoCallIcon onClick={()=>setOpen(true)}/>
                    <Avatar src={currentUser.img}/>{currentUser.name}
                    {log && <>
                        
                        <Logout onClick={logOut}>LogOut</Logout>
                        
                        </>
                    }
                </User>
                
                </>):
                (<Link to="/signin" style={{textDecoration:"none"}}>
                
                <Button><AccountCircleIcon/>Login</Button>
                
                </Link>)};
                
            </Wrapper>
        </Container>
        {open && <Upload setOpen={setOpen}/>}
        </>
    )
}
