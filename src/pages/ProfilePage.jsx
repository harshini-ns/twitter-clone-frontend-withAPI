import { Navbar, Container, Button } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage"

export default function ProfilePage() {
    //
    const [authToken, setAuthToken] = useLocalStorage("authToken", "");
    const navigate = useNavigate();

    //

    useEffect(() => {
        if (!authToken) {
            navigate("/login")
        }
    }, [authToken, navigate]
    );
    //
    const handleLogout = () => {
        setAuthToken(""); //clears token from localstorage 
    };
    //

    return (
        <>
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand href="/">
                        <i
                            className="bi bi-twitter" style={{ fontSize: "20px", color: "dodgerblue" }}
                        ></i>
                    </Navbar.Brand>

                    <Navbar.Collapse className="justify-content-end">
                        <Button variant="primary" onClick={handleLogout} > Log out </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>


            <Container className="mt-3">
                <h2> Profile Page </h2>
            </Container>
        </>
    )
}
