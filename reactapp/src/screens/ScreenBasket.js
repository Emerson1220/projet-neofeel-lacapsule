import React, { useState } from 'react';
import '../styles/basket.css'
import Nav from '../components/Nav';
import { Modal, Divider } from 'antd';
import RedButton from '../components/RedButton'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const ScreenBasket = () => {
    const [visible, setVisible] = useState(false)
    const [paymentInfo, setPaymentInfo] = useState({});
    const [total, setTotal] = useState(65);
    const [hover, setHover] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(false)


    const stripe = useStripe();
    const elements = useElements();

    const toggleModal = () => {
        setVisible(!visible)
        
       
    };

    const options = {
        style: {
            base: {
                fontSize: '16px',
                color: 'rgb(16, 98, 113)',
            },
            invalid: {
                color: '#9e2146',
            },
        },
        hidePostalCode: true
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        
        const billingDetails = {
            name: `${paymentInfo.firstName} ${paymentInfo.lastName}`,
            email: paymentInfo.email,
            phone: paymentInfo.phone,
            address: {
                city: paymentInfo.city,
                line1: `${paymentInfo.streetNumber} ${paymentInfo.streetName}`,
                postal_code: paymentInfo.zipcode,
                country: 'fr'
            }
        };

        const cardElement = elements.getElement(CardElement);

        try {
            let rawResponse =  await fetch('/auth/stripe', {
                method: 'post',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: `amount=${total * 100}`
            })
            let response = await rawResponse.json();
            
            const paymentMethodReq = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: billingDetails
            })
    
            const clientSecret = response.clientSecret;
            console.log(clientSecret)
        
            const {paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethodReq.paymentMethod.id
            });
            console.log(paymentIntent)

            if (paymentIntent.status === 'succeeded'){
                setPaymentMethod(true)
            }
            
    
        } catch (err) {
            console.log(err)
        }
    };

    let modalContent;

    if (paymentMethod === true) {
        
        modalContent = 
        <Modal
            centered={true}
            closable={true}
            visible={visible}
            footer={null}
            maskClosable={true}
            onCancel={() => toggleModal()}
            bodyStyle={{ background: 'linear-gradient(#106271, #FFF)', padding: '8%', boxShadow: '1px 0px 45px rgba(16, 98, 113, 0.4)' }}
        >
            <h2 style={{ color: 'black' }}>Confirmation de votre commande.</h2>
            <h4> Votre commande a bien été prise en compte.<br/>
                 Vous recevrez un mail de confirmation dans les prochaines minutes. </h4>
                 <img style={{display:'flex',marginLeft:'24%', width:'50%'}}src='./images/LOGOcontracter.png'/>
        </Modal>
    } else {
        
        modalContent=
        <Modal
            centered={true}
            closable={true}
            visible={visible}
            footer={null}
            maskClosable={true}
            onCancel={() => toggleModal()}
            bodyStyle={{ background: 'linear-gradient(#106271, #FFF)', padding: '8%', boxShadow: '1px 0px 45px rgba(16, 98, 113, 0.4)' }}
        >
            <h2 style={{ color: 'black' }}>Checkout</h2>
            <form
                style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={handleSubmit}
            >
                <div style={styles.formItem}>
                    <h4 style={styles.sectionTitle}>Nom</h4>
                    <input
                        name='firstName'
                        placeholder='prénom'
                        className='input'
                        value={ paymentInfo.firstName }
                        onChange={ (e)=>setPaymentInfo(Object.assign({ ...paymentInfo }, { firstName: e.target.value })) }>
                        </input>
                        <input
                        name='lastname'
                        placeholder='nom'
                        className='input'
                        value={paymentInfo.lastName}
                        onChange={(e) => setPaymentInfo(Object.assign({ ...paymentInfo }, { lastName: e.target.value }))}>
                    </input>
                </div>
                <div style={styles.formItem}>
                    <h4 style={styles.sectionTitle}>Adresse</h4>
                    <input
                        name="streetNumber"
                        placeholder='n. de voie'
                        className='input'
                        value={paymentInfo.streetNumber}
                        onChange={(e) => setPaymentInfo(Object.assign({ ...paymentInfo }, { streetNumber: e.target.value }))}>
                    </input>
                    <input
                        name="streetName"
                        placeholder='libellé de voie'
                        className='input'
                        value={paymentInfo.streetName}
                        onChange={(e) => setPaymentInfo(Object.assign({ ...paymentInfo }, { streetName: e.target.value }))}>
                    </input>
                    <input
                        name="city"
                        placeholder='ville'
                        className='input'
                        value={paymentInfo.city}
                        onChange={(e) => setPaymentInfo(Object.assign({ ...paymentInfo }, { city: e.target.value }))}>
                    </input>
                    <input
                        name="zipcode"
                        placeholder='code postale'
                        className='input'
                        value={paymentInfo.zipcode}
                        onChange={(e) => setPaymentInfo(Object.assign({ ...paymentInfo }, { zipcode: e.target.value }))}>
                    </input>
                    <input
                        name="country"
                        placeholder='pays'
                        className='input'
                        value={paymentInfo.country}
                        onChange={(e) => setPaymentInfo(Object.assign({ ...paymentInfo }, { country: e.target.value }))}>
                    </input>
                </div>
                <div style={styles.formItem}>
                    <h4 style={styles.sectionTitle}>Contact</h4>
                    <input
                        name="email"
                        placeholder='adresse mail'
                        className='input'
                        value={paymentInfo.email}
                        onChange={(e) => setPaymentInfo(Object.assign({ ...paymentInfo }, { email: e.target.value }))}>
                    </input>
                    <input
                        name="phone"
                        placeholder='numéro de téléphone'
                        className='input'
                        value={paymentInfo.phone}
                        onChange={(e) => setPaymentInfo(Object.assign({ ...paymentInfo }, { phone: e.target.value }))}>
                    </input>
                </div>
                <div style={styles.formItem}>
                    <h4 style={styles.sectionTitle}>Paiement</h4>
                    <div style={styles.cardElementContainer}>
                        <CardElement
                            options={options}
                        />
                    </div>

                    <button style={hover ? styles.buttonHover : styles.button}  onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} htmlType='submit' disabled={!stripe}>
                        <h2 style={styles.buttonText}>Confirmer</h2>
                    </button>

                </div>
            </form>
        </Modal>
    }





    return (
        <div>
            <Nav />
            <div style={styles.container}>
                <div className='summary' >
                    <Divider orientation='center' style={styles.divider}>Mon Neopass</Divider>
                    <div style={styles.neopassContainer}>
                        <div style={{ height: '100px', width: '200px', backgroundColor: 'blue', borderRadius: '5px' }}>
                            <img style={{ width: '100%', borderRadius: '15px' }} src='./images/neopassRecto.png'  alt="neopass"/>
                        </div>
                        <div style={{ color: 'white' }}>
                            <h2 style={{color:'black'}}>NEOPASS Alsaces-Vosges</h2>
                        </div>
                    </div>
                    <div style={styles.basket}>
                        <Divider style={styles.divider}>Ma Commande</Divider>
                        <table style={styles.table}>
                            <tbody>
                                <tr>
                                    <td>Neopass (région)</td>
                                    <td style={styles.lastTableRow}>€60</td>
                                </tr>
                                <tr>
                                    <td>Frais de port</td>
                                    <td style={styles.lastTableRow}>€5</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>Total</th>
                                    <td style={styles.lastTableRow}>€65</td>
                                </tr>
                            </tfoot>
                        </table>

                        <div style={styles.buttonContainer}>
                            <RedButton
                                title="Payer par carte"
                                onSelect={() => toggleModal()} />
                            <form onSubmit={handleSubmit}>
                            </form>
                        </div>
                    </div>

                    
                        {modalContent}
                    
                </div>

            </div>
        </div>
    )

}

