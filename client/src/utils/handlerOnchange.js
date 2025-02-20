import fileToBase64 from "./inputFileFunctions/fileToBase64";
import fileValidations from "./inputFileFunctions/fileValidations";

const handlerOnchange = (e, data, setData, dispatch, alert) => {
    const { name, type, value, checked, files } = e.target;

    // esta condicional es para que no entre en cada onchange a la hora de escribir y tener que capturar el textarea solo va a entrar a la condicion si tiene file sino sigue de largo y entra al else para capturar el input ingresado 
    if (files) {
    // logica para validar el tipo de file que el usuario ingresa si no es valido responde con un alert y retorna para cortar el flujo de ejecucion
        const validation = fileValidations(files[0], dispatch, alert, data, setData)
        if (!validation) return
    }


    if (type === "file") {
        try {
            const file = files[0]; // obtengo el multimedia en posicion 0 
            //llamo a mi funcion que convierte el multimedia  a base 64 que me retorna una promesa 
            fileToBase64(file)
                .then((base64) => {
                    setData({
                        ...data,
                        [name]: base64
                    })

                })
                .catch((err) => {
                    console.error(err)
                })

        } catch (error) {
            console.error(error);
        }
    } else {
        setData({
            ...data,
            [name]: type === "checkbox" ? checked : value
        })
    }


}

export default handlerOnchange