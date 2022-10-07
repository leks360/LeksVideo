import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {format} from 'timeago.js';
import axios from 'axios';
import { axiosInstance } from '../config';
const Container =styled.div`
    width:  ${(props)=>props.type=="sm"? "360px":"300px"};
    margin-bottom: ${(props)=>props.type=="sm"? "10px":"45px"};
    cursor: pointer;
    display:${(props)=>props.type=="sm" && "flex"};
    gap:10px;
`
const Image =styled.img`
    width: 100%;
    height:${(props)=>props.type=="sm"?"120px":"202px"};;
   background-color: #999;
   flex:1;
`
const Details =styled.div`
    display: flex;
    margin-top: ${(props)=>props.type=="sm"? "0px":"10px"};;
    gap:12px;
    flex:1;
`
const ChannelImage =styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    
    display: ${(props)=>props.type=="sm"&& "none"};
    cursor: pointer;
`
const Texts =styled.div`
    
`
const Title =styled.h1`
    font-size: 16px;
    font-weight: 500;;
    color:${({theme}) =>theme.text};
`
const ChannelName =styled.h2`
   font-size: 14px;
   color:${({theme}) =>theme.textSoft};
   margin:5px 0px;
`
const Info =styled.h2`
   font-size: 14px;
   color:${({theme})=>theme.textSoft};
`
export function Card({type, video,}) {
    
    const [user,setUser]=useState([]);
    useEffect(()=>{
        const fetchUser=async()=>{

            const res=await axiosInstance.get(`/users/find/${video.userId}`);
            setUser(res.data);
        };
        fetchUser();
    },[video.userId]);

    return (
    <Link to={`/video/${video._id}`} style={{textDecoration:"none"}}>
        <Container type={type}>
            <Image type={type} src={video.imgUrl}/>
            <Details type={type}>
            <ChannelImage type={type} src={user.img}/>
            <Texts>
                <Title>{video.title}</Title>
                <ChannelName>{user.name}</ChannelName>
                <Info>{video.views} views  ○ {format(video.createdAt)}</Info>

            </Texts>
            </Details>
           
            
        </Container>
    </Link>
    )
}
