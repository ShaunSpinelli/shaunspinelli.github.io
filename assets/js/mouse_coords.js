const p = document.createElement("p");
p.style.textAlign = "center";
p.style.fontSize = "18pt";
p.innerHTML = "C'mon, move your mouse!"
document.body.append(p);

document.addEventListener("mousemove", e => {
  p.innerHTML = `Your mouse is here -> mouseX: ${e.clientX}, mouseY: ${e.clientY}`;  
});