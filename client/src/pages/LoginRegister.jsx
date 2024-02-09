import { useState } from 'react';
import * as Components from './loginStyles';
import classes from '../styles/loginRegister.module.css';
import LoginPage from './Login';
import RegisterPage from './Register';

export default function LoginRegisterPage() {
    const [signIn, toggle] = useState(true);
    return (
        <div className='flex justify-center pt-28'>
            <Components.Container>
                <Components.SignUpContainer onSignIn={signIn}>
                    <RegisterPage onSignIn={signIn} />
                </Components.SignUpContainer>

                <Components.SignInContainer onSignIn={signIn}>
                    <LoginPage onSignIn={signIn} />
                </Components.SignInContainer>

                <Components.OverlayContainer onSignIn={signIn}>
                    <Components.Overlay onSignIn={signIn}>
                        <Components.LeftOverlayPanel onSignIn={signIn}>
                            <Components.Title>New to us?</Components.Title>
                            <Components.Paragraph>
                                Sign up! It is quick and easy!
                            </Components.Paragraph>
                            <Components.GhostButton
                                onClick={() => toggle(true)}
                            >
                                Log in
                            </Components.GhostButton>
                        </Components.LeftOverlayPanel>

                        <Components.RightOverlayPanel onSignIn={signIn}>
                            <Components.Title>Welcome!</Components.Title>
                            <Components.Paragraph>
                                Log in to start Tracking!
                            </Components.Paragraph>
                            <Components.GhostButton
                                onClick={() => toggle(false)}
                            >
                                Sign Up
                            </Components.GhostButton>
                        </Components.RightOverlayPanel>
                    </Components.Overlay>
                </Components.OverlayContainer>
            </Components.Container>
        </div>
    );
}
