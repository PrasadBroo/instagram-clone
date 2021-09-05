import {
  firestore,
  auth,
  firebaseStorage
} from '../services/firebase';
import mystore from '../stores/store';
import {
  isvalidUsername,
  isvalidFullName,
  isvalideBio,
  isValidWebsiteLink
} from './validations';

const usersRef = firestore().collection('users');
const postsRef = firestore().collection('posts');
const postsMedia = firebaseStorage().ref('postsMedia');
const usersFollowersRef = firestore().collection('followers');
const usersFollowingsRef = firestore().collection('followings');
const profilePicsRef = firebaseStorage().ref('profilePics');
const likesRef = firestore().collection('likes');
const commentsRef = firestore().collection('comments');
const commentsLikesRef = firestore().collection('commentsLikes');
const savedPostsRef = firestore().collection('saved');
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
    const details = (await usersRef.where("username", "==", username).limit(1).get()).docs.map(user => user.data());
    if (details.length === 0) throw Error('user not exists')
    return {
      err: false,
      data: details[0]
    }
  } catch (error) {
    return {
      err: error,
      data: false
    }
  }

}

const register_user = async (fullName, username) => {

  let details = {
    email: auth().currentUser.email,
    fullName,
    username,
    website: null,
    bio: null,
    followersCount: 0,
    followingsCount: 0,
    profilePic: 'https://i.ibb.co/LCk6LbN/default-Profile-Pic-7fe14f0a.jpg',
    uid: auth().currentUser.uid,
    createdAt: firestore.Timestamp.now()
  }
  try {
    const fullNameCheck = isvalidFullName(fullName)
    const isValidUername = isvalidUsername(username);
    if (!isValidUername) throw Error('Invalid Username')
    if (!fullNameCheck) throw Error('Invalid Full Name')
    const res = await usersRef.doc(auth().currentUser.uid).set(details);

    return {
      err: false,
      data: res
    }
  } catch (error) {
    throw Error(error)
  }


}

