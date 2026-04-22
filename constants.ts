/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'ar';

export interface Course {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  price: number; // 0 for free
  category: 'Marketing' | 'Development' | 'Design' | 'Creation';
  image: string;
  level: { en: string; ar: string };
  duration: { en: string; ar: string };
}

export const COURSES: Course[] = [
  {
    id: '1',
    title: { en: 'Digital Marketing Masterclass', ar: 'احتراف التسويق الرقمي' },
    description: { en: 'Learn SEO, SEM, and Social Media Marketing from scratch.', ar: 'تعلم تحسين محركات البحث والتسويق عبر وسائل التواصل الاجتماعي من الصفر.' },
    price: 1500,
    category: 'Marketing',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    level: { en: 'Beginner', ar: 'مبتدئ' },
    duration: { en: '20 Hours', ar: '٢٠ ساعة' }
  },
  {
    id: '2',
    title: { en: 'Digital Creator Fundamentals', ar: 'أساسيات صناع المحتوى الرقمي' },
    description: { en: 'Master the art of content creation for YouTube and TikTok.', ar: 'أتقن فن صناعة المحتوى لمنصات يوتيوب وتيك توك.' },
    price: 0,
    category: 'Creation',
    image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=800&q=80',
    level: { en: 'Intermediate', ar: 'متوسط' },
    duration: { en: '15 Hours', ar: '١٥ ساعة' }
  },
  {
    id: '3',
    title: { en: 'Game Development with Unity', ar: 'تطوير الألعاب باستخدام Unity' },
    description: { en: 'Build your first 3D game using C# and Unity Engine.', ar: 'قم ببناء أول لعبة ثلاثية الأبعاد باستخدام C# ومحرك Unity.' },
    price: 2500,
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    level: { en: 'Advanced', ar: 'متقدم' },
    duration: { en: '40 Hours', ar: '٤٠ ساعة' }
  },
  {
    id: '4',
    title: { en: 'Professional Animation 2D/3D', ar: 'الرسوم المتحركة الاحترافية ٢D/٣D' },
    description: { en: 'Master the fundamentals of character animation.', ar: 'أتقن أساسيات تحريك الشخصيات.' },
    price: 1800,
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80',
    level: { en: 'Intermediate', ar: 'متوسط' },
    duration: { en: '30 Hours', ar: '٣٠ ساعة' }
  },
  {
    id: '5',
    title: { en: 'Game Design Principles', ar: 'مبادئ تصميم الألعاب' },
    description: { en: 'Understand mechanics, dynamics, and aesthetics in games.', ar: 'فهم الميكانيكا والديناميكا والجماليات في الألعاب.' },
    price: 1200,
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1552064336-26d5872848ee?auto=format&fit=crop&w=800&q=80',
    level: { en: 'Beginner', ar: 'مبتدئ' },
    duration: { en: '12 Hours', ar: '١٢ ساعة' }
  }
];

export const TRANSLATIONS = {
  en: {
    welcome: 'Welcome to EdTech',
    tagline: 'Unlock your potential with expert-led courses.',
    loginTitle: 'Sign In to EdTech',
    loginSubtitle: 'Start your learning journey today.',
    googleLogin: 'Sign in with Google',
    facebookLogin: 'Sign in with Facebook',
    guestLogin: 'Explore as Guest',
    explore: 'Explore Courses',
    allCourses: 'All Courses',
    free: 'Free',
    egp: 'EGP',
    support: 'Technical Support',
    supportSubtitle: 'How can we help you today?',
    contactUs: 'Contact Us',
    messageSent: 'Thank you! We will get back to you soon.',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    send: 'Send Message',
    logout: 'Logout',
    categories: {
      Marketing: 'Marketing',
      Development: 'Development',
      Design: 'Design',
      Creation: 'Creation'
    }
  },
  ar: {
    welcome: 'مرحباً بكم في إيد-تيك',
    tagline: 'أطلق العنان لإمكانياتك مع دورات يقدمها خبراء.',
    loginTitle: 'تسجيل الدخول إلى إيد-تيك',
    loginSubtitle: 'ابدأ رحلة التعلم الخاصة بك اليوم.',
    googleLogin: 'تسجيل الدخول باستخدام جوجل',
    facebookLogin: 'تسجيل الدخول باستخدام فيسبوك',
    guestLogin: 'استكشف كضيف',
    explore: 'استكشف الدورات',
    allCourses: 'جميع الدورات',
    free: 'مجاني',
    egp: 'جنية مصري',
    support: 'الدعم الفني',
    supportSubtitle: 'كيف يمكننا مساعدتك اليوم؟',
    contactUs: 'اتصل بنا',
    messageSent: 'شكراً لك! سنقوم بالرد عليك قريباً.',
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    message: 'الرسالة',
    send: 'إرسال الرسالة',
    logout: 'تسجيل الخروج',
    categories: {
      Marketing: 'تسويق',
      Development: 'تطوير',
      Design: 'تصميم',
      Creation: 'صناعة محتوى'
    }
  }
};
