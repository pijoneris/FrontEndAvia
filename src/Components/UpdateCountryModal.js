import React, {useEffect, useState} from "react";
import {Modal, Button, Form, Row, Col} from "react-bootstrap"
import '../Styles/popup.css'
import '../Styles/usercomponent.css'


export default function UpdateCountryModal(props) {

    function handleChanges(e) {
        const {name, value} = e.target;

        var newRow = Object.assign({}, props.dataRow);
        newRow[name] = value;
        props.setDataRow(newRow)

    }

    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update country
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center">
                <div className="d-flex flex-column w-75 justify-content-center align-content-center ">
                        <Row>
                            <Col>
                                <Form.Label>Country</Form.Label>
                                <Form.Control placeholder="Country" name="country" value={props.dataRow.country} onChange={handleChanges}/>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col>
                                <Form.Label>Country code</Form.Label>
                                <Form.Control placeholder="Country code" name="countryCode" value={props.dataRow.countryCode} onChange={handleChanges}/>
                            </Col>
                        </Row>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={(e)=>props.updateCountry(props.dataRow)}>Update</Button>
            </Modal.Footer>
        </Modal>
    )
}