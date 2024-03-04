import React, { useContext, useState } from 'react'
import './header.css'
import PostServices from '../../services/postServices';
import Filter from '../filter/filter';
import { Context } from '../../main';

export default function header() {
  const [itemName, setItemName] = useState("");
  const [active, setActive] = useState(false);
  const {setFilter, handlerFilterReset} = useContext(Context);
  
  function handlerFilter() {
    if (!itemName) {
      handlerFilterReset();
    } else {
      PostServices.postFilteredItems({"product": itemName})
      .then(data => data.data.result)
      .then(res => res.length ? setFilter(res) : setFilter(null))
      .catch(err => {
        console.log(err);
        handlerFilter();
    })
  }
  }
  return (
    <div className={"header"}>
        <div className={"header__container"}>
            <h1 className={"header__logo"}>Valantis Task</h1>
            <div className={"search"}>
              <button 
                className={"search__button search__button_modal"}
                onClick={() => setActive(!active)}
              >Фильтры</button>
              <Filter active={active} onChange={handlerFilter}/>
              <div className={"search__container"}>
                <input 
                  className={"search__input"}
                  type="text"
                  placeholder='Название'
                  value={itemName}
                  onChange={(event) => setItemName(event.target.value)} />
                <button className={"search__button"} onClick={handlerFilter}>поиск</button>                
              </div>
            </div>
        </div>
    </div>
  )
}
