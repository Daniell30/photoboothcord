const header = document.querySelector("[data-header]");
const revealElements = document.querySelectorAll("[data-reveal]");
const yearTarget = document.querySelector("[data-year]");
const mutedVideos = document.querySelectorAll("[data-muted-video]");

if (header) {
  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

if (revealElements.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

if (mutedVideos.length) {
  const enforceMute = (video) => {
    video.defaultMuted = true;
    video.muted = true;
    video.volume = 0;
  };

  mutedVideos.forEach((video) => {
    enforceMute(video);
    ["play", "volumechange", "loadedmetadata"].forEach((eventName) => {
      video.addEventListener(eventName, () => enforceMute(video));
    });
  });
}
