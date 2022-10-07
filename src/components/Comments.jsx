import React, { useEffect, useState } from 'react'
import styled  from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Comment from './Comment.jsx';
import { axiosInstance } from '../config.js';

const Container=styled.div`
    
`
const NewComment=styled.div`
    display: flex;
    align-items: center;
    gap:25px;
`;
const Avatar=styled.img`
    height:50px;
    width: 50px;
    border-radius: 50%;
    object-fit: cover;  `;
const Input=styled.input`
    border:none;
    border-bottom: 1px solid ${({theme})=>theme.soft};
    background-color: transparent;
    padding:5px;
    width: 100%;
    outline: none;
`;

export default function Comments({videoId}) {
    
    const {currentUser}=useSelector((state)=>state.user);
    
    const [comment,setComment]=useState("");
    const [comments,setComments]=useState([]);
    const path=useLocation().pathname.split('/')[2];
    console.log(comment);
    const handle=async(e)=>{
        console.log(e.key);
        if(e.key=="Enter"){
        await axiosInstance.post('/comment/',{userId:currentUser._id,decs:comment,videoId:path},{withCredentials: true, credentials: 'include'});
        }
    }
    useEffect(()=>{
        const fetchComments=async()=>{
            try{
                const res=await axiosInstance.get(`/comment/${videoId}`);
                setComments(res.data);
            }catch(er){

            }
        };
        fetchComments();
    },[videoId]);
    
    console.log(comments,"all the commens");
    
    return (
        <Container>
            {currentUser &&<NewComment>
            
                <Avatar src={currentUser.img}></Avatar>
                <Input  placeholder="Add your comments" value={comment} onKeyPress={handle} onChange={(e)=>setComment(e.target.value)}></Input>
            </NewComment>}
            {comments.map((c)=>{
              //  console.log("passing ",c.userId);
                return<>
                <Comment videoId={videoId} com={c}/>    
                </>
            })}
          
           
        </Container>
            
    )
}
