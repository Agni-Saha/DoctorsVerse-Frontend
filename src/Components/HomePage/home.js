import React, { Component } from 'react';
import $ from 'jquery';
import './loaders.css';
import './homeStyle.css';

export default class home extends Component {
    componentDidMount() {
        // Page loadinmg animation
        if ((".loader").length) {
            // show Preloader until the website ist loaded
            $(window).on('load', function () {
                $(".loader").fadeOut("slow");
            });
        }

        /* Onpage linkng smooth effect */
        $('a[href^="#"]').on('click', function (event) {
            var target = $($(this).attr('href'));
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 269);
            }

        });

        // Sticky Header
        $(window).scroll(function () {
            var scroll = $(window).scrollTop();

            if (scroll >= 100) {
                $(".top-nav").addClass("light-header");
            } else {
                $(".top-nav").removeClass("light-header");
            }
        });

        //closing navbar on clicking outside it while in closed form
        $(document).ready(function () {
            $(document).click(
                function (event) {
                    var target = $(event.target);
                    var MenuOpen = $(".navbar-collapse").hasClass("show");
                    if (MenuOpen === true && !target.hasClass("navbar-toggler")) {
                        $("button.navbar-toggler").click();
                    }
                }
            );
        });
    }

    render() {
        return (
            <div className="home">
                <div className="loader loader-bg">
                    <div className="loader-inner ball-pulse">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>

                <nav className="navbar navbar-expand-md fixed-top top-nav">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="index.html"><strong>DoctorsVerse</strong></a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon">
                                <img src="dots-menu.png" alt="toggle-menu" className="navbar_toggle_img" style={{ width: "30px" }} />
                            </span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="#home">Home <span className="sr-only">(current)</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#hospital">Hospital</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#department">Department</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#about">About</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#contact">Contact</a>
                                </li>
                            </ul>
                        </div>
                        <ul className="navbar-nav ml-auto search-box">
                            <li className="nav-item">
                                <a className="nav-link" href="/login">Login</a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <section id="home" className="intro intro-bg bg-overlay parallax">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-12 caption-two-panel">
                                <div className="intro-caption mt-5">
                                    <h1 className="text-white mb-2">A Community of Caring</h1>
                                    <p className="text-white mb-4">Life is hard enough already.
                                    Let us make it a little easier.<br />
							        Where life continues and care that never quits.
						            </p>
                                    <a href="/login" className="Button-Creation mr-3">Book Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="hospital" className="testimonial-section sec-bg-04">
                    <div className="container">
                        <div className="row">
                            <div className="head-box text-center mb-3 col-md-12 mt-20">
                                <h2 className="font-abril">Hospitals that you can book from here</h2>
                            </div>
                        </div>
                        <div className="single-testimonial">
                            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner pt-3">

                                    <div className="carousel-item active">
                                        <div className="testimonial-box text-center">
                                            <div className="testimonial-content w-100 bg-faded">
                                                <p className="mb-3">
                                                    <i className="fas fa-map-marker-alt fa-3x" aria-hidden="true"></i>
                                                </p>
                                                <p className="lead font-abril">16 17, JC Block Lane, Central Park Broadway Road,
                                                Salt Lake stadium gate no. 3, Bidhannagar, Kolkata,
										        West Bengal 700098</p>
                                                <div className="testimonial-footer">
                                                    <h4 className="mt-2 mb-0 hosp_Name">A.M.R.I.</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <div className="testimonial-box text-center">
                                            <div className="testimonial-content w-100 bg-faded">
                                                <p className="mb-3">
                                                    <i className="fas fa-map-marker-alt fa-3x" aria-hidden="true"></i>
                                                </p>
                                                <p className="lead font-abril">58, Canal Circular Rd, Kadapara, Kankurgachi,
                                                Kolkata, West Bengal 700054
                                                Beside ManiSquare, Kolkata
									            </p>
                                                <div className="testimonial-footer">
                                                    <h4 className="mt-2 mb-0 hosp_Name">Apollo Glenagles</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <div className="testimonial-box text-center">
                                            <div className="testimonial-content w-100 bg-faded">
                                                <p className="mb-3">
                                                    <i className="fas fa-map-marker-alt fa-3x" aria-hidden="true"></i>
                                                </p>
                                                <p className="lead font-abril">1, 1, National Library Ave, Alipore, Kolkata, West Bengal
										        700027,<br /> Near Alipore Zoo and National Library</p>
                                                <div className="testimonial-footer">
                                                    <h4 className="mt-2 mb-0 hosp_Name">B. M. Birla</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <div className="testimonial-box text-center">
                                            <div className="testimonial-content w-100 bg-faded">
                                                <p className="mb-3">
                                                    <i className="fas fa-map-marker-alt fa-3x" aria-hidden="true"></i>
                                                </p>
                                                <p className="lead font-abril">3, 1st Cross Rd, HC Block, Sector III, Bidhannagar,
										        Kolkata, West Bengal 700106, Opposite of Susrut Eye Hospital</p>
                                                <div className="testimonial-footer">
                                                    <h4 className="mt-2 mb-0 hosp_Name">Calcutta Heart Clinic</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <div className="testimonial-box text-center">
                                            <div className="testimonial-content w-100 bg-faded">
                                                <p className="mb-3">
                                                    <i className="fas fa-map-marker-alt fa-3x" aria-hidden="true"></i>
                                                </p>
                                                <p className="lead font-abril">Desun More, 720, Eastern Metropolitan Bypass, Golpark,
										        Sector I, Kasba, Kolkata, West Bengal 700107, Near Ruby Bus Stop</p>
                                                <div className="testimonial-footer">
                                                    <h4 className="mt-2 mb-0 hosp_Name">Desun Hospital</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <div className="testimonial-box text-center">
                                            <div className="testimonial-content w-100 bg-faded">
                                                <p className="mb-3">
                                                    <i className="fas fa-map-marker-alt fa-3x" aria-hidden="true"></i>
                                                </p>
                                                <p className="lead font-abril"> 730, Eastern Metropolitan Bypass, Anandapur, East
										        Kolkata Twp, Kolkata, West Bengal 700107, Near Ruby Bus Stop</p>
                                                <div className="testimonial-footer">
                                                    <h4 className="mt-2 mb-0 hosp_Name">Fortis Hospital</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="navigator-box">
                                    <button className="carousel-control-prev" data-bs-target="#carouselExampleCaptions" type="button"
                                        data-bs-slide="prev">
                                        <span className="fas fa-angle-left" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" data-bs-target="#carouselExampleCaptions" type="button"
                                        data-bs-slide="next">
                                        <span className="fa fa-angle-right" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="department" className="info-section text-white bg-right bg_dark">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="head-box">
                                    <h2 className="font-abril ">Departments</h2>
                                </div>
                                <div className="three-panel-block mt-5">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <div className="service-block mb-5">
                                                <i className="icon-box mb-3 float-left w-100">
                                                    <i className="fas fa-heartbeat"></i>
                                                </i>
                                                <h3 className="text_primary">Cardiology</h3>
                                                <p>The field includes medical diagnosis and treatment
                                                of congenital heart defects, coronary artery disease,
                                                    heart failure, valvular heart disease and electrophysiology</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <div className="service-block mb-5">
                                                <i className="icon-box mb-3 float-left w-100">
                                                    <i className="fas fa-tooth"></i>
                                                </i>
                                                <h3 className="text_primary">Dentist</h3>
                                                <p>It is a branch of medicine that consists of the study, diagnosis,
                                                prevention, and treatment of diseases, disorders, and conditions
                                                    of the oral cavity</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <div className="service-block mb-5">
                                                <i className="icon-box mb-3 float-left w-100">
                                                    <i className="far fa-eye"></i>
                                                </i>
                                                <h3 className="text_primary">Eye Specialist</h3>
                                                <p>Ophthalmology is a branch of medicine and surgery that
                                                deals with the diagnosis and treatment of
                                                    disorders of the eye</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <div className="service-block">
                                                <i className="icon-box mb-3 float-left w-100">
                                                    <i className="fas fa-stethoscope"></i>
                                                </i>
                                                <h3 className="text_primary">General Consultant</h3>
                                                <p>A general consultant is a professional who provides advice and
                                                    further purposeful activities in other areas of specialization</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <div className="service-block">
                                                <i className="icon-box mb-3 float-left w-100">
                                                    <i className="fas fa-brain"></i>
                                                </i>
                                                <h3 className="text_primary">Neurologist</h3>
                                                <p>Neurologists diagnose, treat and manage disorders that affect the
                                                    central nervous system and the peripheral nervous system</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <div className="service-block">
                                                <i className="icon-box mb-3 float-left w-100">
                                                    <i className="fas fa-child"></i>
                                                </i>
                                                <h3 className="text_primary">Pediatrician</h3>
                                                <p>Pediatrics is the branch of medicine that involves
                                                    the medical care of infants, children, and adolescents.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                <section id="contact" className="contact-section sec-bg-05">
                    <div className="footer">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-1"></div>
                                <div className="title col-md-5 col-sm-12" id="about">
                                    <h2 className="content-design">About Us</h2>
                                    <br />
                                    <p>
                                        DoctorsVerse is a project that is created by 3rd Year, 2nd Semester (6th
                                        Semester) students of Information Technology Department, batch 2018-2022.
						            </p>
                                    <p>
                                        The Main aim of this project is to let users book their appointments for any
                                        doctor of any hospitals around their area. The process is very simple and the project
                                        is of great use in general case scenario.
						            </p>
                                </div>
                                <div className="col-md-1"></div>
                                <div className="col-md-5 col-sm-12 map-img" id="contact">
                                    <h2 className="content-design">Contact Us</h2>
                                    <br />
                                    <address className="md-margin-bottom-40">
                                        Jadavpur University <br />
                                        Salt Lake Campus, Kolkata - 700106 <br />
                                        West Bengal, India <br />
                                        Email: <a href="mailto:doctorversepro@gmail.com" className="">doctorversepro@gmail.com</a><br />
                                    </address>

                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        )
    }
}
