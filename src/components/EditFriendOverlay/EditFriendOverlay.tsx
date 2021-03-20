import { useState } from 'react';
import './EditFriendOverlay.css';

interface EditFriendOverlayProps {
  friendsData: {
    id: number, 
    activityId: number, 
    friendName: string,
    settledStatus: boolean
  }[]
  showOverlay: boolean
  setOverlay: Function
  friendId: number
  currentActivityId: number
  isUpdated: boolean
  setIsUpdated: Function
}

const EditFriendOverlay: React.FC<EditFriendOverlayProps>= ({ 
  showOverlay, setOverlay, friendId, friendsData, currentActivityId, isUpdated, setIsUpdated
}) => {
  const filteredFriendData = friendsData.filter(friend => friend.id === friendId)[0];
  const [friendName, setFriendName] = useState(filteredFriendData.friendName);
  const handleFormSubmit = (id: number, newFriendName: string, currentActivityId: number) => {
    const options = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        friendName: newFriendName,
        activityId: filteredFriendData.activityId,
        settledStatus: filteredFriendData.settledStatus
      })
    }; 
    fetch('http://localhost:8000/friends/' + id + `?activityId=${currentActivityId}`, options)
      .then(response => {
        console.log(response.status);
        console.log('Friend name updated');
        setIsUpdated(!isUpdated);
        setOverlay(false);
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="overlay" style={{display: showOverlay ? 'block' : 'none'}}>
      <div className="overlay-container">
        <h1>Edit friend name</h1>
        <form onSubmit={e => e.preventDefault()}>
          <label>Friend name <br /></label>
          <input 
            type="text" 
            value={friendName} 
            onChange={(e) => setFriendName(e.target.value)}
            required
            maxLength={25}
          />

          <br />

          <button onClick={() => handleFormSubmit(friendId, friendName, filteredFriendData.activityId)}>
            <i className="far fa-save"></i>
            Update 
          </button>

          <button onClick={() => setOverlay(false)}>
            <i className="fas fa-times-circle"></i> 
            Close
          </button>

        </form>
      </div>
    </div>
  );
};

export default EditFriendOverlay; 