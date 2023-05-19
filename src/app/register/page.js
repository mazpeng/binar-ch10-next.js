"use client"

import { useState } from "react";
import { Input, Button, Grid, Text  } from '@nextui-org/react';
import Modal from 'react-bootstrap/Modal';

export default function register () {
    const [smShow, setSmShow] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const [credential, setCredential] = useState({
        email: '',
        password: ''
    })
    
    return (
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
                    </Grid.Container>
                        <Button onClick={() => { setSmShow(true); handleSignUp(); }} auto color="success"> Sign Up </Button>
                            {error && <Text color="error">{error}</Text>}
                            <Modal size="sm" show={success} onHide={() => setSuccess(false)} aria-labelledby="example-modal-sizes-title-sm"
                            > <Modal.Header closeButton> <Modal.Title id="example-modal-sizes-title-sm">
                                Register
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>{success && 'Sign up successfully'}</Modal.Body>
                            </Modal>
                    </>
                </div>
            </div>

    </div>
    )
}