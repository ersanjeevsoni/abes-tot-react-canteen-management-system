import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/homePage";
import ProductsPage from "./pages/productsPage";
import SignUpPage from "./pages/signUpPage";
import LoginPage from "./pages/loginPage";
import { useEffect, useState } from "react";

const App = () => {
    const [user,setUser]=useState({isLoggedIn:false, name:"Guest"});

    const checkLoggedIn=async()=>{
        const resp=await fetch("http://localhost:1500/api/v1/isLoggedIn",{
            credentials:"include",
        });
        const respObj=await resp.json();
        if(resp.status===200){
          setUser({
            isLoggedIn:true,
            email:respObj.data.email,
            name:respObj.data.name
          })
        }
    };
    useEffect(()=>{
        checkLoggedIn();
    },[]);
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={<HomePage />} /> */}
                <Route path="/" element={user.isLoggedIn? <HomePage />:<Navigate to="/sign-up"/>} />
                <Route path="/products" element={user.isLoggedIn? <ProductsPage/>:<Navigate to="/sign-up"/>} />
                <Route path="/sign-up" element={user.isLoggedIn? <Navigate to="/products"/>:<SignUpPage />} />
                <Route path="/login" element={user.isLoggedIn? <Navigate to="/products"/>:<LoginPage />} />

            </Routes>
        </BrowserRouter>
    );
};

export default App;