const get_user_posts = async (username) => {
  try {

    const {
      data: uid
    } = await get_uid_by_uername(username);
    const posts = (await postsRef.where("byUser", "==", uid).limit(6).get()).docs.map(snapshot => snapshot.data())
    const {
      data: postsCount
    } = await get_user_posts_count(uid)
    return {
      err: false,
      data: {
        posts,
        postsCount
      }
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
    const postId = makeid()
    const givenData = {
      byUser: auth().currentUser.uid,
      createdAt: firestore.Timestamp.now(),
      postMediaUrl: mediaUrl,
      postId: postId,
      likesCount: 0,
      commentsCount: 0,
    }
    await postsRef.doc(postId).set(givenData);
    const details = (await postsRef.doc(postId).get()).data()
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

const get_post_details = async (postid) => {
  try {
    const post = (await postsRef.doc(postid).get()).data()
    const {
      data: user
    } = await getUserDetailsByUid(post.byUser)
    let {
      data
    } = (await get_comments(postid));
    const {
      data: ispostLiked
    } = await is_post_liked_by_user(postid);
    post.isLiked = ispostLiked;
    const {
      data: isBookmarked
    } = await is_post_bookmarked(undefined, postid);
    post.isBookmarked = isBookmarked;
    let comments = await Promise.all(data.modifiedRes.map(async comment => {
      comment.user = (await getUserDetailsByUid(comment.uid)).data;
      return comment
    }))

    return {
      err: false,
      data: {
        comments,
        user,
        post,
        commentsSnaps: data.commentSnapshots
      }
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

const get_followers_list = async (uid, lastVisible) => {
  try {
    const query = lastVisible ? usersFollowersRef.doc(uid).collection('users').startAfter(lastVisible) : usersFollowersRef.doc(uid).collection('users')
    const followerSnapshot = (await query.limit(5).get());
    let res = await Promise.all(followerSnapshot.docs.map(async doc => await (await getUserDetailsByUid(doc.id)).data))
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
      data: modifiesRes,
      snapshots: followerSnapshot
    }
  } catch (error) {
    return {
      err: error,
      data: false
    }
  }

}
const get_followings_list = async (uid, lastVisible = null) => {
  try {
    const query = lastVisible ? usersFollowingsRef.doc(uid).collection('users').startAfter(lastVisible) : usersFollowingsRef.doc(uid).collection('users')
    const followingSnapshot = (await query.limit(5).get())
    let res = await Promise.all(followingSnapshot.docs.map(async doc => await (await getUserDetailsByUid(doc.id)).data))
    let modifiesRes = await Promise.all(res.map(async (follower) => {
      follower.isFollowedByUser = (await hasFollowed(follower.uid)).data;
      return follower
    }))
    return {
      err: false,
      data: modifiesRes,
      snapshots: followingSnapshot
    }
  } catch (error) {
    return {
      err: error,
      data: false
    }
  }

}
export const is_username_exists = async (username) => {
  try {
    const res = !(await (await usersRef.where("username", "==", username).get()).empty);
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
const update_profile_details = async (name, email, username, bio, website, uid) => {
  try {

    const isVAlidUsername = isvalidUsername(username)
    if (!isVAlidUsername) throw Error('Invalid Username');
    const isValidBio = isvalideBio(bio)
    if (!isValidBio) throw Error('Bio length must be less than 120 chars')
    const validWebsite = isValidWebsiteLink(website);
    if (!validWebsite) throw Error('invalid website')
    const {
      data: isUsernameExists,
      err: gotErr
    } = await is_username_exists(username);
    if ((isUsernameExists || gotErr) && username !== mystore.currentUser.username) throw Error(gotErr ? gotErr.message : 'Username already exists')
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
export const search_users = async(searchText)=>{
  try {
    const res = (await usersRef.orderBy('username').limit(5).startAt(searchText).endAt(searchText+ "\uf8ff").get()).docs.map(e => e.data());
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
const get_user_posts_count = async (uid) => {
  try {
    const res = (await postsRef.where("byUser", "==", uid).get()).docs.length;
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

function makeid(length = 5) {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

const post_like_increment = async (postid) => {
  try {
    let previusLikesCount = (await postsRef.doc(postid).get()).data().likesCount;
    const res = await postsRef.doc(postid).set({
      likesCount: previusLikesCount += 1
    }, {
      merge: true
    })
    return {
      err: false,
      data: res
    }
  } catch (error) {
    throw Error('cannot increment like count')
  }
}
const post_like_decrement = async (postid) => {
  try {
    let previusLikesCount = (await postsRef.doc(postid).get()).data().likesCount;
    const res = await postsRef.doc(postid).set({
      likesCount: previusLikesCount -= 1
    }, {
      merge: true
    })
    return {
      err: false,
      data: res
    }
  } catch (error) {
    throw Error('cannot decrement like count')
  }
}
// const comment_count_decrement = async(postid)=>{
//   try {
//     let previusCount = (await postsRef.doc(postid).get()).data().commentsCount;
//     const res = await postsRef.doc(postid).set({commentsCount:previusCount-=1},{merge:true})
//     return {
//       err: false,
//       data: res
//     }
//   } catch (error) {
//     throw Error('cannot decrement comment count')
//   }
// }
const comment_count_increment = async (postid) => {
  try {
    let previusCount = (await postsRef.doc(postid).get()).data().commentsCount;
    const res = await postsRef.doc(postid).set({
      commentsCount: previusCount += 1
    }, {
      merge: true
    })
    return {
      err: false,
      data: res
    }
  } catch (error) {
    throw Error('cannot increment comment count')
  }
}
const like_post = async (postid) => {
  try {
    const alredyLiked = await (await likesRef.doc(postid).collection('users').doc(auth().currentUser.uid).get()).exists
    if (alredyLiked) throw new Error('post alredy liked')
    const res = await likesRef.doc(postid).collection('users').doc(auth().currentUser.uid).set({});
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
const unlike_post = async (postid) => {
  try {
    const alredyUnliked = (await (await likesRef.doc(postid).collection('users').doc(auth().currentUser.uid).get()).exists);
    if (!alredyUnliked) throw new Error('post alredy unliked')
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
const is_post_liked_by_user = async (postid) => {
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
const add_comment = async (msg, postid) => {
  try {
    const data_to_add = {
      uid: auth().currentUser.uid,
      createdAt: firestore.Timestamp.now(),
      message: msg,
      id: makeid(8)
    }
    const res = (await (await commentsRef.doc(postid).collection('comment').add(data_to_add)).get()).data()
    await comment_count_increment(postid)
    return {
      err: false,
      data: res
    }
  } catch (error) {

  }
}
const get_comments = async (postid) => {
  try {
    const commentSnapshots = (await commentsRef.doc(postid).collection('comment').limit(10).get());
    const res = commentSnapshots.docs.map(comment => comment.data())
    let modifiedRes = await Promise.all(res.map(async comment => {
      comment.isLiked = await (await is_comment_liked(comment.id)).data;
      return comment
    }))
    modifiedRes = await Promise.all(modifiedRes.map(async e => {
      e.likesCount = (await get_comment_likes_count(e.id)).data;
      return e
    }))
    return {
      err: false,
      data: {
        modifiedRes,
        commentSnapshots
      }
    }
  } catch (error) {
    return {
      err: error,
      data: false
    }
  }
}
const get_comment_likes_count = async (commentId) => {
  try {
    const res = (await commentsLikesRef.doc(commentId).collection('user').get()).docs.length;
    return {
      err: false,
      data: res
    }
  } catch (error) {
    throw Error('something wrong here')
  }
}
const is_comment_liked = async (commentId) => {
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
export const like_comment = async (commentId) => {
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
export const unlike_comment = async (commentId) => {
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

export const get_user_suggetions = async (count = 5) => {
  try {
    const res = (await usersRef.limit(count).orderBy('createdAt', count <= 5 ? 'desc' : 'asc').get()).docs.map(user => user.data())
    const modifiedRes = await Promise.all(res.map(async e => {
      e.isFollowedByUser = (await has_followed(e.uid)).data;
      return e
    }))
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

export const get_suggested_posts = async () => {
  try {
    const allPosts = [];
    const {
      data: followingsList,
      snapshots
    } = await getFollowingsList(auth().currentUser.uid);

    const res = (await Promise.all(followingsList.map(async ele => (await get_user_posts(ele.username)).data)))
    res.forEach(e => e.posts.forEach(e => allPosts.push(e)))
    const modifiedRes = await (await Promise.all(allPosts.map(async e => {
      e = (await get_post_details(e.postId)).data;
      return e
    }))).map(e => {
      e.topComments = e.comments.slice(0, 2);
      return e
    })
    return {
      err: false,
      data: modifiedRes,
      followingSnapshots: snapshots
    }
  } catch (error) {
    return {
      err: error,
      data: false
    }
  }
}

export const get_saved_posts = async (uid = auth().currentUser.uid) => {
  try {
    const res = await Promise.all((await savedPostsRef.doc(uid).collection('posts').limit(6).get()).docs.map(async e => await (await get_post_details(e.id)).data));
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
export const add_post_to_saved_posts = async (uid = auth().currentUser.uid, postId) => {
  try {
    const alreadyBookmarked = (await is_post_bookmarked(uid, postId)).data;
    if (alreadyBookmarked) throw Error('post alredy bookmarked')
    const res = await savedPostsRef.doc(uid).collection('posts').doc(postId).set({});
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
export const remove_post_from_saved = async (uid = auth().currentUser.uid, postId) => {
  try {
    const alreadyRemoved = !((await is_post_bookmarked(uid, postId)).data);
    if (alreadyRemoved) throw Error('post alredy removed from bookmarks')
    const res = await savedPostsRef.doc(uid).collection('posts').doc(postId).delete();
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
export const is_post_bookmarked = async (uid = auth().currentUser.uid, postId) => {
  try {
    const alreadyBookmarked = await (await savedPostsRef.doc(uid).collection('posts').doc(postId).get()).exists;
    return {
      err: false,
      data: alreadyBookmarked
    }
  } catch (error) {
    return {
      err: error,
      data: false
    }
  }
}
export const load_more_suggested_posts = async (lastVisible) => {
  try {
    const allPosts = [];
    const {
      data: followingsList
    } = await getFollowingsList(auth().currentUser.uid, lastVisible);
    const res = (await Promise.all(followingsList.map(async ele => (await get_user_posts(ele.username)).data)))
    res.forEach(e => e.posts.forEach(e => allPosts.push(e)))
    const modifiedRes = await (await Promise.all(allPosts.map(async e => {
      e = (await get_post_details(e.postId)).data;
      return e
    }))).map(e => {
      e.topComments = e.comments.slice(0, 2);
      return e
    })
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
export const load_more_comments = async (postid, lastDocument) => {
  try {
    const commentSnapshots = (await commentsRef.doc(postid).collection('comment').limit(10).startAfter(lastDocument).get())
    const commentsRaw = commentSnapshots.docs.map(e => e.data());
    const comments = await Promise.all(commentsRaw.map(async e => {
      e.user = await (await getUserDetailsByUid(e.uid)).data;
      return e
    }))
    const modifiedRes = await Promise.all(comments.map(async comment => {
      comment.isLiked = await (await is_comment_liked(comment.id)).data;
      return comment
    }))

    return {
      err: false,
      data: {
        modifiedRes,
        commentSnapshots
      }
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