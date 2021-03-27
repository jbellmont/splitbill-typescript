import { Link } from 'react-router-dom';
import { useState } from 'react';

import EditFriendOverlay from '../EditFriendOverlay/EditFriendOverlay';
import Loading from '../Loading/Loading';

export interface FriendsTableProps {
  friendsData: {
    id: number, 
    activityId: number, 
    friendName: string,
    settledStatus: boolean
  }[]
  currentActivityName: string
  currentActivityId: number
  isUpdated: boolean
  setIsUpdated: Function
}
 
const FriendsTable: React.FC<FriendsTableProps> = ({
  friendsData, 
  isUpdated,
  setIsUpdated,
  currentActivityId
}) => {

  // Edit friend name
  const [currentFriendId, setCurrentFriendId] = useState(0);
  const [showEditFriendOverlay, setShowEditFriendOverlay] = useState(false);
  const handleEditFriend = (friendId: number) => {
    setCurrentFriendId(friendId);
    setShowEditFriendOverlay(!showEditFriendOverlay);
  };

  // Delete friend
  const handleDeleteFriend = async (friendId: number) => {
    setCurrentFriendId(friendId);
    const response = await fetch('http://localhost:8000/friends/' + friendId, { method: "DELETE" });
    console.log(response.status);
    console.log('Friend deleted');
    setIsUpdated(!isUpdated);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Friend name</th>
            <th>Total paid</th>
            <th>Amend receipts</th>
            <th>Edit Friend name</th>
            <th>Delete Friend</th>
          </tr>
        </thead>
        <tbody>
          {friendsData.map((friend, index) => {
            return (
              <tr key={friend.id}>
                <td>{index + 1}</td>
                <td>{friend.friendName}</td>
                <td>£ {"INSERT TOTAL PAID"}</td>
                <td className="center">
                  <Link to={`/receipts/${friend.id}`}>
                    <button>
                      <i className="fas fa-file-invoice-dollar"></i>
                    </button>
                  </Link>
                </td>
                <td className="center">
                  <button onClick={() => handleEditFriend(friend.id)}>
                    <i className="fas fa-edit"></i> 
                  </button>
                </td>
                <td data-id={friend.id} className="center">
                  <button onClick={() => handleDeleteFriend(friend.id)}>
                    <i className="fas fa-trash-alt"></i> 
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Edit Friend overlay */}
      {(!showEditFriendOverlay) ? 
        null :
        <EditFriendOverlay
          showOverlay={showEditFriendOverlay}
          setOverlay={setShowEditFriendOverlay}
          friendId={currentFriendId}
          currentActivityId={currentActivityId}
          friendsData={friendsData}
          isUpdated={isUpdated}
          setIsUpdated={setIsUpdated}
        />
      }


    </div>
  );
}
 
export default FriendsTable;