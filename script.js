document.addEventListener("DOMContentLoaded", () => {

    /* ==================================================
       ELEMENTS
    =================================================== */

    const loader =
        document.getElementById("loader");

    const envelopeScreen =
        document.getElementById("envelopeScreen");

    const envelope =
        document.getElementById("envelope");

    const music =
        document.getElementById("weddingMusic");

    const musicButton =
        document.getElementById("musicButton");

    const invitation =
        document.getElementById("invitation");

    const rsvpButton =
        document.getElementById("rsvpButton");

    const birthday =
        document.getElementById("birthday");

    const confetti =
        document.getElementById("confetti");

    const celebrateButton =
        document.getElementById("celebrateButton");

    const lastMessage =
        document.getElementById("lastMessage");

    const popup =
        document.getElementById("popup");

    const closePopup =
        document.getElementById("closePopup");


    /* ==================================================
       LOADER
       
       IMPORTANT:
       Loader does NOT wait for:
       - images
       - music
       - fonts
       
       This prevents the previous loading problem.
    =================================================== */

    const hideLoader = () => {

        if (!loader) {
            return;
        }

        loader.classList.add(
            "is-hidden"
        );

    };


    setTimeout(
        hideLoader,
        1200
    );


    window.addEventListener(
        "load",
        hideLoader
    );


    /* ==================================================
       LOCK PAGE UNTIL ENVELOPE IS OPENED
    =================================================== */

    document.body.classList.add(
        "page-locked"
    );


    /* ==================================================
       NAME FROM URL
       
       Example:
       
       ?name=Amanda
       
       Result:
       
       HAPPY 31ST BIRTHDAY,
       AMANDA
    =================================================== */

    const urlParams =
        new URLSearchParams(
            window.location.search
        );

    let friendName =
        urlParams.get("name");


    if (!friendName) {

        friendName =
            "BESTIE";

    }


    try {

        friendName =
            decodeURIComponent(
                friendName
            );

    } catch (error) {

        friendName =
            "BESTIE";

    }


    friendName =
        friendName
            .replace(/\+/g, " ")
            .trim()
            .toUpperCase();


    if (!friendName) {

        friendName =
            "BESTIE";

    }


    const friendNameElement =
        document.getElementById(
            "friendName"
        );

    const letterNameElement =
        document.getElementById(
            "letterName"
        );


    if (friendNameElement) {

        friendNameElement.textContent =
            friendName;

    }


    if (letterNameElement) {

        letterNameElement.textContent =
            friendName;

    }


    /* ==================================================
       ENVELOPE
    =================================================== */

    let envelopeOpened = false;


    const openEnvelope = () => {

        if (envelopeOpened) {
            return;
        }

        envelopeOpened = true;


        envelope.classList.add(
            "open"
        );


        /* ----------------------------------------------
           START MUSIC
           
           Browser may block autoplay,
           but this is a user click,
           so it normally works.
        ---------------------------------------------- */

        startMusic();


        /* ----------------------------------------------
           OPEN INVITATION
        ---------------------------------------------- */

        setTimeout(() => {

            envelopeScreen.classList.add(
                "is-hidden"
            );

            document.body.classList.remove(
                "page-locked"
            );

            window.scrollTo({
                top: 0,
                behavior: "instant"
            });

        }, 1350);

    };


    if (envelope) {

        envelope.addEventListener(
            "click",
            openEnvelope
        );


        envelope.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    openEnvelope();

                }

            }
        );

    }


    /* ==================================================
       MUSIC
    =================================================== */

    let musicPlaying = false;


    const updateMusicButton = () => {

        if (!musicButton) {
            return;
        }


        if (musicPlaying) {

            musicButton.classList.remove(
                "is-muted"
            );

        } else {

            musicButton.classList.add(
                "is-muted"
            );

        }

    };


    const startMusic = () => {

        if (!music) {
            return;
        }


        music.volume = 0.28;


        const promise =
            music.play();


        if (
            promise &&
            typeof promise.then === "function"
        ) {

            promise
                .then(() => {

                    musicPlaying = true;

                    updateMusicButton();

                })
                .catch(() => {

                    musicPlaying = false;

                    updateMusicButton();

                });

        }

    };


    const toggleMusic = () => {

        if (!music) {
            return;
        }


        if (music.paused) {

            music.play()
                .then(() => {

                    musicPlaying = true;

                    updateMusicButton();

                })
                .catch(() => {

                    musicPlaying = false;

                    updateMusicButton();

                });

        } else {

            music.pause();

            musicPlaying = false;

            updateMusicButton();

        }

    };


    if (musicButton) {

        musicButton.addEventListener(
            "click",
            toggleMusic
        );

    }


    /* ==================================================
       SCROLL REVEAL
    =================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        (element) => {

            revealObserver.observe(
                element
            );

        }
    );


    /* ==================================================
       COUNTDOWN
       
       Wedding date:
       12 September 2026
    =================================================== */

    const weddingDate =
        new Date(
            "September 12, 2026 16:00:00"
        ).getTime();


    const daysElement =
        document.getElementById("days");

    const hoursElement =
        document.getElementById("hours");

    const minutesElement =
        document.getElementById("minutes");

    const secondsElement =
        document.getElementById("seconds");


    const pad =
        (number) =>
            String(number).padStart(
                2,
                "0"
            );


    const updateCountdown = () => {

        const now =
            Date.now();

        const difference =
            weddingDate - now;


        if (
            difference <= 0
        ) {

            if (daysElement) {
                daysElement.textContent =
                    "00";
            }

            if (hoursElement) {
                hoursElement.textContent =
                    "00";
            }

            if (minutesElement) {
                minutesElement.textContent =
                    "00";
            }

            if (secondsElement) {
                secondsElement.textContent =
                    "00";
            }

            return;

        }


        const days =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            );


        const hours =
            Math.floor(
                (
                    difference /
                    (1000 * 60 * 60)
                ) % 24
            );


        const minutes =
            Math.floor(
                (
                    difference /
                    (1000 * 60)
                ) % 60
            );


        const seconds =
            Math.floor(
                (
                    difference /
                    1000
                ) % 60
            );


        if (daysElement) {

            daysElement.textContent =
                pad(days);

        }


        if (hoursElement) {

            hoursElement.textContent =
                pad(hours);

        }


        if (minutesElement) {

            minutesElement.textContent =
                pad(minutes);

        }


        if (secondsElement) {

            secondsElement.textContent =
                pad(seconds);

        }

    };


    updateCountdown();


    setInterval(
        updateCountdown,
        1000
    );


    /* ==================================================
       RSVP
    =================================================== */

    if (rsvpButton) {

        rsvpButton.addEventListener(
            "click",
            () => {

                showPopup(
                    "RSVP RECEIVED",
                    "Thank you for confirming your attendance. We can't wait to celebrate with you. ♡"
                );

            }
        );

    }


    /* ==================================================
       CONFETTI
    =================================================== */

    let confettiCreated = false;


    const confettiSymbols = [
        "✦",
        "✧",
        "♡",
        "❀",
        "✿",
        "★",
        "•"
    ];


    const createConfetti = () => {

        if (
            confettiCreated ||
            !confetti
        ) {

            return;

        }


        confettiCreated = true;


        const total =
            window.innerWidth < 600
                ? 85
                : 150;


        for (
            let i = 0;
            i < total;
            i++
        ) {

            const piece =
                document.createElement(
                    "span"
                );


            piece.className =
                "confetti-piece";


            piece.textContent =
                confettiSymbols[
                    Math.floor(
                        Math.random() *
                        confettiSymbols.length
                    )
                ];


            piece.style.left =
                (
                    Math.random() *
                    100
                ) + "%";


            piece.style.fontSize =
                (
                    8 +
                    Math.random() * 17
                ) + "px";


            piece.style.opacity =
                (
                    .45 +
                    Math.random() * .55
                );


            piece.style.setProperty(
                "--drift",
                (
                    -100 +
                    Math.random() * 200
                ) + "px"
            );


            piece.style.animationDuration =
                (
                    3 +
                    Math.random() * 4
                ) + "s";


            piece.style.animationDelay =
                (
                    Math.random() * 1.8
                ) + "s";


            confetti.appendChild(
                piece
            );

        }

    };


    /* ==================================================
       BIRTHDAY OBSERVER
    =================================================== */

    if (birthday) {

        const birthdayObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                createConfetti();

                                birthdayObserver.unobserve(
                                    birthday
                                );

                            }

                        }
                    );

                },
                {
                    threshold: .25
                }
            );


        birthdayObserver.observe(
            birthday
        );

    }


    /* ==================================================
       POPUP
    =================================================== */

    const showPopup = (
        title,
        message
    ) => {

        if (!popup) {
            return;
        }


        const popupTitle =
            popup.querySelector(
                "h2"
            );

        const popupParagraphs =
            popup.querySelectorAll(
                "p:not(.eyebrow)"
            );


        if (popupTitle && title) {

            popupTitle.textContent =
                title;

        }


        if (
            message &&
            popupParagraphs.length > 0
        ) {

            popupParagraphs[0].textContent =
                message;

        }


        popup.classList.add(
            "show"
        );


        popup.setAttribute(
            "aria-hidden",
            "false"
        );

    };


    const hidePopup = () => {

        if (!popup) {
            return;
        }


        popup.classList.remove(
            "show"
        );


        popup.setAttribute(
            "aria-hidden",
            "true"
        );

    };


    if (celebrateButton) {

        celebrateButton.addEventListener(
            "click",
            () => {

                createConfetti();

                showPopup(
                    "Gotcha.",
                    "Kalau kamu sampai sini, berarti prank-nya berhasil. 😭"
                );

            }
        );

    }


    if (lastMessage) {

        lastMessage.addEventListener(
            "click",
            () => {

                showPopup(
                    "Gotcha.",
                    "Kamu benar-benar membaca semuanya sampai akhir. 😂"
                );

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
            (event) => {

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
        (event) => {

            if (
                event.key === "Escape"
            ) {

                hidePopup();

            }

        }
    );


    /* ==================================================
       PREVENT BROKEN IMAGE VISUALS
       
       If an image doesn't exist,
       placeholder remains visible.
    =================================================== */

    const galleryImages =
        document.querySelectorAll(
            ".gallery-item img"
        );


    galleryImages.forEach(
        (image) => {

            image.addEventListener(
                "error",
                () => {

                    image.classList.add(
                        "image-missing"
                    );

                }
            );

        }
    );


    /* ==================================================
       CONSOLE CHECK
    =================================================== */

    console.log(
        "Luxury Wedding Prank 2.0 loaded."
    );

    console.log(
        "Birthday target:",
        friendName
    );

});
