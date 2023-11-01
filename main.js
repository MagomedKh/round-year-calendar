import data from "./data.js";

const canvas = document.getElementById("life-calendar-canvas");
const context = canvas.getContext("2d");
const pointer = document.querySelector(".life-calendar-pointer");
const PI = Math.PI;

function resizeCanvas() {
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   drawLifeCalendar();
}

function drawLifeCalendar() {
   const centerX = canvas.width / 2;
   const centerY = canvas.height / 2;
   const radius = Math.min(canvas.width, canvas.height) * 0.4;
   const daysInYear = 365;
   const currentDate = new Date();
   const dayOfYear = Math.floor(
      (currentDate - new Date(currentDate.getFullYear(), 0, 0)) /
         (1000 * 60 * 60 * 24)
   );
   const angle = (dayOfYear / daysInYear) * 2 * PI - PI / 2;

   // Draw the circle
   context.beginPath();
   context.arc(centerX, centerY, radius, 0, 2 * PI);
   context.strokeStyle = "#393E46";
   context.lineWidth = 18;
   context.stroke();

   // Color past time
   const progress = dayOfYear / daysInYear;
   const endAngle = progress * 2 * PI - PI / 2;
   context.beginPath();
   context.arc(centerX, centerY, radius, -PI / 2, endAngle);
   context.strokeStyle = "#00ADB5";
   context.lineWidth = 70;
   context.stroke();
   context.beginPath();
   context.arc(centerX, centerY, radius, endAngle - 0.03, endAngle + 0.03);
   context.strokeStyle = "#E84545";
   context.lineWidth = 120;
   context.stroke();

   // Draw the month`s dashes
   for (let i = 0; i < 12; i++) {
      const isThird = (i + 1) % 3 === 0;
      const radianOfDash = getRadianOfMonthDash();
      context.beginPath();
      context.arc(
         centerX,
         centerY,
         radius,
         radianOfDash - (isThird ? 0.02 : 0.01),
         radianOfDash + (isThird ? 0.02 : 0.01)
      );
      context.strokeStyle = isThird ? "#222831" : "#3b4c66";
      context.lineWidth = isThird ? 125 : 85;
      context.stroke();
   }

   // Draw the pointer
   pointer.style.top = centerY + radius * Math.sin(angle) + "px";
   pointer.style.left = centerX + radius * Math.cos(angle) + "px";
}

function getFnGetRadianOfMonthDash() {
   let numOfDash = 0;
   return () => {
      return (numOfDash++ * PI) / 6;
   };
}
const getRadianOfMonthDash = getFnGetRadianOfMonthDash();

// window.addEventListener("resize", resizeCanvas);
resizeCanvas();
