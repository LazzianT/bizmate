import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Package, Calculator, Users, Puzzle, Building, ShoppingCart, Sparkles, Send, ChevronRight } from 'lucide-react';
import bizmateLogo from './assets/bizmateLogo.png';

const modules = [
  { id: 'pos', icon: ShoppingCart, label: 'Point of Sales & Inventory', desc: 'Manajemen stok & kasir multi-cabang', price: 'Rp 2,5jt' },
  { id: 'finance', icon: Calculator, label: 'Keuangan & Akuntansi', desc: 'Laporan laba rugi & neraca otomatis', price: 'Rp 2jt' },
  { id: 'hr', icon: Users, label: 'HRD & Payroll', desc: 'Absensi & penggajian terintegrasi', price: 'Rp 1,5jt' },
  { id: 'custom', icon: Puzzle, label: 'Modul Custom Lengkap', desc: 'Semua modul + fitur sesuai kebutuhan', price: 'Rp 5jt' },
];

const steps = [
  { label: 'Mulai', icon: Sparkles },
  { label: 'Modul', icon: Package },
  { label: 'Data', icon: Building },
  { label: 'Selesai', icon: Send },
];

function FloatingParticle({ index }) {
  return (
    <motion.div
      className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
      style={{
        left: `${20 + (index * 17) % 60}%`,
        top: `${10 + (index * 13) % 80}%`,
      }}
      animate={{
        y: [0, -40, 0],
        x: [0, 20, 0],
        scale: [1, 1.5, 1],
        opacity: [0.2, 0.5, 0.2],
      }}
      transition={{
        duration: 4 + (index % 3) * 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.3,
      }}
    />
  );
}

