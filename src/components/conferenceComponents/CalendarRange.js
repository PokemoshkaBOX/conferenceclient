import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Импортируем стили для DateRangePicker
import 'react-date-range/dist/theme/default.css'; // Импортируем стили для темы по умолчанию

function CalendarRange({ onDateRangeChange }) {
  const [selectedRange, setSelectedRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSelect = (ranges) => {
    setSelectedRange([ranges.selection]);
    onDateRangeChange(ranges.selection); // Передаем выбранный диапазон дат через коллбэк
  };

  const toggleCalendar = (event) => {
    event.preventDefault();
    setShowCalendar(!showCalendar);
  };

  return (
    <div style={{ position: 'relative' }}>
      <button style={{ borderRadius: '10px', fontSize: "20px", borderWidth: '1px', minWidth: 200 }} onClick={toggleCalendar}>Выберите диапазон дат</button>
      {showCalendar && (
        <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 999 }}>
          <DateRangePicker
            ranges={selectedRange}
            onChange={handleSelect}
          />
        </div>
      )}
    </div>
  );
}

export default CalendarRange;
