import React, { useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RedButton from './RedButton';
import { Cascader } from 'antd'

const ExperienceList = (props) => {
    const [voyageSelect, setVoyageSelect] = useState('');
    const options = [
        {
            value: 'new',
            label: 'Nouveau voyage'
        },
        {
            value: 'saved',
            label: 'Vos voyages',
            children: [
                {
                    value: 'id12345',
                    label: 'Voyage 1'
                },
                {
                    value: 'id23456',
                    label: 'Voyage 2'
                }
            ]
        }
    ];

    function displayRender(label) {
        return label[label.length - 1];
    }

    const onChange = (value) => {
        setVoyageSelect(value)
    };

    const chooseExperience = async(experience) => {
        console.log(voyageSelect[0])
        if (voyageSelect[0] === 'new') {
            createRoadtrip(experience);
        } else {
            addExperience(experience);
        }
    }

    //ajout d'expérience à un voyage existant
    const addExperience = async(experience) => {
        let rawResponse = await fetch('/myroadplanner', {
            method: 'PUT',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `roadtripID=${voyageSelect}&experienceID=${experience._id}`
        })
        let response = await rawResponse.json();
        if (response.result === true) {
            props.onAddExperience(response.roadtrip);
        }
    };

    //création nouveau voyage avec expérience choisie
    const createRoadtrip = async(experience) => {
        if (props.token) {
            let data = {
                token: props.token,
                name: 'Mon Voyage en Alsace',
                region: props.region,
                regionCode: 'ges',
                experience: experience._id
            };
            data = JSON.stringify(data);
            let rawResponse = await fetch('/myroadplanner', {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: `token=${props.token}&name=Mon Voyage en Alsace&region=${props.region}&regionCode=ges&experience=${experience._id}`
            })
        }
        props.onAddExperience(experience);
    }
    /* MAP SUR EXPERIENCES LIST ___________*/
    var ExperienceListing = [];
    if (props.experiences) {
        ExperienceListing = props.experiences.map((experience, i) => {
            var picto = experience.tags.map((image, j) => {
                return (<img key={j} style={styles.picto} src={`images/pictos/${image}-8.png`} alt={image} />)
            })
            return (


                <div key={i} style={styles.experiences_list_area}> {/* Container -> Card expérience */}
                    <div style={styles.single_destinations}> {/* Card expérience */}
                        <div style={styles.image_card}>
                            <img style={styles.image} src={ experience.description.imageBannerUrl ? experience.description.imageBannerUrl : "images/photo-526x360.png" } alt="list" />
                        </div>
                        <div style={styles.detail_card}>
                            <div>
                                <h3><Link style={styles.h3} to="/">{experience.name}</Link></h3>
                                <h4><Link style={styles.h4} to="/">{experience.subtitle}</Link></h4>

                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems:'flex-end' }}>
                                <p style={{ color: '#e06868', marginBottom: '8px' }}><img style={{ marginRight: '4px' }} src="images/icone-geo.png" alt="map" />{experience.region}</p>
                                <h4 ><Link style={styles.h4} to="/">{experience.partner.addresses[0].city}</Link></h4>
                                <div style={{display:'flex', flexWrap:'nowrap'}}>
                                    {picto}
                                </div>

                            </div>
                            {/* <p style={ styles.card_content } >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et.</p> */}
                            <div style={styles.liste_price}>
                                <ul style={styles.liste_price_content, styles.liste_price_li}>
                                    <li><i style={styles.icons_fa} /> Temps</li>
                                    <li><i style={styles.icons_fa} /> {experience.activityTime}</li>
                                </ul>
                            </div>
                            <div style={styles.liste_price_item}>
                                <p>Prix</p>
                                <h2>{experience.budget}<span>€</span></h2>
                            </div>
                            <div>
                                <Cascader
                                options={ options }
                                expandTrigger="hover"
                                displayRender={ displayRender }
                                onChange={ onChange }
                                />
                                <RedButton
                                title="+"
                                onSelect={ ()=>chooseExperience(experience) }/>
                            </div>

                        </div>
                    </div> {/* End -> Card expérience */}
                </div>
            )
        })
    }
    return (
        <div>
            {ExperienceListing}
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        onAddExperience: function(experience) {
            dispatch({ type: 'addExperience', experience: experience })
        }
    }
}

function mapStateToProps(state) {
    console.log(state)
    return { experiences: state.experiences, region: state.region, token: state.token, roadplanner: state.roadplanner }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)(ExperienceList);




let styles = {
    // CSS - ICONS //

    icons_la: {
        display: 'inline-block',
        position: 'absolute',
        top: '17px',
        left: '20px',
        color: '#CFD3DE',
        font: 'normal normal normal 16px/1 LineAwesome',
        fontSize: 'inherit',
        textDecoration: 'inherit',
        textRendering: 'optimizeLegibility',
        textTransform: 'none',
    },

    // CARD - TITLE//

    h3: {
        fontWeight: 'bold',
        fontSize: '28px',
        color: '#106271',
        textDecoration: 'none',
    },

    h4: {
        fontSize: '20px',
        color: '#e06868',
        textDecoration: 'none',
    },

    // CARD - CSS //

    experiences_list_area: {
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        boxSizing: 'border-box',
        outline: 'none',
        paddingLeft: '1rem',
        paddingRight: '1rem',

    },

    single_destinations: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '0 0 30px 0',
        border: '1px solid #CFD3DE',
        boxShadow: '0px 3px 9px #071c551f',
        borderRadius: '7px',
        position: 'relative',
        overflow: 'hidden',
        margin: '.5rem',
    },

    image_card: {
        position: 'relative',
        background: '#106271',
        overflow: 'hidden',
        flex: '0 0 30%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        minHeight: '200px',
        borderRadius: '5px',
    },

    image: {
        width: '100%',
        height: '70%',
        objectFit: 'cover',
        objectPosition: 'center center',
        borderRadius: '5px',
    },

    detail_card: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        flex: '0 0 70%',
        padding: '22px 15px',
        background: '#ffffff',
    },

    card_content: {
        marginBottom: '15px',
        color: '#bcbcbc',
        hyphens: 'auto',
    },

    liste_price: {
        marginTop: '20px',
        display: 'flex',
        boxSizing: 'border-box',
        outline: 'none',
    },

    liste_price_li: {
        margin: '0 10px',
        fontSize: '14px',
        listStyle: 'none',
        display: 'inline-block',
    },


    liste_price_content: {
        float: 'left',
        marginTop: '20px',
        margin: '0',
        padding: '0',
        display: 'inline-block',
    },

    icons_fa: {
        display: 'inline-block',
        font: 'normal normal normal 14px/1 FontAwesome',
        fontSize: 'inherit',
        textRendering: 'auto',
        color: '#01B9B7',
        marginRight: '5px',
    },

    liste_price_item: {
        paddingLeft: '30px',
        marginLeft: '20px',
        borderLeft: '1px solid #CFD3DE',
        paddingTop: '0',
    },

    picto: {
        height: '40px',
        width: '40px',
        margin: '2%',
        whiteSpace: 'wrap',


    },
    display_inline: {
        display: 'inline-flex',
    }
}
