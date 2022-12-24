import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import {
  createJournal,
  GetJournalsAtDate,
  GetAllJournals,
} from "../store/actions/journalActions";

import Editor from "../components/editor/Editor";
import { enGB } from "date-fns/locale";
import { getDay } from "date-fns";
import { DatePickerCalendar } from "react-nice-dates";
import "react-nice-dates/build/style.css";
import { v4 as uuid } from "uuid";

import { Modal, useModal, Link, Text } from "@geist-ui/core";
import { EDITOR_PLACEHOLDER_JOURNAL } from "../constants/editor";

const Home = ({
  createJournal,
  getJournalAtDate,
  currentJournals,
  getAllJournals,
  uid,
}) => {
  const [date, setDate] = useState(new Date());
  const { visible, setVisible, bindings } = useModal();
  const [currentEditingJournal, setCurrentEditingJournal] = useState(null);

  useEffect(() => {
    getAllJournals(uid);
  }, [uid]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDateChange = (date) => {
    setDate(date);
    setVisible(true);

    getJournalAtDate(date);
  };

  const handleJournalLinkClick = (journal) => {
    setVisible(false);
    setCurrentEditingJournal({
      ...journal,
      date: date.toLocaleDateString("en-GB"),
    });
  };

  const handleCreateJournal = () => {
    createJournal({
      ...EDITOR_PLACEHOLDER_JOURNAL,
      id: uuid(),
      date: date.toLocaleDateString("en-GB"),
    });
  };

  const modifiers = {
    highlight: (date) => getDay(date) === 0,
  };

  const modifiersClassNames = {
    highlight: "-highlight",
  };

  const _renderJournalLink = (journal) => {
    return (
      <Link
        href="#"
        color
        onClick={() => {
          handleJournalLinkClick(journal);
        }}
      >
        {journal.title}
      </Link>
    );
  };

  const _renderJournalLinks = () => {
    if (currentJournals) {
      return currentJournals.map((journal, idx) => {
        return (
          <li key={idx}>
            {_renderJournalLink(journal)}
            <br />
          </li>
        );
      });
    } else {
      return <Text type="error">No journals found!</Text>;
    }
  };

  return (
    <>
      <Modal {...bindings}>
        <Modal.Title>
          Showing Journals for {date.toLocaleDateString("en-GB")}
        </Modal.Title>
        <Modal.Content>{_renderJournalLinks()}</Modal.Content>
        <Modal.Action onClick={handleCreateJournal}>Add Journal</Modal.Action>
      </Modal>

      {currentEditingJournal ? (
        <Editor
          journal={currentEditingJournal}
          closeCallback={setCurrentEditingJournal}
        />
      ) : (
        <div className="calender-container">
          <DatePickerCalendar
            date={date}
            onDateChange={handleDateChange}
            locale={enGB}
            modifiers={modifiers}
            modifiersClassNames={modifiersClassNames}
          />
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    currentJournals: state.journal.currentJournals,
    allJournals: state.journal.journals,
    uid: state.firebase.auth.uid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createJournal: (journal) => dispatch(createJournal(journal)),
    getJournalAtDate: (date) => dispatch(GetJournalsAtDate(date)),
    getAllJournals: (uid) => dispatch(GetAllJournals(uid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
