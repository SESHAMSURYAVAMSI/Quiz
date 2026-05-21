interface FloatingCardProps {
  title: string;
  value: string;
}

const FloatingCard = ({ title, value }: FloatingCardProps) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
      <h3 className="text-sm text-gray-400">{title}</h3>

      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
    </div>
  );
};

export default FloatingCard;