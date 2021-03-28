import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import '../../index.css';

import AddReceiptForm from '../AddReceiptForm/AddReceiptForm';
import Loading from '../Loading/Loading';
import ReceiptsTable from '../ReceiptsTable/ReceiptsTable';
import EditReceiptOverlay from '../EditReceiptOverlay/EditReceiptOverlay';


const Receipts = () => {
  const { id } = useParams<{id: string}>();
  const { 
    data: receiptsData, 
    isUpdated: isUpdatedReceiptsData, 
    setIsUpdated: setIsUpdatedReceiptsData 
  } = useFetch('http://localhost:8000/', 'receipts?friendId=' + id);

  const [receiptsButtonClicked, setReceiptsButtonClicked] = useState(true);
  const [currentActivityId, setCurrentActivityId] = useState(0);
  const [currentFriendName, setCurrentFriendName] = useState('');

  // Set current activity ID and friend name
  useEffect(() => {
    if (receiptsData.length) {
      setCurrentActivityId(receiptsData[0].activityId);
      const fetchFriendName = async (currentFriendId: number) => {
        const response = await fetch(`http://localhost:8000/friends/${currentFriendId}`); 
        const json = await response.json();
        setCurrentFriendName(json.friendName);
      };
      fetchFriendName(Number(id));
    }
  }, [isUpdatedReceiptsData]);

  // Show/hide edit Receipt overlay
  const [showEditReceiptsOverlay, setShowEditReceiptsOverlay] = useState(false);
  const [activeReceiptID, setActiveReceiptID] = useState(0);
  const onEditReceiptOverlayClick = (receiptId?: number) => { // Toggles the overlay visibility
    if (receiptId) {
      setActiveReceiptID(receiptId);
    }
    setShowEditReceiptsOverlay(!showEditReceiptsOverlay);
  };

  return (
    <div>

      {!receiptsData.length ?
        <Loading /> :
        <>
          <h1>Add receipt for {currentFriendName}</h1>

          <section>
            <AddReceiptForm 
              currentFriendId={receiptsData[0].friendId}
              currentActivityId={currentActivityId}
              isUpdated={isUpdatedReceiptsData}
              setIsUpdated={setIsUpdatedReceiptsData} 
            />
          </section>

          <hr />

          <section>
            <h2>List of receipts</h2>
            <ReceiptsTable 
              receiptsData={receiptsData}
              onEditReceiptOverlayClick={onEditReceiptOverlayClick}
              receiptsButtonClicked={receiptsButtonClicked}
              setReceiptsButtonClicked={setReceiptsButtonClicked}
            />
          </section>
        </>
      }
      {(activeReceiptID !== 0) &&
          <EditReceiptOverlay 
          receiptsData={receiptsData}
          receiptId={activeReceiptID}
          showOverlay={showEditReceiptsOverlay}
          setOverlay={onEditReceiptOverlayClick}
          isUpdated={isUpdatedReceiptsData}
          setIsUpdated={setIsUpdatedReceiptsData}
        />
      }
    </div>
  );
};

export default Receipts;