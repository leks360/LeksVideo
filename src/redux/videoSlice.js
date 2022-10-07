import {createSlice} from  '@reduxjs/toolkit'

const initialState={
    currentVideo:null,
    loading:false,
    error:false,

}
export const VideoSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
      fetchStart:(state)=>{
        state.currentVideo=null;
        state.loading=true;
      },
      fetchSuccess:(state,action)=>{
        state.currentVideo=action.payload;
        state.loading=false;
      },
      fetchFailure:(state)=>{
        state.currentVideo=null;
        state.loading=false;
        state.error=true;
      },
      like:(state,action)=>{
        if(!state.currentVideo.likes.includes(action.payload)){
          state.currentVideo.likes.push(action.payload);
          state.currentVideo.dislikes.splice(state.currentVideo.dislikes.findIndex(userId=>userId===action.payload),1);
        }
      },
      dislike:(state,action)=>{
        if(!state.currentVideo.dislikes.includes(action.payload)){
          state.currentVideo.dislikes.push(action.payload);
          state.currentVideo.likes.splice(state.currentVideo.likes.findIndex((userId)=>userId===action.payload),1);
        }
      },
      
      
    }
});

export const {fetchFailure,fetchStart,fetchSuccess,logout,like,dislike}=VideoSlice.actions;
export default VideoSlice.reducer;