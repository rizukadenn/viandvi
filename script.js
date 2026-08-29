document.addEventListener("DOMContentLoaded", function () {

  /* =====================================================
     ELEMENTS
  ====================================================== */

  const loader =
    document.getElementById("loader");

  const opening =
    document.getElementById("opening");

  const envelope =
    document.getElementById("envelope");

  const music =
    document.getElementById("weddingMusic");

  const musicToggle =
    document.getElementById("musicToggle");

  const rsvpButton =
    document.getElementById("rsvpButton");

  const celebrateButton =
    document.getElementById("celebrateButton");

  const lastMessage =
    document.getElementById("lastMessage");

  const popup =
    document.getElementById("popup");

  const closePopup =
    document.getElementById("closePopup");


  /* =====================================================
     LOADING
     NEVER DEPENDS ON MUSIC / IMAGES
  ====================================================== */

  setTimeout(function () {

    if (loader) {
      loader.classList.add("hide");
    }

  }, 1200);


  window.addEventListener("load", function () {

    if (loader) {
      loader.classList.add("hide");
    }

  });


  /* =====================================================
     NAME FROM URL
     
     Example:
     ?name=Amanda
  ====================================================== */

  const params =
    new URLSearchParams(
      window.location.search
    );

  let friend =
    params.get("name");

  if (!friend) {
    friend = "BESTIE";
  }

  friend =
    decodeURIComponent(friend)
      .replace(/\+/g, " ")
      .trim()
      .toUpperCase();


  const friendName =
    document.getElementById("friendName");

  const letterName =
    document.getElementById("letterName");


  if (friendName) {
    friendName.textContent = friend;
  }

  if (letterName) {
    letterName.textContent = friend;
  }


  /* =====================================================
     ENVELOPE
  ====================================================== */

  let opened = false;

  let musicPlaying = false;


  if (envelope) {

    envelope.addEventListener(
      "click",
      function () {

        if (opened) {
          return;
        }

        opened = true;

        envelope.classList.add("open");


        /* ---------------------------------------------
           MUSIC
        --------------------------------------------- */

        if (music) {

          music.volume = 0.28;

          const play =
            music.play();

          if (
            play !== undefined
          ) {

            play
              .then(function () {

                musicPlaying = true;

                updateMusic();

              })
              .catch(function () {

                musicPlaying = false;

                updateMusic();

              });

          }

        }


        /* ---------------------------------------------
           CLOSE ENVELOPE
        --------------------------------------------- */

        setTimeout(function () {

          if (opening) {
            opening.classList.add("hide");
          }

          document.body.classList.remove(
            "locked"
          );

        }, 1500);

      }
    );

  }


  /* =====================================================
     MUSIC
  ====================================================== */

  function updateMusic() {

    if (!musicToggle) {
      return;
    }

    if (musicPlaying) {
      musicToggle.classList.remove("paused");
    } else {
      musicToggle.classList.add("paused");
    }

  }


  if (musicToggle) {

    musicToggle.addEventListener(
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

        updateMusic();

      }
    );

  }


  updateMusic();


  /* =====================================================
     SCROLL REVEAL
  ====================================================== */

  const revealItems =
    document.querySelectorAll(".reveal");


  function reveal() {

    revealItems.forEach(
      function (item) {

        const top =
          item.getBoundingClientRect().top;

        if (
          top <
          window.innerHeight - 70
        ) {

          item.classList.add(
            "visible"
          );

        }

      }
    );

  }


  window.addEventListener(
    "scroll",
    reveal
  );

  reveal();


  /* =====================================================
     COUNTDOWN
  ====================================================== */

  let days = 31;
  let hours = 8;
  let minutes = 31;
  let seconds = 31;


  const dayElement =
    document.getElementById("days");

  const hourElement =
    document.getElementById("hours");

  const minuteElement =
    document.getElementById("minutes");

  const secondElement =
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


    if (dayElement) {

      dayElement.textContent =
        String(days)
          .padStart(2, "0");

    }

    if (hourElement) {

      hourElement.textContent =
        String(hours)
          .padStart(2, "0");

    }

    if (minuteElement) {

      minuteElement.textContent =
        String(minutes)
          .padStart(2, "0");

    }

    if (secondElement) {

      secondElement.textContent =
        String(seconds)
          .padStart(2, "0");

    }

  }


  setInterval(
    updateCountdown,
    1000
  );


  /* =====================================================
     RSVP FAKE INTERACTION
  ====================================================== */

  if (rsvpButton) {

    rsvpButton.addEventListener(
      "click",
      function () {

        alert(
          "RSVP received. We can't wait to see you! ♡"
        );

      }
    );

  }


  /* =====================================================
     CONFETTI
  ====================================================== */

  let confettiStarted = false;


  function createConfetti() {

    if (confettiStarted) {
      return;
    }

    confettiStarted = true;


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
      i < 150;
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
          Math.random() * 17
        ) + "px";


      piece.style.animationDuration =
        (
          3 +
          Math.random() * 4
        ) + "s";


      piece.style.animationDelay =
        (
          Math.random() * 2
        ) + "s";


      birthday.appendChild(piece);

    }

  }


  /* =====================================================
     WATCH BIRTHDAY SECTION
  ====================================================== */

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


  /* =====================================================
     POPUP
  ====================================================== */

  function showPopup() {

    if (popup) {
      popup.classList.add("show");
    }

  }


  function hidePopup() {

    if (popup) {
      popup.classList.remove("show");
    }

  }


  if (celebrateButton) {

    celebrateButton.addEventListener(
      "click",
      function () {

        createConfetti();

        showPopup();

      }
    );

  }


  if (lastMessage) {

    lastMessage.addEventListener(
      "click",
      function () {

        showPopup();

      }
    );

  }


  if (closePopup) {

    closePopup.addEventListener(
      "click",
      hidePopup
    );

  }


  if (popup) {

    popup.addEventListener(
      "click",
      function (event) {

        if (
          event.target === popup
        ) {

          hidePopup();

        }

      }
    );

  }


  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape"
      ) {

        hidePopup();

      }

    }
  );


  /* =====================================================
     DEBUG
  ====================================================== */

  console.log(
    "Luxury Wedding Prank loaded."
  );

  console.log(
    "Birthday target:",
    friend
  );

});
