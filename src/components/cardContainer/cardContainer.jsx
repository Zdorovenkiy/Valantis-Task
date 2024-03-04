import React from 'react'
import './cardContainer.css'
import ItemCard from '../itemCard/itemCard';

export default function container({items}) {
  return (
    <>
      <div className={'main'}>
        <div className={'main__container'}>
          {items.length ? 
          items.map((item, index) => <ItemCard key={index} item={item} />)
          :
          <h1>Ничего не найдено</h1>
          }           
        </div>
      </div>    
    </>

  )
}
