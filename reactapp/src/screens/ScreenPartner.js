import React, { useState } from 'react';
import Nav from '../components/Nav'
import '../App.css';
import '../styles/partner.css'



const ScreenPartner = () => {
    return (
        <div>
            <Nav />

            <div style={ styles.container}>
            <div style={ styles.gallery}>
                <div className="container-bg bg-dark-blue">
                <div className="container">
                    <div className="gallery-filter-area row">
                    <div className="gallery-sizer col-1" />
                    {/* gallery-item */}
                    <div className="tp-gallery-item col-md-5 col-sm-6 mb-10">
                        <div className="tp-gallery-item-img">
                        <div className="thumbnails">
                            <img src="" alt="image" />
                            <div className="video-popup-btn">
                            <a href="https://youtu.be/N0viOuiYamM" className="video-play-btn mfp-iframe" tabIndex={0}><i className="fa fa-play" /></a>
                            </div>
                        </div>
                        </div>
                    </div>
                    {/* gallery-item */}
                    <div className="tp-gallery-item col-md-3 col-sm-6">
                        <div className="tp-gallery-item-img">
                        <a href="#" data-effect="mfp-zoom-in">
                            <img src="" alt="image" />
                        </a>
                        </div>
                    </div>
                    {/* gallery-item */}
                    <div className="tp-gallery-item col-lg-2 col-md-4 col-sm-6">
                        <div className="tp-gallery-item-img">
                        <a href="#" data-effect="mfp-zoom-in">
                            <img src="" alt="image" />
                        </a>
                        </div>
                    </div>
                    {/* gallery-item */}
                    <div className="tp-gallery-item col-lg-2 col-md-4 col-sm-6">
                        <div className="tp-gallery-item-img">
                        <a href="#" data-effect="mfp-zoom-in">
                            <img src="" alt="image" />
                        </a>
                        </div>
                    </div>
                    {/* gallery-item */}
                    <div className="tp-gallery-item col-lg-2 col-md-4 col-sm-6">
                        <div className="tp-gallery-item-img">
                        <a href="#" data-effect="mfp-zoom-in">
                            <img src="" alt="image" />
                        </a>
                        </div>
                    </div>
                    {/* gallery-item */}
                    <div className="tp-gallery-item col-lg-2 col-md-4 col-sm-6">
                        <div className="tp-gallery-item-img">
                        <a href="#" data-effect="mfp-zoom-in">
                            <img src="" alt="image" />
                        </a>
                        </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-xl-3 col-lg-4">
                        <div className="details">
                        <p className="location mb-0"><i className="fa fa-map-marker" />Region</p>
                        <h4 className="title">Ville</h4>
                        <p className="content">Time</p>
                        <div className="all-tags">
                            <a href="#">Tags 1</a>
                            <a href="#">Tags 2</a>
                            <a href="#">Tags 3</a>
                            <a href="#">Tags 4</a>
                        </div>
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-8">
                        <div className="book-list-warp">
                        <p className="book-list-content">Title</p>
                        <div className="tp-price-meta">
                            <p>Prix</p>
                            <h2>775</h2>
                        </div>
                        </div>
                        <ul className="tp-list-meta border-tp-solid">
                        <li className="ml-0"><i className="fa fa-calendar-o" /> info 1</li>
                        <li><i className="fa fa-clock-o" /> info 2</li>
                        <li><i className="fa fa-users" />info 3</li>
                        <li><i className="fa fa-snowflake-o" /> info 4</li>
                        <li><i className="fa fa-star" /> info 5</li>
                        </ul>
                    </div>   
                    </div>
                </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                <div className="col-lg-8">
                    <div className="tour-details-wrap">
                    <h4 className="single-page-small-title">Write A Review</h4>
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata</p>
                    <div className="host-area">
                        <div className="single-host-wrap text-center">
                        <div className="thumb">
                            <img src= "" alt="photo partenaire" />
                        </div>
                        <h4>Nom du partenaire</h4>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata</p>
                        <a className="btn btn-yellow" href="#">Contacter le partenaire</a>
                        </div>
                    </div>
                    <div className="service-location-map">
                        <h4 className="single-page-small-title">Localisation</h4>
                        <div className="service-location-map">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d649788.5753409272!2d-0.5724199684037448!3d52.92186340524542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604d94c3b82ab%3A0x62077a554c8e9a8e!2sPetty%20France%2C%20Westminster%2C%20London%2C%20UK!5e0!3m2!1sen!2sbd!4v1572346566908!5m2!1sen!2sbd" />
                        </div>
                    </div>
                    <div className="comments-area tour-details-review-area">
                        <h4 className="comments-title">Commentaires</h4>
                        <ul className="comment-list mb-0">
                        <li>
                            <div className="single-comment-wrap">
                            <div className="thumb">
                                <img src="assets/img/client/2.png" alt="img" />
                            </div>
                            <div className="content">
                                <h4 className="title">Tyler Bailey</h4>
                                <span className="date">13 August 2019</span>
                                <div className="tp-review-meta">
                                <i className="ic-yellow fa fa-star" />
                                <i className="ic-yellow fa fa-star" />
                                <i className="ic-yellow fa fa-star" />
                                <i className="ic-yellow fa fa-star" />
                                <i className="ic-yellow fa fa-star" />
                                </div>
                                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata</p>
                            </div>
                            </div>
                        </li>
                        <li>
                            <div className="single-comment-wrap">
                            <div className="thumb">
                                <img src="assets/img/client/3.png" alt="img" />
                            </div>
                            <div className="content">
                                <h4 className="title">Eliza Jordan</h4>
                                <span className="date">17 SEP 2019</span>
                                <div className="tp-review-meta">
                                <i className="ic-yellow fa fa-star" />
                                <i className="ic-yellow fa fa-star" />
                                <i className="ic-yellow fa fa-star" />
                                <i className="ic-yellow fa fa-star" />
                                <i className="ic-yellow fa fa-star" />
                                </div>
                                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata</p>
                            </div>
                            </div>
                        </li>
                        </ul>
                        <div className="btn-wrapper text-right mt-3">
                        <a className="btn-read-more" href="#"><span>Plus de commentaires<i className="la la-arrow-right" /></span></a>
                        </div>
                    </div>
                    <div className="location-review-area">
                        <form className="tp-form-wrap bg-gray tp-form-wrap-one">
                        <div className="row">
                            <div className="col-lg-6"><h4 className="single-page-small-title">Ecrire un commentaire</h4></div>
                            <div className="col-lg-6">
                            <div className="tp-review-meta text-lg-right">
                                <span className="mr-3 ml-0">Vote</span>
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                            </div>
                            </div>
                            <div className="col-lg-6">
                            <label className="single-input-wrap">
                                <span className="single-input-title">Nom</span>
                                <input type="text" />
                            </label>
                            </div>
                            <div className="col-lg-6">
                            <label className="single-input-wrap">
                                <span className="single-input-title">Email</span>
                                <input type="text" />
                            </label>
                            </div>
                            <div className="col-lg-12">
                            <label className="single-input-wrap">
                                <span className="single-input-title">Commentaire</span>
                                <textarea defaultValue={""} />
                            </label>
                            </div>
                            <div className="col-12">
                            <a className="btn btn-yellow" href="#">Envoyé</a>
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
        // CSS -  //
    
        container:{
            marginTop:'0',
        },
    
        gallery:{
            background:'#006271'
        }
    
        
    
    
    
    };





export default ScreenPartner;




