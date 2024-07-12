import { useForm, Controller } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import headerImg from "./assets/Img/mice-logo.png";
import Select from "react-select";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import axios from "axios";
import { Row, Col, Container } from "react-bootstrap";
import ClassRoom from "./assets/Img/Classroom.jpg";
import Cocktail from "./assets/Img/Cocktails.png";

import Halfmoon from "./assets/Img/Halfmoon.jpg";

import Round from "./assets/Img/Round.jpg";

import Theater from "./assets/Img/Theater.jpg";

import UShaped from "./assets/Img/U-Shape.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Button from "react-bootstrap/Button";

const App = () => {
  const MySwal = withReactContent(Swal);
  const [loading, setLoading] = useState(false);
  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [selectedCity, setSelectedCity] = useState("");
  const [countryList, setCountryList] = useState([0]);
  const [countryIdMap, setCountryIdMap] = useState({});
  const [statesMap, setStatesMap] = useState({});
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [isSight, setSightClicked] = useState(false);
  const [isSeating, SetSeating] = useState(false);
  const [city, setCity] = useState([]);
  const [country, setCountry] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionDeparture, setSelectedDepartue] = useState(null);

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
    defaultValues: {},
  });

  const watchAllFields = watch();

  // const addDestination = (e) => {
  //   if (e.target.id === "city") {
  //     setCity(() => {
  //       return [...city, 1];
  //     });
  //   }
  //   e;
  // };

  //  For Country and city in select bos
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
  // end for contry and State in select box

  useEffect(() => {
    console.log("hello");
  }, [city, country]);

  const cities = [
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
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Thane",
    "Bhopal",
    "Visakhapatnam",
    "Pimpri-Chinchwad",
    "Patna",
    "Vadodara",
    "Ghaziabad",
    "Ludhiana",
    "Agra",
    "Nashik",
    "Faridabad",
    "Meerut",
    "Rajkot",
    "Kalyan-Dombivli",
    "Vasai-Virar",
    "Varanasi",
    "Srinagar",
    "Aurangabad",
    "Dhanbad",
    "Amritsar",
    "Navi Mumbai",
    "Allahabad",
    "Ranchi",
    "Haora",
    "Coimbatore",
    "Jabalpur",
    "Gwalior",
    "Vijayawada",
    "Jodhpur",
    "Madurai",
    "Raipur",
    "Kota",
    "Guwahati",
    "Chandigarh",
    "Solapur",
    "Hubli-Dharwad",
    "Bareilly",
    "Moradabad",
    "Mysore",
    "Gurgaon",
    "Aligarh",
    "Jalandhar",
    "Tiruchirappalli",
    "Bhubaneswar",
    "Salem",
    "Warangal",
    "Guntur",
    "Bhiwandi",
    "Saharanpur",
    "Gorakhpur",
    "Bikaner",
    "Amravati",
    "Noida",
    "Jamshedpur",
    "Bhilai",
    "Cuttack",
    "Firozabad",
    "Kochi",
    "Nellore",
    "Bhavnagar",
    "Dehradun",
    "Durgapur",
    "Asansol",
    "Rourkela",
    "Nanded",
    "Kolhapur",
    "Ajmer",
    "Akola",
    "Gulbarga",
    "Jamnagar",
    "Ujjain",
    "Loni",
    "Siliguri",
    "Jhansi",
    "Ulhasnagar",
    "Nellore",
    "Jammu",
    "Sangli-Miraj & Kupwad",
    "Belgaum",
    "Mangalore",
    "Ambattur",
    "Tirunelveli",
    "Malegaon",
    "Gaya",
    "Jalgaon",
    "Udaipur",
    "Maheshtala",
    "Tirupur",
    "Davanagere",
    "Kozhikode",
    "Akola",
    "Kurnool",
    "Bokaro Steel City",
    "Rajahmundry",
    "Ballari",
    "Agartala",
  ];

  const option = cities.map((city) => ({
    value: city.toLowerCase().replace(/ /g, "-"),
    label: city,
  }));

  const departureCity = cities.map((city) => ({
    value: city.toLowerCase().replace(/ /g, "-"),
    label: city,
  }));
  const startDate = new Date(watchAllFields.conferenceStartDate);

  const areaInMeter = watchAllFields.conferenceArea * 0.092903;

  // conversion of sq. ft to meter sq and vise versa

  const conversionFactor = 0.092903;

  const squareFeet = watch("squareFeet");
  const squareMeters = watch("squareMeters");

  const handleSquareFeetChange = (value) => {
    if (value === "") {
      setValue("squareMeters", "");
    } else {
      const convertedValue = parseFloat(value) * conversionFactor;
      setValue("squareMeters", convertedValue);
    }
  };

  const handleSquareMetersChange = (value) => {
    if (value === "") {
      setValue("squareFeet", "");
    } else {
      const convertedValue = parseFloat(value) / conversionFactor;
      setValue("squareFeet", convertedValue);
    }
  };
  // end of sq km and meter sq

  const options = [
    "Travel bookings",
    "Hotel & End to End Arrangements",
    "Conference",
  ];
  const errorhandle = () => {
    setIsSubmitClicked(true);
    setSightClicked(true);
    SetSeating(true);
  };

  const individual = ["Friend", "Staff", "Corporate Client Personal"];
  const group = [
    "Corporate Group",
    "Wedding",
    "Association Expo",
    "Friends Group",
  ];

  let type = null;

  if (watchAllFields.groupType === "Group") {
    type = group;
  } else if (watchAllFields.groupType === "Individual") {
    type = individual;
  } else {
    type = null;
  }

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };
  const agenda__number = Array.from(
    { length: parseInt(watchAllFields.duration) },
    (_, i) => i
  );

  const onSubmit = (data) => {
    if (
      !watchAllFields.travelBooking &&
      !watchAllFields.hotelArrangements &&
      !watchAllFields.conferences &&
      !watchAllFields.event
    ) {
      alert("Please select the Services");
      return;
    }
    console.log(data);
    setLoading(true);
    const googleSheetData = {
      GroupType: data.groupType,
      BookingCategory: data.bookingCategory,
      Name: data.name,
      Email: data.email,
      Phone: data.phone,
      Place: data.destination,
      NationalCity: data.nationalaCity,
      Country: data.country.name,
      City: data.state.name,
      CheckBoxTravelBooking: data.travelBooking,
      CheckBoxHotelArrangements: data.hotelArrangements,
      CheckBoxEvent: data.event,
      CheckBoxConference: data.conferences,
      TravelBookingType: data.travelBookingType,
      TotaxPax: data.totalPax,
      DepartureCity: data.departureCity,
      PreferedAirlines: data.preferedAirlines,
      PreferredArrivalTime: data.preferedArrivalTime,
      PreferredDepartureTime: data.preferedDepartureTime,
      BussinessClassPax: data.anyBussinessClassPax,
      PurposeOfTravle: data.purposeOfTravel,
      Period: data.period,
      Duration: data.duration,
      GroupSize: data.groupSize,
      ApproxDBL: data.approxDBL,
      ApproxSGL: data.approxSGL,
      hotelCategory: data.hotelCategory,
      ConferenceHall: data.conferenceHall,
      SeatingRound: data.RoundTable,
      SeatingHalfMoon: data.HalfMoon,
      SeatingClassroom: data.ClassRoom,
      SeatingTheatre: data.Theatre,
      SeatingUshape: data.UShape,
      SeatingCockTail: data.Cocltail,
      SeatingOther: data.Others,
      AirportTransfer: data.airportTransfers,
      SightSeeingOneDay: data.OneDay,
      SightSeeingTwoHalfDay: data.TwoHalfDay,
      SightSeeingTwoFullDay: data.TwoFullDay,
      SightSeeingAllPopularSite: data.AllPopularSites,
      SightSeeingOthers: data.Others,
      GalaDinner: data.galaDinner,
      GalaDinnerDate: data.galaDinnerDate,
      DjLightSound: data.DjLightSound,
      LunchIndianRestaurantCount: data.LunchIndianRestaurantCount,
      Dinner: data.Dinners,
      DinnerSize: data.dinnerSize,
    };
    axios
      .post(import.meta.env.VITE_BOOKING_REQUEST, googleSheetData)
      .then((response) => {
        console.log(response);
        MySwal.fire({
          icon: "success",
          title:
            "Thank you for submitting your information. We will connect you soon",
        });
        setTimeout(() => {
          setLoading(false);
          reset();
        }, 1000);
      })
      .catch((error) => {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "Try after some time",
        });
        console.error("Error fetching data:", error);
        setTimeout(() => {
          setLoading(false);
          reset();
        }, 1000 * 2);
      });
  };

  return (
    <>
      <header>
        <img src={headerImg} width={160}></img>
      </header>
      <main>
        <Container className="d-flex justify-content-center">
          <form
            name="FlightHotelForms"
            className="form__main"
            method="post"
            ref={form}
            onSubmit={handleSubmit(onSubmit)}>
            <h2 className="room_reservation_text" id="bookingText">
              Flight & Hotel Request Form
            </h2>
            <Row className="row__container">
              <Col md={6}>
                <div className="input__container">
                  <label htmlFor="title">
                    Booking Type <span className="required_field">*</span>
                  </label>
                  <select
                    id="Place"
                    name="groupType"
                    className="input-element"
                    {...register("groupType", {
                      required: "Select Group Type from list",
                    })}>
                    <option value="">--Select--</option>
                    <option value="Group">Group</option>
                    <option value="Individual">Individual</option>
                  </select>

                  {errors.groupType && (
                    <span className="errorMsg">{errors.groupType.message}</span>
                  )}
                </div>
              </Col>
              <Col md={6}>
                <div className="input__container">
                  <label htmlFor="subcategory">
                    Booking Category <span className="required_field">*</span>{" "}
                  </label>
                  <select
                    id="subcategory"
                    className="input-element"
                    name="bookingCategory"
                    {...register("bookingCategory", {
                      required: "Booking category required",
                    })}>
                    <option value="">--Select--</option>

                    {type &&
                      type.map((element, idx) => {
                        return (
                          <option key={idx} value={element}>
                            {element}
                          </option>
                        );
                      })}
                  </select>
                  {errors.bookingCategory && (
                    <span className="errorMsg">
                      {errors.bookingCategory.message}
                    </span>
                  )}
                </div>
              </Col>
            </Row>
            <Row className="row__container">
              <Col md={3}>
                <div className="input__container">
                  <label htmlFor="name">
                    Company Name <span className="required_field">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Company Name"
                    className="input-element"
                    name="name"
                    {...register("name", {
                      required: "Name is required.",
                      pattern: {
                        value: /^[a-zA-Z ]*$/,
                        message: "Enter Valid Name",
                      },
                      minLength: {
                        value: 3,
                        message: "Name should be at least 3 characters.",
                      },
                      maxLength: {
                        value: 30,
                        message: "Name should be maximum 30 characters.",
                      },
                    })}
                  />
                  {errors.name && (
                    <span className="errorMsg">{errors.name.message}</span>
                  )}
                </div>
              </Col>

              <Col md={3}>
                <div className="input__container">
                  <label htmlFor="name">
                    Name <span className="required_field">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    className="input-element"
                    name="name"
                    {...register("name", {
                      required: "Name is required.",
                      pattern: {
                        value: /^[a-zA-Z ]*$/,
                        message: "Enter Valid Name",
                      },
                      minLength: {
                        value: 3,
                        message: "Name should be at least 3 characters.",
                      },
                      maxLength: {
                        value: 30,
                        message: "Name should be maximum 30 characters.",
                      },
                    })}
                  />
                  {errors.name && (
                    <span className="errorMsg">{errors.name.message}</span>
                  )}
                </div>
              </Col>
              <Col md={3}>
                <div className="input__container">
                  <label htmlFor="email">
                    Email <span className="required_field">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="input-element"
                    placeholder="Enter Your Email"
                    name="email"
                    {...register("email", {
                      required: "Email is required.",
                      pattern: {
                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "Enter valid Email Id",
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="errorMsg">{errors.email.message}</span>
                  )}
                </div>
              </Col>
              <Col md={3}>
                <div className="input__container">
                  <label htmlFor="Phone">
                    Phone <span className="required_field">*</span>
                  </label>
                  <input
                    type="tel"
                    id="Phone"
                    className="input-element"
                    placeholder="Enter Phone No"
                    name="phone"
                    {...register("phone", {
                      required: "Phone is required.",
                      pattern: {
                        value:
                          /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                        message: "Enter valid phone number",
                      },
                    })}
                  />
                  {errors.phone && (
                    <span className="errorMsg">{errors.phone.message}</span>
                  )}
                </div>
              </Col>
            </Row>

            <Row className="row__container">
              <Col md={12}>
                <div className="input__container">
                  <label htmlFor="destination">
                    Destination <span className="required_field">*</span>
                  </label>
                  <select
                    id="destination"
                    name="destination"
                    className="input-element"
                    {...register("destination", {
                      required: "Select destination from list",
                    })}>
                    <option value="">--Select--</option>
                    <option value="national">National</option>
                    <option value="international">International</option>
                  </select>
                  {errors.destination && (
                    <span className="errorMsg">
                      {errors.destination.message}
                    </span>
                  )}
                </div>
              </Col>
            </Row>

            {watchAllFields.destination === "national" && (
              <Row className="row__container">
                <Col md={12}>
                  <div className="input__container">
                    <label htmlFor="cities">
                      Select a city <span className="required_field">*</span>
                    </label>
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={option}
                      isMulti
                    />
                    {/* <select
                      id="cities"
                      className="input-element"
                      multiple
                      size="2"
                      name="nationalaCity"
                      value={selectedCity}
                      {...register("nationalaCity", {
                        required: "select cities",
                      })}
                      onChange={handleCityChange}>
                      <option value="">Select City</option>
                      {cities.map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
                    </select> */}
                    {errors.nationalaCity && (
                      <span className="errorMsg">
                        {errors.nationalaCity.message}
                      </span>
                    )}
                  </div>
                </Col>
              </Row>
            )}

            {watchAllFields.destination === "international" && (
              <>
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
                        <label>State </label>
                        <Controller
                          name={`state-${index}`}
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={statesMap[index]}
                              isMulti
                              className="input-element-state"
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

                {
                  // <Row className="row__container">
                  //   <Col md={6}>
                  //     <div className="input__container">
                  //       <label>
                  //         Country <span className="required_field">*</span>
                  //       </label>
                  //       <Controller
                  //         name="country"
                  //         control={control}
                  //         render={({ field }) => (
                  //           <CountrySelect
                  //             {...field}
                  //             required
                  //             onChange={(e) => {
                  //               field.onChange(e);
                  //               setCountryid(e.id);
                  //             }}
                  //             placeHolder="Select Country"
                  //           />
                  //         )}
                  //       />
                  //       {countryid === 0 && (
                  //         <span className="errorMsg">
                  //           Select country from list
                  //         </span>
                  //       )}
                  //     </div>
                  //   </Col>
                  //   <Col md={6}>
                  //     <div className="input__container">
                  //       <label>City 1</label>
                  //       <Controller
                  //         name="state"
                  //         control={control}
                  //         render={({ field }) => (
                  //           <StateSelect
                  //             {...field}
                  //             countryid={countryid}
                  //             onChange={(e) => {
                  //               field.onChange(e);
                  //               setStateid(e.id);
                  //             }}
                  //             placeHolder="Select City"
                  //           />
                  //         )}
                  //       />
                  //     </div>
                  //   </Col>
                  //   {city.map((item, index) => (
                  //     <Col md={6} key={index}>
                  //       <div className="input__container mt-2">
                  //         <label>City {index + 2}</label>
                  //         <Controller
                  //           name={`state-${index}`}
                  //           control={control}
                  //           render={({ field }) => (
                  //             <StateSelect
                  //               {...field}
                  //               countryid={countryid}
                  //               onChange={(e) => {
                  //                 field.onChange(e);
                  //                 setStateid(e.id);
                  //               }}
                  //               placeHolder="Select City"
                  //             />
                  //           )}
                  //         />
                  //       </div>
                  //     </Col>
                  //   ))}
                  //   <Row>
                  //     <Col md={3}>
                  //       <Button
                  //         variant="primary"
                  //         id="city"
                  //         className="mt-3"
                  //         size="sm"
                  //         onClick={(e) => addDestination(e)}>
                  //         Add City
                  //       </Button>
                  //     </Col>
                  //   </Row>
                  //   {/* {country.map((item, index) => (
                  //       <Row className="row__container" key={index}>
                  //         <Col md={6}>
                  //           <div className="input__container">
                  //             <label>
                  //               Country{" "}
                  //               <span className="required_field">*</span>
                  //             </label>
                  //             <Controller
                  //               name={`country-${index}`}
                  //               control={control}
                  //               render={({ field }) => (
                  //                 <CountrySelect
                  //                   {...field}
                  //                   required
                  //                   onChange={(e) => {
                  //                     field.onChange(e);
                  //                     setCountryid(e.id);
                  //                   }}
                  //                   placeHolder="Select Country"
                  //                 />
                  //               )}
                  //             />
                  //             {countryid === 0 && (
                  //               <span className="errorMsg">
                  //                 Select country from list
                  //               </span>
                  //             )}
                  //           </div>
                  //         </Col>
                  //         <Col md={6}>
                  //           <div className="input__container">
                  //             <label>City</label>
                  //             <Controller
                  //               name={`StateExta-${index}`}
                  //               control={control}
                  //               render={({ field }) => (
                  //                 <StateSelect
                  //                   {...field}
                  //                   countryid={countryid}
                  //                   onChange={(e) => {
                  //                     field.onChange(e);
                  //                     setStateid(e.id);
                  //                   }}
                  //                   placeHolder="Select City"
                  //                 />
                  //               )}
                  //             />
                  //           </div>
                  //         </Col>
                  //       </Row>
                  //     ))}
                  //     <Button
                  //       variant="primary"
                  //       id="country"
                  //       className="mt-3"
                  //       size="sm"
                  //       onClick={(e) => addDestination(e)}>
                  //       Add Country
                  //     </Button> */}
                  // </Row>
                }
              </>

              // <>
              //   <label htmlFor="country">
              //     Country: <span className="required_field">*</span>
              //   </label>
              //   <CountrySelect
              //     name="country"
              //     value={countryid}
              //     {...register("country", { required: true })}
              //     onChange={(e) => {
              //       setCountryid(e.id);
              //     }}
              //     placeHolder="Select Country"
              //   />
              //   {countryid === 0 && (
              //     <span className="errorMsg">Select Country</span>
              //   )}
              //   <br />
              //   <br />
              //   <label htmlFor="city">
              //     City: <span className="required_field">*</span>
              //   </label>
              //   <StateSelect
              //     name="city"
              //     {...register("city", { required: true })}
              //     countryid={countryid}
              //     value={selectedCity}
              //     onChange={(e) => {
              //       setstateid(e.id);
              //     }}
              //     placeHolder="Select City"
              //   />
              //   {stateid === 0 && (
              //     <span className="errorMsg">Select City</span>
              //   )}
              // </>
            )}
            <br />

            <Row className="row__container">
              <label>
                What is required Services{" "}
                <span className="required_field">*</span>
              </label>
              <br />
              <Col md={4}>
                <div style={{ marginTop: "10px", padding: "5px" }}>
                  <Controller
                    name="travelBooking"
                    {...register("travelBooking")}
                    control={control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        {...field}
                        checked={field.value || false}
                      />
                    )}
                  />
                  <label
                    style={{
                      marginLeft: "5px",

                      color: "black",
                    }}>
                    Travel Requirements
                  </label>
                </div>
              </Col>
              <Col md={4}>
                <div style={{ marginTop: "10px", padding: "5px" }}>
                  <Controller
                    name="hotelArrangements"
                    {...register("hotelArrangements")}
                    control={control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        {...field}
                        checked={field.value || false}
                        style={{ marginRight: "5px" }}
                      />
                    )}
                  />
                  <label
                    style={{
                      marginLeft: "5px",
                      color: "black",
                    }}>
                    Hotel Requirements
                  </label>
                </div>
              </Col>

              <Col md={4}>
                <div style={{ marginTop: "10px", padding: "5px" }}>
                  <Controller
                    name="landArrangement"
                    {...register("landArrangement")}
                    control={control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        {...field}
                        checked={field.value || false}
                        style={{ marginRight: "5px" }}
                      />
                    )}
                  />
                  <label
                    style={{
                      marginLeft: "5px",
                      color: "black",
                    }}>
                    Land Requirements
                  </label>
                </div>
              </Col>
              <Col md={4}>
                <div style={{ marginTop: "10px", padding: "5px" }}>
                  <Controller
                    name="event"
                    {...register("event")}
                    control={control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        {...field}
                        checked={field.value || false}
                        style={{ marginRight: "5px" }}
                      />
                    )}
                  />
                  <label style={{ marginLeft: "5px", color: "black" }}>
                    Event Requirements
                  </label>
                </div>
              </Col>
              {/* <Col md={4}>
                <div style={{ marginTop: "10px", padding: "5px" }}>
                  <Controller
                    name="conferences"
                    {...register("conferences")}
                    control={control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        {...field}
                        checked={field.value || false}
                        style={{ marginRight: "5px" }}
                      />
                    )}
                  />
                  <label style={{ marginLeft: "5px", color: "black" }}>
                    Conference Requirements
                  </label>
                </div>
              </Col> */}

              {/* <Col md={4}>
                <div style={{ marginTop: "10px", padding: "5px" }}>
                  <Controller
                    name="conferences"
                    {...register("conferences")}
                    control={control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        {...field}
                        checked={field.value || false}
                        style={{ marginRight: "5px" }}
                      />
                    )}
                  />
                  <label style={{ marginLeft: "5px", color: "black" }}>
                    Conference Requirements
                  </label>
                </div>
              </Col> */}

              {isSubmitClicked &&
              !watchAllFields.travelBooking &&
              !watchAllFields.hotelArrangements &&
              !watchAllFields.event ? (
                <>
                  <br />
                  <span className="errorMsg">
                    At least one service must be selected.
                  </span>
                </>
              ) : null}
            </Row>

            {watchAllFields.travelBooking === true && (
              <Row className="row__container">
                <Col md={12}>
                  <div className="input__container">
                    <label htmlFor="travelBookingType">
                      Travel Booking Type{" "}
                      <span className="required_field">*</span>
                    </label>
                    <select
                      id="travelBookingType"
                      name="travelBookingType"
                      className="input-element"
                      {...register("travelBookingType", {
                        required: "Select from list",
                      })}>
                      <option value="">Select</option>
                      <option value="Flight">Flight</option>
                      <option value="Train">Train</option>
                      <option value="Car">Car</option>
                    </select>
                    {errors.travelBookingType && (
                      <span className="errorMsg">
                        {errors.travelBookingType.message}
                      </span>
                    )}
                  </div>
                </Col>
              </Row>
            )}

            {watchAllFields.travelBooking === true &&
              watchAllFields.travelBookingType == "Flight" && (
                <>
                  <Row className="row__container">
                    <p className="services">Travel bookings Details</p>
                    <Col md={6}>
                      <div className="input__container">
                        <label htmlFor="totalPax">
                          Total Pax <span className="required_field">*</span>
                        </label>
                        <input
                          type="text"
                          id="totalPax"
                          className="input-element"
                          placeholder="Toalt pax"
                          name="totalPax"
                          {...register("totalPax", {
                            required: "Please enter no of pax",
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "Enter Valid no",
                            },
                          })}
                        />
                        {errors.totalPax && (
                          <span className="errorMsg">
                            {errors.totalPax.message}
                          </span>
                        )}
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="input__container">
                        <label htmlFor="departureCity">
                          Departure City{" "}
                          <span className="required_field">*</span>
                        </label>
                        <Select
                          defaultValue={selectedOptionDeparture}
                          onChange={setSelectedDepartue}
                          options={departureCity}
                          isMulti
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row className="row__container">
                    <Col md={6}>
                      <div className="input__container">
                        <label htmlFor="preferedAirline">
                          Preferred Airline{" "}
                        </label>
                        <input
                          type="text"
                          className="input-element"
                          id="preferedAirline"
                          placeholder="Departure City"
                          name="preferedAirline"
                          {...register("preferedAirline")}
                        />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="input__container">
                        <label htmlFor="preferedArrivalTime">
                          Preferred Arrival Time{" "}
                          <span className="required_field">*</span>
                        </label>
                        <select
                          id="preferedArrivalTime"
                          name="preferedArrivalTime"
                          className="input-element"
                          {...register("preferedArrivalTime", {
                            required: "Select from list",
                          })}>
                          <option value="">--Select--</option>
                          <option value="arivalAnytime">Arrival Anytime</option>
                          <option value="preLunch">Pre Lunch</option>
                          <option value="postLunch">Post Lunch</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.preferedArrivalTime && (
                          <span className="errorMsg">
                            {errors.preferedArrivalTime.message}
                          </span>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row className="row__container">
                    <Col md={6}>
                      <div className="input__container">
                        <label htmlFor="preferedDepartureTime">
                          Preferred Departure Time{" "}
                          <span className="required_field">*</span>
                        </label>
                        <select
                          id="preferedDepartureTime"
                          className="input-element"
                          name="preferedDepartureTime"
                          {...register("preferedDepartureTime", {
                            required: "Select from list",
                          })}>
                          <option value="">--Select--</option>
                          <option value="departureAnytime">
                            Departure Anytime
                          </option>
                          <option value="preLunch">Pre Lunch</option>
                          <option value="postLunch">Post Lunch</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.preferedDepartureTime && (
                          <span className="errorMsg">
                            {errors.preferedDepartureTime.message}
                          </span>
                        )}
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="input__container">
                        <label htmlFor="anyBussinessClassPax">
                          Any Business Class Pax
                          <span className="required_field">*</span>
                        </label>
                        <select
                          id="anyBussinessClassPax"
                          className="input-element"
                          name="anyBussinessClassPax"
                          {...register("anyBussinessClassPax", {
                            required: "Select from list",
                          })}>
                          <option value="">--Select--</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                          <option value="likely">Likely</option>
                          <option value="others">Others</option>
                        </select>
                        {errors.anyBussinessClassPax && (
                          <span className="errorMsg">
                            {errors.anyBussinessClassPax.message}
                          </span>
                        )}
                      </div>
                    </Col>
                  </Row>

                  {/* <div className="form-group">
                      <p className="head_ques">
                        To be completed on phone or a email.
                      </p>
                      <b>Travel bookings </b>
                      <p className="flight_ques">
                        1. Total No of Pax
                        <br />
                        2. Departure City/s
                        <br />
                        3. Hub-wise count
                        <br />
                        4. Preferred Airline if any
                        <br />
                        5. Preferred arrival Time
                        <br />
                        6. Preferred departure Time
                        <br />
                        7. Any Business Class Pax
                      </p>
                    </div> */}
                </>
              )}

            {watchAllFields.hotelArrangements === true && (
              <>
                <Row className="row__container">
                  <p className="services">Hotel Arrangement bookings Details</p>
                  <Col md={6}>
                    <div className="input__container">
                      <label htmlFor="purposeOfTravel">
                        Purpose of Travel{" "}
                        <span className="required_field">*</span>
                      </label>
                      <select
                        id="purposeOfTravel"
                        name="purposeOfTravel"
                        className="input-element"
                        {...register("purposeOfTravel", {
                          required: "Select from list",
                        })}>
                        <option value="">--Select--</option>
                        <option value="Incentive Trip">Incentive Trip</option>
                        <option value="Annual Sales Conference">
                          Annual Sales Conference
                        </option>
                        <option value="Product Launch">Product Launch</option>
                        <option value="CEO Conclave">CEO Conclave</option>
                        <option value="Strategy Meet">Strategy Meet</option>
                        <option value="Others">Others</option>
                      </select>
                      {errors.purposeOfTravel && (
                        <span className="errorMsg">
                          {errors.purposeOfTravel.message}
                        </span>
                      )}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="input__container">
                      <label htmlFor="period">
                        Period <span className="required_field">*</span>
                      </label>
                      <input
                        type="text"
                        id="period"
                        placeholder="period"
                        className="input-element"
                        name="period"
                        {...register("period", {
                          required: "Enter duration date ex.( 02-05th Aug )",
                        })}
                      />
                      {errors.period && (
                        <span className="errorMsg">
                          {errors.period.message}
                        </span>
                      )}
                    </div>
                  </Col>
                </Row>
                <Row className="row__container">
                  <Col md={6}>
                    <div className="input__container">
                      <label htmlFor="duration">
                        Duration <span className="required_field">*</span>
                      </label>
                      <input
                        type="text"
                        id="hotelDuration"
                        placeholder="Duration. ex 5 nights "
                        className="input-element"
                        name="duration"
                        {...register("hotelDuration", {
                          required: "Enter Duration ex. 5 nights ",
                        })}
                      />
                      {errors.hotelDuration && (
                        <span className="errorMsg">
                          {errors.hotelDuration.message}
                        </span>
                      )}
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="input__container">
                      <label htmlFor="groupSize">
                        Group size <span className="required_field">*</span>
                      </label>
                      <input
                        type="text"
                        id="totalPax"
                        placeholder="Group size"
                        className="input-element"
                        name="groupSize"
                        {...register("groupSize", {
                          required: "Please enter Group Size",
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "Enter Valid no",
                          },
                        })}
                      />
                      {errors.groupSize && (
                        <span className="errorMsg">
                          {errors.groupSize.message}
                        </span>
                      )}
                    </div>
                  </Col>
                </Row>
                <Row className="row__container">
                  <Col md={6}>
                    <div className="input__container">
                      <label htmlFor="approxDBL">
                        Approx DBL <span className="required_field">*</span>
                      </label>
                      <input
                        type="text"
                        id="approxDBL"
                        className="input-element"
                        placeholder="Approx DBL"
                        name="approxDBL"
                        {...register("approxDBL", {
                          required: "Please enter Approx DBL",
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "Enter Valid no",
                          },
                        })}
                      />
                      {errors.approxDBL && (
                        <span className="errorMsg">
                          {errors.approxDBL.message}
                        </span>
                      )}
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="input__container">
                      <label htmlFor="approxSGL">
                        Approx SGL <span className="required_field">*</span>
                      </label>

                      <input
                        type="text"
                        id="approxSGL"
                        className="input-element"
                        placeholder="Approx SGL"
                        name="approxSGL"
                        {...register("approxSGL", {
                          required: "Please enter Approx SGL",
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "Enter Valid no",
                          },
                        })}
                      />
                      {errors.approxSGL && (
                        <span className="errorMsg">
                          {errors.approxSGL.message}
                        </span>
                      )}
                    </div>
                  </Col>
                </Row>

                <Row className="row__container">
                  <Col md={6}>
                    <div className="input__container">
                      <label htmlFor="hotelCategory">
                        Category of hotel{" "}
                        <span className="required_field">*</span>
                      </label>
                      <select
                        id="hotelCategory"
                        name="hotelCategory"
                        className="input-element"
                        {...register("hotelCategory", {
                          required: "Select Hotel Category from list",
                        })}>
                        <option value="">--Select--</option>
                        <option value="5 Star">5 Star</option>
                        <option value="4 Star">4 Star</option>
                      </select>
                      {errors.hotelCategory && (
                        <span className="errorMsg">
                          {errors.hotelCategory.message}
                        </span>
                      )}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="input__container">
                      <label htmlFor="roomType">Type of Rooms</label>
                      <input
                        type="text"
                        id="roomType"
                        placeholder="Type of Rooms"
                        className="input-element"
                        name="roomType"
                        {...register("roomType", {
                          required: "Enter the Details",
                        })}
                      />
                      {errors.roomType && (
                        <span className="errorMsg">
                          {errors.roomType.message}
                        </span>
                      )}
                    </div>
                  </Col>
                </Row>
                <Row className="row__container">
                  <Col md={6}>
                    <div className="input__container">
                      <label htmlFor="upgrade__comp">
                        Upgrades Complementry
                        <span className="required_field">*</span>
                      </label>
                      <select
                        id="upgrade__comp"
                        name="upgrade__comp"
                        className="input-element"
                        {...register("upgrade__comp", {
                          required: "Select from list",
                        })}>
                        Club Room / Jr.Suite / Suite/Dlx Suite / Pres Suite /
                        Other
                        <option value="">--Select--</option>
                        <option value="ClubRoom">Club Room </option>
                        <option value="JrSuite">Jr.Suite</option>
                        <option value="suite">Suite</option>
                        <option value="JrSuite">Dlx Suite</option>
                        <option value="PreSuite">Pres Suite</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.upgrade__comp && (
                        <span className="errorMsg">
                          {errors.upgrade__comp.message}
                        </span>
                      )}
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="input__container">
                      <label htmlFor="upgrade__Paid">
                        Upgrades Paid
                        <span className="required_field">*</span>
                      </label>
                      <select
                        id="upgrade__Paid"
                        name="upgrade__Paid"
                        className="input-element"
                        {...register("upgrade__Paid", {
                          required: "Select from list",
                        })}>
                        <option value="">--Select--</option>
                        <option value="ClubRoom">Club Room </option>
                        <option value="JrSuite">Jr.Suite</option>
                        <option value="suite">Suite</option>
                        <option value="JrSuite">Dlx Suite</option>
                        <option value="PreSuite">Pres Suite</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.upgrade__Paid && (
                        <span className="errorMsg">
                          {errors.upgrade__Paid.message}
                        </span>
                      )}
                    </div>
                  </Col>
                </Row>

                <Row className="row__container">
                  <Col md={6}>
                    <div className="input__container">
                      <label htmlFor="conferenceHall">Conference Hall</label>
                      <select
                        id="conferenceHall"
                        name="conferenceHall"
                        className="input-element"
                        {...register("conferenceHall", {
                          required: "Select from list",
                        })}>
                        <option value="">--Select--</option>
                        <option value="Yes">Yes </option>
                        <option value="No">No</option>
                      </select>
                      {errors.conferenceHall && (
                        <span className="errorMsg">
                          {errors.conferenceHall.message}
                        </span>
                      )}
                    </div>
                  </Col>
                </Row>

                {watchAllFields.conferenceHall == "Yes" && (
                  <>
                    <Row className="row__container">
                      <p className="services">Conference Booking Details</p>
                      <Col md={4}>
                        <div className="input__container">
                          <label>Area in Square Feet</label>
                          <Controller
                            name="squareFeet"
                            control={control}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="number"
                                className="input-element"
                                placeholder="Enter Area in Square Feet"
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleSquareFeetChange(e.target.value);
                                }}
                              />
                            )}
                          />
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="input__container">
                          <label>Area in Square Meters</label>
                          <Controller
                            name="squareMeters"
                            control={control}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="number"
                                className="input-element"
                                placeholder="Enter Area in Square Meters"
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleSquareMetersChange(e.target.value);
                                }}
                              />
                            )}
                          />
                        </div>
                      </Col>

                      {/* <Col md={4}>
                        <div className="input__container">
                          <label htmlFor="conferenceArea">
                            Area In Sq. Ft
                            <span className="required_field">*</span>
                          </label>
                          <input
                            type="Number"
                            id="conferenceArea"
                            placeholder="Enter Area in Sq. Ft"
                            className="input-element"
                            name="conferenceArea"
                            {...register("conferenceArea", {
                              required: "Conference Area is required.",
                            })}
                          />
                          {errors.conferenceArea && (
                            <span className="errorMsg">
                              {errors.conferenceArea.message}
                            </span>
                          )}
                        </div>
                      </Col>
                      <Col md={2} className="conf__agenda">
                        <p>In Mt. Sq</p>
                        {areaInMeter}
                      </Col> */}
                      <Col md={4}>
                        <div className="input__container">
                          <label htmlFor="duration">
                            Duration <span className="required_field">*</span>
                          </label>
                          <input
                            type="text"
                            id="duration"
                            placeholder="Total Days"
                            className="input-element"
                            name="duration"
                            {...register("duration", {
                              required: "Total Days",
                            })}
                          />
                          {errors.duration && (
                            <span className="errorMsg">
                              {errors.duration.message}
                            </span>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <Row className="row__container">
                      <Col md={4}>
                        <div className="input__container">
                          <label htmlFor="setUpDate">
                            Set Up Date
                            <span className="required_field">*</span>
                          </label>
                          <input
                            id="setUpDate"
                            name="setUpDate"
                            type="date"
                            className="input-element"
                            {...register("setUpDate", {
                              required: "Select Date",
                            })}
                          />

                          {errors.setUpDate && (
                            <span className="errorMsg">
                              {errors.setUpDate.message}
                            </span>
                          )}
                        </div>
                      </Col>

                      <Col md={4}>
                        <div className="input__container">
                          <label htmlFor="conferenceStartDate">
                            Conference Start Date
                            <span className="required_field">*</span>
                          </label>
                          <input
                            id="conferenceStartDate"
                            name="conferenceStartDate"
                            type="date"
                            className="input-element"
                            {...register("conferenceStartDate", {
                              required: "Select Date",
                            })}
                          />

                          {errors.setUpDate && (
                            <span className="errorMsg">
                              {errors.setUpDate.message}
                            </span>
                          )}
                        </div>
                      </Col>

                      <Col md={4}>
                        <div className="input__container">
                          <label htmlFor="conferenceEndDate">
                            Conference End Date
                            <span className="required_field">*</span>
                          </label>
                          <input
                            id="setUpDate"
                            name="conferenceEndDate"
                            type="date"
                            className="input-element"
                            {...register("conferenceEndDate", {
                              required: "Select Date",
                            })}
                          />

                          {errors.conferenceEndDate && (
                            <span className="errorMsg">
                              {errors.conferenceEndDate.message}
                            </span>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </>
                )}

                <br />
                {watchAllFields.conferenceHall == "Yes" && (
                  <Row className="row__container">
                    <label>
                      Seating <span className="required_field">*</span>
                    </label>
                    <br />
                    <Col md={4} sm={6}>
                      <div style={{ marginTop: "10px", padding: "5px" }}>
                        <Controller
                          name="RoundTable"
                          {...register("RoundTable")}
                          control={control}
                          render={({ field }) => (
                            <>
                              <input
                                type="checkbox"
                                {...field}
                                checked={field.value || false}
                                style={{ marginRight: " 5px" }}
                              />
                            </>
                          )}
                        />

                        <label
                          style={{
                            marginLeft: "5px",

                            color: "black",
                          }}>
                          Round Table
                        </label>

                        <LazyLoadImage
                          src={Round}
                          className="img-fluid img_index"
                        />
                      </div>
                    </Col>
                    <Col md={4} sm={6}>
                      <div style={{ marginTop: "10px", padding: "5px" }}>
                        <Controller
                          name="HalfMoon"
                          {...register("HalfMoon")}
                          control={control}
                          render={({ field }) => (
                            <input
                              type="checkbox"
                              {...field}
                              checked={field.value || false}
                              style={{ marginRight: "5px" }}
                            />
                          )}
                        />
                        <label
                          style={{
                            marginLeft: "5px",
                            color: "black",
                          }}>
                          Half Moon
                        </label>
                        <LazyLoadImage
                          src={Halfmoon}
                          className="img-fluid img_index"
                        />
                      </div>
                    </Col>
                    <Col md={4} sm={6}>
                      <div style={{ marginTop: "10px", padding: "5px" }}>
                        <Controller
                          name="ClassRoom"
                          {...register("ClassRoom")}
                          control={control}
                          render={({ field }) => (
                            <input
                              type="checkbox"
                              {...field}
                              checked={field.value || false}
                              style={{ marginRight: "5px" }}
                            />
                          )}
                        />
                        <label style={{ marginLeft: "5px", color: "black" }}>
                          Class room
                        </label>
                        <LazyLoadImage
                          src={ClassRoom}
                          className="img-fluid img_index"
                        />
                      </div>
                    </Col>
                    <Col md={4} sm={6}>
                      <div style={{ marginTop: "10px", padding: "5px" }}>
                        <Controller
                          name="Theatre"
                          {...register("Theatre")}
                          control={control}
                          render={({ field }) => (
                            <input
                              type="checkbox"
                              {...field}
                              checked={field.value || false}
                              style={{ marginRight: "5px" }}
                            />
                          )}
                        />
                        <label style={{ marginLeft: "5px", color: "black" }}>
                          Theatre
                        </label>
                        <LazyLoadImage
                          src={Theater}
                          className="img-fluid img_index"
                        />
                      </div>
                    </Col>
                    <Col md={4} sm={6}>
                      <div style={{ marginTop: "10px", padding: "5px" }}>
                        <Controller
                          name="UShaped"
                          {...register("UShaped")}
                          control={control}
                          render={({ field }) => (
                            <input
                              type="checkbox"
                              {...field}
                              checked={field.value || false}
                              style={{ marginRight: "5px" }}
                            />
                          )}
                        />
                        <label style={{ marginLeft: "5px", color: "black" }}>
                          U Shaped
                        </label>
                        <LazyLoadImage
                          src={UShaped}
                          className="img-fluid img_index"
                        />
                      </div>
                    </Col>
                    <Col md={4} sm={6}>
                      <div style={{ marginTop: "10px", padding: "5px" }}>
                        <Controller
                          name="Cocktail"
                          {...register("Cocktail")}
                          control={control}
                          render={({ field }) => (
                            <input
                              type="checkbox"
                              {...field}
                              checked={field.value || false}
                              style={{ marginRight: "5px" }}
                            />
                          )}
                        />
                        <label style={{ marginLeft: "5px", color: "black" }}>
                          Cocktail
                        </label>
                        <LazyLoadImage
                          src={Cocktail}
                          className="img-fluid img_index"
                          style={{ backgroundColor: "white" }}
                        />
                      </div>
                    </Col>
                    <Col md={4} sm={6}>
                      <div style={{ marginTop: "10px", padding: "5px" }}>
                        <Controller
                          name="Others"
                          {...register("Others")}
                          control={control}
                          render={({ field }) => (
                            <input
                              type="checkbox"
                              {...field}
                              checked={field.value || false}
                              style={{ marginRight: "5px" }}
                            />
                          )}
                        />
                        <label style={{ marginLeft: "5px", color: "black" }}>
                          Others
                        </label>
                      </div>
                    </Col>

                    {isSeating &&
                    !watchAllFields.RoundTable &&
                    !watchAllFields.HalfMoon &&
                    !watchAllFields.ClassRoom &&
                    !watchAllFields.Theatre &&
                    !watchAllFields.UShaped &&
                    !watchAllFields.Cocktail &&
                    !watchAllFields.Others ? (
                      <>
                        <br />
                        <span className="errorMsg">
                          At least one must be selected.
                        </span>
                      </>
                    ) : null}
                  </Row>
                )}
                {watchAllFields.duration &&
                  watchAllFields.conferenceStartDate && (
                    <Row className="row__container">
                      <p className="services">Conference Agenda</p>
                      <Row className="conf__agenda inin">
                        <Col xs={1}>
                          <p>Day</p>
                        </Col>
                        <Col xs={2}>
                          <p>Date</p>
                        </Col>
                        <Col xs={2}>{/* <p>Day</p> */}</Col>
                        <Col xs={2}>
                          <p>Time</p>
                        </Col>
                        <Col xs={5}>
                          <p>Activity</p>
                        </Col>
                      </Row>
                      {agenda__number.map((item, index) => {
                        if (!watchAllFields.conferenceStartDate) {
                          return;
                        }
                        const newDate = new Date(
                          startDate.getTime() + index * 86400000
                        ); // Increment date by index days
                        const dayName = new Intl.DateTimeFormat("en-US", {
                          weekday: "long",
                        }).format(newDate); // Get day name

                        const formattedDate = new Intl.DateTimeFormat(
                          "en-GB"
                        ).format(newDate); // Format date as dd-mm-yyyy

                        // const newDate = new Date(
                        //   startDate.getTime() + index * 86400000
                        // ); // Increment date by index days
                        // const dayName = new Intl.DateTimeFormat("en-US", {
                        //   weekday: "long",
                        // }).format(newDate); // Get day name

                        return (
                          <Row key={index}>
                            <Col xs={1} className="conf__agenda">
                              <p>{index + 1}</p>
                            </Col>
                            <Col xs={2} className="conf__agenda">
                              <p>{formattedDate}</p>
                            </Col>
                            <Col xs={2} className="conf__agenda">
                              <p>{dayName}</p>
                            </Col>
                            <Col xs={2} className="conf__agenda">
                              <input type="time" placeholder="Time" />
                            </Col>
                            <Col xs={5} className="conf__agenda">
                              <input
                                type="text"
                                placeholder="Enter your Activity"
                              />
                            </Col>
                          </Row>
                        );
                      })}
                    </Row>
                  )}

                {/* <Row className="row__container">
                  <Col md={12}>
                    <div className="input__container">
                      <label htmlFor="seating">
                        Seating <span className="required_field">*</span>
                      </label>
                      <select
                        id="seating"
                        name="Seating"
                        className="input-element"
                        {...register("seating", {
                          required: "Select seating Type from list",
                        })}>
                        <option value="">--Select--</option>
                        <option value="Round Table ">Round Table </option>
                        <option value="Half Moon">Half Moon</option>
                        <option value="Classroom">Classroom </option>
                        <option value="Theatre">Theatre</option>
                        <option value="U-Shaped">U-Shaped</option>
                        <option value="Cocktail">Cocktail</option>
                        <option value="Others">Others </option>
                      </select>
                      {errors.seating && (
                        <span className="errorMsg">
                          {errors.seating.message}
                        </span>
                      )}
                    </div>
                  </Col>
                </Row> */}
              </>
            )}
            {watchAllFields.landArrangement == true && (
              <>
                <Row className="row__container">
                  <p className="services">Land Arrangement</p>
                  <Col md={4}>
                    <div className="input__container">
                      <label htmlFor="airportArrivalTransfers">
                        Airport Arrival transfers{" "}
                        <span className="required_field">*</span>
                      </label>
                      <select
                        id="airportArrivalTransfers"
                        name="airportArrivalTransfers"
                        className="input-element"
                        {...register("airportArrivalTransfers", {
                          required: "Select from list",
                        })}>
                        <option value="">--Select--</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      {errors.airportArrivalTransfers && (
                        <span className="errorMsg">
                          {errors.airportArrivalTransfers.message}
                        </span>
                      )}
                    </div>
                  </Col>
                  {watchAllFields.airportArrivalTransfers == "Yes" && (
                    <>
                      <Col md={4}>
                        <div className="input__container">
                          <label htmlFor="arrvilaDate">
                            Arrival Date{" "}
                            <span className="required_field">*</span>
                          </label>
                          <input
                            id="arrvilaDate"
                            name="arrvilaDate"
                            type="date"
                            className="input-element"
                            {...register("arrvilaDate", {
                              required: "Select Date",
                            })}
                          />

                          {errors.arrvilaDate && (
                            <span className="errorMsg">
                              {errors.arrvilaDate.message}
                            </span>
                          )}
                        </div>
                      </Col>

                      <Col md={4}>
                        <div className="input__container">
                          <label htmlFor="arrvilTime">
                            Arrival Time{" "}
                            <span className="required_field">*</span>
                          </label>
                          <input
                            id="arrvilTime"
                            name="arrvilTime"
                            type="time"
                            className="input-element"
                            {...register("arrvilTime", {
                              required: "Select Time",
                            })}
                          />

                          {errors.arrvilTime && (
                            <span className="errorMsg">
                              {errors.arrvilTime.message}
                            </span>
                          )}
                        </div>
                      </Col>
                    </>
                  )}
                </Row>
                <Row className="row__container">
                  <Col md={4}>
                    <div className="input__container">
                      <label htmlFor="airportDepartureTrans">
                        Airport Departure Transfer
                        <span className="required_field">*</span>
                      </label>
                      <select
                        id="airportDepartureTrans"
                        name="airportDepartureTrans"
                        className="input-element"
                        {...register("airportDepartureTrans", {
                          required: "Select from list",
                        })}>
                        <option value="">--Select--</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      {errors.airportDepartureTrans && (
                        <span className="errorMsg">
                          {errors.airportDepartureTrans.message}
                        </span>
                      )}
                    </div>
                  </Col>
                  {watchAllFields.airportDepartureTrans == "Yes" && (
                    <>
                      <Col md={4}>
                        <div className="input__container">
                          <label htmlFor="departureDate">
                            Departure Date{" "}
                            <span className="required_field">*</span>
                          </label>
                          <input
                            id="departureDate"
                            name="departureDate"
                            type="date"
                            className="input-element"
                            {...register("departureDate", {
                              required: "Select Date",
                            })}
                          />

                          {errors.departureDate && (
                            <span className="errorMsg">
                              {errors.departureDate.message}
                            </span>
                          )}
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="input__container">
                          <label htmlFor="departureTime">
                            Departure Time{" "}
                            <span className="required_field">*</span>
                          </label>
                          <input
                            id="aTime"
                            name="departureTime"
                            type="time"
                            className="input-element"
                            {...register("departureTime", {
                              required: "Select Time",
                            })}
                          />

                          {errors.departureTime && (
                            <span className="errorMsg">
                              {errors.departureTime.message}
                            </span>
                          )}
                        </div>
                      </Col>
                    </>
                  )}
                </Row>
                <br />

                <Row className="row__container">
                  <label>
                    Sight Seeing <span className="required_field">*</span>
                  </label>
                  <br />
                  <Col md={4}>
                    <div style={{ marginTop: "10px", padding: "5px" }}>
                      <Controller
                        name="FullDay"
                        {...register("FullDay")}
                        control={control}
                        render={({ field }) => (
                          <input
                            type="checkbox"
                            {...field}
                            checked={field.value || false}
                          />
                        )}
                      />
                      <label
                        style={{
                          marginLeft: "5px",

                          color: "black",
                        }}>
                        Full Day
                      </label>
                      {watchAllFields.FullDay == true && (
                        <input
                          type="text"
                          name="totalFullDays"
                          className="input__text"
                          placeholder="Tot. Days"
                        />
                      )}
                    </div>
                  </Col>
                  <Col md={4}>
                    <div style={{ marginTop: "10px", padding: "5px" }}>
                      <Controller
                        name="halfDay"
                        {...register("halfDay")}
                        control={control}
                        render={({ field }) => (
                          <input
                            type="checkbox"
                            {...field}
                            checked={field.value || false}
                            style={{ marginRight: "5px" }}
                          />
                        )}
                      />

                      <label
                        style={{
                          marginLeft: "5px",
                          color: "black",
                        }}>
                        Half Day
                      </label>
                      {watchAllFields.halfDay == true && (
                        <>
                          <input
                            type="text"
                            name="totalHalfDays"
                            className="input__text"
                            placeholder="Tot. Days"
                          />
                        </>
                      )}
                    </div>
                  </Col>

                  <Col md={4}>
                    <div style={{ marginTop: "10px", padding: "5px" }}>
                      <Controller
                        name="AllPopularSites"
                        {...register("AllPopularSites")}
                        control={control}
                        render={({ field }) => (
                          <input
                            type="checkbox"
                            {...field}
                            checked={field.value || false}
                            style={{ marginRight: "5px" }}
                          />
                        )}
                      />
                      <label style={{ marginLeft: "5px", color: "black" }}>
                        All Popular Sites
                      </label>
                    </div>
                  </Col>
                  {/* <Row className="row__container">
                    <Col md={4}>
                      <div className="input__container">
                        <label htmlFor="galaSize">
                          Specify
                          <span className="required_field">*</span>
                        </label>
                        <input
                          type="text"
                          id="SightSeeingSpecify"
                          placeholder="Specify"
                          className="input-element"
                          name="SightSeeingSpecify"
                          {...register("SightSeeingSpecify", {})}
                        />
                      </div>
                    </Col>
                  </Row> */}
                  <Col md={4}>
                    <div style={{ marginTop: "10px", padding: "5px" }}>
                      <Controller
                        name="Specify"
                        {...register("Specify")}
                        control={control}
                        render={({ field }) => (
                          <input
                            type="checkbox"
                            {...field}
                            checked={field.value || false}
                            style={{ marginRight: "5px" }}
                          />
                        )}
                      />
                      <label style={{ marginLeft: "5px", color: "black" }}>
                        Specify
                      </label>
                      {watchAllFields.Specify == true && (
                        <>
                          <input
                            type="text"
                            name="sightSeeingSpecify"
                            className=""
                            placeholder="Specify"
                          />
                        </>
                      )}
                    </div>
                  </Col>

                  {isSight &&
                  !watchAllFields.FullDay &&
                  !watchAllFields.halfDay &&
                  !watchAllFields.AllPopularSites &&
                  !watchAllFields.otherSite ? (
                    <>
                      <br />
                      <span className="errorMsg">
                        At least one must be selected.
                      </span>
                    </>
                  ) : null}
                </Row>
              </>
            )}

            {/* md={watchAllFields.galaDinner === "Yes" ? 4 : 6} */}

            {/* <Row className="row__container">
              <p className="services">Other Services</p>
              
              <Col md={4}>
                <div className="input__container">
                  <label htmlFor="galaDinner">
                    Gala dinner in hotel{" "}
                    <span className="required_field">*</span>
                  </label>
                  <select
                    id="galaDinner"
                    name="galaDinner"
                    className="input-element"
                    {...register("galaDinner", {
                      required: "Select from list",
                    })}>
                    <option value="">--Select--</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {errors.galaDinner && (
                    <span className="errorMsg">
                      {errors.galaDinner.message}
                    </span>
                  )}
                </div>
              </Col>

              <Col md={4}>
                <div className="input__container">
                  <label htmlFor="galaDinnerDate">
                    Gala Dinner Date
                    <span className="required_field">*</span>
                  </label>
                  <input
                    id="galaDinnerDate"
                    name="galaDinnerDate"
                    type="date"
                    className="input-element"
                    {...register("galaDinnerDate", {
                      required: "Select Date",
                    })}
                  />

                  {errors.galaDinnerDate && (
                    <span className="errorMsg">
                      {errors.galaDinnerDate.message}
                    </span>
                  )}
                </div>
              </Col>

              <Col md={4}>
                <div className="input__container">
                  <label htmlFor="galaSize">
                    Group size for Gala Dinner
                    <span className="required_field">*</span>
                  </label>
                  <input
                    type="text"
                    id="galaSize"
                    placeholder="Group size Gala Dinner"
                    className="input-element"
                    name="galaSize"
                    {...register("galaSize", {
                      required: "Please enter Group Size",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Enter Valid no",
                      },
                    })}
                  />
                  {errors.galaSize && (
                    <span className="errorMsg">{errors.galaSize.message}</span>
                  )}
                </div>
              </Col>
            </Row> */}

            {/* <Row className="row__container">
              <Col md={4}>
                <div className="input__container">
                  <label htmlFor="LunchIndianRestaurantCount">
                    Lunch at Indian Restaurant
                    <span className="required_field">*</span>
                  </label>
                  <input
                    type="text"
                    id="LunchIndianRestaurantCount"
                    placeholder="Group size"
                    className="input-element"
                    name="LunchIndianRestaurantCount"
                    {...register("LunchIndianRestaurantCount", {
                      required: "Please enter Group Size",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Enter Valid no",
                      },
                    })}
                  />
                  {errors.LunchIndianRestaurantCount && (
                    <span className="errorMsg">
                      {errors.LunchIndianRestaurantCount.message}
                    </span>
                  )}
                </div>
                <div className="input__container">
                  <label htmlFor="LunchIndianRestaurantCount">
                    Lunch
                    <span className="required_field">*</span>
                  </label>
                  <select
                    id="galaDinner"
                    name="LunchIndianRestaurantCount"
                    className="input-element"
                    {...register("LunchIndianRestaurantCount", {
                      required: "Select from list",
                    })}>
                    <option value="">--Select--</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {errors.LunchIndianRestaurantCount && (
                    <span className="errorMsg">
                      {errors.LunchIndianRestaurantCount.message}
                    </span>
                  )}
                </div>
              </Col>
              <Col md={4}>
                <div className="input__container">
                  <label htmlFor="lunchDate">
                    Lunch Date
                    <span className="required_field">*</span>
                  </label>
                  <input
                    id="lunchDate"
                    name="lunchDate"
                    type="date"
                    className="input-element"
                    {...register("lunchDate", {
                      required: "Select Date",
                    })}
                  />
                  {errors.lunchDate && (
                    <span className="errorMsg">{errors.lunchDate.message}</span>
                  )}
                </div>
              </Col>
              <Col md={4}>
                <div className="input__container">
                  <label htmlFor="lunchSize">
                    Group size for Lunch
                    <span className="required_field">*</span>
                  </label>
                  <input
                    type="text"
                    id="lunchSize"
                    placeholder="Group size Lunch"
                    className="input-element"
                    name="lunchSize"
                    {...register("lunchSize", {
                      required: "Please enter Group Size",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Enter Valid no",
                      },
                    })}
                  />
                  {errors.lunchSize && (
                    <span className="errorMsg">{errors.lunchSize.message}</span>
                  )}
                </div>
              </Col>
            </Row> */}
            {/* <Row className="row__container">
              <Col md={4}>
                <div className="input__container">
                  <label htmlFor="Dinners">
                    Dinners
                    <span className="required_field">*</span>
                  </label>
                  <select
                    id="Dinners"
                    className="input-element"
                    name="Dinners"
                    {...register("Dinners", {
                      required: "Select from list",
                    })}>
                    <option value="">--Select--</option>
                    <option value="DinnerWithLiquorPackageIndianRestaurant">
                      Dinners with Liquor Package at Indian Restaurant
                    </option>
                    <option value="DinnerPackageIndianRestaurant">
                      Dinner without Liquor Package at Indian Restaurant
                    </option>
                  </select>
                  {errors.Dinners && (
                    <span className="errorMsg">{errors.Dinners.message}</span>
                  )}
                </div>
              </Col> */}

            {/* <Col md={4}>
                <div className="input__container">
                  <label htmlFor="dinnerDate">
                    Dinner Date
                    <span className="required_field">*</span>
                  </label>
                  <input
                    id="lunchDate"
                    name="dinnerDate"
                    type="date"
                    className="input-element"
                    {...register("dinnerDate", {
                      required: "Select Date",
                    })}
                  />

                  {errors.dinnerDate && (
                    <span className="errorMsg">
                      {errors.dinnerDate.message}
                    </span>
                  )}
                </div>
              </Col> */}

            {/* <Col md={4}>
                <div className="input__container">
                  <label htmlFor="dinnerSize">
                    Group size for Dinner
                    <span className="required_field">*</span>
                  </label>
                  <input
                    type="text"
                    id="dinnerSize"
                    placeholder="Group size Dinner"
                    className="input-element"
                    name="dinnerSize"
                    {...register("dinnerSize", {
                      required: "Please enter Group Size",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Enter Valid no",
                      },
                    })}
                  />
                  {errors.dinnerSize && (
                    <span className="errorMsg">
                      {errors.dinnerSize.message}
                    </span>
                  )}
                </div>
              </Col> */}

            {/* <Row className="row__container">
              <Col md={4}>
                <div className="input__container">
                  <label htmlFor="DjLightSound">
                    DJ Light & Sound<span className="required_field">*</span>
                  </label>
                  <select
                    id="DjLightSound"
                    name="DjLightSound"
                    className="input-element"
                    {...register("DjLightSound", {
                      required: "Select from list",
                    })}>
                    <option value="">--Select--</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {errors.DjLightSound && (
                    <span className="errorMsg">
                      {errors.DjLightSound.message}
                    </span>
                  )}
                </div>
              </Col>
            </Row> */}

            <button
              type="submit"
              className="btn submit_btn"
              onClick={errorhandle}>
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>
        </Container>
      </main>
      <footer>
        <h3>Queries And Bookings</h3>
        <p className="contact">Contact</p>
        <p className="same">
          <span className="bold_query">Mob: </span>
          <a href="tel:+918010404045" rel="noreferrer" target="_blank">
            {" "}
            +91 8010404045, +91 88000 03048
          </a>
        </p>
        <p className="same">
          <span className="bold_query"> Email:</span>
          <a
            href="mailto:groups@miceandmore.co.in"
            rel="noreferrer"
            target="_blank">
            {" "}
            groups@miceandmore.co.in
          </a>
        </p>
      </footer>
      <Container />
    </>
  );
};

export default App;
