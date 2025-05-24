import { motion } from "framer-motion";

const AnimatedDivider = () => {
    return (
        <motion.div
            className="w-4/5 mx-auto h-[1px] rounded bg-gradient-to-r from-teal-400 to-teal-500 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.6 }}
        />
    );
};

export default AnimatedDivider;
