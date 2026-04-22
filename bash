# 1. إنشاء المشروع
npm create vite@latest edtech-platform -- --template react-ts

# 2. الدخول للمشروع
cd edtech-platform

# 3. تثبيت التبعيات الأساسية
npm install

# 4. تثبيت Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 5. تثبيت المكتبات الإضافية
npm install react-router-dom framer-motion react-i18next i18next i18next-browser-languagedetector
npm install firebase react-firebase-hooks
npm install lucide-react
npm install -D gh-pages
