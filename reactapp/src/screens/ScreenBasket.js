import React, { useState } from 'react';
import '../styles/antdmodif.css'
import Nav from '../components/Nav';
import { Modal, Divider } from 'antd';
import RedButton from '../components/RedButton'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const ScreenBasket =  () => {
    const [visible, setVisible] = useState(false)
    const [paymentInfo, setPaymentInfo] = useState({});
    const [total, setTotal] = useState(65);

    const stripe= useStripe();
    const elements = useElements();

    const toggleModal = () => {
        setVisible(!visible)
    };
    
    const options = {
        style: {
        base: {
            fontSize: '16px',
            color: 'rgb(16, 98, 113)',
            '::placeholder': {
            color: 'rgb(16, 98, 113, 0.4)',
            },
        },
        invalid: {
            color: '#9e2146',
        },
        },
        hidePostalCode: true
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const billingDetails = {
            name: `${paymentInfo.firstName} ${paymentInfo.lastName}`,
            email: paymentInfo.email,
            address: {
                city: paymentInfo.city,
                line1: `${paymentInfo.streetNumber} ${paymentInfo.streetName}`,
                postal_code: paymentInfo.zipcode
            }
        };

        let rawResponse =  await fetch('/auth/stripe', {
            method: 'post',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `amount=${total*100}`
        })
        let response = await rawResponse.json();
        const clientSecret = response.clientSecret;

        const cardElement = elements.getElement(CardElement);
    
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: billingDetails
        })

        if (error) {
            console.log('[error]', error)
        } else {
            console.log('[PaymentMethod]', paymentMethod)
        }
    };

    return (
    <div>
        <Nav />
        <div style={ styles.container }>
        <div style={ styles.summary }>
        <Divider orientation='left'>Mon Neopass</Divider>
            <div style={ styles.neopassContainer }>
                <div style={{ height: '100px', width: '200px', backgroundColor: 'blue', borderRadius: '5px'}}>NEOPASS</div>
                <div>
                    <h4>Mes avantages sur mon prochain voyage</h4>
                    <ul>
                        <li>avantage 1</li>
                        <li>avantage 2</li>
                        <li>avantage 3</li>
                    </ul>
                </div>
            </div>
        </div>
        <div style={ styles.basket }>
            <Divider style={ styles.divider }>Ma Commande</Divider>
            <table style={ styles.table }>
                <tbody>
                    <tr>
                        <td>Neopass (région)</td>
                        <td style={ styles.lastTableRow }>€60</td>
                    </tr>
                    <tr>
                        <td>Frais de port</td>
                        <td style={ styles.lastTableRow }>€5</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th>Total</th>
                        <td style={ styles.lastTableRow }>€65</td>
                    </tr>
                </tfoot>
            </table>
            <div style={ styles.buttonContainer }>
                <RedButton
                title="Payer par carte"
                onSelect={ ()=>toggleModal() } />
                <form onSubmit={ handleSubmit }>
 
            </form>
            </div>
                <Modal
                title="Checkout"
                centered={ true }
                closable={ false }
                onClose={ ()=>toggleModal() }
                visible={ visible }
                footer={ null }
                >
                <form
                style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={ handleSubmit }
                >
                    <h3>Nom</h3>
                    <input
                    name='firstName'
                    placeholder='prénom'
                    value={ paymentInfo.firstName }
                    onChange={ (e)=>setPaymentInfo({ ...paymentInfo }, { firstName: e.target.value }) }>
                    </input>
                    <input
                    name='lastname'
                    placeholder='nom'
                    value={ paymentInfo.lastName }
                    onChange={ (e)=>setPaymentInfo(Object.assign({ ...paymentInfo }, { lastName: e.target.value })) }>  
                    </input>
                    <h3>Adresse</h3>
                    <input
                    name="streetNumber"
                    placeholder='n. de voie'
                    value={ paymentInfo.streetNumber }
                    onChange={ (e)=>setPaymentInfo(Object.assign({ ...paymentInfo }, { streetNumber: e.target.value })) }>
                    </input>
                    <input
                    name="streetName"
                    placeholder='libellé de voie'
                    value={ paymentInfo.streetName }
                    onChange={ (e)=>setPaymentInfo(Object.assign({ ...paymentInfo }, { streetName: e.target.value })) }>
                    </input>
                    <input
                    name="city"
                    placeholder='ville'
                    value={ paymentInfo.city }
                    onChange={ (e)=>setPaymentInfo(Object.assign({ ...paymentInfo }, { city: e.target.value })) }>
                    </input>
                    <input
                    name="zipcode"
                    placeholder='code postale'
                    value={ paymentInfo.zipcode }
                    onChange={ (e)=>setPaymentInfo(Object.assign({ ...paymentInfo }, { zipcode: e.target.value })) }>
                    </input>                        
                    <input
                    name="country"
                    placeholder='pays'
                    value={ paymentInfo.country }
                    onChange={ (e)=>setPaymentInfo(Object.assign({ ...paymentInfo }, { country: e.target.value })) }>
                    </input> 
                    <h3>Contact</h3>                   
                    <input
                    name="email"
                    placeholder='adresse mail'
                    value={ paymentInfo.email }
                    onChange={ (e)=>setPaymentInfo(Object.assign({ ...paymentInfo }, { email: e.target.value })) }>
                    </input>                        
                    <input
                    name="phone"
                    placeholder='numéro de téléphone'
                    value={ paymentInfo.phone }
                    onChange={ (e)=>setPaymentInfo(Object.assign({ ...paymentInfo }, { phone: e.target.value })) }>
                    </input>  
                    <h3>Paiement</h3>                  
                    <CardElement
                    options={ options }
                    />
                    <button htmlType='submit' disabled={ !stripe }>Confirmer</button>
                </form>
                </Modal> 
            </div>

        </div>
    </div>
    )

}

export default ScreenBasket;

const styles = {
    container: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
        paddingTop: '3%'
    },
    summary: {
        width: '45%',
        marginLeft: '4%',
        paddingTop: '1%'
    },
    basket: {
        width: '55%',
        display: 'flex',
        flexDirection: 'column',
        marginRight: '4%',
        backgroundColor: 'rgba(16, 98, 113, 0.7)',
        borderRadius: '8px',
        position: 'relative',
        overflow: 'hidden'
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
        color: 'white',
        marginLeft: '5%',
        marginRight: '5%'
    },
    lastTableRow: { 
        textAlign: 'end', 
    },
    divider: {
        color: 'white'
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

}