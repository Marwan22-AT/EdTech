/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  LogOut, 
  BookOpen, 
  ShieldCheck, 
  Gamepad2, 
  Palette, 
  Megaphone, 
  Camera, 
  LifeBuoy, 
  ChevronRight, 
  ArrowRight,
  Facebook,
  LogIn
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Language, COURSES, TRANSLATIONS, Course } from './constants';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// --- Components ---

const AIChat = ({ lang, onClose }: { lang: Language, onClose: () => void }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const isRtl = lang === 'ar';
  const t = TRANSLATIONS[lang];

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          { role: 'user', parts: [{ text: userMsg }] }
        ],
        config: {
          systemInstruction: `You are an educational assistant for "EdTech", a platform offering courses in: ${COURSES.map(c => c.title.en).join(', ')}. 
          Help users find courses, explain benefits, and be encouraging. 
          Use the same language as the user (${lang}). 
          Keep answers concise and friendly. If they ask about prices, mention they are in EGP and some are free.`,
        }
      });
      
      const aiText = response.text || (lang === 'en' ? "I'm sorry, I couldn't process that." : "عذراً، لم أتمكن من معالجة ذلك.");
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: lang === 'en' ? "Error connecting to AI." : "خطأ في الاتصال بالذكاء الاصطناعي." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 left-6 sm:left-auto sm:w-96 z-50 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col h-[500px]"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <div className="p-4 bg-indigo-600 text-white flex justify-between items-center rounded-t-3xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">✨</div>
            <span className="font-bold">{lang === 'en' ? 'AI Tutor' : 'معلم الذكاء الاصطناعي'}</span>
          </div>
          <button onClick={onClose} className="hover:bg-white/10 p-1 rounded-lg">✕</button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-10 text-gray-400 font-medium">
              {lang === 'en' ? 'Ask me anything about our courses!' : 'اسألني أي شيء عن دوراتنا!'}
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm font-medium ${
                m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-2xl flex gap-1">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-100 flex gap-2">
          <input 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            placeholder={lang === 'en' ? 'Type a message...' : 'اكتب رسالة...'}
            className="flex-grow px-4 py-2 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium"
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            <ArrowRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const Navbar = ({ 
  lang, 
  setLang, 
  onLogout, 
  onSupport 
}: { 
  lang: Language; 
  setLang: (l: Language) => void; 
  onLogout: () => void;
  onSupport: () => void;
}) => {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center" id="main-nav">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.reload()}>
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">E</div>
        <span className="text-2xl font-black tracking-tight text-indigo-900">EdTech</span>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button 
            onClick={() => setLang('en')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${lang === 'en' ? 'bg-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            English
          </button>
          <button 
            onClick={() => setLang('ar')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${lang === 'ar' ? 'bg-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            العربية
          </button>
        </div>
        <button 
          onClick={onSupport}
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
          id="support-nav-btn"
        >
          {lang === 'en' ? 'Help Center' : 'مركز المساعدة'}
        </button>
        <button 
          onClick={onLogout}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-red-600"
          id="logout-btn"
          title={t.logout}
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};

const CourseCard: React.FC<{ course: Course; lang: Language; variant?: 'featured' | 'small' | 'standard' }> = ({ course, lang, variant = 'standard' }) => {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';
  
  const getCategoryIcon = (cat: string) => {
    switch(cat) {
      case 'Marketing': return <Megaphone className="w-4 h-4" />;
      case 'Development': return <Gamepad2 className="w-4 h-4" />;
      case 'Design': return <Palette className="w-4 h-4" />;
      case 'Creation': return <Camera className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  if (variant === 'featured') {
    return (
      <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="col-span-1 md:col-span-2 row-span-2 bg-indigo-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col justify-end group shadow-xl"
        id={`course-${course.id}`}
      >
        <div className={`absolute top-6 ${isRtl ? 'left-6' : 'right-6'} px-3 py-1 bg-indigo-500/30 backdrop-blur-md border border-indigo-400/30 rounded-full text-[10px] font-bold uppercase tracking-widest`}>
          {lang === 'en' ? 'Best Seller' : 'الأكثر مبيعاً'}
        </div>
        
        <img 
          src={course.image} 
          alt={course.title[lang]} 
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay transition-transform duration-700 group-hover:scale-105"
        />

        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">{course.title[lang]}</h2>
          <p className="text-indigo-200 mb-8 max-w-md font-medium leading-relaxed">{course.description[lang]}</p>
          <div className="flex items-center gap-6">
            <span className="text-3xl font-black">{course.price === 0 ? t.free : `${course.price.toLocaleString()} ${t.egp}`}</span>
            {course.price > 0 && (
              <span className="px-4 py-1.5 bg-indigo-500 text-[10px] font-black rounded-full uppercase tracking-widest text-indigo-100">
                {lang === 'en' ? 'Limited Offer' : 'عرض محدود'}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group h-full`}
      id={`course-${course.id}`}
    >
      <div className="flex justify-between items-start mb-6">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
          course.category === 'Marketing' ? 'bg-amber-50 text-amber-600' : 
          course.category === 'Development' ? 'bg-indigo-50 text-indigo-600' :
          course.category === 'Design' ? 'bg-pink-50 text-pink-600' : 'bg-slate-50 text-slate-600'
        }`}>
          {getCategoryIcon(course.category)}
        </div>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          {course.price === 0 ? t.free : `${course.price.toLocaleString()} ${t.egp}`}
        </span>
      </div>

      <div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">{t.categories[course.category]}</span>
        <h3 className="font-black text-lg leading-tight text-slate-900 group-hover:text-indigo-600 transition-colors">{course.title[lang]}</h3>
        {variant !== 'small' && <p className="text-sm text-slate-500 mt-2 line-clamp-2">{course.description[lang]}</p>}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">{course.duration[lang]} • {course.level[lang]}</span>
        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
          {isRtl ? <ChevronRight className="w-4 h-4 rotate-180" /> : <ChevronRight className="w-4 h-4" />}
        </div>
      </div>
    </motion.div>
  );
};

const SupportModal = ({ lang, onClose }: { lang: Language; onClose: () => void }) => {
  const t = TRANSLATIONS[lang];
  const [sent, setSent] = useState(false);
  const isRtl = lang === 'ar';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(onClose, 2500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden p-8 sm:p-10"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-2">{t.support}</h2>
            <p className="text-gray-500 font-medium">{t.supportSubtitle}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2">✕</button>
        </div>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div 
              key="sent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.messageSent}</h3>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">{t.name}</label>
                <input required className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium" placeholder="Ahmed Ali" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">{t.email}</label>
                <input required type="email" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium" placeholder="alex@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">{t.message}</label>
                <textarea required rows={4} className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium resize-none" />
              </div>
              <button 
                type="submit"
                className="w-full py-5 bg-indigo-600 text-white font-black text-lg rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200/50"
              >
                {t.send}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// --- Main Pages ---

const LandingPage = ({ lang, setLang, onAuth }: { lang: Language; setLang: (l: Language) => void; onAuth: (guest: boolean) => void }) => {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  return (
    <div className="flex flex-col h-screen w-full bg-slate-50 font-sans text-slate-900 relative overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Background Preview (Blurred) */}
      <div className="p-8 grid grid-cols-2 md:grid-cols-4 gap-4 flex-grow filter blur-lg opacity-40 pointer-events-none">
        <div className="col-span-2 row-span-2 bg-indigo-900 rounded-[2.5rem]" />
        <div className="bg-white border border-slate-200 rounded-[2rem]" />
        <div className="bg-indigo-50 border border-indigo-100 rounded-[2rem]" />
        <div className="bg-white border border-slate-200 rounded-[2rem]" />
        <div className="bg-white border border-slate-200 rounded-[2rem]" />
      </div>

      {/* Login Overlay / Modal */}
      <div className="absolute inset-0 z-20 flex items-center justify-center backdrop-blur-md bg-white/40 p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-white w-full max-w-[420px] rounded-[40px] shadow-2xl p-10 flex flex-col items-center border border-slate-100"
        >
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-200">
             <LogIn className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-2 leading-tight">{t.loginTitle}</h1>
          <p className="text-slate-500 text-center mb-8 px-4 font-medium">{t.loginSubtitle}</p>

          <div className="w-full space-y-3">
            <button 
              onClick={() => onAuth(false)}
              className="w-full flex items-center justify-center gap-3 py-3.5 border border-slate-200 rounded-2xl hover:bg-slate-50 font-bold text-slate-700 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.928 4.176-1.288 1.288-3.136 2.44-6.392 2.44-5.104 0-9.152-4.144-9.152-9.248 0-5.104 4.048-9.248 9.152-9.248 2.768 0 4.856 1.08 6.328 2.48l2.304-2.304C18.664 1.24 16.032 0 12.48 0 5.864 0 0 5.384 0 12s5.864 12 12.48 12c3.576 0 6.328-1.184 8.648-3.576 2.392-2.392 3.152-5.736 3.152-8.312 0-.808-.064-1.584-.192-2.304h-11.6z"/>
              </svg>
              {lang === 'en' ? 'Continue with Google' : 'الدخول باستخدام جوجل'}
            </button>
            <button 
              onClick={() => onAuth(false)}
              className="w-full flex items-center justify-center gap-3 py-3.5 bg-[#1877F2] text-white rounded-2xl hover:bg-[#166fe5] font-bold transition-all shadow-sm"
            >
              <Facebook className="w-5 h-5 fill-current" />
              {lang === 'en' ? 'Continue with Facebook' : 'الدخول باستخدام فيسبوك'}
            </button>
            
            <div className="flex items-center my-6">
              <div className="flex-grow h-[1px] bg-slate-100"></div>
              <span className="px-4 text-[10px] font-black text-slate-300 uppercase tracking-widest">OR</span>
              <div className="flex-grow h-[1px] bg-slate-100"></div>
            </div>

            <button 
              onClick={() => onAuth(true)}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:shadow-xl hover:translate-y-[-2px] transition-all"
            >
              {t.guestLogin}
            </button>
          </div>

          <p className="mt-8 text-[10px] text-slate-400 font-bold uppercase tracking-widest">EdTech Platform © 2026</p>
        </motion.div>
      </div>

      {/* Footer bar matches design */}
      <footer className="absolute bottom-0 left-0 right-0 px-8 py-4 bg-white border-t border-slate-200 flex justify-between items-center text-[10px] uppercase font-black tracking-widest text-slate-400 z-10">
        <div className="hidden sm:flex gap-6">
          <span>Digital Marketing</span>
          <span>Digital Creator</span>
          <span>Game Dev</span>
          <span>Animation</span>
        </div>
        <div className="text-indigo-600">Bento Grid Design System • Active Session</div>
      </footer>
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('ar'); // Default to Arabic as requested
  const [user, setUser] = useState<{ isGuest: boolean } | null>(null);
  const [showAI, setShowAI] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [category, setCategory] = useState<string>('All');
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  const categories = ['All', 'Marketing', 'Development', 'Design', 'Creation'];

  const filteredCourses = category === 'All' 
    ? COURSES 
    : COURSES.filter(c => c.category === category);

  if (!user) {
    return <LandingPage lang={lang} setLang={setLang} onAuth={(isGuest) => setUser({ isGuest })} />;
  }

  return (
    <div className={`min-h-screen bg-slate-50 font-sans`} dir={isRtl ? 'rtl' : 'ltr'}>
      <Navbar lang={lang} setLang={setLang} onLogout={() => setUser(null)} onSupport={() => setShowSupport(true)} />
      
      <main className="pt-28 pb-20 px-6 sm:px-10 lg:px-12 max-w-[1440px] mx-auto">
        {/* Header Section */}
        <header className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <motion.h1 
              initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight tracking-tight"
            >
              {t.explore}
            </motion.h1>
            
            <div className="flex flex-wrap gap-2" id="category-filters">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                    category === cat 
                    ? 'bg-indigo-600 text-white shadow-lg' 
                    : 'bg-white text-slate-500 hover:bg-white border border-slate-200'
                  }`}
                >
                  {cat === 'All' ? t.allCourses : t.categories[cat as keyof typeof t.categories]}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Content Bento Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
          id="course-grid"
        >
          <AnimatePresence mode='popLayout'>
            {filteredCourses.map((course, idx) => {
              // Create the Bento pattern: first one is Large, others are standard or small
              const variant = idx === 0 && category === 'All' ? 'featured' : (idx % 3 === 0 ? 'standard' : 'standard');
              return (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  lang={lang} 
                  variant={variant}
                />
              );
            })}
            
            {/* Technical Support Bento Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="col-span-1 md:col-span-2 bg-white rounded-[2.5rem] p-8 border-2 border-dashed border-slate-200 flex flex-col sm:flex-row items-center gap-8 group"
            >
              <div className="p-5 bg-slate-50 rounded-[2rem] group-hover:bg-indigo-50 transition-colors">
                <LifeBuoy className="w-10 h-10 text-slate-400 group-hover:text-indigo-600" />
              </div>
              <div className={isRtl ? 'text-right' : 'text-left'}>
                <h4 className="text-xl font-black text-slate-900 mb-1">{lang === 'en' ? 'Need Technical Support?' : 'هل تحتاج لخدمة الدعم؟'}</h4>
                <p className="text-sm text-slate-500 font-medium">{lang === 'en' ? 'Available 24/7 for our students and guests.' : 'متاح ٢٤/٧ لطلابنا وزوارنا.'}</p>
              </div>
              <button 
                onClick={() => setShowSupport(true)}
                className={`sm:ml-auto ${isRtl ? 'sm:mr-auto sm:ml-0' : ''} bg-slate-900 text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 hover:shadow-xl transition-all active:scale-95`}
              >
                {t.contactUs}
              </button>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Floating AI Button */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowAI(!showAI)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-2xl z-40 hover:bg-indigo-700 transition-colors"
        id="ai-fab"
      >
        <span className="text-2xl font-bold flex items-center justify-center">✨</span>
      </motion.button>

      <AnimatePresence>
        {showAI && <AIChat lang={lang} onClose={() => setShowAI(false)} />}
        {showSupport && <SupportModal lang={lang} onClose={() => setShowSupport(false)} />}
      </AnimatePresence>

      <footer className="py-8 bg-white border-t border-slate-200 px-8 sm:px-12 flex justify-between items-center text-[10px] uppercase font-black tracking-widest text-slate-400">
        <div className="hidden sm:flex gap-6">
          <span>{lang === 'en' ? 'Digital Marketing' : 'التسويق الرقمي'}</span>
          <span>{lang === 'en' ? 'Game Dev' : 'تطوير الألعاب'}</span>
        </div>
        <div className="text-indigo-600 font-bold">{lang === 'en' ? '40% Budget Design System • High Performance' : 'نظام تصميم بلس • أداء عالي'}</div>
      </footer>
    </div>
  );
}
