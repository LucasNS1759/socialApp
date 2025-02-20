import { Formik, Form, Field } from "formik";

const ReusableForm = ({initialValues,validationSchema,onSubmit,fields,}) => {

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
     {({ isSubmitting }) => (
     
        <Form>
          {fields.map(({ name, type, placeholder }) => (
            <div key={name}>
              <Field name={name} type={type} placeholder={placeholder} />
              {/* Podrías agregar mensajes de error aquí */}
            </div>
          ))}
          <button type="submit" disabled={isSubmitting}>
            Enviar
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ReusableForm;
