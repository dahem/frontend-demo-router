import React from 'react';
import { Formik, Field, Form } from 'formik';
import {
  Button,
} from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from 'store/actions/session';

const UserSchema = Yup.object().shape({
  name: Yup.string().required(),
});

function User() {
  const on = useDispatch();
  const user = useSelector((state) => state.app.session.user);
  return (
    <>
      {user.name}
      <Formik
        initialValues={user}
        onSubmit={(values) => {
          console.log(values);
          on(setUser(values));
        }}
        validationSchema={UserSchema}
      >
        {({ isSubmitting, submitForm }) => (
          <Form>
            <Field
              name="name"
              label="Nome"
              component={TextField}
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
    </>
  );
}

export default User;
