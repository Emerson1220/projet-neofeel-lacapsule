/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import '../App.css';

//COMPONENTS
import Nav from '../components/Nav';
import Map from '../components/Map';
import Neopass from '../components/Neopass';
import CardRoadPlanner from '../components/CardRoadPlanner';
import { Popover, Button } from 'antd';
//REDUX
import { connect } from 'react-redux';

function ScreenRoadPlanner(props) {
    //STATE HOOKS
    const [experienceList, setExperienceList] = useState([]);
    const [total, setTotal] = useState(null);
    //EFFECT HOOKS
    useEffect(() => {
        setExperienceList(props.roadplanner.experiences)
        setTotal(getTotal(props.roadplanner.experiences))
    }, [props.roadplanner])

    const content = (
        <div>
            {Neopass}
        </div>
    );


    let cards = []
    if (experienceList.length > 0) {
        cards = experienceList.map((e, i) =>

            <CardRoadPlanner key={i}
                id={e._id}
                name={e.name}
                activity={e.activity}
                activityType={e.activityType}
                region={e.region}
                tags={e.tags}
                subtitle={e.subtitle}
                activityTime={e.activityTime}
                budget={e.budget}
                imageBannerUrl={e.description.imageBannerUrl}
                city={e.city}
                coordinate={e.coordinate}
            >
            </CardRoadPlanner>
        )
    }

    //FUNCTIONS
    const getTotal = (arr) => {
        return arr.reduce((a, c) => { return a + c.advantageAmount }, 0);
    }

    return (
        <div>
            <Nav />

            <div style={styles.container}>
                <div style={{ display: 'flex', justifyContent: 'center', width: '2%' }}>
                    <Map mode='roadplanner'></Map>
                </div>

                <div style={styles.row}>
                    <div style={styles.col_xl_9}>
                        <div style={{ marginBottom: '40px' }}> {/* Filters */}
                            <div style={styles.avantage}>
                                <h3>Vous avez cumulé <span>{total}</span>€ d'avantages dans votre séléction</h3>
                                <button>Achetez votre Neopass pour seulement 60€</button>
                                <Popover content={content} title="Title">
                                    <Button type="primary">Information</Button>
                                </Popover>
                            </div>
                        </div>

                        <div style={styles.experiences_list_area}>
                            {cards}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
};


function mapStateToProps(state) {
    return { user: state.user, roadplanner: state.roadplanner }
}

export default connect(
    mapStateToProps,
    null
)(ScreenRoadPlanner);

let styles = {

    // CSS - ARCHITECTURE//

    container: {
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        paddingTop: '1rem',
        marginRight: '1rem',
        marginLeft: '1rem',
    },

    row: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: '1rem',
    },

    col_xl_9: {
        position: 'relative',
        width: '100%',
        minHeight: '.1rem',
        paddingRight: '1.5rem',
        paddingLeft: '1.5rem',
    },

    avantage: {
        background: '#e06868',
        textAlign: 'center',
        color: '#fff',
        width: '100%',
        marginBottom: '1rem',
        padding: '.5rem',
    },

    experiences_list_area: {
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        boxSizing: 'border-box',
        outline: 'none',
        paddingLeft: '1rem',
        paddingRight: '1rem',

    }

}
