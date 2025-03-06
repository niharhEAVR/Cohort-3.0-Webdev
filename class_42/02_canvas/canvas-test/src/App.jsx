import { useEffect } from "react";
import { useRef } from "react";

function App() {
  return (
    <>
      <TriangleCanvas />
      <CircleCanvas />
      <DrawImageCanvas />
      <Click />
      <Tranformation />
      <Animation />
    </>
  )
}

function Tranformation() {
  const c = useRef(null);

  useEffect(() => {
    if (!c.current) return;

    const ctx = c.current.getContext("2d");

    ctx.translate(100, 100); // Move the origin point to (100,100)
    ctx.rotate(Math.PI / 4); // Rotate by 45 degrees

    ctx.fillStyle = "red";
    ctx.fillRect(-25, -25, 50, 50); // Centered around new origin
  }, []);

  return <canvas ref={c} width="300" height="200" className="border-2 border-black" />;
}

function Click() {
  //Effect: Clicking anywhere logs the mouse coordinates inside the canvas.
  const c = useRef(null);

  useEffect(() => {
    if (!c.current) return;

    const ctx = c.current.getContext("2d");
    ctx.fillStyle = "orange";
    ctx.fillRect(50, 50, 100, 100);

    function handleClick(event) {
      const rect = c.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      console.log(`Clicked at: ${x}, ${y}`);
    }

    c.current.addEventListener("click", handleClick);
    return () => c.current.removeEventListener("click", handleClick); // Cleanup
  }, []);

  return <canvas ref={c} width="300" height="200" className="border-2 border-black" />;
}

function Animation() {
  const c = useRef(null);
  let x = 0;

  useEffect(() => {
    if (!c.current) return;

    const ctx = c.current.getContext("2d");

    function animate() {
      ctx.clearRect(0, 0, c.current.width, c.current.height); // Clear the canvas
      ctx.fillStyle = "purple";
      ctx.fillRect(x, 50, 50, 50); // Draw a moving box

      x += 2; // Move right
      if (x > c.current.width) x = 0; // Reset position

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return <canvas ref={c} width="300" height="200" className="border-2 border-black" />;
}

function DrawImageCanvas() {
  const c = useRef(null);

  useEffect(() => {
    if (!c.current) return;

    const ctx = c.current.getContext("2d");

    const img = new Image();
    img.src = "/vite.svg";
    img.onload = () => {
      ctx.drawImage(img, 50, 50, 100, 100);
    };
  }, []);

  return <canvas ref={c} width="300" height="200" className="border-2 border-black" />;
}

function CircleCanvas() {
  const c = useRef()

  useEffect(() => {
    const ctx = c.current.getContext("2d");
    ctx.beginPath();
    ctx.arc(100, 100, 50, 0, Math.PI * 2); // Draws a full circle
    ctx.stroke();


  }, [])


  return <canvas ref={c} width="300" height="200" className="border-2 border-black" />;
}

function TriangleCanvas() {
  const c = useRef()

  useEffect(() => {
    const ctx = c.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(20, 20);
    ctx.lineTo(20, 100);
    ctx.lineTo(70, 100);
    ctx.lineTo(20, 20);
    ctx.strokeStyle = "red";
    ctx.stroke();

  }, [])


  return <canvas ref={c} width="300" height="200" className="border-2 border-black" />;
}

export default App
