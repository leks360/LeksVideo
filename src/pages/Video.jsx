import React from 'react'
import styled from 'styled-components';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ShareIcon from '@mui/icons-material/Share';
import Comments from '../components/Comments.jsx';
import Comment from '../components/Comment.jsx';
import { Card } from '../components/Card.js';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import {fetchStart,fetchSuccess,fetchFailed, like, dislike,} from '../redux/videoSlice.js';
import {sub} from '../redux/userSlice.js';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import { format } from 'timeago.js';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { axiosInstance } from '../config.js';
const Container=styled.div`
    display: flex;
    gap:24px;
`
const Content=styled.div`
    flex:5;
`

const VideoWrapper=styled.div`
    
`
const Title=styled.h1`
    font-size: 18px;
    font-weight: 400;
    margin:10px 0px 10px 0px;
    color:${({theme})=>theme.text};
`
const Details=styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

`
const Info=styled.span`
    
    color:${({theme})=>theme.textSoft};
`

const  Buttons=styled.div`
    display: flex;
    gap:20px;
    color:${({theme})=>theme.text};
   
    justify-content:flex-end;
`
const Button=styled.div`
    display: flex;
    align-items: center;
    gap:3px;
    cursor: pointer;
`
const Hr=styled.hr`
   margin:15px 0;
   
   border: 0.3px solid ${({theme})=>theme.soft};
   
`
const Channel=styled.div`
    display: flex;
    justify-content: space-between;
`
const ChannelInfo=styled.div`
    display: flex; 
    gap:20px;
`
const SubscribeBtn=styled.button`
    background-color:#cc1a00;
    font-weight: 500;
    border:none;
    color:white;
    border-radius: 3px;
    height:max-content;
    cursor: pointer;
    padding: 10px 20px;

`
const Image=styled.img`
    height: 50px;
    width: 50px;
    object-fit: cover;
    border-radius: 50%;

`
const ChannelDetail=styled.div`
    display: flex;
    flex-direction: column;
    color: ${({theme})=>theme.text};
`
const ChannelName=styled.span`
    font-weight: 500;
`
const ChannelCounter=styled.span`
    margin-top: 5px;
    margin-bottom: 20px;
    font-size: 12px;
    color: ${({theme})=>theme.textSoft};
`
const ChannelDecs=styled.p`
    font-size: 14px;;
`
const Recom=styled.div`
    flex:2;   
`
const VideoFrame=styled.video`
    max-height:720px;
    width:100%;
    object-fit: cover;

`
export default function Video(props) {
    
    const {currentUser}=useSelector((state)=>state.user);
    const {currentVideo}=useSelector((state)=>state.video);
    
    const dispatch=useDispatch();
    const path=useLocation().pathname.split('/')[2];
    console.log(path,"PATHHHH");
    const [channel,setChannel]=useState({});
    const [comment,setCommen]=useState("");
    console.log(currentUser,"CURRENT USER IN VIDEO");
    useEffect(()=>{
        const fetchVid=async()=>{
            
            try{
                const videoRes=await axiosInstance.get(`/video/find/${path}`);
                
                const channelRes=await axiosInstance.get(`/users/find/${videoRes.data.userId}`);
                console.log(videoRes,"videoress");
                dispatch(fetchSuccess(videoRes.data));
                setChannel(channelRes.data);
            }catch(er){
                console.log(er.message);
            }
        }
        fetchVid();
    },[path,dispatch]);
    const handleLike=async()=>{
        await axiosInstance.put(`/users/like/${currentVideo._id}`,{},{withCredentials: true, credentials: 'include'});
        dispatch(like(currentUser._id));
    }
    const handleDislike=async()=>{
        await axiosInstance.put(`/users/unlike/${currentVideo._id}`,{},{withCredentials: true, credentials: 'include'});
        dispatch(dislike(currentUser._id));
    }

    console.log(currentUser,"CURRENT CIDEO");
    const handlesub=async()=>{
        await axiosInstance.put(`/users/sub/${channel._id}`,{},{withCredentials: true, credentials: 'include'});
        dispatch(sub(channel._id));
    }
    return (
        <Container>
            <Content>
                <VideoWrapper>
                    <VideoFrame src={currentVideo.videoUrl} controls>

                    </VideoFrame>
                </VideoWrapper>
                <Title>{currentVideo.title}</Title>
                <Details>
                    <Info>{currentVideo.views} views {format(currentVideo.createdAt)} </Info>
                    <Buttons>
                        <Button onClick={handleLike}>
                        {currentVideo.likes?.includes(currentUser?._id)?
                            (<ThumbUpIcon/>):(<ThumbUpOutlinedIcon/>)}{" "}
                            {currentVideo.likes?.length}
                            </Button>
                        <Button onClick={handleDislike}>
                        {currentVideo.dislikes?.includes(currentUser?._id)?
                            ( <ThumbDownIcon/>):(<ThumbDownOutlinedIcon/>)}{" "}
                            {currentVideo.dislikes?.length}
                           
                            </Button>

                        <Button><ShareIcon/>Share</Button>
                    </Buttons>
                </Details>
                <Hr/>
                <Channel>
                    <ChannelInfo>
                        <Image src={channel.img}></Image>
                        <ChannelDetail>
                            <ChannelName>
                                {channel.name}
                            </ChannelName>
                            <ChannelCounter>{channel.subsribers} subscribers</ChannelCounter>
                            <ChannelDecs>{currentVideo.decs}</ChannelDecs>
                        </ChannelDetail>
                    </ChannelInfo>
                    <SubscribeBtn onClick={handlesub}>{currentUser?.subscribedUsers?.includes(channel._id)?"Unsub":"Sub"}</SubscribeBtn>
                </Channel>
                <Hr/>
                <Comments videoId={currentVideo._id}/>
                
            </Content>
            <Recom>
                
                
                
            </Recom>
        </Container>
    )
}
