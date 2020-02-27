import React from 'react';

import './pagination.scss';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <h2>Page</h2>
      <ol className="pagination">
        {pageNumbers.map(number => (
          <div key={number} className="page-item">
            <div onClick={() => paginate(number)}>
              <h3 style={{ color: 'blue' }}>{number}</h3>
            </div>
          </div>
        ))}
      </ol>
    </div>
  );
};

export default Pagination;
