import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, ArrowRight, Sparkles, BarChart3, Users, Shield, Menu, X, Star, ChevronRight, Zap, TrendingUp, Clock, MessageCircle, MapPin, ChevronDown } from 'lucide-react';
import bizmateLogo from './assets/bizmateLogo.png';
import SimulasiPage from './SimulasiPage.jsx';
import HowItWorks from './HowItWorks.jsx';
import Pricing from './Pricing.jsx';
import CaseStudies from './CaseStudies.jsx';
import FAQ from './FAQ.jsx';


function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function ModernSelect({ label, value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  return (
    <div className="relative" ref={ref}>
      <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
      <motion.button
        type="button"
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.99 }}
        className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white text-left flex items-center justify-between focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all"
      >
        <span className={value && value !== options[0] ? "text-white" : "text-slate-500"}>{value || options[0]}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} className="text-slate-400" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-20 mt-2 w-full rounded-2xl bg-slate-800/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden"
          >
            {options.map((opt, i) => (
              <motion.button
                key={opt}
                type="button"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => { onChange(opt); setOpen(false); }}
                whileHover={{ backgroundColor: "rgba(59,130,246,0.15)", x: 4 }}
                className={`w-full px-4 py-3 text-left transition-colors flex items-center gap-3 ${
                  value === opt ? "text-blue-400 bg-blue-500/10" : "text-slate-300"
                }`}
              >
                {value === opt && (
                  <motion.div layoutId="check" className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                )}
                <span className={!value || value === options[0] ? "text-slate-500" : ""}>
                  {opt}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-10"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}

function useParallax(value, distance) {
  return useTransform(value, [0, 1], [distance, -distance]);
}

function FloatingShape({ className, delay = 0 }) {
  return (
    <motion.div
      className={`absolute rounded-full opacity-20 blur-xl pointer-events-none ${className}`}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function Counter({ from, to, label, suffix = "" }) {
  const [count, setCount] = React.useState(from);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "0.5 0"],
  });

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      setCount(Math.floor(from + (to - from) * v));
    });
    return () => unsubscribe();
  }, [scrollYProgress, from, to]);

  return (
    <motion.div ref={ref} className="text-center" whileHover={{ scale: 1.05 }}>
      <motion.span className="text-5xl md:text-6xl font-black text-blue-600">
        {count}{suffix}
      </motion.span>
      <p className="text-slate-500 mt-2 font-medium">{label}</p>
    </motion.div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.1 },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

