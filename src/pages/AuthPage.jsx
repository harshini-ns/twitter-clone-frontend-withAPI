import { Col, Row, Image, Button, Modal, Form } from "react-bootstrap"
import { useEffect, useState } from "react"
import axios from "axios";
import useLocalStorage from "use-local-storage";

import { useNavigate } from "react-router-dom";




export default function AuthPage() {
    const loginImage = "https://sig1.co/img-twitter-1"
    const url = "https://58313eb4-d1a4-4353-8169-7e35efc691e5-00-14mnp0a3bw1g1.riker.replit.dev"

    ///////
    const [modalShow, setModalShow] = useState(null);
    const handleShowSignUp = () => setModalShow("SignUp");
    const handleShowLogin = () => setModalShow("login");

    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    //
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    //
    const [authToken, setAuthToken] = useLocalStorage("authToken", "");

    ///
    const navigate = useNavigate();
    //
    useEffect(() => {
        if (authToken) {
            navigate("/profile");
        }
    }, [authToken, navigate]
    );


    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}/signup`, { username, password });// important to note that username and password is in object 
            console.log(res.data)
        }
        catch (error) {
            console.log(error);
        }
    };
    //

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}/login`, { username, password });
            //token is checked here
            if (res.data && res.data.auth === true && res.data.token) {
                setAuthToken(res.data.token);
                console.log("login is successful , token is saved")
            }
        }
        catch (error) {
            console.error("error has occurred in token", error);
        }
    }
    const handleClose = () => setModalShow(null);

    /////
    return (
        <Row>
            <Col sm={6}>
                <Image src={loginImage} fluid />
            </Col>
            <Col sm={6} className="p-4">
                <i className="bi bi-twitter" style={{ fontSize: 50, color: "dodgerblue" }}> </i>
                <p className="mt-5" style={{ fontSize: 64 }}> Happening Now ! </p>
                <h2 className="my-5" style={{ fontSize: 31 }}> Join Twitter today. </h2>

                <Col sm={5} className="d-grid gap-2">
                    <Button className="rounded-pill" variant="outline-dark">
                        <i className="bi bi-google"> Sign up with google </i></Button>

                    <Button className="rounded-pill" variant="outline-dark">
                        <i className="bi bi-apple"> Sign up with Apple </i></Button>

                    <p style={{ textAlign: "center" }} > or </p>

                    <Button className="rounded-pill" onClick={handleShowSignUp} > create an account</Button>

                    <p style={{ fontSize: "12px" }} > by signing up you agree to the terms and conditions </p>

                    <p className="mt-5" style={{ fontWeight: "bold" }} > Already have an account?  </p>

                    <Button className="rounded-pill" variant="outline-primary" onClick={handleShowLogin}> Sign In here</Button>




                </Col>

                <Modal
                    show={modalShow !== null} onHide={handleClose} animation={false} centered >


                    <Modal.Body>

                        <h2 className="mb-4" style={{ fontWeight: "bold" }}>
                            {modalShow === "SignUp" ? "create your account" : " Log in to your account"}
                        </h2>

                        <Form className="d-grid gap-2 px-5" onSubmit={modalShow === "SignUp" ? handleSignUp : handleLogin} > {/* from starts here */}

                            <Form.Group className="mb-3" controlId="formbasicEmail">
                                <Form.Control onChange={(e) => setUsername(e.target.value)} type="email" placeholder="enter email address" />
                            </Form.Group>


                            <Form.Group className="mb-3" controlId="fromBasicPassword">
                                <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="enter password" />
                            </Form.Group>


                            <p style={{ fontSize: "12px" }}>
                                By signing up, you agree to the Terms of Service and Privacy
                                Policy, including Cookie Use. SigmaTweets may use your contact
                                information, including your email address and phone number for
                                purposes outlined in our Privacy Policy, like keeping your
                                account secure and personalising our services, including ads.
                                Learn more. Others will be able to find you by email or phone
                                number, when provided, unless you choose otherwise here.
                            </p>


                            <Button className="rounded=pill" type="submit" >
                                {modalShow === "SignUp" ? "Sign Up " : " Log In"}  </Button>
                        </Form> {/*  form endshere */}





                    </Modal.Body>

                </Modal>
            </Col>
        </Row>

    )
}
