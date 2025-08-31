import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

interface CounterProps {
  count: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

const Counter: React.FC<CounterProps> = ({
  count,
  suffix,
  prefix,
  duration = 2,
  className = "",
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className={className}>
      {inView && (
        <CountUp
          duration={duration}
          prefix={prefix}
          end={count}
          suffix={suffix}
          preserveValue
        />
      )}
    </div>
  );
};

export default Counter;
