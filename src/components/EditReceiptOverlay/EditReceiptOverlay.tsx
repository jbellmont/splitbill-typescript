import { useState } from 'react';
import './EditReceiptOverlay.css';

interface EditReceiptOverlayProps {
  receiptsData: {
    id: number
    activityId: number
    friendId: number
    receiptAmount: number
    receiptName: string
    receiptCategory: string
  }[]
  showOverlay: boolean
  setOverlay: Function
  receiptId: number
  isUpdated: boolean
  setIsUpdated: Function
}

const EditReceiptOverlay: React.FC<EditReceiptOverlayProps>= ({ 
  showOverlay, setOverlay, receiptId, receiptsData, isUpdated, setIsUpdated
}) => {
  let filteredReceiptsData = [...receiptsData].filter(receipt => receipt.id === receiptId)[0];  
  const [receiptName, setReceiptName] = useState(filteredReceiptsData.receiptName);
  const [receiptAmount, setReceiptAmount] = useState(filteredReceiptsData.receiptAmount);
  const [receiptCategory, setReceiptCategory] = useState(filteredReceiptsData.receiptCategory);

  const handleFormSubmit = (receiptId: number, newReceiptName: string, 
                            newReceiptAmount: number, newReceiptCategory: string, 
                            activityId: number, friendId: number) => { 
    const options = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        activityId: activityId,
        friendId: friendId,
        receiptAmount: newReceiptAmount,
        receiptName: newReceiptName,
        receiptCategory: newReceiptCategory
      })
    }; 

    fetch('http://localhost:8000/receipts/' + receiptId, options)
      .then(response => {
        console.log(response.status);
        console.log('Receipt updated');
        setIsUpdated(!isUpdated);
        setOverlay(!showOverlay);
      })
      .catch(error => console.log(error));
  };


  return (
    <div className="overlay" style={{display: showOverlay ? 'block' : 'none'}}>
      <div className="overlay-container">
        <h1>Edit receipt</h1>
        <form onSubmit={e => e.preventDefault()}>
          <label>Receipt name <br /></label>
          <input 
            type="text" 
            value={receiptName} 
            onChange={(e) => setReceiptName(e.target.value)}
            required
            maxLength={25}
          />

          <br />

          <label>Receipt amount <br /> </label>
          <input 
            type="number" 
            value={receiptAmount} 
            onChange={(e) => setReceiptAmount(e.target.valueAsNumber)}
            min="0.01" max="99999"
            required
          />
          <br />

          <label>Receipt category <br />
            <select value={receiptCategory} onChange={(e) => setReceiptCategory(e.target.value)} required>
              <option>Alcohol</option>
              <option>Grocery</option>
              <option>Restaurant</option>
              <option>Ticket</option>
              <option>Transport</option>
            </select>
          </label>

          <button onClick={() => handleFormSubmit(receiptId, receiptName, receiptAmount, receiptCategory, filteredReceiptsData.activityId, filteredReceiptsData.friendId)}>
            <i className="far fa-save"></i>
            Update 
          </button>

          <button onClick={() => setOverlay()}>
            <i className="fas fa-times-circle"></i> 
            Close
          </button>

        </form>
      </div>
    </div>
  );
};

export default EditReceiptOverlay; 