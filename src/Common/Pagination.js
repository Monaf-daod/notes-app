import _ from 'lodash'

const  Pagination = (props)=> {
  
  const {pageSize, count, onPageChange, currentPage} = props ;
  const pagesCount = Math.ceil(count/pageSize) ;

  if (pagesCount ===1) return null ;
  const pages = _.range(1,pagesCount+1);

  return (
    <nav className='m-2'>
      <ul className="pagination pagination-lg">
        {pages.map(page => (
          <li 
            className={page === currentPage ? 'page-item active' : 'page-item'} 
            key={page}
            >
              <a className="page-link" style={{cursor : 'pointer'}} onClick={() => onPageChange(page)} >
                {page}
              </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination;