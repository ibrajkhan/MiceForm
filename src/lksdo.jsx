import { useForm, Controller } from "react-hook-form";
import { useRef, useState } from "react";
import Select from "react-select";
import { CountrySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const Isdo = () => {
  const [countries, setCountries] = useState([]); // Array to store countries

  const form = useRef();

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
    defaultValues: { countries: [] }, // Set default value for countries
  });

  const watchAllFields = watch();

  const handleAddCountry = () => {
    setCountries((prevCountries) => [
      ...prevCountries,
      { country: "", states: [] },
    ]);
  };

  const handleCountryChange = (selectedCountry, index) => {
    setCountries((prevCountries) => {
      const updatedCountries = [...prevCountries];
      updatedCountries[index].country = selectedCountry.value;
      return updatedCountries;
    });
  };

  const handleStateChange = (selectedState, index) => {
    setCountries((prevCountries) => {
      const updatedCountries = [...prevCountries];
      // Update states within the corresponding country object
      updatedCountries[index].states = selectedState || []; // Allow clearing states
      return updatedCountries;
    });
  };

  return (
    <Row className="row__container">
      {/* Country and State Selection for each country */}
      {countries.map((country, index) => (
        <Row key={index} className="row__container">
          <Col md={6}>
            <div className="input__container">
              <label>
                Country <span className="required_field">*</span>
              </label>
              <Controller
                name={`countries[${index}].country`}
                control={control}
                render={({ field }) => (
                  <CountrySelect
                    {...field}
                    required
                    onChange={(e) => handleCountryChange(e, index)}
                  />
                )}
              />
              {errors[`countries[${index}].country`] && (
                <span className="errorMsg">Select country from list</span>
              )}
            </div>
          </Col>
          <Col md={6}>
            <div className="input__container">
              <label>State(s)</label>
              <Controller
                name={`countries[${index}].states`}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    options={
                      country.country
                        ? StateSelect.getStates(country.country)
                        : []
                    } // Dynamic options based on selected country
                    onChange={(selectedState) =>
                      handleStateChange(selectedState, index)
                    }
                    placeholder="Select State(s)"
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
            id="country"
            className="mt-3"
            size="sm"
            onClick={handleAddCountry}>
            Add Country
          </Button>
        </Col>
      </Row>
    </Row>
  );
};

export default Isdo;
