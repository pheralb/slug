import { motion } from "framer-motion";

interface MotionProps {
  routerKey?: string;
  children: React.ReactNode;
}

const Show = (props: MotionProps) => {
  return (
    <motion.div
      key={props.routerKey}
      initial="initial"
      animate="animate"
      variants={{
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 1,
        },
      }}
    >
      {props.children}
    </motion.div>
  );
};

export default Show;
