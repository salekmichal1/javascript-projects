'use strict';
const notesContainer = document.querySelector('.notes-container');

const addButton = document.querySelector('.options__add-btn');
const searchBtn = document.querySelector('.search__btn');
const searchInput = document.querySelector('.search__input');

if (
  localStorage.getItem('notes') === null ||
  localStorage.getItem('cities') === ''
) {
  localStorage.setItem('notes', JSON.stringify([]));
}

const getNotes = function () {
  const notesArrLs = JSON.parse(localStorage.getItem('notes') || []);
  // sortowanie przypiętych notatek
  const notePinSort = notesArrLs.sort((a, b) => {
    return a.pin - b.pin;
  });
  return notePinSort;
};

const displayNotes = function (notes) {
  notes.map(note => {
    notesContainer.insertAdjacentHTML(
      'afterbegin',
      `<div class="note ${note.color}" data-id="${note.id}">
        <div>
          Tytuł: <input class="note__title" id="note-title-${note.id}" value="${
        note.title
      }"/>
        </div>
        <textarea class="note__content" id="note-content-${note.id}" rows="6">${
        note.content
      }</textarea>
        <label for="note-pin-${note.id}"> Przypmnij notatke</label>
        <input type="checkbox" class="pined" id="note-pin-${note.id}" ${
        note.pin ? 'checked' : ''
      }>
        <p class="note__date">Utworzono: ${note.date}</p>
        <div class="note__buttons">
          <button class="note__btn" onClick="saveNote(${
            note.id
          })">Zapisz</button>
          <button class="note__btn" onClick="deleteNote(${
            note.id
          })">Usuń</button>
        </div>
        <div class="note__colors">
          <button id="light" class="note__color note__color-light" id="note-light-${
            note.id
          }" onClick="changeNoteColor(${note.id}, 'light')"></button>
          <button id="dark" class="note__color note__color-dark" id="note-dark-${
            note.id
          }" onClick="changeNoteColor(${note.id}, 'dark')"></button>
        </div>
        </div>`
    );
  });
};

displayNotes(getNotes());

const createOrUpdateNote = function (noteToUpdate) {
  const notes = getNotes();
  const checkIfExist = notes.find(note => note.id === noteToUpdate.id);

  if (checkIfExist) {
    checkIfExist.title = noteToUpdate.title;
    checkIfExist.content = noteToUpdate.content;
    checkIfExist.color = noteToUpdate.color;
    checkIfExist.pin = noteToUpdate.pin;
    console.log(checkIfExist);
  } else {
    const lastId = Math.max(...notes.map(note => note.id), 0);

    noteToUpdate.id = lastId + 1;
    console.log(notes, lastId);
    notes.push(noteToUpdate);
  }

  localStorage.setItem('notes', JSON.stringify(notes));
};

const saveNote = function (id) {
  const allNotes = document.querySelectorAll('.note');
  const noteToSave = document.querySelector(`[data-id="${id}"]`);
  const noteTitle = document.getElementById(`note-title-${id}`);
  const noteContent = document.getElementById(`note-content-${id}`);
  const notePin = document.getElementById(`note-pin-${id}`);
  const currentColor = noteToSave.classList.contains('light')
    ? 'light'
    : 'dark';

  createOrUpdateNote({
    id: id,
    title: noteTitle.value,
    content: noteContent.value,
    color: currentColor,
    pin: notePin.checked,
  });

  allNotes.forEach(note => note.remove());
  displayNotes(getNotes());
};

const deleteNote = function (id) {
  const notes = getNotes();
  const deletedNotes = notes.filter(note => note.id != id);
  localStorage.setItem('notes', JSON.stringify(deletedNotes));

  const noteToDelete = document.querySelector(`[data-id="${id}"]`);
  noteToDelete.remove();
  console.log(noteToDelete);
};

const changeNoteColor = function (id, color) {
  const noteToChange = document.querySelector(`[data-id="${id}"]`);
  const currentClass = noteToChange.classList.contains('light')
    ? 'light'
    : 'dark';

  if (color !== currentClass) {
    noteToChange.classList.toggle('light');
    noteToChange.classList.toggle('dark');
  }

  console.log(noteToChange.classList.contains(color), color);
};

const searchNotes = function () {
  const allNotes = document.querySelectorAll('.note');

  const notes = getNotes();
  const searchValue = searchInput.value.trim().toLowerCase();

  const filteredNotes = notes.filter(note =>
    Object.values(note).some(
      value =>
        typeof value === 'string' && value.toLowerCase().includes(searchValue)
    )
  );
  if (filteredNotes.length === 0) {
    allNotes.forEach(note => note.remove());
    alert('Nie znaleziono');
  } else {
    allNotes.forEach(note => note.remove());
    displayNotes(filteredNotes);
  }
};

addButton.addEventListener('click', function () {
  const newDate = new Date().toLocaleString();
  const newNote = {
    title: 'Wpisz tytuł',
    content: 'Wpisz notatke',
    date: newDate,
    color: 'dark',
    pin: false,
  };

  createOrUpdateNote(newNote);

  displayNotes([newNote]);
});

searchBtn.addEventListener('click', searchNotes);
