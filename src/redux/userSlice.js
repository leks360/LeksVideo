import {createSlice} from  '@reduxjs/toolkit'

const initialState={
    currentUser:null,
    loading:false,
    error:false,

}
export const UserSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
      loginStart:(state)=>{
        state.loading=true;
      },
      loginSuccess:(state,action)=>{
        state.currentUser=action.payload;
        state.loading=false;
      },
      loginFailure:(state)=>{
        state.currentUser=null;
        state.loading=false;
        state.error=true;
      },
      logout:(state)=>{
        state.currentUser=null;
        state.loading=false;
        state.error=false;
      },
      sub:(state,action)=>{
        if(state.currentUser.subscribedUsers.includes(action.payload)){
          state.currentUser.subscribedUsers.splice(state.currentUser.subscribedUsers.findIndex((idd)=>idd===action.payload),1);
        }else{
          state.currentUser.subscribedUsers.push(action.payload)
        }
      }
    }
});

export const {loginFailure,loginStart,loginSuccess,logout,sub}=UserSlice.actions;
export default UserSlice.reducer;