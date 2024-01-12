"use client";
import * as React from "react";
import { Calendar } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import Wrapper from "@components/helpers/wrapper";
import CalendarIcon from "@assets/icons/calendarIcon";
import { useState } from "react";
import "./datepicker.scss";

export const formatDateDisplay = (date) => {
  if (!date) return date;
  return format(date, "yyyy-MM-dd");
};

export const DatepickerCalendar = ({ label, open, setOpen, onClickHandler }) => {
  const [date, setDate] = useState(new Date());

  const handleSelect = (date: any) => {
    setDate(date);
    onClickHandler(date);
    setOpen(false);
  };

  const handleOnBlur = () => {
    setOpen(false);
  };

  return (
    <Wrapper>
      <div className={`input-field`}>
        <label>{label}</label>
        <div className="input-group">
          <div onClick={() => setOpen(!open)} className="datepicker_wrapper">
            <div className="datepicker_section">
              <div className="datepicker">
                <div className="date_title">{formatDateDisplay(date)}</div>
              </div>
              <CalendarIcon className="icon" />
            </div>
          </div>
        </div>
      </div>
      {open && <Calendar date={date} onChange={handleSelect} />}
    </Wrapper>
  );
};
