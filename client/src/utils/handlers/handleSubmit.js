export const handleSubmitFormik = (callback) => {
    return async (values) => {
      try {
        await callback(values);
        
      } catch (error) {
        console.error("Error:", error);
      } finally {
        console.log("hacer algo")
      }
    };
  };
  