

const fileValidations = (file, dispatch, alert, data, setData) => {
    console.log(file);
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
    setData({
        ...data,
        previewUrl: url,
        previewType: file.type
    })

}

export default fileValidations;