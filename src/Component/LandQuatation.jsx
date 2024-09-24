import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FormContext } from "../FormContext"; // Import the context
import Button from "react-bootstrap/Button";

import { useContext } from "react";

const LandQuatation = () => {
  const { formData } = useContext(FormContext);
  return (
    <div>
      <h2 className="room_reservation_text pt-5 pb-4" id="bookingText">
        Quatation Form Land
      </h2>
      {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
      <Container>
        {formData.landArrangement == true && (
          <Row>
            <Col>
              <div className="Dataint mt-4">
                <p>
                  {" "}
                  Airport Arrival Transfer: {formData?.airportArrivalTransfers}
                </p>
                <p>
                  {" "}
                  Airport Departure Transfer: {formData?.airportDepartureTrans}
                </p>
                <p>Arrival Date: {formData?.arrvilaDate}</p>
                <p>Arrival Time : {formData?.arrvilTime}</p>
                <p>Departure Date : {formData?.departureDate}</p>
                <p>Departure Time: {formData?.departureTime}</p>
              </div>
            </Col>
          </Row>
        )}
        {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}

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
          <Col className="pt-2 pb-4">
            <Link to="/">
              <h6>Home Page</h6>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandQuatation;
