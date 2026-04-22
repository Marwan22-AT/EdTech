import React from 'react';
import { useTranslation } from 'react-i18next';

const Login = ({ onLogin, onGuest }) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-main">
      <div className="p-10 bg-white shadow-2xl rounded-2xl text-center w-full max-w-md">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">EdTech</h1>
        
        {/* زر جوجل */}
        <button className="w-full mb-4 flex items-center justify-center gap-3 border py-3 rounded-lg hover:bg-gray-50 transition">
          <img src="/google-icon.svg" className="w-6" alt="google" />
          {t('login_google')}
        </button>

        <div className="divider my-6 text-gray-400">OR</div>

        {/* دخول الضيف */}
        <button 
          onClick={onGuest}
          className="w-full py-3 text-blue-600 font-semibold hover:underline">
          {t('explore_guest')}
        </button>
      </div>
    </div>
  );
};
