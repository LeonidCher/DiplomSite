import React from "react";
import logo from "../../public/icons/ss.svg"
import "./style/feedback.css"
interface FeedbackCardProps {
  name: string;
  description: string;
}

const FeedbackCard :  React.FC< FeedbackCardProps> = ({ name, description }) => {
  return (
    <>
      <div className="feedbackCard">
        <div className="feedbackCard__header">
          <p className="feedbackCard__name">{name}</p>
          <img src={logo} alt="" className="feedbackCard__logo" />
        </div>
        <div className="feedbackCard__body">
          <p className="feedbackCard__text">{description}</p>
        </div>
      </div>
    </>
  );
};

export default FeedbackCard;
