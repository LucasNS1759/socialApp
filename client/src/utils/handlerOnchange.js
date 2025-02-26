
import { setPreviewInfo } from "../redux/features/posts/postSlice";
import fileValidations from "./inputFileFunctions/fileValidations";


const handlerOnchange = (e, postInformation,dispatch,
alert,) => {
    const { name, type, value, checked, files } = e.target;
    
    // esta condicional es para que no entre en cada onchange a la hora de escribir y tener que capturar el textarea solo va a entrar a la condicion si tiene file sino sigue de largo y entra al else para capturar el input ingresado 
    if (files) {

        // logica para validar el tipo de file que el usuario ingresa si no es valido responde con un alert y retorna para cortar el flujo de ejecucion
        const validation = fileValidations(files[0], dispatch, alert, postInformation)
        if (!validation) return

    }

    if (type !== "file") {
     dispatch(
            setPreviewInfo({
                ...postInformation,
                [name]: type === "checkbox" ? checked : value
            }))
    }

}

export default handlerOnchange







// const handlerOnchange = (e, data, setData, dispatch, alert, setFile) => {
//     const { name, type, value, checked, files } = e.target;
//     console.log(files)
//     // esta condicional es para que no entre en cada onchange a la hora de escribir y tener que capturar el textarea solo va a entrar a la condicion si tiene file sino sigue de largo y entra al else para capturar el input ingresado 
//     if (files) {

//         // logica para validar el tipo de file que el usuario ingresa si no es valido responde con un alert y retorna para cortar el flujo de ejecucion
//         const validation = fileValidations(files[0], dispatch, alert, data, setData, setFile)
//         if (!validation) return

//     }

//     if (type !== "file") {
//         setData({
//             ...data,
//             [name]: type === "checkbox" ? checked : value
//         })
     
//     }

// }

// export default handlerOnchange