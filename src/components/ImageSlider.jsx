/** @format */
import { useEffect, useRef } from "react";

export default function ImageSlider({ images, onImageClick }) {
    const swiperRef = useRef(null);
    const instanceRef = useRef(null);

    useEffect(() => {
        if (!images?.length) return;

        const initSwiper = () => {
            if (instanceRef.current) {
                instanceRef.current.destroy(true, true);
            }
            instanceRef.current = new window.Swiper(swiperRef.current, {
                effect: "cards",
                grabCursor: true,
                centeredSlides: true,
                loop: images.length > 2,
                cardsEffect: {
                    perSlideOffset: 8,
                    perSlideRotate: 2,
                    rotate: true,
                    slideShadows: true,
                },
                pagination: {
                    el: ".slider-pagination",
                    clickable: true,
                },
            });
        };

        if (window.Swiper) {
            initSwiper();
            return;
        }

        // Load CSS
        if (!document.querySelector("#swiper-css")) {
            const link = document.createElement("link");
            link.id = "swiper-css";
            link.rel = "stylesheet";
            link.href = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css";
            document.head.appendChild(link);
        }

        // Load JS
        if (!document.querySelector("#swiper-js")) {
            const script = document.createElement("script");
            script.id = "swiper-js";
            script.src = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
            script.onload = initSwiper;
            document.body.appendChild(script);
        }

        return () => {
            if (instanceRef.current?.destroy) {
                instanceRef.current.destroy(true, true);
            }
        };
    }, [images]);

    if (!images?.length) return null;

    return (
        <div style={{ padding: "16px 16px 40px", position: "relative" }}>
            <div ref={swiperRef} className="swiper" style={{ width: "100%", paddingBottom: "8px" }}>
                <div className="swiper-wrapper">
                    {images.map((img, i) => (
                        <div
                            key={img._id || i}
                            className="swiper-slide"
                            style={{
                                borderRadius: "12px",
                                overflow: "hidden",
                                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                            }}
                            onClick={() => onImageClick?.(img.url)}
                        >
                            <img
                                src={img.url}
                                alt={img.name || `Slide ${i + 1}`}
                                style={{
                                    width: "100%",
                                    height: "400px",
                                    objectFit: "cover",
                                    display: "block",
                                    borderRadius: "12px",
                                    overflow: "hidden",
                                }}
                            />
                        </div>
                    ))}
                </div>
                <div className="slider-pagination" style={{ marginTop: "12px", textAlign: "center" }} />
            </div>
        </div>
    );
}
