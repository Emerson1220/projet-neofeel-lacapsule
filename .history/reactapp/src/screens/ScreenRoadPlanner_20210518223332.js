import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav'

function ScreenRoadPlanner() {

    return (	
    <div>
            <Nav />
                <div style={ styles.container }>
                    <div>
                        <img style={ styles.map } src="images/photo-526x360.png" alt="list" />
                    </div>

                    <div style={ styles.row }>

                        <div style={ styles.col_xl_9}>                           
                            <div style={{ marginBottom:'40px' }}> {/* Filters */}

                                <div style={ styles.row_filters }>
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
                            
                            <div style={ styles.experiences_list_area }> {/* Container -> Card exp??rience */}

                                <div style={ styles.single_destinations}> {/* Card exp??rience */}
                                    <div style={ styles.image_card }>
                                        <img style={ styles.image } src="images/photo-526x360.png" alt="list" />
                                    </div>
                                    <div style={ styles.detail_card }>
                                        <div>
                                            <h3><Link style={ styles.h3 } to="/">Activit??</Link></h3>
                                            <h4><Link style={ styles.h4 } to="/">Nom du partenaire</Link></h4>
                                        </div>
                                        <div style={ styles.display_inline}>
                                            <p style={{ color: '#e06868', marginBottom: '8px'}}><img style={{ marginRight: '4px'}} src="images/icone-geo.png" alt="map" />R??gion</p>
                                            <h4 ><Link style={ styles.h4 }  to="/">Ville</Link></h4>
                                        </div>
                                        {/* <p style={ styles.card_content } >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et.</p> */}
                                        <div style={ styles.liste_price }>
                                            <ul style= { Object.assign(styles.liste_price_content, styles.liste_price_li) }>
                                                <li><i style={ styles.icons_fa }/> Temps</li>
                                                <li><i style={ styles.icons_fa }/> 2 heures</li>
                                            </ul>
                                        </div>
                                        <div style={ styles.liste_price_item }>
                                            <p>Prix</p>
                                            <h2>80 <span>???</span></h2>
                                        </div>

                                    </div>
                                </div> {/* End -> Card exp??rience */}

                                <div style={ styles.single_destinations}> {/* Card exp??rience */}
                                    <div style={ styles.image_card }>
                                        <img style={ styles.image } src="images/photo-526x360.png" alt="list" />
                                    </div>
                                    <div style={ styles.detail_card }>
                                        <div>
                                            <h3><Link style={ styles.h3 } to="/">Activit??</Link></h3>
                                            <h4><Link style={ styles.h4 } to="/">Nom du partenaire</Link></h4>
                                        </div>
                                        <div style={ styles.display_inline}>
                                            <p style={{ color: '#e06868', marginBottom: '8px'}}><img style={{ marginRight: '4px'}} src="images/icone-geo.png" alt="map" />R??gion</p>
                                            <h4 ><Link style={ styles.h4 }  to="/">Ville</Link></h4>
                                        </div>
                                        {/* <p style={ styles.card_content } >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et.</p> */}
                                        <div style={ styles.liste_price }>
                                            <ul style={ Object.assign(styles.liste_price_content, styles.liste_price_li ) }>
                                                <li><i style={ styles.icons_fa }/> Temps</li>
                                                <li><i style={ styles.icons_fa }/> 2 heures</li>
                                            </ul>
                                        </div>
                                        <div style={ styles.liste_price_item }>
                                            <p>Prix</p>
                                            <h2>80 <span>???</span></h2>
                                        </div>

                                    </div>
                                </div> {/* End -> Card exp??rience */}

                                <div style={ styles.single_destinations}> {/* Card exp??rience */}
                                    <div style={ styles.image_card }>
                                        <img style={ styles.image } src="images/photo-526x360.png" alt="list" />
                                    </div>
                                    <div style={ styles.detail_card }>
                                        <div>
                                            <h3><Link style={ styles.h3 } to="/">Activit??</Link></h3>
                                            <h4><Link style={ styles.h4 } to="/">Nom du partenaire</Link></h4>
                                        </div>
                                        <div style={ styles.display_inline}>
                                            <p style={{ color: '#e06868', marginBottom: '8px'}}><img style={{ marginRight: '4px'}} src="images/icone-geo.png" alt="map" />R??gion</p>
                                            <h4 ><Link style={ styles.h4 }  to="/">Ville</Link></h4>
                                        </div>
                                        {/* <p style={ styles.card_content } >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et.</p> */}
                                        <div style={ styles.liste_price }>
                                            <ul style={ Object.assign(styles.liste_price_content, styles.liste_price_li )}>
                                                <li><i style={ styles.icons_fa }/> Temps</li>
                                                <li><i style={ styles.icons_fa }/> 2 heures</li>
                                            </ul>
                                        </div>
                                        <div style={ styles.liste_price_item }>
                                            <p>Prix</p>
                                            <h2>80 <span>???</span></h2>
                                        </div>

                                    </div>
                                </div> {/* End -> Card exp??rience */}



                                
                            </div> {/* End -> Container -> Card exp??rience */}
                            <div style={ styles.text_align_center}> {/* Pagination */}
                                <div style={ Object.assign(styles.display_inline, styles.pagination) }>
                                    <ul style={ styles.pagination_ul}>
                                        <li><a style={ styles.pagination_li } href=""><i    /></a></li>
                                        <li><a style={ styles.pagination_li } href="">1</a></li>
                                        <li><a style={ styles.pagination_li } href="">2</a></li>
                                        <li><a style={ styles.pagination_li } href="">3</a></li>
                                        <li><a style={ styles.pagination_li } href="">4</a></li>
                                        <li><a style={ styles.pagination_li } href=""><i /></a></li>
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

    // CSS - ARCHITECTURE//

    container: {
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)', 
        paddingBTop: '1rem',       
        paddingright: '15px',
        paddingleft: '15px',
        marginTop:'2rem',
        marginright: 'auto',
        marginleft: 'auto',
    },

    row:{
        display: 'flex',
        flexWrap: 'wrap',
    },

    row_filters:{
        display: 'flex',
        flexWrap: 'wrap',
        marginRight: '-15px',
        marginLeft: '-15px',
        // padding: '2rem',
    },

    col_xl_9:{
        position: 'relative',
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

    display_inline:{
        display: 'inline-flex',
    },

    text_align_center:{
        textAlign:'center',
    },

    // CSS - MAP //

    map:{
        width:'40%', 
        height:'auto', 
        position: 'fixed',
        top: '100px',
        left: '10px',
        padding:'1rem',
    },


    // CSS - ICONS //

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

    // CARD - TITLE//

    h3:{
        fontWeight:'bold',
        fontSize: '28px',
        color: '#106271',
        textDecoration: 'none',
    },

    h4:{
        fontSize: '20px',
        color: '#e06868',
        textDecoration: 'none',
    },

    // CARD - CSS //

    experiences_list_area:{
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',        
        boxSizing: 'border-box',
        outline: 'none',
        paddingLeft: '1rem',
        paddingRight: '1rem',

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
        margin: '.5rem',
    },

    image_card:{
        position: 'relative',
        background: '#fff',
        overflow: 'hidden',
        flex: '0 0 30%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        minHeight: '200px',
        borderRadius: '5px',
    },

    image:{
        width: '100%',
        height: '70%',
        // objectFit: 'cover',
        objectFit: 'contains',
        objectPosition: 'center center',
        borderRadius: '5px',
    },

    detail_card:{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',        
        flex: '0 0 70%',
        padding: '22px 15px',
        background: '#ffffff',
    },

    card_content:{
        marginBottom: '15px',
        color: '#bcbcbc',
        hyphens: 'auto',
    },

    liste_price:{
        marginTop: '20px',
        display: 'flex',
        boxSizing: 'border-box',
        outline: 'none',
    },

    liste_price_li:{
        margin: '0 10px',
        fontSize: '14px',
        listStyle: 'none',
        display: 'inline-block',
    },


    liste_price_content:{
        float: 'left',
        marginTop: '20px',  
        margin: '0',
        padding: '0',
        display: 'inline-block',      
    },

    icons_fa:{
        display: 'inline-block',
        font: 'normal normal normal 14px/1 FontAwesome',
        fontSize: 'inherit',
        textRendering: 'auto',
        color: '#01B9B7',
        marginRight: '5px',
    },

    liste_price_item:{
        paddingLeft: '30px',
        marginLeft: '20px',
        borderLeft: '1px solid #CFD3DE',
        paddingTop: '0',    
    },

    // PAGINATION - CSS //

    pagination:{
        display: 'inline-block',
        textAlign: 'center',   
        marginTop: '.5rem',    
    },

    pagination_ul:{
        display: 'flex',
        flexDirection: 'row',
        listStyleType: 'none',
    },

    pagination_li:{
        lineHeight: '43px',
        border: '2px solid #CFD3DE',
        borderRadius: '50%',
        textAlign: 'center',
        display: 'inline-block',
        color: '#97A1B3', 
        width: '42px',
        height: '42px',
        margin: '0 5px', 
    },

    }        
    

export default ScreenRoadPlanner;