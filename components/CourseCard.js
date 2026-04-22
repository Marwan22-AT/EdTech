const CourseCard = ({ course, lang }) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-xl transition p-4 border border-gray-100">
      <img src={course.image} className="rounded-lg mb-4 h-40 w-full object-cover" />
      <h3 className="font-bold text-lg mb-2">
        {lang === 'ar' ? course.titleAr : course.titleEn}
      </h3>
      <div className="flex justify-between items-center mt-4">
        <span className="text-green-600 font-bold">
          {course.price === 0 ? "FREE" : `${course.price} EGP`}
        </span>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
          {lang === 'ar' ? 'عرض التفاصيل' : 'View Details'}
        </button>
      </div>
    </div>
  );
};
