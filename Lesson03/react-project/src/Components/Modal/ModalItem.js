/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import {ButtonCheckout} from '../Style/ButtonCheckout';
import { CountItem } from './CounItem';
import { useCount } from '../Hooks/useCount';
import { totalPrice } from '../Functions/secondartFuncrion';
import { formatCurrency } from '../Functions/secondartFuncrion';
import { Toppings } from './Toppings';
import { Choices } from './Choices';
import { useToppings } from '../Hooks/useTopping';
import { useChoices } from '../Hooks/useChoices';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  z-index: 30;
  overflow-y: auto;
`;

const Modal = styled.div`
  position: relative;
  background-color: #fff;
  width: 600px;
  border: 2px solid #299B01;
  z-index: 35;
`;

const ModalOrder = styled.div `
  position: relative;
  background-color: #fff;
  width: 600px;
  height: 300px;
  border: 2px solid #299B01;
  z-index: 35;
`;

const Thankfulness = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  font-size: 25px;
  font-weight: 600;

`;


const Banner = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${({img}) => img});
  background-size: cover;
  background-position: center;

`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 40px 30px 37px;
  justify-content: space-between;
  height: calc(100% - 200px);
`;

const ContainerOrder = styled.div `
  display: flex;
  align-items: center;
  padding: 20px 40px 30px 37px;
  justify-content: center;
  height: 100%;
`;

const ModalTitleBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 24px;
  font-family: 'Pacifico', cursive;
  margin-bottom: 20px;
`;

const TotalPriceItem =styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  font-weight: bold;

`;



export const ModalItem = ({ openItem , setOpenItem, orders, setOrders }) => { 

  const counter = useCount(openItem.count);

  const toppings = useToppings(openItem);
  const choices = useChoices(openItem);
  const isEdit = openItem.index > -1;


  const closeModal = (e) => {
    if(e.target.id === 'overlay') {
      setOpenItem(null);
    }
  };

  const order = {
    ...openItem,
    count: counter.count,
    topping: toppings.toppings,
    choice: choices.choice
  };


  const addToOrder = () => {
    setOrders([...orders, order]);
    setOpenItem(null);
  };

  const editOrder = () => {
    const newOrders = [...orders];
    newOrders[openItem.index] = order;
    setOrders(newOrders);
    setOpenItem(null);

  }
 
  return (
    <Overlay id="overlay" onClick={closeModal}>
    <Modal>
      <Banner img={openItem.img}/>
      <Container>
         <ModalTitleBlock>
            <h2>{openItem.name}</h2>
            <span>{formatCurrency(openItem.price)}</span>
         </ModalTitleBlock>
         <CountItem {...counter}/>
         {openItem.toppings && <h3>Добавки</h3>}
         {openItem.toppings && <Toppings {...toppings}/>}
         {openItem.choices && <Choices {...choices} openItem={openItem}/>}
         <TotalPriceItem>
           <span>Цена:</span>
           <span>{formatCurrency(totalPrice(order))}</span>
         </TotalPriceItem>

         <ButtonCheckout 
              onClick={isEdit ? editOrder : addToOrder}
              disabled={order.choices && !order.choice}>
           {isEdit ? 'Редактировать' : 'Добавить'}
         </ButtonCheckout>
     
      </Container>  
   
    </Modal>

    </Overlay>
  );
};


export const ModalOrderItem = ({openModal , setOpenModal, orders}) => {
  
  const closeModal = (e) => {
      console.log('e.target.id: ', e.target.id);
    if(e.target.id === 'overlay') {
      setOpenModal(null);
      console.log('openModal из МОдалки', openModal);
    }
  };
  
  return (
    <Overlay Overlay id = "overlay" onClick = {closeModal}>
    <ModalOrder>
      <ContainerOrder>
        <Thankfulness>
          <p>Cпасибо за Ваш заказ!</p>
          <p>В скором в ремени с Вами свяжется оператор.</p>
        </Thankfulness>
      </ContainerOrder>  
   
    </ModalOrder>

    </Overlay>
  );

}