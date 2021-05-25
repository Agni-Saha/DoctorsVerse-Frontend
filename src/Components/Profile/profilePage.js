import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './profileStyle.css'
import $ from 'jquery'
import axios from 'axios'
import moment from 'moment'

export default class profilePage extends Component {
    constructor(props) {
        super(props)

        let loggedIn = true;
        if (localStorage.getItem("tokenLogin") === null
            && localStorage.getItem("tokenRegister") === null) {
            loggedIn = false
        }

        this.state = {
            profileDetails: null,
            loggedIn
        }
    }
    componentDidMount() {
        let id = localStorage.getItem("UserID")
        // axios.get("https://mocki.io/v1/10050b8d-c576-4d2e-8f9c-af24f054fc0b")

        // axios.get("http://localhost:3001/profile/" + id)
        axios.get("https://doctorsverse-backend.herokuapp.com/profile/" + id)
            .then(response => {
                const data = response.data
                this.setState({
                    profileDetails: data
                })
            })
        window.addEventListener("scroll", this.sidebarEdit);
    }

    // navbarEdit() {
    //     $('.navbar-collapse a').click(function () {
    //         $(".navbar-collapse").collapse('hide');
    //     });
    // }

    sidebarEdit() {
        var contentSection = $('.content-section, .main-banner');

        $(window).on('scroll', function () {
            updateNavigation();
        })

        updateNavigation();

        function updateNavigation() {
            contentSection.each(function () {
                var sectionName = $(this).attr('id');
                var navigationMatch = $('nav a[href="#' + sectionName + '"]');
                if (($(this).offset().top - $(window).height() / 2 < $(window).scrollTop()) &&
                    ($(this).offset().top + $(this).height() - $(window).height() / 2 > $(window).scrollTop())) {
                    navigationMatch.addClass('active-section');
                }
                else {
                    navigationMatch.removeClass('active-section');
                }
            });
        }
    }

    TimetoIST(time){
        let b = moment(time).tz("Asia/Kolkata");
        //b.add(30,'minutes');
        return b.format('HH:mm A');
    }

    appointmentFunc = () => {
        let val = this.state.profileDetails;
        let k = 0
        let result = val.map(item => {
            k = k + 1
            return (
                <div className="section-content">
                    <div className="section-content-title">
                        <h3>Appointment No : {k}</h3>
                    </div>

                    <div className="appointments_grid_container">
                        <div className="patientName">
                            Name : <br /><span>{item.patientInfo.full_name}</span>
                        </div>
                        <div className="patientAgeGender">
                            Gender : <span>{item.patientInfo.gender}</span>
                            <br />Age : <span>{item.patientInfo.age}</span>
                        </div>
                        <div className="patientEmail">
                            Email : <br /><span>{item.patientInfo.email}</span>
                        </div>
                        <div className="patientContact">
                            Contact No : <br /><span>{item.patientInfo.contact_number}</span>
                        </div>
                        <div className="patientAddress">
                            Patient's Address : <br /><span>{item.patientInfo.address}</span>
                        </div>
                        <div className="hospitalName">
                            Hospital : <br /><span>{item.hospitalDetails.hospital_name}</span>
                        </div>
                        <div className="doctorName">
                            Doctor's Name : <br /><span>{item.doctorInfo.doc_name}</span>
                        </div>
                        <div className="departmentName">
                            Department : <br /><span>{item.departmentInfo.specialization_name}</span>
                        </div>
                        <div className="doctorContact">
                            Doctor's Contact : <br /><span>{item.doctorInfo.contact}</span>
                        </div>
                        <div className="appointmentFees">
                            Appointment Fees : <br /><span><i className="fas fa-rupee-sign"></i>
                                {item.doctorInfo.fees}</span>
                        </div>
                    </div>

                    <div className="Appointment-taken-time">
                        <h4>Appointment taken on :<br />
                            <span>{moment(item.bookingDetails.appointment_taken_date).format('MMMM DD YYYY')}
                            </span> at <span>
                                {this.TimetoIST(item.bookingDetails.appointment_taken_date)}
                                </span>
                        </h4>
                    </div>
                </div>
            )
        })
        return result
    }

    render() {
        if (this.state.loggedIn === false) {
            return <Redirect to="/login" />
        }
        if (this.state.profileDetails === null) return null;
        let result = this.state.profileDetails

        return (
            <div className="Profile_Page">
                <header className="nav-down responsive-nav hidden-lg hidden-md navbar-light">
                    <button type="button" id="nav-toggle" className="navbar-toggle" data-bs-toggle="collapse" data-bs-target="#main-nav"
                        aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div id="main-nav" className="collapse navbar-collapse ml-10" >
                        <nav>
                            <ul className="nav navbar-nav">
                                <li><a href="#top">Home</a></li>
                                <li><a href="#details">details</a></li>
                                <li><a href="#appointments">Recent Appointments</a></li>
                                <li><a href="/">logout</a></li>
                            </ul>
                        </nav>
                    </div>
                </header>

                <div className="sidebar-navigation hidden-sm hidden-xs">
                    <div className="logo">
                        <a href="/banner"><span>Doctors</span><em>Verse</em></a>
                    </div>
                    <nav>
                        <ul>
                            <li>
                                <a className="active-section" href="#top">
                                    <span className="rect"></span>
                                    <span className="circle"></span>
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#details">
                                    <span className="rect"></span>
                                    <span className="circle"></span>
                                    details
                                </a>
                            </li>
                            <li>
                                <a href="#appointments">
                                    <span className="rect"></span>
                                    <span className="circle"></span>
                                    Appointments
                                </a>
                            </li>
                            <li>
                                <a href="/banner">
                                    <span className="rect"></span>
                                    <span className="circle"></span>
                                    logout
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="content-section profile-banner" id="top">
                    <div className="item item-1">
                        <div className="img-fill">
                            <div className="image"></div>
                            <div className="info">
                                <h1>Hello <strong>{result[0].userInfo.full_name}</strong></h1>
                                <p>This is your profile page. You can see your personal details<br />
                                    and previos appointments that you've made through our website</p>
                                <div className="white-button button" onClick={() => { window.scrollTo(0, 765) }}>
                                    <a href="#featured">See More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="page-content">
                    <section className="content-section" id="details">
                        <div className="section-heading">
                            <h1>Personal<br /><em>Details</em></h1>
                            <p>These are the details that you
                                <br />selected when you first signed up here.
                            </p>
                        </div>
                        <div className="details_grid_container">
                            <div className="Label1 Labels">
                                <h2>Name</h2>
                            </div>
                            <div className="Label2 Labels">
                                <h2>Email</h2>
                            </div>
                            <div className="Value1 Values">
                                <h2>{result[0].userInfo.full_name}</h2>
                            </div>
                            <div className="Value2 Values">
                                <h2>{result[0].userInfo.email}</h2>
                            </div>
                        </div>
                    </section>

                    <section className="content-section" id="appointments">
                        <div className="section-heading">
                            <h1>Recent<br /><em>Appointments</em></h1>
                            <p>These are the recent appointments
                                <br />that you made from our website
                            </p>
                        </div>

                        {this.appointmentFunc()}

                    </section>

                    <section className="profile-footer">
                        <p>Doctorsverse, A Website for Hospital Appointments</p>
                    </section>
                </div>
            </div>
        )
    }
}
