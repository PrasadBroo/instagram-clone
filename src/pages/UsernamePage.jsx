import React from 'react'
// eslint-disable-next-line
import { useParams } from 'react-router-dom'
import Navbar from '../components/auth/Navbar';
import ProfileMain from '../components/auth/ProfileMain';


export default function UsernamePage() {
    //const { username } = useParams();
    return (
        <>
            <Navbar/>
            <ProfileMain/>
            
        </>
       
    )
}
