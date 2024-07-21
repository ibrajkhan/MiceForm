import { Row, Col, Container } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";

const Isdo = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
    watch,
    reset,
  } = useForm({
    defaultValues: {},
  });

  const watchAllFields = watch();

  const [gitCity, setGitCity] = useState([]);

  const nationalCity = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Kolkata",
    "Chennai",
    "Hyderabad",
    "Ahmedabad",
  ];

  const optionVisaCity = nationalCity.map((city) => ({
    value: city.toLowerCase().replace(/ /g, "-"),
    label: city,
  }));

  const addEntireRowFunction = () => {};

  return (
    <div>
      <Row className="row__container ">
        <Col md={4}>
          <div className="input__container">
            <label htmlFor="visaApplyFrom">Apply From</label>
            <Controller
              name="visaApplyFrom"
              control={control}
              rules={{ required: "City is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={optionVisaCity}
                  isMulti
                  onChange={(selected) => {
                    field.onChange(selected);
                    setGitCity(selected);
                    if (selected) {
                      clearErrors("visaApplyFrom");
                    }
                  }}
                  value={gitCity}
                />
              )}
            />
            {errors.visaApplyFrom && (
              <span className="errorMsg">{errors.visaApplyFrom.message}</span>
            )}
          </div>
        </Col>

        <Col md={4}>
          <div className="input__container">
            <label htmlFor="totlaPaxGit">
              No of Pax <span className="required_field">*</span>
            </label>
            <input
              type="text"
              id="totlaPaxGit"
              className="input-element"
              placeholder="Number of Pax"
              name="totlaPaxGit"
              {...register("totlaPaxGit", {
                required: "Total No of Pax",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Enter Valid no",
                },
              })}
            />
            {errors.totlaPaxGit && (
              <span className="errorMsg">{errors.totlaPaxGit.message}</span>
            )}
          </div>
        </Col>

        <Col md={4}>
          <div className="input__container">
            <label htmlFor="familyName">
              Remarks <span className="required_field">*</span>
            </label>
            <input
              type="text"
              id="Remarks"
              className="input-element"
              placeholder="Remarks"
              name="Remarks"
              {...register("Remarks", {
                required: "Enter your remarks here",
              })}
            />
            {errors.Remarks && (
              <span className="errorMsg">{errors.Remarks.message}</span>
            )}
          </div>
        </Col>
      </Row>
      <button onClick={addEntireRowFunction}>Add Column</button>
    </div>
  );
};

export default Isdo;
