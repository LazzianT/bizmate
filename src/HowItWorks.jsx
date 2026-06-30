import { motion } from 'framer-motion';
import { MessageCircle, Search, PenTool, Code, Rocket } from 'lucide-react';

const steps = [
  { icon: MessageCircle, title: 'Konsultasi Gratis', desc: 'Diskusi kebutuhan bisnis Anda melalui WhatsApp atau meeting. Kami pahami alur kerja dan tantangan Anda.', color: 'from-blue-600 to-blue-400' },
  { icon: Search, title: 'Analisis Kebutuhan', desc: 'Tim kami menganalisis proses bisnis dan merancang modul ERP yang tepat sesuai skala UMKM Anda.', color: 'from-emerald-600 to-emerald-400' },
  { icon: PenTool, title: 'Perancangan Sistem', desc: 'UI/UX dirancang khusus dengan alur yang intuitif. Anda bisa request fitur sebelum pengembangan dimulai.', color: 'from-purple-600 to-purple-400' },
  { icon: Code, title: 'Development & Testing', desc: 'Sistem dikembangkan dengan teknologi modern. Testing ketat dilakukan sebelum diserahkan ke Anda.', color: 'from-amber-600 to-amber-400' },
  { icon: Rocket, title: 'Deploy & Support', desc: 'Sistem di-deploy, tim kami latih karyawan Anda, dan support 24/7 siap membantu kapan pun.', color: 'from-cyan-600 to-cyan-400' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.15 } }),
};

export default function HowItWorks() {
  return (
    <section className="relative py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4"
          >
            CARA KERJA
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Bagaimana Kami{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">Bekerja?</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Proses kerja yang transparan dan terstruktur dari konsultasi hingga sistem siap digunakan.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-blue-400 to-cyan-400 origin-top hidden md:block"
          />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={i}
              variants={fadeUp}
              className={`relative flex items-start gap-6 md:gap-0 mb-16 last:mb-0 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`relative z-10 w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl shadow-${step.color.split(' ')[0].replace('from-', '')}/30 md:absolute md:left-1/2 md:-translate-x-1/2`}
              >
                <step.icon size={28} className="text-white" />
                {/* Step number */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 200 }}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-blue-600 text-blue-600 text-xs font-bold flex items-center justify-center"
                >
                  {i + 1}
                </motion.div>
              </motion.div>

              {/* Content */}
              <motion.div
                whileHover={{ y: -4 }}
                className={`flex-1 bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-blue-100 hover:shadow-lg transition-all md:w-[calc(50%-3rem)] ${
                  i % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
                }`}
              >
                <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
