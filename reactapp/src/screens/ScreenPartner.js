import React, { useState } from 'react';
import Nav from '../components/Nav'
import '../App.css';
import '../styles/partner.css'

import { Link, useLocation } from 'react-router-dom';


//UI
import RedButton from '../components/RedButton'
import { Cascader, message } from 'antd';

//REDUX
import { connect } from 'react-redux';


const ScreenPartner = (props) => {
    //STATE HOOKS
    const [voyageSelect, setVoyageSelect] = useState('');

    //LOCATION HOOKS
    const location = useLocation();
    let { experience } = location.state;

    //CASCADER
    let options = [
        {
            value: 'new',
            label: 'Mon voyage'
        }
    ]

    if (props.user.roadtrips) {
        let userTrips = props.user.roadtrips.map(e => {
            return {
                value: e._id,
                label: e.name
            }
        });

        let savedTripsOption = {};

        if (userTrips.length > 0) {
            savedTripsOption = {
                value: 'saved',
                label: "Vos voyages",
                children: userTrips
            }
        }

        options = [
            {
                value: 'new',
                label: 'Nouveau voyage'
            },
            savedTripsOption
        ];
    }

    function displayRender(label) {
        return label[label.length - 1];
    }

    const onChange = (value) => {
        setVoyageSelect(value)
    };

    //HTTP REQUESTS
    const createNewTrip = async (experience) => {
        let region = 'Alsace-Vosges';
        let rawResponse = await fetch('/myroadplanner', {
            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `token=${props.user.token}&name=Mon Voyage en ${region}&region=${region}&regionCode=${props.region}&experienceID=${experience._id}`
        });
        let response = await rawResponse.json();
        if (response.result === true) {
            props.toggleRoadplanner(response.roadtrip._id, experience);
            props.addRoadtripToUser(response.roadtrip)
            success();
        }
    }

    const addExperienceToTrip = async (experience) => {
        let rawResponse = await fetch('/myroadplanner', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `roadtripID=${voyageSelect[1]}&experienceID=${experience._id}`
        })
        let response = await rawResponse.json();
        if (response.result === true) {
            props.addExperience(response.roadtrip._id, experience)
            success()
        }
    }

    //FUNCTIONS
    const chooseExperience = async (experience) => {
        if (props.user.token) {
            voyageSelect[0] === 'new' ? createNewTrip(experience) : addExperienceToTrip(experience);
        } else {
            !props.roadplanner.experiences || props.roadplanner.experiences.length === 0 ? props.toggleRoadplanner('temp', experience) : props.addExperience('temp', experience);
            success();
        }
    }

    const success = () => {
        message.success({
            content: 'Expérience ajouté',
            className: 'custom-class',
            style: {
                marginTop: '20vh',
            },
        });
    };

    //FUNCTIONS
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }
    //DISPLAY MANAGEMENT
    let address = `${experience.partner.addresses[0].streetNumber} ${experience.partner.addresses[0].streetName} ${experience.partner.addresses[0].city} ${experience.partner.addresses[0].zipcode} ${experience.partner.addresses[0].country}`

    return (
        <div>
            <Nav />
            <div>
                <img style={styles.banniere_img} src={experience.description.imageBannerUrl} alt="banner" />
            </div>

            <div style={styles.container_all}>

                <div style={styles.gallery_container}>
                    <div style={styles.row}>
                        <div>
                            <h4 style={styles.h4_white}>{experience.name}</h4>
                            <h4 style={styles.h4_white}>{experience.subtitle}</h4>
                            <p style={{ color: '#fff' }}><i className="fa fa-map-marker" />{experience.partner.addresses[0].city}</p>
                            <p style={{ color: '#fff' }}><i className="fa fa-map-marker" />{experience.region}</p>
                        </div>
                        <div style={styles.tags_title} >
                            {experience.tags.map((e, i) => {
                                return <a style={styles.tags_title} key={i} href="#">{e}</a>
                            })}
                        </div>

                        <div style={styles.row_card_button}>
                            <Cascader
                                options={options}
                                expandTrigger="hover"
                                displayRender={displayRender}
                                onChange={onChange}
                                placeholder="Sélectionnez un voyage"
                                style={{ marginRight: '2%' }}
                            />
                            <RedButton title="Ajouter cette expérience à mon voyage" onSelect={() => chooseExperience(experience)} />

                        </div>

                    </div>

                    <div>
                        <div style={styles.gallery_area}>
                            {/* gallery-item */}
                            {experience.description.imagesUrl.map((e, i) => {
                                return (
                                    <div style={styles.gallery_item} key={i}>
                                        <div style={styles.tp_gallery_item_img}>
                                            <a href="#" data-effect="mfp-zoom-in">
                                                <img style={styles.tp_gallery_item_img} src={e} alt="" />
                                            </a>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div>
                            <h2 style={styles.h2_white_avantage}>Votre avantage avec le Neopass</h2>
                            <p style={styles.p_avantage}>{experience.avantage}</p>
                        </div>

                        <div style={styles.row_card_gallery}>
                            <div style={styles.information_col_3}>
                                <div style={{ boxSizing: 'border-box', outline: 'none' }}>
                                    <h4 style={styles.h4_white}>Durée</h4>
                                    <h4 style={styles.h4_white}>{experience.activityTime}</h4>
                                </div>
                            </div>

                            <div style={styles.row_card_button_achat}>
                                <Link to={'/'}>
                                    <RedButton transparent={true} title="Acheter ce Neopass" />
                                </Link>
                            </div>

                            <div style={styles.information_col_3}>
                                <div>
                                    <h4 style={styles.h4_white}>Le budget</h4>
                                    <h4 style={styles.h4_white}>{experience.budget}</h4>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                <div style={styles.container}>
                    <div style={styles.row_flex}>
                        <div style={styles.information_col_1}>

                            <div style={styles.container}>
                                <div style={styles.information_bloc}>
                                    <h4 style={styles.h4}>{experience.description.title}</h4>
                                    <p style={styles.p_description}>{experience.description.content}</p>
                                </div>

                                <div style={styles.information_bloc}>
                                    <div style={styles.tp_description_item}>
                                        <div style={styles.tp_description_item_title}>
                                            <h4 style={styles.h4_notice}>L'avis de Neofeel</h4>
                                            <img src="https://www.neo-feel.com/wp-content/uploads/2020/06/about-240x119.png" alt="logo Neofeel" />
                                        </div>
                                        <div>
                                            <p style={styles.p_description}>{experience.description.review}</p>
                                        </div>
                                    </div>
                                </div>

                                <div style={styles.information_bloc}>
                                    <div style={styles.description_notice}>
                                        <div>
                                            <img style={styles.tp_description_item_img} src={experience.partner.avatar} alt="partenaire" />
                                        </div>
                                        <div>
                                            <h4 style={styles.h4}>Le mot du partenaire</h4>
                                            <p style={styles.p_description}>{experience.description.partnerTips}</p>
                                            <Link to={'/info'}>
                                                <RedButton transparent={true} title="Contacter le partenaire" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div style={styles.information_bloc}>
                                    <div style={styles.tp_description_item}>
                                        <div style={styles.tp_description_item_title}>
                                            <h4 style={styles.h4_notice}>La petite astuce</h4>
                                        </div>
                                        <div>
                                            <p style={styles.p_description}>{experience.description.tips}</p>
                                        </div>
                                    </div>
                                </div>

                                <div style={styles.information_bloc} >
                                    <h4 style={styles.h4}>Localisation</h4>
                                    <div>
                                        <iframe style={styles.location_map} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d649788.5753409272!2d-0.5724199684037448!3d52.92186340524542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604d94c3b82ab%3A0x62077a554c8e9a8e!2sPetty%20France%2C%20Westminster%2C%20London%2C%20UK!5e0!3m2!1sen!2sbd!4v1572346566908!5m2!1sen!2sbd" />
                                    </div>
                                </div>

                                <div style={styles.information_bloc}>
                                    <div style={styles.tp_description_item}>
                                        <div style={styles.tp_description_item_title}>
                                            <h4 style={styles.h4_notice}>Infos</h4>
                                        </div>
                                        <div>
                                            <p style={styles.p_description}>Adresse: <span>{address}</span></p>
                                            <p style={styles.p_description}>Site internet: <span onClick={ ()=>openInNewTab(experience.partner.website) }>{}</span></p>
                                            <p style={styles.p_description}>Page facebook: <span onClick={ ()=>openInNewTab(experience.partner.facebook) }>{experience.partner.facebook}</span></p>
                                        </div>
                                    </div>
                                </div>


                                <div style={styles.information_bloc}>
                                    <h4 style={styles.h4}>Commentaires</h4>
                                    <ul style={styles.comments_bloc}>
                                        <li>
                                            <div style={styles.comments_bloc_li}>
                                                <div style={styles.comments_img} >
                                                    <img style={styles.tp_comments_img} src="/images/avatar.png" alt="img" />
                                                </div>
                                                <div className="content">
                                                    <h4 style={styles.h4}>Emerson</h4>
                                                    <span className="date">13 August 2019</span>
                                                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <div style={styles.comments_bloc_li}>
                                                <div style={styles.comments_img} >
                                                    <img style={styles.tp_comments_img} src="/images/avatar.png" alt="img" />
                                                </div>
                                                <div className="content">
                                                    <h4 style={styles.h4}>Anais</h4>
                                                    <span className="date">13 August 2019</span>
                                                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata</p>
                                                </div>
                                            </div>
                                        </li>

                                    </ul>

                                    <div>
                                        <a href="#"><span>Plus de commentaires<i /></span></a>
                                    </div>

                                </div>

                                <div style={styles.information_bloc}>
                                    <form style={styles.tp_comments_form}>
                                        <div>
                                            <div style={styles.tp_comments_form_label}>
                                                <h4 style={styles.h4}>Ecrire un commentaire</h4>
                                            </div>

                                            <div>
                                                <label style={styles.tp_comments_form_label}>
                                                    <span>Nom:</span>
                                                    <input style={styles.tp_comments_form_input} type="text" />
                                                </label>
                                            </div>

                                            <div>
                                                <label style={styles.tp_comments_form_label}>
                                                    <span>Email:</span>
                                                    <input style={styles.tp_comments_form_input} type="text" />
                                                </label>
                                            </div>

                                            <div>
                                                <label style={styles.tp_comments_form_label}>
                                                    <span>Commentaire:</span>
                                                    <textarea style={styles.tp_comments_form_input} defaultValue={""} />
                                                </label>
                                            </div>

                                            <div style={styles.tp_comments_form_label}>
                                                <Link to={'/'}>
                                                    <RedButton transparent={true} title="Envoyer" />
                                                </Link>
                                            </div>
                                        </div>
                                    </form>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </div>



    )

};


let styles = {
    // ARCHITECTURE //

    container_all: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '1rem',
        width: '100%',
        paddingRight: '1.5rem',
        paddingLeft: '1.5rem',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: '-200px'
    },

    container: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '1rem',
        width: '100%',
        paddingRight: '1.5rem',
        paddingLeft: '1.5rem',
        marginRight: 'auto',
        marginLeft: 'auto',
    },

    row: {
        display: "grid",
        gridTemplateColumns: 'repeat(3, 1fr)',
    },

    row_card_gallery: {
        display: "grid",
        gridTemplateColumns: 'repeat(3, 1fr)',
    },

    row_flex: {
        display: "grid",
        gridTemplateColumns: 'repeat(1, 1fr)',
        paddingTop: '1rem',
    },

    information_col_3: {
        position: 'relative',
        width: '100%',
        minHeight: '0.1rem',
        paddingRight: '1.5rem',
        paddingLeft: '1.5rem',
        textAlign: 'center',
    },

    information_col_1: {
        position: 'relative',
        alignItem: 'center',
        width: '70%',
        minHeight: '0.1rem',
        paddingRight: '1.5rem',
        paddingLeft: '1.5rem',
        margin: 'auto',
    },

    information_bloc: {
        paddingTop: '1.5rem',
        paddingBottom: '1.5rem',
    },



    // TITLE //

    h2_white_avantage: {
        fontWeight: 'bold',
        fontSize: '28px',
        color: '#fff',
        textDecoration: 'none',
        textAlign: 'center',
    },

    h3_white: {
        fontWeight: 'bold',
        fontSize: '28px',
        color: '#fff',
        textDecoration: 'none',
    },

    h4_white: {
        fontSize: '20px',
        color: '#fff',
        textDecoration: 'none',
    },

    h3: {
        fontWeight: 'bold',
        fontSize: '28px',
        color: '#106271',
        textDecoration: 'none',
    },

    h4: {
        fontWeight: 'bold',
        fontSize: '20px',
        color: '#106271',
        textDecoration: 'none',
    },

    h4_notice: {
        fontWeight: 'bold',
        fontSize: '20px',
        color: '#106271',
        textDecoration: 'none',
        verticalAlign: 'middle',
    },

    tags_title: {
        margin: '1rem',
        textAlign: 'right',
    },

    p_avantage: {
        fontWeight: 'bold',
        fontSize: '16px',
        color: '#fff',
        textAlign: 'center',
        borderBottom: '1px solid #FFF',
        marginBottom: '1rem',
        paddingBottom: '1rem'
    },

    p_description: {
        fontSize: '16px',
        textAlign: 'justify',
        borderBottom: '1px solid #FFF',
        paddingBottom: '1rem',
        marginBottom: '0',
    },




    // GALLERIE //

    banniere_img: {
        position: 'relative',
        marginBottom: '0.24rem',
        width: '100%',
        maxHeight: '600px',
        objectFit: 'cover',
    },

    gallery_item: {
        padding: '1rem',
    },

    gallery_container: {
        margin: '0 40px',
        padding: '2rem 2rem 0',
        boxShadow: '1px 0px 45px #fff',
        borderRadius: '25px',
        zIndex: '1',
        position: 'relative',
        background: '#006271',
    },

    gallery_area: {
        display: "grid",
        gridTemplateColumns: 'repeat(3, 1fr)',
    },

    gallery_item_img: {
        position: 'relative',
        marginBottom: '0.24rem',
        width: '50%',
        height: '50%',
        objectFit: 'cover',
    },

    tp_gallery_item_img: {
        position: 'relative',
        marginBottom: '0.24rem',
        width: '100%',
        objectFit: 'cover',
    },

    infos_contents: {
        paddingTop: '0.30rem',
        orderTop: '1px solid #CFD3DE',
    },

    row_card_button: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
    },

    // GALLERIE -> INFORMATIONS //

    gallery_tags_li: {
        background: '#e06868',
        padding: '0 0.28rem 0 0.28rem',
        height: '1rem',
        lineHeight: '1rem',
        color: '#ffffff',
        fontSize: '1rem',
        bordeeRadius: '0.08rem',
        marginRight: '0.24rem',
        display: 'inline-block',
        marginTop: '0.2rem',
    },

    // DESCRIPTION //

    description_notice: {
        boxShadow: '0px 3px 27px #23397417',
        borderRadius: '10px',
        padding: '2rem',
        textAlign: 'center',
        margin: '1rem',
    },

    tp_description_item_img: {
        position: 'relative',
        marginBottom: '0.24rem',
        width: '50%',
        borderRadius: '80%',
        objectFit: 'contain',
        margin: 'auto',
    },

    tp_description_item_title: {
        display: "grid",
        gridTemplateColumns: 'repeat(1, 1fr)',
        marginBottom: '1rem',
    },

    // DESCRIPTION //

    location_map: {
        height: '40rem',
        width: '100%',
        border: '0',
    },



    // COMMENTAIRES//

    comments_bloc: {
        margin: '0',
        padding: '0',
        listStyle: 'none',
        listStyleType: 'none',
    },

    comments_bloc_li: {
        display: 'flex',
        alignSelf: 'flex-start',
        border: '1px solid #CFD3DE',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0px 3px 27px #23397417',
        margin: '.5rem'
    },

    comments_img: {
        marginRight: '3rem',
        height: '6rem',
        width: '6rem',
        borderRadius: '80%',
        border: '.2rem solid #e06868 ',

    },

    tp_comments_img: {
        width: '5rem',
        padding: '.5rem'
    },

    tp_comments_form: {
        padding: '30px 40px 40px',
        borderRadius: '1rem',
        background: '#F8F8F8',
        display: "grid",
        gridTemplateColumns: 'repeat(1, 1fr)',

    },

    tp_comments_form_label: {
        position: 'relative',
        display: "grid",
        gridTemplateColumns: '1fr 2fr',
        width: '100%',
        minHeight: '1px',
        paddingRight: '15px',
        paddingLeft: '15px',
        margin: '1rem',
    },

    tp_comments_form_input: {
        background: '#ffffff',
        border: '.1rem solid #EAEAEA',
        height: '5.2rem',
        width: '100%',
        padding: '0 1.8rem',
        borderRadius: '.4rem',
        color: '#e06868',
    },
    row_card_button_achat: {
        textAlign: 'center'
    }
};


function mapStateToProps(state) {
    return { experiences: state.experiences, region: state.region, user: state.user, roadplanner: state.roadplanner }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleRoadplanner: function (roadtripID, experience) {
            dispatch({
                type: 'toggleRoadplanner',
                roadtripID: roadtripID,
                experience: experience
            })
        },
        addExperience: function (roadtripID, experience) {
            dispatch({
                type: 'addExperience',
                roadtripID: roadtripID,
                experience: experience
            })
        },
        addRoadtripToUser: function (roadtrip) {
            dispatch({
                type: 'addRoadtrip',
                roadtrip: roadtrip
            })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenPartner);




