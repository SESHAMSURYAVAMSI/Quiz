interface Props {
  progress: number;
}

const ProgressBar = ({ progress }: Props) => {
  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
      
      <div
        style={{ width: `${progress}%` }}
        className="h-full rounded-full bg-purple-500 transition-all"
      />
    </div>
  );
};

export default ProgressBar;