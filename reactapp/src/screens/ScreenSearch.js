import React, {useState } from 'react';
import '../App.css';
import '../styles/search.css';
import Nav from '../components/Nav'
import { Select } from 'antd';

import Map from '../components/Map';
import ExperienceList from '../components/ExperienceList';
import RedButton from '../components/RedButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListOl, faMapMarked } from '@fortawesome/free-solid-svg-icons'

const { Option } = Select;





function ScreenSearch() {

    function OnclickMap() {
        setDisplay('map');    
    }
    function OnclickExperienceList() {
        setDisplay('ExperienceList')
    }

    const [display, setDisplay] = useState('map');
    let displaySelection;
     if (display === 'map') {
        displaySelection=
            <Map></Map>         
    } else if (display ==='ExperienceList') {
        displaySelection =
            <ExperienceList></ExperienceList>
    }

    return (
        <div className="search" style={{ display: "flex", flexDirection: 'column', height: '100vh' }}>
            <Nav />
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%', marginTop: '2%', flexDirection: 'row' }} >
                    <div className='categorieSelect'>
                        <FontAwesomeIcon onClick={() => OnclickMap()} icon={faMapMarked} style={{ cursor :'pointer', height: '25px', width: 'auto', marginRight: '8px' }} />
                        <FontAwesomeIcon onClick={() => OnclickExperienceList()} icon={faListOl} style={{cursor :'pointer', height: '25px', width: 'auto', marginRight: '8px' }} />
                    </div>
                    <Select showSearch
                        style={{ width: '40%' }}
                        placeholder="Recherche (Région)"
                        
                        filterOption={(input, option) =>    
                            option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                            optionA.toLowerCase().localeCompare(optionB.toLowerCase())
                        }>
                        <Option value="1">Alsace-Vosges</Option>
                        <Option value="2">Ile de France</Option>
                        <Option value="3">Bretagne</Option>

                    </Select>
                    <RedButton title='Rechercher'></RedButton>

                    
                </div>
                <div>
                {displaySelection}
                </div>
            </div>
        </div>


    )
}
export default ScreenSearch;