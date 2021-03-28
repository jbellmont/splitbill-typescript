import './DropdownCategories.css';
import { useState } from 'react';

export interface DropdownProps {
  header: string
  data: string[]
  onDropdownChange: Function
}
 

const DropdownCategories: React.FC<DropdownProps> = (
  { data, onDropdownChange, header }) => {

    const [listOpen, setListOpen] = useState(false);

  const listRender = () => {
      return (
        <ul className="dd-list">
          {data.map(category => <li 
                                   key={Math.floor(Math.random() * 999)} 
                                   className="dd-list-item" 
                                   onClick={e => onDropdownChange(e)} >
                                     {category}
                                </li>
          )}
        </ul>
      );
  };

  return (
    <div className="dd-container" onClick={() => setListOpen(!listOpen)}>
      <div className="dd-header">
        <div className="dd-header-title">
          <div className="dd-header-title-text">Select category...</div>
          <div className="dd-header-title-icon"><i className="fas fa-angle-down"></i></div>
        </div>
      </div>
      {listOpen && listRender()}
    </div>
  );
};
 
export default DropdownCategories;