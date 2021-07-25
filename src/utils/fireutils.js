import {
  firestore,
  auth
} from './../services/firebase';

const usersRef = firestore().collection('users');


const get_user_details = async (uid = null) => {
  const details = (await (usersRef.doc("5x8r90850vAB29zPYYlt")).get())
  console.log(details.data());

}

const register_user = async (fullName, username, profilePic) => {

  let details = {
    email: auth().currentUser.email,
    fullName,
    username,
    profilePic,
    uid: auth().currentUser.uid,
    createdAt: firestore.Timestamp.now()
  }
  try {
    const res = await usersRef.doc(auth().currentUser.uid).set(details);

    return {
      err: false,
      data: res
    }
  } catch (error) {
    return {
      err: error,
      data: false
    }
  }


}


export const registerUser = register_user;
export const getUserDetails = get_user_details;