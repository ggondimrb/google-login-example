import { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";

const REACT_APP_GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export function SignIn() {
  let navigate = useNavigate();
  const { signInWithGoogle, getIsAuthenticated } = useAuth();

  useEffect(() => {
    if (getIsAuthenticated()) {
      navigate('/dashboard');
    }
  }, [getIsAuthenticated])

  async function onGoogleLoginSuccess(response: any) {
    signInWithGoogle(response.accessToken);
  };

  function onGoogleLoginFailure(e: any) {
    alert('Erro ao logar')
  }

  return (

    <div className="relative py-16 bg-gradient-to-br from-sky-50 to-gray-200 h-[100vh]">
      <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
        <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
          <div className="rounded-xl bg-white shadow-xl">
            <div className="p-6 sm:p-16">
              <div className="space-y-4 flex flex-column content-center text-center">
                <img src="https://logodetimes.com/times/santa-cruz/logo-santa-cruz-4096.png" loading="lazy" className="w-20" alt="Santa Cruz" />
                <h2 className="mb-8 text-2xl text-cyan-900 font-bold">Logue para comprar ingressos para o jogo do Santa Cruz!</h2>
              </div>
              <div className="mt-16 grid space-y-4">
                <GoogleLogin
                  clientId={REACT_APP_GOOGLE_CLIENT_ID}  // your Google app client ID
                  render={renderProps => (
                    <button onClick={renderProps.onClick} disabled={renderProps.disabled}
                      className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
                    hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                      <div className="relative flex items-center space-x-4 justify-center">
                        <img src="https://tailus.io/sources/blocks/social/preview/images/google.svg" className="absolute left-0 w-5" alt="google logo" />
                        <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Continue with Google</span>
                      </div>
                    </button>
                  )}
                  buttonText="Sign in with Google"
                  onSuccess={onGoogleLoginSuccess} // perform your user logic here
                  onFailure={onGoogleLoginFailure} // handle errors here
                  cookiePolicy={'single_host_origin'}
                //isSignedIn={true}
                />
              </div>

              <div className="mt-32 space-y-4 text-gray-600 text-center sm:-mb-8">
                <p className="text-xs">By proceeding, you agree to our <a href="#" className="underline">Terms of Use</a> and confirm you have read our <a href="#" className="underline">Privacy and Cookie Statement</a>.</p>
                <p className="text-xs">This site is protected by reCAPTCHA and the <a href="#" className="underline">Google Privacy Policy</a> and <a href="#" className="underline">Terms of Service</a> apply.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}