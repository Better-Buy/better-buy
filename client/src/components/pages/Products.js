import React from 'react';
import { useLocation } from 'react-router-dom'

export default function Products() {
    const {search} = useLocation()
    console.log(search)

    return (
        <div>
            <h1>Product to show by params</h1>
        </div>
    );
}
