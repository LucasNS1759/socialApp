import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 view : "feed" , // "feed", "userPost", "comments", "replies"
 selectedPosts : null,
 selectedComments : null
};

const feedSlice = createSlice({
 name : "feed",
 initialState ,
 reducers : {
 
 
 }
})