import CreateActivityForm from '../CreateActivityForm/CreateActivityForm';
import ActivityList from '../ActivityList/ActivityList';

import useAPI from '../../hooks/useFetch';

import '../../index.css';

const Home = () => {
  const { data: activityData, isLoading, isUpdated, setIsUpdated } = useAPI('http://localhost:8000/', 'activities');

  return (
    <div>
      <section>
      <h1>Activities</h1>
        <CreateActivityForm 
          isUpdated={isUpdated}
          setIsUpdated={setIsUpdated}
        />
      </section>

      <hr />

      {isLoading ?
        <div><i className="fas fa-spinner spinner"></i> Loading</div> :
        <section>
          <ActivityList activityData={activityData!} />
        </section>
      }
    </div>
  );
};

export default Home;