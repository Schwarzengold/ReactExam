import React, { useState } from 'react';
import styles from "./ListActions.module.css";

const ListActions = (props) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);


  const toggleDatePicker = () => {
    if (showDatePicker && selectedDate) {
      props.showByDate(selectedDate); 
      setSelectedDate("");            
    }
    setShowDatePicker(!showDatePicker);  
  };

  return (
    <div className={`container ${styles.wrapper}`}>
      {showDatePicker && (
        <div className={styles.datePickerContainer}>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className={`form-control ${styles.dateInput} ${styles.input}`} 
          />
        </div>
      )}
      <div className={styles.buttonGroup}>
        <button className={`btn btn-primary ${styles.button1} ${props.filter === "All" && styles.highlight}`} onClick={props.showAll}>All</button>
        <button className={`btn btn-primary ${styles.button1} ${props.filter === "Done" && styles.highlight}`} onClick={props.showDone}>Done</button>
        <button className={`btn btn-primary ${styles.button1} ${props.filter === "Todo" && styles.highlight}`} onClick={props.showTodo}>Todo</button>
        <button className={`btn btn-primary ${styles.button1} ${props.filter === "HighPriority" && styles.highlight}`} onClick={props.showHighPriority}>High Priority</button>
        <button className={`btn btn-primary ${styles.button1} ${props.filter === "LowPriority" && styles.highlight}`} onClick={props.showLowPriority}>Low Priority</button>
        <button className={`btn btn-primary ${styles.button1}`} onClick={toggleDatePicker}>By Date</button>
      </div>
    </div>
  );
};

export default ListActions;
