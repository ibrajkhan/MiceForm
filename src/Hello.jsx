// import { useForm, Controller, useFieldArray } from "react-hook-form";
// import { useState, useEffect } from "react";
// import { Row, Col, Container } from "react-bootstrap";
// import Button from "react-bootstrap/Button";

// const Hello = () => {
//   const {
//     register,
//     handleSubmit,
//     control,
//     setValue,
//     formState: { errors },
//     setError,
//     clearErrors,
//     watch,
//     reset,
//   } = useForm({
//     defaultValues: {
//       countries: [{ country: null, cities: [] }],
//       totalPaxVisaGroup: "",
//       paxValues: [],
//     },
//   });

//   const [rows, setRows] = useState([
//     { gitCity: [], totlaPaxGit: "", Remarks: "" },
//   ]);

//   const addEntireRowFunction = () => {
//     setRows([...rows, { gitCity: [], totlaPaxGit: "", Remarks: "" }]);
//   };

//   const removeRowFunction = (index) => {
//     const newRows = rows.filter((_, i) => i !== index);
//     setRows(newRows);
//   };

//   const totalPaxVisaGroup = watch("totalPaxVisaGroup");
//   const paxValues = rows.map((_, index) => watch(`totlaPaxGit${index}`));

//   useEffect(() => {
//     const totalPax = parseInt(totalPaxVisaGroup) || 0;
//     let sumPax = 0;

//     paxValues.forEach((value, index) => {
//       const paxValue = parseInt(value) || 0;
//       sumPax += paxValue;

//       if (paxValue > totalPax) {
//         setError(`totlaPaxGit${index}`, {
//           type: "manual",
//           message: "Pax value exceeds total Pax",
//         });
//       } else {
//         clearErrors(`totlaPaxGit${index}`);
//       }
//     });

//     if (sumPax > totalPax) {
//       setError("totalSum", {
//         type: "manual",
//         message: "Total Pax sum exceeds total Pax",
//       });
//     } else {
//       clearErrors("totalSum");
//     }
//   }, [totalPaxVisaGroup, paxValues, setError, clearErrors]);

//   return (
//     <Row>
//       <div className="input__container">
//         <label htmlFor="totalPaxVisaGroup">
//           Total Pax. <span className="required_field">*</span>
//         </label>
//         <input
//           type="text"
//           id="totalPaxVisaGroup"
//           className="input-element"
//           placeholder="TotalPax"
//           name="totalPaxVisaGroup"
//           {...register("totalPaxVisaGroup", {
//             required: "Total Pax is required",
//             pattern: {
//               value: /^[0-9]+$/,
//               message: "Enter a valid number",
//             },
//           })}
//         />
//         {errors.totalPaxVisaGroup && (
//           <span className="errorMsg">{errors.totalPaxVisaGroup.message}</span>
//         )}
//       </div>
//       {rows.map((row, index) => (
//         <Row key={index} className="row__container">
//           <Col md={2}>
//             <div className="input__container">
//               <label htmlFor={`totlaPaxGit${index}`}>
//                 No of Pax <span className="required_field">*</span>
//               </label>
//               <input
//                 type="text"
//                 id={`totlaPaxGit${index}`}
//                 className="input-element"
//                 placeholder="Number of Pax"
//                 name={`totlaPaxGit${index}`}
//                 {...register(`totlaPaxGit${index}`, {
//                   required: "Total No of Pax is required",
//                   pattern: {
//                     value: /^[0-9]+$/,
//                     message: "Enter a valid number",
//                   },
//                 })}
//               />
//               {errors[`totlaPaxGit${index}`] && (
//                 <span className="errorMsg">
//                   {errors[`totlaPaxGit${index}`].message}
//                 </span>
//               )}
//             </div>
//           </Col>
//           <Col md={1} className="d-flex align-items-end">
//             <Button
//               type="button"
//               className="btn btn-danger"
//               size="sm"
//               onClick={() => removeRowFunction(index)}>
//               Remove
//             </Button>
//           </Col>
//         </Row>
//       ))}
//       {errors.totalSum && (
//         <span className="errorMsg">{errors.totalSum.message}</span>
//       )}
//       <Row md={1}>
//         <Button className="mt-4" size="sm" onClick={addEntireRowFunction}>
//           Add City Section
//         </Button>
//       </Row>
//     </Row>
//   );
// };

// export default Hello;

// using useForm hooks

