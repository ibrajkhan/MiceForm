import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateComponent() {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      setUpDate: null,
      conferenceStartDate: null,
      conferenceEndDate: null,
    },
  });

  const watchAllFields = watch();
  const [dateErrorConference, setDateErrorConference] = useState("");

  const setUpDate = watch("setUpDate");
  const conferenceStartDate = watch("conferenceStartDate");
  const conferenceEndDate = watch("conferenceEndDate");

  useEffect(() => {
    if (setUpDate && conferenceStartDate && setUpDate >= conferenceStartDate) {
      setDateErrorConference("Setup date must be before start date");
    } else if (
      conferenceStartDate &&
      conferenceEndDate &&
      conferenceStartDate >= conferenceEndDate
    ) {
      setDateErrorConference("Start date must be before end date");
    } else {
      setDateErrorConference("");
    }
  }, [setUpDate, conferenceStartDate, conferenceEndDate]);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input__container">
        <label htmlFor="setUpDate">Setup Date</label>
        <br />
        <Controller
          id="setUpDate"
          name="setUpDate"
          control={control}
          rules={{ required: "Setup Date is required" }}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              dateFormat="d MMMM, yyyy"
              placeholderText="Select Setup Date"
              onChange={(date) => field.onChange(date)}
            />
          )}
        />
        <br />
        {!watchAllFields.setUpDate && errors.setUpDate && (
          <span style={{ color: "red" }}>{errors.setUpDate.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="conferenceStartDate">Start Date</label>
        <br />
        <Controller
          id="conferenceStartDate"
          name="conferenceStartDate"
          control={control}
          rules={{
            required: "Start Date is required",
            validate: (value) =>
              (value && (!setUpDate || value > setUpDate)) ||
              "Start date must be after setup date",
          }}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              conferenceStartDate={setUpDate}
              dateFormat="d MMMM, yyyy"
              placeholderText="Select Start Date"
              onChange={(date) => field.onChange(date)}
              minDate={setUpDate}
            />
          )}
        />
        <br />
        {!watchAllFields.conferenceStartDate && errors.conferenceStartDate && (
          <span style={{ color: "red" }}>
            {errors.conferenceStartDate.message}
          </span>
        )}
      </div>
      <div>
        <label>End Date</label>
        <br />
        <Controller
          name="conferenceEndDate"
          control={control}
          rules={{
            required: "End Date is required",
            validate: (value) =>
              (value &&
                (!conferenceStartDate || value > conferenceStartDate)) ||
              "End date must be after start date",
          }}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              placeholderText="Select End Date"
              dateFormat="d MMMM, yyyy"
              onChange={(date) => field.onChange(date)}
              minDate={conferenceStartDate}
            />
          )}
        />
        <br />
        {!watchAllFields.conferenceEndDate && errors.conferenceEndDate && (
          <span style={{ color: "red" }}>
            {errors.conferenceEndDate.message}
          </span>
        )}
      </div>

      {dateErrorConference && (
        <span style={{ color: "red" }}>{dateErrorConference}</span>
      )}
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default DateComponent;
