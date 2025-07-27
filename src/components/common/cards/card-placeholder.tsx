export default function CardPlaceholder() {
  return (
    <div className="flex flex-col justify-between gap-3 h-[485px] w-[306px] rounded-4xl p-4 bg-[var(--card)]">
      <div className="flex flex-col gap-3">
        <div className="w-full h-[284px] max-w-[274px] rounded-4xl bg-[var(--ring)] animate-pulse"></div>
        <p className="w-full h-6 bg-[var(--ring)] animate-pulse rounded-md"></p>
        <div className="h-12 w-full animate-pulse bg-[var(--ring)] rounded-md"></div>
      </div>
      <div className="h-12 w-full animate-pulse bg-[var(--ring)] rounded-md"></div>
    </div>
  );
}
