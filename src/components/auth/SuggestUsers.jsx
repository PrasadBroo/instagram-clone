import { view } from "@risingstack/react-easy-state";
import React, { useEffect } from "react";
import SuggestedUser from "../subcomponents/SuggestedUser";
import SuggestUserCss from "../../css/auth/SuggestUser.module.css";
import { get_user_suggetions } from "../../utils/firebase_api";
import mystore from "../../stores/store";
import SkeletonSuggUser from "../skeletons/SkeletonSuggUser";

function SuggestUsers() {
  useEffect(() => {
    const fetchDetails = async () => {
      const { data, err } = await get_user_suggetions(10);
      if (!err) {
        mystore.currentUser.suggestedUSer = data;
      }
    };
    fetchDetails();
  }, []);
  const handelBack = ()=>window.location.reload();
  return (
    <div className={SuggestUserCss.suggestUsers}>
      {mystore.currentUser.suggestedUSer &&
        mystore.currentUser.suggestedUSer.map((e) => (
          <div className={SuggestUserCss.wrapUser}>
            <SuggestedUser user={e} type key={e.uid} />
          </div>
        ))}
        {!mystore.currentUser.suggestedUSer && [0,1,2,3,4,5,6,7,8,9].map(e => <SkeletonSuggUser key={e}/>)}
        <button onClick={handelBack} className={SuggestUserCss.backBtn}>Back to instagram</button>
    </div>
  );
}

export default view(SuggestUsers);
