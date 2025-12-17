import React from 'react'
import Navbar from '../components/Navbar'
import TechCompOne from '../components/TechCompOne'
import OtherBanner from '../components/OtherBanner'

const TechScreen = () => {
    return (
        <div>
            <Navbar />
            <OtherBanner
                title="Grid Style Jobs 01"
            />
            <TechCompOne />
        </div>
    )
}

export default TechScreen
