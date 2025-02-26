import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearFileReference, setFileReference } from "./fileStore";
import axios from "axios"


const initialState = {
    text: "",
    privacy: false,
    multimedia: null,
    scheduler: null,
    previewUrl: "",
    previewType: "",
    isSubmitting: false,
    postCreated: false,
    fileSliceReference: null, // <-- este estado va a tener la referencia de fileStore.js , va a estar apuntando a esa referencia 
    loadingProgress: 0,
    loading: {
        uploadMultimedia: false,
        submitPost: false,
        uploadAndSubmitPost: false,
    },
    error: {
        uploadMultimedia: null,
        submitPost: null,
        uploadAndSubmitPost: null,
    },
};

// primera accion asincrona para convertir el file en una url (con cloudinary desde el backend)
export const uploadMultimedia = createAsyncThunk(
    "post/uploadMultimedia",
    async (file, { rejectWithValue }) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(
                "http://localhost:3001/post/uploadMultimedia",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            console.log(response)
            return response.data.url;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

//segunda accion asincrona donde se envia lo que se tiene para crear el post en el back end (puede tener o no la url anteriormente mencionada depende de si el usuario selecciono o no un file )
export const submitPost = createAsyncThunk(
    "post/submitPost",
    async (postData, { rejectWithValue }) => {


        try {
            const response = await axios.post("http://localhost:3001/post", {
                text: postData.text,
                privacy: postData.privacy,
                multimedia: postData.multimedia,
                scheduler: postData.scheduler,
            },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/JSON"
                    }
                });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const uploadAndSubmitPost = createAsyncThunk(
    "post/uploadAndSubmitPost",
    async ({ file, postInformation }, { dispatch, rejectWithValue }) => {
        try {

            if (file) {
                // Primero sube el archivo
                const multimediaUrl = await dispatch(uploadMultimedia(file)).unwrap();

                // Luego envía el post con la URL del archivo
                const postData = { ...postInformation, multimedia: multimediaUrl };
                const result = await dispatch(submitPost(postData)).unwrap();
                return result;

            } else {
                const result = await dispatch(submitPost(postInformation)).unwrap();
                return result;
            }

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        //action q actualiza los datos mediante el onchange
        setPostInfo: (state, action) => {
            Object.assign(state, action.payload);
        },
        //limpio todo el formmulario con el boton del formulario
        clearPost: (state) => {
            Object.assign(state, initialState);
            clearFileReference()
        },
        //action para guardar la referencia del file sin error de serealizacion
        setFileSlice: (state, action) => {
            console.log(action.payload)
            // const file = action.payload
            //guardo el file entero en otro archivo ajeno a este slice y a redux
            // setFileReference(file)

            return { ...state, fileSliceReference: action.payload }
            // return { ...state, fileSliceReference: file.name }
            //actualizo mi estado de referencia (fileSliceReference) 
            // asi apunto siempre a esa referencia  y mantengo vivo el archivo mientras viva mi estado de redux 

        },
        //action para obtener url de previsualizacion de un archivo
        setPreviewInfo: (state, action) => {

            Object.assign(state, action.payload);
        }

    },
    

    extraReducers: (builder) => {
        builder

            // Manejar el estado de uploadMultimedia
            .addCase(uploadMultimedia.pending, (state) => {
                state.loading.uploadMultimedia = true;
                state.error.uploadMultimedia = null;
                state.loadingProgress = 33; //33 % de carga
            })
            .addCase(uploadMultimedia.fulfilled, (state) => {
                state.loading.uploadMultimedia = false;
                state.loadingProgress = 66;
            })
            .addCase(uploadMultimedia.rejected, (state, action) => {
                state.loading.uploadMultimedia = false;
                state.error.uploadMultimedia = action.payload;
            })


            // Manejar el estado de submitPost
            .addCase(submitPost.pending, (state) => {
                state.loading.submitPost = true;
                state.error.submitPost = null;
                state.loadingProgress = 85;
                
            })
            .addCase(submitPost.fulfilled, (state) => {
                state.loading.submitPost = false;
               
            })
            .addCase(submitPost.rejected, (state, action) => {
                state.loading.submitPost = false;
                state.error.submitPost = action.payload;
            })


            // Manejar el estado de uploadAndSubmitPost 
            .addCase(uploadAndSubmitPost.pending, (state) => {
                state.loading.uploadAndSubmitPost = true;
                state.error.uploadAndSubmitPost = null;

            })
            .addCase(uploadAndSubmitPost.fulfilled, (state) => {
                state.loading.uploadAndSubmitPost = false;
                state.loadingProgress = 100;
                state.postCreated = true
            })
            .addCase(uploadAndSubmitPost.rejected, (state, action) => {
                state.loading.uploadAndSubmitPost = false;
                state.error.uploadAndSubmitPost = action.payload;
                state.postCreated = false

            });
    },

});


export const { setPostInfo, clearPost, setFileSlice, setPreviewInfo } = postSlice.actions;
export default postSlice.reducer;

//SELECTORES

export const selectPostInfo = (state) => state.post
export const selectPostIsSubmitting = (state) => state.post.isSubmitting
export const selectPostIsPreviewUrl = (state) => state.post.previewUrl