export default ScreenBasket;

/*{id: "pm_1IvI3eK4yUyeZ8DTF8qwBqg7", object: "payment_method", billing_details: {…}, card: {…}, created: 1622017542, …}
billing_details:
address:
city: "Maisons laffitte"
country: null
line1: "32 avenue de longueil 3eme etage"
line2: null
postal_code: "78600"
state: null
__proto__: Object
email: "ferrandpierremarie@gmail.com"
name: "undefined eyanrd"
phone: null */










const styles = {
    container: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingTop: '3%',


    },

    basket: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgba(255,255,255,0.6)',
        color: 'black',
        borderRadius: '8px',
        position: 'relative',
        overflow: 'hidden',
        marginTop: '5%',

    },
    buttonContainer: {
        alignSelf: 'flex-end',
        width: '30%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        paddingRight: '2%',
        paddingBottom: '1%'
    },
    table: {
        color: 'black',
        marginLeft: '5%',
        marginRight: '5%'
    },
    lastTableRow: {
        textAlign: 'end',
    },

    divider: {

        color: 'black',
        paddingBottom: '1%'
    },
    neopassContainer: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    formItem: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    input: {
        '::WebkitInputPlaceholder': {
            color: 'rgb(16, 98, 113, 0.4)',
        },
    },
    button: {
        backgroundColor: 'rgb(224, 104, 104)',
        border: 'none',
        margin: '2%',
        boxShadow: '2px, 2px, 2px rgba(0, 0, 0, 0.5)',
        borderRadius: '5px'
    },
    buttonHover: {
        border: 'none',
        margin: '2%',
        backgroundColor: "rgba(224, 104, 104, 0.8)",
        borderRadius: '5px',
        transform: `scale(1.07)`
    },
    buttonText: {
        color: 'white',
        whiteSpace: 'nowrap',
        flexWrap: 'nowrap',
        padding: 6,
        margin: 0,
        lineHeight: '1.6rem',
        fontSize: '0.9rem',
        fontWeight: 'bold'
    },
    sectionTitle: {
        marginBottom: '1px',
        marginTop: '3px'
    },
    cardElementContainer: {
        border: '1px solid rgba(0, 0, 0, 0.2)',
        borderRadius: '2px',
        padding: 2
    }
}