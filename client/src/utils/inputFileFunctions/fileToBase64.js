
//fileTobase64 funcion encargada de convertir un multimedia valido abase64 y resolver la promesa con el resultado o el error 

// fileValidations va a recobir el file un dispatch con una accion para poder responder en caso de error, lo que hace esta funcion es validar si el multimedia cumple con ciertos requisitos multimedia y tamaño de los mismos (formatos y tamaño) y si hay un error dispara un alerta con el error y corta el flujo 
const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

export default fileToBase64;