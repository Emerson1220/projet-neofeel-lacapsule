import React from 'react';
import '../App.css';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import Nav from '../Nav'

function ScreenRoadPlanner() {

    return (	<div style={{ paddingTop:'120px' }}>

                <div style={ styles.container }>

                    <div tyle={ styles.row }>

                        <div className="col-xl-9 col-lg-8 order-lg-12">                           
                            <div className="tp-tour-list-search-area"> {/* Filters */}
                                <div className="row">
                                    <div className="col-xl-3 col-sm-6">
                                        <label className="single-input-wrap tour-list-search-icon">
                                        <i className="la la-arrow-up" />
                                        <input type="text" placeholder="Filtre 1" />
                                        </label>
                                    </div>

                                    <div className="col-xl-3 col-sm-6">
                                        <label className="single-input-wrap tour-list-search-icon">
                                        <i className="la la-arrow-down" />
                                        <input type="text" placeholder="Filtre 2" />
                                        </label>
                                    </div>

                                    <div className="col-xl-3 col-sm-6">
                                        <label className="single-input-wrap">
                                        <i className="fa fa-paper-plane" />
                                        <input type="text" placeholder="Filtre 3" />
                                        </label>
                                    </div>
                                </div>
                            </div> {/* End -> ButtonFilters */}
                            
                            <div className="tour-list-area"> {/* Container -> Card expérience */}
                                <div className="single-destinations-list style-three"> {/* Card expérience */}
                                    <div className="thumb">
                                        <img src="images/photo-526x360.png" alt="list" />
                                    </div>
                                    <div className="details">
                                        <div className="tp-review-meta">
                                            <i className="ic-yellow fa fa-star" />
                                            <i className="ic-yellow fa fa-star" />
                                            <i className="ic-yellow fa fa-star" />
                                            <i className="ic-yellow fa fa-star" />
                                            <i className="fa fa-star" />
                                            <span>4.0</span>
                                        </div>

                                        <p className="location"><img src="images/icone-geo.png" alt="map" />Région</p>
                                        <h4 className="title"><Link to="/tour-details">Ville</Link></h4>
                                        <p className="content">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et.</p>
                                        
                                        <div className="list-price-meta">
                                            <ul className="tp-list-meta d-inline-block">
                                                <li><i className="fa fa-clock-o" /> Temps</li>
                                                <li><i className="fa fa-star" /> 4.3</li>
                                            </ul>
                                            <div className="tp-price-meta d-inline-block">
                                                <p>Prix</p>
                                                <h2>80 <span>€</span></h2>
                                            </div>
                                        </div>
                                    </div>
                                </div> {/* End -> Card expérience */}
                            </div> {/* End -> Container -> Card expérience */}

                            
                            <div className="text-md-center text-left"> {/* Pagination */}
                                <div className="tp-pagination text-md-center text-left d-inline-block mt-4">
                                    <ul>
                                        <li><a className="prev page-numbers" href="#"><i className="la la-long-arrow-left" /></a></li>
                                        <li><span className="page-numbers">1</span></li>
                                        <li><span className="page-numbers current">2</span></li>
                                        <li><a className="page-numbers" href="#">3</a></li>
                                        <li><a className="page-numbers" href="#">4</a></li>
                                        <li><a className="next page-numbers" href="#"><i className="la la-long-arrow-right" /></a></li>
                                    </ul>                          
                                </div>
                            </div>{/* End -> Pagination */}
                        </div>
                    </div>
                </div>
            </div>
    )
};

let styles = {
    container: {
        width: '100%',
        paddingright: '15px',
        paddingleft: '15px',
        marginright: 'auto',
        marginleft: 'auto',
    },

    row:{
        display: 'flex',
        flexWrap: 'wrap',
        marginRight: '-15px',
        marginLeft: '-15px',
    }



}





export default ScreenRoadPlanner;