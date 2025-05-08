import { useEffect } from "react";
import confetti from "canvas-confetti"; 
import successImg from "../../assets/success.png"
export default function OrderSuccess() {
  useEffect(() => {
    var end = Date.now() + 15 * 1000;
    var colors = ["#bb0000", "#ffffff"];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []); 

  return (
    <div
      className={`bg-black h-full py-2 px-4 font-montserrat`}
    >
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <img
            className="my-5 mx-auto h-54 w-64 rounded-lg"
            src={successImg}
            alt="Order Success"
          />

          <h2 className="text-2xl font-semibold mb-3 text-pale-blue">
            Your Order has been placed successfully.
          </h2>

          <a
            href="/orders"
            className={`text-yellow-500 text-xl font-bold hover:no-underline hover:text-3xl`}
          >
            Go to Orders
          </a>
        </div>
      </div>
    </div>
  );
}
