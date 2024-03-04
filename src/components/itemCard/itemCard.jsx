import React from 'react'
import './itemCard.css'

export default function itemCard({item}) {
  return (
    <div className={"card"}>
      <div className={"card__container"}>
        <h1 className={"card__header"}>{item?.product}</h1>
        {item?.brand && <p className={"card__text"}>Бренд: {item.brand}</p>}
        <p className={"card__text"}>{item.id}</p>
        <div className={'card__price'}>
          <p className={"card__text"}>Цена: </p>
          <p className={"card__text"}>{item?.price}</p>
        </div>
      </div>
    </div>
  )
}
