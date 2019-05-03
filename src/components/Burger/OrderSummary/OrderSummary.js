import React from 'react';

import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const ingredients = {...props.ingredients};
    
    const summary = Object.keys(ingredients).map((ing,i)=>{
        return <li key={ing + i} >
            <span style={{textTransform: 'capitalize'}}>{ing}</span>: {ingredients[ing]}</li>
    })

    return ( 
        <React.Fragment>
            <h3>Your order</h3>
            <p> A delicious burger with the following ingredients: </p>
            <ul>
                {summary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger"
            clicked={props.purchaseCanceled}
            >CANCEL</Button>
            <Button  clicked={props.purchaseContinue} btnType="Success">CONTINUE</Button>
        </React.Fragment>
     );
}
 
export default orderSummary;