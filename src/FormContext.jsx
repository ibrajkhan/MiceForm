// import React, { createContext, useState } from "react";

// export const FormContext = createContext();

// export const FormProvider = ({ children }) => {
//   const [formData, setFormData] = useState({});

//   return (
//     <FormContext.Provider value={{ formData, setFormData }}>
//       {children}
//     </FormContext.Provider>
//   );
// };

import React, { createContext, useState } from "react";

// Create the context
export const FormContext = createContext();

// Create the provider component
export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({});

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};
