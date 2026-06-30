import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Clock, Users } from 'lucide-react';

const studies = [
  {
    client: 'Toko Fashion Muslim',
    owner: 'Budi Santoso',
    type: 'Retail Fashion — 3 Cabang',
    before: 'Stok sering mismatch antar cabang, laporan manual pakai Excel, pembukuan butuh 1 minggu.',
    after: 'Stok real-time multi-cabang, laporan otomatis, pembukuan selesai dalam 1 jam.',
    stats: [
      { icon: TrendingUp, label: 'Efisiensi Stok', value: '85%' },
      { icon: DollarSign, label: 'Peningkatan Omzet', value: '40%' },
      { icon: Clock, label: 'Hemat Waktu', value: '75%' },
    ],
  },
  {
    client: 'Distributor Makanan Ringan',
    owner: 'Siti Aminah',
    type: 'Distribusi F&B — 2 Gudang',
    before: 'Pemesanan via telepon/WA sering terlewat, invoice manual, pengiriman sering terlambat.',
    after: 'Sistem PO otomatis, invoice digital, tracking pengiriman real-time.',
    stats: [
      { icon: TrendingUp, label: 'Akurasi Pesanan', value: '98%' },
      { icon: DollarSign, label: 'Penghematan Biaya', value: '30%' },
      { icon: Users, label: 'Produktivitas Tim', value: '2x' },
    ],
  },
  {
    client: 'Jasa Logistik Lokal',
    owner: 'Reza Rahadian',
    type: 'Logistik — 4 Kota',
    before: 'Tracking masih manual via telepon, laporan pengiriman tidak akurat, customer komplain.',
    after: 'Tracking real-time, laporan otomatis, rating kepuasan meningkat drastis.',
    stats: [
      { icon: Clock, label: 'Ketepatan Waktu', value: '95%' },
      { icon: TrendingUp, label: 'Kepuasan Pelanggan', value: '90%' },
      { icon: DollarSign, label: 'Efisiensi Operasional', value: '50%' },
    ],
  },
];

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function CaseStudies() {
  return (
    <section id="portofolio" className="relative py-32 px-6 bg-white overflow-hidden">
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
            className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4"
          >
            PORTOFOLIO
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Hasil Nyata{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">Klien Kami</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Lihat bagaimana Bizmate membantu UMKM bertransformasi secara digital.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {studies.map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className="group rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 overflow-hidden hover:shadow-xl hover:border-blue-100 transition-all"
            >
              {/* Header */}
              <div className="p-6 bg-gradient-to-br from-blue-600 to-blue-400 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold text-lg"
                  >
                    {s.owner[0]}
                  </motion.div>
                  <div>
                    <p className="font-bold text-sm">{s.client}</p>
                    <p className="text-xs text-white/70">{s.type}</p>
                  </div>
                </div>
              </div>

              {/* Before vs After */}
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-1">Sebelum</p>
                  <p className="text-sm text-slate-500">{s.before}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Sesudah</p>
                  <p className="text-sm text-slate-700 font-medium">{s.after}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100">
                  {s.stats.map((stat, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + j * 0.1 }}
                      className="text-center"
                    >
                      <stat.icon size={16} className="mx-auto mb-1 text-blue-600" />
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.4 + j * 0.1 }}
                        className="text-lg font-black text-blue-600"
                      >
                        {stat.value}
                      </motion.div>
                      <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
