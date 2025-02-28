import React, { useState, useEffect } from "react";

const NotepadEdit = ({ notes, handleDeleteLine, handleSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentNote, setCurrentNote] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [bg, setBg] = useState({});

  // Handle background change for a specific note
  useEffect(() => {
    const storeColor = localStorage.getItem('bg');
    if (storeColor) {
      setBg(JSON.parse(storeColor));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bg', JSON.stringify(bg));
  }, [bg]);

  const handleBg = (index, color) => {
    setBg((prev) => ({ ...prev, [index]: color }));
  };

  // Handle edit action
  const handleEdit = (index, note) => {
    setIsEditing(true);
    setEditingIndex(index);
    setCurrentNote(note);
  };

  // Save edited note
  const saveEditedNote = () => {
    if (currentNote.trim() === "") {
      alert("Edited note cannot be empty");
      return;
    }
    handleSave(editingIndex, currentNote);
    setIsEditing(false);
    setEditingIndex(null);
    setCurrentNote("");
  };

  // Apply text formatting
  const applyFormatting = (command, value) => {
    document.execCommand(command, false, value);
  };

  return (
    <div className="notepad-container">
      {isEditing ? (
        <div className="editor-container">
          <div className="toolbar mb-2">
            <button
              onClick={() => applyFormatting("bold")}
              className="bg-gray-300 px-2 py-1 rounded-md mx-1"
            >
              Bold
            </button>
            <button
              onClick={() => applyFormatting("italic")}
              className="bg-gray-300 px-2 py-1 rounded-md mx-1"
            >
              Italic
            </button>
            <button
              onClick={() => applyFormatting("underline")}
              className="bg-gray-300 px-2 py-1 rounded-md mx-1"
            >
              Underline
            </button>
            <button
              onClick={() => applyFormatting("strikeThrough")}
              className="bg-gray-300 px-2 py-1 rounded-md mx-1"
            >
              Strikethrough
            </button>
            <button
              onClick={() => applyFormatting("subscript")}
              className="bg-gray-300 px-2 py-1 rounded-md mx-1"
            >
              Subscript
            </button>
            <button
              onClick={() => applyFormatting("superscript")}
              className="bg-gray-300 px-2 py-1 rounded-md mx-1"
            >
              Superscript
            </button>
            <button
              onClick={() => applyFormatting("insertUnorderedList")}
              className="bg-gray-300 px-2 py-1 rounded-md mx-1"
            >
              Bullet List
            </button>
            <button
              onClick={() => applyFormatting("insertOrderedList")}
              className="bg-gray-300 px-2 py-1 rounded-md mx-1"
            >
              Numbered List
            </button>
            <button
              onClick={() => applyFormatting("justifyLeft")}
              className="bg-gray-300 px-2 py-1 rounded-md mx-1"
            >
              Justify Left
            </button>
            <button
              onClick={() => applyFormatting("justifyCenter")}
              className="bg-gray-300 px-2 py-1 rounded-md mx-1"
            >
              Center
            </button>
            <button
              onClick={() => applyFormatting("justifyRight")}
              className="bg-gray-300 px-2 py-1 rounded-md mx-1"
            >
              Justify Right
            </button>
            <button
              onClick={() => applyFormatting("justifyFull")}
              className="bg-gray-300 px-2 py-1 rounded-md mx-1"
            >
              Justify Full
            </button>
            <button
              onClick={() => applyFormatting("fontName", "Arial")}
              className="bg-gray-300 px-2 py-1 rounded-md mx-1"
            >
              Font Arial
            </button>
            <button
              onClick={() => applyFormatting("fontSize", "4")}
              className="bg-gray-300 px-2 py-1 rounded-md mx-1"
            >
              Font Size 4
            </button>
            <button
              onClick={() => applyFormatting("foreColor", "red")}
              className="bg-gray-300 px-2 py-1 rounded-md mx-1"
            >
              Red Text
            </button>
            <button
              onClick={() => applyFormatting("backColor", "yellow")}
              className="bg-gray-300 px-2 py-1 rounded-md mx-1"
            >
              Yellow Background
            </button>
            <button
              onClick={() => applyFormatting("createLink", "http://")}
              className="bg-gray-300 px-2 py-1 rounded-md mx-1"
            >
              Insert Link
            </button>
            <button
              onClick={() => applyFormatting("unlink")}
              className="bg-gray-300 px-2 py-1 rounded-md mx-1"
            >
              Unlink
            </button>
            <button
              onClick={() => applyFormatting("insertImage", "image_url")}
              className="bg-gray-300 px-2 py-1 rounded-md mx-1"
            >
              Insert Image
            </button>
            <button
              onClick={() => applyFormatting("insertHorizontalRule")}
              className="bg-gray-300 px-2 py-1 rounded-md mx-1"
            >
              Horizontal Line
            </button>
            <button
              onClick={() => applyFormatting("removeFormat")}
              className="bg-gray-300 px-2 py-1 rounded-md mx-1"
            >
              Remove Format
            </button>
          </div>
          <div
            contentEditable
            className="notepad-textarea bg-slate-700 p-4 rounded-md"
            onInput={(e) => setCurrentNote(e.currentTarget.innerHTML)}
            dangerouslySetInnerHTML={{ __html: currentNote }}
          ></div>
          <button
            type="button"
            className="save-button mt-2 bg-green-500 text-white px-4 py-2 rounded-md"
            onClick={saveEditedNote}
          >
            Save Note
          </button>
        </div>
      ) : (
        <div className="notes-list">
          {notes.map((note, index) => (
            <div
              key={index}
              className="note-item"
              style={{ background: bg[index] || "white" }}
            >
              <div dangerouslySetInnerHTML={{ __html: note }} />
              <div className="note-actions mt-2">
                <button
                  className="delete-button bg-red-500 text-white px-2 py-1 rounded-md mr-2"
                  onClick={() => handleDeleteLine(index)}
                >
                  Delete
                </button>
                <button
                  className="edit-button bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                  onClick={() => handleEdit(index, note)}
                >
                  Edit
                </button>
                <input
                  type="text"
                  placeholder="Change background..."
                  className="border px-2 py-1 rounded-md"
                  onChange={(e) => handleBg(index, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotepadEdit;
