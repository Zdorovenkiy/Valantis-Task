import React, { useContext, useState } from 'react'
import "./filter.css"
import PostServices from '../../services/postServices';
import { Context } from '../../main';

export default function filter({active}) {
const [itemBrand, setItemBrand] = useState("");
const [itemPrice, setItemPrice] = useState("");
const {setFilter, handlerFilterReset} = useContext(Context);

function handlerFilter(filter) {
    const params = filter === "brand" ? {"brand": itemBrand} : {"price": +itemPrice};
    
    if (!params[filter]) {
      handlerFilterReset();
    } else {
      PostServices.postFilteredItems(params)
      .then(data => data.data.result)
      .then(res => res.length ? setFilter(res) : setFilter(null))
      .catch(err => {
        console.log(err);
        handlerFilter(filter);
      })      
    }

  }
  return (
    <div className={active ? 'filter filter_modal' : 'filter'}>
    <div className={'filter__container'}>
      <div className={'brand'}>
        <input 
            className={'brand__input'}
            type="text" 
            placeholder='Бренд'
            value={itemBrand}
            onChange={(event) => setItemBrand(event.target.value)} />
        <button className={'brand__button'} onClick={() => handlerFilter("brand")}>поиск</button>
      </div>
      <div className={'price'}>
          <input 
            className='price__input'
            type="text" 
            placeholder='Цена'
            value={itemPrice}
            onChange={(event) => setItemPrice(event.target.value)} />
          <button className={'price__button'} onClick={() => handlerFilter("price")}>поиск</button>
      </div>
    </div>
  </div>
  )
}
