import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Sparkles, ChevronDown } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '2,5',
    unit: 'jt',
    desc: 'Cocok untuk UMKM kecil yang baru mulai digitalisasi.',
    popular: false,
    features: [
      { label: 'Point of Sales', ok: true },
      { label: 'Manajemen inventaris', ok: true },
      { label: '1 Cabang', ok: true },
      { label: 'Laporan keuangan dasar', ok: true },
      { label: 'Integrasi payment', ok: false },
      { label: 'HR & Payroll', ok: false },
      { label: 'API Integration', ok: false },
      { label: 'Dukungan prioritas', ok: false },
    ],
    color: 'from-slate-600 to-slate-500',
  },
  {
    name: 'Business',
    price: '4,5',
    unit: 'jt',
    desc: 'Solusi lengkap untuk UMKM yang ingin berkembang pesat.',
    popular: true,
    features: [
      { label: 'Point of Sales', ok: true },
      { label: 'Manajemen inventaris', ok: true },
      { label: 'Multi-cabang (3)', ok: true },
      { label: 'Laporan keuangan lengkap', ok: true },
      { label: 'Integrasi payment', ok: true },
      { label: 'HR & Payroll', ok: true },
      { label: 'API Integration', ok: false },
      { label: 'Dukungan prioritas', ok: true },
    ],
    color: 'from-blue-600 to-blue-400',
  },
  {
    name: 'Enterprise',
    price: '7,5',
    unit: 'jt',
    desc: 'For high-growth businesses with custom needs.',
    popular: false,
    features: [
      { label: 'Point of Sales', ok: true },
      { label: 'Manajemen inventaris', ok: true },
      { label: 'Multi-cabang (unlimited)', ok: true },
      { label: 'Laporan keuangan lengkap', ok: true },
      { label: 'Integrasi payment', ok: true },
      { label: 'HR & Payroll', ok: true },
      { label: 'API Integration', ok: true },
      { label: 'Dukungan prioritas 24/7', ok: true },
    ],
    color: 'from-purple-600 to-purple-400',
  },
];

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Pricing() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="harga" className="relative py-32 px-6 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
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
            className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4"
          >
            PAKET HARGA
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Harga{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">Transparan</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Pilih paket yang sesuai dengan kebutuhan dan anggaran bisnis Anda.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start"
        >
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className={`relative rounded-3xl p-8 border-2 transition-all ${
                plan.popular
                  ? 'bg-white border-blue-500 shadow-2xl shadow-blue-500/10 scale-105 md:scale-110'
                  : 'bg-white border-slate-200 hover:border-blue-200 shadow-lg'
              }`}
            >
              {plan.popular && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-sm font-bold rounded-full inline-flex items-center gap-1.5 shadow-lg"
                >
                  <Sparkles size={14} />
                  TERPOPULER
                </motion.div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-500 text-sm mb-4">{plan.desc}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-slate-400 text-lg">Rp</span>
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 150, delay: 0.2 + i * 0.1 }}
                    className="text-5xl md:text-6xl font-black text-slate-900"
                  >
                    {plan.price}
                  </motion.span>
                  <span className="text-slate-400 text-lg">/{plan.unit}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + j * 0.05 }}
                    className={`flex items-center gap-3 text-sm ${f.ok ? 'text-slate-700' : 'text-slate-300'}`}
                  >
                    <span className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${f.ok ? 'bg-blue-100' : 'bg-slate-100'}`}>
                      {f.ok ? <Check size={12} className="text-blue-600" /> : <X size={12} className="text-slate-300" />}
                    </span>
                    {f.label}
                  </motion.li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full py-3.5 rounded-2xl font-bold text-lg transition-all cursor-pointer ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30'
                    : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg'
                }`}
              >
                Pilih {plan.name}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-slate-500 text-sm mb-2">Butuh paket custom dengan fitur spesifik?</p>
          <motion.button
            whileHover={{ scale: 1.02, color: "#2563eb" }}
            className="text-blue-600 font-semibold inline-flex items-center gap-1 cursor-pointer"
          >
            Hubungi Kami <ChevronDown size={16} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
