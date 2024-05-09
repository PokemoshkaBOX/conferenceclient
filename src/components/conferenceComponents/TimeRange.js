import React, { useState } from 'react';

const TimeRange = ({ onTimeRangeChange }) => {
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('18:00');

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
    onTimeRangeChange(startTime, endTime);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
    onTimeRangeChange(startTime, endTime);
  };

  return (
    <div>
      <label>Время начала: </label>
      <input style={{marginLeft: "10px", marginRight: "10px"}} type="time" value={startTime} onChange={handleStartTimeChange} />
      <label>Время окончания: </label>
      <input style={{marginLeft: "10px"}} type="time" value={endTime} onChange={handleEndTimeChange} />
    </div>
  );
};

export default TimeRange;