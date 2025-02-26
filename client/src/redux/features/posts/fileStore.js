// archivo donde se va a guardar en memoria el file y redux a guardar la referencia de este archivo para que sea serealizable y siga las buenas practicas y no rompa nada en redux

let currentFile = null;

export const setFileReference = (file) => {
    currentFile = file;
};

export const getFileReference = () => currentFile;

export const clearFileReference = () => currentFile = null;

