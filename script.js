document.addEventListener("DOMContentLoaded", function () {
    const heart = document.getElementById("heart");
    const flap = document.querySelector(".flap");
    const note = document.getElementById("note");
    const body = document.querySelector(".body");
    const clickNote = document.getElementById("click-note");
    const envelope = document.getElementById("envelope");

    let isOpened = false; // Track if the envelope is opened

    // Create the second click-note and position it next to the note
    const clickNote2 = document.createElement("p");
    clickNote2.textContent = "<-- Click here to read the note.";
    clickNote2.classList.add("click-note");
    clickNote2.style.position = "absolute";
    clickNote2.style.left = "calc(50% + 120px)"; // Position beside the note
    clickNote2.style.top = "calc(31% - 40px)";
    clickNote2.style.opacity = "0"; // Initially hidden
    clickNote2.style.visibility = "hidden"; 
    clickNote2.style.transition = "opacity 0.8s ease"; // Smooth fade in & out
    document.body.appendChild(clickNote2); // Append to body

    heart.addEventListener("click", function () {
        if (isOpened) return;
        isOpened = true;

        // Fade out the first click-note
        clickNote.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        clickNote.style.opacity = "0";
        clickNote.style.transform = "translateY(-10px)";

        setTimeout(() => {
            clickNote.style.visibility = "hidden";
        }, 500);

        // Fade out the heart smoothly
        heart.style.transition = "opacity 0.5s ease";
        heart.style.opacity = "0";

        // Slide the envelope down
        envelope.style.transition = "transform 0.8s ease-out";
        envelope.style.transform = "translateY(10px)";

        // Open the envelope flap
        setTimeout(() => {
            flap.classList.add("open");
            setTimeout(() => {
                flap.style.zIndex = "1";
                note.style.zIndex = "2";
                body.style.zIndex = "3";
                note.style.opacity = "1";
                note.style.transform = "translate(-50%, -20px)";
                
                // Show clickNote2 beside the note with a fade-in effect
                clickNote2.style.visibility = "visible";
                clickNote2.style.opacity = "1";
            }, 600);
        }, 500);
    });

    note.addEventListener("click", function () {
        if (!isOpened) return;

        // Change background color smoothly
        document.body.style.transition = "background-color 1s ease";
        document.body.style.backgroundColor = "rgb(233, 186, 186)";

        // Slide the note up
        note.style.transition = "transform 1s ease-out";
        note.style.transform = "translate(-50%, -120px)";

        // Fade out the flap and body smoothly
        setTimeout(() => {
            flap.style.transition = "opacity 0.8s ease"; 
            body.style.transition = "opacity 0.8s ease"; 
            flap.style.opacity = "0"; 
            body.style.opacity = "0"; 
        }, 300); 

        // Fade out clickNote2
        clickNote2.style.opacity = "0"; // Fade out
        setTimeout(() => {
            clickNote2.style.visibility = "hidden"; // Fully hide after fade-out
        }, 800);

        // Animate note back down
        setTimeout(() => {
            note.style.transform = "translate(-50%, 30px)";
        }, 1500);
    });
});