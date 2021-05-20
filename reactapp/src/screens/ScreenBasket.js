import React, { useState } from 'react';
import Nav from '../components/Nav';
import { Divider, Table } from 'antd';
import RedButton from '../components/RedButton'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const ScreenBasket =  () => {
    const stripe= useStripe();
    const elements = useElements();

    const handleSubmit = async(event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const cardElement = elements.getElement(CardElement);
    
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement
        })

        if (error) {
            console.log('[error]', error)
        } else {
            console.log('[PaymentMethod', paymentMethod)
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
                title="Payer par carte" />
                <form onSubmit={ handleSubmit }>
                <CardElement
                options={{
                    style: {
                    base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                        color: '#aab7c4',
                        },
                    },
                    invalid: {
                        color: '#9e2146',
                    },
                    },
                }}
                />
                <RedButton
                title="Payer avec Stripe" />
                </form>
            </div>

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
        borderRadius: '8px'
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
    }
}