import {create} from "zustand";
import axios from "axios";

// const api_url = import.meta.env.MODE === "development"? "http://localhost:3000/api/auth":"/api/auth";
const api_url = "http://localhost:5001/api/auth";

// axios.defaults.withCredentials = true;

export const useAuthStore = create((set)=>({
    user:null,
    isAuthenticated:false,
    error:null,
    isCheckingAuth:true,
    message:null,
    signup:async(email,name,password)=>{
        set({error:null});
        try{
            const response = await axios.post("http://localhost:5001/api/auth/signup",{name,email,password},{
                headers:{
                    "Content-Type":"application/json"
                }
            });
            console.log(response);
            set({user:response.data.user,isAuthenticated:true});
        }catch(error){
            set({error:error.response.data.message||"Error signing up",isLoading:false});
            throw error;
        }
    },
    verifyEmail:async(code)=>{
        set({error:null});
        try{
            const response = await axios.post(`${api_url}/verifyEmail`,{code});
            set({user:response.data.user,isAuthenticated:true});
        }catch(error){
            set({error:error.response.data.message||"Error verifying email"});
            throw error;
        }
    },
    checkAuth:async()=>{
        set({isCheckingAuth:true,error:null});
        try{
            const response = await axios.get(`${api_url}/check-Auth`);
            set({user:response.data.user,isAuthenticated:true,isCheckingAuth:false});
        }catch(error){
            set({error:null,isCheckingAuth:false,isAuthenticated:false});

        }
    },
    login:async(email,password)=>{
        set({error:null});
        try{
            const response = await axios.post(`${api_url}/login`,{email,password});
            set({user:response.data.user,isAuthenticated:true,error:null});
        }catch(error){
            set({error:error.response.data.message||"Error Logging in"});
            throw error;
        }
    },
    logout:async()=>{
        set({error:null});
        try{
            const response = await axios.post(`${api_url}/logout`);
            set({user:null,isAuthenticated:false,error:null});
        }catch(error){
            set({error:"Error Logging out"});
            throw error;
        }
    },
    forgotPassword:async(email)=>{
        set({error:null});
        try{
            const response = await axios.post(`${api_url}/forgotPassword`,{email});
            set({message:response.data.message});
        }catch(error){
            set({error:error.response.data.message||"Error in sending the password reset mail"});
            throw error;
        }
    },
    resetPassword:async(token,password)=>{
        set({error:null});
        try{
            const response = await axios.post(`${api_url}/resetPassword/${token}`,{password});
            set({message:response.data.message});
        }catch(error){
            set({error:error.response.data.message||"Error in resetting password"});
            throw error;
        }
    }
}));