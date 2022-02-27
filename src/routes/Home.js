import React, { useState } from "react";

import { connect } from "react-redux";
import { createJournal } from "../store/actions/journalActions";

import { enGB } from "date-fns/locale";
import { getDay } from "date-fns";
import { DatePickerCalendar } from "react-nice-dates";
import "react-nice-dates/build/style.css";

const Home = ({ createJournal }) => {
  const [date, setDate] = useState(new Date());

  const modifiers = {
    highlight: (date) => getDay(date) === 0,
  };

  const modifiersClassNames = {
    highlight: "-highlight",
  };

  return (
    <div className="calender-container">
      <DatePickerCalendar
        date={date}
        onDateChange={setDate}
        locale={enGB}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createJournal: (journal) => dispatch(createJournal(journal)),
  };
};

export default connect(null, mapDispatchToProps)(Home);
