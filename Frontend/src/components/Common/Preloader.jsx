import { motion } from "framer-motion";
import logo from "/transparent_logo.png";

const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 4,
    top: Math.random() * 100 + "%",
    left: Math.random() * 100 + "%",
    delay: Math.random() * 5,
}));

const Preloader = () => {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#000814] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {particles.map(({ id, size, top, left, delay }) => (
                <motion.div
                    key={id}
                    className="absolute bg-teal-400 rounded-full blur-[6px] opacity-20"
                    style={{ width: size, height: size, top, left }}
                    animate={{
                        y: ["0%", "-20%", "0%"],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 6,
                        delay,
                        ease: "easeInOut",
                    }}
                />
            ))}

            <div className="relative flex flex-col items-center justify-center">
                <motion.div
                    className="absolute w-80 h-80 rounded-full bg-teal-500 blur-[80px] opacity-10"
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{
                        repeat: Infinity,
                        duration: 5,
                        ease: "easeInOut",
                    }}
                />

                <div className="relative w-40 h-40">
                    <motion.div
                        className="absolute inset-0 rounded-full border-[4px] border-teal-400 opacity-30"
                        animate={{ rotate: 360 }}
                        transition={{
                            repeat: Infinity,
                            duration: 8,
                            ease: "linear",
                        }}
                    />
                    <motion.div
                        className="absolute inset-[8%] rounded-full border-[3px] border-cyan-300 opacity-50"
                        animate={{ rotate: -360, scale: [1, 1.08, 1] }}
                        transition={{
                            repeat: Infinity,
                            duration: 5,
                            ease: "easeInOut",
                        }}
                    />
                    <motion.div
                        className="absolute inset-[16%] rounded-full border-[3px] border-cyan-500 opacity-70"
                        animate={{ rotate: 360 }}
                        transition={{
                            repeat: Infinity,
                            duration: 3,
                            ease: "linear",
                        }}
                    />
                    <img
                        src={logo}
                        alt="Algonex Logo"
                        className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_25px_rgba(0,255,255,0.8)]"
                    />
                </div>

                <div className="mt-8 flex space-x-2 h-4">
                    {[0, 0.2, 0.4, 0.6, 0.8].map((delay, i) => (
                        <motion.div
                            key={i}
                            className="w-2 h-full bg-teal-300 rounded-sm"
                            animate={{ scaleY: [1, 1.8, 1] }}
                            transition={{
                                repeat: Infinity,
                                duration: 1,
                                ease: "easeInOut",
                                delay,
                            }}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Preloader;
