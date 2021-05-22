import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import './formStyle.css'

import DatePicker from "react-datepicker";
import { getDay, subDays, setHours, setMinutes, setSeconds } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

import moment from 'moment'
import axios from 'axios';

export default class bookingForm extends Component {
    constructor(props) {
        super(props);

        let loggedIn = true;
        if (localStorage.getItem("tokenLogin") === null
            && localStorage.getItem("tokenRegister") === null) {
            loggedIn = false
        }

        let T = localStorage.getItem("startTime");
        let hr = T.substring(0, T.indexOf(":"))
        let min = T.substring(T.indexOf(":") + 1, T.lastIndexOf(":"))
        // let docID = localStorage.getItem("docID")

        this.state = {
            name: "",
            email: "",
            gender: "",
            age: "",
            phoneNo: "",
            address: "",
            startDate: setHours(setMinutes(setSeconds(new Date(), "00"), min), hr),
            loggedIn
        }
    }

    isWeekday = date => {
        let daysArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let num = 0;
        let dayVal = localStorage.getItem("dayOfWeek");
        for (let i = 0; i < 7; i++) {
            if (daysArr[i].toLowerCase() === dayVal.toLowerCase()) {
                num = i
            }
        }
        const day = getDay(date);
        return day === num
        // return day !== 0 && day !== 6;
    }

