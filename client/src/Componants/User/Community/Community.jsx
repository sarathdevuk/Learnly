import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import { useSelector } from "react-redux";
import {
  getCommunity,
  getJoinedCommunity,
  getUserDetails,
  joinCommunity,
} from "../../../services/userApi";
import { toast } from "react-toastify";

function Community({ isTab }) {
  const user = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [communitys, setCommunitys] = useState([]);
  const [joinedCommunity, setJoinedCommunity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [yourCommunity, setYourCommunity] = useState();

  const handleJoin = (communityId) => {
    joinCommunity(user.id, communityId)
      .then((response) => {
        if (response.data.status) {
          toast.success(response.data.message, {
            position: "top-center",
          });
          loadJoinedCommunity();
          setYourCommunity([...yourCommunity, communityId]);
        } else {
          toast.error(response.data.message, {
            position: "top-center",
            toastId: "joinCommunity Error",
          });
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: "top-center",
        });
      });
  };

  // load joined community details of user api
  const loadJoinedCommunity = () => {
    getJoinedCommunity().then((response) => {
      if (response.data.status) {
        setJoinedCommunity(response.data.joinedCommunity);
      }
    });
  };

  // load all community Details
  const loadAllCommunityDetails = () => {
    getCommunity()
      .then((response) => {
        setCommunitys(response.data.community);
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Cant load Community Details", {
          position: "top-center",
        });
      });
  };

  useEffect(() => {
    // get user joined community
    loadJoinedCommunity();

    // get all community
    loadAllCommunityDetails();

    // get userDetails
    getUserDetails().then((response) => {
      setYourCommunity(response.data.userDetails.community);
    });
  }, []);

  return (
    <div>
      {/* list of all community */}
      <div className="pb-16">
        <div className="flex justify-between items-center mt-10 mb-5">
          <h1 className="text-xl font-bold sm:text-2xl">Explore Community</h1>
          {joinedCommunity.length == 0 ? (
            <>
              {user.email ? (
                <Button
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  <div
                    className="flex justify-center items-center"
                    data-te-toggle="modal"
                    data-te-target="#editCourse"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    <BiPlus size={22} />{" "}
                    <span className="ml-4 hidden md:flex">Create New</span>
                  </div>
                </Button>
              ) : null}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Community;
