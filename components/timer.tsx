import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const timerProps = {
  isPlaying: true,
  size: 45,
  strokeWidth: 4,
};

export default function Timer({
  whenEnd, 
  keyID
}:{
  whenEnd: ()=> void;
  keyID: React.Key;
}) {
  
  return (
      <CountdownCircleTimer
         key={keyID}
         {...timerProps}
         colors="#0d6efd"
         duration={25}
         onComplete={() => ( 
         whenEnd(),{ shouldRepeat: true }
         )}
        >
        {({ remainingTime, color }) => (
          <span className="timer" style={{ color }}>{remainingTime}</span>
        )}
      </CountdownCircleTimer>
  );
}