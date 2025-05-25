import React, { useState, useEffect } from 'react';
import { DateRange }              from 'react-date-range';
import { addDays }                from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';


export default function DateRangeSelector({
  range,
  onChange,
  disabledRanges = []
}) {

  const disabledDates = disabledRanges.flatMap(r => {
    const all = [];
    let d = new Date(r.startDate);
    while (d <= r.endDate) {
      all.push(new Date(d));
      d = addDays(d, 1);
    }
    return all;
  });

 
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth < 768
  );

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <DateRange
     
      months={isMobile ? 1 : 2}
      direction={isMobile ? 'vertical' : 'horizontal'}

      ranges={[{ ...range, key: 'selection' }]}
      minDate={new Date()}
      disabledDates={disabledDates}
      onChange={({ selection }) => onChange(selection)}


      showSelectionPreview
      moveRangeOnFirstSelection={false}
      retainEndDateOnFirstSelection

 
      className={`
        !rounded-lg
        !shadow-lg
        ${isMobile ? 'w-full max-h-[80vh]' : 'w-fit'} 
        overflow-auto
      `}
    />
  );
}

