import { view } from '@risingstack/react-easy-state';
import React from 'react'
import Footer from '../components/Footer';
import Navbar from './../components/auth/Navbar';
import PostP from './../components/auth/PostP';



function PostPage() {
    return (
        <div className="Post-Page">
            <Navbar/>
            <PostP/>
            <Footer/>
        </div>  
    )
}
export default view(PostPage)