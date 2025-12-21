export const QuizContent = () => (
  <div className="bg-white p-10 rounded-[40px] shadow-lg text-center border-b-8 border-slate-200">
    <div className="text-6xl mb-6">🐘</div>
    <h3 className="text-3xl font-black mb-8 text-slate-800 italic">"Elephant" nghĩa là gì?</h3>
    <div className="grid grid-cols-2 gap-4">
      {['Con Hổ', 'Con Voi', 'Con Mèo', 'Con Chó'].map((ans) => (
        <button key={ans} className="bg-blue-100 hover:bg-blue-500 hover:text-white p-6 rounded-3xl text-2xl font-bold transition-all text-blue-700 border-b-4 border-blue-200 active:translate-y-1">
          {ans}
        </button>
      ))}
    </div>
  </div>
);
