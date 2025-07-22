import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion, AnimatePresence } from "framer-motion";
import fetchUsers from "../../utils/fetchProfiles";
import "swiper/css";
import "swiper/css/effect-cards";
import "./MobCarousel.css";
import { EffectCards } from "swiper/modules";

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
}) => (
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
);

export default function MobCarousel() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false); // default true to show skeleton
  const [error, setError] = useState(null);

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
        setLoading(false);
        console.error("Failed to fetch profiles:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProfiles();
    return () => controller.abort();
  }, []);

  return (
    <Swiper
      effect={"cards"}
      grabCursor={true}
      modules={[EffectCards]}
      className="mySwiper"
    >
      {loading ? (
        <AnimatePresence>
          <SwiperSlide key="skeleton">
            <SkeletonCard />
          </SwiperSlide>
        </AnimatePresence>
      ) : error ? (
        <SwiperSlide key="error">
          <h2 className="text--mobile error">{error}</h2>
        </SwiperSlide>
      ) : (
        profiles.map((profile) => (
          <SwiperSlide key={profile.id}>
            <UserCard {...profile} />
          </SwiperSlide>
        ))
      )}
    </Swiper>
  );
}
