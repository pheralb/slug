import { motion } from "framer-motion";
import type { FC, ReactNode } from "react";

type UpProps = {
  children: ReactNode;
  delay?: number;
};

const Up: FC<UpProps> = ({ children, delay }) => (
  <motion.div
    initial={{ y: 10, opacity: 0 }}
    animate={{ y: 0, opacity: 0.9 }}
    transition={{
      duration: 0.4,
      delay: delay,
    }}
  >
    {children}
  </motion.div>
);

export default Up;
