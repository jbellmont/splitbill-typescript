import './DropdownFriends.css';
import { useState } from 'react';

export interface DropdownProps {
  header: string
  data: {
    id: number 
    activityId: number
    friendName: string
    settledStatus: boolean
  }[]
  onDropdownChange: Function
  setListOpen: Function
  listOpen: boolean
}
 

const DropdownFriends: React.FC<DropdownProps> = (
  { data, onDropdownChange, header }) => {

    const [listOpen, setListOpen] = useState(false);

  const listRender = () => {
      return (
        <ul className="dd-list">
            {data.map(friend => 
              <li 
                key={friend.id} 
                className="dd-list-item" 
                onClick={() => onDropdownChange(friend.id, friend.friendName)} 
              >
                {friend.friendName} owes...
              </li>
            )}
        </ul>
      );
  };

  return (
    <div className="dd-container" onClick={() => setListOpen(!listOpen)}>
      <div className="dd-header">
        <div className="dd-header-title">
          <div className="dd-header-title-text">{header}</div>
          <div className="dd-header-title-icon"><i className="fas fa-angle-down"></i></div>
        </div>
      </div>
      {listOpen && listRender()}
    </div>
  );
};
 
export default DropdownFriends;