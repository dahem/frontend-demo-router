import React from 'react';
import { Formik, Field, Form } from 'formik';
import {
  Button, InputAdornment, IconButton,
} from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { setToken } from 'helpers/token';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

function Login() {
  const on = useDispatch();

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        showPassword: false,
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          setToken();
          on(push('/app-router'));
        }, 500);
      }}
      validationSchema={LoginSchema}
    >
      {({ isSubmitting, submitForm, values, setFieldValue }) => (
        <Form>
          <Field
            name="username"
            label="Username"
            InputLabelProps={{ shrink: true }}
            component={TextField}
          />
          <Field
            name="password"
            type={!values.showPassword ? 'password' : null}
            label="Password"
            component={TextField}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setFieldValue('showPassword', !values.showPassword)}>
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={submitForm}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default Login;
