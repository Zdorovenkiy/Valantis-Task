import './App.css'
import PostServices from './services/postServices';
import { useEffect, useState } from 'react';
import Header from './components/header/header';
import CardContainer from './components/cardContainer/cardContainer';
import { Context } from './main';
import Pagination from './components/pagination/pagination';


function App() {
  const [itemsId, setItemsId] = useState([]);
  const [filter, setFilter] = useState([]);
  const [itemsCount, setItemsCount] = useState([]);
  const [items, setItems] = useState([]);
  const [pageCount, setPageCount] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 50;

  useEffect(() => {
    getItemsId();
  }, [])

  useEffect(() => {
    handlerFilter(filter)
  }, [filter])
  
  function fetchItems(items = itemsId) {
    const end = 50; 
    const start = 0;
    getItems(items.slice(start, end))
  }

  function getItemsId() {
    setIsLoading(true);
    PostServices.postItemsId()
      .then(res => [...new Set(res.data.result)])
      .then(data => {
        fetchItems(data) 
        setItemsId(data)
        handlerPages(data);
      })
      .catch(err => {
        console.log(err.code);
        getItemsId();
      })
  }

  function getItems(id) {
    setIsLoading(true);
    PostServices.postItems(id)
    .then(data => data.data.result)
    .then((data) => {
      const table = {};
      const res = data.filter((item) =>(!table[item.id] && (table[item.id] = 1)));  
      setItems(res);    
    })
    .catch(err => {
      console.log(`Error code: ${err.response.status}`);
      getItems(id);
      
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  function handlerPages(items = itemsId) {
    setCurrentPage(0);
    setItemsCount(items);
    setPageCount(Math.ceil(items.length / itemsPerPage))
  }

  function handlerFilter(filter) {
    if(filter?.length) {
      handlerPages(filter);
      fetchItems(filter);
    } else if (filter === null) {
      handlerPages();
      fetchItems();
    }
  }

  function handlerFilterReset() {
    handlerPages();
    fetchItems();
  }
  

  return (
    <>
      <Context.Provider value={{filter, setFilter, handlerFilterReset}}>
        <Header />
      </Context.Provider>
      {isLoading ? <h1>Загрузка...</h1> : <CardContainer items={items}/>}     
      <Pagination 
        itemsCount={itemsCount} 
        current={{currentPage, setCurrentPage}} 
        pageCount={pageCount} 
        getItems={getItems}/>
    </>
  )
}

export default App
