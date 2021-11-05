import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext'
import CarouselImages from '../layout/CarouselImages';

const Home = () => {
    const authContext = useContext(AuthContext);

   {/*} useEffect(() => {
        authContext.loadUser();
        //eslint-disable-next-line
    }, []); */}

    return (
        <div>
            <CarouselImages />
        </div>
    )
}

export default Home

