import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RoadPlanner {

    render() {


return	<div className="tour-list-area pd-top-120 viaje-go-top">
            <div className="container">
                <div className="row">
                    <div className="col-xl-9 col-lg-8 order-lg-12">

                        <div className="tp-tour-list-search-area">
                            <div className="row">
                                <div className="col-xl-3 col-sm-6">
                                    <label className="single-input-wrap tour-list-search-icon">
                                        <i className="la la-arrow-up" />
                                        <input type="text" placeholder="Trier par..." />
                                    </label>
                                </div>

                                <div className="col-xl-3 col-sm-6">
                                    <label className="single-input-wrap tour-list-search-icon">
                                        <i className="la la-arrow-down" />
                                        <input type="text" placeholder="Trier par..." />
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-sm-6">
                                <div className="single-destinations-list style-two">
                                    <div className="thumb">
                                        <img src={publicUrl+"assets/img/destination-list/4.png"} alt="list" />
                                    </div>
                                    <div className="details">
                                        <p className="location"><img src={"images/icons-geo.png"} alt="map" />Région</p>
                                        <h4 className="title"><Link to="/">Name</Link></h4>
                                        <p className="content">Activiy</p>

                                        <div className="tp-price-meta">
                                            <h2>Price<small></small></h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    }
}

export default RoadPlanner
