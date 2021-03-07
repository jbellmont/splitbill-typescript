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
}
 
const ActivityList: React.FC<ActivityListProps> = ({activityData}) => {

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
              <button onClick={() => console.log('delete')}>
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