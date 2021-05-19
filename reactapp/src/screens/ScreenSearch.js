import React, { } from 'react';
import '../App.css';
import '../styles/search.css';
import Nav from '../components/Nav'
import { Input } from 'antd';


import RedButton from '../components/RedButton';



function ScreenSearch() {

    const onSearch = value => console.log(value);
    return (
        <div className="search" style={{ display: "flex", flexDirection: 'column', height: '100vh' }}>
            <Nav />
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{display:'flex',justifyContent: 'center', alignItems: 'center', width:'30%', marginTop:'2%', flexDirection:'row'  }} >                
                <Input placeholder="Recherche (Région)" />
                <RedButton title = 'Rechercher'></RedButton>
                </div>
            </div>
        </div>


    )
}
export default ScreenSearch;