import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FormContext } from "../FormContext"; // Import the context
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import { useContext } from "react";

const HotelQuatation = () => {
  const { formData } = useContext(FormContext);
  return (
    <div>
      <h2 className="room_reservation_text pt-5 pb-4" id="bookingText">
        Quatation Form Hotel
      </h2>
      {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
      {/* "hotelArrangements": true,
  "purposeOfTravel": "CEO Conclave",
  "approxDBL": "33",
  "approxSGL": "333",
  "hotelCategory": "5 Star",
  "roomType": "jd",
  "liquor": "PREMIUM",
  "conferenceHall": "No", */}
      <Container>
        <h3> Dear</h3>
        <p>Will appreciate your sharing best quote basis below specs</p>

        {/* {formData.hotelArrangements == true && (
          <>
            <Row>
              <Col>
                <div className="Dataint mt-3 mb-3">
                  <p> Purpose of Travel: {formData?.purposeOfTravel}</p>
                  <p> Approx DBL: {formData?.approxDBL}</p>
                  <p> Approx SGL: {formData?.approxSGL}</p>
                  <p>Hotel Category: {formData?.hotelCategory}</p>
                  <p>Room Type: {formData?.roomType}</p>
                  <p>Liquire: {formData?.liquor}</p>
                  <p>Conference Hall: {formData?.conferenceHall}</p>
                </div>
              </Col>
            </Row>
          </>
        )} */}
        {formData?.destination == "national" && (
          <div className="table-responsive-wrapper">
            <Table bordered hover>
              <thead>
                <tr>
                  <th>City</th>
                  <th>Dates</th>
                  <th>No of Rms</th>
                  <th>SGL</th>

                  <th>DBL</th>

                  <th>Nights</th>

                  <th>Conf Req </th>
                  <th>Plan</th>
                  <th>Other</th>
                </tr>
              </thead>
              <tbody>
                {formData?.national__city?.map((item, indx) => {
                  return (
                    //  let in=  "travelClass" + indx.toString();
                    <tr>
                      <td>{item?.label}</td>

                      <td>
                        {" "}
                        <input
                          type="Date"
                          id="arilines"
                          // width={200}
                          placeholder="Date"
                          className="input-element"
                          name=""
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          type="text"
                          id="Rooms"
                          placeholder="Rooms"
                          className="input-element"
                          name=""
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          type="text"
                          id="SGL"
                          placeholder="SGL"
                          className="input-element"
                          name=""
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          type="text"
                          id="DBL"
                          placeholder="DBL"
                          className="input-element"
                          name=""
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          id="Nights"
                          placeholder="Nights"
                          className="input-element"
                          name=""
                        />
                      </td>
                      <td>
                        <select
                          id="ConfReq"
                          name="ConfReq"
                          className="input-element">
                          <option value="">--Select--</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </td>
                      <td>
                        <select id="plan" name="plan" className="input-element">
                          <option value="">--Select--</option>
                          <option value="yes">BB</option>
                          <option value="no">MAPAI</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="Other"
                          placeholder="Other"
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
        )}

        {formData?.destination == "international" && (
          <div className="table-responsive-wrapper">
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Country</th>
                  <th>City</th>
                  <th>Date</th>

                  <th>No of Rms</th>
                  <th>SGL</th>

                  <th>DBL</th>

                  <th>Nights</th>

                  <th>Conf Req </th>
                  <th>Plan</th>
                  <th>Other</th>
                </tr>
              </thead>
              <tbody>
                {formData?.countries?.map((item, indx) => {
                  return (
                    //  let in=  "travelClass" + indx.toString();
                    <>
                      {/* <td>{item?.country?.value}</td> */}
                      {item?.cities?.map((ite, idx) => {
                        return (
                          <tr>
                            <td>{item?.country?.value}</td>
                            <td key={idx}>{ite?.value}</td>
                            <td>
                              {" "}
                              <input
                                type="Date"
                                id="arilines"
                                // width={200}
                                placeholder="Date"
                                className="input-element"
                                name=""
                              />
                            </td>
                            <td>
                              {" "}
                              <input
                                type="text"
                                id="Rooms"
                                placeholder="Rooms"
                                className="input-element"
                                name=""
                              />
                            </td>
                            <td>
                              {" "}
                              <input
                                type="text"
                                id="SGL"
                                placeholder="SGL"
                                className="input-element"
                                name=""
                              />
                            </td>
                            <td>
                              {" "}
                              <input
                                type="text"
                                id="DBL"
                                placeholder="DBL"
                                className="input-element"
                                name=""
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                id="Nights"
                                placeholder="Nights"
                                className="input-element"
                                name=""
                              />
                            </td>
                            <td>
                              <select
                                id="ConfReq"
                                name="ConfReq"
                                className="input-element">
                                <option value="">--Select--</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </select>
                            </td>
                            <td>
                              <select
                                id="plan"
                                name="plan"
                                className="input-element">
                                <option value="">--Select--</option>
                                <option value="yes">BB</option>
                                <option value="no">MAPAI</option>
                              </select>
                            </td>
                            <td>
                              <input
                                type="text"
                                id="Other"
                                placeholder="Other"
                                className="input-element"
                                name=""
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  );
                })}
                {/* <td>{formData.travelClass0.label}</td>
              <td>{formData?.[`departureCityTravel1`]?.[0]?.label}</td>
              <td>{formData?.[`departureCityTravel0`]?.[0]?.label}</td> */}
              </tbody>
            </Table>
          </div>
        )}

        {/* <Row className="row__container">
              <Col md={4}>
                <div className="input__container">
                  <label htmlFor="">
                    City <span className="required_field">*</span>
                  </label>
                  <input
                    type="text"
                    id="photTotalDays"
                    placeholder="City"
                    className="input-element"
                  />
                </div>
              </Col>

              <Col md={4}>
                <div className="input__container">
                  <label htmlFor="da">Date</label>
                  <input
                    type="Date"
                    className="input-element"
                    placeholder="Enter Time"
                  />
                </div>
              </Col>

              <Col md={4}>
                <div className="input__container">
                  <label htmlFor="">
                    No of Rooms <span className="required_field">*</span>
                  </label>
                  <input
                    type="text"
                    id="photTotalDays"
                    placeholder="Tot. Rooms"
                    className="input-element"
                  />
                </div>
              </Col>
            </Row>
            <Row className="row__container">
              <Col md={4}>
                <div className="input__container">
                  <label htmlFor="Trusses">
                    Plan
                    <span className="required_field">*</span>
                  </label>
                  <select id="Trusses" name="Trusses" className="input-element">
                    <option value="">Select</option>
                    <option value="Yes"> BB </option>
                    <option value="No">MAPAI</option>
                  </select>
                </div>
              </Col>
              <Col md={4}>
                <div className="input__container">
                  <label htmlFor="">
                    Nights <span className="required_field">*</span>
                  </label>
                  <input
                    type="text"
                    id="photTotalDays"
                    placeholder="Nights"
                    className="input-element"
                  />
                </div>
              </Col>
              <Col md={4}>
                <div className="input__container">
                  <label htmlFor="">
                    Others <span className="required_field">*</span>
                  </label>
                  <input
                    type="text"
                    id=""
                    placeholder="Others"
                    className="input-element"
                  />
                </div>
              </Col>
            </Row> */}
        <Row>
          <Col className="mt-4">
            <p> Please give the break up of the quote,whereever feasible.</p>

            <p>
              Please advise the tax rate and if the above quote includes the
              same .
            </p>

            <p>
              Please confirm the availabilty or rooms & banquet space as
              requested.
            </p>
          </Col>
        </Row>

        <Row>
          <Col className="mt-4 mb-4 d-flex align-items-end">
            <Button
              type="button"
              className="btn btn-danger"
              size="sm"
              onClick={() => removeTravelRow(index)}>
              Send To Supplier
            </Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <Link to="/">
              <h6 className="pt-4">Home Page</h6>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HotelQuatation;
