import axios from 'axios'
import moment from 'moment'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import "./ThanksStyle.css"

import 'moment-timezone';

export default class ThankYou extends Component {
    constructor(props) {
        super(props);

        let loggedIn = true;
        if (localStorage.getItem("tokenLogin") === null
            && localStorage.getItem("tokenRegister") === null) {
            loggedIn = false
        }

        this.state = {
            details: null,
            loggedIn
        }
    }

    componentDidMount() {
        let id = localStorage.getItem("bookingID");
        // axios.get("https://mocki.io/v1/10050b8d-c576-4d2e-8f9c-af24f054fc0b")

        // axios.get("http://localhost:3001/bookings/" + id)
        axios.get("https://doctorsverse-backend.herokuapp.com/bookings/" + id)
            .then(response => {
                const arr = response.data.map(items => items);
                this.setState(
                    {
                        details: arr[0]
                    })
            })
    }

    TimetoIST(time) {
        let b = moment(time).tz("Asia/Kolkata");
        b.add(330, 'minutes');
        return b.format('HH:mm A');
    }

    render() {
        if (this.state.loggedIn === false) {
            return <Redirect to="/login" />
        }
        if (this.state.details === null) return null;
        let result = this.state.details;

        return (
            <div className="ThankYouPage">
                <main className="text_section">
                    <div className="Header_Container">
                        <h1 className="Congrats" data-text="Congratulations...">Congratulations...</h1>
                    </div>
                    <div className="Congrats_Message">
                        <span className="Message_Details">
                            Your <span className="Yellow_Color">Appointment</span> is Successfully Booked
                        </span>
                    </div>
                    <div className="Booking_Id">
                        <div>
                            Patient ID is <span className="Yellow_Color">{result.patientBookinginfo.id}</span>
                        </div>
                    </div>
                    <div className="Congrats_Details">
                        <h2 className="Details_Header">Appointment Details</h2>
                        <div className="grid-container">
                            <div className="Details_Area">
                                Patient's Name :
                                <br />
                                <span className="Yellow_Color">
                                    {result.patientBookinginfo.full_name}
                                </span>
                            </div>
                            <div className="Details_Area">
                                Patient's Age :
                                <br />
                                <span className="Yellow_Color">
                                    {result.patientBookinginfo.age}
                                </span>
                            </div>
                            <div className="Details_Area">
                                Patient's Gender :
                                <br />
                                <span className="Yellow_Color">
                                    {result.patientBookinginfo.gender}
                                </span>
                            </div>
                            <div className="Details_Area">
                                Patient's Email :
                                <br />
                                <span className="Yellow_Color">
                                    {result.patientBookinginfo.email}
                                </span>
                            </div>
                            <div className="Details_Area">
                                Patient's Contact :
                                <br />
                                <span className="Yellow_Color">
                                    {result.patientBookinginfo.contact_number}
                                </span>
                            </div>
                            <div className="Details_Area">
                                Doctor's Name :
                                <br />
                                <span className="Yellow_Color">
                                    {result.bookingDocInfo.doc_name}
                                </span>
                            </div>
                            <div className="Details_Area">
                                Hospital :
                                <br />
                                <span className="Yellow_Color">
                                    {result.bookingHospitalInfo.hospital_name}
                                </span>
                            </div>
                            <div className="Details_Area">
                                Department :
                                <br />
                                <span className="Yellow_Color">
                                    {result.bookingDepartment.specialization_name}
                                </span>
                            </div>
                            <div className="Details_Area">
                                Fees :
                                <br />
                                <span className="Yellow_Color">
                                    {result.bookingDocInfo.fees}
                                </span>
                            </div>
                            <div className="Details_Area">
                                Doctor's Contact :
                                <br />
                                <span className="Yellow_Color">
                                    {result.bookingDocInfo.contact}
                                </span>
                            </div>
                        </div>
                        <div className="Booking_Timings Details_Area">
                            Date and Timings : <span className="Yellow_Color">

                                {moment(result.postBookingDetails.appointment_taken_date).format('MMMM DD YYYY')}

                            </span> at <span className="Yellow_Color">
                                {this.TimetoIST(result.postBookingDetails.appointment_taken_date)}
                            </span>
                        </div>
                    </div>
                    <button className="Homepage_Button">
                        <a href="/banner">Go back to Homepage</a>
                    </button>
                </main>
            </div>
        )
    }
}