// import { useForm, Controller, useFieldArray } from "react-hook-form";
// import { useEffect } from "react";
// import { Row, Col } from "react-bootstrap";
// import Button from "react-bootstrap/Button";

// const Hello = () => {
//   const {
//     register,
//     handleSubmit,
//     control,
//     setError,
//     clearErrors,
//     watch,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       totalPaxVisaGroup: "",
//       rows: [{ totlaPaxGit: "", Remarks: "" }],
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "rows",
//   });

//   const totalPaxVisaGroup = watch("totalPaxVisaGroup");
//   const rows = watch("rows");

//   useEffect(() => {
//     const totalPax = parseInt(totalPaxVisaGroup) || 0;
//     let sumPax = 0;

//     rows.forEach((row, index) => {
//       const paxValue = parseInt(row.totlaPaxGit) || 0;
//       sumPax += paxValue;

//       if (paxValue > totalPax) {
//         setError(`rows.${index}.totlaPaxGit`, {
//           type: "manual",
//           message: "Pax value exceeds total Pax",
//         });
//       } else {
//         clearErrors(`rows.${index}.totlaPaxGit`);
//       }
//     });

//     if (sumPax > totalPax) {
//       setError("totalSum", {
//         type: "manual",
//         message: "Total Pax sum exceeds total Pax",
//       });
//     } else {
//       clearErrors("totalSum");
//     }
//   }, [totalPaxVisaGroup, rows, setError, clearErrors]);

//   return (
//     <Row>
//       <div className="input__container">
//         <label htmlFor="totalPaxVisaGroup">
//           Total Pax. <span className="required_field">*</span>
//         </label>
//         <input
//           type="text"
//           id="totalPaxVisaGroup"
//           className="input-element"
//           placeholder="TotalPax"
//           {...register("totalPaxVisaGroup", {
//             required: "Total Pax is required",
//             pattern: {
//               value: /^[0-9]+$/,
//               message: "Enter a valid number",
//             },
//           })}
//         />
//         {errors.totalPaxVisaGroup && (
//           <span className="errorMsg">{errors.totalPaxVisaGroup.message}</span>
//         )}
//       </div>
//       {fields.map((field, index) => (
//         <Row key={field.id} className="row__container">
//           <Col md={2}>
//             <div className="input__container">
//               <label htmlFor={`totlaPaxGit${index}`}>
//                 No of Pax <span className="required_field">*</span>
//               </label>
//               <input
//                 type="text"
//                 id={`totlaPaxGit${index}`}
//                 className="input-element"
//                 placeholder="Number of Pax"
//                 {...register(`rows.${index}.totlaPaxGit`, {
//                   required: "Total No of Pax is required",
//                   pattern: {
//                     value: /^[0-9]+$/,
//                     message: "Enter a valid number",
//                   },
//                 })}
//               />
//               {errors?.rows?.[index]?.totlaPaxGit && (
//                 <span className="errorMsg">
//                   {errors.rows[index].totlaPaxGit.message}
//                 </span>
//               )}
//             </div>
//           </Col>
//           <Col md={1} className="d-flex align-items-end">
//             <Button
//               type="button"
//               className="btn btn-danger"
//               size="sm"
//               onClick={() => remove(index)}>
//               Remove
//             </Button>
//           </Col>
//         </Row>
//       ))}
//       {errors.totalSum && (
//         <span className="errorMsg">{errors.totalSum.message}</span>
//       )}
//       <Row md={1}>
//         <Button
//           className="mt-4"
//           size="sm"
//           onClick={() => append({ totlaPaxGit: "", Remarks: "" })}>
//           Add City Section
//         </Button>
//       </Row>
//     </Row>
//   );
// };

// export default Hello;

// import { useForm } from "react-hook-form";
// import { useState, useEffect } from "react";
// import { Row, Col } from "react-bootstrap";
// import Button from "react-bootstrap/Button";

// const Hello = () => {
//   const {
//     register,
//     handleSubmit,
//     setError,
//     clearErrors,
//     watch,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       totalPaxVisaGroup: "",
//       rows: [{ totlaPaxGit: "", Remarks: "" }],
//     },
//   });

//   const [rows, setRows] = useState([{ totlaPaxGit: "", Remarks: "" }]);

//   const totalPaxVisaGroup = watch("totalPaxVisaGroup");
//   const watchedRows = watch("rows", rows);

