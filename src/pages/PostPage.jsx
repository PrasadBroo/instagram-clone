import { view } from "@risingstack/react-easy-state";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import PostModal from "../components/modals/PostModal";
import Navbar from "./../components/auth/Navbar";
import PostP from "./../components/auth/PostP";
import { getPostDetails } from "./../utils/firebase_api";
import mystore from "./../stores/store";
import SkeletonPostP from "../components/skeletons/SkeletonPostP";

function PostPage() {
  const { postid } = useParams();
  useEffect(() => {
    return () => {
      mystore.currentUser.postDetails = null;
      mystore.isAnythingLoading.postDetailsLoading = true;
    };
  }, []);
  useEffect(() => {
    const fetchDetails = async () => {
      mystore.isAnythingLoading.postDetailsLoading = true;
      const { data, err } = await getPostDetails(postid);
      if (err) {
        return alert(err.message);
      }
      mystore.currentUser.postDetails = data;
      mystore.isAnythingLoading.postDetailsLoading = false;
    };
    fetchDetails();
  }, [postid]);

  return (
    <div className="Post-Page">
      <Navbar />
      {mystore.isAnythingLoading.postDetailsLoading ? (
        <SkeletonPostP />
      ) : (
        <PostP />
      )}
      <PostModal />
      <Footer />
    </div>
  );
}
export default view(PostPage);
