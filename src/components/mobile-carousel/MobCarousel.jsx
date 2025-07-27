import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import fetchUsers from "../../utils/fetchProfiles";
import "./MobCarousel.css";

const SkeletonCard = () => (
  <motion.div
    className="skeleton-card"
    initial={{ opacity: 1 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
  >
    <div className="skeleton-image shimmer"></div>
    <div className="skeleton-data">
      <div className="skeleton-line skeleton-name shimmer"></div>
      <div className="skeleton-line skeleton-discipline shimmer"></div>
      <div className="skeleton-tags">
        <div className="skeleton-tag shimmer"></div>
        <div className="skeleton-tag shimmer"></div>
        <div className="skeleton-tag shimmer"></div>
      </div>
      <div className="skeleton-description">
        <div className="skeleton-line skeleton-desc-line shimmer"></div>
        <div className="skeleton-line skeleton-desc-line shimmer"></div>
        <div className="skeleton-line skeleton-desc-short shimmer"></div>
      </div>
    </div>
  </motion.div>
);

const UserCard = ({
  name,
  age,
  discipline,
  year,
  tags,
  image,
  description,
  profiles,
  id,
  onSwipe,
}) => {
  const x = useMotionValue(0);

  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
  const isFront = id === profiles[profiles.length - 1].id;
  const rotate = useTransform(() => {
    const offSet = isFront ? 0 : id % 2 ? 6 : -6;
    return `${rotateRaw.get() + offSet}deg`;
  });

  const handleDragEnd = () => {
    const swipe = x.get();
    if (Math.abs(swipe) > 100) {
      const profile = profiles.find((p) => p.id === id);
      const direction = swipe > 0 ? "right" : "left";
      onSwipe(profile, direction);
    }
  };
  return (
    <motion.div
      className="card-stack-item"
      style={{
        x,
        opacity,
        rotate,
        transition: "0.125s transform",
        boxShadow: isFront
          ? "0 20px 25px -5px rgba(0, 0, 0 ,0.5), 0 8px 10px -6px rgb(0, 0, 0/0.5)"
          : undefined,
      }}
      animate={{
        scale: isFront ? 1 : 0.98,
      }}
      drag="x"
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      onDragEnd={handleDragEnd}
    >
      <motion.div
        className="user-card-wrapper"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="card__image">
          <img src={image} alt="user-image" />
        </div>
        <div className="card__data">
          <div className="head-wrapper">
            <p className="name-age">
              {name} {age}
            </p>
            <p className="discipline-year">
              {discipline} {year}
            </p>
          </div>
          <div className="tags">
            {tags.map((tag, index) => (
              <div key={index} className="tag">
                {tag}
              </div>
            ))}
          </div>
          <div className="description">
            <p>{description}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function MobCarousel() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState([]);
  const [disliked, setDisliked] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const loadProfiles = async () => {
      try {
        setLoading(true);
        const { data, error } = await fetchUsers(controller.signal);
        if (error) throw new Error(error);
        setProfiles(data);
      } catch (error) {
        setError("Could not load profiles");
        console.error("Failed to fetch profiles:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProfiles();
    return () => controller.abort();
  }, []);

  const handleSwipe = (profile, direction) => {
    if (direction === "right") {
      setLiked((prev) => [...prev, profile]);
    } else {
      setDisliked((prev) => [...prev, profile]);
    }
    setProfiles((prev) => prev.filter((p) => p.id !== profile.id));
  };

  //test stuff
  useEffect(() => {
    console.log("liked:", liked);
    console.log("disliked:", disliked);
  }, [liked, disliked]);

  if (loading) {
    return (
      <AnimatePresence>
        <div className="card-stack-container">
          <div className="card-stack">
            <SkeletonCard />
          </div>
        </div>
      </AnimatePresence>
    );
  }

  if (error) {
    return (
      <div className="card-stack-container">
        <div className="card-stack">{error}</div>
      </div>
    );
  }

  if (profiles.lenth === 0) {
    return (
      <div className="card-stack-empty">
        <p>No more profiles 💔</p>
        <button>Reload</button>
      </div>
    );
  }

  return (
    <div className="card-stack-container">
      {profiles.map((profile) => (
        <AnimatePresence>
          <UserCard
            profiles={profiles}
            {...profile}
            key={profile.id}
            length={profiles.length}
            onSwipe={handleSwipe}
          />
        </AnimatePresence>
      ))}
    </div>
  );
}
