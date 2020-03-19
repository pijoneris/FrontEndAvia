import React, {useEffect, useState} from "react";
import {Modal, Button, Form, Row, Col} from "react-bootstrap"
import '../Styles/popup.css'
import '../Styles/usercomponent.css'


export default function UpdateSuggestionModal(props) {

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
                    Update currency
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex  flex-column w-100 h-50 ">
                    <div className="d-flex justify-content-center w-100 h-75 flex-row">
                        <Row>
                            <Col>
                                <Form.Control placeholder="Place name" name="placeName" value={props.dataRow.placeName} onChange={handleChanges}/>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col>
                                <Form.Control placeholder="Ticket price" name="ticketPrice" value={props.dataRow.ticketPrice} onChange={handleChanges}/>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col>
                                <Form.Control placeholder="Image Url" name="imageUrl" value={props.dataRow.imageUrl} onChange={handleChanges}/>
                            </Col>
                        </Row>
                        <Col className="mt-4">
                            <Form.Control as="select" name="isFamilyFriendly" value={props.data.isFamilyFriendly} onChange={handleChanges}>
                                <option>Is family friendly?</option>
                                <option value="1">Family friendly</option>
                                <option value="0">Adults only</option>
                            </Form.Control>
                        </Col>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={(e)=>props.updateSuggestion(props.dataRow)}>Update</Button>
            </Modal.Footer>
        </Modal>
    )
}