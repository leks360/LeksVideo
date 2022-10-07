import React, { useState } from 'react'
import styled  from 'styled-components';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';
import {auth,provider} from '../firebase.js';
import {signInWithPopup} from 'firebase/auth';
import { axiosInstance } from '../config';
const Container=styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height:calc(100vh - 120px);
    color:${({theme})=>theme.text};
`;
const Wrapper=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding:25px;
    background-color:${({theme})=>theme.bgLighter};
    border:1px solid ${({theme})=>theme.soft};
    gap:10px;
`;

const Title=styled.h1`
    font-size:24px;
`
const Subtitle=styled.h2`
    font-size: 17px;
    font-weight: 300;
`
const Input=styled.input`
    border:1px solid grey;
    border-radius: 3px;
    padding:10px;
    background-color:transparent;
    width: 100%;
`
const Button=styled.button`
    border: none;
    border-radius: 5px;
    padding:10px 20px;
    background-color: ${({theme})=>theme.soft};;
    color:${({theme})=>theme.text};
`
const More=styled.div`
    
`

export default function SignIn(props) {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const dispatch=useDispatch();
    const handleLogin=async(e)=>{
        e.preventDefault();
        dispatch(loginStart());
        try{
            const res=await axiosInstance.post("/auth/signin",{name,password},{withCredentials: true, credentials: 'include'});
            console.log(res.data);
            dispatch(loginSuccess(res.data));
        }catch(er){
            dispatch(loginFailure());
        }
    }
    const signGoogle=async()=>{
        dispatch(loginStart());
        signInWithPopup(auth,provider).then(async(result)=>{
            
             await axiosInstance.post('/auth/google',{
               name:result.user.displayName,
               email:result.user.email,
               img:result.user.photoURL 
            },{withCredentials: true, credentials: 'include'}).then((res)=>{
                
                dispatch(loginSuccess(res.data));
            });
        }).catch((er)=>{
            dispatch(loginFailure());
        });
    }
    return (
        <Container>
            <Wrapper>
            <Title>Sign In</Title>
            <Subtitle>To continue to Youtube</Subtitle>
            <Input placeholder="Username" onChange={(e)=>setName(e.target.value)}/>
            <Input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
            <Button onClick={handleLogin}>Sign In</Button>
            <Title>OR</Title>
            <Title>Sign In</Title>
            <Subtitle>To continue to Youtube</Subtitle>
            <Input placeholder="Username" 
            onChange={(e)=>setName(e.target.value)}/>
            <Input type="email" placeholder="email"
            onChange={(e)=>setEmail(e.target.value)}/>
            <Input type="password" placeholder="password"
            onChange={(e)=>setPassword(e.target.value)}/>
            <Button>Register In</Button>

            <Button onClick={signGoogle}>Sign in with Google</Button>
           </Wrapper>
        </Container>
    )
}
