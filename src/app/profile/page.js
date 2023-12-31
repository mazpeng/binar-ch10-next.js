"use client"
import { Text, Container, Card, Row, Spacer,Col, Button } from "@nextui-org/react"
import React, { useEffect, useState } from "react";
import {useSelector} from 'react-redux'
import {useRouter} from 'next/navigation';
import { getAuth, onAuthStateChanged } from "firebase/auth"
import app from '@/service/firebase';

export default function profile () {
    const navigate = useRouter()
    const auth = getAuth(app)
    const loginState = useSelector(state => state.loginReducer)
    const userfState = useSelector(state => state.userfReducer)
    // const [isLogin, setisLogin] = useState(false)

    // useEffect(() => {
    //     let token = localStorage.getItem('token')
    //     if (token) {
    //         setisLogin(true)
    //     }
    // }, [])

    // const [users, setUsers] = useState()

    // useEffect(() => {
    //     onAuthStateChanged(auth, (data) => {
    //         setUsers(data)
    //     });
    // }, [])
    
    return (
        <>
        {loginState.isLogin ?
            <Container xl >
                <Card css={{ $$cardColor: 'gray' }}>
                    <Card.Body>
                        <Row justify="center" align="center">
                            <Text h6 size={15} color="white" css={{ m: 0 }}>
                                UID :
                            </Text>
                            <Spacer y={2} />
                            <Text h6 size={15} color="white" css={{ m: 0 }}>
                            {userfState.uid}
                            </Text>
                        </Row>
                        <Row justify="center" align="center">
                            <Text h6 size={15} color="white" css={{ m: 0 }}>
                                Email :
                            </Text>
                            <Spacer y={2} />
                            <Text h6 size={15} color="white" css={{ m: 0 }}>
                            {userfState.email}
                            </Text>
                        </Row>
                        <Row justify="center" align="center">
                            <Text h6 size={15} color="white" css={{ m: 0 }}>
                                Name :
                            </Text>
                            <Spacer y={2} />
                            <Text h6 size={15} color="white" css={{ m: 0 }}>
                            {userfState.displayName}
                            </Text>
                        </Row>
                    
                        <Row justify="center" align="center">
                            <Text h6 size={15} color="white" css={{ m: 0 }}>
                                Avatar :
                            </Text>
                            <Spacer y={2} />
                            <Text h6 size={15} color="white" css={{ m: 0 }}>
                            {userfState.photoURL}
                            </Text>
                        </Row>
                        <Row justify="center" align="center">
                            <Text h6 size={15} color="white" css={{ m: 0 }}>
                                Game Score :
                            </Text>
                            <Spacer y={2} />
                            <Text h6 size={15} color="white" css={{ m: 0 }}>
                                Game Score
                            </Text>
                        </Row>

                    </Card.Body>
                </Card>
                <Row css={{ mt: "$10" }} justify="center" align="center">
                    <Button onClick={() => navigate.push('/profile/edit')} shadow color="secondary">
                        Edit Profile
                    </Button>
                </Row>
            </Container>
            :
            <Container xs css={{ mt: "$40" }} >
                <Row justify="center" align="center">
                    <Col justify="center" align="center">
                        <Card css={{ $$cardColor: 'white' }}>
                            <Card.Body>
                                <Text justify="center" align="center" h1>Please Login To View Page!</Text>
                                <Spacer y={0.5} />
                                <Button onClick={() => navigate.push('/login')} xs css={{ mb: "$10" }} shadow bordered color="gradient" auto>
                                    Login
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        }
    </>
    )
}