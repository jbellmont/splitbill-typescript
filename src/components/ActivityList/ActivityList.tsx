import { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import './ActivityList.css';

type ActivityListProps = {
  activityData: {
    id: number, 
    activityName: string, 
    allSettledStatus: boolean,
    timeCreated: string,
    lastUpdated: string
  }[]
  isUpdated: boolean,
  setIsUpdated: Function
}
 
const ActivityList: React.FC<ActivityListProps> = ({activityData, isUpdated, setIsUpdated}) => {
  const handleDeleteActivity = (id: number) => {
    fetch('http://localhost:8000/activities/' + id, { method: 'DELETE' })
      .then(response => {
        console.log(response.status);
        console.log(`ID ${id} successfully deleted`);
        setIsUpdated(!isUpdated);
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="activity-button-container">
      {activityData.map(activity => {
        const dateCreated = new Date(activity.timeCreated);

        return (
          <div className="activity-button" key={activity.id}>

            <div className="left-side">
              <Link to={`/activity/${activity.id}`}>
                <h3>{activity.activityName}</h3>
              </Link> 
              <br />
              Created: {dateCreated.getDate()}/{dateCreated.getMonth() + 1}/{dateCreated.getFullYear()}
            </div>
    
            <div className="right-side">
              <button onClick={() => handleDeleteActivity(activity.id)}>
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
  
          </div>
        );
      })}
   </div>
  );
}
 
export default ActivityList;