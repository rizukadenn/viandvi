/* =========================================================
   REALISTIC PINK WEDDING PRANK
   Luxury Wedding Prank 2.0
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const envelopeScreen =
        document.getElementById("envelopeScreen");

    const envelope =
        document.getElementById("envelope");

    const openButton =
        document.getElementById("openButton");

    const mainContent =
        document.getElementById("mainContent");

    const music =
        document.getElementById("weddingMusic");

    const musicButton =
        document.getElementById("musicButton");

    const birthdayReveal =
        document.getElementById("birthdayReveal");

    const birthdayButton =
        document.getElementById("birthdayButton");

    const birthdayPopup =
        document.getElementById("birthdayPopup");

    const closePopup =
        document.getElementById("closePopup");

    const popupCelebrate =
        document.getElementById("popupCelebrate");

    const confettiContainer =
        document.getElementById("confettiContainer");


    /* =====================================================
       NAME FROM URL

       Example:
       ?name=Andi

       https://username.github.io/prank/?name=Andi
    ===================================================== */

    const params = new URLSearchParams(
        window.location.search
    );

    let friendName =
        params.get("name") || "BESTIE";

    friendName =
        decodeURIComponent(friendName)
        .replace(/[<>]/g, "")
        .trim();

    if (!friendName) {
        friendName = "BESTIE";
    }

    document
        .querySelectorAll("#friendName, #popupName, .name-placeholder")
        .forEach(element => {

            element.textContent =
                friendName;
        });


    /* =====================================================
       OPEN ENVELOPE
    ===================================================== */

    let envelopeOpened = false;

    function openInvitation() {

        if (envelopeOpened) return;

        envelopeOpened = true;

        envelope.classList.add("open");

        /* Start music after user interaction */
        startMusic();

        /* Wait for envelope animation */
        setTimeout(() => {

            envelopeScreen.classList.add("opened");

            document.body.style.overflow = "auto";

            mainContent.classList.remove("hidden");

            window.scrollTo({
                top: 0,
                behavior: "instant"
            });

        }, 1200);
    }


    envelope.addEventListener(
        "click",
        openInvitation
    );

    openButton.addEventListener(
        "click",
        openInvitation
    );


    envelope.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {
                event.preventDefault();
                openInvitation();
            }

        }
    );


    /* =====================================================
       MUSIC
    ===================================================== */

    let musicPlaying = false;

    function startMusic() {

        if (!music) return;

        music.volume = 0.45;

        const playPromise =
            music.play();

        if (
            playPromise &&
            typeof playPromise.catch === "function"
        ) {
            playPromise.catch(() => {
                /* Browser blocked autoplay.
                   User can press music button. */
            });
        }

        musicPlaying = true;

        musicButton.classList.add(
            "playing"
        );
    }


    function toggleMusic() {

        if (!music) return;

        if (music.paused) {

            music.volume = 0.45;

            music.play()
                .then(() => {

                    musicPlaying = true;

                    musicButton.classList.add(
                        "playing"
                    );

                })
                .catch(() => {});

        } else {

            music.pause();

            musicPlaying = false;

            musicButton.classList.remove(
                "playing"
            );
        }
    }


    musicButton.addEventListener(
        "click",
        toggleMusic
    );


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================================
       COUNTDOWN
    ===================================================== */

    const weddingDate =
        new Date("August 31, 2026 18:30:00").getTime();


    function updateCountdown() {

        const now =
            new Date().getTime();

        const distance =
            weddingDate - now;

        const days =
            Math.max(
                0,
                Math.floor(
                    distance /
                    (1000 * 60 * 60 * 24)
                )
            );

        const hours =
            Math.max(
                0,
                Math.floor(
                    (distance %
                        (1000 * 60 * 60 * 24)) /
                    (1000 * 60 * 60)
                )
            );

        const minutes =
            Math.max(
                0,
                Math.floor(
                    (distance %
                        (1000 * 60 * 60)) /
                    (1000 * 60)
                )
            );

        const seconds =
            Math.max(
                0,
                Math.floor(
                    (distance %
                        (1000 * 60)) /
                    1000
                )
            );


        setText(
            "days",
            String(days).padStart(2, "0")
        );

        setText(
            "hours",
            String(hours).padStart(2, "0")
        );

        setText(
            "minutes",
            String(minutes).padStart(2, "0")
        );

        setText(
            "seconds",
            String(seconds).padStart(2, "0")
        );

    }


    function setText(id, value) {

        const element =
            document.getElementById(id);

        if (element) {
            element.textContent = value;
        }

    }


    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );


    /* =====================================================
       RSVP BUTTON
    ===================================================== */

    const rsvpButton =
        document.getElementById("rsvpButton");


    if (rsvpButton) {

        rsvpButton.addEventListener(
            "click",
            () => {

                rsvpButton.textContent =
                    "THANK YOU ♡";

                rsvpButton.style.pointerEvents =
                    "none";

            }
        );

    }


    /* =====================================================
       BIRTHDAY REVEAL OBSERVER
    ===================================================== */

    let birthdayTriggered = false;

    const birthdayObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting &&
                        !birthdayTriggered
                    ) {

                        birthdayTriggered = true;

                        triggerBirthdayReveal();

                    }

                });

            },
            {
                threshold: 0.45
            }
        );


    if (birthdayReveal) {

        birthdayObserver.observe(
            birthdayReveal
        );

    }


    /* =====================================================
       BIRTHDAY REVEAL
    ===================================================== */

    function triggerBirthdayReveal() {

        /* Pause wedding music */
        if (music && !music.paused) {

            music.volume = 0.18;

        }

        /* Confetti */
        setTimeout(
            createConfetti,
            300
        );

        /* More confetti */
        setTimeout(
            createConfetti,
            1800
        );

    }


    /* =====================================================
       CONFETTI
    ===================================================== */

    function createConfetti() {

        if (!confettiContainer) return;

        const pieces = 90;

        for (
            let i = 0;
            i < pieces;
            i++
        ) {

            const piece =
                document.createElement("span");

            piece.className =
                "confetti";


            const shapes = [
                "4px",
                "7px",
                "10px"
            ];

            const size =
                shapes[
                    Math.floor(
                        Math.random() *
                        shapes.length
                    )
                ];


            piece.style.width =
                size;

            piece.style.height =
                `${Math.floor(
                    Math.random() * 12 + 8
                )}px`;


            piece.style.left =
                `${Math.random() * 100}%`;


            piece.style.setProperty(
                "--x",
                `${(Math.random() - 0.5) * 300}px`
            );


            piece.style.animationDuration =
                `${Math.random() * 2 + 3}s`;


            piece.style.animationDelay =
                `${Math.random() * 1.2}s`;


            /*
             * No fixed colors in CSS.
             * We randomize a soft palette here.
             */
            const colors = [
                "#d99da5",
                "#b97882",
                "#e8c9a8",
                "#f5dede",
                "#9f6971",
                "#fff5e9"
            ];

            piece.style.background =
                colors[
                    Math.floor(
                        Math.random() *
                        colors.length
                    )
                ];


            piece.style.borderRadius =
                Math.random() > .5
                    ? "50%"
                    : "2px";


            confettiContainer.appendChild(
                piece
            );


            setTimeout(
                () => piece.remove(),
                5500
            );

        }

    }


    /* =====================================================
       BIRTHDAY POPUP
    ===================================================== */

    if (birthdayButton) {

        birthdayButton.addEventListener(
            "click",
            () => {

                birthdayPopup.classList.add(
                    "show"
                );

                createConfetti();

            }
        );

    }


    if (closePopup) {

        closePopup.addEventListener(
            "click",
            () => {

                birthdayPopup.classList.remove(
                    "show"
                );

            }
        );

    }


    if (popupCelebrate) {

        popupCelebrate.addEventListener(
            "click",
            () => {

                birthdayPopup.classList.remove(
                    "show"
                );

                createConfetti();

                window.scrollTo({
                    top:
                        document.body.scrollHeight,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       CLOSE POPUP WHEN CLICKING OUTSIDE
    ===================================================== */

    if (birthdayPopup) {

        birthdayPopup.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    birthdayPopup
                ) {

                    birthdayPopup.classList.remove(
                        "show"
                    );

                }

            }
        );

    }


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                birthdayPopup
            ) {

                birthdayPopup.classList.remove(
                    "show"
                );

            }

        }
    );


    /* =====================================================
       INITIAL BODY STATE
    ===================================================== */

    document.body.style.overflow =
        "hidden";


    /*
     * Safety fallback:
     * If anything goes wrong, the user can still
     * open the invitation after a short time.
     */

    setTimeout(() => {

        if (
            envelopeScreen &&
            !envelopeOpened
        ) {

            openButton.textContent =
                "OPEN INVITATION";

        }

    }, 1500);


});
