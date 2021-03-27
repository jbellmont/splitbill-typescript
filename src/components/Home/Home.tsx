import CreateActivityForm from '../CreateActivityForm/CreateActivityForm';
import ActivityList from '../ActivityList/ActivityList';
import Loading from '../Loading/Loading';

import useFetch from '../../hooks/useFetch';

import '../../index.css';

const Home = () => {
  const { data: activityData, isUpdated, setIsUpdated } = useFetch('http://localhost:8000/', 'activities');

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

      {!activityData.length ?
        <Loading /> :
        <section>
          <ActivityList 
            activityData={activityData!} 
            isUpdated={isUpdated}
            setIsUpdated={setIsUpdated}
          />
        </section>
      }
    </div>
  );
};

export default Home;