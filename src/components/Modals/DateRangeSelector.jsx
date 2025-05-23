// src/components/Modals/DateRangeSelector.jsx
import React, { useState, useEffect } from 'react';
import { DateRange }              from 'react-date-range';
import { addDays }                from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

/**
 * Props:
 *   range: { startDate: Date, endDate: Date }
 *   onChange: ({ startDate, endDate }) => void
 *   disabledRanges?: Array<{ startDate: Date, endDate: Date }>
 */
export default function DateRangeSelector({
  range,
  onChange,
  disabledRanges = []
}) {
  // 1) build array of disabledDates
  const disabledDates = disabledRanges.flatMap(r => {
    const all = [];
    let d = new Date(r.startDate);
    while (d <= r.endDate) {
      all.push(new Date(d));
      d = addDays(d, 1);
    }
    return all;
  });

  // 2) track whether we're on a narrow viewport
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
      // switch to 1 month vertical on mobile, else 2 horizontal
      months={isMobile ? 1 : 2}
      direction={isMobile ? 'vertical' : 'horizontal'}

      ranges={[{ ...range, key: 'selection' }]}
      minDate={new Date()}
      disabledDates={disabledDates}
      onChange={({ selection }) => onChange(selection)}

      // keep your existing behaviors
      showSelectionPreview
      moveRangeOnFirstSelection={false}
      retainEndDateOnFirstSelection

      // force the react-date-range wrapper to grow to its contents
      className={`
        !rounded-lg
        !shadow-lg
        ${isMobile ? 'w-full max-h-[80vh]' : 'w-fit'} 
        overflow-auto
      `}
    />
  );
}

