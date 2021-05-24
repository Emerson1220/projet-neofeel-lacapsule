import React, { useState } from 'react';
import Nav from '../components/Nav'
import '../App.css';
import '../styles/partner.css'

import { Link, Redirect } from 'react-router-dom';


//UI
import RedButton from '../components/RedButton'




const ScreenPartner = () => {
    return (
        <div>
            <Nav />
                <div>
                    <img style={ styles.banniere_img} src="images/photo-526x360.png" alt="image" />
                </div>

            <div style={ styles.container_all }>

                    <div style={ styles.gallery_container }>
                        <div style={ styles.row }>
                            <div>
                                <h4 style={ styles.h4_white }>Nom du partenaire</h4>
                                <h4 style={ styles.h4_white }>Activité</h4>
                                <p style={{color:'#fff'}}><i className="fa fa-map-marker" />Region</p>
                            </div>
                            <div style={styles.tags_title} >
                                <a style={ styles.tags_title }  href="#">Tags 1</a>
                                <a style={ styles.tags_title }  href="#">Tags 2</a>
                                <a style={ styles.tags_title }  href="#">Tags 3</a>
                                <a style={ styles.tags_title }  href="#">Tags 4</a>
                            </div>

                            <div style={ styles.row_card_button}>
                                        <Link to={'/'}>
                                            <RedButton transparent={true} title="Ajouter cette epérience à mon voyage" />
                                        </Link>
                                    </div>

                        </div>

                        <div>
                            <div style={ styles.gallery_area }>
                                    {/* gallery-item */}
                                    <div style={ styles.gallery_item }>
                                        <div style={ styles.tp_gallery_item_img }>
                                            <a href="#" data-effect="mfp-zoom-in">
                                                <img style={ styles.tp_gallery_item_img } src="images/photo-526x360.png" alt="image" />
                                            </a>
                                        </div>
                                    </div>

                                    {/* gallery-item */}
                                    <div style={ styles.gallery_item }>
                                        <div style={ styles.tp_gallery_item_img }>
                                            <a href="#" data-effect="mfp-zoom-in">
                                                <img style={ styles.tp_gallery_item_img } src="images/photo-526x360.png" alt="image" />
                                            </a>
                                        </div>
                                    </div>

                                    {/* gallery-item */}
                                    <div style={ styles.gallery_item }>
                                        <div style={ styles.tp_gallery_item_img }>
                                            <a href="#" data-effect="mfp-zoom-in">
                                                <img style={ styles.tp_gallery_item_img } src="images/photo-526x360.png" alt="image" />
                                            </a>
                                        </div>
                                    </div>
                            </div>
                            
                            <div>
                                <h2 style={styles.h2_white_avantage}>Votre avantage avec le Neopass</h2>
                                <p style={styles.p_avantage}>Lorem ipsum dolor sit amet, consetetur</p>
                            </div>

                                <div style={ styles.row_card_gallery}>
                                    <div style={styles.information_col_3}>
                                        <div style={{boxSizing:'border-box', outline:'none'}}>
                                            <h4 style={ styles.h4_white }>Ville</h4>
                                            <h4 style={ styles.h4_white }>Durée</h4>
                                        </div>
                                    </div>

                                    <div style={ styles.row_card_button}>
                                        <Link to={'/'}>
                                            <RedButton transparent={true} title="Acheter ce Neopass" />
                                        </Link>
                                    </div>

                                    <div style={styles.information_col_3}>
                                        <div>
                                            <h4 style={ styles.h4_white }>Le budget</h4>
                                            <h4 style={ styles.h4_white }>80€</h4>
                                        </div> 

                                    </div>  
                                </div>

                        </div>
                </div>

                <div style={ styles.container }>
                    <div style={ styles.row_flex }>
                        <div style={ styles.information_col_1 }>

                            <div style={ styles.container }>
                                <div style={ styles.information_bloc}>
                                    <h4 style={ styles.h4 }>Description</h4>
                                    <p style={ styles.p_description }>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata</p>
                                </div>
                                
                                <div style={ styles.information_bloc}>
                                    <div style={ styles.tp_description_item }>
                                        <div style={ styles.tp_description_item_title }>
                                            <h4 style={styles.h4_notice }>L'avis de Neofeel</h4>
                                            <img src= "https://www.neo-feel.com/wp-content/uploads/2020/06/about-240x119.png" alt="logo Neofeel" />
                                        </div>
                                        <div>
                                            <p style={ styles.p_description }>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata</p>
                                        </div>
                                    </div>
                                </div>

                                <div style={ styles.information_bloc}>
                                    <div style={styles.description_notice}>
                                        <div>
                                            <img style={ styles.tp_description_item_img } src= "https://www.neo-feel.com/wp-content/uploads/2020/08/DSC_0569-min.jpg.webp" alt="photo partenaire" />
                                        </div>
                                        <div>
                                            <h4 style={styles.h4}>Le mot du partenaire</h4>
                                            <p style={ styles.p_description }>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata</p>
                                            <Link to={'/info'}>
                                                <RedButton transparent={true} title="Contacter le partenaire" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div style={ styles.information_bloc}>
                                    <div style={ styles.tp_description_item }>
                                        <div style={ styles.tp_description_item_title }>
                                            <h4 style={styles.h4_notice }>La petite astuce</h4>
                                        </div>
                                        <div>
                                            <p style={ styles.p_description }>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata</p>
                                        </div>
                                    </div>
                                </div>

                                <div style={ styles.information_bloc } >
                                    <h4 style={styles.h4}>Localisation</h4>
                                    <div>
                                        <iframe style={ styles.location_map } src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d649788.5753409272!2d-0.5724199684037448!3d52.92186340524542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604d94c3b82ab%3A0x62077a554c8e9a8e!2sPetty%20France%2C%20Westminster%2C%20London%2C%20UK!5e0!3m2!1sen!2sbd!4v1572346566908!5m2!1sen!2sbd" />
                                    </div>
                                </div>

                                <div style={ styles.information_bloc}>
                                    <div style={ styles.tp_description_item }>
                                        <div style={ styles.tp_description_item_title }>
                                            <h4 style={styles.h4_notice }>Infos</h4>
                                        </div>
                                        <div>
                                            <p style={ styles.p_description }>Adresses:<span> 4 rue Neofeel 77000 La ferte sous jouarre</span></p>
                                            <p style={ styles.p_description }>Site internet:<span> www.neo-feel.com</span></p>
                                            <p style={ styles.p_description }>Page facebook:<span> facebook:link</span></p>
                                        </div>
                                    </div>
                                </div>


                                <div style={ styles.information_bloc }>
                                    <h4 style={styles.h4}>Commentaires</h4>
                                    <ul style={ styles.comments_bloc }>
                                        <li>
                                            <div style={ styles.comments_bloc_li }>
                                                <div style={ styles.comments_img } >
                                                    <img style={ styles.tp_comments_img } src="images/avatar.png" alt="img" />
                                                </div>
                                                <div className="content">
                                                    <h4 style={styles.h4}>Emerson</h4>
                                                    <span className="date">13 August 2019</span>
                                                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <div style={ styles.comments_bloc_li }>
                                                <div style={ styles.comments_img } >
                                                    <img style={ styles.tp_comments_img } src="images/avatar.png" alt="img" />
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
                                        <a href="#"><span>Plus de commentaires<i/></span></a>
                                    </div>

                                </div>

                                <div style={ styles.information_bloc }>
                                    <form style={ styles.tp_comments_form }>
                                        <div>
                                            <div style={ styles.tp_comments_form_label }>
                                                <h4 style={ styles.h4 }>Ecrire un commentaire</h4>
                                            </div>

                                            <div>
                                                <label style={ styles.tp_comments_form_label }>
                                                    <span>Nom:</span>
                                                    <input style={ styles.tp_comments_form_input } type="text" />
                                                </label>
                                            </div>

                                            <div>
                                                <label style={ styles.tp_comments_form_label }>
                                                    <span>Email:</span>
                                                    <input style={ styles.tp_comments_form_input } type="text" />
                                                </label>
                                            </div>

                                            <div>
                                                <label style={ styles.tp_comments_form_label }>
                                                    <span>Commentaire:</span>
                                                    <textarea style={ styles.tp_comments_form_input }  defaultValue={""} />
                                                </label>
                                            </div>

                                            <div style={ styles.tp_comments_form_label }>
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

        container_all:{
            display: 'flex',
            flexDirection: 'column',
            marginTop:'1rem',
            width: '100%',
            paddingRight: '1.5rem',
            paddingLeft: '1.5rem',
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop:'-200px'
        },
    
        container:{
            display: 'flex',
            flexDirection: 'column',
            marginTop:'1rem',
            width: '100%',
            paddingRight: '1.5rem',
            paddingLeft: '1.5rem',
            marginRight: 'auto',
            marginLeft: 'auto',
        },

        row:{
            display:"grid",
            gridTemplateColumns: 'repeat(3, 1fr)',
        },

        row_card_gallery:{
            display:"grid",
            gridTemplateColumns: 'repeat(3, 1fr)',
        },

        row_flex:{
            display:"grid",
            gridTemplateColumns: 'repeat(1, 1fr)',
            paddingTop:'1rem',
        },

        information_col_3:{
            position: 'relative',
            width: '100%',
            minHeight: '0.1rem',
            paddingRight: '1.5rem',
            paddingLeft: '1.5rem',
            textAlign:'center',
        },

        information_col_1:{
            position: 'relative',
            alignItem: 'center',
            width: '70%',
            minHeight: '0.1rem',
            paddingRight: '1.5rem',
            paddingLeft: '1.5rem',
            margin: 'auto',
        },

        information_bloc:{
            paddingTop:'1.5rem',
            paddingBottom:'1.5rem',
        },

        
        
        // TITLE //

        h2_white_avantage:{
            fontWeight:'bold',
            fontSize: '28px',
            color: '#fff',
            textDecoration: 'none',
            textAlign:'center',
        },

        h3_white:{
            fontWeight:'bold',
            fontSize: '28px',
            color: '#fff',
            textDecoration: 'none',
        },

        h4_white:{
            fontSize: '20px',
            color: '#fff',
            textDecoration: 'none',
        },

        h3:{
            fontWeight:'bold',
            fontSize: '28px',
            color: '#106271',
            textDecoration: 'none',
        },

        h4:{
            fontWeight:'bold',
            fontSize: '20px',
            color: '#106271',
            textDecoration: 'none',
        },

        h4_notice:{
            fontWeight:'bold',
            fontSize: '20px',
            color: '#106271',
            textDecoration: 'none',
            verticalAlign: 'middle',       
        },

        tags_title:{
            margin:'1rem',
            textAlign:'right',
        },

        p_avantage:{
            fontWeight:'bold',
            fontSize: '16px',
            color: '#fff',
            textAlign:'center',
            borderBottom: '1px solid #FFF',
            marginBottom:'1rem',
            paddingBottom: '1rem'
        },

        p_description:{
            fontSize: '16px',
            textAlign:'justify',
            borderBottom: '1px solid #FFF',
            paddingBottom:'1rem',
            marginBottom:'0',
        },


    

        // GALLERIE //

        banniere_img:{
            position: 'relative',
            marginBottom:'0.24rem',
            width: '100%',
            maxHeight: '600px',
            objectFit: 'cover',
        },

        gallery_item:{
            padding: '1rem',
        },

        gallery_container:{
            margin:'0 40px',
            padding:'2rem 2rem 0',
            boxSadow:'1px 0px 45px #fff',
            borderRadius:'25px',
            zIndex:'1',
            position:'relative',
            background:'#006271',
        },  
        
        gallery_area:{
            display:"grid",
            gridTemplateColumns: 'repeat(3, 1fr)',
        },

        gallery_item_img:{
            position: 'relative',
            marginBottom:'0.24rem',
            width: '50%',
            height: '50%',
            objectFit: 'cover',
        },

        tp_gallery_item_img:{
            position: 'relative',
            marginBottom: '0.24rem',
            width: '100%',
            objectFit: 'cover',
        },

        infos_contents:{
            paddingTop: '0.30rem',
            orderTop: '1px solid #CFD3DE',
        },

        row_card_button:{
            textAlign: 'center',
        },

        // GALLERIE -> INFORMATIONS //

        gallery_tags_li:{
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

        description_notice:{
            boxShadow: '0px 3px 27px #23397417',
            borderRadius: '10px',
            padding: '2rem',
            textAlign: 'center',
            margin: '1rem',
        },

        tp_description_item_img:{
            position: 'relative',
            marginBottom: '0.24rem',
            width: '50%',
            borderRadius: '80%',
            objectFit: 'contain',
            margin:'auto',
        },

        tp_description_item_title:{
            display:"grid",
            gridTemplateColumns: 'repeat(1, 1fr)',
            marginBottom:'1rem',
        },
    
        // DESCRIPTION //

        location_map:{
            height: '40rem',
            width: '100%',
            border: '0',
        },



        // COMMENTAIRES//

        comments_bloc:{
            margin: '0',
            padding: '0',
            listStyle: 'none',
            listStyleType: 'none',
        },

        comments_bloc_li:{
            display: 'flex',
            alignSelf: 'flex-start',
            border: '1px solid #CFD3DE',
            borderRadius: '1rem',
            padding: '2rem',
            boxShadow: '0px 3px 27px #23397417',
            margin:'.5rem'
        },

        comments_img:{
            marginRight: '3rem',
            height: '6rem',
            width: '6rem',
            borderRadius: '80%',
            border: '.2rem solid #e06868 ',
            
        },

        tp_comments_img:{
            width: '5rem',
            padding: '.5rem'
        },

        tp_comments_form:{
            padding: '30px 40px 40px',
            borderRadius: '1rem',
            background: '#F8F8F8',
            display:"grid",
            gridTemplateColumns: 'repeat(1, 1fr)',

        },

        tp_comments_form_label:{
            position: 'relative',
            display:"grid",
            gridTemplateColumns: '1fr 2fr',
            width: '100%',
            minHeight: '1px',
            paddingRight: '15px',
            paddingLeft: '15px',
            margin:'1rem',
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
    };





export default ScreenPartner;




