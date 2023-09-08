import { useEffect, useState } from "react";
import { Predict } from "@algolia/predict-react";

const anonymousUserProfile = { user: "anonymous" };

export default function PredictUserProfileProvider({
  children,
  predictClient,
  userID,
}) {
  const [userProfile, setUserProfile] = useState(
    userID ? null : anonymousUserProfile
  );

  useEffect(() => {
    if (!userID) {
      return;
    }

    predictClient
      .fetchUserProfile({
        userID,
        params: {
          modelsToRetrieve: ["affinities", "funnel_stage", "order_value"],
          typesToRetrieve: ["properties", "segments"],
        },
      })
      .then((nextUserProfile) => {
        setUserProfile(nextUserProfile);
      })
      .catch(() => {
        setUserProfile(anonymousUserProfile);
      });
  }, [userID]);

  if (!userProfile) {
    return null;
  }

  return <Predict userProfile={userProfile}>{children}</Predict>;
}
