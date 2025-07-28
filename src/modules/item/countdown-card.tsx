import useTimer from "@/hooks/useTimer";

interface IProps {
  countdown: string;
}

export default function Countdown({ countdown }: IProps) {
  const { days, hours, minutes, seconds, message } = useTimer(countdown);
  const isExpired = message?.toLocaleLowerCase() === "expired";

  return (
    <div className="flex justify-items-center items-center justify-center lg:justify-between flex-1 bg-[var(--card)] text-[var(--card-foreground)] rounded-2xl px-6 py-2 h-[60px] md:h-[50px] not-dark:shadow-sm">
      <p className="font-semibold text-sm leading-1">Countdown</p>
      <div
        className={`flex font-bold leading-1 ${isExpired ? "opacity-50" : "opacity-100"}`}
        tabIndex={0}
        role="timer"
      >
        {days} : {hours} : {minutes} : {seconds}
      </div>
    </div>
  );
}
