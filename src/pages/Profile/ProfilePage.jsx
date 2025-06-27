import { useState } from "react";
import backgroundImg from "../../assets/profile-images/background.png";
import profilePhoto from "../../assets/profile-images/profilephoto.jpeg";
import editButton from "../../assets/profile-images/editButton.png";
import closeButton from "../../assets/profile-images/closeButton.png";
import "./ProfilePage.css";

const initialProfile = {
  name: "Cherry J",
  dob: "30/02/2004",
  gender: "Female",
  orientation: "Straight",
  interestedIn: "Men",
  height: "5.1",
  branch: "B.des",
  year: "2nd Year",
  bio: "Trying to find someone who will give me laugh lines instead of frown lines...👀",
  tags: ["Foodie🍱", "Cancer♋️", "Sober⛔️", "Non-Smoker🚭", "Religious✨"],
  image: profilePhoto,
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTagIndex, setEditingTagIndex] = useState(null);
  const [newTag, setNewTag] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagClick = (index) => {
    setEditingTagIndex(index);
  };

  const handleTagChange = (e) => {
    const updatedTags = [...profile.tags];
    updatedTags[editingTagIndex] = e.target.value;
    setProfile((prev) => ({ ...prev, tags: updatedTags }));
  };

  const handleAddTag = () => {
    const trimmed = newTag.trim();
    if (trimmed !== "") {
      setProfile((prev) => ({
        ...prev,
        tags: [...prev.tags, trimmed],
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    const updatedTags = profile.tags.filter((_, i) => i !== indexToRemove);
    setProfile((prev) => ({ ...prev, tags: updatedTags }));
    setEditingTagIndex(null);
  };

  return (
    <div
      className="profile-container"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
        minHeight: "100vh",
      }}
    >
      <div className="card-wrapper">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="edit-button"
        >
          <img src={isEditing ? closeButton : editButton} alt="Edit Toggle" />
        </button>

        <div className="profile-card">
          <div className="left-section">
            <div className="profile-image">
              <img src={profile.image} alt="Profile" className="profile-img" />
            </div>

            <div className="left-content">
              <div className="fixed-height">
                {isEditing ? (
                  <input
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="name-input"
                  />
                ) : (
                  <h3 className="profile-name">{profile.name}</h3>
                )}
              </div>

              <div className="fixed-height">
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    className="bio-textarea"
                    rows="3"
                  />
                ) : (
                  <p className="profile-bio">{profile.bio}</p>
                )}
              </div>

              <div className="tags-container">
                {profile.tags.map((tag, idx) =>
                  isEditing && editingTagIndex === idx ? (
                    <input
                      key={idx}
                      value={tag}
                      onChange={handleTagChange}
                      onBlur={() => {
                        const trimmed = tag.trim();
                        const updatedTags = [...profile.tags];
                        if (trimmed === "") {
                          updatedTags.splice(idx, 1);
                        } else {
                          updatedTags[idx] = trimmed;
                        }
                        setProfile((prev) => ({ ...prev, tags: updatedTags }));
                        setEditingTagIndex(null);
                      }}
                      className="tag tag-input"
                      autoFocus
                    />
                  ) : (
                    <span
                      key={idx}
                      className="tag"
                      onClick={() => isEditing && handleTagClick(idx)}
                    >
                      {tag}
                      {isEditing && (
                        <button
                          className="tag-remove-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveTag(idx);
                          }}
                          title="Remove tag"
                        >
                          ×
                        </button>
                      )}
                    </span>
                  )
                )}

                {isEditing && (
                  <div className="tag-input-wrapper">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="tag tag-input"
                      placeholder="New tag"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="tag-add-button"
                      title="Add tag"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="divider"></div>

          <div className="right-section">
            <div className="branch-year fixed-height">
              {isEditing ? (
                <>
                  <input
                    name="branch"
                    value={profile.branch}
                    onChange={handleChange}
                    className="branch-input"
                  />
                  <input
                    name="year"
                    value={profile.year}
                    onChange={handleChange}
                    className="branch-input"
                  />
                </>
              ) : (
                `${profile.branch}, ${profile.year}`
              )}
            </div>

            {["dob", "gender", "orientation", "interestedIn", "height"].map(
              (field) => (
                <div className="detail-row fixed-height" key={field}>
                  <span className="detail-label">
                    {field
                      .charAt(0)
                      .toUpperCase()
                      .concat(field.slice(1).replace(/([A-Z])/g, " $1"))}
                    :
                  </span>
                  {isEditing ? (
                    <input
                      name={field}
                      value={profile[field]}
                      onChange={handleChange}
                      className="detail-input"
                    />
                  ) : (
                    <span className="detail-value">{profile[field]}</span>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}