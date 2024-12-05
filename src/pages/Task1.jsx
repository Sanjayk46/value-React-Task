import React, { useState } from "react";
import "./Home.css"; // Optional for styling

const ElementTransfer = () => {
  const [bucket1, setBucket1] = useState(["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"]);
  const [bucket2, setBucket2] = useState([]);
  const [selectedBucket1, setSelectedBucket1] = useState([]);
  const [selectedBucket2, setSelectedBucket2] = useState([]);

  const handleTransfer = (source, destination, setSource, setDestination, selectedItems, setSelectedItems) => {
    const updatedSource = source.filter(item => !selectedItems.includes(item));
    const updatedDestination = [...destination, ...selectedItems];
    setSource(updatedSource);
    setDestination(updatedDestination);
    setSelectedItems([]);
  };

  const handleTransferAll = (source, destination, setSource, setDestination) => {
    setDestination([...destination, ...source]);
    setSource([]);
  };

  const toggleSelection = (item, selectedItems, setSelectedItems) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <div className="transfer-container">
      <div className="bucket">
        <h3>Bucket 1</h3>
        {bucket1.map(item => (
          <div key={item} className="item">
            <input
              type="checkbox"
              checked={selectedBucket1.includes(item)}
              onChange={() => toggleSelection(item, selectedBucket1, setSelectedBucket1)}
            />
            {item}
          </div>
        ))}
      </div>
      <div className="controls">
        <button
          onClick={() => handleTransfer(bucket1, bucket2, setBucket1, setBucket2, selectedBucket1, setSelectedBucket1)}
        >
          Add 
        </button>
        <button
          onClick={() => handleTransfer(bucket2, bucket1, setBucket2, setBucket1, selectedBucket2, setSelectedBucket2)}
        >
           Remove
        </button>
        <button onClick={() => handleTransferAll(bucket1, bucket2, setBucket1, setBucket2)}>Add All </button>
        <button onClick={() => handleTransferAll(bucket2, bucket1, setBucket2, setBucket1)}> Remove All</button>
      </div> 
      <div className="bucket">
        <h3>Bucket 2</h3>
        {bucket2.map(item => (
          <div key={item} className="item">
            <input
              type="checkbox"
              checked={selectedBucket2.includes(item)}
              onChange={() => toggleSelection(item, selectedBucket2, setSelectedBucket2)}
            />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElementTransfer;
