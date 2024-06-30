import React, { useState } from 'react';

const Sort = ({ items, onSort }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSort = () => {
    let sortedItems = [...items];
    if (selectedOption === 'asc') {
      sortedItems.sort((a, b) => a.localeCompare(b));
    } else if (selectedOption === 'desc') {
      sortedItems.sort((a, b) => b.localeCompare(a));
    }
    onSort(sortedItems);
  };

  return (
    <div>
      <select className="visible" id='sort' value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
        <option value="asc" onClick={handleSort}>По возрастанию</option>
        <option value="desc" onClick={handleSort}>По убыванию</option>
      </select> 
    </div>
  );
};

export default Sort;
