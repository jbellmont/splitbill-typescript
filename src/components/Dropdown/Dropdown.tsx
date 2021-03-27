import React, { useState } from 'react';
import './Dropdown.css';

export interface DropdownProps {
  header: string
  data: {
    id: number 
    activityId: number
    friendName: string
    settledStatus: boolean
  }[]
  type: string
  onDropdownChange: Function
  setListOpen: Function
  listOpen: boolean
}
 

const Dropdown: React.FC<DropdownProps> = (
  { data, type, onDropdownChange, setListOpen, header, listOpen }) => {

  // friends or categories
  const [dataType, setDataType] = useState(type);

  const listRender = (dataType: string) => {
    if (dataType === 'friends') {
      return (
        <ul className="dd-list">
          {data.map(friend => <li 
                                key={friend.id} 
                                className="dd-list-item" 
                                onClick={() => onDropdownChange(friend.id, friend.friendName)} 
                                data-id={friend.id}
                              >
                                {friend.friendName} owes...
                              </li>)
          }
        </ul>
      );
    } else if (dataType === 'categories') {
      return (
        // <ul className="dd-list">
        //   {data.map(category => <li
        //                           key={Math.floor(Math.random() * 999)} 
        //                           className="dd-list-item" 
        //                           onClick={() => onDropdownChange()} 
        //                         >
        //                           {category}
        //                         </li>)
        //   }
        // </ul>
        'nope'
      );
    } else {
      return;
    }
  };

  return (
    <div className="dd-container" onClick={() => setListOpen(!listOpen)}>
      <div className="dd-header">
        <div className="dd-header-title">
          <div className="dd-header-title-text">{header}</div>
          <div className="dd-header-title-icon"><i className="fas fa-angle-down"></i></div>
        </div>
      </div>

      {listOpen && listRender(dataType)}
    </div>
  );
};
 
export default Dropdown;