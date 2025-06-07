import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { features } from "./data";

const KeyFeatures = () => {
    return (
        <section className="bg-[#000814] home-gradient text-white py-15 px-4 mt-10 sm:px-10 lg:px-32">
            <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    Why Choose <span className="text-teal-400">AlgoNex?</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Empowering you with tools that go beyond practice. These
                    features help you master programming, not just solve
                    problems.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        className="bg-[#121A2C] rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-center mb-3">
                            <CheckCircle className="text-teal-400 w-5 h-5 mr-2" />
                            <h3 className="text-lg font-semibold">
                                {feature.title}
                            </h3>
                        </div>
                        <p className="text-sm text-gray-400">
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default KeyFeatures;
