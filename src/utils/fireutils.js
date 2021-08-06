import {
  firestore,
  auth,
  firebaseStorage
} from './../services/firebase';
import user from './../stores/user';

const usersRef = firestore().collection('users');
const postsRef = firestore().collection('posts');
const postsMedia =firebaseStorage().ref('postsMedia');


const get_user_details = async (uid = auth().currentUser.uid) => {
  try {
    const details = (await (usersRef.doc(uid)).get()).data();
    user.user.userDetails = details;
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

const add_post = async(file)=>{
  try {
    let media = await add_media(file);
    const mediaUrl = await media.data.ref.getDownloadURL();
    const givenData = {
      byUser: auth().currentUser.uid,
      createdAt: firestore.Timestamp.now(),
      postsMedia: mediaUrl,
      postId:1
    }
    const details = await postsRef.add(givenData);
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

const add_media = async(file)=>{
  try {
    let fileName =new Date() + '-' + file.name;
    const details = await postsMedia.child(fileName).put(file,{ contentType: file.type });
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
export const addPost = add_post;