import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { hostname } from '../../utils/global';
import { Navbar, Nav, Container } from 'react-bootstrap';
// import logo from "./icon/logo.png";


const Menu = (props) => {
    let navigate = useNavigate();

    /* ⛏️⛏️ LOGOUT EVENT*/
    const handleLogout = async () => {

        try {
            const response = await fetch(`${hostname}/api/admin/logout`, {
                method: "GET",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 200) {
                // const text = await response.text();
                // console.log(JSON.parse(text));
                // history.push('/admin');
                localStorage.removeItem('user');
                navigate('/admin');

                // return <Redirect to="/admin/dashboard" /> ;
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="Navbar">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="py-3">
                <Container>
                    <Navbar.Brand >
                        <Link className="nav-link" to="/home">
                            <img
                                src="/icon/logo.png"
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                            />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                        <Nav>
                            <Link className="nav-link" to="/home">Home</Link>
                            <Link className="nav-link" to="/admin">Admin</Link>
                            {localStorage.getItem('user') ? (<li className="nav-item"><button className="btn btn-danger" onClick={handleLogout}>Logout</button></li>) : null}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}


export default Menu;