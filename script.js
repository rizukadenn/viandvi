/* =========================================
   SAFE START
========================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =======================================
     ELEMENTS
  ======================================= */

  const loader =
    document.getElementById("loader");

  const envelope =
    document.getElementById("envelope");

  const envelopeScreen =
    document.getElementById("envelopeScreen");

  const music =
    document.getElementById("weddingMusic");

  const musicButton =
    document.getElementById("musicButton");

  const startButton =
    document.getElementById("startButton");

  const celebrateButton =
    document.getElementById("celebrateButton");

  const messageButton =
    document.getElementById("messageButton");

  const popup =
    document.getElementById("popup");

  const closePopup =
    document.getElementById("closePopup");


  /* =======================================
     LOADING
     IMPORTANT:
     Loader will ALWAYS disappear.
  ======================================= */

  setTimeout(function () {

    if (loader) {
      loader.classList.add("hide");
    }

  }, 1000);


  /* Backup loader removal */

  window.addEventListener("load", function () {

    if (loader) {

      setTimeout(function () {

        loader.classList.add("hide");

      }, 300);

    }

  });


  /* =======================================
     FRIEND NAME
  ======================================= */

  const params =
    new URLSearchParams(
      window.location.search
    );

  let name =
    params.get("name");

  if (!name) {
    name = "BESTIE";
  }

  name =
    decodeURIComponent(name)
      .replace(/\+/g, " ")
      .trim()
      .toUpperCase();


  const friendName =
    document.getElementById("friendName");

  const letterName =
    document.getElementById("letterName");


  if (friendName) {
    friendName.textContent = name;
  }

  if (letterName) {
    letterName.textContent = name;
  }


  /* =======================================
     ENVELOPE
  ======================================= */

  let envelopeOpened = false;
  let musicPlaying = false;


  if (envelope) {

    envelope.addEventListener(
      "click",
      function () {

        if (envelopeOpened) {
          return;
        }

        envelopeOpened = true;

        envelope.classList.add("open");


        /* MUSIC */

        if (music) {

          music.volume = 0.35;

          const playPromise =
            music.play();

          if (
            playPromise !== undefined
          ) {

            playPromise
              .then(function () {

                musicPlaying = true;

                updateMusicButton();

              })
              .catch(function () {

                musicPlaying = false;

                updateMusicButton();

              });

          }

        }


        /* HIDE ENVELOPE */

        setTimeout(function () {

          if (envelopeScreen) {

            envelopeScreen.classList.add(
              "hide"
            );

          }

          document.body.classList.remove(
            "locked"
          );

        }, 1400);

      }
    );

  }


  /* =======================================
     MUSIC BUTTON
  ======================================= */

  function updateMusicButton() {

    if (!musicButton) {
      return;
    }

    musicButton.textContent =
      musicPlaying
        ? "♫"
        : "🔇";

  }


  if (musicButton) {

    musicButton.addEventListener(
      "click",
      function () {

        if (!music) {
          return;
        }


        if (musicPlaying) {

          music.pause();

          musicPlaying = false;

        } else {

          music.play()
            .then(function () {

              musicPlaying = true;

            })
            .catch(function () {

              musicPlaying = false;

            });

        }

        updateMusicButton();

      }
    );

  }


  updateMusicButton();


  /* =======================================
     OPEN INVITATION
  ======================================= */

  if (startButton) {

    startButton.addEventListener(
      "click",
      function () {

        const hero =
          document.querySelector(".hero");

        if (hero) {

          hero.scrollIntoView({
            behavior: "smooth"
          });

        }

      }
    );

  }


  /* =======================================
     SCROLL REVEAL
  ======================================= */

  const revealElements =
    document.querySelectorAll(".reveal");


  function revealOnScroll() {

    revealElements.forEach(
      function (element) {

        const position =
          element.getBoundingClientRect().top;

        if (
          position <
          window.innerHeight - 70
        ) {

          element.classList.add(
            "visible"
          );

        }

      }
    );

  }


  window.addEventListener(
    "scroll",
    revealOnScroll
  );

  revealOnScroll();


  /* =======================================
     COUNTDOWN
  ======================================= */

  let days = 31;
  let hours = 8;
  let minutes = 31;
  let seconds = 31;


  const daysElement =
    document.getElementById("days");

  const hoursElement =
    document.getElementById("hours");

  const minutesElement =
    document.getElementById("minutes");

  const secondsElement =
    document.getElementById("seconds");


  function updateCountdown() {

    seconds--;


    if (seconds < 0) {

      seconds = 59;

      minutes--;

    }


    if (minutes < 0) {

      minutes = 59;

      hours--;

    }


    if (hours < 0) {

      hours = 23;

      days--;

    }


    if (days < 0) {

      days = 31;

      hours = 8;

      minutes = 31;

      seconds = 31;

    }


    if (daysElement) {

      daysElement.textContent =
        String(days).padStart(2, "0");

    }

    if (hoursElement) {

      hoursElement.textContent =
        String(hours).padStart(2, "0");

    }

    if (minutesElement) {

      minutesElement.textContent =
        String(minutes).padStart(2, "0");

    }

    if (secondsElement) {

      secondsElement.textContent =
        String(seconds).padStart(2, "0");

    }

  }


  setInterval(
    updateCountdown,
    1000
  );


  /* =======================================
     CONFETTI
  ======================================= */

  let confettiCreated = false;


  function createConfetti() {

    if (confettiCreated) {
      return;
    }

    confettiCreated = true;


    const birthday =
      document.getElementById("birthday");


    if (!birthday) {
      return;
    }


    const symbols = [
      "✦",
      "✧",
      "♡",
      "❀",
      "✿",
      "★",
      "•"
    ];


    for (
      let i = 0;
      i < 160;
      i++
    ) {

      const piece =
        document.createElement("span");


      piece.className =
        "confetti-piece";


      piece.textContent =
        symbols[
          Math.floor(
            Math.random() *
            symbols.length
          )
        ];


      piece.style.left =
        Math.random() * 100 + "%";


      piece.style.fontSize =
        (
          8 +
          Math.random() * 16
        ) + "px";


      piece.style.animationDuration =
        (
          3 +
          Math.random() * 5
        ) + "s";


      piece.style.animationDelay =
        (
          Math.random() * 2
        ) + "s";


      birthday.appendChild(piece);

    }

  }


  /* =======================================
     BIRTHDAY OBSERVER
  ======================================= */

  const birthday =
    document.getElementById("birthday");


  if (birthday) {

    const observer =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(
            function (entry) {

              if (
                entry.isIntersecting
              ) {

                createConfetti();

              }

            }
          );

        },
        {
          threshold: 0.25
        }
      );


    observer.observe(birthday);

  }


  /* =======================================
     CELEBRATE BUTTON
  ======================================= */

  if (celebrateButton) {

    celebrateButton.addEventListener(
      "click",
      function () {

        createConfetti();

        if (popup) {

          popup.classList.add("show");

        }

      }
    );

  }


  /* =======================================
     MESSAGE BUTTON
  ======================================= */

  if (messageButton) {

    messageButton.addEventListener(
      "click",
      function () {

        if (popup) {

          popup.classList.add("show");

        }

      }
    );

  }


  /* =======================================
     CLOSE POPUP
  ======================================= */

  if (closePopup) {

    closePopup.addEventListener(
      "click",
      function () {

        if (popup) {

          popup.classList.remove("show");

        }

      }
    );

  }


  /* =======================================
     CLICK OUTSIDE POPUP
  ======================================= */

  if (popup) {

    popup.addEventListener(
      "click",
      function (event) {

        if (
          event.target === popup
        ) {

          popup.classList.remove(
            "show"
          );

        }

      }
    );

  }


  /* =======================================
     ESC KEY
  ======================================= */

  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape"
      ) {

        if (popup) {

          popup.classList.remove(
            "show"
          );

        }

      }

    }
  );


  /* =======================================
     DEBUG
  ======================================= */

  console.log(
    "💍 Wedding prank loaded successfully."
  );

  console.log(
    "🎂 Target:",
    name
  );

});
