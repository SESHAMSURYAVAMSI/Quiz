interface Props {
  quizTitle: string;

  score: number;

  totalQuestions: number;

  createdAt: string;
}

const HistoryCard = ({
  quizTitle,
  score,
  totalQuestions,
  createdAt,
}: Props) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      
      <div className="flex items-center justify-between">
        
        <div>
          <h2 className="text-2xl font-bold text-white">
            {quizTitle}
          </h2>

          <p className="mt-2 text-gray-400">
            {new Date(
              createdAt
            ).toLocaleDateString()}
          </p>
        </div>

        <div className="text-right">
          
          <h3 className="text-3xl font-black text-purple-400">
            {score}/{totalQuestions}
          </h3>

          <p className="text-gray-400">
            Score
          </p>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;