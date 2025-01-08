import React, { useState } from 'react';

const NotepadEdit = ({ notes, handleDeleteLine, handleSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentNote, setCurrentNote] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleEdit = (index, note) => {
    setIsEditing(true);
    setEditingIndex(index);
    setCurrentNote(note);
  };

  const saveEditedNote = () => {
    if (currentNote.trim() === '') {
      alert('Edited note cannot be empty');
      return;
    }
    handleSave(editingIndex, currentNote);
    setIsEditing(false);
    setEditingIndex(null);
    setCurrentNote('');
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <textarea
            className="bg-slate-700 h-40 w-full text-white p-4"
            placeholder="Edit your note here..."
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
          ></textarea>
          <button
            type="button"
            className="mt-4 bg-green-500 text-white py-2 px-6 rounded-md"
            onClick={saveEditedNote}
          >
            Save Note
          </button>
        </div>
      ) : (
        <div className="bg-pink-500 p-4">
          {notes.map((note, index) => (
            <div key={index} className="mb-4">
              <p>{note}</p>
              <button
                className="bg-red-500 text-white py-1 px-3 rounded-md"
                onClick={() => handleDeleteLine(index)}
              >
                Delete Note
              </button>
              <button
                className="bg-blue-500 text-white py-1 px-3 ml-2 rounded-md"
                onClick={() => handleEdit(index, note)}
              >
                Edit Note
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotepadEdit;
