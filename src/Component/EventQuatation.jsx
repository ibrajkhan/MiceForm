import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FormContext } from "../FormContext"; // Import the context
import Button from "react-bootstrap/Button";

import { useContext } from "react";

const EventQuatation = () => {
  const { formData } = useContext(FormContext);
  return (
    <div>
      <h2 className="room_reservation_text pt-5 pb-4" id="bookingText">
        Quatation Form Event
      </h2>
      {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}

      <Container>
        {formData.event == true && (
          <Row>
            <Col>
              <div className="Dataint mt-4">
                <p>Stage: {formData?.stage}</p>
                <p>Stage Side Panel: {formData?.stageSidePanel}</p>
                <p>Podium with Branding: {formData?.podiumsWithBranding}</p>
                <p>Seps : {formData?.Steps}</p>
                <p>Entry Gate Arch : {formData?.EntryGateArch}</p>
                <p>Pp System: {formData?.paSystem}</p>

                <p>Base Stage Monitor: {formData?.BaseStageMonitor}</p>
                <p>Channel Mixer : {formData?.ChannelMixer}</p>
                <p>Mic : {formData?.Mic}</p>
                <p>UPS Green Gensets: {formData?.upsGreenGensets}</p>
              </div>
            </Col>
          </Row>
        )}
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

export default EventQuatation;
