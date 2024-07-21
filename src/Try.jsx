import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Form, Row, Col, Button } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";

const Try = () => {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      countries: [{ country: null, cities: [] }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "countries",
  });
  const [countriesData, setCountriesData] = useState([]);
  const [citiesData, setCitiesData] = useState({});

  // Fetch countries data on component mount
  React.useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://countriesnow.space/api/v0.1/countries/iso"
        );
        const countries = response.data.data.map((country) => ({
          value: country.iso2,
          label: country.name,
        }));
        setCountriesData(countries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const handleCountryChange = async (index, selectedCountry) => {
    setValue(`countries[${index}].country`, selectedCountry);
    setValue(`countries[${index}].cities`, []); // Reset city field

    // Fetch cities based on selected country
    try {
      const response = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/cities",
        { country: selectedCountry.label }
      );
      const cities = response.data.data.map((city) => ({
        value: city,
        label: city,
      }));
      setCitiesData((prev) => ({ ...prev, [index]: cities }));
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((item, index) => (
        <Row key={item.id} className="mb-3">
          <Col>
            <Controller
              name={`countries[${index}].country`}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={countriesData}
                  onChange={(selectedCountry) =>
                    handleCountryChange(index, selectedCountry)
                  }
                />
              )}
            />
          </Col>
          <Col>
            <Controller
              name={`countries[${index}].cities`}
              control={control}
              render={({ field }) => (
                <Select {...field} options={citiesData[index] || []} isMulti />
              )}
            />
          </Col>
          <Col>
            <Button variant="danger" onClick={() => remove(index)}>
              Remove
            </Button>
          </Col>
        </Row>
      ))}
      <Button
        variant="primary"
        onClick={() => append({ country: null, cities: [] })}>
        Add Country
      </Button>
      <Button variant="success" type="submit" className="ms-2">
        Submit
      </Button>
    </Form>
  );
};

export default Try;
// import React, { useState, useEffect } from "react";
// import { useForm, Controller } from "react-hook-form";
// import Select from "react-select";
// import axios from "axios";

// const Try = () => {
//   const {
//     control,
//     handleSubmit,
//     setValue,
//     register,
//     formState: { errors },
//     watch,
//   } = useForm({
//     defaultValues: {
//       countries: [{ country: null, cities: [] }],
//       otherInput: "",
//     },
//   });
//   const [countriesData, setCountriesData] = useState([]);
//   const [citiesData, setCitiesData] = useState({});

//   // Watch countries array for changes
//   const countries = watch("countries");

//   // Fetch countries data on component mount
//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await axios.get(
//           "https://countriesnow.space/api/v0.1/countries/iso"
//         );
//         const countries = response.data.data.map((country) => ({
//           value: country.iso2,
//           label: country.name,
//         }));
//         setCountriesData(countries);
//       } catch (error) {
//         console.error("Error fetching countries:", error);
//       }
//     };
//     fetchCountries();
//   }, []);

//   const handleCountryChange = async (index, selectedCountry) => {
//     setValue(`countries[${index}].country`, selectedCountry);
//     setValue(`countries[${index}].cities`, []); // Reset city field

//     // Fetch cities based on selected country
//     try {
//       const response = await axios.post(
//         "https://countriesnow.space/api/v0.1/countries/cities",
//         { country: selectedCountry.label }
//       );
//       const cities = response.data.data.map((city) => ({
//         value: city,
//         label: city,
//       }));
//       setCitiesData((prev) => ({ ...prev, [index]: cities }));
//     } catch (error) {
//       console.error("Error fetching cities:", error);
//     }
//   };

//   const addCountry = () => {
//     setValue("countries", [...countries, { country: null, cities: [] }]);
//   };

//   const removeCountry = (index) => {
//     const newCountries = [...countries];
//     newCountries.splice(index, 1);
//     setValue("countries", newCountries);
//   };

//   const onSubmit = (data) => {
//     console.log(data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div>
//         <label>Other Input</label>
//         <input
//           {...register("otherInput", { required: "This field is required" })}
//         />
//         {errors.otherInput && <p>{errors.otherInput.message}</p>}
//       </div>

//       {countries.map((item, index) => (
//         <div key={index} style={{ display: "flex", marginBottom: "10px" }}>
//           <div style={{ flex: 1, marginRight: "10px" }}>
//             <Controller
//               name={`countries[${index}].country`}
//               control={control}
//               rules={{ required: "Country is required" }}
//               render={({ field }) => (
//                 <Select
//                   {...field}
//                   options={countriesData}
//                   onChange={(selectedCountry) =>
//                     handleCountryChange(index, selectedCountry)
//                   }
//                   placeholder="Select country"
//                 />
//               )}
//             />
//             {errors.countries?.[index]?.country && (
//               <p style={{ color: "red" }}>
//                 {errors.countries[index].country.message}
//               </p>
//             )}
//           </div>
//           <div style={{ flex: 1, marginRight: "10px" }}>
//             <Controller
//               name={`countries[${index}].cities`}
//               control={control}
//               rules={{ required: "At least one city is required" }}
//               render={({ field }) => (
//                 <Select
//                   {...field}
//                   options={citiesData[index] || []}
//                   isMulti
//                   placeholder="Select cities"
//                 />
//               )}
//             />
//             {errors.countries?.[index]?.cities && (
//               <p style={{ color: "red" }}>
//                 {errors.countries[index].cities.message}
//               </p>
//             )}
//           </div>
//           <button
//             type="button"
//             onClick={() => removeCountry(index)}
//             style={{ marginLeft: "10px" }}>
//             Remove
//           </button>
//         </div>
//       ))}
//       <button type="button" onClick={addCountry}>
//         Add Country
//       </button>
//       <button type="submit" style={{ marginLeft: "10px" }}>
//         Submit
//       </button>
//     </form>
//   );
// };

// export default Try;
