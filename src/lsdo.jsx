import React from "react";
import { useForm } from "react-hook-form";

function AreaConverter() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm({ mode: "all" }); // Set mode to 'all' for two-way binding

  const squareFeet = watch("squareFeet", ""); // Get the value of 'squareFeet' field (empty string default)
  const squareMeters = watch("squareMeters", ""); // Get the value of 'squareMeters' field (empty string default)

  const handleSquareFeetChange = (event) => {
    const value = event.target.value;
    register("squareMeters").setValue(value ? value * 0.09290304 : ""); // Update squareMeters on change
  };

  const handleSquareMetersChange = (event) => {
    const value = event.target.value;
    register("squareFeet").setValue(value ? value * 10.76391 : ""); // Update squareFeet on change
  };

  return (
    <form>
      <label htmlFor="squareFeet">Area (Sq. Ft.):</label>
      <input
        type="number"
        id="squareFeet"
        {...register("squareFeet")}
        onChange={handleSquareFeetChange}
      />
      {errors.squareFeet && <p>{errors.squareFeet.message}</p>}

      <label htmlFor="squareMeters">Area (Sq. M.):</label>
      <input
        type="number"
        id="squareMeters"
        {...register("squareMeters")}
        onChange={handleSquareMetersChange}
      />
      {errors.squareMeters && <p>{errors.squareMeters.message}</p>}
    </form>
  );
}

export default AreaConverter;
