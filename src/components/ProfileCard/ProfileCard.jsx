import React from "react";
import "./ProfileCard.css";
const ProfileCard = ({ profile }) => {
const { name, age, branch, year, tags, bio, image } = profile;
    return(
      <div className="profile-card">
        <div className="profile-img-back">
          <img src={image} alt="Profile" className="profile-img"></img>
        </div>
        <div className="profile-info">
          <div className="profile-name-age">
              <span className="profile-name">{name}</span>
              <span className="profile-age">{age}</span>
          </div>
          <div className="profile-branch-year">
              <span className="profile-branch">{branch}</span>
              <span className="profile-year">{year}</span>
          </div>
          <div className="profile-tags">
          {tags.map((tag,idx)=>(
            <div className="profile-tag" key={idx}>{tag}</div>
          ))}
          </div>
          <div className="profile-bio">
            <span>{bio}</span>
          </div>
        </div>
      </div>
    );
};
export default ProfileCard;