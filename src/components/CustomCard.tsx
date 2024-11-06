import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { Link } from "react-router-dom";

// Define the types for the props
interface CustomCardProps {
  bgColor: string;
  bgImage: string;
  title: string;
  subtitle: string;
  linkText: string;
  linkTo: string;
  iconSrc: string;
  count: string | number;
  bgButton: string;
}

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const CustomCard: React.FC<CustomCardProps> = ({
  bgColor,
  bgImage,
  subtitle,
  linkText,
  linkTo,
  iconSrc,
  count,
  bgButton,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const bgButtonConvert = bgButton;

  if ((linkTo = "/course")) {
    linkTo = "/modul";
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
        backgroundColor: bgColor, // background color
        backgroundImage: `url(${bgImage})`, // background image
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left",
        backgroundPositionX: "60px",
      }}
      className="relative h-56 md:w-48 rounded-xl bg-black lg:w-full"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute px-5 py-2 inset-4 grid  rounded-xl bg-white/10 shadow-lg text-white"
      >
        <img src={iconSrc} width={30} height={30} alt="icon" />
        <div className="mt-5">
          <h1 className="text-4xl font-bold drop-shadow-lg">{count}</h1>
          <p className="text-lg">{subtitle}</p>
          <Link to={linkTo} className="flex flex-col items-end">
            <hr className="mt-2 w-[150px]" />
            <p
              className={`mt-3 bg-[${bgButtonConvert}] text-white py-1 px-3 rounded-lg mr-2`}
            >
              {linkText}
            </p>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CustomCard;
