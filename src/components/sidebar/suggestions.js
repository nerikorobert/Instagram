// Suggestion.js
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { getSuggestedProfiles } from "../../services/firebase";
import SuggestedProfile from './suggested-profile'; // Assuming your file name is SuggestedProfile.js

export default function Suggestion({ userId, following, loggedInUserDocId }) {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    async function suggestedProfiles() {
      try {
        const response = await getSuggestedProfiles(userId, following);
        setProfiles(response);
      } catch (error) {
        console.error("Error fetching suggested profiles:", error);
        setProfiles([]); // Set profiles to an empty array in case of an error
      }
    }

    if (userId) {
      suggestedProfiles();
    }
  }, [userId, following]);

  return !profiles ? (
    <Skeleton count={1} height={150} className="mt-5" />
  ) : profiles.length > 0 ? (
    <div>
      <div className="rounded flex flex-col">
        <div className="text-sm flex items-center align-items justify-between mb-2">
          <p className="font-bold text-gray-base">Suggestions for you</p>
        </div>
        <div className="mt-4 grid gap-5">
          {profiles.map((profile) => (
            <SuggestedProfile
              key={profile.docId}
              profileDocId={profile.docId}
              username={profile.username}
              profileId={profile.userId}
              userId={userId}
              loggedInUserDocId={loggedInUserDocId} // Make sure prop names match
            />
          ))}
        </div>
      </div>
    </div>
  ) : null;
}

Suggestion.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
  loggedInUserDocId: PropTypes.string,
};
