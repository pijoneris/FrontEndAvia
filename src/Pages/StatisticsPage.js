import React from "react";
import {Button, ButtonToolbar, Col, Form, Row} from "react-bootstrap";
import {useState, useEffect} from "react"
import DatePicker from "react-datepicker"
import '../Styles/styles.css'
import API from "../Networking/API";
import TableComponent from "../Components/TableComponent";
import SnackbarFeedback from "../Components/SnackbarFeedback";
import CustomLoader from "../Components/CustomLoader";

require('react-datepicker/dist/react-datepicker.css')

export default function StatisticsPage(){
    const [reqBody, setReqBody] = useState({hourStartBound: "0", hourEndBound: "3", startDate:"2020-02-02", stopDate: "2020-03-03"});
    const [resBody, setResBody] = useState([]);

    const [isQueryActive, setQueryActive] = useState(false);
    const [showStatus, setShowStatus] = useState(false);
    const [snackbarConfig, setSnackBarConfig] = useState({isSuccessful: false});

    function handleChange(e) {
        const {name, value} = e.target
        let body = Object.assign({}, reqBody);
        body[name] = value
        setReqBody(body)
    }

    const headers = [
        {key:"fullName", display: "Name", editable:false, selectable: false},
        {key:"hourDuration", display: "H", editable:false, selectable: false},
        {key:"minuteDuration", display: "Min", editable:false, selectable: false},
        {key:"totalDifCardsPerUser", display: "C/User", editable:false, selectable: false},
        {key:"totalPaymentPerReservation", display: "PC/Res", editable:false, selectable: false},
        {key:"totalPaymentSumPerReservation", display: "PS/Res", editable:false, selectable: false},
        {key:"totalDifCardsUsedPerReservation", display: "CU/Res", editable:false, selectable: false},
    ];

    function formStats(){
        setQueryActive(true)
        API.StatsAPI.getFlightStats(reqBody).then(response=>{
            const obj = [];
            for (const key of Object.keys(response)){
                obj.push({flightNumber: key, reservations: response[key]})
            }
            setResBody(obj);
            responseFeedback(true)
        }).catch(error=>{
            responseFeedback(false)
        })
    }

    return(
        <div className="content overflow-auto">
            <h1 className="mt-5">Flights statistics page(L3)</h1>
            <h4 className="mt-2">Form statistics using duration and dates bound</h4>

            <div className="mt-5 d-flex flex-column w-50 justify-content-center align-content-center">
                <Row>
                    <Col>
                        <Form.Control placeholder="From Hour" name="hourStartBound" onChange={handleChange}/>
                    </Col>
                    <Col >
                        <Form.Control placeholder="To Hour" name="hourEndBound" onChange={handleChange} />
                    </Col>
                    <Col>
                        <Form.Control type="date"  placeholder="From Hour" name="startDate" onChange={handleChange}/>
                    </Col>
                    <Col >
                        <Form.Control type="date" placeholder="To Hour" name="stopDate" onChange={handleChange} />
                    </Col>
                </Row>
            </div>

            <ButtonToolbar className="mt-5">
                <Button className="ml-0" variant="primary" onClick={formStats}>Form statistics</Button>
            </ButtonToolbar>

            {
                resBody.length !==0 ?
                    <div className=" w-75 mt-4 d-flex flex-column align-items-center">
                        {
                            resBody.map((data=>{
                                return <div className="mt-4 border p-3 border-top w-75 d-flex flex-column d-flex align-items-center">
                                    <div className="w-100  d-flex align-items-start">
                                        <h3>Flight id - {data.flightNumber}</h3>
                                    </div>
                                    <TableComponent
                                        header={headers}
                                        data={data.reservations}
                                        size="sm"
                                    />
                                    <div className="w-75 d-flex justify-content-end">
                                        <p>Reservations in flight: {data.reservations.length}</p>
                                    </div>
                                </div>
                            }))
                        }
                        <h4 className="mt-5">Total flights {resBody.length}</h4>
                    </div>
                    : <h4 className="mt-5">No results match query</h4>
            }
            <SnackbarFeedback
                show={showStatus}
                setShow={setShowStatus}
                snackbarConfig={snackbarConfig}
            />

            {isQueryActive ? <CustomLoader/> : null}

        </div>
    )

    function responseFeedback(success){
        setShowStatus(true)
        setSnackBarConfig({isSuccessful: success})
        setQueryActive(false)
    }
}