function Navbar({ onSimulasi }) {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 80], ["rgba(255,255,255,0)", "rgba(255,255,255,0.8)"]);

  return (
    <motion.nav
      style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", backgroundColor: bg }}
      className="fixed top-0 inset-x-0 z-50 px-6 md:px-10 py-4 flex justify-between items-center"
    >
      <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-2.5">
        <motion.img
          src={bizmateLogo}
          alt="Bizmate"
          className="h-9 md:h-10 w-auto drop-shadow-lg"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
        />
        <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">bizmate</span>
      </motion.div>

      <div className="hidden md:flex items-center gap-8">
        {["Fitur", "Portofolio", "Harga", "Testimoni"].map((item) => (
          <motion.button
            key={item}
            onClick={() => {
              const id = item === 'Harga' ? 'harga' : item === 'Portofolio' ? 'portofolio' : item.toLowerCase();
              scrollTo(id);
            }}
            className="text-slate-600 hover:text-slate-900 font-medium relative cursor-pointer"
            whileHover={{ y: -2 }}
          >
            {item}
          </motion.button>
        ))}
        <motion.button
          onClick={() => scrollTo("faq")}
          className="text-slate-600 hover:text-slate-900 font-medium relative cursor-pointer"
          whileHover={{ y: -2 }}
        >
          FAQ
        </motion.button>
        <motion.button
          onClick={onSimulasi}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-full font-medium shadow-lg shadow-blue-600/25 transition-shadow cursor-pointer"
        >
          Mulai Sekarang
        </motion.button>
      </div>

      <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-4 right-4 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-100 p-6 md:hidden flex flex-col gap-4"
          >
            {["Fitur", "Portofolio", "Harga", "Testimoni"].map((item) => (
              <button key={item} onClick={() => { const id = item === 'Harga' ? 'harga' : item === 'Portofolio' ? 'portofolio' : item.toLowerCase(); scrollTo(id); setOpen(false); }} className="text-slate-700 font-medium py-2 text-left cursor-pointer">
                {item}
              </button>
            ))}
            <button onClick={() => { scrollTo("faq"); setOpen(false); }} className="text-slate-700 font-medium py-2 text-left cursor-pointer">FAQ</button>
            <button onClick={() => { onSimulasi(); setOpen(false); }} className="px-5 py-3 bg-blue-600 text-white rounded-xl text-center font-medium cursor-pointer">Mulai Sekarang</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function Hero({ onSimulasi }) {
  const { scrollYProgress } = useScroll();
  const y = useParallax(scrollYProgress, 80);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <motion.section style={{ scale, opacity }} className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      <FloatingShape className="w-72 h-72 bg-blue-400 -top-20 -left-20" delay={0} />
      <FloatingShape className="w-96 h-96 bg-purple-400 bottom-20 -right-32" delay={1.5} />
      <FloatingShape className="w-56 h-56 bg-cyan-400 top-1/2 right-1/4" delay={3} />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 text-blue-700 text-sm font-semibold"
      >
        <Sparkles size={16} />
        Partner Solusi UMKM
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight max-w-5xl"
      >
        Sistem ERP Modern{' '}
        <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400">
          Khusus Untuk UMKM
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="text-lg md:text-xl text-slate-500 mt-8 max-w-2xl leading-relaxed"
      >
        Tingkatkan efisiensi bisnis Anda dengan Bizmate. Kami merancang sistem ERP yang skalabel, mudah digunakan, dan disesuaikan dengan kebutuhan spesifik operasional Anda.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 mt-10"
      >
        <motion.button
          onClick={onSimulasi}
          whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(37,99,235,0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl font-semibold text-lg inline-flex items-center gap-2 group cursor-pointer"
        >
          Pesan Sistem Anda
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight size={20} />
          </motion.span>
        </motion.button>
        <motion.button
          onClick={() => scrollTo("fitur")}
          whileHover={{ scale: 1.05, borderColor: "#3b82f6" }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 border-2 border-slate-200 text-slate-700 hover:text-blue-600 rounded-2xl font-semibold text-lg inline-flex items-center gap-2 transition-colors cursor-pointer"
        >
          Lihat Fitur
        </motion.button>
      </motion.div>

      <motion.div style={{ y }} className="absolute bottom-8">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

const features = [
  { icon: BarChart3, title: "Manajemen Inventaris", desc: "Pantau stok real-time antar cabang dengan akurat dan otomatis.", color: "from-blue-600 to-blue-400" },
  { icon: TrendingUp, title: "Laporan Keuangan", desc: "Neraca, laba rugi, dan arus kas otomatis dengan visualisasi data.", color: "from-emerald-600 to-emerald-400" },
  { icon: Users, title: "HR & Payroll", desc: "Kelola karyawan, absensi, dan penggajian terintegrasi.", color: "from-purple-600 to-purple-400" },
  { icon: Shield, title: "Keamanan Terjamin", desc: "Data bisnis Anda terenkripsi dan backup otomatis tiap hari.", color: "from-rose-600 to-rose-400" },
  { icon: Zap, title: "Integrasi API", desc: "Sambungkan dengan marketplace, payment gateway, dan aplikasi lain.", color: "from-amber-600 to-amber-400" },
  { icon: Clock, title: "Dukungan 24/7", desc: "Tim support siap membantu Anda kapan pun dibutuhkan.", color: "from-cyan-600 to-cyan-400" },
];

function Features() {
  return (
    <section id="fitur" className="relative py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
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
            FITUR UNGGULAN
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Semua yang Anda Butuhkan{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">Dalam Satu Platform</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Bizmate menyediakan modul lengkap yang bisa disesuaikan dengan kebutuhan bisnis Anda.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group relative p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-100 transition-colors cursor-default overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 shadow-lg`}
                >
                  <f.icon size={26} className="text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="relative z-10 mt-4 flex items-center gap-1 text-blue-600 text-sm font-medium"
              >
                Pelajari <ChevronRight size={16} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const testimonials = [
  { nama: "Budi Santoso", bisnis: "Retail Fashion", teks: "Bizmate membuat manajemen stok antar cabang jadi sangat akurat. Tampilan UI-nya sangat modern!", rating: 5 },
  { nama: "Siti Aminah", bisnis: "Distributor F&B", teks: "Proses pemesanan dan invoice otomatis dari Bizmate memangkas waktu kerja kami hingga 60%.", rating: 5 },
  { nama: "Reza Rahadian", bisnis: "Jasa Logistik", teks: "Akhirnya ada ERP lokal yang mengerti alur kerja UMKM tanpa biaya langganan yang mencekik.", rating: 5 },
];

function Testimonials() {
  return (
    <section id="testimoni" className="relative py-32 px-6 bg-slate-50 overflow-hidden">
      <FloatingShape className="w-80 h-80 bg-blue-300 -bottom-40 -left-40" delay={2} />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
            TESTIMONI
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Dipercaya oleh{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">UMKM Bertumbuh</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -12, rotateY: 2 }}
              className="group p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + j * 0.1 }}
                  >
                    <Star size={20} className="fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
              </div>
              <p className="text-slate-600 mb-8 leading-relaxed text-[15px]">"{t.teks}"</p>
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg"
                >
                  {t.nama[0]}
                </motion.div>
                <div>
                  <p className="font-bold text-slate-900">{t.nama}</p>
                  <p className="text-sm text-slate-400">{t.bisnis}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="py-20 px-6 bg-white border-y border-slate-100">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        <Counter from={0} to={150} suffix="+" label="UMKM Aktif" />
        <Counter from={0} to={98} suffix="%" label="Kepuasan Klien" />
        <Counter from={0} to={24} suffix="/7" label="Dukungan Teknis" />
        <Counter from={0} to={3} suffix="+" label="Tahun Pengalaman" />
      </div>
    </section>
  );
}

function OrderSection() {
  const [focused, setFocused] = useState(null);
  const [form, setForm] = useState({ name: "", bisnis: "", email: "", modul: "", pesan: "" });

  const inputs = [
    { key: "name", label: "Nama Lengkap", type: "text", placeholder: "Masukkan nama Anda" },
    { key: "email", label: "Email", type: "email", placeholder: "email@domain.com" },
    { key: "bisnis", label: "Nama Bisnis", type: "text", placeholder: "Contoh: PT Sukses Makmur" },
    { key: "modul", label: "Kebutuhan Modul", type: "select", options: ["Pilih prioritas modul...", "Point of Sales & Inventory", "Keuangan & Akuntansi", "HRD & Payroll", "Modul Custom Lengkap"] },
    { key: "pesan", label: "Pesan Tambahan", type: "textarea", placeholder: "Ceritakan kebutuhan bisnis Anda..." },
  ];

  return (
    <section id="order" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <FloatingShape className="w-96 h-96 bg-blue-500 top-20 -right-20" delay={1} />
      <FloatingShape className="w-64 h-64 bg-purple-500 bottom-10 -left-10" delay={2.5} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-300 text-sm font-semibold mb-4 border border-blue-500/20"
            >
              MULAI SEKARANG
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Siap Mendigitalisasi{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">Bisnis Anda?</span>
            </h2>
            <p className="text-slate-400 mb-12 text-lg leading-relaxed">
              Konsultasikan kebutuhan ERP Anda. Tim Bizmate akan menganalisa dan merancang solusi terbaik untuk bisnis Anda.
            </p>

            <div className="space-y-8">
              {[
                { icon: Send, label: "Email", value: "halo@bizmate.id" },
                { icon: MessageCircle, label: "WhatsApp", value: "+62 812 3456 7890" },
                { icon: MapPin, label: "Kantor", value: "Gedung Inovasi, Jakarta Selatan" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 group"
                >
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-colors"
                  >
                    <item.icon size={20} className="text-blue-400" />
                  </motion.div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{item.label}</p>
                    <p className="text-white font-medium">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl"
            >
              <motion.h3
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl font-bold text-white mb-8"
              >
                Form Konsultasi & Order
              </motion.h3>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                {inputs.map((input) => (
                  <div key={input.key} className="relative">
                    {input.type === "select" ? (
                      <ModernSelect
                        label={input.label}
                        value={form[input.key]}
                        onChange={(v) => setForm({ ...form, [input.key]: v })}
                        options={input.options}
                      />
                    ) : input.type === "textarea" ? (
                      <>
                        <label className="block text-sm font-medium text-slate-300 mb-2">{input.label}</label>
                        <textarea
                          rows={3}
                          value={form[input.key]}
                          onChange={(e) => setForm({ ...form, [input.key]: e.target.value })}
                          onFocus={() => setFocused(input.key)}
                          onBlur={() => setFocused(null)}
                          placeholder={input.placeholder}
                          className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all resize-none"
                        />
                      </>
                    ) : (
                      <>
                        <label className="block text-sm font-medium text-slate-300 mb-2">{input.label}</label>
                        <input
                          type={input.type}
                          value={form[input.key]}
                          onChange={(e) => setForm({ ...form, [input.key]: e.target.value })}
                          onFocus={() => setFocused(input.key)}
                          onBlur={() => setFocused(null)}
                          placeholder={input.placeholder}
                          className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all"
                        />
                      </>
                    )}
                    {focused === input.key && (
                      <motion.div
                        layoutId="focus"
                        className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                      />
                    )}
                  </div>
                ))}

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 60px rgba(37,99,235,0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-2xl font-bold text-lg inline-flex items-center justify-center gap-2 group mt-2"
                >
                  Kirim Permintaan
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Send size={18} />
                  </motion.span>
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative py-12 px-6 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-2">
          <img src={bizmateLogo} alt="Bizmate" className="h-8 w-auto brightness-0 invert" />
          <span className="text-lg font-bold text-white">bizmate</span>
        </motion.div>
        <p className="text-slate-500 text-sm text-center">
          &copy; 2026 Bizmate. Partner Solusi Pembuatan Jasa Sistem ERP UMKM.
        </p>
        <div className="flex gap-6">
          {["Tentang", "Privacy", "FAQ"].map((item) => (
            <motion.a
              key={item}
              href="#"
              whileHover={{ y: -2 }}
              className="text-slate-500 hover:text-white text-sm transition-colors"
            >
              {item}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function BizmateLanding() {
  const [page, setPage] = useState('home');

  if (page === 'simulasi') {
    return <SimulasiPage onBack={() => setPage('home')} />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      <Navbar onSimulasi={() => setPage('simulasi')} />
      <Hero onSimulasi={() => setPage('simulasi')} />
      <HowItWorks />
      <Features />
      <Stats />
      <Pricing />
      <CaseStudies />
      <Testimonials />
      <FAQ />
      <OrderSection />
      <Footer />
    </div>
  );
}
