import { motion } from 'framer-motion';

const techGroups = [
  {
    category: 'Frontend',
    items: [
      { name: 'React', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      { name: 'Next.js', color: 'bg-slate-100 text-slate-700 border-slate-200' },
      { name: 'Tailwind CSS', color: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
      { name: 'TypeScript', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
      { name: 'Vite', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', color: 'bg-green-100 text-green-700 border-green-200' },
      { name: 'Python', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      { name: 'Go', color: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
      { name: 'GraphQL', color: 'bg-pink-100 text-pink-700 border-pink-200' },
      { name: 'REST API', color: 'bg-orange-100 text-orange-700 border-orange-200' },
    ],
  },
  {
    category: 'Database',
    items: [
      { name: 'PostgreSQL', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
      { name: 'MySQL', color: 'bg-amber-100 text-amber-700 border-amber-200' },
      { name: 'MongoDB', color: 'bg-green-100 text-green-700 border-green-200' },
      { name: 'Redis', color: 'bg-red-100 text-red-700 border-red-200' },
    ],
  },
  {
    category: 'Cloud & DevOps',
    items: [
      { name: 'Docker', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      { name: 'AWS', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
      { name: 'Google Cloud', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      { name: 'Linux', color: 'bg-slate-100 text-slate-700 border-slate-200' },
      { name: 'GitHub Actions', color: 'bg-slate-100 text-slate-700 border-slate-200' },
    ],
  },
];

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function TechStack() {
  return (
    <section className="relative py-32 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background decorative elements */}
      <motion.div
        className="absolute w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -top-20 -right-20"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl -bottom-20 -left-20"
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/5 text-blue-300 text-sm font-semibold mb-4 border border-white/10"
          >
            TEKNOLOGI
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Teknologi{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">Modern</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Kami menggunakan stack teknologi terkini untuk memastikan performa, keamanan, dan skalabilitas sistem Anda.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {techGroups.map((group, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-white font-bold text-lg mb-5">{group.category}</h3>
              <div className="flex flex-wrap gap-2.5">
                {group.items.map((tech, j) => (
                  <motion.span
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + j * 0.05, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`px-3 py-1.5 rounded-lg border text-sm font-medium cursor-default ${tech.color}`}
                  >
                    {tech.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
