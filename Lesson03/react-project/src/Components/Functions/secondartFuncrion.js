/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React from 'react';

export const totalPrice = order => {

  const countTopping = order.topping && order.topping.filter(item => item.checked).length;

  const priceTopping = order.topping ? (order.price * 0.1) * countTopping : null;

  return (order.price + priceTopping) * order.count;
}

export const totalTopping = order => {

  const valueTopping = order.topping && order.topping.filter(item => item.checked);
  
  const ArrTopping = order.topping && valueTopping.map(item => item.name);

  return ArrTopping ? ArrTopping.join(' + ') : '';
 
}

export function formatCurrency( data ) {

  return data.toLocaleString('ru-RU', {style: 'currency', currency: 'RUB'});

} 