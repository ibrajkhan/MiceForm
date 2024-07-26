import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Select from "react-select";

const III = () => {
  const [visaCountryGroup, setVisaCountryGroup] = useState([]);
  const [visaApplyFrom, setVisaApplyFrom] = useState([]);

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

  const handelChangeVisaFit = (index, selected, type) => {
    if (type === "visaApplyFrom") {
      const updatedCities = [...visaApplyFrom];
      updatedCities[index] = selected;
      setVisaApplyFrom(updatedCities);
    }
  };

  const visaGroupCountrys = nationalCity.map((city) => ({
    value: city.toLowerCase().replace(/ /g, "-"),
    label: city,
  }));

  const optionGitVisaCity = nationalCity.map((city) => ({
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
      <>
        <Row className="row__container">
          <p className="services">Visa Requirements</p>

          <Col md={4}>
            <div className="input__container">
              <label htmlFor="totalPaxVisaGroup">
                Total Pax. <span className="required_field">*</span>
              </label>
              <input
                type="text"
                id="totalPaxVisaGroup"
                className="input-element"
                placeholder="Number of Pax"
                name="totalPaxVisaGroup"
                {...register("totalPaxVisaGroup", {
                  required: "Total No of Pax",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Enter Valid no",
                  },
                })}
              />
              {errors.totalPaxVisaGroup && (
                <span className="errorMsg">
                  {errors.totalPaxVisaGroup.message}
                </span>
              )}
            </div>
          </Col>
          <Col md={4}>
            <div className="input__container">
              <label htmlFor="visaCountryGroup">
                Country's / VISA Required
                <span className="required_field">*</span>
              </label>
              <Controller
                name="visaCountryGroup"
                control={control}
                rules={{ required: "Select from list" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={visaGroupCountrys}
                    isMulti
                    onChange={(selected) => {
                      field.onChange(selected);
                      setVisaCountryGroup(selected);
                      if (selected) {
                        clearErrors("visaCountryGroup");
                      }
                    }}
                    value={visaCountryGroup}
                  />
                )}
              />
              {errors.visaCountryGroup && (
                <span className="errorMsg">
                  {errors.visaCountryGroup.message}
                </span>
              )}
            </div>
          </Col>

          <Col md={4}>
            <div className="input__container">
              <label htmlFor="visaPreferredDurationGroup">
                Preferred duration <span className="required_field">*</span>
              </label>
              <select
                id="visaPreferredDurationGroup"
                name="visaPreferredDurationGroup"
                className="input-element"
                {...register("visaPreferredDurationGroup", {
                  required: "Select from list",
                })}>
                <option value="">--Select--</option>
                <option value="6Months"> 6 months</option>
                <option value="2Yrs">2 Yrs.</option>
                <option value="5Yrs"> 5 Yrs.</option>
                <option value="10Yrs">10 Yrs</option>
                <option value="Multiple">Multiple</option>
                <option value="Groups">Groups</option>
                <option value="TransitVisa">Transit Visa</option>
                <option value="Other">Other</option>
              </select>
              {errors.visaPreferredDurationGroup && (
                <span className="errorMsg">
                  {errors.visaPreferredDurationGroup.message}
                </span>
              )}
            </div>
          </Col>
        </Row>

        {rowFields.map((field, index) => (
          <Row key={field.id} className="row__container">
            <Col md={3}>
              <div className="input__container">
                <label htmlFor={`visaApplyFrom${index}`}>Visa Apply From</label>
                <Controller
                  name={`rows.${index}.visaApplyFrom`}
                  control={control}
                  rules={{ required: "City is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={optionGitVisaCity}
                      onChange={(selected) => {
                        field.onChange(selected);
                        handelChangeVisaFit(index, selected, "visaApplyFrom");
                        if (selected) {
                          clearErrors(`rows.${index}.visaApplyFrom`);
                        }
                      }}
                      value={visaApplyFrom[index] || []}
                    />
                  )}
                />
                {errors?.rows?.[index]?.visaApplyFrom && (
                  <span className="errorMsg">
                    {errors.rows[index].visaApplyFrom.message}
                  </span>
                )}
              </div>
            </Col>

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
                {errors.totalSum && (
                  <span className="errorMsg">{errors.totalSum.message}</span>
                )}
              </div>
            </Col>

            <Col md={2}>
              <div className="input__container">
                <label htmlFor={`gitVisaDays${index}`}>
                  Total Days
                  <span className="required_field">*</span>
                </label>
                <input
                  type="text"
                  id={`gitVisaDays${index}`}
                  className="input-element"
                  placeholder="Number of Days"
                  {...register(`rows.${index}.gitVisaDays`, {
                    required: "No of Days",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Enter Valid no",
                    },
                  })}
                />
                {errors?.rows?.[index]?.gitVisaDays && (
                  <span className="errorMsg">
                    {errors.rows[index].gitVisaDays.message}
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
                  {...register(`rows.${index}.Remarks`, {
                    required: "Enter your remarks here",
                  })}
                />
                {errors?.rows?.[index]?.Remarks && (
                  <span className="errorMsg">
                    {errors.rows[index].Remarks.message}
                  </span>
                )}
              </div>
            </Col>

            <Col md={1}>
              <Button
                type="button"
                className="btn btn-danger mt-4"
                size="sm"
                onClick={() => removeRow(index)}>
                Remove
              </Button>
            </Col>
          </Row>
        ))}

        <Button
          className="mt-4"
          size="sm"
          onClick={() =>
            appendRow({
              visaApplyFrom: "",
              totlaPaxGit: "",
              gitVisaDays: "",
              Remarks: "",
            })
          }>
          Add City Section
        </Button>

        <Row className="row__container mt-5">
          <a
            className="sheetLink"
            target="_blank"
            href="https://docs.google.com/spreadsheets/d/1xb9b8m9jvvvmqN2tqjdBe-eGuuiO26vgV6IhqLmFnHk/edit?usp=sharing">
            <Button size="sm" variant="danger">
              Insert your data here
            </Button>
          </a>
        </Row>
      </>
    </Row>
  );
};

export default III;
