import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import nextArrow from "../../assets/carousel/nextArrow.svg";
import prevArrow from "../../assets/carousel/prevArrow.svg";
//import profiles from "./profiles.json";
import "./EmblaCarousel.css";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const ProfileCard = ({
  profile,
  index,
  selectedSlide,
  isVisible,
  fadeComplete,
}) => {
  return (
    <>
      <div className="embla__slide" key={profile.id}>
        <div
          className={`card__container ${
            index === selectedSlide ? "selected" : ""
          } ${!fadeComplete ? (isVisible ? "fade-in" : "fade-out") : ""}`}
        >
          <div className="card__img-wrapper">
            <img
              className="card__img"
              src={profile.image}
              alt="pic"
              loading="lazy"
            />
          </div>
          <div className="card__data">
            <div className="card__header">
              <h3 className="card__data--heading">
                {profile.name} ({profile.age})
              </h3>
              <p className="card__data--subheading">
                {profile.discipline} - {profile.year}
              </p>
            </div>
            <div className="card__tags">
              {profile.tags.map((tag, idx) => (
                <span className="tag" key={idx}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="card__description">
              <p>{profile.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const SkeletonCard = ({ index, selectedSlide }) => {
  return (
    <>
      <div className="embla__slide">
        <div
          className={`card__container skeleton-card ${
            index === selectedSlide ? "selected" : ""
          }`}
        >
          <div className="card__img-wrapper--skeleton skeleton"></div>
          <div className="card__data">
            <div className="card__header--skeleton">
              <div className="card__data--heading--skeleton skeleton"></div>
              <div className="card__data--subheading--skeleton skeleton"></div>
            </div>
            <div className="card__tags--skeleton">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div className="tag--skeleton skeleton" key={idx}></div>
              ))}
            </div>
            <div className="card__description--skeleton skeleton"></div>
          </div>
        </div>
      </div>
    </>
  );
};

const EmblaCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  //Backend integration

  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fadeComplete, setFadeComplete] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //     setTimeout(() => setContentVisible(true), 100);
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // });

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/profiles`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("failed to fetch profiles");
        const data = await res.json();
        setProfiles(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
        setTimeout(() => setContentVisible(true), 100);
      }
    };
    fetchData();
    return () => controller.abort;
  }, []);

  useEffect(() => {
    if (contentVisible && !fadeComplete) {
      const timer = setTimeout(() => {
        setFadeComplete(true);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [contentVisible, fadeComplete]);

  //state control for the carousel

  const [selectedSlide, setSelectedSlide] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedSlide(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedSlide]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollNext = () => emblaApi && emblaApi.scrollNext();
  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();

  return (
    <>
      <div className="embla">
        {loading && (
          <>
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__container">
                {Array.from({ length: 4 }).map((_, index) => (
                  <SkeletonCard index={index} selectedSlide={selectedSlide} />
                ))}
              </div>
            </div>
            <div className="embla__next" onClick={scrollNext}>
              <img src={nextArrow} alt="next" />
            </div>
            <div className="embla__prev" onClick={scrollPrev}>
              <img src={prevArrow} alt="prev" />
            </div>
          </>
        )}
        {error && <div className="carousel__error">Error: {error}</div>}
        {!loading && !error && (
          <>
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__container">
                {profiles?.length > 0 ? (
                  profiles.map((profile, index) => (
                    <ProfileCard
                      profile={profile}
                      index={index}
                      selectedSlide={selectedSlide}
                      isVisible={contentVisible}
                      fadeComplete={fadeComplete}
                    />
                  ))
                ) : (
                  <div>No profiles found</div>
                )}
              </div>
            </div>
            <div className="embla__next" onClick={scrollNext}>
              <img src={nextArrow} alt="next" />
            </div>
            <div className="embla__prev" onClick={scrollPrev}>
              <img src={prevArrow} alt="prev" />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EmblaCarousel;
