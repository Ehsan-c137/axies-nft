import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  PropsWithChildren,
} from "react";

const TimerContext = createContext<number>(Date.now());

export function TimerProvider({ children }: PropsWithChildren) {
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <TimerContext.Provider value={currentTime}>
      {children}
    </TimerContext.Provider>
  );
}

export function useCountdown(endTime: number) {
  const currentTime = useContext(TimerContext);

  return useMemo(() => {
    const timeLeft = endTime - currentTime;

    if (timeLeft <= 0) {
      return {
        hasEnded: true,
        formattedString: "Auction Ended",
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const seconds = Math.floor((timeLeft / 1000) % 60);
    const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

    return {
      hasEnded: false,
      formattedString: `${days} : ${String(hours).padStart(2, "0")} : ${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`,
      days,
      hours,
      minutes,
      seconds,
    };
  }, [currentTime, endTime]);
}
