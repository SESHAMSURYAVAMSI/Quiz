interface Props {
  time: number;
}

const Timer = ({ time }: Props) => {
  return (
    <div className="rounded-2xl bg-red-500/20 px-5 py-3 text-lg font-bold text-red-300">
      ⏳ {time}s
    </div>
  );
};

export default Timer;