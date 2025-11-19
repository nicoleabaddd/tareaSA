// script.js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let drawing = false;
let startX = 0, startY = 0;
let tool = "brush";
let color = "#000000";
let lineWidth = 2;

document.querySelectorAll("[data-tool]").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("[data-tool]").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    tool = btn.getAttribute("data-tool");
  });
});

document.querySelectorAll("[data-color]").forEach(btn => {
  btn.addEventListener("click", () => {
    color = btn.getAttribute("data-color");
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
  });
});

document.getElementById("clear").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById("save").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "drawing.png";
  link.href = canvas.toDataURL();
  link.click();
});

canvas.addEventListener("mousedown", e => {
  drawing = true;
  startX = e.offsetX;
  startY = e.offsetY;
  if (tool === "brush" || tool === "eraser") {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
  }
});

canvas.addEventListener("mousemove", e => {
  if (!drawing) return;
  const x = e.offsetX, y = e.offsetY;
  ctx.lineWidth = tool === "eraser" ? 10 : lineWidth;
  ctx.strokeStyle = tool === "eraser" ? "#FFFFFF" : color;

  if (tool === "brush" || tool === "eraser") {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
});

canvas.addEventListener("mouseup", e => {
  drawing = false;
  const x = e.offsetX, y = e.offsetY;
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;

  if (tool === "line") {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(x, y);
    ctx.stroke();
  } else if (tool === "rectangle") {
    ctx.strokeRect(startX, startY, x - startX, y - startY);
  } else if (tool === "circle") {
    const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
    ctx.beginPath();
    ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }
});
