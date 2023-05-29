import React from "react";

const Pagination = ({ page, lastPage, onPageChange }) => {
  const pageButtons = [];

  for (let i = 1; i <= lastPage; i++) {
    pageButtons.push(
      <button key={i} onClick={() => onPageChange(i)} disabled={i === page}>
        {i}
      </button>
    );
  }

  return <div className="pagination">{pageButtons}</div>;
};

export default Pagination;