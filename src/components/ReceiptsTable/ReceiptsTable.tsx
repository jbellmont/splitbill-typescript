import { useState, useEffect } from 'react';

interface ReceiptsTableProps {
  receiptsData: {
    id: number
    activityId: number
    friendId: number
    receiptAmount: number
    receiptName: string
    receiptCategory: string
  }[]
  onEditReceiptOverlayClick: Function
  receiptsButtonClicked: boolean
  setReceiptsButtonClicked: Function
}


const ReceiptsTable: React.FC<ReceiptsTableProps> = (
  { receiptsData, onEditReceiptOverlayClick, setReceiptsButtonClicked, receiptsButtonClicked }
  ) => {

  const handleDeleteReceipt = async (receiptId: number) => {
    const response = await fetch(`http://localhost:8000/receipts/${receiptId}`, { method: "DELETE" });
    console.log(response.status);
    console.log(`ID ${receiptId} successfully deleted`);
    setReceiptsButtonClicked(!receiptsButtonClicked);
  };


  return (
    <>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Receipt name</th>
            <th>Receipt category</th>
            <th>Receipt amount</th>
            <th>Edit receipt</th>
            <th>Delete receipt</th>
          </tr>
        </thead>
        <tbody>
          {receiptsData.map((receipt, index) => {
            return (
              <tr key={receipt.id}>
                <td>{index + 1}</td>
                <td>{receipt.receiptName}</td>
                <td>{receipt.receiptCategory}</td>
                <td>£ {receipt.receiptAmount}</td>
                <td className="center">
                  <button onClick={() => onEditReceiptOverlayClick(receipt.id)}>
                    <i className="fas fa-edit"></i>
                  </button>
                </td>
                <td className="center">
                  <button onClick={() => handleDeleteReceipt(receipt.id)}>
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ReceiptsTable;