import { useState } from 'react';
import './EditActivityOverlay.css';

interface EditActivityOverlayProps {
  showOverlay: boolean
  setOverlay: Function
  id: string
  currentActivityName: string
  isUpdated: boolean
  setIsUpdated: Function
}

const EditActivityOverlay: React.FC<EditActivityOverlayProps>= ({ 
  showOverlay, setOverlay, id, currentActivityName, isUpdated, setIsUpdated
}) => {
  const [activityName, setActivityName] = useState(currentActivityName);
  const handleFormSubmit = (id: string, newActivityName: string) => {
    const options = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        activityName: newActivityName,
      })
    }; 
    fetch('http://localhost:8000/activities/' + id, options)
      .then(response => {
        console.log(response.status);
        console.log('Activity name updated');
        setIsUpdated(!isUpdated);
        setOverlay(false);
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="overlay" style={{display: showOverlay ? 'block' : 'none'}}>
      <div className="overlay-container">
        <h1>Edit activity name</h1>
        <form onSubmit={e => e.preventDefault()}>
          <label>Activity name <br /></label>
          <input 
            type="text" 
            value={activityName} 
            onChange={(e) => setActivityName(e.target.value)}
            required
            maxLength={25}
          />

          <br />

          <button onClick={() => handleFormSubmit(id, activityName)}>
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

export default EditActivityOverlay; 