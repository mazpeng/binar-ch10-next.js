"use client"
import React, { useEffect, useState } from "react";

import { useRouter } from 'next/navigation'
import Link from "next/link"
import { useSelector, useDispatch } from 'react-redux'


import { Navbar, Button, Text } from "@nextui-org/react";
import { getAuth, updateProfile, onAuthStateChanged, signOut } from "firebase/auth";
import app from '@/service/firebase';
import { AcmeLogo } from "@/component/nextui/AcmeLogo.jsx";
import { Modal } from 'react-bootstrap';
import { changeState } from "@/store/reducer/loginReducer";
import { changeDispname,changeEmail,changeUid} from "@/store/reducer/userfReducer";
import { Router } from "next/router";

export default function Navsbar() {
    const auth = getAuth(app)
    const navigate = useRouter()
    const loginState = useSelector(state => state.loginReducer)
    const userfState = useSelector(state => state.userfReducer)

    const dispatch = useDispatch()
    // const [isLogin, setisLogin] = useState(false)
    // const [users, setUsers] = useState();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token) {
            dispatch(changeState(true))
         }
    }, [])

    useEffect(() => {
        onAuthStateChanged(auth, (data) => {
            console.log(data);
            dispatch(changeDispname(data?.displayName))
            dispatch(changeEmail(data?.email))
            dispatch(changeUid(data?.uid))
        });
    }, [])

    function signout() {
        signOut(auth)
          .then(() => {
            localStorage.removeItem('token');
            navigate.push('/login');
            window.location.reload(); 
          })
          .catch((error) => {
            alert("Something went wrong");
            console.log(error);
          });
      };



    const collapseItems = [
        "Landing Page",
        "Home",
        "Games",
    ];
    return (
        <>
            {loginState.isLogin ?
                <Navbar isBordered variant="sticky" style={{ color: "grey" }} height="80px">

                    <Navbar.Brand>
                        <Navbar.Toggle showIn="xs" aria-label="toggle navigation" />
                        <AcmeLogo />
                        <Text b color="inherit" hideIn="xs">
                            <Link style={{ color: "grey" }} href="/" >GameStation™</Link>
                        </Text>
                    </Navbar.Brand>

                    <Navbar.Content hideIn="xs" variant="default" activeColor="primary">
                        <Navbar.Link onClick={() => navigate.push("/home")}> Home </Navbar.Link>
                        <Navbar.Link onClick={() => navigate.push("/games")}> Games</Navbar.Link>
                        <Navbar.Link onClick={() => navigate.push("/profile")}> Profile</Navbar.Link>
                    </Navbar.Content>
                    <Navbar.Content>
                        <Navbar.Item>
                            <>
                                <Text color="purple" auto flat>
                                    Welcome &nbsp;
                                </Text>
                                <Text color="purple" auto flat>
                                    {userfState.displayName} 
                                </Text>
                            </>
                        </Navbar.Item>
                        <Navbar.Item>
                            <Button shadow color="error" auto onClick={handleShow} >
                                Log Out
                            </Button>
                        </Navbar.Item>

                    </Navbar.Content>

                    <Navbar.Collapse showIn={"xs"}>
                        {collapseItems.map((item, index) => (
                            <Navbar.CollapseItem key={item}>
                                <Link as={Link}
                                    color="inherit"
                                    css={{
                                        minWidth: "100%",
                                    }}
                                    href="#"
                                >
                                    {item}
                                </Link>
                            </Navbar.CollapseItem>
                        ))}
                    </Navbar.Collapse>

                </Navbar >
                :
                < Navbar isBordered variant="sticky" style={{ color: "grey" }} height="80px">

                    <Navbar.Brand>
                        <Navbar.Toggle showIn="xs" aria-label="toggle navigation" />
                        <AcmeLogo />
                        <Text b color="inherit" hideIn="xs">
                            <Link style={{ color: "grey" }} href="/" >GameStation™</Link>
                        </Text>
                    </Navbar.Brand>

                    <Navbar.Content hideIn="xs" variant="default" activeColor="primary">
                        <Navbar.Link onClick={() => navigate.push("/home")}> Home </Navbar.Link>
                        <Navbar.Link onClick={() => navigate.push("/games")}> Games</Navbar.Link>
                    </Navbar.Content>
                    <Navbar.Content>
                        <Navbar.Link color="inherit" onClick={() => navigate.push("/login")}>
                            Login
                        </Navbar.Link>
                        <Navbar.Item>
                            <Button color="secondary" auto flat onClick={() => navigate.push("/register")}>
                                Sign Up
                            </Button>
                        </Navbar.Item>


                    </Navbar.Content>

                    <Navbar.Collapse showIn={"xs"}>
                        {collapseItems.map((item, index) => (
                            <Navbar.CollapseItem key={item}>
                                <Link as={Link}
                                    color="inherit"
                                    css={{
                                        minWidth: "100%",
                                    }}
                                    href="#"
                                >
                                    {item}
                                </Link>
                            </Navbar.CollapseItem>
                        ))}
                    </Navbar.Collapse>

                </Navbar >

            }
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to sign out?</Modal.Body>
                <Modal.Footer>
                    <Button color="secondary" onPress={handleClose}>
                        Cancel
                    </Button>
                    <Button color="error" onClick={handleClose} onPress={signout}>
                        Logout
                    </Button>
                </Modal.Footer>
            </Modal>


        </>


    )

}
