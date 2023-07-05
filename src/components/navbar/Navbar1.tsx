import {Link, useLocation} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import {Nav} from "react-bootstrap";
import {HashLink} from "react-router-hash-link";

// images
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";

import Container from "react-bootstrap/esm/Container";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import Navbar from "react-bootstrap/Navbar";

type NavbarProp = {
    classname?: string; isLogoDark: boolean;
};

const sectionData = [{id: "home", title: "Home"}, {id: "features", title: "Features"}, {
    id: "screenshot",
    title: "Screenshot"
}, {id: "testimonial", title: "Testimonial"},
    {id: "pricing", title: "Pricing"},
    {id: "contact", title: "Contact Us"},
];
const Navbar1 = ({classname, isLogoDark}: NavbarProp) => {

    const [activeSection, setActiveSection] = useState<string>("home");
    const navbar = useRef<HTMLDivElement>(null);

    const path = useLocation();

    useEffect(() => {
        window.addEventListener("scroll", (e) => {
            e.preventDefault();
            // Navbar class
            const navbar1 = navbar.current;
            if (navbar1 != null) {
                if (classname) {
                    navbar1.classList.add(classname);
                }

                if (document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50) {
                    navbar1.classList.add("nav-sticky");
                } else {
                    navbar1.classList.remove("nav-sticky");
                }
            }

        });

        //adding active class
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            let sections: (HTMLElement | null)[] = [];
            for (let i = 0; i < sectionData.length; i++) {
                sections.push(document.getElementById(sectionData[i].id));
                let currentActive = -1;
                sections.forEach((section, index) => {
                    if (section) {
                        const sectionTop = section.offsetTop - 70;
                        const sectionHeight = section.offsetHeight;

                        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                            currentActive = index;
                        }
                    }
                });
                if (currentActive !== -1) {
                    setActiveSection(sectionData[currentActive].id);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLinkClick = (id: string) => {
        const section = document.getElementById(id);
        if (section != null) {
            const sectionTop = section.offsetTop;

            window.scrollTo({
                top: sectionTop, behavior: "smooth",
            });
        }
    };

    return (<>
        <Nav
            className={classNames("navbar navbar-expand-lg fixed-top navbar-custom sticky-dark m-0", classname)}
            ref={navbar}
            id="navbar-sticky"
        >
            <Container>
                <Navbar.Brand>
                    <Link className="logo text-uppercase" to="#">
                        {isLogoDark ? (<img src={logoDark} alt="" className="logo-dark"/>) : (<>
                            <img src={logoDark} alt="" className="logo-dark"/>
                            <img src={logoLight} alt="" className="logo-light"/>
                        </>)}
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarCollapse"
                    aria-controls="navbarCollapse"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="mdi mdi-menu"></i>
                </Navbar.Toggle>
                <NavbarCollapse id="navbarCollapse">
                    <Nav className="navbar-nav mx-auto navbar-center" id="mySidenav">
                        {sectionData.map((section) => <Nav.Item as="li">
                            <HashLink
                                smooth
                                to={path.pathname + "#" + section.id}
                                className={classNames("nav-link", activeSection === section.id ? "active" : "")}
                                onClick={() => handleLinkClick(section.id)}
                            >
                                {section.title}
                            </HashLink>
                        </Nav.Item>)}

                    </Nav>
                    <Nav as="ul" className="navbar-nav navbar-center">
                        <Nav.Item as="li">
                            <Link to="#" className="nav-link" id="login">
                                Login
                            </Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Link to="#" className="btn btn-sm nav-btn" id="signin">
                                Sign Up
                            </Link>
                        </Nav.Item>
                    </Nav>
                </NavbarCollapse>
            </Container>
        </Nav>
    </>);
};

export default Navbar1;
