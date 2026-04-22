const Checkout = ({ course }) => {
  return (
    <div className="max-w-xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6 text-right">إتمام الدفع</h2>
      <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed">
        <p className="flex justify-between mb-4">
          <span>اسم الكورس:</span>
          <span>{course.titleAr}</span>
        </p>
        <p className="flex justify-between text-xl font-bold border-t pt-4">
          <span>الإجمالي:</span>
          <span className="text-blue-600">{course.price} ج.م</span>
        </p>
      </div>
      {/* واتساب خدمة العملاء */}
      <a href="https://wa.me/yournumber" className="mt-8 block text-center text-green-600 underline">
        تحتاج مساعدة؟ تواصل معنا عبر واتساب
      </a>
    </div>
  );
};
