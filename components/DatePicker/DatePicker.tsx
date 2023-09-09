'use client'

import React, { useState } from 'react';
import { Datepicker, DatepickerEvent } from "@meinefinsternis/react-horizontal-date-picker";
import { enUS } from "date-fns/locale";


const DatePicker = () => {
  const startDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1);

  const [date, setDate] = useState<{
    endValue: Date | null;
    startValue: Date | null;
    rangeDates: Date[] | null;

  }>({
    startValue: null,
    endValue: null,
    rangeDates: [],

  });

  const handleChange = (d: DatepickerEvent) => {

    const [startValue, endValue, rangeDates] = d;

    setDate((prev) => ({ ...prev, endValue, startValue, rangeDates }));
  };

  return (
    <Datepicker
      onChange={handleChange}
      locale={enUS}
      startValue={date.startValue}
      endValue={date.endValue}
      startDate={startDate}
    />
  )
}

export default DatePicker