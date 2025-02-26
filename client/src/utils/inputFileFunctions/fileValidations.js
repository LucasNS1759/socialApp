import { getFileReference, setFileReference } from "../../redux/features/posts/fileStore";
import { setFileSlice, setPreviewInfo } from "../../redux/features/posts/postSlice";

// responsavilidad de esta funcion validar que el file sea valido y actualizar los estados de react dependiendo del exito 
const fileValidations = (file, dispatch, alert, postInformation) => {

    if (!file) return;

    const validFormats = ["image/jpeg", "image/png", "image/gif", "video/mp4", "video/webm"];
    console.log(file.type)
    if (!validFormats.includes(file.type) || file.type === undefined) {
        dispatch(alert({ type: "info", title: "invalid format", text: " Please enter one of the following allowed formats : jpeg, gif, png, mp4, webm" }))
        return false
    }

    const maxSize = file.type.startsWith("video") ? 50 * 1024 * 1024 : 5 * 1024 * 1024; // 50MB para video, 5MB para imágenes
    if (file.size > maxSize) {
        dispatch(alert({ type: "info", title: "too big", text: "video weight limit 50MB images 5MB" }));
        return false
    }
    const url = URL.createObjectURL(file);
    dispatch(
        setPreviewInfo({
            ...postInformation,
            previewUrl: url,
            previewType: file.type
        }))

    //guardo la referencia extera a redux
    setFileReference(file)
    //la obtengo 
    const reference = getFileReference()

    //despacho la accion y guardo solo el name de esa referencia que es el file completo, peeeero de esta manera mantengo viva la referencia si navego entre paginas ya que la referencia vive en el tiempo de vida de redux 
    dispatch(setFileSlice(reference.name))



}

export default fileValidations;