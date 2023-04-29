import React from "react";
import PlushiDeets from "../components/PlushiDeets";
import CommentForm from "../components/CommentForm";

const PlushiDetails = () => {
  return (
    <div>
      <div className="container">
        <PlushiDeets />
      </div>
      <div>
        <CommentForm />
      </div>
    </div>
  );
};

export default PlushiDetails;