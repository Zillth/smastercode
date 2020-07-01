import Head from 'next/head'
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'
import { GoogleLogin } from 'react-google-login'

export default function Home() {
  const responseGoogle = (response) => {
    console.log(response);
  }
  return (
    <div>
      <Head>
        <title>SmasterCode - Home -</title>
      </Head>
      {console.log(process.env.ID_GOOGLE_CLIENT)}
      {console.log(process.GOOGLE_SECRET)}
      <GoogleLogin
        clientId={process.env.ID_GOOGLE_CLIENT}
        render={renderProps => (
          <button onClick={renderProps.onClick} disabled={renderProps.disabled} >This is my custom Google button</button>
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'} />
    </div>
  )
}
