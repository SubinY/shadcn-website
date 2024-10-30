"use client";

import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import { useMemo } from "react";

export const BgMotionSection = () => {
  const { scrollYProgress } = useScroll();

  const run = useMemo(() => {}, [scrollYProgress]);

  return (
    <motion.div
      style={{
        position: "absolute",
        top: 0,
        right: 250,
      }}
    >
      <Image
        src="/white-circle.webp"
        alt="white-circle"
        className="rounded-md"
        width={525}
        height={525}
      />
    </motion.div>
  );
};
