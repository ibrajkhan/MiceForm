import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Date() {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startDate: null,
      endDate: null,
      totalDays: 0,
    },
  });

  const watchAllFields = watch();
  const [dateError, setDateError] = useState("");

  const calculateDateDifference = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const timeDifference = endDate.getTime() - startDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return Math.floor(daysDifference) + 1; // Add 1 to include both start and end date
  };

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  useEffect(() => {
    const totalDays = calculateDateDifference(startDate, endDate);
    if (startDate && endDate && startDate > endDate) {
      setDateError("Start date cannot be greater than end date");
    } else {
      setDateError("");
      setValue("totalDays", totalDays);
    }
  }, [startDate, endDate, setValue]);

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      startDate: data.startDate
        ? data.startDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : null,
      endDate: data.endDate
        ? data.endDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : null,
    };
    console.log(formattedData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="startDate">Start Date</label>
        <br />
        <Controller
          id="startDate"
          name="startDate"
          control={control}
          rules={{ required: "Start Date is required" }}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              startDate={watchAllFields.startDate}
              dateFormat="d MMMM, yyyy"
              placeholderText="Select Start Date"
              onChange={(date) => field.onChange(date)}
            />
          )}
        />
        <br />
        {!watchAllFields.startDate && errors.startDate && (
          <span style={{ color: "red" }}>{errors.startDate.message}</span>
        )}
      </div>
      <div>
        <label>End Date</label>
        <br />
        <Controller
          name="endDate"
          control={control}
          rules={{
            required: "End Date is required",
            validate: (value) =>
              (value && value >= startDate) ||
              "End date must be after start date",
          }}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              placeholderText="Select End Date"
              dateFormat="d MMMM, yyyy"
              onChange={(date) => field.onChange(date)}
              minDate={watch("startDate")}
            />
          )}
        />
        <br />
        {!watchAllFields.endDate && errors.endDate && (
          <span style={{ color: "red" }}>{errors.endDate.message}</span>
        )}
      </div>

      <div>
        <label>Total Days</label>
        <br />
        <Controller
          name="totalDays"
          control={control}
          render={({ field }) => <input {...field} readOnly />}
        />
        {dateError && <span style={{ color: "red" }}>{dateError}</span>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default Date;
// {fieldDepartureCity.map((field, index) => (
//   <Row key={field.id} className="row__container">
//     <Col md={3}>
//       <div className="input__container">
//         <label
//           htmlFor={`TravelRow[${index}].departureCityTravel`}>
//           Departure City
//         </label>
//         <Controller
//           name={`TravelRow[${index}].departureCityTravel`}
//           control={control}
//           rules={{ required: "City is required" }}
//           render={({ field }) => (
//             <Select
//               {...field}
//               options={optionCityTravel}
//               isMulti
//               onChange={(selected) => {
//                 field.onChange(selected);
//                 handelChangeVisaFit(
//                   index,
//                   selected,
//                   "departureCityTravel"
//                 );
//                 if (selected) {
//                   clearErrors(`departureCityTravel${index}`);
//                 }
//               }}
//               value={departureCityTravel[index] || []}
//             />
//           )}
//         />
//         {errors.TravelRow?.[index]?.departureCityTravel && (
//           <span className="errorMsg">
//             {
//               errors.TravelRow[index].departureCityTravel
//                 .message
//             }
//           </span>
//         )}
//       </div>
//     </Col>
//     <Col md={3}>
//       <div className="input__container">
//         <label htmlFor={`TravelRow[${index}].cityPaxTravel`}>
//           No of Pax <span className="required_field">*</span>
//         </label>
//         <input
//           type="text"
//           id={`TravelRow[${index}].cityPaxTravel`}
//           className="input-element"
//           placeholder="Number of Pax"
//           {...register(`TravelRow[${index}].cityPaxTravel`, {
//             required: "Total No of Pax is required",
//             pattern: {
//               value: /^[0-9]+$/,
//               message: "Enter a valid number",
//             },
//           })}
//         />
//         {errors?.TravelRow?.[index]?.cityPaxTravel && (
//           <span className="errorMsg">
//             {errors.TravelRow[index].cityPaxTravel.message}
//           </span>
//         )}

//         {errors.totalSumTravel && (
//           <span className="errorMsg">
//             {errors.totalSumTravel.message}
//           </span>
//         )}
//       </div>
//     </Col>
//     <Col md={3}>
//       <div className="input__container">
//         <label htmlFor={`TravelRow[${index}].travelClass`}>
//           Class of Travel
//           <span className="required_field">*</span>
//         </label>
//         <Controller
//           name={`TravelRow[${index}].travelClass`}
//           control={control}
//           rules={{ required: "Travel Class required" }}
//           render={({ field }) => (
//             <Select
//               {...field}
//               options={classTravel}
//               onChange={(selected) => {
//                 field.onChange(selected);
//                 handelChangeVisaFit(
//                   index,
//                   selected,
//                   "travelClass"
//                 );
//                 if (selected) {
//                   clearErrors(`travelClass${index}`);
//                 }
//               }}
//               value={travelClass[index] || []}
//             />
//           )}
//         />
//         {errors.TravelRow?.[index]?.travelClass && (
//           <span className="errorMsg">
//             {errors.TravelRow[index].travelClass.message}
//           </span>
//         )}
//       </div>
//     </Col>
//     <Col md={2}>
//       <div className="input__container">
//         <label
//           htmlFor={`TravelRow[${index}].departureTimeTravel`}>
//           Preferred Dep Time
//           <span className="required_field">*</span>
//         </label>
//         <input
//           type="time"
//           id={`TravelRow[${index}].departureTimeTravel`}
//           className="input-element"
//           placeholder="Enter Time"
//           name={`TravelRow[${index}].departureTimeTravel`}
//           {...register(
//             `TravelRow[${index}].departureTimeTravel`,
//             {
//               required: "Enter your Departue Time",
//             }
//           )}
//         />
//         {errors.TravelRow?.[index].departureTimeTravel && (
//           <span className="errorMsg">
//             {
//               errors.TravelRow[index].departureTimeTravel
//                 .message
//             }
//           </span>
//         )}
//       </div>
//     </Col>
//     <Col md={1} className="d-flex align-items-end">
//       <Button
//         type="button"
//         className="btn btn-danger"
//         size="sm"
//         onClick={() => removeTravelRow(index)}>
//         Remove
//       </Button>
//     </Col>
//   </Row>
// ))}

// <Button
//   className="mt-4"
//   size="sm"
//   onClick={() =>
//     appendTravelRow({
//       departureCityTravel: null,
//       cityPaxTravel: null,
//       travelClass: null,
//       departureTimeTravel: null,
//     })
//   }>
//   Add City Section
// </Button>
// <br />

// <Row className="row__container">
//   <Col md={3} xs={6}>
//     <div className="input__container">
//       <a
//         target="_blank"
//         href="https://drive.google.com/drive/folders/18KdD9h_uh0U-_zRTKyl_rqurB8upWBgF?usp=sharing">
//         <Button size="sm" variant="success">
//           Upload Passport
//         </Button>
//       </a>
//     </div>
//   </Col>