//   const addRow = () => {
//     setRows([...rows, { totlaPaxGit: "", Remarks: "" }]);
//   };

//   const removeRow = (index) => {
//     const newRows = rows.filter((_, i) => i !== index);
//     setRows(newRows);
//   };

//   useEffect(() => {
//     const totalPax = parseInt(totalPaxVisaGroup) || 0;
//     let sumPax = 0;

//     watchedRows.forEach((row, index) => {
//       const paxValue = parseInt(row.totlaPaxGit) || 0;
//       sumPax += paxValue;

//       if (paxValue > totalPax) {
//         setError(`rows.${index}.totlaPaxGit`, {
//           type: "manual",
//           message: "Pax value exceeds total Pax",
//         });
//       } else {
//         clearErrors(`rows.${index}.totlaPaxGit`);
//       }
//     });

//     if (sumPax > totalPax) {
//       setError("totalSum", {
//         type: "manual",
//         message: "Total Pax sum exceeds total Pax",
//       });
//     } else {
//       clearErrors("totalSum");
//     }
//   }, [totalPaxVisaGroup, watchedRows, setError, clearErrors]);

//   return (
//     <form onSubmit={handleSubmit((data) => console.log(data))}>
//       <Row>
//         <div className="input__container">
//           <label htmlFor="totalPaxVisaGroup">
//             Total Pax. <span className="required_field">*</span>
//           </label>
//           <input
//             type="text"
//             id="totalPaxVisaGroup"
//             className="input-element"
//             placeholder="TotalPax"
//             {...register("totalPaxVisaGroup", {
//               required: "Total Pax is required",
//               pattern: {
//                 value: /^[0-9]+$/,
//                 message: "Enter a valid number",
//               },
//             })}
//           />
//           {errors.totalPaxVisaGroup && (
//             <span className="errorMsg">{errors.totalPaxVisaGroup.message}</span>
//           )}
//         </div>
//         {rows.map((row, index) => (
//           <Row key={index} className="row__container">
//             <Col md={2}>
//               <div className="input__container">
//                 <label htmlFor={`totlaPaxGit${index}`}>
//                   No of Pax <span className="required_field">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   id={`totlaPaxGit${index}`}
//                   className="input-element"
//                   placeholder="Number of Pax"
//                   {...register(`rows.${index}.totlaPaxGit`, {
//                     required: "Total No of Pax is required",
//                     pattern: {
//                       value: /^[0-9]+$/,
//                       message: "Enter a valid number",
//                     },
//                   })}
//                 />
//                 {errors?.rows?.[index]?.totlaPaxGit && (
//                   <span className="errorMsg">
//                     {errors.rows[index].totlaPaxGit.message}
//                   </span>
//                 )}
//               </div>
//             </Col>
//             <Col md={2}>
//               <div className="input__container">
//                 <label htmlFor={`remarks${index}`}>Remarks</label>
//                 <input
//                   type="text"
//                   id={`remarks${index}`}
//                   className="input-element"
//                   placeholder="Remarks"
//                   {...register(`rows.${index}.Remarks`)}
//                 />
//               </div>
//             </Col>
//             <Col md={1} className="d-flex align-items-end">
//               <Button
//                 type="button"
//                 className="btn btn-danger"
//                 size="sm"
//                 onClick={() => removeRow(index)}>
//                 Remove
//               </Button>
//             </Col>
//           </Row>
//         ))}
//         {errors.totalSum && (
//           <span className="errorMsg">{errors.totalSum.message}</span>
//         )}
//         <Row md={1}>
//           <Button className="mt-4" size="sm" onClick={addRow}>
//             Add City Section
//           </Button>
//         </Row>
//         <Button type="submit" className="mt-4" size="sm">
//           Submit
//         </Button>
//       </Row>
//     </form>
//   );
// };

// export default Hello;

// Two use field arr

import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Select from "react-select";

