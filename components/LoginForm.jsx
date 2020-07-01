import { Container, Form, Button } from 'react-bootstrap'
import { Formik, ErrorMessage } from 'formik'
import { Crypt, Compare } from 'password-crypt'
import { createToken, verifyToken } from '../utils/token'

export default function LoginForm() {

    return (
        <Container fluid className="layer__main">
            <Formik
                initialValues={{ email: '', password: '' }}
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
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        const hash = async pwd => await Crypt(process.env.SECRET_CRYPT, pwd)
                        const user = { ...values }
                        hash(values.password).then(hashed => {
                            user.password = hashed
                            alert(JSON.stringify(user, null, 2))
                        })
                        createToken({ sub: user.email }).then(token => { verifyToken(token).then(status => { alert(JSON.stringify(status.decoded, null, 2)) }) })
                        setSubmitting(false);
                        /** https://www.npmjs.com/package/password-crypt */
                    }, 400);
                }}
            >
                {({ values, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
                    <Form onSubmit={handleSubmit} className="form__container neo__main">
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" placeholder="example@exmaple.com" onChange={handleChange} onBlur={handleBlur} value={values.email} />
                            <ErrorMessage name="email" component="div" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} onBlur={handleBlur} value={values.password} />
                            <ErrorMessage name="password" component="div" />
                        </Form.Group>
                        <Button variant="none" type="submit" className="neo__button-main" disabled={isSubmitting}>
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    )
}