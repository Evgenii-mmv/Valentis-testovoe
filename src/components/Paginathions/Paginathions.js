import React from 'react';

const ids = new Array(8000).fill(0).map((_, i) => i + 1);
const len = ids.length;
const LIMIT = 50;
/* offset limit */
const Pagination = ({
  onChange
}) => {
  const pages_count = len / LIMIT;
  const pages = new Array(pages_count).fill(0).map((_, i) => i + 1);
  return pages.map(page => (
    <span
      key={page}
      className='page'
      onClick={() => {
        onChange({ offset: (page - 1)*LIMIT, limit: LIMIT });
      }}
    >
      {page}
    </span>
  ));
}

export default Pagination;