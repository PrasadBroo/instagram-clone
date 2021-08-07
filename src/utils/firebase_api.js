import {
  firestore,
  auth,
  firebaseStorage
} from '../services/firebase';

const usersRef = firestore().collection('users');
const postsRef = firestore().collection('posts');
const postsMedia = firebaseStorage().ref('postsMedia');
const profilePicsRef = firebaseStorage().ref('profilePics');


const get_user_details_by_uid = async (uid = auth().currentUser.uid) => {
  try {
    const details = (await (usersRef.doc(uid)).get()).data();
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
const get_user_details_by_username = async (username) => {
  try {
    const details = (await usersRef.where("username", "==", username).limit(1).get()).docs.map(user => user.data())[0];
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

const get_user_posts = async (username) => {
  try {

    const {
      data: uid
    } = await get_uid_by_uername(username);
    const details = (await postsRef.where("byUser", "==", uid).limit(6).get()).docs.map(snapshot => snapshot.data())
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

const add_post = async (file) => {
  try {
    let media = await add_media(file);
    const mediaUrl = await media.data.ref.getDownloadURL();
    const givenData = {
      byUser: auth().currentUser.uid,
      createdAt: firestore.Timestamp.now(),
      postMediaUrl: mediaUrl,
      postId: 1
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

const add_media = async (file) => {
  try {
    let fileName = new Date() + '-' + file.name;
    const details = await postsMedia.child(fileName).put(file, {
      contentType: file.type
    });
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

const update_profilePic = async (file) => {
  try {
    let fileName = auth().currentUser.uid;
    await profilePicsRef.child(fileName).delete()
    const details = await profilePicsRef.child(fileName).put(file, {
      contentType: file.type
    });
    const mediaUrl = await details.ref.getDownloadURL();
    const givenData = {
      profilePic: mediaUrl
    }
    const detailsTwo = await usersRef.doc(auth().currentUser.uid).set(givenData, {
      merge: true
    });
    return {
      err: false,
      data: detailsTwo
    }
  } catch (error) {
    return {
      err: error,
      data: false
    }
  }
}

const get_uid_by_uername = async (username) => {
  try {
    const details = (await usersRef.where("username", "==", username).limit(1).get()).docs.map(user => user.data())[0].uid;
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
export const getUserDetailsByUid = get_user_details_by_uid;
export const getUserPosts = get_user_posts;
export const addPost = add_post;
export const getUserDetailsByUsername = get_user_details_by_username;
export const updateProfilePic = update_profilePic;