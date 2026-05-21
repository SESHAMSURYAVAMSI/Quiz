interface Props {
  question: string;
  options: string[];

  selectedAnswer: string;

  onSelect: (option: string) => void;
}

const QuestionCard = ({
  question,
  options,
  selectedAnswer,
  onSelect,
}: Props) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      
      <h2 className="text-3xl font-black text-white">
        {question}
      </h2>

      <div className="mt-8 grid gap-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(option)}
            className={`rounded-2xl border p-4 text-left transition
              
              ${
                selectedAnswer === option
                  ? "border-purple-500 bg-purple-500/20 text-white"
                  : "border-white/10 bg-white/5 text-white hover:bg-purple-500/10"
              }
            `}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;