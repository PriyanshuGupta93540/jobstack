import React from 'react'
import HomeBanner from '../components/HomeBanner'
import HomeCompOne from '../components/HomeCompOne'
import HomeCompTwo from '../components/HomeCompTwo'
import HomeCompThree from '../components/HomeCompThree'
import HomeCompFour from '../components/HomeCompFour'
import HomeCompFive from '../components/HomeCompFive'
import HomeCompSix from '../components/HomeCompSix'

const HomeScreen = () => {
    return (
        <div>
            <HomeBanner />
            <HomeCompOne />
            <HomeCompTwo />
            <HomeCompThree />
            <HomeCompFour/>
            <HomeCompFive/>
            <HomeCompSix/>
        </div>
    )
}

export default HomeScreen
