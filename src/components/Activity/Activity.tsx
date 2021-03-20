import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

import Loading from '../Loading/Loading';
import EditActivityOverlay from '../EditActivityOverlay/EditActivityOverlay';
import CreateFriendForm from '../CreateFriendForm/CreateFriendForm';
import FriendsTable from '../FriendsTable/FriendsTable';


const Activity = () => {
  const { id } = useParams<{id: string}>();

  // Fetch activity data by specific id
  const { 
    data: activityData, 
    isLoading: isLoadingActivityData, 
    isUpdated: isUpdatedActivityData, 
    setIsUpdated: setIsUpdatedActivityData 
  } = useFetch('http://localhost:8000/', 'activities', id);

  // Edit activity name
  const [showEditActivityOverlay, setShowEditActivityOverlay] = useState(false);

  // Fetch friend data by specific id
  const { 
    data: friendsData, 
    isLoading: isLoadingFriendsData, 
    isUpdated: isUpdatedFriendsData, 
    setIsUpdated: setIsUpdatedFriendsData 
  } = useFetch('http://localhost:8000/', 'friends?activityId=' + id);


  return (
    <>
      {(isLoadingActivityData && isLoadingFriendsData) ?
        <Loading /> :
        <div>
          <h1 className="activity-name-title">{activityData[0].activityName}</h1>
          <button 
            onClick={() => setShowEditActivityOverlay(true)} 
            className="edit-button">
            <i className="fas fa-edit"></i>
          </button>

          <EditActivityOverlay 
            showOverlay={showEditActivityOverlay}
            setOverlay={setShowEditActivityOverlay}
            id={id}
            currentActivityName={activityData[0].activityName}
            isUpdated={isUpdatedActivityData}
            setIsUpdated={setIsUpdatedActivityData}
          />

          <section>
            <CreateFriendForm 
              currentActivityId={id}
              currentActivityName={activityData[0].activityName}
              isUpdated={isUpdatedFriendsData}
              setIsUpdated={setIsUpdatedFriendsData}
            />
          </section>

          <section>
          <hr />
            <h2>Friend list</h2>
            <FriendsTable 
              friendsData={friendsData}
              currentActivityName={activityData[0].activityName}
              currentActivityId={Number(id)}
              isUpdated={isUpdatedFriendsData}
              setIsUpdated={setIsUpdatedFriendsData}
            />
          <hr />
          </section>

          {/* {friendsData.length > 1 ? 
            <section>
              <AmountOwed 
                friendsData={friendsData}
              />
            </section> :
            null } */}

        </div>
      }
    </>
  );
}
 
export default Activity;