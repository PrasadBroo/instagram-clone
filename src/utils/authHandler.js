import {
    auth
} from './../services/firebase';

import {
    is_username_exists,
    registerUser,
    is_fb_uid_exists
} from './firebase_api';
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
        const {data,err} = await is_fb_uid_exists(res.user.uid);
        if(err)throw new Error(err.message);
        if(!data){
            await registerUser(res.user.displayName, 'User'+res.user.uid.slice(0,7), null);
            await res.user.sendEmailVerification();
        }
        mystore.auth.user = res.user;
        return {
            err: false,
            data: true
        }
    } catch (error) {
        if(mystore.auth.user)await auth().signOut()
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
        const {data:isUsernameExists,err:gotErr} = await is_username_exists(username);
        if(isUsernameExists || gotErr)throw Error(gotErr ?gotErr.message :'Username already exists')
        let res = await auth().createUserWithEmailAndPassword(email, password);
        await registerUser(fullName, username, null);
        await res.user.sendEmailVerification()
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