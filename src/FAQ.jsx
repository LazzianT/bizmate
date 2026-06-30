import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'Berapa lama waktu pembuatan sistem ERP?',
    a: 'Tergantung kompleksitas, biasanya 2-4 minggu untuk paket Starter, 4-8 minggu untuk Business, dan 8-12 minggu untuk Enterprise. Kami memberikan timeline detail setelah sesi konsultasi.',
  },
  {
    q: 'Apakah data kami aman?',
    a: 'Tentu. Semua data terenkripsi dengan standar industri, backup otomatis setiap hari, dan server kami menggunakan infrastruktur cloud terpercaya dengan sertifikasi keamanan.',
  },
  {
    q: 'Bisa minta custom fitur?',
    a: 'Bisa! Kami selalu mendengarkan kebutuhan spesifik bisnis Anda. Untuk paket Enterprise, kami memberikan fleksibilitas penuh dalam penambahan fitur kustom.',
  },
  {
    q: 'Apakah ada biaya maintenance?',
    a: 'Biaya maintenance sudah termasuk di tahun pertama untuk semua paket. Setelah itu, ada biaya tahunan yang sangat terjangkau untuk update, support, dan maintenance server.',
  },
  {
    q: 'Bagaimana jika saya tidak punya tim IT?',
    a: 'Tidak masalah. Bizmate dirancang agar mudah digunakan tanpa latar belakang teknis. Kami juga menyediakan pelatihan untuk tim Anda dan support 24/7 via WhatsApp.',
  },
  {
    q: 'Apakah bisa integrate dengan aplikasi yang sudah ada?',
    a: 'Ya, Bizmate memiliki API integration yang bisa dihubungkan dengan aplikasi existing seperti marketplace, payment gateway, akuntansi, dan software lain yang Anda gunakan.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="relative py-32 px-6 bg-slate-50 overflow-hidden">
      <div className="max-w-3xl mx-auto">
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
            FAQ
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Pertanyaan{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">Umum</span>
          </h2>
          <p className="text-lg text-slate-500">
            Temukan jawaban atas pertanyaan yang sering diajukan.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-4"
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i}
              className={`rounded-2xl border overflow-hidden transition-all cursor-pointer ${
                open === i ? 'border-blue-200 bg-white shadow-lg shadow-blue-500/5' : 'border-slate-200 bg-white hover:border-blue-100 hover:shadow-md'
              }`}
            >
              <motion.button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full p-5 flex items-center justify-between text-left"
                whileHover={{ x: open === i ? 0 : 4 }}
                transition={{ duration: 0.2 }}
              >
                <span className="font-bold text-slate-900 pr-4">{faq.q}</span>
                <motion.div
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    open === i ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <Plus size={18} />
                </motion.div>
              </motion.button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-slate-500 leading-relaxed text-sm">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
