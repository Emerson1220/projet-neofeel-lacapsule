import React, { useState } from 'react';
import '../App.css';
import '../styles/Home.css';
import { Link, Redirect } from 'react-router-dom';

//UI
import RedButton from '../components/RedButton'

//COMPONENTS
import Nav from '../components/Nav'
import SearchModal from '../components/SearchModal'

//REDUX
import { connect } from 'react-redux';

function ScreenHome(props) {
    //STATE HOOKS
    const [visible, setVisible] = useState(false);
    const [search, setSearch] = useState(null);

    //FUNCTIONS
    //modal
    const showModal = () => {
        setVisible(!visible);
    };

    const searchTrips = (selection) => {
        setSearch(selection);
    };

    if (search === 'region') {
        return <Redirect to='/recherche' />
    } else if (search === 'trips') {
        return <Redirect to='/suggestions' />
    } else {
        return (
            <div className="home" style={{ display: "flex", flexDirection: 'column', height: '100vh', width: '100%' }}>
                <Nav />
                <div style={{
                    flexDirection: 'column', height: '100vh ', display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)' }} >
                    <div>
                        <div style={{
                            width: '70%',
                            height: '100vh',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(16, 98, 113, 0.3)',

                        }}>
                            <h2 style={{ color: '#FFF', marginLeft: '6%', marginRight: '3%' }}>
                                Neofeel développe une tendance innovante du tourisme éthique.
                                L’esprit libre, profitez de notre carnet d’adresses variées.
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'row', height: '35%', width: '80%', justifyContent: 'space-around', alignItems: 'center' }}>
                                <img
                                    style={{ height: '45%', width: 'auto', borderRadius: 15, marginRight: '3%' }}
                                    src='/images/neopassRecto.png'
                                    alt='neopass'
                                />
                                <h3 style={{ color: '#FFF' }}>
                                    Bénéficiez d’avantages <br />particuliers avec le Neopass...
                                </h3>
                            </div>
                            <div style={{ paddingTop: '1%' }}>
                                <Link to={'/info'}>
                                    <RedButton transparent={true} title="Le Concept" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        paddingTop: '44%',
                        paddingRight: '2%'
                    }}>
                        <h1 style={{ color: '#FFF', paddingRight: '1%' }}>Découvrez la France autrement...</h1>
                        <RedButton title="Commencer l'aventure" onSelect={() => showModal()} />
                    </div>
                </div>
                <SearchModal visible={ visible } showModal={ () => showModal() } searchTrips={ searchTrips }/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        region: state.region,
        activities: state.activities
    }
}

export default connect(
    mapStateToProps,
    null
)(ScreenHome);