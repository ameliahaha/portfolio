function showTime(e) {
  e.setAttribute("done", "true");
  e.querySelector(".timeline-point").style.background = "#ffe4c2";
  e.querySelector(".date").style.opacity = "100%";
  e.querySelector("p").style.opacity = "100%";
  e.querySelector("p").style.transform = "translateY(0px)";
}

function hideTime(e) {
  e.removeAttribute("done");
  e.querySelector(".timeline-point").style.background = "rgb(228, 228, 228)";
  e.querySelector(".date").style.opacity = "0%";
  e.querySelector("p").style.opacity = "0%";
  e.querySelector("p").style.transform = "translateY(-10px)";
}

function slowLoop(events, lineElem, isHorizontal, onComplete) {
  let index = 0;

  // Reset and flush layout
  lineElem.style.transition = "none";
  lineElem.style.width = isHorizontal ? "0%" : "4px";
  lineElem.style.height = isHorizontal ? "4px" : "0%";

  // Use two animation frames to trigger proper transition
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      lineElem.style.transition = isHorizontal ? "width 1s linear" : "height 1s linear";

      function loop() {
        setTimeout(() => {
          showTime(events[index]);
          const progress = `${((index + 1) / events.length) * 100}%`;
          if (isHorizontal) {
            lineElem.style.width = progress;
          } else {
            lineElem.style.height = progress;
          }

          index++;
          if (index < events.length) {
            loop();
          } else if (onComplete) {
            onComplete();
          }
        }, 800);
      }

      loop();
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const timeline1Events = document.querySelectorAll(".timeline:nth-of-type(1) ul li");
  const line1 = document.querySelector(".timeline:nth-of-type(1) .timeline-innerline");

  const timeline2Events = document.querySelectorAll(".timeline:nth-of-type(2) ul li");
  const line2 = document.querySelector(".timeline:nth-of-type(2) .timeline-innerline");

  const isHorizontal = window.matchMedia("(min-width: 728px)").matches;

  slowLoop(timeline1Events, line1, isHorizontal, () => {
    setTimeout(() => {
      slowLoop(timeline2Events, line2, isHorizontal);
    }, 200); // small delay to ensure second line is visible
  });
});