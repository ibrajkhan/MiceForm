import { useForm, Controller } from "react-hook-form";
import { useRef, useState, useEffect } from "react";
import "./App.css";
import Select from "react-select";
import { CountrySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";

const Isdo = () => {
  const [countryList, setCountryList] = useState([0]);
  const [countryIdMap, setCountryIdMap] = useState({});
  const [statesMap, setStatesMap] = useState({});

  const { control, setValue, watch } = useForm({
    defaultValues: {},
  });

  const watchAllFields = watch();

  const addDestination = () => {
    setCountryList((prev) => [...prev, prev.length]);
  };

  const handleCountryChange = async (index, country) => {
    setCountryIdMap((prev) => ({ ...prev, [index]: country.id }));
    setValue(`state-${index}`, []); // Reset state field

    // Fetch states based on selected country
    try {
      const response = await axios.post(
        `https://countriesnow.space/api/v0.1/countries/states`,
        {
          country: country.name,
        }
      );
      const statesData = response.data.data.states.map((state) => ({
        value: state.name,
        label: state.name,
      }));
      setStatesMap((prev) => ({ ...prev, [index]: statesData }));
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  return (
    <div>
      {countryList.map((item, index) => (
        <Row className="row__container" key={index}>
          <Col md={6}>
            <div className="input__container">
              <label>
                Country <span className="required_field">*</span>
              </label>
              <Controller
                name={`country-${index}`}
                control={control}
                render={({ field }) => (
                  <CountrySelect
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleCountryChange(index, e);
                    }}
                    placeHolder="Select Country"
                  />
                )}
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="input__container">
              <label>State</label>
              <Controller
                name={`state-${index}`}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={statesMap[index]}
                    isMulti
                    onChange={(selectedOptions) => {
                      field.onChange(selectedOptions);
                    }}
                    placeholder="Select State"
                  />
                )}
              />
            </div>
          </Col>
        </Row>
      ))}
      <Row>
        <Col xs={4}>
          <Button
            variant="primary"
            className="mt-3"
            size="sm"
            onClick={addDestination}>
            Add Country
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Isdo;
