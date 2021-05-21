import React, { useState, useEffect } from 'react';
import '../App.css';
import '../styles/search.css';
import Nav from '../components/Nav'
import { Select } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Map from '../components/Map';
import ExperienceList from '../components/ExperienceList';
import RedButton from '../components/RedButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListOl, faMapMarked } from '@fortawesome/free-solid-svg-icons'

const { Option } = Select;





function ScreenSearch(props) {
    //STATE HOOKS
    const [region, setRegion] = useState(props.region)
    const [display, setDisplay] = useState('map');

    useEffect(()=>{
        selectRegion();
    }, [])

    //FUNCTIONS
    //get experiences
    var selectRegion = async () => {
        if (region !== 'none') {
            let rawResponse = await fetch('/searchregions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `region=${region}`
            })
            let response = await rawResponse.json();
            props.onSearch(response.data)
        }
    }

    
    //display toggles
    function OnclickMap() {
        setDisplay('map');
    }
    function OnclickExperienceList() {
        setDisplay('ExperienceList')
    }

    let displaySelection;
    if (display === 'map') {
        displaySelection =
            <Map></Map>
    } else if (display === 'ExperienceList') {
        displaySelection =
            <ExperienceList></ExperienceList>
    }

    return (
        <div className="search" style={{ height: '100vh', alignItems: 'center' }}>
            <Nav />
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%', marginTop: '2%', flexDirection: 'row' }} >
                    <div className='categorieSelect'>
<<<<<<< HEAD
                        <FontAwesomeIcon onClick={() => OnclickMap()} icon={faMapMarked} style={{ cursor: 'pointer', height: '25px', width: 'auto', marginRight: '8px', color: 'white' }} />
                        <FontAwesomeIcon onClick={() => OnclickExperienceList()} icon={faListOl} style={{ cursor: 'pointer', height: '25px', width: 'auto', marginRight: '8px', color: 'white' }} />
=======
                        <FontAwesomeIcon onClick={() => OnclickMap()} icon={faMapMarked} style={{ color: '#fff', cursor: 'pointer', height: '25px', width: 'auto', marginRight: '8px' }} />
                        <FontAwesomeIcon onClick={() => OnclickExperienceList()} icon={faListOl} style={{ color: '#fff', cursor: 'pointer', height: '25px', width: 'auto', marginRight: '8px' }} />
>>>>>>> emerson
                    </div>
                    <Select showSearch
                        style={{ width: '40%' }}
                        value={region}
                        onChange={(e) => setRegion(e)}
                        placeholder="Recherche (Région)"

                        filterOption={(input, option) =>
                            option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                            optionA.toLowerCase().localeCompare(optionB.toLowerCase())
                        }>
                        <Option value="ges">Alsace-Vosges</Option>
                        <Option value="2">Ile de France</Option>
                        <Option value="3">Bretagne</Option>

                    </Select>
                    <RedButton onSelect={() => selectRegion()} title='Rechercher'></RedButton>
                    <Link to= {'/suggestion'}>
                        <RedButton onSelect={()=> console.log('Result Good')} title="Suggestion de voyages"></RedButton>
                    </Link>

                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {displaySelection}
                </div>

        </div>


    )
}

function mapDispatchToProps(dispatch) {
    return {
        onRegionClick: function (region) {
            dispatch({ type: 'selectRegion', region: region })
        },
        onActivityClick: function (activities) {
            dispatch({ type: 'selectActivities', activities: activities })
        },
        onSearch: function (data) {
            dispatch({ type: 'search', experiences: data })
        }
    }
}

function mapStateToProps(state) {
    return {
        region: state.region
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenSearch);

