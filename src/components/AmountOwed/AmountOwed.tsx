import { useState, useEffect, SyntheticEvent } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import './AmountOwed.css';

interface friendsDataInterface {
  id: number, 
  activityId: number, 
  friendName: string,
  settledStatus: boolean
}

export interface AmountOwedProps {
  friendsData: {
    id: number, 
    activityId: number, 
    friendName: string,
    settledStatus: boolean
  }[]
}
 

const AmountOwed: React.FC<AmountOwedProps> = ({ friendsData }) => {
  const [listOpen, setListOpen] = useState(false);

  const [dropdownValue, setDropdownValue] = useState(friendsData[0].id);
  const onDropdownChange = (valueId: number, headerValue: string) => {
    setDropdownValue(valueId);
    setListOpen(!listOpen);
    setFriendDDHeaderValue(headerValue);
  };

  const [friendDDheaderValue, setFriendDDHeaderValue] = useState('Select friend');
  
  const [activeFriendData, setActiveFriendData] = useState<friendsDataInterface | []>([]);
  useEffect(() => {
    const filteredFriendData = [...friendsData].filter(friend => friend.id === dropdownValue);
    setActiveFriendData(filteredFriendData[0]);
    
  }, [dropdownValue]);


  return (
    <div>
      <h2 className="extra-margin-bottom">Amount owed</h2>

      <Dropdown 
        header={friendDDheaderValue}
        data={friendsData}
        type='friends'
        onDropdownChange={onDropdownChange}
        setListOpen={setListOpen}
        listOpen={listOpen}
      />

      <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Friend name</th>
              <th>Amount owed</th>
            </tr>
          </thead>
          <tbody>
            {friendsData.map((friend, index) => friend.id !== dropdownValue &&
              <tr>
                <td>{index + 1}</td>
                <td>{friend.friendName}</td>
                {/* <td>£ {(friend.total_paid / friendsData.length) - (activeFriendData.total_paid / friendsData.length)}</td> */}
              </tr>
            )}
          </tbody>
      </table>
    </div>
  );
};

export default AmountOwed;