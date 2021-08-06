import {
    auth
} from './../services/firebase';

import {
    registerUser
} from './fireutils';
import mystore from '../stores/store';

const login_iwth_email_pass = async (email, password) => {

    try {
        let res = await auth().signInWithEmailAndPassword(email, password);
        mystore.auth.user = res.user;
        return {
            err: false,
            data: true
        }
    } catch (error) {
        return {
            err: error,
            data: false
        }
    }

}

const login_with_facebook = async () => {
    try {
        let provider = new auth.FacebookAuthProvider();
        let res = await auth().signInWithPopup(provider)
        mystore.auth.user = res.user;
        return {
            err: false,
            data: true
        }
    } catch (error) {
        return {
            err: error,
            data: false
        }
    }
}

const log_out = async () => {
    try {
        await auth().signOut();
        return {
            err: false,
            data: true
        }
    } catch (error) {
        return {
            err: error,
            data: false
        }
    }
}

const signup_with_email_pass = async (email, password, fullName, username) => {
    try {
        let res = await auth().createUserWithEmailAndPassword(email, password);
        await registerUser(fullName, username, null);
        mystore.auth.user = res.user;
        return {
            err: false,
            data: true
        }
    } catch (error) {
        return {
            err: error,
            data: false
        }

    }
}


export const loginWithEmailPass = login_iwth_email_pass;
export const loginWithFacebook = login_with_facebook;
export const logout = log_out;
export const signupWithEmailPass = signup_with_email_pass;