    onNameChange = (event) => {
        this.setState({ name: event.target.value });
    }
    onAgeChange = (event) => {
        this.setState({ age: event.target.value });
    }
    onEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }
    onPhoneChange = (event) => {
        this.setState({ phoneNo: event.target.value });
    }
    onAddressChange = (event) => {
        this.setState({ address: event.target.value });
    }
    onGenderChange = (event) => {
        this.setState({ gender: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        let val = this.state.startDate;
        val = moment(val).format("YYYY-MM-DD HH:mm:ss")

        let ErrorText = document.querySelector(".Error_Handling")

        const formData = {
            name: this.state.name,
            age: this.state.age,
            email: this.state.email,
            phoneNo: this.state.phoneNo,
            address: this.state.address,
            gender: this.state.gender,

            hospName: localStorage.getItem("hospName"),
            deptName: localStorage.getItem("DeptName"),
            docName: localStorage.getItem("DocName"),
            hospID: localStorage.getItem("hospID"),
            docID: localStorage.getItem("docID"),
            fees: localStorage.getItem("fees"),
            timings: localStorage.getItem("timings"),
            UserID: localStorage.getItem("UserID"),
            bookingDateTime: val
        }

        if (formData.name === "" || formData.age === "" ||
            formData.email === "" || formData.phoneNo === "" ||
            formData.address === "" || formData.gender === "") {
            this.setState({
                name: "",
                age: "",
                email: "",
                phoneNo: "",
                address: "",
                gender: ""
            })
            ErrorText.innerHTML = "Fill Out Correctly!!!!"
        }
        else {
            axios.post("http://localhost:3001/bookings", formData)
                .then(function (response) {
                    localStorage.setItem("bookingID", response.data.id)
                    window.location.href = "/ThankYou";
                })
                .catch(function (error) {
                    console.log(error.response.data);
                })
        }
    }

    render() {
        if (this.state.loggedIn === false) {
            return <Redirect to="/login" />
        }
        return (
            <div className="booking_form">
                <div className="split_screen">
                    <div className="left">
                        <section className="copy">
                            <h1 className="Default_Values">Your Booking Details</h1>
                            <div className="Prev_Values">

                                <div className="dis-flex size1">
                                    <div className="txt1 p-r-25">
                                        <i className="fas fa-hospital"></i>
                                    </div>

                                    <div className="flex-col size2">
                                        <span className="txt1 p-b-20">
                                            Hospital And Department
                                        </span>

                                        <span className="txt3">
                                            <span style={{ marginRight: "0.25rem" }}>
                                                {localStorage.getItem("hospName")},
                                            </span>
                                            <span>{localStorage.getItem("DeptName")}</span>
                                        </span>
                                    </div>
                                </div>

                                <div className="dis-flex size1">
                                    <div className="txt1 p-r-25">
                                        <i className="fas fa-stethoscope"></i>
                                    </div>

                                    <div className="flex-col size2">
                                        <span className="txt1 p-b-20">
                                            Doctor's Name
                                        </span>

                                        <span className="txt3">
                                            {localStorage.getItem("DocName")}
                                        </span>
                                    </div>
                                </div>
                                <div className="dis-flex size1">
                                    <div className="txt1 p-r-25">
                                        <i className="fas fa-rupee-sign"></i>
                                    </div>

                                    <div className="flex-col size2">
                                        <span className="txt1 p-b-20">
                                            Consultation Fee
                                        </span>

                                        <span className="txt2">
                                            {localStorage.getItem("fees")}
                                        </span>
                                    </div>
                                </div>
                                <div className="dis-flex size1">
                                    <div className="txt1 p-r-25">
                                        <i className="far fa-calendar"></i>
                                    </div>

                                    <div className="flex-col size2">
                                        <span className="txt1 p-b-20">
                                            Select Date
                                        </span>

                                        <span className="txt3">
                                            <span style={{ marginRight: "10px", color: "white" }}>
                                                <span className="Yellow">
                                                    Timings -
                                                </span>
                                                <div className="DateTimeSpl">
                                                    {localStorage.getItem("timings")}
                                                </div>
                                            </span>
                                            <span>
                                                <span className="Yellow">
                                                    {"Select a " + localStorage.getItem("dayOfWeek")}
                                                </span> -
                                                <div className="DateTimeSpl">
                                                    <DatePicker
                                                        className="Date"
                                                        selected={Date.parse(moment(this.state.startDate, 'MM/DD/YYYY').toISOString())}
                                                        // selected={moment(this.state.startDate).toDate()}
                                                        onChange={date => this.setState({
                                                            startDate: date
                                                        })}
                                                        minDate={subDays(new Date(), 0)}
                                                        filterDate={this.isWeekday}
                                                        timeFormat="HH:mm"
                                                        dateFormat="MMMM d, yyyy"
                                                    />
                                                </div>
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="right">
                        <form action="#" method="post">
                            <section className="copy">
                                <h2 className="Booking_Heading">User Information</h2>
                            </section>
                            <div className="input_container name">
                                <label className="Booking_Label" htmlFor="fname">Full Name</label>
                                <input type="text" id="fname" name="fname" className="Name"
                                    value={this.state.name} onChange={this.onNameChange}
                                    required />
                            </div>
                            <div className="input_container age">
                                <label className="Booking_Label" htmlFor="age">Age</label>
                                <input type="text" id="age" name="age" className="Age"
                                    value={this.state.age} onChange={this.onAgeChange}
                                    required />
                            </div>
                            <div className="input_container age">
                                <label className="Booking_Label" htmlFor="gender">Gender</label>
                                <select id="gender" className="Gender" onClick={this.onGenderChange}
                                    defaultValue={'DEFAULT'} required>
                                    <option value="DEFAULT" disabled>Select Your Gender</option>
                                    <option value="Male">
                                        Male
                                    </option>
                                    <option value="Female">
                                        Female
                                    </option>
                                    <option value="Others">
                                        Others
                                    </option>
                                </select>
                            </div>
                            <div className="input_container phoneNo">
                                <label className="Booking_Label" htmlFor="phoneNo">Phone Number</label>
                                <input type="text" id="phoneNo" name="phoneNo" className="PhoneNo"
                                    value={this.state.phoneNo} onChange={this.onPhoneChange}
                                    required />
                            </div>
                            <div className="input_container email">
                                <label className="Booking_Label" htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" className="Email"
                                    value={this.state.email} onChange={this.onEmailChange}
                                    required />
                            </div>
                            <div className="input_container address">
                                <label className="Booking_Label" htmlFor="address">Address</label>
                                <textarea type="text" id="address" name="address" className="Address"
                                    value={this.state.address} onChange={this.onAddressChange}
                                    required>
                                </textarea>
                            </div>
                            <div className="Error_Handling">
                            </div>
                            <button type="submit" className="signup_btn" onClick={this.handleSubmit}>
                                Book Now
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
