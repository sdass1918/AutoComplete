import React from 'react';

function Dropdown({ items, onSelect }) {
  if (!items || items.length === 0) return null;

  return (
    <ul style={{
      border: '1px solid #ccc',
      marginTop: '0',
      padding: '0',
      maxHeight: '200px',
      overflowY: 'auto',
      position: 'absolute',
      width: '100%',
      background: 'white',
      zIndex: 1
    }}>
      {items.map((item) => (
        <li
          key={item.id}
          style={{ padding: '8px', listStyle: 'none', cursor: 'pointer' }}
          onClick={() => onSelect(item.title)}
        >
          {item.title}
        </li>
      ))}
    </ul>
  );
}

export default Dropdown;
