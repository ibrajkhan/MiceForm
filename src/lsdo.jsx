import { useState } from "react";
import Select, { components } from "react-select";

const Isdo = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const cities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Kolkata",
    "Chennai",
    "Hyderabad",
    "Ahmedabad",
    "Pune",
    "Davanagere",
    "Kozhikode",
    "Akola",
    "Kurnool",
    "Bokaro Steel City",
    "Rajahmundry",
    "Ballari",
    "Agartala",
  ];

  const numbers = Array.from({ length: 1000 }, (_, i) => (i + 1).toString());

  const createOptions = () => {
    const cityOptions = cities.map((city) => ({
      value: city.toLowerCase().replace(/ /g, "-"),
      label: city,
    }));
    const numberOptions = numbers.map((number) => ({
      value: number,
      label: number,
    }));
    return [...cityOptions, ...numberOptions];
  };

  const departureCity = createOptions();

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  const customComponents = {
    MultiValue: ({ data }) => (
      <div>
        {data.map((option, index) => (
          <span key={index} className="multi-value">
            {option.label}
          </span>
        ))}
      </div>
    ),
    Option: ({ children, ...props }) => (
      <components.Option {...props}>
        {children} <span style={{ marginLeft: "10px" }}>+</span>
      </components.Option>
    ),
  };

  return (
    <div>
      <div className="input__container">
        <label htmlFor="departureCity">
          Departure City
          <span className="required_field">*</span>
        </label>
        <Select
          isMulti
          options={departureCity}
          value={selectedOptions}
          onChange={handleChange}
          components={customComponents}
        />
      </div>
    </div>
  );
};

export default Isdo;
