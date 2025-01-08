'use client'
import React, { useEffect, useState } from 'react';
import NotepadEdit from '../component/NotepadEdit';

const HomeScreen = () => {
  const [displayNote, setDisplayNote] = useState(false);
  const [text, setText] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const toggleNote = () => {
    setDisplayNote((prev) => !prev);
  };

  const saveNote = (e) => {
    e.preventDefault();
    if (text.trim() === '') {
      alert('Input field box is empty');
      return;
    }
    setNotes((prevNotes) => [...prevNotes, text]);
    setText('');
  };

  const handleDeleteLine = (index) => {
    const updatedLines = [...notes];
    updatedLines.splice(index, 1);
    setNotes(updatedLines);
  };

  const handleSave = (index, updatedText) => {
    const updatedLines = notes.map((line, i) => (i === index ? updatedText : line));
    setNotes(updatedLines);
  };

  return (
    <div>
      <div className="pt-[2em]">
        <h2 className="lg:text-4xl py-10 uppercase text-center">
          Welcome to your <i>KNote</i>
        </h2>
        <div className="flex justify-between my-2 px-[2em] text-center bg-slate-900 py-[4em] rounded-[40px] shadow-black items-center gap-[50px]">
          <button
            className="bg-slate-700 py-8 px-8 w-[40%] text-white"
            onClick={toggleNote}
          >
            {displayNote ? 'Close Note' : 'Open Note'}
          </button>
          <button className="bg-slate-700 py-8 px-8 w-[40%] text-white">
            Open TodoList
          </button>
        </div>

        {/* Notepad Section */}
        {displayNote && (
          <form className="mt-4" onSubmit={saveNote}>
            <textarea
              className="bg-slate-700 h-[60%] w-full text-white p-4"
              placeholder="Type your note here..."
              onChange={(e) => setText(e.target.value)}
              value={text}
            ></textarea>
            <button
              type="submit"
              className="mt-4 bg-slate-800 text-white py-2 px-6 rounded-md"
            >
              Save Note
            </button>
          </form>
        )}
        <p>{text}</p>

        {/* NotepadEdit Component */}
        {displayNote && (
          <NotepadEdit
            notes={notes}
            handleDeleteLine={handleDeleteLine}
            handleSave={handleSave}
          />
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
