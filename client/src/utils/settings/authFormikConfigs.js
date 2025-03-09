import * as yup from "yup";

//////////// singup /////////////////////////////////////
export const singUpInitialValue = {
    email: "",
    password: "",
    name: "",
    surName: "",
    gender : ""
}
export const singUpValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Invalid email")
        .required("Required"),

    password: yup
        .string()
        .min(6, "too short!")
        .max(100, "Too Long!")
        .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/, "Password must contain at least one uppercase letter and one special character")
        .required("Required"),

    name: yup
        .string()
        .min(3, "Too short!")
        .max(40, "Too long!")
        .required("Required"),

    surName: yup
        .string()
        .min(3, "Too short!")
        .max(40, "Too long!")
        .required("Required"),

    gender: yup
        .string()
        .oneOf(["male", "female"], "Selecciona un género válido")
        .required("Required"),

})


////////////////// LOGIN //////////////////

export const loginInitialValue = {
    email: "",
    password: "",
}
export const loginValidationSchema =  yup.object().shape({
        email: yup
            .string()
            .email("Invalid email")
            .required("Required"),

        password: yup
            .string()
            .min(6, "too short!")
            .max(100, "Too Long!")
            .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/, "Password must contain at least one uppercase letter and one special character")
            .required("Required"),

    })
