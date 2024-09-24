import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import headerImg from "./assets/Img/mice-logo.png";
import Select from "react-select";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Stack from "react-bootstrap/Stack";
// React Context
import { FormProvider } from "./FormContext";
import { useContext } from "react";
import { FormContext } from "./FormContext";

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
import Spinner from "react-bootstrap/Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import GetQuatation from "./Component/GetQuatation";

const App = () => {
  const MySwal = withReactContent(Swal);
  const [loading, setLoading] = useState(false);
  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [selectedCity, setSelectedCity] = useState("");
  const [countryList, setCountryList] = useState([0]); //use in countr and city old
  const [countryIdMap, setCountryIdMap] = useState({});
  const [statesMap, setStatesMap] = useState({});
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [isSight, setSightClicked] = useState(false);
  const [isSeating, SetSeating] = useState(false);
  const [city, setCity] = useState([]);
  const [country, setCountry] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [manPower, setmanPower] = useState(null);
  // const [selectedOptionDeparture, setSelectedDepartue] = useState(null);
  const [selectedOptionDeparture, setSelectedDepartue] = useState([]);

  const [selectedManpower, setManPowerUpgrade] = useState([]);
  const [selectMealPlan, setSelectMealPlan] = useState([]);
  const [selectMealRate, setSelectMealRate] = useState([]);

  const [selectedGroupVisas, setSelectedGroupVisas] = useState(null);

  const [countryVisaGit, setCountryVisaGit] = useState([]);
  const [visaCountryGroup, setVisaCountryGroup] = useState([]);

  const [travelBeforeCountry, setTravelBeforeCountry] = useState([]);
  const [holdingCountryVisa, setHoldingCountryVisa] = useState([]);
  const [cityValidVisaFit, setCityValidVisaFit] = useState([]);
  const [countriesData, setCountriesData] = useState([]);
  const [citiesData, setCitiesData] = useState({});
  const [visaApplyFrom, setVisaApplyFrom] = useState([]);
  const [departureCityTravel, setCityTravel] = useState([]);
  const [dateError, setDateError] = useState("");
  const [travelClass, setTravelClass] = useState([]);
  const [dateErrorConference, setDateErrorConference] = useState("");

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
    defaultValues: {
      countries: [{ country: null, cities: [] }],
      // Visa GIT Error Message
      totalPaxVisaGroup: "",
      rows: [
        { visaApplyFrom: "", totlaPaxGit: "", gitVisaDays: "", Remarks: "" },
      ],

      TravelRow: [
        {
          departureCityTravel: null,
          cityPaxTravel: null,
          travelClass: null,
          departureTimeTravel: null,
        },
      ],
      // rows: [{ totlaPaxGit: "", Remarks: "" }],
    },
  });

  // conference Error date

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

  const {
    fields: fieldCounties,
    append: appendCountries,
    remove: removeCountries,
  } = useFieldArray({
    control,
    name: "countries",
  });

  // use Context
  const { setFormData } = useContext(FormContext);
  const watchAllFields = watch();
  const errorhandles = () => {
    // Other logic
    setFormData(watchAllFields); // Store form data in context
  };

  // end of use context
  // Watch countries array for changes
  const countries = watch("countries");

  const returnDateFlight = watch("returnDateFlight");
  const departureDateFlight = watch("departureDateFlight");

  useEffect(() => {
    if (
      returnDateFlight &&
      departureDateFlight &&
      departureDateFlight > returnDateFlight
    ) {
      setDateError("Departure cannot be greater than Return date");
    } else {
      setDateError("");
    }
  }, [returnDateFlight, departureDateFlight]);

  // const handleCountryChange = async (index, country) => {
  //   setCountryIdMap((prev) => ({ ...prev, [index]: country.id }));
  //   setValue(`state-${index}`, []); // Reset state field

  //   // Fetch states based on selected country
  //   try {
  //     const response = await axios.post(
  //       `https://countriesnow.space/api/v0.1/countries/cities`,
  //       {
  //         country: country.name,
  //       }
  //     );
  //     const statesData = response.data.data.states.map((state) => ({
  //       value: state.name,
  //       label: state.name,
  //     }));
  //     setStatesMap((prev) => ({ ...prev, [index]: statesData }));
  //   } catch (error) {
  //     console.error("Error fetching states:", error);
  //   }
  // };
  // end for contry and State in select box

  // useEffect(() => {
  //   console.log("hello");
  // }, [city, country]);

  // Travel Row
  const {
    fields: fieldDepartureCity,
    append: appendTravelRow,
    remove: removeTravelRow,
  } = useFieldArray({
    control,
    name: "TravelRow",
  });

  const totalPaxTravel = watch("totalPaxTravel");
  const TravelRow = watch("TravelRow");

  useEffect(() => {
    const totalPax = parseInt(totalPaxTravel) || 0;
    let sumPax = 0;

    TravelRow.forEach((row, index) => {
      const paxValue = parseInt(row.cityPaxTravel) || 0;
      sumPax += paxValue;

      if (paxValue > totalPax) {
        setError(`TravelRow.${index}.cityPaxTravel`, {
          type: "manual",
          message: "Pax value exceeds total Pax",
        });
      } else {
        clearErrors(`TravelRow.${index}.cityPaxTravel`);
      }
    });

    if (sumPax > totalPax) {
      setError("totalSumTravel", {
        type: "manual",
        message: "Total Pax sum exceeds total Pax",
      });
    } else {
      clearErrors("totalSumTravel");
    }
  }, [totalPaxTravel, TravelRow, setError, clearErrors]);

  // Visa GIT Total Pax Error message
  const {
    fields: rowFields,
    append: appendRow,
    remove: removeRow,
  } = useFieldArray({
    control,
    name: "rows",
  });
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
  // End of error message

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
    // ...Array.from(Array(1000), (_, index) => String(index + 1)),
  ];
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
  const manOption = [
    { value: "Emcee", label: "Emcee" },
    { value: "Ushers", label: "Ushers" },
    { value: "Promoters", label: "Promoters" },
    { value: "Supervisor", label: "Supervisor" },
  ];

  const classTravel = [
    { value: "Economy", label: "Economy" },
    { value: "Economy-Premium", label: "Economy Premium" },
    ,
    { value: "Business", label: "Business" },

    { value: "First Class", label: "First Class" },
  ];

  const option = nationalCity.map((city) => ({
    value: city.toLowerCase().replace(/ /g, "-"),
    label: city,
  }));

  const optionVisaGroup = nationalCity.map((city) => ({
    value: city.toLowerCase().replace(/ /g, "-"),
    label: city,
  }));
  var country_list = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antigua &amp; Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia &amp; Herzegovina",
    "Botswana",
    "Brazil",
    "British Virgin Islands",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Cape Verde",
    "Cayman Islands",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Congo",
    "Cook Islands",
    "Costa Rica",
    "Cote D Ivoire",
    "Croatia",
    "Cruise Ship",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Estonia",
    "Ethiopia",
    "Falkland Islands",
    "Faroe Islands",
    "Fiji",
    "Finland",
    "France",
    "French Polynesia",
    "French West Indies",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kuwait",
    "Kyrgyz Republic",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macau",
    "Macedonia",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Nepal",
    "Netherlands",
    "Netherlands Antilles",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Norway",
    "Oman",
    "Pakistan",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Reunion",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Pierre &amp; Miquelon",
    "Samoa",
    "San Marino",
    "Satellite",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "South Africa",
    "South Korea",
    "Spain",
    "Sri Lanka",
    "St Kitts &amp; Nevis",
    "St Lucia",
    "St Vincent",
    "St. Lucia",
    "Sudan",
    "Suriname",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor L'Este",
    "Togo",
    "Tonga",
    "Trinidad &amp; Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks &amp; Caicos",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "Uruguay",
    "Uzbekistan",
    "Venezuela",
    "Vietnam",
    "Virgin Islands (US)",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];
  const travelBef = country_list.map((city) => ({
    value: city.toLowerCase().replace(/ /g, "-"),
    label: city,
  }));

  const optionVisaCity = nationalCity.map((city) => ({
    value: city.toLowerCase().replace(/ /g, "-"),
    label: city,
  }));

  const visaGroupCountrys = country_list.map((city) => ({
    value: city.toLowerCase().replace(/ /g, "-"),
    label: city,
  }));

  const holdingValidVisa = country_list.map((city) => ({
    value: city.toLowerCase().replace(/ /g, "-"),
    label: city,
  }));

  const countryVisaTo = country_list.map((city) => ({
    value: city.toLowerCase().replace(/ /g, "-"),
    label: city,
  }));

  const mealPlan = [
    { value: "CPAI", label: "CPAI" },
    { value: "MAPAI", label: "MAPAI" },
    { value: "PROMOTERS", label: "PROMOTERS" },
    { value: "AP + SNACKS", label: "AP + SNACKS" },
    { value: "OTHERS", label: "OTHERS" },
  ];

  const mealRate = [
    { value: "Breakfast", label: "Breakfast" },
    { value: "Lunch", label: "Lunch" },
    { value: "Dinner", label: "Dinner" },
    { value: "Hi-Tea", label: "Hi-Tea" },
    { value: "snacks", label: "Snacks" },
    { value: "Gala Dinner", label: "Gala dinner" },
    { value: "Others", label: "Others" },
  ];

  const upgradePaid = [
    "Club Room",
    "Jr. Suite",
    "Suite",
    "Dlx",
    "Pres Suite",
    "Other",
    ...Array.from(Array(1000), (_, index) => String(index + 1)),
  ];

  const departureCity = cities.map((city) => ({
    value: city.toLowerCase().replace(/ /g, "-"),
    label: city,
  }));

  // Add Git Apply From Section, total Pax and remark

  const optionGitVisaCity = nationalCity.map((city) => ({
    value: city.toLowerCase().replace(/ /g, "-"),
    label: city,
  }));

  const optionCityTravel = nationalCity.map((city) => ({
    value: city.toLowerCase().replace(/ /g, "-"),
    label: city,
  }));

  // const createOptions = (multiplier) => {
  //   let options = [];
  //   for (let i = 0; i < multiplier; i++) {
  //     options = [
  //       ...options,
  //       ...cities.map((city) => {
  //         ({
  //           value: `${city.toLowerCase().replace(/ /g, "-")}-${i}`,
  //           label: city,
  //         });
  //       }),
  //     ];
  //   }
  //   return options;
  // };
  //
  // const numbers = Array.from({ length: 1000 }, (_, i) => (i + 1).toString());

  // const createOptions = (iteration) => {
  //   const cityOptions = cities.map((city) => ({
  //     value: city.toLowerCase().replace(/ /g, "-"),
  //     label: city,
  //   }));
  //   let numberOptions;
  //   for (let i = 0; i < iteration; i++) {
  //     numberOptions = numbers.map((number) => ({
  //       value: number,
  //       label: number,
  //     }));
  //   }
  //   console.log(numberOptions);
  //   return [...cityOptions, ...numberOptions];
  // };

  // const departureCityd = createOptions(5); // Creates options 5 times to allow multiple selections

  // const handleChange = (selected) => {
  //   setSelectedDepartue(selected);
  // };
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

  // Individual, Walk-in, Friends & Family, , Corporate, staff, Others.

  const individual = [
    "Individual",
    "Walk-in,",
    "Friend & Family",
    "Corporate Personal",
    "Corporate",
    "Staff",
    "Others",
  ];
  const group = [
    "Corporate Group",
    "Wedding",
    "Association",
    "Friends & Family",
    "Others",
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
  const totalCountryVisad = Array.from(
    { length: parseInt(watchAllFields.totalPaxVisa) || 0 },
    (_, i) => i
  );

  const totalInsurancIssueGit = Array.from(
    { length: parseInt(watchAllFields.totalpaxInsurance) || 0 },
    (_, i) => i
  );

  const totalHall = Array.from(
    { length: parseInt(watchAllFields.noOfHalls) },
    (_, i) => i
  );

  // const handleCountry = (index, selected, type) => {
  //   const updatedCountries =
  //     type === "travelBefore"
  //       ? [...travelBeforeCountry]
  //       : [...holdingCountryVisa];
  //   updatedCountries[index] = selected;

  //   if (type === "travelBefore") {
  //     setTravelBeforeCountry(updatedCountries);
  //   } else {
  //     setHoldingCountryVisa(updatedCountries);
  //   }
  // };

  const handelChangeVisaFit = (index, selected, type) => {
    if (type === "travelBefore") {
      const updatedCountries = [...travelBeforeCountry];
      updatedCountries[index] = selected;
      setTravelBeforeCountry(updatedCountries);
    } else if (type === "holdingVisa") {
      const updatedCountries = [...holdingCountryVisa];
      updatedCountries[index] = selected;
      setHoldingCountryVisa(updatedCountries);
    } else if (type === "cityValidVisaFit") {
      const updatedCities = [...cityValidVisaFit];
      updatedCities[index] = selected;
      setCityValidVisaFit(updatedCities);
    } else if (type === "visaApplyFrom") {
      const updatedCities = [...visaApplyFrom];
      updatedCities[index] = selected;
      setVisaApplyFrom(updatedCities);
    } else if (type === "departureCityTravel") {
      const updatedCities = [...departureCityTravel];
      updatedCities[index] = selected;
      setCityTravel(updatedCities);
    } else if (type === "travelClass") {
      const updatedCities = [...travelClass];
      updatedCities[index] = selected;
      setTravelClass(updatedCities);
    }
  };

  // Fetch countries data on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://countriesnow.space/api/v0.1/countries/iso"
        );
        const countries = response.data.data.map((country) => ({
          value: country.name,
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

  const addCountry = () => {
    setValue("countries", [...countries, { country: null, cities: [] }]);
  };

  const removeCountry = (index) => {
    const newCountries = [...countries];
    const updatedCountries = newCountries.filter((_, i) => i !== index);
    // newCountries.splice(index, 1);
    setValue("countries", newCountries);
  };

  const onSubmit = (data) => {
    console.log(data, "chutia");
    if (
      !watchAllFields.travelBooking &&
      !watchAllFields.hotelArrangements &&
      !watchAllFields.landArrangement &&
      !watchAllFields.event &&
      !watchAllFields.insurance &&
      !watchAllFields.visaRequirement
    ) {
      alert("Please select the Services");
      return;
    }

    console.log(data, "hello data");
    let googleSheetData = {
      GroupType: data.groupType,
      BookingCategory: data.bookingCategory,
      BookingCategoryOtherComments: data.Comments,
      CompanyName: data.company__name,
      Name: data.contactPerson,
      Email: data.email,
      Phone: data.phone,
      Period: data.period,
      HotelDuration: data.hotelDuration,
      GroupSize: data.groupSize,
      NoofPaxFit: data.noOfPaxFit,
      Place: data.destination,
      CheckBoxTravelBooking: data.travelBooking,
      checkBoxVisaRequirement: data.visaRequirement,
      checkBoxInsurance: data.insurance,
      CheckBoxHotelArrangements: data.hotelArrangements,
      CheckBoxEvent: data.event,
      CheckBoxLandArrangements: data.landArrangement,

      // Visa requirement fit
      FitVisaPax: data.totalPaxVisa,
      FitVisaDuration: data.visaPreferredDuration,
      FitVisaType: data.visaTypeFit,
      FitvisaTravelFrom: data.fitVisaTravelFrom,
      FitvisaTravelTo: data.fitVisaTravelTo,

      // Visa requrement Git
      GitVisaPax: data.totalPaxVisaGroup,
      GitVisaDuration: data.visaPreferredDurationGroup,

      // Travel Flights

      TravelBookingType: data.travelBookingType,
      TotaxPaxTravel: data.totalPaxTravel,
      TravelDepartureDate: data.departureDateFlight,
      TravelReturnDate: data.returnDateFlight,

      //  Insurance Git
      TotalPaxGitInsurance: data.totalpaxInsuranceGroup,
      InsurancePlanGit: data.insurancePlanGroup,
      InsuranceDuration: data.totalDaysInsuranceGroup,
      // Insurance Fit
      InsuranceFitTotalPax: data.totalpaxInsurance,
      InsuranceFitPlan: data.insurancePlan,
      InsuranceAmount: data.insuranceAmount,
      InsuranceDurationFit: data.totalDaysInsurance,

      // Hotel
      PurposeOfTravle: data.purposeOfTravel,
      TravelReasons: data?.travelReasons,

      ApproxDBL: data.approxDBL,
      ApproxSGL: data.approxSGL,
      HotelCategory: data.hotelCategory,
      HotelRoomType: data.roomType,

      liqure: data.liquor,
      liquePackage: data?.liquePackage,

      ConferenceHall: data.conferenceHall,
      HallInSqFt: data.squareFeet,
      HallInSqMtr: data.squareMeters,
      TotalHall: data.noOfHalls,
      ConferenceDuration: data.duration,
      SetUpDate: data.setUpDate,
      conferenceStartDate: data.conferenceStartDate,
      conferenceEndDate: data.conferenceEndDate,

      SeatingRound: data.RoundTable,
      SeatingHalfMoon: data.HalfMoon,
      SeatingClassroom: data.ClassRoom,
      SeatingTheatre: data.Theatre,
      SeatingUshape: data.UShape,
      SeatingCockTail: data.Cocktail,
      SeatingOther: data.Others,
      floorPlanLink: data?.floorPlanLink,

      // Land Arrangement

      AirportArrivalTransfers: data.airportArrivalTransfers,
      AirportArrivalDate: data?.arrvilaDate,
      AirportTime: data?.departureTime,

      AirportDepartureTransfers: data.airportDepartureTrans,
      AirportDepartureDate: data?.departureDate,
      AirportDepartureTime: data?.arrvilTime,

      SightSeeingFullDay: data.FullDay,
      SightSeeingTotDaysFull: data?.totalFullDaysSightSeeing,

      SightSeeingHalfDay: data.halfDay,
      SightSeeingTotDaysHalf: data?.totalHalfDaysSightSeeing,

      SightSeeingAllPopularSite: data.AllPopularSites,
      SightSeeingSpecify: data.Specify,
      SightSeeingSpeciytDetails: data?.sightSeeingSpecify,

      //  Event Arragement
      Stage: data.stage,
      stageSidePanel: data.stageSidePanel,
      podiumsWithBranding: data.podiumsWithBranding,
      Steps: data.Steps,
      EntryGateArch: data.EntryGateArch,
      paSystem: data.paSystem,
      BaseStageMonitor: data.BaseStageMonitor,
      ChannelMixer: data.ChannelMixer,
      Mic: data.Mic,
      PioneerDJMixing: data.PioneerDJMixing,
      upsGreenGensets: data.upsGreenGensets,
      lights: data.lights,
      HazeMachine: data.HazeMachine,
      SeamlessSwitcher: data.SeamlessSwitcher,
      WatchoutServer: data.WatchoutServer,
      PreviewMonitor: data.PreviewMonitor,
      HdSdiSplitter: data.HdSdiSplitter,
      AvoliteBoard: data.AvoliteBoard,
      LEDWalls: data.LEDWalls,
      Photographer: data.Photographer,
      photTotalDays: data?.photTotalDays,
      Videographer: data.Videographer,
      videoTotDays: data?.videoTotDays,
      Trusses: data.Trusses,
    };

    // for adding Country and city list
    if (data.destination == "international") {
      for (let i = 0; i < fieldCounties.length; i++) {
        let index = i.toString();
        let cityValue = "cityValue" + index;
        let countryValue = "countryValue" + index;
        // console.log(data.countries[i].country.label, "My ccoon");
        let cityName = data.countries[i].cities
          ?.map((item) => item.value)
          .join(", ");
        googleSheetData[countryValue] = data.countries[i].country.label;
        googleSheetData[cityValue] = cityName;
      }
    }

    if (data.destination == "national") {
      const national__city = data.national__city
        .map((item) => item.value)
        .join(", ");
      googleSheetData.nationals = national__city;
    }
    const CountryVisaFit =
      data?.countryVisaFit?.map((item) => item.value).join(", ") || "";
    googleSheetData.countryVisaFit = CountryVisaFit;

    const CountryVisaGit =
      data?.visaCountryGroup?.map((item) => item.value).join(", ") || "";
    googleSheetData.countryVisaGit = CountryVisaGit;

    totalCountryVisad?.map((item, i) => {
      let index = i.toString();
      let passportNoFit = "passprtNoFit" + index;
      let poiFit = "poiFit" + index;
      let doiFit = "doiFit" + index;
      let doeFit = "doeFit" + index;
      let travelBefore = "travelBefore" + index;
      let holdingValid = "holdingValid" + index;
      let visaValidCou = "visaValidCou" + index;
      let travelBeforeFit = data[`TravelledBefore${i}`]
        .map((item) => item.value)
        .join(", ");
      let HoldingValidVisaFit = data[`HoldingValidVisa${i}`]
        .map((item) => item.value)
        .join(", ");

      let cityValidVisaFit = data[`cityValidVisa${i}`]
        .map((item) => item.value)
        .join(", ");
      googleSheetData[passportNoFit] = data[`passportNoFit${i}`];
      googleSheetData[poiFit] = data[`poi${i}`];
      googleSheetData[doiFit] = data[`doi${i}`];
      googleSheetData[doeFit] = data[`doe${i}`];
      googleSheetData[travelBefore] = travelBeforeFit;
      googleSheetData[holdingValid] = HoldingValidVisaFit;
      googleSheetData[visaValidCou] = cityValidVisaFit;
    });

    const mealPlan =
      data?.mealPlan?.map((item, index) => item.value).join(", ") || "";
    googleSheetData.mealPlan = mealPlan;
    const mealRate =
      data?.mealRate?.map((item, index) => item.value).join(", ") || "";
    googleSheetData.mealRate = mealRate;

    const manPower =
      data?.manpowerStaffing?.map((item, index) => item.value).join(", ") || "";

    googleSheetData.manpowerStaffing = manPower;

    rowFields?.map((item, i) => {
      let index = i.toString();
      let city = "cityVisaApplyFrom" + index;
      let pax = "GitNoOFPaxVisa" + index;
      let days = "GitVisaDays" + index;
      let Remarks = "GitVisaRemarks" + index;

      let visaApplyFromGit = data[`visaApplyFrom${i}`]
        ?.map((item) => item.value)
        .join(", ");
      // console.log(visaApplyFromGit, "city...");
      googleSheetData[city] = visaApplyFromGit;
      googleSheetData[pax] = data[`rows.${index}.totlaPaxGit`];
      googleSheetData[days] = data[`gitVisaDays${i}`];
      googleSheetData[Remarks] = data[`Remarks${i}`];
    });

    fieldDepartureCity?.map((item, i) => {
      let index = i.toString();
      let city = "travelFlightCity" + index;
      let pax = "travelFlightPax" + index;
      let travelClass = "travelFlightClass" + index;
      let flightTime = "travelFlightTime" + index;

      let departureCityTravel = data[`departureCityTravel${i}`]
        ?.map((item) => item.value)
        .join(", ");
      // console.log(departureCityTravel, "Teki");
      googleSheetData[city] = departureCityTravel;
      googleSheetData[pax] = data[`TravelRow.${i}.cityPaxTravel`];
      googleSheetData[travelClass] = data[`travelClass${i}`]?.value;
      googleSheetData[flightTime] = data[`departureTimeTravel${i}`];
    });

    // totalInsurancIssueGit.map((item, i) => {
    //   let index = i.toString();
    //   let family = "familyName" + index;
    //   let firstName = "firstName" + index;
    //   let middleName = "middleName" + index;
    //   let pass = "passportNumberIn" + index;
    //   let passExpiry = "passportExpiry" + index;
    //   let Dob = "dateOfBirth" + index;
    //   let addre = "address" + index;
    //   let nomin = "nominee" + index;
    //   let MedHis = "medicalHistory" + index;
    //   googleSheetData[family] = data[`familyName${i}`];
    //   googleSheetData[firstName] = data[`firstName${i}`];
    //   googleSheetData[middleName] = data[`middleName${i}`];
    //   googleSheetData[pass] = data[`passportNumber${i}`];
    //   googleSheetData[passExpiry] = data[`passportExpiry${i}`];

    //   googleSheetData[Dob] = data[`dobInsu${i}`];
    //   googleSheetData[addre] = data[`address${i}`];

    //   googleSheetData[nomin] = data[`Nominee${i}`];
    //   googleSheetData[MedHis] = data[`medicalHistory${i}`];
    // });

    totalHall?.map((item, i) => {
      let index = i.toString();
      let venueName = "VenueName" + index;
      googleSheetData[venueName] = data[`VenueName${index}`];
    });

    agenda__number?.map((item, i) => {
      let index = i.toString();
      let conferAgendaTime = "ConferenceAgendaTime" + index;
      googleSheetData[conferAgendaTime] = data[`ConferenceAgendaTime-${i}`];

      totalHall?.map((it, idx) => {
        let inde = idx.toString();
        let conferenceActivity = "conferenceActivity" + index + inde;
        googleSheetData[conferenceActivity] =
          data[`ConferenceAgendaActivityHall${i}-${idx}`];
      });
    });

    // console.log(googleSheetData, "G-data");
    // setLoading(true);
    // fetch(import.meta.env.VITE_BOOKING_REQUEST, {
    //   method: "POST",
    //   mode: "cors",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((r) => r.json())
    //   .then((data) => {
    //     // The response comes here
    //     console.log(data, "hello sucessful");

    //     MySwal.fire({
    //       icon: "success",
    //       title:
    //         "Thank you for submitting your information. We will connect you soon",
    //     });
    //     setTimeout(() => {
    //       setLoading(false);
    //       // reset();
    //     }, 1000);
    //   })
    //   .catch((error) => {
    //     // Errors are reported there
    //     console.log(error);
    //     MySwal.fire({
    //       icon: "error",
    //       title: "Oops...",
    //       text: "Try after some time",
    //     });
    //     console.error("Error fetching data:", error);
    //     setTimeout(() => {
    //       setLoading(false);
    //       // reset();
    //     }, 1000 * 2);
    //   });

    setLoading(true);
    // Sheet.Best
    // axios
    //   .post(import.meta.env.VITE_BOOKING_REQUESTDB, googleSheetData)
    //   .then((response) => {
    //     console.log(response);
    //     MySwal.fire({
    //       icon: "success",
    //       title:
    //         "Thank you for submitting your information. We will connect you soon",
    //     });
    //     setTimeout(() => {
    //       setLoading(false);
    //       reset();
    //     }, 1000);
    //   })
    //   .catch((error) => {
    //     MySwal.fire({
    //       icon: "error",
    //       title: "Oops...",
    //       text: "Try after some time",
    //     });
    //     console.error("Error fetching data:", error);
    //     setTimeout(() => {
    //       setLoading(false);
    //       reset();
    //     }, 1000 * 2);
    //   });
  };

  return (
    <FormProvider>
      <>
        <header>
          <img src={headerImg} width={160}></img>
        </header>
        <main>
          <Container>
            <form
              name="FlightHotelForms"
              className="form__main"
              method="post"
              ref={form}
              onSubmit={handleSubmit(onSubmit)}>
              <h2 className="room_reservation_text" id="bookingText">
                Query Form
              </h2>
              <Row className="row__container">
                <Col md={watchAllFields.bookingCategory === "Others" ? 3 : 4}>
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
                      <option value="Group">GIT</option>
                      <option value="Individual">FIT</option>
                    </select>
                    {errors.groupType && (
                      <span className="errorMsg">
                        {errors.groupType.message}
                      </span>
                    )}
                  </div>
                </Col>
                <Col md={watchAllFields.bookingCategory === "Others" ? 3 : 4}>
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
                <Col md={watchAllFields.bookingCategory === "Others" ? 3 : 4}>
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
                {watchAllFields.bookingCategory == "Others" && (
                  <Col md={watchAllFields.bookingCategory === "Others" ? 3 : 4}>
                    <div className="input__container">
                      <label htmlFor="Comments">
                        Comments <span className="required_field">*</span>
                      </label>
                      <input
                        type="text"
                        id="Comments"
                        placeholder="Comment"
                        className="input-element"
                        name="Comments"
                        {...register("Comments", {
                          required: "Comments is required",
                        })}
                      />
                      {errors.Comments && (
                        <span className="errorMsg">
                          {errors.Comments.message}
                        </span>
                      )}
                    </div>
                  </Col>
                )}
              </Row>
              <Row className="row__container">
                <Col md={3}>
                  <div className="input__container">
                    <label htmlFor="company__name">
                      Company Name <span className="required_field">*</span>
                    </label>
                    <input
                      type="text"
                      id="company__name"
                      placeholder="Company Name"
                      className="input-element"
                      name="company__name"
                      {...register("company__name", {
                        required: "Company name is required.",
                      })}
                    />
                    {errors.company__name && (
                      <span className="errorMsg">
                        {errors.company__name.message}
                      </span>
                    )}
                  </div>
                </Col>

                <Col md={3}>
                  <div className="input__container">
                    <label htmlFor="contactPerson">
                      Contact Person <span className="required_field">*</span>
                    </label>
                    <input
                      type="text"
                      id="contactPerson"
                      placeholder="Enter Name"
                      className="input-element"
                      name="contactPerson"
                      {...register("contactPerson", {
                        required: "Name is required.",
                        pattern: {
                          value: /^[a-zA-Z ]*$/,
                          message: "Enter Valid Name",
                        },
                        minLength: {
                          value: 3,
                          message: "Name should be at least 3 characters.",
                        },
                      })}
                    />
                    {errors.contactPerson && (
                      <span className="errorMsg">
                        {errors.contactPerson.message}
                      </span>
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
                <Col md={3}>
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
                      <span className="errorMsg">{errors.period.message}</span>
                    )}
                  </div>
                </Col>
                <Col md={3}>
                  <div className="input__container">
                    <label htmlFor="hotelDuration">
                      Duration <span className="required_field">*</span>
                    </label>
                    <input
                      type="text"
                      id="hotelDuration"
                      placeholder="Duration. ex 5 nights "
                      className="input-element"
                      name="hotelDuration"
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
                {watchAllFields.groupType == "Group" && (
                  <Col md={3}>
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
                )}
                {watchAllFields.groupType == "Individual" && (
                  <Col md={3}>
                    <div className="input__container">
                      <label htmlFor="noOfPaxFit">
                        No. of PAX <span className="required_field">*</span>
                      </label>
                      <select
                        id="Place"
                        name="noOfPaxFit"
                        className="input-element"
                        {...register("noOfPaxFit", {
                          required: "Select Group Type from list",
                        })}>
                        <option value="">--Select--</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                      </select>
                      {errors.noOfPaxFit && (
                        <span className="errorMsg">
                          {errors.noOfPaxFit.message}
                        </span>
                      )}
                    </div>
                  </Col>
                )}
              </Row>

              {watchAllFields.destination === "national" && (
                <Row className="row__container">
                  <Col md={12}>
                    <Row className="row__container">
                      <Col md={12}>
                        <div className="input__container">
                          <label htmlFor="cities">
                            Select a city
                            <span className="required_field">*</span>
                          </label>

                          <Controller
                            name="national__city"
                            control={control}
                            rules={{ required: "City is required" }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                options={option}
                                isMulti
                                onChange={(selected) => {
                                  field.onChange(selected);
                                  setSelectedOption(selected);
                                  if (selected) {
                                    clearErrors("national__city");
                                  }
                                }}
                                value={selectedOption}
                              />
                            )}
                          />
                          {errors.national__city && (
                            <span className="errorMsg">
                              {errors.national__city.message}
                            </span>
                          )}
                          {/* <Controller
                          name="national__city"
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              defaultValue={selectedOption}
                              onChange={setSelectedOption}
                              {...register("national__city", {
                                required: "City is required",
                              })}
                              options={option}
                              isMulti
                            />
                          )}
                        />

                        {errors.national__city && (
                          <span className="errorMsg">
                            {errors.national__city.message}
                          </span>
                        )} */}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              )}

              {watchAllFields.destination === "international" && (
                <>
                  {fieldCounties.map((item, index) => (
                    <Row className="row__container" key={item.id}>
                      <Col md={5}>
                        <div className="input__container">
                          <label htmlFor={`countries[${index}].country`}>
                            Select a Country
                            <span className="required_field">*</span>
                          </label>
                          <Controller
                            name={`countries[${index}].country`}
                            control={control}
                            rules={{ required: "Country is required" }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                options={countriesData}
                                onChange={(selectedCountry) =>
                                  handleCountryChange(index, selectedCountry)
                                }
                                placeholder="Select country"
                              />
                            )}
                          />
                          {errors.countries?.[index]?.country && (
                            <p style={{ color: "red" }}>
                              {errors.countries[index].country.message}
                            </p>
                          )}
                        </div>
                      </Col>
                      <Col md={5}>
                        <div className="input__container">
                          <label htmlFor={`countries[${index}].cities`}>
                            Select a city
                            <span className="required_field">*</span>
                          </label>

                          <Controller
                            name={`countries[${index}].cities`}
                            control={control}
                            rules={{
                              required: "At least one city is required",
                            }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                options={citiesData[index] || []}
                                isMulti
                                placeholder="Select cities"
                              />
                            )}
                          />
                          {errors.countries?.[index]?.cities && (
                            <p style={{ color: "red" }}>
                              {errors.countries[index].cities.message}
                            </p>
                          )}
                        </div>
                      </Col>
                      <Col md={2} className="mt-4">
                        <Button
                          type="button"
                          className="btn btn-danger"
                          size="sm"
                          onClick={() => removeCountries(index)}>
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  ))}
                  <Row className="row__container">
                    <Col md={2}>
                      <Button
                        type="button"
                        size="sm"
                        onClick={() =>
                          appendCountries({ country: null, cities: [] })
                        }>
                        Add Country
                      </Button>
                    </Col>
                  </Row>
                </>
              )}
              <br />

              <Row className="row__container">
                <label>
                  Services Required
                  <span className="required_field">*</span>
                </label>
                <br />
                <Col
                  md={watchAllFields.destination === "international" ? 4 : 3}>
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
                      Travel
                    </label>
                  </div>
                </Col>
                {watchAllFields.destination == "international" && (
                  <>
                    <Col
                      md={
                        watchAllFields.destination === "international" ? 4 : 3
                      }>
                      <div style={{ marginTop: "10px", padding: "5px" }}>
                        <Controller
                          name="visaRequirement"
                          {...register("visaRequirement")}
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
                          Visa
                        </label>
                      </div>
                    </Col>

                    <Col
                      md={
                        watchAllFields.destination === "international" ? 4 : 3
                      }>
                      <div style={{ marginTop: "10px", padding: "5px" }}>
                        <Controller
                          name="insurance"
                          {...register("insurance")}
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
                          Insurance
                        </label>
                      </div>
                    </Col>
                  </>
                )}

                <Col
                  md={watchAllFields.destination === "international" ? 4 : 3}>
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
                      Hotel
                    </label>
                  </div>
                </Col>

                <Col
                  md={watchAllFields.destination === "international" ? 4 : 3}>
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
                      Event
                    </label>
                  </div>
                </Col>

                <Col
                  md={watchAllFields.destination === "international" ? 4 : 3}>
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
                      Land
                    </label>
                  </div>
                </Col>

                {isSubmitClicked &&
                !watchAllFields.travelBooking &&
                !watchAllFields.hotelArrangements &&
                !watchAllFields.landArrangement &&
                !watchAllFields.insurance &&
                !watchAllFields.visaRequirement &&
                !watchAllFields.event ? (
                  <>
                    <br />
                    <span className="errorMsg">
                      At least one service must be selected.
                    </span>
                  </>
                ) : null}
              </Row>

              {watchAllFields.visaRequirement &&
                watchAllFields.groupType &&
                watchAllFields.destination === "international" && (
                  <>
                    {watchAllFields.groupType == "Individual" && (
                      <>
                        <Row className="row__container ">
                          <div>
                            <p className="services">Visa Requirement</p>
                            <Row>
                              <Col md={6}>
                                <div className="input__container">
                                  <label htmlFor="totalPaxVisa">
                                    No of Pax
                                    <span className="required_field">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    id="totalPaxVisa"
                                    className="input-element"
                                    placeholder="Number of Pax"
                                    name="totalPaxVisa"
                                    {...register("totalPaxVisa", {
                                      required: "Total No of Pax",
                                      pattern: {
                                        value: /^[0-9]+$/,
                                        message: "Enter Valid no",
                                      },
                                    })}
                                  />
                                  {errors.totalPaxVisa && (
                                    <span className="errorMsg">
                                      {errors.totalPaxVisa.message}
                                    </span>
                                  )}
                                </div>
                              </Col>
                              <Col md={6}>
                                <div className="input__container">
                                  <label htmlFor="visaPreferredDuration">
                                    Preferred duration{" "}
                                    <span className="required_field">*</span>
                                  </label>

                                  <select
                                    id="Place"
                                    name="visaPreferredDuration"
                                    className="input-element"
                                    {...register("visaPreferredDuration", {
                                      required: "Select from list",
                                    })}>
                                    <option value="">--Select--</option>
                                    <option value="6Months"> 6 months</option>
                                    <option value="2Yrs">2 Yrs.</option>
                                    <option value="5Yrs"> 5 Yrs.</option>
                                    <option value="10Yrs">10 Yrs</option>
                                    <option value="Multiple">Multiple</option>
                                    <option value="Groups">Groups</option>
                                    <option value="TransitVisa">
                                      Transit Visa
                                    </option>
                                    <option value="Other">Other</option>
                                  </select>
                                  {errors.visaPreferredDuration && (
                                    <span className="errorMsg">
                                      {errors.visaPreferredDuration.message}
                                    </span>
                                  )}
                                </div>
                              </Col>
                            </Row>
                            <Row className="row__container">
                              <Col md={3}>
                                <div className="input__container">
                                  <label htmlFor="countryVisaFit">
                                    Country's / VISA Required
                                    <span className="required_field">*</span>
                                  </label>
                                  <Controller
                                    name="countryVisaFit"
                                    control={control}
                                    rules={{ required: "Select from list" }}
                                    render={({ field }) => (
                                      <Select
                                        {...field}
                                        options={countryVisaTo}
                                        isMulti
                                        onChange={(selected) => {
                                          field.onChange(selected);
                                          setCountryVisaGit(selected);
                                          if (selected) {
                                            clearErrors("countryVisaFit");
                                          }
                                        }}
                                        value={countryVisaGit}
                                      />
                                    )}
                                  />

                                  {errors.countryVisaFit && (
                                    <span className="errorMsg">
                                      {errors.countryVisaFit.message}
                                    </span>
                                  )}
                                </div>
                              </Col>

                              <Col md={3}>
                                <div className="input__container">
                                  <label htmlFor="visaTypeFit">
                                    Visa Type{" "}
                                    <span className="required_field">*</span>
                                  </label>
                                  <select
                                    id="Place"
                                    name="visaTypeFit"
                                    className="input-element"
                                    {...register("visaTypeFit", {
                                      required: "Select from list",
                                    })}>
                                    <option value="">--Select--</option>
                                    <option value="Business">Business</option>
                                    <option value="Tourist">Tourist</option>
                                  </select>
                                  {errors.visaTypeFit && (
                                    <span className="errorMsg">
                                      {errors.visaTypeFit.message}
                                    </span>
                                  )}
                                </div>
                              </Col>
                              <Col md={3}>
                                <div className="input__container">
                                  <label htmlFor="fitVisaTravelFrom">
                                    Travel Date From
                                    <span className="required_field">*</span>
                                  </label>
                                  <input
                                    id="fitVisaTravelFrom"
                                    name="fitVisaTravelFrom"
                                    type="date"
                                    className="input-element"
                                    {...register("fitVisaTravelFrom", {
                                      required: "Select Date",
                                    })}
                                  />

                                  {errors.fitVisaTravelFrom && (
                                    <span className="errorMsg">
                                      {errors.fitVisaTravelFrom.message}
                                    </span>
                                  )}
                                </div>
                              </Col>

                              <Col md={3}>
                                <div className="input__container">
                                  <label htmlFor="fitVisaTravelTo">
                                    Travel Date To
                                    <span className="required_field">*</span>
                                  </label>
                                  <input
                                    id="fitVisaTravelTo"
                                    name="fitVisaTravelTo"
                                    type="date"
                                    className="input-element"
                                    {...register("fitVisaTravelTo", {
                                      required: "Select Date",
                                    })}
                                  />

                                  {errors.fitVisaTravelTo && (
                                    <span className="errorMsg">
                                      {errors.fitVisaTravelTo.message}
                                    </span>
                                  )}
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Row>
                        {totalCountryVisad.map((item, index) => {
                          return (
                            <Row className="row__container" key={index}>
                              <p className="services">Traveller {index + 1}</p>
                              <Row>
                                <Col md={3}>
                                  <div className="input__container">
                                    <label htmlFor={`passportNoFit${index}`}>
                                      Passport No
                                      <span className="required_field">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      id="passportNoFit"
                                      className="input-element"
                                      placeholder="Passport No"
                                      name={`passportNoFit${index}`}
                                      {...register(`passportNoFit${index}`, {
                                        required: "Please enter Passport No",
                                      })}
                                    />
                                    {errors[`passportNoFit${index}`] && (
                                      <span className="errorMsg">
                                        {
                                          errors[`passportNoFit${index}`]
                                            .message
                                        }
                                      </span>
                                    )}
                                  </div>
                                </Col>

                                <Col md={3}>
                                  <div className="input__container">
                                    <label htmlFor={`poi${index}`}>
                                      POI
                                      <span className="required_field">*</span>
                                    </label>
                                    <input
                                      id="poi"
                                      name={`poi${index}`}
                                      type="text"
                                      placeholder="Place of issue"
                                      className="input-element"
                                      {...register(`poi${index}`, {
                                        required: "Select Date",
                                      })}
                                    />

                                    {errors[`poi${index}`] && (
                                      <span className="errorMsg">
                                        {errors[`poi${index}`].message}
                                      </span>
                                    )}
                                  </div>
                                </Col>

                                <Col md={3}>
                                  <div className="input__container">
                                    <label htmlFor={`doi${index}`}>
                                      DOI
                                      <span className="required_field">*</span>
                                    </label>
                                    <input
                                      id="doi"
                                      name={`doi${index}`}
                                      type="date"
                                      className="input-element"
                                      {...register(`doi${index}`, {
                                        required: "Select Date",
                                      })}
                                    />

                                    {errors[`doi${index}`] && (
                                      <span className="errorMsg">
                                        {errors[`doi${index}`].message}
                                      </span>
                                    )}
                                  </div>
                                </Col>
                                <Col md={3}>
                                  <div className="input__container">
                                    <label htmlFor={`doe${index}`}>
                                      DOE
                                      <span className="required_field">*</span>
                                    </label>
                                    <input
                                      id="doe"
                                      name={`doe${index}`}
                                      type="date"
                                      className="input-element"
                                      {...register(`doe${index}`, {
                                        required: "Select Date",
                                      })}
                                    />

                                    {errors[`doe${index}`] && (
                                      <span className="errorMsg">
                                        {errors[`doe${index}`].message}
                                      </span>
                                    )}
                                  </div>
                                </Col>
                              </Row>
                              <Row className="row__container">
                                <Row className="row__container">
                                  <Col md={3}>
                                    <div className="input__container">
                                      <label
                                        htmlFor={`TravelledBefore${index}`}>
                                        Travelled Before
                                        <span className="required_field">
                                          *
                                        </span>
                                      </label>
                                      <Controller
                                        name={`TravelledBefore${index}`}
                                        control={control}
                                        rules={{ required: "Select from list" }}
                                        render={({ field }) => (
                                          <Select
                                            {...field}
                                            options={travelBef}
                                            isMulti
                                            onChange={(selected) => {
                                              field.onChange(selected);
                                              handelChangeVisaFit(
                                                index,
                                                selected,
                                                "travelBefore"
                                              );
                                              if (selected) {
                                                clearErrors(
                                                  `TravelledBefore${index}`
                                                );
                                              }
                                            }}
                                            value={
                                              travelBeforeCountry[index] || []
                                            }
                                          />
                                        )}
                                      />
                                      {errors[`TravelledBefore${index}`] && (
                                        <span className="errorMsg">
                                          {
                                            errors[`TravelledBefore${index}`]
                                              .message
                                          }
                                        </span>
                                      )}
                                    </div>
                                  </Col>

                                  <Col md={3}>
                                    <div className="input__container">
                                      <label
                                        htmlFor={`HoldingValidVisa${index}`}>
                                        Holding Valid Visa
                                        <span className="required_field">
                                          *
                                        </span>
                                      </label>
                                      <Controller
                                        name={`HoldingValidVisa${index}`}
                                        control={control}
                                        rules={{ required: "Select from list" }}
                                        render={({ field }) => (
                                          <Select
                                            {...field}
                                            options={holdingValidVisa}
                                            isMulti
                                            onChange={(selected) => {
                                              field.onChange(selected);
                                              handelChangeVisaFit(
                                                index,
                                                selected,
                                                "holdingVisa"
                                              );
                                              if (selected) {
                                                clearErrors(
                                                  `HoldingValidVisa${index}`
                                                );
                                              }
                                            }}
                                            value={
                                              holdingCountryVisa[index] || []
                                            }
                                          />
                                        )}
                                      />
                                      {errors[`HoldingValidVisa${index}`] && (
                                        <span className="errorMsg">
                                          {
                                            errors[`HoldingValidVisa${index}`]
                                              .message
                                          }
                                        </span>
                                      )}
                                    </div>
                                  </Col>

                                  <Col md={3}>
                                    <div className="input__container">
                                      <label htmlFor={`cityValidVisa${index}`}>
                                        Apply From
                                        <span className="required_field">
                                          *
                                        </span>
                                      </label>
                                      <Controller
                                        name={`cityValidVisa${index}`}
                                        control={control}
                                        rules={{ required: "City is required" }}
                                        render={({ field }) => (
                                          <Select
                                            {...field}
                                            options={optionVisaCity}
                                            isMulti
                                            onChange={(selected) => {
                                              field.onChange(selected);
                                              handelChangeVisaFit(
                                                index,
                                                selected,
                                                "cityValidVisaFit"
                                              );
                                              if (selected) {
                                                clearErrors(
                                                  `cityValidVisa${index}`
                                                );
                                              }
                                            }}
                                            value={
                                              cityValidVisaFit[index] || []
                                            }
                                          />
                                        )}
                                      />
                                      {errors[`cityValidVisa${index}`] && (
                                        <span className="errorMsg">
                                          {
                                            errors[`cityValidVisa${index}`]
                                              .message
                                          }
                                        </span>
                                      )}
                                    </div>
                                  </Col>
                                </Row>
                                {/* <Col md={3}>
                    <div className="input__container">
                      <label htmlFor="countryVisa">
                        Country
                        <span className="required_field">*</span>
                      </label>
                      <input
                        type="text"
                        id="totalCountryVisa"
                        placeholder="No of Visa"
                        className="input-element"
                        name="totalCountryVisa"
                        {...register("totalCountryVisa", {
                          required: "Total Country",
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "Enter Valid no",
                          },
                        })}
                      />
                      {errors.totalCountryVisa && (
                        <span className="errorMsg">
                          {errors.totalCountryVisa.message}
                        </span>
                      )} */}
                                {/* <Controller
                        name=" countryVisa"
                        control={control}
                        rules={{ required: "Select from list" }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={countryVisaTo}
                            isMulti
                            onChange={(selected) => {
                              field.onChange(selected);
                              setCountryVisa(selected);
                              // console.log(countryVisa, "vlin");
                              if (selected) {
                                clearErrors("countryVisa");
                              }
                            }}
                            value={countryVisa}
                          />
                        )}
                      />
                      {errors.countryVisa && (
                        <span className="errorMsg">
                          {errors.countryVisa.message}
                        </span>
                      )} */}
                                {/* </div>
                  </Col> */}
                              </Row>
                            </Row>
                          );
                        })}
                      </>
                    )}
                    {/* Country/s			Type of Visa			No of Pax		  Apply from  */}
                    {watchAllFields.groupType == "Group" && (
                      <>
                        <Row className="row__container ">
                          <p className="services">Visa Requirements</p>

                          <Col md={4}>
                            <div className="input__container">
                              <label htmlFor="totalPaxVisaGroup">
                                Total Pax.{" "}
                                <span className="required_field">*</span>
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
                                Preferred duration{" "}
                                <span className="required_field">*</span>
                              </label>

                              <select
                                id="Place"
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
                                <option value="TransitVisa">
                                  Transit Visa
                                </option>
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
                                <label htmlFor={`visaApplyFrom${index}`}>
                                  Visa Apply From
                                </label>
                                <Controller
                                  name={`visaApplyFrom${index}`}
                                  control={control}
                                  rules={{ required: "City is required" }}
                                  render={({ field }) => (
                                    <Select
                                      {...field}
                                      options={optionGitVisaCity}
                                      isMulti
                                      onChange={(selected) => {
                                        field.onChange(selected);
                                        handelChangeVisaFit(
                                          index,
                                          selected,
                                          "visaApplyFrom"
                                        );

                                        // const newRows = [...rowFields];
                                        // newRows[index].gitCity = selected;
                                        // setRows(newRows);
                                        if (selected) {
                                          clearErrors(`visaApplyFrom${index}`);
                                        }
                                      }}
                                      value={visaApplyFrom[index] || []}
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

                            <Col md={2}>
                              <div className="input__container">
                                <label htmlFor={`rows.${index}.totlaPaxGit`}>
                                  No of Pax{" "}
                                  <span className="required_field">*</span>
                                </label>
                                <input
                                  type="text"
                                  id={`rows.${index}.totlaPaxGit`}
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
                                  <span className="errorMsg">
                                    {errors.totalSum.message}
                                  </span>
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
                                  placeholder="Number of Pax"
                                  name={`gitVisaDays${index}`}
                                  {...register(`gitVisaDays${index}`, {
                                    required: "No of Days",
                                    pattern: {
                                      value: /^[0-9]+$/,
                                      message: "Enter Valid no",
                                    },
                                  })}
                                />

                                {errors[`gitVisaDays${index}`] && (
                                  <span className="errorMsg">
                                    {errors[`gitVisaDays${index}`].message}
                                  </span>
                                )}
                              </div>
                            </Col>

                            <Col md={4}>
                              <div className="input__container">
                                <label htmlFor={`Remarks${index}`}>
                                  Remarks{" "}
                                  <span className="required_field">*</span>
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
                    )}

                    {/* {totalCountryVisad.map((item, index) => {
                  return (
                  
                  );
                })} */}

                    <Row className="row__container">
                      {/* <Col md={3}>
                    <div className="input__container">
                      <label htmlFor="countriesTraveled">
                        Countries Travelled
                        <span className="required_field">*</span>
                      </label>
                      <input
                        type="text"
                        id="countriesTraveled"
                        placeholder="Countries Traveled"
                        className="input-element"
                        name="countriesTraveled"
                        {...register("countriesTraveled", {
                          required: "Enter Countries",
                        })}
                      />
                      {errors.countriesTraveled && (
                        <span className="errorMsg">
                          {errors.countriesTraveled.message}
                        </span>
                      )}
                    </div>
                  </Col> */}
                    </Row>

                    <Row className="row__container">
                      <Col md={3} xs={6}>
                        <div className="input__container">
                          <a
                            target="_blank"
                            href="https://drive.google.com/drive/folders/18KdD9h_uh0U-_zRTKyl_rqurB8upWBgF?usp=sharing">
                            <Button size="sm" variant="success">
                              Upload Passport
                            </Button>
                          </a>
                          {/* <input
                        type="button"
                        id="myfile"
                        name="passportCopy"
                        style={{ color: "white" }}
                      /> */}
                        </div>
                      </Col>
                      <Col md={3} xs={6}>
                        <div className="input__container">
                          <a
                            href="https://drive.google.com/drive/folders/1p_Ggu-9DFHedeO1mal35UGRu0poe6CcS?usp=sharing"
                            target="_blank">
                            <Button size="sm" variant="success">
                              Upload Visa Form
                            </Button>
                          </a>
                        </div>
                      </Col>

                      <Col md={3} xs={6}>
                        <div className="input__container">
                          <a
                            target="_blank"
                            href="https://drive.google.com/drive/folders/1CPSOhxY67eZ45mns0SRC1j5rSJiIogns?usp=sharing">
                            <Button size="sm" variant="success">
                              Upload Other Docs
                            </Button>
                          </a>
                        </div>
                      </Col>

                      <Col md={3} xs={6}>
                        <div className="input__container">
                          <a
                            target="_blank"
                            href="https://drive.google.com/drive/folders/1tT5txXDHYPbM5cHpVFJEH6ahhWaxEHPR?usp=sharing">
                            <Button size="sm" variant="success">
                              Upload Photo
                            </Button>
                          </a>
                        </div>
                      </Col>
                    </Row>
                  </>
                )}

              {watchAllFields.groupType == "Group" &&
                watchAllFields.destination === "international" &&
                watchAllFields.insurance && (
                  <>
                    <Row className="row__container">
                      <p className="services">Insurance Requirement</p>
                      <Col md={4}>
                        <div className="input__container">
                          <label htmlFor="totalpaxInsuranceGroup">
                            No of Pax
                            <span className="required_field">*</span>
                          </label>
                          <input
                            type="text"
                            id="totalpaxInsuranceGroup"
                            className="input-element"
                            placeholder="Number of Pax"
                            name="totalpaxInsuranceGroup"
                            {...register("totalpaxInsuranceGroup", {
                              required: "Total No of Pax",
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "Enter Valid no",
                              },
                            })}
                          />
                          {errors.totalpaxInsuranceGroup && (
                            <span className="errorMsg">
                              {errors.totalpaxInsuranceGroup.message}
                            </span>
                          )}
                        </div>
                      </Col>

                      <Col md={4}>
                        <div className="input__container">
                          <label htmlFor="insurancePlanGroup">
                            Insurance plan{" "}
                            {/* <span className="required_field">*</span> */}
                          </label>
                          <select
                            id="hotelCategory"
                            name="insurancePlanGroup"
                            className="input-element"
                            {...register("insurancePlanGroup")}>
                            <option value="">--Select--</option>
                            <option value="Smart">Smart</option>
                            <option value="Style"> Style</option>
                            <option value="Smart">Style Pro </option>
                            <option value="Style"> Care Plan</option>
                            <option value="Group">Group</option>
                          </select>
                        </div>
                      </Col>
                      {/* <Col md={3}>
                      <div className="input__container">
                        <label htmlFor="insuranceAmountGroup">
                          Insurance Amount{" "}
                          <span className="required_field">*</span>
                        </label>
                        <input
                          type="text"
                          id="insuranceAmountGroup"
                          className="input-element"
                          placeholder="Insurance Amount"
                          name="insuranceAmountGroup"
                          {...register("insuranceAmountGroup")}
                        />
                      </div>
                    </Col> */}

                      <Col md={4}>
                        <div className="input__container">
                          <label htmlFor="totalDaysInsuranceGroup">
                            Duration
                            <span className="required_field">*</span>
                          </label>
                          <input
                            type="text"
                            id="totalDaysInsuranceGroup"
                            className="input-element"
                            placeholder="Number of Days"
                            name="totalDaysInsuranceGroup"
                            {...register("totalDaysInsuranceGroup", {
                              required: "Total Days",
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "Enter Valid no",
                              },
                            })}
                          />
                          {errors.totalDaysInsuranceGroup && (
                            <span className="errorMsg">
                              {errors.totalDaysInsuranceGroup.message}
                            </span>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <Row className="row__container mt-5">
                      <a
                        className="sheetLink"
                        target="_blank"
                        href="https://docs.google.com/spreadsheets/d/1taPTZ7Ng5EGupup4F5giZaiOOWhwLkVYmoAY4bqC5Ic/edit?usp=sharing">
                        <Button size="sm" variant="danger">
                          Insert your data here
                        </Button>
                      </a>
                    </Row>

                    <Row className="row__container">
                      <Col md={3} xs={6}>
                        <div className="input__container">
                          <a
                            target="_blank"
                            href="https://drive.google.com/drive/folders/18KdD9h_uh0U-_zRTKyl_rqurB8upWBgF?usp=sharing">
                            <Button size="sm" variant="success">
                              Upload Passport
                            </Button>
                          </a>
                          {/* <input
                        type="button"
                        id="myfile"
                        name="passportCopy"
                        style={{ color: "white" }}
                      /> */}
                        </div>
                      </Col>
                      <Col md={3} xs={6}>
                        <div className="input__container">
                          <a
                            target="_blank"
                            href="https://drive.google.com/drive/folders/1BDs_7cyMK3Kw8r38TRVFR77nHT6VE0lx?usp=sharing">
                            <Button size="sm" variant="success">
                              Medical Docs
                            </Button>
                          </a>
                        </div>
                      </Col>

                      <Col md={3} xs={6}>
                        <div className="input__container">
                          <a
                            target="_blank"
                            href="https://drive.google.com/drive/folders/1CPSOhxY67eZ45mns0SRC1j5rSJiIogns?usp=sharing">
                            <Button size="sm" variant="success">
                              Upload Other Docs
                            </Button>
                          </a>
                        </div>
                      </Col>

                      <Col md={3} xs={6}>
                        <div className="input__container">
                          <a
                            target="_blank"
                            href="https://drive.google.com/drive/folders/1tT5txXDHYPbM5cHpVFJEH6ahhWaxEHPR?usp=sharing">
                            <Button size="sm" variant="success">
                              Upload Photo
                            </Button>
                          </a>
                        </div>
                      </Col>
                    </Row>
                  </>
                )}
              {watchAllFields.groupType == "Individual" &&
                watchAllFields.destination === "international" &&
                watchAllFields.insurance && (
                  <>
                    <Row className="row__container">
                      <p className="services">Insurance Requirement</p>
                      <Col md={3}>
                        <div className="input__container">
                          <label htmlFor="totalpaxInsurance">
                            No of Pax
                            <span className="required_field">*</span>
                          </label>
                          <input
                            type="text"
                            id="totalpaxInsurance"
                            className="input-element"
                            placeholder="Number of Pax"
                            name="totalpaxInsurance"
                            {...register("totalpaxInsurance", {
                              required: "Total No of Pax",
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "Enter Valid no",
                              },
                            })}
                          />
                          {errors.totalpaxInsurance && (
                            <span className="errorMsg">
                              {errors.totalpaxInsurance.message}
                            </span>
                          )}
                        </div>
                      </Col>

                      <Col md={3}>
                        <div className="input__container">
                          <label htmlFor="insurancePlan">
                            Insurance plan{" "}
                            {/* <span className="required_field">*</span> */}
                          </label>
                          <select
                            id="hotelCategory"
                            name="insurancePlan"
                            className="input-element"
                            {...register("insurancePlan")}>
                            <option value="">--Select--</option>
                            <option value="Smart">Smart</option>
                            <option value="Style"> Style</option>
                            <option value="Smart">Style Pro </option>
                            <option value="Style"> Care Plan</option>
                            <option value="Group">Group</option>
                          </select>
                          {/* {errors.insurancePlan && (
                          <span className="errorMsg">
                            {errors.insurancePlan.message}
                          </span>
                        )} */}
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="input__container">
                          <label htmlFor="insuranceAmount">
                            Insurance Amount{" "}
                            {/* <span className="required_field">*</span> */}
                          </label>
                          <input
                            type="text"
                            id="insuranceAmount"
                            className="input-element"
                            placeholder="Insurance Amount"
                            name="insuranceAmount"
                            {...register("insuranceAmount")}
                          />
                        </div>
                      </Col>

                      <Col md={3}>
                        <div className="input__container">
                          <label htmlFor="totalDaysInsurance">
                            Duration
                            <span className="required_field">*</span>
                          </label>
                          <input
                            type="text"
                            id="totalDaysInsurance"
                            className="input-element"
                            placeholder="Number of Days"
                            name="totalDaysInsurance"
                            {...register("totalDaysInsurance", {
                              required: "Total Days",
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "Enter Valid no",
                              },
                            })}
                          />
                          {errors.totalDaysInsurance && (
                            <span className="errorMsg">
                              {errors.totalDaysInsurance.message}
                            </span>
                          )}
                        </div>
                      </Col>
                    </Row>

                    {totalInsurancIssueGit.map((item, index) => {
                      return (
                        <Row key={index}>
                          <Row className="row__container">
                            <p className="services">Person {index + 1}</p>
                            <Col md={4}>
                              <div className="input__container">
                                <label htmlFor={`familyName${index}`}>
                                  Family Name{" "}
                                  <span className="required_field">*</span>
                                </label>
                                <input
                                  type="text"
                                  id="familyName"
                                  className="input-element"
                                  placeholder="Family Name"
                                  name={`familyName${index}`}
                                  {...register(`familyName${index}`, {
                                    required: "Please enter Family name",
                                  })}
                                />
                                {errors[`familyName${index}`] && (
                                  <span className="errorMsg">
                                    {errors[`familyName${index}`].message}
                                  </span>
                                )}
                              </div>
                            </Col>
                            <Col md={4}>
                              <div className="input__container">
                                <label htmlFor={`firstName${index}`}>
                                  First Name{" "}
                                  <span className="required_field">*</span>
                                </label>

                                <input
                                  type="text"
                                  id="firstName"
                                  className="input-element"
                                  placeholder="First Name"
                                  name={`firstName${index}`}
                                  {...register(`firstName${index}`, {
                                    required: "Please enter first name",
                                  })}
                                />
                                {errors[`firstName${index}`] && (
                                  <span className="errorMsg">
                                    {errors[`firstName${index}`].message}
                                  </span>
                                )}
                              </div>
                            </Col>
                            <Col md={4}>
                              <div className="input__container">
                                <label htmlFor={`middleName${index}`}>
                                  Middle Name{" "}
                                  <span className="required_field">*</span>
                                </label>
                                <input
                                  type="text"
                                  id="middleName"
                                  className="input-element"
                                  placeholder="Middle Name"
                                  name={`middleName${index}`}
                                  {...register(`middleName${index}`, {
                                    required: "Please enter last name",
                                  })}
                                />
                                {errors[`middleName${index}`] && (
                                  <span className="errorMsg">
                                    {errors[`middleName${index}`].message}
                                  </span>
                                )}
                              </div>
                            </Col>
                          </Row>

                          <Row className="row__container">
                            <Col md={4}>
                              <div className="input__container">
                                <label htmlFor={`passportNumber${index}`}>
                                  Passport Number
                                  <span className="required_field">*</span>
                                </label>
                                <input
                                  type="text"
                                  id="passportNumber"
                                  className="input-element"
                                  placeholder="Passport Number"
                                  name={`passportNumber${index}`}
                                  {...register(`passportNumber${index}`, {
                                    required: "Passport No required",
                                  })}
                                />
                                {errors[`passportNumber${index}`] && (
                                  <span className="errorMsg">
                                    {errors[`passportNumber${index}`].message}
                                  </span>
                                )}
                              </div>
                            </Col>

                            <Col md={4}>
                              <div className="input__container">
                                <label htmlFor={`passportExpiry${index}`}>
                                  Passport Expiry
                                  <span className="required_field">*</span>
                                </label>
                                <input
                                  id="dobInsu"
                                  name={`passportExpiry${index}`}
                                  type="date"
                                  className="input-element"
                                  {...register(`passportExpiry${index}`, {
                                    required: "Select Date",
                                  })}
                                />

                                {errors[`passportExpiry${index}`] && (
                                  <span className="errorMsg">
                                    {errors[`passportExpiry${index}`].message}
                                  </span>
                                )}
                              </div>
                            </Col>
                            <Col md={4}>
                              <div className="input__container">
                                <label htmlFor={`dobInsu${index}`}>
                                  DOB
                                  <span className="required_field">*</span>
                                </label>
                                <input
                                  id="dobInsu"
                                  name={`dobInsu${index}`}
                                  type="date"
                                  className="input-element"
                                  {...register(`dobInsu${index}`, {
                                    required: "Select Date",
                                  })}
                                />

                                {errors[`dobInsu${index}`] && (
                                  <span className="errorMsg">
                                    {errors[`dobInsu${index}`].message}
                                  </span>
                                )}
                              </div>
                            </Col>
                          </Row>
                          <Row className="row__container">
                            <Col md={4}>
                              <div className="input__container">
                                <label htmlFor={`address${index}`}>
                                  Address
                                  <span className="required_field">*</span>
                                </label>
                                <input
                                  type="text"
                                  id="address"
                                  className="input-element"
                                  placeholder="Address"
                                  name={`address${index}`}
                                  {...register(`address${index}`, {
                                    required: "Enter the Details",
                                  })}
                                />
                                {errors[`address${index}`] && (
                                  <span className="errorMsg">
                                    {errors[`address${index}`].message}
                                  </span>
                                )}
                              </div>
                            </Col>
                            <Col md={4}>
                              <div className="input__container">
                                <label htmlFor={`Nominee${index}`}>
                                  Nominee
                                  <span className="required_field">*</span>
                                </label>

                                <input
                                  type="text"
                                  id="Nominee"
                                  className="input-element"
                                  placeholder="Nominee"
                                  name={`Nominee${index}`}
                                  {...register(`Nominee${index}`, {
                                    required: "Enter the Details",
                                  })}
                                />
                                {errors[`Nominee${index}`] && (
                                  <span className="errorMsg">
                                    {errors[`Nominee${index}`].message}
                                  </span>
                                )}
                              </div>
                            </Col>
                            <Col md={4}>
                              <div className="input__container">
                                <label htmlFor={`medicalHistory${index}`}>
                                  Medical History
                                  <span className="required_field">*</span>
                                </label>
                                <input
                                  type="text"
                                  id="medicalHistory"
                                  className="input-element"
                                  placeholder="medicalHistory"
                                  name={`medicalHistory${index}`}
                                  {...register(`medicalHistory${index}`, {
                                    required: "Enter the Details",
                                  })}
                                />
                                {errors[`medicalHistory${index}`] && (
                                  <span className="errorMsg">
                                    {errors[`medicalHistory${index}`].message}
                                  </span>
                                )}
                              </div>
                            </Col>
                          </Row>
                        </Row>
                      );
                    })}

                    <Row className="row__container">
                      <Col md={3} xs={6}>
                        <div className="input__container">
                          <a
                            target="_blank"
                            href="https://drive.google.com/drive/folders/18KdD9h_uh0U-_zRTKyl_rqurB8upWBgF?usp=sharing">
                            <Button size="sm" variant="success">
                              Upload Passport
                            </Button>
                          </a>
                          {/* <input
                        type="button"
                        id="myfile"
                        name="passportCopy"
                        style={{ color: "white" }}
                      /> */}
                        </div>
                      </Col>

                      <Col md={3} xs={6}>
                        <div className="input__container">
                          <a
                            target="_blank"
                            href="https://drive.google.com/drive/folders/1BDs_7cyMK3Kw8r38TRVFR77nHT6VE0lx?usp=sharing">
                            <Button size="sm" variant="success">
                              Medical Docs
                            </Button>
                          </a>
                        </div>
                      </Col>

                      <Col md={3} xs={6}>
                        <div className="input__container">
                          <a
                            target="_blank"
                            href="https://drive.google.com/drive/folders/1CPSOhxY67eZ45mns0SRC1j5rSJiIogns?usp=sharing">
                            <Button size="sm" variant="success">
                              Upload Other Docs
                            </Button>
                          </a>
                        </div>
                      </Col>

                      <Col md={3} xs={6}>
                        <div className="input__container">
                          <a
                            target="_blank"
                            href="https://drive.google.com/drive/folders/1tT5txXDHYPbM5cHpVFJEH6ahhWaxEHPR?usp=sharing">
                            <Button size="sm" variant="success">
                              Upload Photo
                            </Button>
                          </a>
                        </div>
                      </Col>
                    </Row>
                  </>
                )}

              {watchAllFields.event && (
                <>
                  <Row className="row__container">
                    <p className="services">Event Requirement</p>
                    <Col md={3}>
                      <div className="input__container">
                        <label htmlFor="stage">
                          Stage
                          <span className="required_field">*</span>
                        </label>
                        <select
                          id="stage"
                          name="stage"
                          className="input-element"
                          {...register("stage", {
                            required: "Select from list",
                          })}>
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {errors.stage && (
                          <span className="errorMsg">
                            {errors.stage.message}
                          </span>
                        )}
                      </div>
                    </Col>

                    <Col md={3}>
                      <div className="input__container">
                        <label htmlFor="stageSidePanel">
                          Stage Side Panels
                          <span className="required_field">*</span>
                        </label>
                        <select
                          id="stageSidePanel"
                          name="stageSidePanel"
                          className="input-element"
                          {...register("stageSidePanel", {
                            required: "Select from list",
                          })}>
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {errors.stageSidePanel && (
                          <span className="errorMsg">
                            {errors.stageSidePanel.message}
                          </span>
                        )}
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="input__container">
                        <label htmlFor="podiumsWithBranding">
                          Podiums with Branding
                          <span className="required_field">*</span>
                        </label>
                        <select
                          id="podiumsWithBranding"
                          name="podiumsWithBranding"
                          className="input-element"
                          {...register("podiumsWithBranding", {
                            required: "Select from list",
                          })}>
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {errors.podiumsWithBranding && (
                          <span className="errorMsg">
                            {errors.podiumsWithBranding.message}
                          </span>
                        )}
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="input__container">
                        <label htmlFor="Steps">
                          Steps
                          <span className="required_field">*</span>
                        </label>
                        <select
                          id="Steps"
                          name="Steps"
                          className="input-element"
                          {...register("Steps", {
                            required: "Select from list",
                          })}>
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {errors.Steps && (
                          <span className="errorMsg">
                            {errors.Steps.message}
                          </span>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row className="row__container">
                    <Col md={3}>
                      <div className="input__container">
                        <label htmlFor="EntryGateArch ">
                          Entry Gate Arch
                          <span className="required_field">*</span>
                        </label>
                        <select
                          id="EntryGateArch"
                          name="EntryGateArch"
                          className="input-element"
                          {...register("EntryGateArch", {
                            required: "Select from list",
                          })}>
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {errors.EntryGateArch && (
                          <span className="errorMsg">
                            {errors.EntryGateArch.message}
                          </span>
                        )}
                      </div>
                    </Col>
                  </Row>

                  <Row className="row__container">
                    <p className="services">Sound & Technicals</p>
                    <Col md={3}>
                      <div className="input__container">
                        <label htmlFor="paSystem ">
                          PA system
                          <span className="required_field">*</span>
                        </label>
                        <select
                          id="paSystem"
                          name="paSystem"
                          className="input-element"
                          {...register("paSystem", {
                            required: "Select from list",
                          })}>
                          <option value="">Select</option>
                          <option value="JBL">JBL</option>
                          <option value="RCF">RCF</option>
                          <option value="DBTech">DB Tech</option>
                          <option value="DNB">DNB</option>
                          <option value="RCF">ADAMSON</option>
                        </select>
                        {errors.paSystem && (
                          <span className="errorMsg">
                            {errors.paSystem.message}
                          </span>
                        )}
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="input__container">
                        <label htmlFor="BaseStageMonitor">
                          Base & Stage Monitor
                          <span className="required_field">*</span>
                        </label>
                        <select
                          id="BaseStageMonitor"
                          name="BaseStageMonitor"
                          className="input-element"
                          {...register("BaseStageMonitor", {
                            required: "Select from list",
                          })}>
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {errors.BaseStageMonitor && (
                          <span className="errorMsg">
                            {errors.BaseStageMonitor.message}
                          </span>
                        )}
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="input__container">
                        <label htmlFor="ChannelMixer ">
                          Channel Mixer
                          <span className="required_field">*</span>
                        </label>
                        <select
                          id="ChannelMixer"
                          name="ChannelMixer"
                          className="input-element"
                          {...register("ChannelMixer", {
                            required: "Select from list",
                          })}>
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {errors.ChannelMixer && (
                          <span className="errorMsg">
                            {errors.ChannelMixer.message}
                          </span>
                        )}
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="input__container">
                        <label htmlFor="Mic">
                          Mic
                          <span className="required_field">*</span>
                        </label>
                        <select
                          id="Mic"
                          name="Mic"
                          className="input-element"
                          {...register("Mic", {
                            required: "Select from list",
                          })}>
                          <option value="">Select</option>
                          <option value="CordlessMic">Cordless Mic</option>
                          <option value="LapelMic">Lapel Mic</option>
                          <option value="PodiumMic">Podium Mic</option>
                          <option value="Headset Mic">Headset Mic</option>
                          <option value="Instrumental Mic">
                            Instrumental Mic
                          </option>
                        </select>
                        {errors.Mic && (
                          <span className="errorMsg">{errors.Mic.message}</span>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row className="row__container">
                    <Col md={3}>
                      <div className="input__container">
                        <label htmlFor="PioneerDJMixing">
                          Pioneer DJ mixing
                          <span className="required_field">*</span>
                        </label>
                        <select
                          id="PioneerDJMixing"
                          name="PioneerDJMixing"
                          className="input-element"
                          {...register("PioneerDJMixing", {
                            required: "Select from list",
                          })}>
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {errors.PioneerDJMixing && (
                          <span className="errorMsg">
                            {errors.PioneerDJMixing.message}
                          </span>
                        )}
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="input__container">
                        <label htmlFor="upsGreenGensets">
                          UPS & Green Gensets
                          <span className="required_field">*</span>
                        </label>
                        <select
                          id="upsGreenGensets"
                          name="upsGreenGensets"
                          className="input-element"
                          {...register("upsGreenGensets", {
                            required: "Select from list",
                          })}>
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {errors.upsGreenGensets && (
                          <span className="errorMsg">
                            {errors.upsGreenGensets.message}
                          </span>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row className="row__container">
                    <p className="services">Audio Visuals & Light</p>
                    <Col md={3}>
                      <div className="input__container">
                        <label htmlFor="lights">
                          Lights
                          <span className="required_field">*</span>
                        </label>
                        <select
                          id="lights"
                          name="lights"
                          className="input-element"
                          {...register("lights", {
                            required: "Select from list",
                          })}>
                          <option value="">Select</option>
                          <option value="Sharpy-Flickers-Follow">
                            Sharpy-Flickers-Follow
                          </option>
                          <option value="Spot-LED">Spot-LED</option>
                          <option value="Parcans-Wash">Parcans-Wash </option>

                          <option value="Light-Profile">Light-Profile</option>
                          <option value="Light-Wash">Light-Wash</option>
                          <option value="Light">Light</option>
                        </select>
                        {errors.lights && (
                          <span className="errorMsg">
                            {errors.lights.message}
                          </span>
                        )}
                      </div>
                    </Col>

                    <Col md={3}>
                      <div className="input__container">
                        <label htmlFor="UPSGreenGensets ">
                          Haze Machine<span className="required_field">*</span>
                        </label>
                        <select
                          id="HazeMachine"
                          name="HazeMachine"
                          className="input-element"
                          {...register("HazeMachine", {
                            required: "Select from list",
                          })}>
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {errors.HazeMachine && (
                          <span className="errorMsg">
                            {errors.HazeMachine.message}
                          </span>
                        )}
                      </div>
                    </Col>

                    <Col md={3}>
                      <div className="input__container">
                        <label htmlFor="SeamlessSwitcher">
                          Seamless Switcher
                          <span className="required_field">*</span>
                        </label>
                        <select
                          id="SeamlessSwitcher"
                          name="HazeMachine"
                          className="input-element"
                          {...register("SeamlessSwitcher", {
                            required: "Select from list",
                          })}>
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {errors.SeamlessSwitcher && (
                          <span className="errorMsg">
                            {errors.SeamlessSwitcher.message}
                          </span>
                        )}
                      </div>
                    </Col>

                    <Col md={3}>
                      <div className="input__container">
                        <label htmlFor="WatchoutServer">
                          Watchout Server
                          <span className="required_field">*</span>
                        </label>
                        <select
                          id="WatchoutServer"
                          name="WatchoutServer"
                          className="input-element"
                          {...register("WatchoutServer", {
                            required: "Select from list",
                          })}>
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {errors.WatchoutServer && (
                          <span className="errorMsg">
                            {errors.WatchoutServer.message}
                          </span>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row className="row__container">
                    <Col md={3}>
                      <div className="input__container">
                        <label htmlFor="PreviewMonitor">
                          Preview Monitor
                          <span className="required_field">*</span>
                        </label>
                        <select
                          id="PreviewMonitor"
                          name="PreviewMonitor"
                          className="input-element"
                          {...register("PreviewMonitor", {
                            required: "Select from list",
                          })}>
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {errors.PreviewMonitor && (
                          <span className="errorMsg">
                            {errors.PreviewMonitor.message}
                          </span>
                        )}
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="input__container">
                        <label htmlFor="HdSdiSplitter">
                          HD SDI Splitter
                          <span className="required_field">*</span>
                        </label>
                        <select
                          id="HdSdiSplitter"
                          name="HdSdiSplitter"
                          className="input-element"
                          {...register("HdSdiSplitter", {
                            required: "Select from list",
                          })}>
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {errors.HdSdiSplitter && (
                          <span className="errorMsg">
                            {errors.HdSdiSplitter.message}
                          </span>
                        )}
                      </div>
                    </Col>

                    <Col md={3}>
                      <div className="input__container">
                        <label htmlFor="AvoliteBoard">
                          Avolite Board
                          <span className="required_field">*</span>
                        </label>
                        <select
                          id="AvoliteBoard"
                          name="AvoliteBoard"
                          className="input-element"
                          {...register("AvoliteBoard", {
                            required: "Select from list",
                          })}>
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {errors.AvoliteBoard && (
                          <span className="errorMsg">
                            {errors.AvoliteBoard.message}
                          </span>
                        )}
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="input__container">
                        <label htmlFor="LEDWalls">
                          LED Walls
                          <span className="required_field">*</span>
                        </label>
                        <select
                          id="LEDWalls"
                          name="LEDWalls"
                          className="input-element"
                          {...register("LEDWalls", {
                            required: "Select from list",
                          })}>
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {errors.LEDWalls && (
                          <span className="errorMsg">
                            {errors.LEDWalls.message}
                          </span>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row className="row__container">
                    <Col md={2}>
                      <div className="input__container">
                        <label htmlFor="Photographer">
                          Photographer
                          <span className="required_field">*</span>
                        </label>
                        <select
                          id="Photographer"
                          name="Photographer"
                          className="input-element"
                          {...register("Photographer", {
                            required: "Select from list",
                          })}>
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {errors.Photographer && (
                          <span className="errorMsg">
                            {errors.Photographer.message}
                          </span>
                        )}
                      </div>
                    </Col>
                    {watchAllFields.Photographer == "Yes" && (
                      <Col md={2}>
                        <div className="input__container">
                          <label htmlFor="photTotalDays">
                            Tot. Days <span className="required_field">*</span>
                          </label>
                          <input
                            type="text"
                            id="photTotalDays"
                            placeholder="Tot. Days"
                            className="input-element"
                            name="photTotalDays"
                            {...register("photTotalDays", {
                              required: "Tot. Days",
                            })}
                          />
                          {errors.photTotalDays && (
                            <span className="errorMsg">
                              {errors.photTotalDays.message}
                            </span>
                          )}
                        </div>
                      </Col>
                    )}
                    <Col md={2}>
                      <div className="input__container">
                        <label htmlFor="Videographer">
                          Videographer
                          <span className="required_field">*</span>
                        </label>
                        <select
                          id="Videographer"
                          name="Videographer"
                          className="input-element"
                          {...register("Videographer", {
                            required: "Select from list",
                          })}>
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {errors.Videographer && (
                          <span className="errorMsg">
                            {errors.Videographer.message}
                          </span>
                        )}
                      </div>
                    </Col>

                    {watchAllFields.Videographer == "Yes" && (
                      <Col md={2}>
                        <div className="input__container">
                          <label htmlFor="videoTotDays">
                            Tot. Days <span className="required_field">*</span>
                          </label>
                          <input
                            type="text"
                            id="videoTotDays"
                            placeholder="Tot. Days"
                            className="input-element"
                            name="videoTotDays"
                            {...register("videoTotDays", {
                              required: "Tot. Days",
                            })}
                          />
                          {errors.videoTotDays && (
                            <span className="errorMsg">
                              {errors.videoTotDays.message}
                            </span>
                          )}
                        </div>
                      </Col>
                    )}
                    <Col md={3}>
                      <div className="input__container">
                        <label htmlFor="Trusses">
                          Trusses
                          <span className="required_field">*</span>
                        </label>
                        <select
                          id="Trusses"
                          name="Trusses"
                          className="input-element"
                          {...register("Trusses", {
                            required: "Select from list",
                          })}>
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {errors.Trusses && (
                          <span className="errorMsg">
                            {errors.Trusses.message}
                          </span>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row className="row__container">
                    <p className="services">Manpower & Staffing</p>
                    <Col md={3}>
                      <Controller
                        name="manpowerStaffing"
                        control={control}
                        rules={{ required: "Select from list" }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            isMulti
                            onChange={(selected) => {
                              field.onChange(selected);
                              setManPowerUpgrade(selected);
                              if (selected) {
                                clearErrors("manpowerStaffing");
                              }
                            }}
                            value={selectedManpower}
                            options={manOption}
                          />
                        )}
                      />
                      {errors.manpowerStaffing && (
                        <span className="errorMsg">
                          {errors.manpowerStaffing.message}
                        </span>
                      )}
                    </Col>
                  </Row>
                </>
              )}

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
                      <Col md={4}>
                        <div className="input__container">
                          <label htmlFor="totalPaxTravel">
                            Total Pax <span className="required_field">*</span>
                          </label>
                          <input
                            type="text"
                            id="totalPaxTravel"
                            className="input-element"
                            placeholder="Total pax"
                            name="totalPaxTravel"
                            {...register("totalPaxTravel", {
                              required: "Please enter no of pax",
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "Enter Valid no",
                              },
                            })}
                          />
                          {errors.totalPaxTravel && (
                            <span className="errorMsg">
                              {errors.totalPaxTravel.message}
                            </span>
                          )}
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="input__container">
                          <label htmlFor="departureDateFlight">
                            Departure Date
                            <span className="required_field">*</span>
                          </label>
                          <Controller
                            id="departureDateFlight"
                            name="departureDateFlight"
                            className="input-element"
                            control={control}
                            rules={{ required: "Departure Date is required" }}
                            render={({ field }) => (
                              <DatePicker
                                className="input-element"
                                selected={field.value}
                                startDate={watchAllFields.departureDateFlight}
                                dateFormat="d MMMM, yyyy"
                                placeholderText="Select Departure Date"
                                onChange={(date) => field.onChange(date)}
                              />
                            )}
                          />

                          {!watchAllFields.departureDateFlight &&
                            errors.departureDateFlight && (
                              <span className="errorMsg">
                                {errors.departureDateFlight.message}
                              </span>
                            )}
                          {dateError && (
                            <span className="errorMsg">{dateError}</span>
                          )}
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="input__container">
                          <label htmlFor="returnDateFlight">
                            Return Date
                            <span className="required_field">*</span>
                          </label>
                          <Controller
                            name="returnDateFlight"
                            control={control}
                            rules={{
                              required: "Return Date is required",
                              validate: (value) =>
                                (value && value >= departureDateFlight) ||
                                "Return date must be after departure date",
                            }}
                            render={({ field }) => (
                              <DatePicker
                                selected={field.value}
                                className="input-element"
                                placeholderText="Select Return Date"
                                dateFormat="d MMMM, yyyy"
                                onChange={(date) => field.onChange(date)}
                                minDate={watch("departureDateFlight")}
                              />
                            )}
                          />

                          {!watchAllFields.returnDateFlight &&
                            errors.returnDateFlight && (
                              <span className="errorMsg">
                                {errors.returnDateFlight.message}
                              </span>
                            )}
                        </div>
                      </Col>
                    </Row>
                    {fieldDepartureCity.map((field, index) => (
                      <Row key={field.id} className="row__container">
                        <Col md={3}>
                          <div className="input__container">
                            <label htmlFor={`departureCityTravel${index}`}>
                              Departure City
                            </label>
                            <Controller
                              name={`departureCityTravel${index}`}
                              control={control}
                              rules={{ required: "City is required" }}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  options={optionCityTravel}
                                  // isMulti
                                  onChange={(selected) => {
                                    field.onChange(selected);
                                    handelChangeVisaFit(
                                      index,
                                      selected,
                                      "departureCityTravel"
                                    );
                                    if (selected) {
                                      clearErrors(
                                        `departureCityTravel${index}`
                                      );
                                    }
                                  }}
                                  value={departureCityTravel[index] || []}
                                />
                              )}
                            />
                            {errors[`departureCityTravel${index}`] && (
                              <span className="errorMsg">
                                {errors[`departureCityTravel${index}`].message}
                              </span>
                            )}
                          </div>
                        </Col>
                        <Col md={3}>
                          <div className="input__container">
                            <label htmlFor={`cityPaxTravel${index}`}>
                              No of Pax{" "}
                              <span className="required_field">*</span>
                            </label>
                            <input
                              type="text"
                              id={`cityPaxTravel${index}`}
                              className="input-element"
                              placeholder="Number of Pax"
                              {...register(`TravelRow.${index}.cityPaxTravel`, {
                                required: "Total No of Pax is required",
                                pattern: {
                                  value: /^[0-9]+$/,
                                  message: "Enter a valid number",
                                },
                              })}
                            />
                            {errors?.TravelRow?.[index]?.cityPaxTravel && (
                              <span className="errorMsg">
                                {errors.TravelRow[index].cityPaxTravel.message}
                              </span>
                            )}

                            {errors.totalSumTravel && (
                              <span className="errorMsg">
                                {errors.totalSumTravel.message}
                              </span>
                            )}
                          </div>
                        </Col>
                        <Col md={3}>
                          <div className="input__container">
                            <label htmlFor={`travelClass${index}`}>
                              Class of Travel
                              <span className="required_field">*</span>
                            </label>
                            <Controller
                              name={`travelClass${index}`}
                              control={control}
                              rules={{ required: "Travel Class required" }}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  options={classTravel}
                                  onChange={(selected) => {
                                    field.onChange(selected);
                                    handelChangeVisaFit(
                                      index,
                                      selected,
                                      "travelClass"
                                    );
                                    if (selected) {
                                      clearErrors(`travelClass${index}`);
                                    }
                                  }}
                                  value={travelClass[index] || []}
                                />
                              )}
                            />
                            {errors[`travelClass${index}`] && (
                              <span className="errorMsg">
                                {errors[`travelClass${index}`].message}
                              </span>
                            )}
                          </div>
                        </Col>
                        <Col md={2}>
                          <div className="input__container">
                            <label htmlFor={`departureTimeTravel${index}`}>
                              Preferred Dep Time
                              {/* <span className="required_field">*</span> */}
                            </label>
                            <input
                              type="time"
                              id={`departureTimeTravel${index}`}
                              className="input-element"
                              placeholder="Enter Time"
                              name={`departureTimeTravel${index}`}
                              {...register(`departureTimeTravel${index}`, {
                                required: "Enter your Departue Time",
                              })}
                            />
                            {/* 
                          {errors[`departureTimeTravel${index}`] && (
                            <span className="errorMsg">
                              {errors[`departureTimeTravel${index}`].message}
                            </span>
                          )} */}
                          </div>
                        </Col>
                        <Col md={1} className="d-flex align-items-end">
                          <Button
                            type="button"
                            className="btn btn-danger"
                            size="sm"
                            onClick={() => removeTravelRow(index)}>
                            Remove
                          </Button>
                        </Col>
                      </Row>
                    ))}

                    <Button
                      className="mt-4"
                      size="sm"
                      onClick={() =>
                        appendTravelRow({
                          departureCityTravel: null,
                          cityPaxTravel: null,
                          travelClass: null,
                          departureTimeTravel: null,
                        })
                      }>
                      Add City Section
                    </Button>
                    <br />

                    <Row className="row__container">
                      <Col md={3} xs={6}>
                        <div className="input__container">
                          <a
                            target="_blank"
                            href="https://drive.google.com/drive/folders/18KdD9h_uh0U-_zRTKyl_rqurB8upWBgF?usp=sharing">
                            <Button size="sm" variant="success">
                              Upload Passport
                            </Button>
                          </a>
                        </div>
                      </Col>

                      <Col md={3} xs={6}>
                        <div className="input__container">
                          <a
                            target="_blank"
                            href="https://drive.google.com/drive/folders/1CPSOhxY67eZ45mns0SRC1j5rSJiIogns?usp=sharing">
                            <Button size="sm" variant="success">
                              Upload Other Docs
                            </Button>
                          </a>
                        </div>
                      </Col>
                    </Row>
                    {/* <Row className="row__container">
                    <Col md={3}>
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
                    <Col md={3}>
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
                  </Row> */}

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
                    <p className="services">Hotel Requirement</p>
                    <Col
                      md={watchAllFields.purposeOfTravel === "Others" ? 3 : 4}>
                      <div className="input__container">
                        <label htmlFor="purposeOfTravel">
                          Purpose of Travel
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
                    {watchAllFields.purposeOfTravel == "Others" && (
                      <Col md={3}>
                        <div className="input__container">
                          <label htmlFor="travelReasons">
                            Travel Reason{" "}
                            <span className="required_field">*</span>
                          </label>
                          <input
                            type="text"
                            id="travelReasons"
                            className="input-element"
                            placeholder="Please Enter your reasons"
                            name="travelReasons"
                            {...register("travelReasons", {
                              required: "Please enter travel reasons",
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "Enter Valid no",
                              },
                            })}
                          />
                          {errors.travelReasons && (
                            <span className="errorMsg">
                              {errors.travelReasons.message}
                            </span>
                          )}
                        </div>
                      </Col>
                    )}
                    <Col
                      md={watchAllFields.purposeOfTravel === "Others" ? 3 : 4}>
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
                    <Col
                      md={watchAllFields.purposeOfTravel == "Others" ? 3 : 4}>
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
                    <Col md={4}>
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
                          <option value="Luxury 5 Star">Luxury 5 Star</option>
                          <option value="5 Star">5 Star</option>
                          <option value="4 Star">4 Star</option>
                          <option value="3 Star">3 Star</option>
                          <option value="Budget Hotel">Budget Hotel</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.hotelCategory && (
                          <span className="errorMsg">
                            {errors.hotelCategory.message}
                          </span>
                        )}
                      </div>
                    </Col>
                    <Col md={4}>
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
                    <Col md={4}>
                      <div className="input__container">
                        <label htmlFor="mealPlan">Meal Plan</label>
                        <Controller
                          name="mealPlan"
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              isMulti
                              onChange={(selected) => {
                                field.onChange(selected);
                                setSelectMealPlan(selected);
                                if (selected) {
                                  clearErrors("mealPlan");
                                }
                              }}
                              value={selectMealPlan}
                              options={mealPlan}
                            />
                          )}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row className="row__container">
                    <Col md={4}>
                      <div className="input__container">
                        <label htmlFor="mealRate">
                          Meal Rate
                          {/* <span className="required_field">*</span> */}
                        </label>
                        <Controller
                          name="mealRate"
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              isMulti
                              onChange={(selected) => {
                                field.onChange(selected);
                                setSelectMealRate(selected);
                                if (selected) {
                                  clearErrors("mealRate");
                                }
                              }}
                              value={selectMealRate}
                              options={mealRate}
                            />
                          )}
                        />
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="input__container">
                        <label htmlFor="liquor">
                          Liquor
                          <span className="required_field">*</span>
                        </label>
                        <select
                          id="liquor"
                          name="liquor"
                          className="input-element"
                          {...register("liquor", {
                            required: "Select from list",
                          })}>
                          <option value="">--Select--</option>
                          <option value="BASIC">BASIC </option>
                          <option value="PREMIUM">PREMIUM</option>
                          <option value="NOT-REQUIRED">NOT REQUIRED</option>
                        </select>
                        {errors.liquor && (
                          <span className="errorMsg">
                            {errors.liquor.message}
                          </span>
                        )}
                      </div>
                    </Col>
                    {(watchAllFields.liquor === "BASIC" ||
                      watchAllFields.liquor === "PREMIUM") && (
                      <Col md={4}>
                        <div className="input__container">
                          <label htmlFor="liquorPackage">
                            Liquor Package
                            <span className="required_field">*</span>
                          </label>
                          <select
                            id="liquor"
                            name="liquorPackage"
                            className="input-element"
                            {...register("liquorPackage", {
                              required: "Select from list",
                            })}>
                            <option value="">--Select--</option>
                            <option value="BASIC">2 HR </option>
                            <option value="PREMIUM">3 HR</option>
                            <option value="By Bottle">By Bottle</option>
                          </select>
                          {errors.liquorPackage && (
                            <span className="errorMsg">
                              {errors.liquorPackage.message}
                            </span>
                          )}
                        </div>
                      </Col>
                    )}
                  </Row>

                  <Row className="row__container">
                    <Col md={4}>
                      <div className="input__container">
                        <label htmlFor="conferenceHall">
                          Conference Hall
                          <span className="required_field">*</span>
                        </label>
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
                        <Col md={3}>
                          <div className="input__container">
                            <label>Area in Square Feet</label>
                            <Controller
                              name="squareFeet"
                              {...register("squareFeet")}
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
                        <Col md={3}>
                          <div className="input__container">
                            <label>Area in Square Meters</label>
                            <Controller
                              name="squareMeters"
                              control={control}
                              {...register("squareMeters")}
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

                        <Col md={3}>
                          <div className="input__container">
                            <label htmlFor="noOfHalls">
                              No of Halls{" "}
                              <span className="required_field">*</span>
                            </label>
                            {/* <input
                            type="text"
                            id="noOfHalls"
                            placeholder="Total Days"
                            className="input-element"
                            name="noOfHalls"
                            {...register("noOfHalls", {
                              required: "noOfHalls",
                            })}
                          /> */}
                            <select
                              id="noOfHalls"
                              name="noOfHalls"
                              className="input-element"
                              {...register("noOfHalls", {
                                required: "Select from list",
                              })}>
                              <option value="">--Select--</option>
                              <option value="1">1 </option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="others">Others</option>
                            </select>
                            {errors.noOfHalls && (
                              <span className="errorMsg">
                                {errors.noOfHalls.message}
                              </span>
                            )}
                          </div>
                        </Col>

                        <Col md={3}>
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
                            <Controller
                              id="setUpDate"
                              name="setUpDate"
                              control={control}
                              rules={{ required: "Setup Date is required" }}
                              render={({ field }) => (
                                <DatePicker
                                  selected={field.value}
                                  className="input-element"
                                  dateFormat="d MMMM, yyyy"
                                  placeholderText="Select Setup Date"
                                  onChange={(date) => field.onChange(date)}
                                />
                              )}
                            />

                            {!watchAllFields.setUpDate && errors.setUpDate && (
                              <span style={{ color: "red" }}>
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
                            <Controller
                              id="conferenceStartDate"
                              name="conferenceStartDate"
                              control={control}
                              rules={{
                                required: "Start Date is required",
                                validate: (value) =>
                                  (value &&
                                    (!setUpDate || value > setUpDate)) ||
                                  "Start date must be after setup date",
                              }}
                              render={({ field }) => (
                                <DatePicker
                                  selected={field.value}
                                  className="input-element"
                                  conferenceStartDate={setUpDate}
                                  dateFormat="d MMMM, yyyy"
                                  placeholderText="Select Start Date"
                                  onChange={(date) => field.onChange(date)}
                                  minDate={setUpDate}
                                />
                              )}
                            />

                            {!watchAllFields.conferenceStartDate &&
                              errors.conferenceStartDate && (
                                <span style={{ color: "red" }}>
                                  {errors.conferenceStartDate.message}
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

                            <Controller
                              name="conferenceEndDate"
                              control={control}
                              rules={{
                                required: "End Date is required",
                                validate: (value) =>
                                  (value &&
                                    (!conferenceStartDate ||
                                      value > conferenceStartDate)) ||
                                  "End date must be after start date",
                              }}
                              render={({ field }) => (
                                <DatePicker
                                  selected={field.value}
                                  className="input-element"
                                  placeholderText="Select End Date"
                                  dateFormat="d MMMM, yyyy"
                                  onChange={(date) => field.onChange(date)}
                                  minDate={conferenceStartDate}
                                />
                              )}
                            />

                            {!watchAllFields.conferenceEndDate &&
                              errors.conferenceEndDate && (
                                <span style={{ color: "red" }}>
                                  {errors.conferenceEndDate.message}
                                </span>
                              )}
                            {dateErrorConference && (
                              <span style={{ color: "red" }}>
                                {dateErrorConference}
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

                  {watchAllFields.noOfHalls !== "others" &&
                    watchAllFields.duration &&
                    watchAllFields.conferenceStartDate && (
                      <Row className="row__container">
                        <p className="services mt-5">Conference Agenda</p>
                        <Row className="conf__agenda inin">
                          <Col xs={1}>
                            <p>Date</p>
                          </Col>
                          <Col xs={1}>
                            <p>Day</p>
                          </Col>
                          <Col xs={1}>
                            <p>Time</p>
                          </Col>
                          {totalHall.map((item, index) => {
                            return (
                              <Col md={2}>
                                <p>Hall {index + 1} </p>

                                <div className="input__container">
                                  {/* <label htmlFor={`VenueName${index}`}>
                                  Venue Name
                                  <span className="required_field">*</span>
                                </label> */}
                                  <input
                                    type="text"
                                    id="travelReasons"
                                    className="input-element"
                                    placeholder="Enter venue name"
                                    name={`VenueName${index}`}
                                    {...register(`VenueName${index}`, {
                                      required: "Please enter Venue",
                                    })}
                                  />
                                  {errors[`VenueName${index}`] && (
                                    <span className="errorMsg">
                                      {errors[`VenueName${index}`].message}
                                    </span>
                                  )}
                                </div>
                              </Col>
                            );
                          })}
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

                          let firstThreeLetters = dayName.slice(0, 3);

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
                            <Row key={index} className="mt-3">
                              {/* <Col md={1} className="conf__agenda">
                              <p>{index + 1}</p>
                            </Col> */}
                              <Col xs={1} className="conf__agenda">
                                <p>{formattedDate}</p>
                              </Col>
                              <Col xs={1} className="conf__agenda">
                                <p>({firstThreeLetters})</p>
                              </Col>
                              <Col xs={1} className="conf__agenda">
                                <div className="input__container">
                                  <input
                                    type="time"
                                    placeholder="Time"
                                    className="input-element"
                                    name={`ConferenceAgendaTime-${index}`}
                                    {...register(
                                      `ConferenceAgendaTime-${index}`,
                                      {
                                        required: "Enter Time",
                                      }
                                    )}
                                  />

                                  {errors[`ConferenceAgendaTime-${index}`] && (
                                    <span className="errorMsg">
                                      {
                                        errors[`ConferenceAgendaTime-${index}`]
                                          .message
                                      }
                                    </span>
                                  )}

                                  {/* <Button
                                  style={{ width: "50px" }}
                                  size="sm"
                                  variant="success"
                                  className="mt-2">
                                  +
                                </Button> */}
                                </div>
                              </Col>
                              {totalHall.map((item, ind) => {
                                return (
                                  <Col md={2} className="conf__agenda">
                                    <div className="input__container">
                                      <input
                                        type="text"
                                        className="input-element"
                                        name={`ConferenceAgendaActivityHall${index}-${ind}`}
                                        placeholder="Enter your Activity"
                                        {...register(
                                          `ConferenceAgendaActivityHall${index}-${ind}`,
                                          {
                                            required: "Enter your activity",
                                          }
                                        )}
                                      />

                                      {errors[
                                        `ConferenceAgendaActivityHall${index}-${ind}`
                                      ] && (
                                        <span className="errorMsg">
                                          {
                                            errors[
                                              `ConferenceAgendaActivityHall${index}-${ind}`
                                            ].message
                                          }
                                        </span>
                                      )}
                                    </div>
                                    {/* <Button
                                    style={{ width: "50px" }}
                                    size="sm"
                                    variant="success"
                                    className="mt-2">
                                    +
                                  </Button> */}
                                  </Col>
                                );
                              })}
                            </Row>
                          );
                        })}

                        <Row className="row__container">
                          <Col md={3} xs={6}>
                            <div className="input__container">
                              <a
                                target="_blank"
                                href="https://drive.google.com/drive/folders/1CPSOhxY67eZ45mns0SRC1j5rSJiIogns?usp=sharing">
                                <Button size="sm" variant="success">
                                  Upload Other Docs
                                </Button>
                              </a>
                            </div>
                          </Col>
                          <Col md={3} xs={6}>
                            <div className="input__container">
                              <a
                                target="_blank"
                                href="https://drive.google.com/drive/folders/1HuxbF_vSr4oeFCrwCYasYErL5nNPa6nC?usp=sharing">
                                <Button size="sm" variant="success">
                                  Upload Floor Plan
                                </Button>
                              </a>
                            </div>
                          </Col>
                        </Row>
                      </Row>
                    )}

                  {watchAllFields.noOfHalls == "others" && (
                    <Row className="row__container">
                      <p className="services">Conference Agenda</p>
                      <Col md={3} xs={4}>
                        <div className="input__container">
                          <a
                            target="_blank"
                            href="https://drive.google.com/drive/folders/1Qa0IQ1Ny04p6DdFp6bGXvxy0kue5ZkWh?usp=sharing">
                            <Button size="sm" variant="success">
                              Upload Hall details
                            </Button>
                          </a>
                        </div>
                      </Col>
                      <Col md={3} xs={6}>
                        <div className="input__container">
                          <a
                            target="_blank"
                            href="https://drive.google.com/drive/folders/1CPSOhxY67eZ45mns0SRC1j5rSJiIogns?usp=sharing">
                            <Button size="sm" variant="success">
                              Upload Other Docs
                            </Button>
                          </a>
                        </div>
                      </Col>
                      <Col md={3} xs={6}>
                        <div className="input__container">
                          <a
                            target="_blank"
                            href="https://drive.google.com/drive/folders/1HuxbF_vSr4oeFCrwCYasYErL5nNPa6nC?usp=sharing">
                            <Button size="sm" variant="success">
                              Upload Floor Plan
                            </Button>
                          </a>
                        </div>
                      </Col>
                      <Col md={3} xs={6}></Col>
                    </Row>
                  )}
                  {watchAllFields.conferenceHall == "Yes" &&
                    watchAllFields.duration &&
                    watchAllFields.noOfHalls &&
                    watchAllFields.conferenceStartDate && (
                      <Row className="row__container">
                        <Col md={3}>
                          <div className="input__container">
                            <label htmlFor="floorPlanLink">
                              Insert floor plan link
                            </label>
                            <input
                              type="text"
                              id="floorPlanLink"
                              className="input-element"
                              placeholder="Insert your link"
                              name="floorPlanLink"
                              {...register("floorPlanLink", {
                                required: "Please insert your link",
                              })}
                            />
                            {errors.floorPlanLink && (
                              <span className="errorMsg">
                                {errors.floorPlanLink.message}
                              </span>
                            )}
                          </div>
                        </Col>
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
                        {watchAllFields.FullDay && (
                          <>
                            <>
                              <input
                                type="text"
                                name="totalFullDaysSightSeeing"
                                className="input__text"
                                {...register("totalFullDaysSightSeeing")}
                                placeholder="Tot. Days"
                              />
                            </>
                            {/* <input
                            type="text"
                            name="totalFullDaysSightSeeing"
                            className="input__text"
                            placeholder="Tot. Days"
                            {...register("totalFullDaysSightSeeing", {
                              required: "Enter Tot. days",
                            })}
                          />
                          <div>
                            {errors.totalFullDaysSightSeeing && (
                              <span className="errorMsg">
                                {errors.totalFullDaysSightSeeing.message}
                              </span>
                            )}
                          </div> */}
                          </>
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
                              name="totalHalfDaysSightSeeing"
                              className="input__text"
                              placeholder="Tot. Days"
                              {...register("totalHalfDaysSightSeeing")}
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
                              {...register("sightSeeingSpecify")}
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
                    !watchAllFields.Specify ? (
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
              {/* 
            // International Country
country-0
: 
{id: 1, name: 'Afghanistan', iso3: 'AFG', iso2: 'AF', numeric_code: '004', …}
country-1
: 
{id: 4, name: 'Algeria', iso3: 'DZA', iso2: 'DZ', numeric_code: '012', …}
departureCityTotPax

: 

// Departure City
Array(2)
0
: 
{value: 'kolkata', label: 'Kolkata'}
1
: 
{value: '21', label: '21'}
length
:  
2
[[Prototype]]
: 
Array(0) */}
              {/* international city */}
              {/* 
state-0
: 
Array(1)
0
: 
{value: 'Badghis', label: 'Badghis'}
length
: 
1
[[Prototype]]
: 
Array(0)
state-1
: 
[{…}] */}

              <button
                type="submit"
                className="btn submit_btn"
                onClick={errorhandle}>
                {loading ? "submitting..." : "Submit"}
              </button>
              {loading && (
                <Spinner
                  animation="grow"
                  size="md"
                  className="loading_symbol"
                  variant="danger"
                />
              )}
              <Container fluid className="quatation">
                <Row>
                  <Col xl={2} lg={2}>
                    {/* <Link to="/get-quatation/" onClick={errorhandles}> */}
                    <h5>Get Quotation</h5>
                    {/* </Link> */}
                  </Col>

                  <Col xl={2} lg={2} onClick={errorhandles}>
                    <Link to="/get-quatation/">
                      <h6>Airline</h6>
                    </Link>
                  </Col>
                  <Col xl={2} lg={2} onClick={errorhandles}>
                    <Link to="/Hotel-quatation/">
                      <h6>Hotel</h6>
                    </Link>
                  </Col>
                  <Col xl={2} lg={2} onClick={errorhandles}>
                    <Link to="/Visa-quatation/">
                      <h6>Visa</h6>
                    </Link>
                  </Col>
                  <Col xl={2} lg={2} onClick={errorhandles}>
                    <Link to="/Land-quatation/">
                      <h6>Land</h6>
                    </Link>
                  </Col>
                  <Col xl={2} lg={2} onClick={errorhandles}>
                    <Link to="/Event-quatation/">
                      <h6>Event</h6>
                    </Link>
                  </Col>
                </Row>
              </Container>

              {/* <Link>
                <p className="quatation">Save Draft</p>
              </Link> */}
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
      </>
    </FormProvider>
  );
};

export default App;
