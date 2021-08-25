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
const likesRef = firestore().collection('likes');
const commentsRef = firestore().collection('comments');
const commentsLikesRef = firestore().collection('commentsLikes');
const get_user_details_by_uid = async (uid = auth().currentUser.uid) => {
  try {
    const details = (await (usersRef.doc(uid)).get()).data();
    return {
      err: false,
      data: details,
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
    followersCount: 0,
    followingsCount: 0,
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
    const posts = (await postsRef.where("byUser", "==", uid).limit(6).get()).docs.map(snapshot => snapshot.data())
    const {data:postsCount} = await get_user_posts_count(uid)
    return {
      err: false,
      data: {posts,postsCount}
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
    const postId =makeid()
    const givenData = {
      byUser: auth().currentUser.uid,
      createdAt: firestore.Timestamp.now(),
      postMediaUrl: mediaUrl,
      postId: postId,
      likesCount:0,
      commentsCount:0,
    }
    const details = await postsRef.doc(postId).set(givenData);
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

const get_post_details = async(postid)=>{
  try {
    const post = (await postsRef.doc(postid).get()).data()
    const {data:user} = await getUserDetailsByUid(post.byUser)
    let comments = (await get_comments(postid)).data;
    const {data:ispostLiked} = await is_post_liked_by_user(postid);
    post.isLiked = ispostLiked;
    comments =await Promise.all(comments.map( async comment =>  {comment.user =  (await getUserDetailsByUid(comment.uid)).data;return comment})) 
    
    return {
      err: false,
      data: {comments,user,post}
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

const get_follows_count = async (uid = auth().currentUser.uid) => {
  try {
    let followersDetails = (await (usersFollowersRef.doc(uid).collection('users').get())).docs.length;
    let followingsDetails = (await (usersFollowingsRef.doc(uid).collection('users').get())).docs.length;
    return {
      err: false,
      followersCount: followersDetails,
      followingsCount: followingsDetails
    }
  } catch (error) {
    return {
      err: error,
      data: false,
      followersCount: false,
      followingsCount: false
    }
  }


}

const follow_user = async (user) => {
  try {
    const givenData = {
      fullName: mystore.currentUser.fullName,
      username: mystore.currentUser.username,
      profilePic: mystore.currentUser.profilePic,
      uid: mystore.currentUser.uid,
      createdAt: firestore.Timestamp.now()
    }
    const followingData = {
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
      uid: user.uid,
      createdAt: firestore.Timestamp.now()
    }
    let res = await usersFollowersRef.doc(user.uid).collection('users').doc(auth().currentUser.uid).set(givenData);
    let previousFollowersCount = (await usersRef.doc(user.uid).get()).data().followersCount;
    await usersRef.doc(user.uid).set({
      followersCount: previousFollowersCount += 1
    }, {
      merge: true
    });
    let previousFollowingsCount = (await usersRef.doc(auth().currentUser.uid).get()).data().followingsCount;
    await usersRef.doc(auth().currentUser.uid).set({
      followingsCount: previousFollowingsCount += 1
    }, {
      merge: true
    });
    await usersFollowingsRef.doc(auth().currentUser.uid).collection('users').doc(user.uid).set(followingData);
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
const unfollow_user = async (uid) => {
  try {
    let res = await usersFollowersRef.doc(uid).collection('users').doc(auth().currentUser.uid).delete();
    let previousFollowersCount = (await usersRef.doc(uid).get()).data().followersCount;
    await usersRef.doc(uid).set({
      followersCount: previousFollowersCount -= 1
    }, {
      merge: true
    });
    let previousFollowingsCount = (await usersRef.doc(auth().currentUser.uid).get()).data().followingsCount;
    await usersRef.doc(auth().currentUser.uid).set({
      followingsCount: previousFollowingsCount -= 1
    }, {
      merge: true
    });
    await usersFollowingsRef.doc(auth().currentUser.uid).collection('users').doc(uid).delete();
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

const has_followed = async (uid) => {
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

const get_followers_list = async (uid, endcursor) => {
  try {
    let res = (await usersFollowersRef.doc(uid).collection('users').limit(5).get()).docs.map(doc => doc.data())
    let modifiesRes = await Promise.all(res.map(async (follower) => {
      follower.isFollowedByUser = (await hasFollowed(follower.uid)).data;
      return follower
    }));
    modifiesRes.forEach(follower => {
      follower.isUnFollowInProgress = false;
      follower.isFollowInProgress = false;
    })
    return {
      err: false,
      data: modifiesRes
    }
  } catch (error) {
    return {
      err: error,
      data: false
    }
  }

}
const get_followings_list = async (uid, endcursor) => {
  try {
    let res = (await usersFollowingsRef.doc(uid).collection('users').limit(5).get()).docs.map(doc => doc.data())
    let modifiesRes = await Promise.all(res.map(async (follower) => {
      follower.isFollowedByUser = (await hasFollowed(follower.uid)).data;
      return follower
    }))
    return {
      err: false,
      data: modifiesRes
    }
  } catch (error) {
    return {
      err: error,
      data: false
    }
  }

}
const update_profile_details = async (name, email, username, bio, website) => {
  try {
    const isVAlidUsername = new RegExp(/^[a-zA-Z0-9_-]{3,16}$/).test(username);
    if(!isVAlidUsername)throw Error('Invalid Username');
    const givenData = {
      email: email,
      fullName: name,
      username,
      bio,
      website
    }
    const res = await usersRef.doc(auth().currentUser.uid).set(givenData, {
      merge: true
    });
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
const get_user_posts_count = async(uid)=>{
  try {
    const res = (await postsRef.where("byUser","==",uid).get()).docs.length;
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

function makeid(length=5) {
  let result           = '';
  let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-';
  let charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}

const post_like_increment = async(postid)=>{
  try {
    let previusLikesCount = (await postsRef.doc(postid).get()).data().likesCount;
    const res = await postsRef.doc(postid).set({likesCount:previusLikesCount+=1},{merge:true})
    return {
      err: false,
      data: res
    }
  } catch (error) {
    throw Error('cannot increment like count')
  }
}
const post_like_decrement = async(postid)=>{
  try {
    let previusLikesCount = (await postsRef.doc(postid).get()).data().likesCount;
    const res = await postsRef.doc(postid).set({likesCount:previusLikesCount-=1},{merge:true})
    return {
      err: false,
      data: res
    }
  } catch (error) {
    throw Error('cannot decrement like count')
  }
}
const like_post = async(postid)=>{
  try {
    const res =  await likesRef.doc(postid).collection('users').doc(auth().currentUser.uid).set({});
    await post_like_increment(postid)
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
const unlike_post = async(postid)=>{
  try {
    const res = await likesRef.doc(postid).collection('users').doc(auth().currentUser.uid).delete();
    await post_like_decrement(postid)
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
const is_post_liked_by_user = async(postid)=>{
  try {
    const res = (await likesRef.doc(postid).collection('users').doc(auth().currentUser.uid).get()).exists;
    return {
      err: false,
      data: res
    }
  } catch (error) {
    throw Error('error getting response')
  }
}
const add_comment = async(msg,postid)=>{
  try {
  const data_to_add = {
    uid: auth().currentUser.uid,
    createdAt: firestore.Timestamp.now(),
    message:msg,
    id:makeid(8)
  }
    const res = (await (await commentsRef.doc(postid).collection('comment').add(data_to_add)).get()).data()
    return {
      err: false,
      data: res
    }
  } catch (error) {
    
  }
}
const get_comments = async(postid)=>{
  try {
    const res = (await commentsRef.doc(postid).collection('comment').limit(10).get()).docs.map(comment => comment.data())
    const modifiedRes = await Promise.all(res.map(async comment => {comment.isLiked =  await (await is_comment_liked(comment.id)).data;return comment}))
    return {
      err: false,
      data: modifiedRes
    }
  } catch (error) {
    return {
      err: error,
      data: false
    }
  }
}
const is_comment_liked = async(commentId)=>{
  try {
    const res = (await commentsLikesRef.doc(commentId).collection('user').doc(auth().currentUser.uid).get()).exists
    return {
      err: false,
      data: res
    }
  } catch (error) {
    throw Error('something wrong here')
  }
}
export const like_comment = async(commentId)=>{
  try {
    const res = await commentsLikesRef.doc(commentId).collection('user').doc(auth().currentUser.uid).set({})
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
export const unlike_comment = async(commentId)=>{
  try {
    const res = await commentsLikesRef.doc(commentId).collection('user').doc(auth().currentUser.uid).delete()
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

export const get_user_suggetions = async(count=5)=>{
  try {
    const res = (await usersRef.limit(count).orderBy('createdAt').get()).docs.map(user => user.data())
    const modifiedRes = await Promise.all(res.map(async e => {e.isFollowedByUser = (await has_followed(e.uid)).data;return e}))
    return {
      err: false,
      data: modifiedRes
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
export const getFollowerslist = get_followers_list;
export const getFollowingsList = get_followings_list;
export const updateProfileDetails = update_profile_details
export const getPostDetails = get_post_details;
export const addComment = add_comment;
export const unlikePost = unlike_post;
export const likePost = like_post;
