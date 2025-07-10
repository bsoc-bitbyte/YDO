import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import nextArrow from "../../assets/carousel/nextArrow.svg";
import prevArrow from "../../assets/carousel/prevArrow.svg";
import profiles from "./profiles.json";
import "./EmblaCarousel.css";

const EmblaCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

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
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {profiles.map((profile, index) => (
              <div className="embla__slide" key={profile.id}>
                <div
                  className={`card__container ${
                    index === selectedSlide ? "selected" : ""
                  }`}
                >
                  <div className="card__img-wrapper">
                    <img className="card__img" src={profile.image} alt="pic" />
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
            ))}
          </div>
        </div>

        <div className="embla__next" onClick={scrollNext}>
          <img src={nextArrow} alt="next" />
        </div>
        <div className="embla__prev" onClick={scrollPrev}>
          <img src={prevArrow} alt="prev" />
        </div>
      </div>
    </>
  );
};

export default EmblaCarousel;
