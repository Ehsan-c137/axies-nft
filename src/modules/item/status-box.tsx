interface IProps {
  icon: React.JSX.Element;
  count: number | string;
}

export default function ({ icon, count }: IProps) {
  return (
    <div className="items-center gap-2 flex px-2 py-1 rounded-full bg-[var(--accent)] color-[var(accent-foreground)]">
      {icon}
      {count}
    </div>
  );
}
