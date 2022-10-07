import React, { useEffect, useState } from 'react'
import  styled  from 'styled-components';
import axios, { Axios } from 'axios';
import { axiosInstance } from '../config';
const Container=styled.div`
     display: flex;
    align-items: center;
    gap:25px;
    margin:30px 0px;
`

const Avatar=styled.img`
    height:50px;
    width: 50px;
    border-radius: 50%;
    object-fit: cover;  `;

const Details=styled.div`
 display: flex;
 flex-direction: column;
 gap:10px;
`
const Title=styled.span`
    font-size: 14px;
    font-weight: 500;
    color:${({theme})=>theme.text};
`
const Date=styled.span`
    font-size:12px;
    font-weight: 400;
    color:${({theme})=>theme.soft};
    margin-left: 5px;
    `;
const Text=styled.span`
    font-size: 14px;
    color:${({theme})=>theme.textSoft};
`;
export default function Comment({com}) {
    
    const [poster,setposter]=useState({});
    useEffect(()=>{
            const fet=async()=>{
                try{
                const res=await axiosInstance.get(`/users/find/${com.userId}`);
                //console.log(res,"wtffff");
                setposter(res.data);
                }catch(er){
                    console.log(er);
                }
            }
            fet();
    },[com.userId]);

    //console.log(poster,"poster");
    
    return (
        <Container>
            
            <Avatar src={poster.img}></Avatar>
            <Details>
   
                        <Title>{poster.name} <Date>12th oct 2021</Date></Title>
                
                        <Text>{com.decs}</Text>
        
            </Details>
        </Container>
            
    )
}
