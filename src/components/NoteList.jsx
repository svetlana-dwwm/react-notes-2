import React, { useState } from 'react';

export default function NoteList({ notes, onRemoveBtn }) {
  const [sortBy, setSortBy] = useState('asc'); // Default 'asc' sort 
  const [selectedCategory, setSelectedCategory] = useState('All'); // Chosen category

  // Function to sort notes asc-desc
  const toggleSortOrder = () => {
    setSortBy(sortBy === 'asc' ? 'desc' : 'asc');
  };

  // Getting the list of unique categories names 
  const categories = ['All', ...new Set(notes.map(note => note.category_name))];

  // Function to change selected category
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Copy of notes for sorting
  const sortedNotes = [...notes].sort((a, b) => {
    if (sortBy === 'asc') {
      return a.text.localeCompare(b.text);
    } else {
      return b.text.localeCompare(a.text);
    }
  });

  // Filtering notes by category name
  const filteredNotes = selectedCategory === 'All' ? sortedNotes :
    sortedNotes.filter(note => note.category_name === selectedCategory);

  // Generating li for each note
  const listNotes = filteredNotes.map((note, index) => (
    <li key={index}>
      {note.text}
      &nbsp; {note.category_name && <span>&nbsp; (Category: {note.category_name})</span>}
      &nbsp;&nbsp;
      <button onClick={(event) => onRemoveBtn(note)}>x</button>
    </li>
  ));

  return (
    <>
      <p>A NOTE LIST</p>
      <div>
        <label htmlFor="category">Filtrer par catégorie:</label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
        <button onClick={toggleSortOrder}>Trier par ordre {sortBy === 'asc' ? 'décroissant' : 'croissant'}</button>
      </div>
      <ul>{listNotes}</ul>
    </>
  );
}






/*export default function NoteList({ notes, onRemoveBtn }) {

  // Generation des LI pour chaque note dans notes
  const listNotes = notes.map((note, index) =>
    <li key={index}>{note.text}
      &nbsp; {note.category_name && <span>&nbsp; (Category: {note.category_name})</span>}&nbsp;&nbsp;
      <button onClick={(event) => onRemoveBtn(note)}>x</button>
    </li>
  );

  return (
    <>
      <p>A NOTE LIST</p>
      <ul>{listNotes}</ul>
    </>
  )
}*/
