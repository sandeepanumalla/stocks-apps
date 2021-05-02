import React from 'react'

const Pagination = (props) => {
    
    const totalPosts = props.totalPosts;
    const postPerPage = props.postPerPage;
    const paginate = props.paginate;
    console.log('this is Pagination',totalPosts,postPerPage);
    const pageNumbers = [];
    for(let i=0;i<=Math.ceil(totalPosts / postPerPage);i++){
        pageNumbers.push(i);
    }
    return (
        <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a  href='!#' className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
      
    </nav>
    )
}

export default Pagination