const Hello = () => {
  const {
    register,
    handleSubmit,
    control,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      totalPaxVisaGroup: "",
      rows: [
        { visaApplyFrom: "", totlaPaxGit: "", gitVisaDays: "", Remarks: "" },
      ],
      products: [{ productName: "" }],
    },
  });

  const {
    fields: rowFields,
    append: appendRow,
    remove: removeRow,
  } = useFieldArray({
    control,
    name: "rows",
  });

  const {
    fields: productFields,
    append: appendProduct,
    remove: removeProduct,
  } = useFieldArray({
    control,
    name: "products",
  });

  const nationalCity = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Kolkata",
    "Chennai",
    "Hyderabad",
    "Ahmedabad",
    "Pune",
    "Surat",
    "Jaipur",
  ];

  const optionGitVisaCity = nationalCity.map((city) => ({
    value: city.toLowerCase().replace(/ /g, "-"),
    label: city,
  }));

  const optionCityTravel = nationalCity.map((city) => ({
    value: city.toLowerCase().replace(/ /g, "-"),
    label: city,
  }));

  const totalPaxVisaGroup = watch("totalPaxVisaGroup");
  const rows = watch("rows");

  useEffect(() => {
    const totalPax = parseInt(totalPaxVisaGroup) || 0;
    let sumPax = 0;

    rows.forEach((row, index) => {
      const paxValue = parseInt(row.totlaPaxGit) || 0;
      sumPax += paxValue;

      if (paxValue > totalPax) {
        setError(`rows.${index}.totlaPaxGit`, {
          type: "manual",
          message: "Pax value exceeds total Pax",
        });
      } else {
        clearErrors(`rows.${index}.totlaPaxGit`);
      }
    });

    if (sumPax > totalPax) {
      setError("totalSum", {
        type: "manual",
        message: "Total Pax sum exceeds total Pax",
      });
    } else {
      clearErrors("totalSum");
    }
  }, [totalPaxVisaGroup, rows, setError, clearErrors]);

  return (
    <Row>
      <div className="input__container">
        <label htmlFor="totalPaxVisaGroup">
          Total Pax. <span className="required_field">*</span>
        </label>
        <input
          type="text"
          id="totalPaxVisaGroup"
          className="input-element"
          placeholder="TotalPax"
          {...register("totalPaxVisaGroup", {
            required: "Total Pax is required",
            pattern: {
              value: /^[0-9]+$/,
              message: "Enter a valid number",
            },
          })}
        />
        {errors.totalPaxVisaGroup && (
          <span className="errorMsg">{errors.totalPaxVisaGroup.message}</span>
        )}
      </div>

      {rowFields.map((field, index) => (
        <Row key={field.id} className="row__container">
          <Col md={2}>
            <div className="input__container">
              <label htmlFor={`totlaPaxGit${index}`}>
                No of Pax <span className="required_field">*</span>
              </label>
              <input
                type="text"
                id={`totlaPaxGit${index}`}
                className="input-element"
                placeholder="Number of Pax"
                {...register(`rows.${index}.totlaPaxGit`, {
                  required: "Total No of Pax is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Enter a valid number",
                  },
                })}
              />
              {errors?.rows?.[index]?.totlaPaxGit && (
                <span className="errorMsg">
                  {errors.rows[index].totlaPaxGit.message}
                </span>
              )}
            </div>
          </Col>

          <Col md={1} className="d-flex align-items-end">
            <Button
              type="button"
              className="btn btn-danger"
              size="sm"
              onClick={() => removeRow(index)}>
              Remove
            </Button>
          </Col>
        </Row>
      ))}

      {errors.totalSum && (
        <span className="errorMsg">{errors.totalSum.message}</span>
      )}

      <Row md={1}>
        <Button
          className="mt-4"
          size="sm"
          onClick={() => appendRow({ totlaPaxGit: "", Remarks: "" })}>
          Add City Section
        </Button>
      </Row>

      {productFields.map((field, index) => (
        <Row key={field.id} className="row__container">
          <Col md={3}>
            <div className="input__container">
              <label htmlFor={`productName${index}`}>
                Product Name <span className="required_field">*</span>
              </label>
              <input
                type="text"
                id={`productName${index}`}
                className="input-element"
                placeholder="Product Name"
                {...register(`products.${index}.productName`, {
                  required: "Product Name is required",
                })}
              />
              {errors?.products?.[index]?.productName && (
                <span className="errorMsg">
                  {errors.products[index].productName.message}
                </span>
              )}
            </div>
          </Col>
          <Col md={1} className="d-flex align-items-end">
            <Button
              type="button"
              className="btn btn-danger"
              size="sm"
              onClick={() => removeProduct(index)}>
              Remove
            </Button>
          </Col>
        </Row>
      ))}

      <Row md={1}>
        <Button
          className="mt-4"
          size="sm"
          onClick={() => appendProduct({ productName: "" })}>
          Add Product
        </Button>
      </Row>
    </Row>
  );
};

export default Hello;
