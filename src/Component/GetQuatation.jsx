import { Container, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import Button from "react-bootstrap/Button";
import { FormContext } from "../FormContext"; // Import the context
import "./getqut.css";
import Table from "react-bootstrap/Table";

import { Link } from "react-router-dom";
// import { formatDate } from "react-datepicker/dist/date_utils";

const GetQuatation = () => {
  const { formData } = useContext(FormContext); // Access the form data from context
  let DepartureDate = formData?.departureDateFlight?.toString();
  let DepDate = DepartureDate?.slice(0, 15);

  let Return = formData?.returnDateFlight?.toString();
  let ret = Return?.slice(0, 15);
  let lenth = null;
  if (formData.travelBooking == true) {
    lenth = formData.travelBooking.length;
  }

  return (
    <Container>
      <div>
        <h2 className="room_reservation_text pt-5 pb-4" id="bookingText">
          Quatation Form Airlines
        </h2>
      </div>
      {/* <Container>
        <Row>
          <Col>
            <Link to="/get-quatation/">
              <h4>Airline</h4>
            </Link>
          </Col>
          <Col>
            <Link to="/Hotel-quatation/">
              <h4>Hotel</h4>
            </Link>
          </Col>
          <Col>
            <Link to="/Visa-quatation/">
              <h4>Visa</h4>
            </Link>
          </Col>
          <Col>
            <Link to="/Land-quatation/">
              <h4>Land</h4>
            </Link>
          </Col>
          <Col>
            <Link to="/Event-quatation/">
              <h4>Event</h4>
            </Link>
          </Col>
        </Row>
      </Container> */}
      <div></div>
      {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
      {/* {console.log(formData, "hello")} */}
      {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
      <Container>
        {formData?.travelBooking == true && (
          <Row>
            <Col>
              <div className="Dataint mt-4">
                <p>Booking Type: {formData?.travelBookingType}</p>
                <p>Total Pax: {formData?.totalPaxTravel}</p>
                <p>Departure Date: {DepDate}</p>
                <p>Return Date: {ret}</p>

                {/* <p>
                  Departure City:{" "}
                  {formData?.[`departureCityTravel0`]?.[0]?.label}
                </p>
                <p>Pax: {formData?.TravelRow[0]?.cityPaxTravel}</p>
                <p>Travel Class: {formData?.travelClass0?.label}</p>
                {formData?.[`departureCityTravel1`]?.[0]?.label && (
                  <>
                    <p>
                      Departure City:{" "}
                      {formData?.[`departureCityTravel1`]?.[0]?.label}
                    </p>
                    <p>Pax: {formData?.TravelRow[1]?.cityPaxTravel}</p>
                    <p>Travel Class: {formData?.travelClass1?.label}</p>
                  </>
                )} */}
              </div>
            </Col>
          </Row>
        )}
        <div className="table-responsive-wrapper">
          <Table bordered hover>
            <thead>
              <tr>
                <th>City</th>
                <th>Total Pax</th>
                <th>Travel Class</th>
                <th>Preferred Dep Time</th>

                <th>Airline</th>

                <th>Arrival Time</th>

                <th>Departure Time</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Group Quote</th>
                <th>Number of Seats</th>
              </tr>
            </thead>
            <tbody>
              {formData?.TravelRow?.map((item, indx) => {
                return (
                  //  let in=  "travelClass" + indx.toString();
                  <tr>
                    <td>{formData[`departureCityTravel${indx}`]?.label}</td>
                    <td>{item.cityPaxTravel}</td>
                    <td>{formData[`travelClass${indx}`]?.value}</td>
                    <td>{formData[`departureTimeTravel${indx}`]}</td>
                    <td>
                      {" "}
                      <input
                        type="text"
                        id="arilines"
                        placeholder="Airline"
                        className="input-element"
                        name=""
                      />
                    </td>
                    <td>
                      {" "}
                      <input
                        type="time"
                        id="arilines"
                        placeholder="Airline"
                        className="input-element"
                        name=""
                      />
                    </td>
                    <td>
                      {" "}
                      <input
                        type="time"
                        id="time"
                        placeholder="Airline"
                        className="input-element"
                        name=""
                      />
                    </td>
                    <td>
                      {" "}
                      <input
                        type="text"
                        id="price"
                        placeholder="price"
                        className="input-element"
                        name=""
                      />
                    </td>
                    <td>
                      {" "}
                      <input
                        type="text"
                        id="price"
                        placeholder="Duration"
                        className="input-element"
                        name=""
                      />
                    </td>
                    <td>
                      {" "}
                      <input
                        type="text"
                        id="price"
                        placeholder="Group Quote"
                        className="input-element"
                        name=""
                      />
                    </td>
                    <td>
                      {" "}
                      <input
                        type="text"
                        id="price"
                        placeholder="Number of Seats"
                        className="input-element"
                        name=""
                      />
                    </td>
                    {/* <td>{formData.travelClass + indx.label}</td> */}
                  </tr>
                );
              })}
              {/* <td>{formData.travelClass0.label}</td>
              <td>{formData?.[`departureCityTravel1`]?.[0]?.label}</td>
              <td>{formData?.[`departureCityTravel0`]?.[0]?.label}</td> */}
            </tbody>
          </Table>
        </div>

        {/* <Row className="row__container">
          <Col>
            <div className="input__container">
              <label htmlFor="contactPerson">
                Airline <span className="required_field">*</span>
              </label>
              <input
                type="text"
                id="arilines"
                placeholder="Airline"
                className="input-element"
                name="Airlines"
              />
            </div>
          </Col>

          <Col>
            <div className="input__container">
              <label htmlFor="contactPerson">
                Flight No <span className="required_field">*</span>
              </label>
              <input
                type="text"
                id="arilines"
                placeholder="Flight No"
                className="input-element"
                name="Airlines"
              />
            </div>
          </Col>
          <Col>
            <div className="input__container">
              <label>Departure Time</label>
              <input
                type="time"
                className="input-element"
                placeholder="Enter Time"
              />
            </div>
          </Col>
          <Col>
            <div className="input__container">
              <label>Arrival Time</label>
              <input
                type="time"
                className="input-element"
                placeholder="Enter Time"
              />
            </div>
          </Col>
        </Row> */}

        {/* <Row className="row__container">
          <Col>
            <div className="input__container">
              <label htmlFor="contactPerson">
                Price <span className="required_field">*</span>
              </label>
              <input
                type="text"
                id="arilines"
                placeholder="Price"
                className="input-element"
                name="Airlines"
              />
            </div>
          </Col>

          <Col>
            <div className="input__container">
              <label htmlFor="contactPerson">
                Transit Duration <span className="required_field">*</span>
              </label>
              <input
                type="text"
                id="arilines"
                placeholder="Transit Duration"
                className="input-element"
                name="Airlines"
              />
            </div>
          </Col>
          <Col>
            <div className="input__container">
              <label htmlFor="contactPerson">
                Group Quote <span className="required_field">*</span>
              </label>
              <input
                type="text"
                id="arilines"
                placeholder="Group Quote"
                className="input-element"
                name="Airlines"
              />
            </div>
          </Col>

          <Col>
            <div className="input__container">
              <label htmlFor="contactPerson">
                Number of Seats <span className="required_field">*</span>
              </label>
              <input
                type="text"
                id="arilines"
                placeholder="Number of Seats"
                className="input-element"
                name="Airlines"
              />
            </div>
          </Col>
        </Row> */}

        <Col className="mt-4 mb-4 d-flex align-items-end">
          <Button
            type="button"
            className="btn btn-danger"
            size="sm"
            onClick={() => removeTravelRow(index)}>
            Send To Supplier
          </Button>
        </Col>
      </Container>
      <Row>
        <Col className="pt-2 pb-4">
          <Link to="/">
            <h6>Home Page</h6>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default GetQuatation;
