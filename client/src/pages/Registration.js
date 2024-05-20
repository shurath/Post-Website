import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Registration() {
    const initialValues = {
        username: "",
        password: ""
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(16).required(),
        password: Yup.string().min(4).max(20).required()
    });

    const onSubmit = (data) => { 
        axios.post("http://localhost:1620/auth", data).then((response) => {
            console.log(data);
        });
    };

    // State to manage password visibility
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className='formContainer'>
                    
                    <label>Username: </label>
                    <ErrorMessage name="username" component="span" />
                    <Field id="inputCreatePost" name="username" placeholder="(Ex. Shru..)" />
                    
                    <label>Password: </label>
                    <ErrorMessage name="password" component="span" />
                    <div style={{ position: 'relative' }}>
                        <Field 
                            type={passwordVisible ? "text" : "password"} 
                            id="inputCreatePost" 
                            name="password" 
                            placeholder="(Ex. Your Password)" 
                            style={{ paddingRight: '40px' }}
                        />
                        {/* Toggle button with eye symbol */}
                        <button 
                            type="button" 
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            style={{ 
                                position: 'absolute', 
                                top: '30%', 
                                right: '-10px',
                                bottom: '10px',

                                transform: 'translateY(-50%)', 
                                cursor: 'pointer' 
                            }}
                        >
                            {passwordVisible ? "Hide" : "Show"} Password
                            {/* Eye symbol */}
                            <span style={{ marginLeft: '5px' }}>{passwordVisible ? '👁️' : '🔒'}</span>
                        </button>
                    </div>
                    
                    <button type="submit">Register</button>

                </Form>
            </Formik>
        </div>
    );
}

export default Registration;
