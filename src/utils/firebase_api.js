import {
  firestore,
  auth,
  firebaseStorage
} from '../services/firebase';
import mystore from '../stores/store';

const usersRef = firestore().collection('users');
const postsRef = firestore().collection('posts');
const postsMedia = firebaseStorage().ref('postsMedia');
const usersFollowersRef = firestore().collection('followers');
const usersFollowingsRef = firestore().collection('followings');
const profilePicsRef = firebaseStorage().ref('profilePics');


const get_user_details_by_uid = async (uid = auth().currentUser.uid) => {
  try {
    const details = (await (usersRef.doc(uid)).get()).data();
    let followDetails = await getFollowsCount();
    return {
      err: false,
      data: details,
      followDetails,
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
    followersCount:0,
    followingsCount:0,
    profilePic: 'https://i.ibb.co/LCk6LbN/default-Profile-Pic-7fe14f0a.jpg',
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
    await profilePicsRef.child(fileName).delete().catch(err => err);
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

const update_profile_in_realtime = async () => {
  try {
    usersRef.doc(auth().currentUser.uid).onSnapshot(next => mystore.currentUser = next.data())
  } catch (error) {
    return;
  }

}

const get_follows_count = async(uid=auth().currentUser.uid)=>{
  try {
    let followersDetails = (await (usersFollowersRef.doc(uid).collection('users').get())).docs.length;
    let followingsDetails = (await (usersFollowingsRef.doc(uid).collection('users').get())).docs.length;
    return {
      err: false,
      followersCount:followersDetails,
      followingsCount:followingsDetails
    }
  } catch (error) {
    return {
      err: error,
      data: false,
      followersCount:false,
      followingsCount:false
    }
  }
  

}

const follow_user = async(uid,username)=>{
  try {
    const givenData = {
      createdAt: firestore.Timestamp.now(),
      byUser:username,
    }
    let res = await usersFollowersRef.doc(uid).collection('users').doc(auth().currentUser.uid).set(givenData);
    let previousFollowersCount = (await usersRef.doc(uid).get()).data().followersCount;
    await usersRef.doc(uid).set({followersCount:previousFollowersCount +=1},{merge:true});
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
const unfollow_user = async(uid)=>{
  try {
    let res = await usersFollowersRef.doc(uid).collection('users').doc(auth().currentUser.uid).delete();
    let previousFollowersCount = (await usersRef.doc(uid).get()).data().followersCount;
    await usersRef.doc(uid).set({followersCount:previousFollowersCount-=1},{merge:true});
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

const has_followed = async(uid)=>{
  try {
    let res = (await usersFollowersRef.doc(uid).collection('users').doc(auth().currentUser.uid).get()).exists;
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
export const getUserDetailsByUid = get_user_details_by_uid;
export const getUserPosts = get_user_posts;
export const addPost = add_post;
export const getUserDetailsByUsername = get_user_details_by_username;
export const updateProfilePic = update_profilePic;
export const updateProfileinRealtime = update_profile_in_realtime;
export const getFollowsCount = get_follows_count;
export const followUser = follow_user;
export const unfollowUser = unfollow_user;
export const hasFollowed = has_followed;