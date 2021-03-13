import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

import Loading from '../Loading/Loading';
import EditActivityOverlay from '../EditActivityOverlay/EditActivityOverlay';


const Activity = () => {
  const { id } = useParams<{id: string}>();

  // Fetch activity data by specific id
  const { data: activityData, isLoading, isUpdated, setIsUpdated } = 
    useFetch('http://localhost:8000/', 'activities', id);

  // Edit activity name
  const [showEditActivityOverlay, setShowEditActivityOverlay] = useState(false);
  const [editActivityInputValue, setEditActivityInputValue] = useState('');
  const handleUpdateActivityFormSubmit = () => {
    const options = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        updatedActivityName: editActivityInputValue,
        updatedSettledStatus: 0 // UPDATE THIS! UPDATE THIS! UPDATE THIS! UPDATE THIS! UPDATE THIS! UPDATE THIS!
      })
    };
    fetch('http://localhost:8000/activities/' + id, { method: 'PUT'})
    setIsUpdated(!isUpdated);
  };

  // Edit friend name
  const [showEditFriendOverlay, setShowEditFriendOverlay] = useState(false);
  const [editFriendInputValue, setEditFriendInputValue] = useState('');


  return (
    <div>
      {isLoading ? 
        <Loading /> :
        <div>
          <h1 className="activity-name-title">{activityData[0].activityName}</h1>
          <button 
            onClick={() => setShowEditActivityOverlay(true)} 
            className="edit-button">
            <i className="fas fa-edit"></i>
          </button>

        {/* Edit Activity overlay */}
          <EditActivityOverlay 
            showOverlay={showEditActivityOverlay}
            setOverlay={setShowEditActivityOverlay}
            id={id}
            currentActivityName={activityData[0].activityName}
            isUpdated={isUpdated}
            setIsUpdated={setIsUpdated}
          />

        {/* Edit Friend overlay */}
          {/* <EditFormOverlay 
            toEdit="friend"
            showOverlay={showEditFriendOverlay}
            setOverlay={setShowEditFriendOverlay}
            formInputOneValue={editFriendInputValue}
            handleFormInputOneChange={setEditFriendInputValue}
            handleFormSubmit={handleActivityFormSubmit}
          /> */}

           {/* <section>
            <CreateForm 
              onCreateSubmit={onCreateFriendSubmit}
              inputValue={newFriendInput}
              onChange={onCreateFriendFormChange}
              buttonText={`Add friend`}
              description={`Add all Friends who were part of ${activityName}`}
              placeholderText="friend name"
            />
             </section>


           {friendsData[0].friend_name ?
          <section>
          <hr />
            <h2>Friend list</h2>
            <FriendsTable 
              friendsData={friendsData}
              friendTotalAmount={friendTotalAmount}
              onAddReceiptClick={onAddReceiptClick}
              onDeleteFriendClick={onDeleteFriendClick}
              openCloseOverlay={onEditFriendOverlayClick}
            />
          <hr />
          </section> :
          null }


          {friendsData.length > 1 ? 
            <section>
              <AmountOwed 
                friendsData={friendsData}
              />
            </section> :
            null } */}


        </div>
      }
    </div>
  );
}
 
export default Activity;