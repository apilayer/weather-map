import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {};

const ArrowComponent = (props: Props) => {
  return (
    <AnimatePresence>
      <motion.div
        className="hidden md:block md:fixed top-[0px] left-[386px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="https://img.icons8.com/laces/64/000000/arrow.png"
          alt=""
          className="transform rotate-180"
        />
        <h4 className="Kalam-font -mt-3 text-lg ml-4">
          Simply type any region to
          <br />
          search its weather information
        </h4>
      </motion.div>
    </AnimatePresence>
  );
};

export default ArrowComponent;
