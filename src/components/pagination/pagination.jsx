import React from 'react'
import "./pagination.css"
import ReactPaginate from 'react-paginate'

export default function Pagination({itemsCount, current, pageCount, getItems}) {

  function fetchItemsPerPage(event = {"selected": 0}) {
      current.setCurrentPage(event.selected);
      const end = (event.selected + 1) * 50; 
      const start = end - 50;
      getItems(itemsCount.slice(start, end))
    }
    
  return (
    <div className={'pagination'}>
        <div className={'pagination__container'}>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={fetchItemsPerPage}
                forcePage = {current.currentPage}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
            />        
        </div>
    </div>
  )
}
