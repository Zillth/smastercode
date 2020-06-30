import { Form, Button, Container } from 'react-bootstrap'
import { Formik, ErrorMessage } from 'formik'

export default function SignupForm() {
    return (
        <Container fluid className="layer__main">
            <Formik
                initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Email is required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    if (!values.password) {
                        errors.password = 'Password is required'
                    } else if (values.password.length < 6) {
                        errors.password = 'Password must be min 6 characters'
                    }
                    return errors;
                }}
            >
                {({ values, handleBlur, handleChange }) => (
                    <Form className="form__container neo__main" method="POST" action="http://localhost:3000/api/signup">
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" onChange={handleChange} onBlur={handleBlur} value={values.username} />
                            <ErrorMessage name="username" component="div" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" placeholder="example@exmaple.com" onChange={handleChange} onBlur={handleBlur} value={values.email} />
                            <ErrorMessage name="email" component="div" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} onBlur={handleBlur} value={values.password} />
                            <ErrorMessage name="password" component="div" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="confirmPassword" onChange={handleChange} onBlur={handleBlur} value={values.confirmPassword} />
                            <ErrorMessage name="confirmPassword" component="div" />
                        </Form.Group>
                        <Button type="submit" variant="none" className="neo__button--main">Submit</Button>
                    </Form>
                )}
            </Formik>
        </Container>
    )
}