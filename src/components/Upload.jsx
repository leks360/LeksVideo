import React, { useState } from 'react'
import { useEffect } from 'react';
import styled from 'styled-components';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../config';
const Container=styled.div`
    width:100%;
    height: 100%;
    position: absolute;
    top:0;
    left:0;
    background-color: #00000061; 
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper=styled.div`
    width: 500px;
    height:500px;
    background-color:${({theme}) =>theme.bgLighter};;
    color:${({theme}) =>theme.text};;
    padding:20px;
    display: flex;
    flex-direction: column;
    gap:20px;
    position:relative;
`
const Close=styled.div`
    position:absolute;
    top:10px;
    right:10px;
    cursor: pointer;
`
const Title=styled.h1`
    text-align: center;
`
const Input=styled.input`
 border:1px solid ${({theme})=>theme.soft};
 color:${({theme}) =>theme.text};
 border-radius: 3px;
 padding:10px; 
 background-color: transparent;
 `
 const Decs=styled.textarea`
 border:1px solid ${({theme})=>theme.soft};
 color:${({theme}) =>theme.text};
 border-radius: 3px; 
 padding:10px; 
 background-color: transparent;
 `
 const Button=styled.button`
    
 `
export default function Upload({setOpen}) {
    
    const handle=()=>{
        console.log("ok");
        setOpen(false);
    }
    const navigate=useNavigate();
    const [img,setImg]=useState(undefined);
    const [video,setVideo]=useState(undefined);
    const [imgPerc,setImgPerc]=useState(0);
    const [videoPerc,setVidPerc]=useState(0);
    const [inputs,setInputs]=useState({});
    
    const [tags,setTags]=useState([]);
    const handletags=(e)=>{
        setTags(e.target.value.split(","));
    }
    const uploadFile=(file,urlType)=>{
        console.log(file.size,"FILE SIZE");
        if(file.size>1024*1024*5){
            console.log("sorry it cant be uploaded");
            alert("File size must under 2MiB!");
            
            
        }else{
        const storage = getStorage(app);
        const filename=new Date().getTime()+file.name;
        const storageRef = ref(storage, 'images/' +filename);
        const uploadTask = uploadBytesResumable(storageRef, file);
        
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
    (snapshot) => {
        if(snapshot.totalBytes>1024*1024*5){
            console.log("THE FILE CANNOT BE UPLOADE");
            
        }else{
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            urlType==='imgUrl'?setImgPerc(progress):setVidPerc(progress);
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            }
        }}, 
    (error) => {console.log("There is an error",error.message)}, () => {
        // Upload completed successfully, now we can get the download URL
            console.log("uploaded");
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            
            setInputs((prev)=>{
                
                return {...prev,[urlType]:downloadURL};
            })
        });
    }
    )}
    }
    useEffect(()=>{
        video && uploadFile(video,"videoUrl");
    },[video]);
    
    useEffect(()=>{
        img && uploadFile(img,"imgUrl");
    },[img]);
    const handleChange=(e)=>{
        setInputs((prev)=>{
            return {...prev,[e.target.name]:e.target.value};
        })
    }
    
    console.log(inputs);
    const handleUpload=async(e)=>{
        e.preventDefault();
        const res=await axiosInstance.post('/video/',{...inputs,tags},{withCredentials: true, credentials: 'include'});
        setOpen(false);
        res.status==200 && navigate(`/video/${res.data._id}`);
    }   
    return (
        <Container>
            <Wrapper>
                <Close onClick={handle}>X</Close>
                <Title >Upload Video </Title>
            
                {videoPerc>0 ? ("Uploading: "+videoPerc):(<Input type="file" accept="video/*" onChange={e=>setVideo(e.target.files[0])} />)}
                
                <Input type="text" name="title" placeholder="title" onChange={handleChange}/>
                <Decs type="text" name="decs" placeholder="decs" rows={8} onChange={handleChange}/>
                <Input type="text" placeholder="seperatetags with comma" onChange={handletags}/>
                <Input type="file" accept="image/*"  onChange={e=>setImg(e.target.files[0])}/>
                <Button onClick={handleUpload}>Upload</Button>
            </Wrapper>
        </Container>
    )
}
