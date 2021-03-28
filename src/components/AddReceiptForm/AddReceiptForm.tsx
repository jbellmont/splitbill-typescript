import { SyntheticEvent, useState } from 'react';
import DropdownCategories from '../DropdownCategories/DropdownCategories';
import './AddReceiptForm.css';

interface AddReceiptFormProps {
  currentFriendId: number
  currentActivityId: number
  isUpdated: boolean
  setIsUpdated: Function
}

const AddReceiptForm: React.FC<AddReceiptFormProps> = (
  { currentFriendId, currentActivityId, isUpdated, setIsUpdated }) => {

  // Store value of form inputs
  const [inputReceiptName, setInputReceiptName] = useState('');
  const [inputReceiptAmount, setInputReceiptAmount] = useState('');
  const [inputReceiptCategory, setInputReceiptCategory] = useState('');

  // Create new receipt
  const onCreateReceiptSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!inputReceiptCategory) return;

    // Request body
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        receiptAmount: inputReceiptAmount,
        receiptName: inputReceiptName,
        receiptCategory: inputReceiptCategory,
        friendId: currentFriendId,
        activityId: currentActivityId
      })
    };

    // API call
    fetch('http://localhost:8000/receipts/', options)
      .then(response => {
        console.log('Creating receipt response status: ', response.status);
        setIsUpdated(!isUpdated);
      })
      .catch(err => console.log(err));
  };

  // Category dropdown state and logic
  const categoryData = ['activity', 'alcohol', 'grocery', 'other', 'restaurant', 'ticket', 'transport'];
  const [listOpen, setListOpen] = useState(false);
  const toggleList = () => setListOpen(!listOpen);
  const onDropdownChange = (e: SyntheticEvent) => {
    setListOpen(!listOpen);
    setCategoryDDHeaderValue((e.target as HTMLElement).innerText);
    setInputReceiptCategory((e.target as HTMLElement).innerText);
  };

  const [categoryDDheaderValue, setCategoryDDHeaderValue] = useState('Select category');

  return (
    <form className="add-receipt-form">
      <label>Receipt name <br /> 
        <input 
          type="text" 
          value={inputReceiptName} 
          placeholder="receipt name"
          onChange={e => setInputReceiptName(e.target.value)} 
          maxLength={25}
          required />
      </label> <br />
      
      <label>Receipt amount <br /> 
        <input 
          type="number" 
          value={inputReceiptAmount} 
          placeholder="5.99"
          onChange={e => setInputReceiptAmount(e.target.value)} 
          max="99999" 
          required /></label> <br />

      <label>Receipt category <br />

      <DropdownCategories 
        header={categoryDDheaderValue}
        data={categoryData}
        onDropdownChange={onDropdownChange}
      />

      </label> <br />
      <button onClick={onCreateReceiptSubmit}>Add receipt</button>

    </form>
  );
};

export default AddReceiptForm;