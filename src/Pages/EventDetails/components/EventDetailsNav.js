import React from "react";
import { Container } from "react-bootstrap";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router";

const EventDetailsNav = () => {

    
    const navigate = useNavigate()

    return (
        <Container className="Eventcloseeventnav">
            <div className="Eventcloseicondiv">
                <button onClick={() => { navigate("/home") }}>
                    <CgClose />
                </button>
            </div>
            <div className="Eventclosenavtext">
                <section>
                    <span>Landparcel - Intervention</span>
                    <br />
                    <p>Sorghum, Chinnaiah Polam, Kashimnagar</p>
                </section>
            </div>
        </Container>
    )
}

export default EventDetailsNav