function ProgressDots({ current, total }) {
  return (
    <div className="flex items-center gap-3">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          className="relative"
        >
          <motion.div
            className={`h-3 rounded-full cursor-pointer ${i <= current ? 'bg-blue-600' : 'bg-slate-200'}`}
            style={i <= current ? { width: i === current ? 32 : 12 } : { width: 12 }}
            animate={{
              width: i === current ? 32 : 12,
              backgroundColor: i <= current ? '#2563eb' : '#e2e8f0',
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
          {i === current && (
            <motion.div
              layoutId="pulse"
              className="absolute -inset-1 rounded-full border-2 border-blue-600"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

export default function SimulasiPage({ onBack }) {
  const [[step, dir], setStep] = useState([0, 0]);
  const [selectedModules, setSelectedModules] = useState([]);
  const [form, setForm] = useState({ nama: '', bisnis: '', email: '', telepon: '' });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [orderId] = useState(() => 'BZ-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2, 6).toUpperCase());
  const ref = useRef(null);

  const paginate = (dir) => {
    const next = step + dir;
    if (next < 0 || next > 3) return;
    setStep([next, dir]);
  };

  const toggleModule = (id) => {
    setSelectedModules(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 2000));
    setSubmitting(false);
    setDone(true);
  };

  if (done) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-6 relative overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => <FloatingParticle key={i} index={i} />)}

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 12 }}
          className="relative z-10 bg-white/5 backdrop-blur-xl rounded-3xl p-10 md:p-14 border border-white/10 text-center max-w-lg w-full"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 12, delay: 0.2 }}
            className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/30"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Check size={36} className="text-white" />
            </motion.div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl md:text-4xl font-bold text-white mb-3"
          >
            Simulasi Berhasil!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-slate-400 mb-6"
          >
            Tim Bizmate akan menghubungi Anda dalam 1x24 jam.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="inline-block px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-slate-300 font-mono text-sm mb-8"
          >
            Kode Order: <span className="text-blue-400 font-bold tracking-wider">{orderId}</span>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            onClick={onBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl font-semibold text-lg inline-flex items-center gap-2 shadow-xl shadow-blue-600/30"
          >
            <ArrowLeft size={20} />
            Kembali ke Beranda
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden" ref={ref}>
      {Array.from({ length: 15 }).map((_, i) => <FloatingParticle key={i} index={i} />)}

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-10"
        >
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.05, x: -3 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium"
          >
            <ArrowLeft size={20} />
            <span className="hidden sm:inline">Kembali</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3"
          >
            <img src={bizmateLogo} alt="Bizmate" className="h-8 w-auto" />
            <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">bizmate</span>
          </motion.div>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between mb-12"
        >
          <ProgressDots current={step} total={4} />
          <motion.span
            key={step}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full"
          >
            Langkah {step + 1}/4
          </motion.span>
        </motion.div>

        {/* Steps */}
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Step 0: Welcome */}
            {step === 0 && (
              <div className="text-center py-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 150, damping: 12, delay: 0.1 }}
                  className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-400 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-600/30"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Sparkles size={44} className="text-white" />
                  </motion.div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                  className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4"
                >
                  Simulasi Pemesanan
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-slate-500 max-w-md mx-auto mb-4"
                >
                  Pilih modul ERP yang sesuai dengan kebutuhan bisnis Anda. Simulasi ini hanya memakan waktu 2 menit.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap justify-center gap-3 mb-10"
                >
                  {['Mudah', 'Cepat', 'Tanpa Ribet'].map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-medium"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.button
                  onClick={() => paginate(1)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(37,99,235,0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl font-bold text-lg inline-flex items-center gap-2 shadow-xl shadow-blue-600/25"
                >
                  Mulai Simulasi
                  <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <ArrowRight size={22} />
                  </motion.span>
                </motion.button>
              </div>
            )}

            {/* Step 1: Pilih Modul */}
            {step === 1 && (
              <div className="py-6">
                <motion.h2
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl md:text-3xl font-bold text-slate-900 mb-2"
                >
                  Pilih Modul
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-slate-500 mb-8"
                >
                  Pilih satu atau beberapa modul yang Anda butuhkan.
                </motion.p>

                <div className="grid gap-4 mb-10">
                  {modules.map((mod, i) => {
                    const selected = selectedModules.includes(mod.id);
                    return (
                      <motion.button
                        key={mod.id}
                        onClick={() => toggleModule(mod.id)}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.08, type: "spring", stiffness: 100 }}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center gap-4 cursor-pointer ${
                          selected
                            ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/10'
                            : 'border-slate-200 bg-white hover:border-blue-200 hover:shadow-md'
                        }`}
                      >
                        <motion.div
                          animate={selected ? { rotate: [0, -10, 10, 0] } : {}}
                          transition={{ duration: 0.4 }}
                          className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                            selected
                              ? 'bg-gradient-to-br from-blue-600 to-blue-400 text-white shadow-lg shadow-blue-600/30'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          <mod.icon size={24} />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-slate-900">{mod.label}</div>
                          <div className="text-sm text-slate-500">{mod.desc}</div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-sm font-bold text-blue-600">{mod.price}</div>
                          <motion.div
                            initial={false}
                            animate={{
                              scale: selected ? 1 : 0,
                              opacity: selected ? 1 : 0,
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          >
                            <Check size={18} className="text-blue-600 ml-auto" />
                          </motion.div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="flex justify-between">
                  <motion.button
                    onClick={() => paginate(-1)}
                    whileHover={{ x: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 text-slate-600 font-medium inline-flex items-center gap-2"
                  >
                    <ArrowLeft size={18} /> Kembali
                  </motion.button>
                  <motion.button
                    onClick={() => paginate(1)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={selectedModules.length === 0}
                    className={`px-8 py-3 rounded-2xl font-bold text-lg inline-flex items-center gap-2 ${
                      selectedModules.length > 0
                        ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-600/25'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Selanjutnya
                    <ArrowRight size={20} />
                  </motion.button>
                </div>
              </div>
            )}

            {/* Step 2: Data Bisnis */}
            {step === 2 && (
              <div className="py-6">
                <motion.h2
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl md:text-3xl font-bold text-slate-900 mb-2"
                >
                  Data Bisnis
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-slate-500 mb-8"
                >
                  Isi data diri agar tim kami dapat menghubungi Anda.
                </motion.p>

                <div className="space-y-5 mb-10">
                  {[
                    { key: 'nama', label: 'Nama Lengkap', placeholder: 'Masukkan nama Anda', type: 'text' },
                    { key: 'bisnis', label: 'Nama Bisnis', placeholder: 'Contoh: PT Sukses Makmur', type: 'text' },
                    { key: 'email', label: 'Email', placeholder: 'email@domain.com', type: 'email' },
                    { key: 'telepon', label: 'Nomor Telepon', placeholder: '+62 812 3456 7890', type: 'tel' },
                  ].map((field, i) => (
                    <motion.div
                      key={field.key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.08 }}
                    >
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {field.label}
                      </label>
                      <motion.div
                        whileFocus={{ scale: 1.01 }}
                        className="relative"
                      >
                        <input
                          type={field.type}
                          value={form[field.key]}
                          onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                          placeholder={field.placeholder}
                          className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                        />
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: form[field.key] ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="p-4 rounded-2xl bg-blue-50 border border-blue-100 mb-8"
                >
                  <p className="text-sm text-blue-700">
                    <span className="font-bold">Total Estimasi: </span>
                    {selectedModules.includes('custom')
                      ? 'Rp 5jt (Paket Custom Lengkap)'
                      : `Rp ${selectedModules.reduce((sum, id) => sum + modules.find(m => m.id === id)?.price.replace(/[^0-9]/g, '') * 1, 0).toLocaleString('id')} (${selectedModules.length} modul)`}
                  </p>
                </motion.div>

                <div className="flex justify-between">
                  <motion.button
                    onClick={() => paginate(-1)}
                    whileHover={{ x: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 text-slate-600 font-medium inline-flex items-center gap-2"
                  >
                    <ArrowLeft size={18} /> Kembali
                  </motion.button>
                  <motion.button
                    onClick={() => paginate(1)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!form.nama || !form.email}
                    className={`px-8 py-3 rounded-2xl font-bold text-lg inline-flex items-center gap-2 ${
                      form.nama && form.email
                        ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-600/25'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Review
                    <ArrowRight size={20} />
                  </motion.button>
                </div>
              </div>
            )}

            {/* Step 3: Review & Submit */}
            {step === 3 && (
              <div className="py-6">
                <motion.h2
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl md:text-3xl font-bold text-slate-900 mb-2"
                >
                  Konfirmasi
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-slate-500 mb-8"
                >
                  Pastikan data di bawah ini sudah benar.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="bg-white rounded-2xl border border-slate-200 p-6 mb-6"
                >
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Package size={18} className="text-blue-600" />
                    Modul Dipilih
                  </h3>
                  <div className="space-y-3">
                    {selectedModules.map((id, i) => {
                      const mod = modules.find(m => m.id === id);
                      return (
                        <motion.div
                          key={id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + i * 0.05 }}
                          className="flex items-center gap-3 p-3 rounded-xl bg-blue-50"
                        >
                          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                            <mod.icon size={16} />
                          </div>
                          <span className="flex-1 font-medium text-slate-900 text-sm">{mod.label}</span>
                          <span className="text-sm font-bold text-blue-600">{mod.price}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="bg-white rounded-2xl border border-slate-200 p-6 mb-8"
                >
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Building size={18} className="text-blue-600" />
                    Data Diri
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {[
                      { label: 'Nama', value: form.nama },
                      { label: 'Bisnis', value: form.bisnis },
                      { label: 'Email', value: form.email },
                      { label: 'Telepon', value: form.telepon },
                    ].map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                      >
                        <span className="text-slate-400">{item.label}</span>
                        <p className="font-medium text-slate-900">{item.value || '-'}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <div className="flex justify-between">
                  <motion.button
                    onClick={() => paginate(-1)}
                    whileHover={{ x: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 text-slate-600 font-medium inline-flex items-center gap-2"
                  >
                    <ArrowLeft size={18} /> Kembali
                  </motion.button>
                  <motion.button
                    onClick={handleSubmit}
                    disabled={submitting}
                    whileHover={submitting ? {} : { scale: 1.05, boxShadow: "0 20px 60px rgba(37,99,235,0.4)" }}
                    whileTap={submitting ? {} : { scale: 0.95 }}
                    className="px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl font-bold text-lg inline-flex items-center gap-2 shadow-xl shadow-blue-600/25 min-w-[180px] justify-center"
                  >
                    {submitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <>
                        Kirim Simulasi
                        <Send size={18} />
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Step labels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-between mt-12"
        >
          {steps.map((s, i) => (
            <motion.button
              key={i}
              onClick={() => i <= step && setStep([i, i > step ? 1 : -1])}
              className={`flex flex-col items-center gap-1.5 text-xs font-medium transition-colors ${i <= step ? 'text-blue-600' : 'text-slate-300'}`}
              whileHover={i <= step ? { y: -2 } : {}}
            >
              <motion.div
                animate={i === step ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  i < step
                    ? 'bg-blue-600 text-white'
                    : i === step
                    ? 'bg-blue-100 text-blue-600 border-2 border-blue-600'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {i < step ? <Check size={14} /> : <s.icon size={14} />}
              </motion.div>
              {s.label}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
