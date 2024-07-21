import { Row, Col, Container } from "react-bootstrap";
import { useState } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";

const Iksdo = () => {
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

  const [rows, setRows] = useState([
    { gitCity: [], totlaPaxGit: "", Remarks: "" },
  ]);

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

  const addEntireRowFunction = () => {
    setRows([...rows, { gitCity: [], totlaPaxGit: "", Remarks: "" }]);
  };

  return (
    <div>
      {rows.map((row, index) => (
        <Row key={index} className="row__container">
          <Col md={4}>
            <div className="input__container">
              <label htmlFor={`visaApplyFrom${index}`}>Apply From</label>
              <Controller
                name={`visaApplyFrom${index}`}
                control={control}
                rules={{ required: "City is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={optionVisaCity}
                    isMulti
                    onChange={(selected) => {
                      field.onChange(selected);
                      const newRows = [...rows];
                      newRows[index].gitCity = selected;
                      setRows(newRows);
                      if (selected) {
                        clearErrors(`visaApplyFrom${index}`);
                      }
                    }}
                    value={row.gitCity}
                  />
                )}
              />
              {errors[`visaApplyFrom${index}`] && (
                <span className="errorMsg">
                  {errors[`visaApplyFrom${index}`].message}
                </span>
              )}
            </div>
          </Col>

          <Col md={4}>
            <div className="input__container">
              <label htmlFor={`totlaPaxGit${index}`}>
                No of Pax <span className="required_field">*</span>
              </label>
              <input
                type="text"
                id={`totlaPaxGit${index}`}
                className="input-element"
                placeholder="Number of Pax"
                name={`totlaPaxGit${index}`}
                {...register(`totlaPaxGit${index}`, {
                  required: "Total No of Pax",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Enter Valid no",
                  },
                })}
              />
              {errors[`totlaPaxGit${index}`] && (
                <span className="errorMsg">
                  {errors[`totlaPaxGit${index}`].message}
                </span>
              )}
            </div>
          </Col>

          <Col md={4}>
            <div className="input__container">
              <label htmlFor={`Remarks${index}`}>
                Remarks <span className="required_field">*</span>
              </label>
              <input
                type="text"
                id={`Remarks${index}`}
                className="input-element"
                placeholder="Remarks"
                name={`Remarks${index}`}
                {...register(`Remarks${index}`, {
                  required: "Enter your remarks here",
                })}
              />
              {errors[`Remarks${index}`] && (
                <span className="errorMsg">
                  {errors[`Remarks${index}`].message}
                </span>
              )}
            </div>
          </Col>
        </Row>
      ))}
      <button onClick={addEntireRowFunction}>Add Row</button>
    </div>
  );
};

export default Iksdo;
