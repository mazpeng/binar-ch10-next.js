"use client"
import React, { useEffect, useState } from "react";
import {useRouter} from 'next/navigation';
import app from '@/service/firebase';
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Input, Button, Grid, Text  } from '@nextui-org/react';
import Modal from 'react-bootstrap/Modal';
import GoogleButton from 'react-google-button';
import css from '../page.module.css'
import styles from './login.css';

const auth = getAuth(app)
const provider = new GoogleAuthProvider();

export default function login() {

    const navigate = useRouter()

    const [error, setError] = useState('')
    const [smShow, setSmShow] = useState(false);
    const [success, setSuccess] = useState(false);
    
    const [credential, setCredential] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        if (smShow && success) {
            window.location.href = '/home'; 
        }
    }, [smShow, success]);
    async function handleLogin() {
        if (!credential.email) {
            setError("Email is required")
            return
        }
        if (!credential.password) {
            setError("Password is required")
            return
        }
        try {
            const login = await signInWithEmailAndPassword(auth, credential.email, credential.password)
            const token = login.user.accessToken
            localStorage.setItem('token', token)
            setSuccess(true);
            setError('');
            setSmShow(true);

        } catch (error) {
            setError("Wrong Password/Email")
            setSuccess(false);
            setSmShow(true);
        }
    }

    async function loginWithGoogle() {
        auth.languageCode = 'it';
        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            localStorage.setItem('token', token);
            
            window.location.href = '/home'; 
        } catch (err) {
            setError('Something went wrong');
            console.log(err);
        }
    }

    function handleChangeInput(e, type) {
        let value = e.target.value
        let temp = { ...credential }
        temp[type] = value
        setCredential(temp)
    }

    return (

        <div className={css.heroImage}>
        <div className="latar">
            <div className="container">
                <div className="form-group">
                    <>
                    <Text h1 size={60} css={{textGradient: "45deg, $blue600 -20%, $pink600 50%",}} weight="bold"> log in </Text>
                        <Grid.Container gap={2}>
                            <Grid>
                                <Input labelPlaceholder="Email" width="250px" type="text"  value={credential.email} onChange={(e) => handleChangeInput(e, 'email')}/>
                            </Grid>
                            <Grid>
                                <Input.Password labelPlaceholder="Password" width="250px"  value={credential.password} onChange={(e) => handleChangeInput(e, 'password')}/>
                            </Grid>
                            <Grid>
                                <Button onClick={() => { setSmShow(true); handleLogin(); }} auto color="success" > Login </Button>
                            </Grid>
                            <div className="logoogle">
                                <GoogleButton onClick={() => { setSmShow(true); loginWithGoogle(); }} /> 
                            </div>
                        </Grid.Container>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {!error && success && (
                            <Modal size="sm" show={smShow} onHide={() => setSmShow(false)} aria-labelledby="example-modal-sizes-title-sm">
                                <Modal.Header closeButton> 
                                    <Modal.Title id="example-modal-sizes-title-sm">
                                        GAMESTATION
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>login successfully</Modal.Body>
                            </Modal>
                        )}
                        {error && (
                            <Modal size="sm" show={smShow} onHide={() => setSmShow(false)} aria-labelledby="example-modal-sizes-title-sm">
                                <Modal.Header closeButton> 
                                    <Modal.Title id="example-modal-sizes-title-sm">
                                        ERROR
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body> {error} </Modal.Body>
                            </Modal>
                        )}
                        <Button onClick={() => navigate.push("/forgotpassword")} auto color="success"> Lupa Password? </Button>
                        <h3>Don't Have Account?</h3>
                        <Button onClick={() => navigate.push("/register")} auto color="success"> Register </Button>
                        </>
                </div>
            </div>
        </div>
    </div>
    )
}