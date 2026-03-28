/** @format */

import { useEffect, useRef } from "react";

export function useReveal() {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const trigger = () => {
            const items = el.querySelectorAll(".reveal:not(.visible)");
            if (items.length === 0) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("visible");
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.05, rootMargin: "0px 0px -20px 0px" },
            );

            items.forEach((item) => observer.observe(item));
            return observer;
        };

        // Run immediately
        let observer = trigger();

        // Also watch for DOM changes (when API data loads)
        const mutationObserver = new MutationObserver(() => {
            if (observer) observer.disconnect();
            observer = trigger();
        });

        mutationObserver.observe(el, { childList: true, subtree: true });

        return () => {
            if (observer) observer.disconnect();
            mutationObserver.disconnect();
        };
    }, []);

    return ref;
}

export function useRevealSingle() {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        el.classList.add("visible");
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.05, rootMargin: "0px 0px -20px 0px" },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return ref;
}
