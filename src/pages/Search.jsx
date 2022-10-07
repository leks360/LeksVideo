import React, { useEffect,useState} from 'react'
import styled  from 'styled-components';
import videoSlice from '../redux/videoSlice';
import { useLocation } from 'react-router-dom';
import { Card } from '../components/Card';
import axios from 'axios';
import { axiosInstance } from '../config';
const Container=styled.div`
    display: flex;
    flex-wrap: wrap;
    gap:10px;
`
export default function Search(props) {
    const  [videos,setVideos]=useState([]);
    const query=useLocation().search;
    
    useEffect(()=>{
        const fet=async()=>{
            console.log("calling");
            try{
            const res=await axiosInstance.get(`video/search${query}`,{withCredentials: true, credentials: 'include'});
            setVideos(res.data);
            }catch(er){
                console.log(er.message);
            }
            
        }
        fet();
    },[query]);
    console.log(query,"QUERY");
    console.log(videos);

    return <Container>
         {videos.map(video=>(
             <Card key={video._id} video={video}/>   
         
        ))}
       </Container>
    
}
