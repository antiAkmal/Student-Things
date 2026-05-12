function playSound() {
    const audio = new Audio("./assets/smash.mp3");
    audio.play();
}

$(window).on("mousemove", function (e) {
    // have the hammer follow the cursor
    // use "e.originalEvent.offsetX" and "e.originalEvent.offsetY" for mouse position
    // using this alone will put the element on the bottom right so u might need to + 100 or - 100
    const hammer = $(".hammer");
    hammer.css({
        left: e.clientX - 75 + "px",
        top: e.clientY - 75 + "px"
    });
});

$(window).on("click", function (e) {
    // rotate the hammer and hit the mole
    // using setTimeout, rotate it back 100ms later
    const hammer = $(".hammer");
    hammer.css("transform", "rotate(-45deg)");
    setTimeout(function() {
        hammer.css("transform", "rotate(0deg)");
    }, 150);
});

$(".hole").on("click", function (e) {
    const mole = $(this).find(".mole");
    const moleHit = $(this).find(".mole-hit");

    // Do nothing if no mole or already hit
    if (mole.hasClass("hidden") || moleHit.hasClass("hidden") === false) {
        return;
    }

    // play the hit sound
    playSound();

    // hide the mole, show the hit mole
    mole.addClass("hidden");
    moleHit.removeClass("hidden");

    // 500ms later hide the hit mole
    setTimeout(function() {
        moleHit.addClass("hidden");
        mole.removeClass("hidden");
    }, 500);
});

// add a function that every second randomly shows a mole from the list of moles
let moleTimeout;

function showRandomMole() {
    const holes = $(".hole");
    const randomHole = holes.eq(Math.floor(Math.random() * holes.length));
    const mole = randomHole.find(".mole");
    
    // Hide all moles first
    $(".mole").addClass("hidden");
    $(".mole-hit").addClass("hidden");
    
    // Show random mole
    mole.removeClass("hidden");
    
    // Mole stays visible for random duration (800ms to 1500ms)
    const visibleDuration = Math.random() * 700 + 800;
    
    // Hide mole after duration if not clicked
    moleTimeout = setTimeout(function() {
        mole.addClass("hidden");
        // Show next mole after short delay
        setTimeout(showRandomMole, 300);
    }, visibleDuration);
}

// Start the game
showRandomMole();
