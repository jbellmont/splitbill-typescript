import { SyntheticEvent, useState } from 'react';
import './CreateFriendForm.css';

export interface CreateFriendFormProps {
  isUpdated: boolean
  setIsUpdated: React.Dispatch<React.SetStateAction<boolean>>
  currentActivityId: string
  currentActivityName: string
}

interface RequestBody {
  activityId: number
  friendName: string
  settledStatus: boolean
}
 
const CreateFriendForm: React.FC<CreateFriendFormProps> = (
  {isUpdated, setIsUpdated, currentActivityId, currentActivityName}) => {

  const [inputValue, setInputValue] = useState('');
  const handleSubmit = async (event: SyntheticEvent, id: string) => {
    const body: RequestBody = {
      activityId: Number(id),
      friendName: inputValue,
      settledStatus: false
    };

    event.preventDefault();
    const apiPostRequest = await fetch('http://localhost:8000/friends', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    console.log('New friend submitted');
    
    // Triggers useFetch to fetch newly updated data
    setIsUpdated(!isUpdated);
  };

  return (
    <form className="create-form" onSubmit={(e) => handleSubmit(e, currentActivityId)} >
      <p>
        {`Add all Friends who were part of ${currentActivityName}`}
      </p>
      <input 
        type="text" 
        placeholder="friend name" 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)}
        required
        maxLength={25}
      /> <br />
      <button>Add friend</button>
    </form>
  );
}
 
export default CreateFriendForm;