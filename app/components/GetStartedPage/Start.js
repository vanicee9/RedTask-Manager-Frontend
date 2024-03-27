'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import './Start.scss';
import '../Button/button';

const Start = () => {
    const router = useRouter();

    const redirectToSignup = () => {
        router.push('/signup');
    };
    
    return (
        <div className="get-started-page">
            <div className="content">
                <h1>
                    <span className="logo">RedTask.</span> Get Started with <span className="task-manager">Task Manager</span>
                </h1> 
                {/* <div>
                <CustomButton text ="LOGIN"/>
                <CustomButton text ="SIGNUP"/>
                </div> */}
                <p>Start managing your tasks efficiently today!</p>
            
                <button className='centered' onClick={redirectToSignup}>Get Started</button>
            </div>
            <div className='get-started-img'><img src="https://img.freepik.com/premium-vector/time-management-with-clock-checklist-target-time-organization-efficiency-concept_530733-2090.jpg" alt="" /></div>
        </div>
    );
};

export default Start;
