import {
  firestore,
  auth
} from './../services/firebase';

const usersRef = firestore().collection('users');
const postsRef = firestore().collection('posts');



const get_user_details = async (uid = null) => {
  try {
    const details = (await (usersRef.doc(uid)).get()).data()
    return {
      err: false,
      data: details
    }
  } catch (error) {
    return {
      err: error,
      data: false
    }
  }

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

const get_user_posts = async (uid = null) => {
  try {
    const details = (await postsRef.get()).docs.map(snapshot => snapshot.data())
    return {
      err: false,
      data: details
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
export const getUserPosts = get_user_posts;