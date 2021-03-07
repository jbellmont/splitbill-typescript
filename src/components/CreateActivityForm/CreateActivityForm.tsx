import { SyntheticEvent, useState } from 'react';
import './CreateActivityForm.css';

export interface CreateActivityFormProps {
  isUpdated: boolean,
  setIsUpdated: React.Dispatch<React.SetStateAction<boolean>>
}

interface RequestBody {
  activityName: string
  allSettledStatus: boolean
  timeCreated: Date
  lastUpdated: Date
}
 
const CreateForm: React.FC<CreateActivityFormProps> = (
  {isUpdated, setIsUpdated}) => {

  const [inputValue, setInputValue] = useState('');
  const handleSubmit = async (event: SyntheticEvent) => {
    const body: RequestBody = {
      activityName: inputValue,
      allSettledStatus: false,
      timeCreated: new Date(),
      lastUpdated: new Date()
    };

    event.preventDefault();
    const apiPostRequest = await fetch('http://localhost:8000/activities', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    console.log('New activity submitted');
    
    // Triggers useFetch to fetch newly updated data
    setIsUpdated(!isUpdated);
  };

  return (
    <form className="create-form" onSubmit={handleSubmit} >
      <p>
        Create an Activity to start off. In your Activity you can add the 
        Friends who took part and the Receipts of the things they paid for.
      </p>
      <input 
        type="text" 
        placeholder="activity name" 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)}
        required
        maxLength={25}
      /> <br />
      <button>Create activity</button>
    </form>
  );
}
 
export default CreateForm;