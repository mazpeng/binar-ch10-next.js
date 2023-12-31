"use client"

import { useState } from "react";
import {useRouter} from 'next/navigation';
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import app from '@/service/firebase';
import { Input, Button, Grid, Text  } from '@nextui-org/react';
import Modal from 'react-bootstrap/Modal';
import css from '../page.module.css'
import styles from './register.css';

export default function register () {
    const navigate = useRouter()
    const [smShow, setSmShow] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const [credential, setCredential] = useState({
        email: '',
        password: ''
    })

    async function handleSignUp() {
        try {
            const auth = getAuth(app)
            await createUserWithEmailAndPassword(auth, credential.email, credential.password)
            setSuccess(true);
        } catch (error) {
            console.log(error)
            setError(error.message);
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
                <div className="register">
                <>
                    <Text h1 size={60} css={{textGradient: "45deg, $blue600 -20%, $pink600 50%",}} weight="bold"> Sign up</Text>
                    <Grid.Container gap={2}>
                        <Grid>
                            <Input labelPlaceholder="Your Email" width="250px" type="text"  value={credential.email} onChange={(e) => handleChangeInput(e, 'email')}/>
                        </Grid>
                        <Grid>
                            <Input.Password labelPlaceholder="Password" width="250px"  value={credential.password} onChange={(e) => handleChangeInput(e, 'password')}/>
                            <Text color="warning" h7>Password should be 6-20 characters</Text>
                        </Grid>
                        <Grid>
                            <Button onClick={() => { setSmShow(true); handleSignUp(); }} auto color="success"> Sign Up </Button>
                        </Grid>
                        <Grid>
                            <Button onClick={() => navigate.push("/login")} auto color="success"> Login </Button>
                        </Grid>
                    </Grid.Container>
                        {error && <Text color="error">{error}</Text>}
                        <h3>Lupa password?</h3>
                        <Button onClick={() => navigate.push("/forgotpassword")} auto color="success"> Reset Password! </Button>
                            <Modal size="sm" show={success} onHide={() => setSuccess(false)} aria-labelledby="example-modal-sizes-title-sm"
                            > <Modal.Header closeButton> <Modal.Title id="example-modal-sizes-title-sm">
                                Register
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>{success && 'Sign up successfully silahkan  Login dan Update Name di Profile'}</Modal.Body>
                            </Modal>
                    </>
                </div>
            </div>
        </div>
    </div>
    )
}