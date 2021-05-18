import React from 'react';
import '../App.css';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import Nav from '../Nav'

function ScreenRoadPlanner() {

    return (	<div style={{ paddingTop:'120px' }}>

                <div style={ styles.container }>

                    <div style={ styles.row }>

                        <div style={ styles.col_xl_9 }>                           
                            <div style={{ marginBottom:'40px' }}> {/* Filters */}

                                <div style={ styles.row }>
                                    <div style={ styles.col_xl_3 }>
                                        <label style={ styles.single_input_wrap }>
                                            <i style={ styles.icons_la }/> 
                                            <input style={ styles.single_input_wrap_input } type="text" placeholder="Filtre 1" />
                                        </label>
                                    </div>

                                    <div style={ styles.col_xl_3 }>
                                        <label style={ styles.single_input_wrap }>
                                            <i style={ styles.icons_la }/> 
                                            <input style={ styles.single_input_wrap_input } type="text" placeholder="Filtre 2" />
                                        </label>
                                    </div>

                                    <div style={ styles.col_xl_3 }>
                                        <label style={ styles.single_input_wrap }>
                                            <i style={ styles.icons_la }/> 
                                            <input style={ styles.single_input_wrap_input } type="text" placeholder="Filtre 3" />
                                        </label>
                                    </div>
                                </div>
                            </div> {/* End -> ButtonFilters */}
                            
                            <div style={ styles.experiences_list_area }> {/* Container -> Card expérience */}
                                <div style={ styles.single_destinations}> {/* Card expérience */}
                                    <div style={ styles.image_card }>
                                        <img src="images/photo-526x360.png" alt="list" />
                                    </div>
                                    <div style={ styles.detail_card }>
                                        <div>
                                            <i style={ styles.icons_fa_1  }/>
                                            <i style={ styles.icons_fa_1 } />
                                            <i style={ styles.icons_fa_1  } />
                                            <i style={ styles.icons_fa_1  } />
                                            <i style={ styles.icons_fa_2  } />
                                            <span>4.0</span>
                                        </div>

                                        <p style={{ color: '#e06868', marginBottom: '8px'}}><img src="images/icone-geo.png" alt="map" />Région</p>
                                        <h4 style={ styles.h4 } ><Link to="/">Ville</Link></h4>
                                        <p style={ styles.card_content } >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et.</p>
                                        
                                        <div style={ styles.liste_price }>
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
    },

    col_xl_9:{
        position: 'relative',
        flex: '0 0 75%',
        maxWidth: '75%',
        width: '100%',
        minHeight: '1px',
        paddingRight: '15px',
        paddingLeft: '15px',
        },

    col_xl_3:{
        position: 'relative',
        flex: '0 0 25%',
        maxWidth: '25%',
        width: '100%',
        minHeight: '1px',
        paddingRight: '15px',
        paddingLeft: '15px',
        },

    single_input_wrap:{
        position: 'relative',
        width: '100%',
        marginBottom: '18px',
        display: 'inline-block',        
    },

    single_input_wrap_input:{
        background: '#ffffff',
        border: '1px solid #EAEAEA',
        height: '52px',
        width: '100%',       
    },

    icons_la:{
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

    experiences_list_area:{
        boxSizing: 'border-box',
        outline: 'none',
    },

    single_destinations:{
        display: 'flex',
        flexWrap: 'wrap',
        margin: '0 0 30px 0',
        border: '1px solid #CFD3DE',
        boxShadow: '0px 3px 9px #071c551f',
        borderRadius: '7px',
        position: 'relative',
        overflow: 'hidden',
    },

    image_card:{
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

    detail_card:{
        flex: '0 0 70%',
        padding: '22px 15px',
        background: '#ffffff',
    },

    icons_fa_1:{
        display: 'inline-block',
        font: 'normal normal normal 14px/1 FontAwesome',
        fontSize: 'inherit',
        textRendering: 'auto',
        color: '#f3941e',
    },

    icons_fa_2:{
        display: 'inline-block',
        font: 'normal normal normal 14px/1 FontAwesome',
        fontSize: 'inherit',
        textRendering: 'auto',
        color: '#d4d4d4',
    },

    h4:{
        fontSize: '20px',
        color: '#e06868',
    },

    card_content:{
        marginBottom: '15px',
        color: '#bcbcbc',
        hyphens: 'auto',
    },

    liste_price:{
        marginTop: '20px',
        display: 'block',
        boxSizing: 'border-box',
        outline: 'none',
    },



    }        
    












export default ScreenRoadPlanner;