import Presentation from "../components/Contact/Presentation";
import Contact from "../components/Contact/Contact";
import Projects from "../components/project/Projects";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-y-10 m-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Presentation />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Projects />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Contact />
      </motion.div>
    </div>
    </>
  )
}
