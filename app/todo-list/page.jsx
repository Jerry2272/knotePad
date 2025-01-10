'use client'

import React from 'react'
const applyFormatting = (command) => {
    document.execCommand(command, false, null)
}

const page = () => {
  return (
   <>
    <div 
    contentEditable
    className="notepad-textarea bg-slate-700 p-4 rounded-md"
    dangerouslySetInnerHTML={{ __html: ''}}
   />
        <button onClick={()=> applyFormatting('italic')}>italic</button>
        <button onClick={()=> applyFormatting('italic')}>italic</button>
   </>

  )
}

export default page