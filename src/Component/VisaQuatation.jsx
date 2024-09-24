import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FormContext } from "../FormContext"; // Import the context
import Button from "react-bootstrap/Button";

import { useContext } from "react";

const VisaQuatation = () => {
  const { formData } = useContext(FormContext);
  return (
    <div>
      <h2 className="room_reservation_text pt-5 pb-4" id="bookingText">
        Quatation Form Visa
      </h2>
      {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
      <Container>
        {formData.visaRequirement == true && (
          <Row>
            <Col>
              <div className="Dataint mt-4">
                <p>Type: {formData?.groupType}</p>
                <p>Total Pax: {formData?.totalPaxVisaGroup}</p>

                {/* <p>Group Size: {formData?.groupSize}</p> */}
                <p>
                  Preffered Duration : {formData?.visaPreferredDurationGroup}
                </p>
                <p>Total Days : {formData?.gitVisaDays0}</p>
                <p>Remarks: {formData?.Remarks0}</p>
              </div>
            </Col>
          </Row>
        )}
        {/* "visaCountryGroup": [
    {
      "value": "angola",
      "label": "Angola"
    }
  ] */}

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
        <Col className="pt-2 pb-4">
          <Link to="/">
            <h6>Home Page</h6>
          </Link>
        </Col>
      </Container>
    </div>
  );
};

export default VisaQuatation;
