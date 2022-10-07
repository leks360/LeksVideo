import React, { useState } from 'react'
import { useEffect } from 'react';
import styled  from 'styled-components';
import { Card } from '../components/Card';
import axios from 'axios';
import { axiosInstance } from '../config';
const  Container =styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`

export default function Home({type}) {
    
    const [video,setVideo]=useState([]);
    console.log()
    useEffect(()=>{
        const fetchVideo=async()=>{

            const res=await axiosInstance.get(`/video/${type}`,{withCredentials: true, credentials: 'include'});
            setVideo(res.data);
        };
        fetchVideo();
    },[type]);
    return (
        <Container>
            {video.map((video)=>(
                <Card key={video._id} video={video}/>
            ))};
            
            

        </Container>
    )
}
