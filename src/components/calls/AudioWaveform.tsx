import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface AudioWaveformProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onTimeUpdate: (time: number) => void;
}

const AudioWaveform = ({
  isPlaying,
  currentTime,
  duration,
  onTimeUpdate,
}: AudioWaveformProps) => {
  const waveformRef = useRef<HTMLDivElement>(null);

  // Generate random waveform data (replace with actual audio data)
  const waveformData = Array.from({ length: 100 }, () =>
    Math.random() * 0.8 + 0.2
  );

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        if (currentTime < duration) {
          onTimeUpdate(currentTime + 1);
        } else {
          onTimeUpdate(0);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isPlaying, currentTime, duration, onTimeUpdate]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progress = (currentTime / duration) * 100;

  return (
    <div className="space-y-2">
      <div
        ref={waveformRef}
        className="h-16 flex items-center gap-0.5 cursor-pointer relative"
        onClick={(e) => {
          if (waveformRef.current) {
            const rect = waveformRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = x / rect.width;
            onTimeUpdate(Math.floor(percentage * duration));
          }
        }}
      >
        {waveformData.map((height, index) => {
          const isFilled = (index / waveformData.length) * 100 <= progress;
          return (
            <motion.div
              key={index}
              initial={{ height: '20%' }}
              animate={{ height: `${height * 100}%` }}
              className={`flex-1 rounded-full transition-colors ${
                isFilled
                  ? 'bg-gradient-to-t from-blue-500 to-purple-500'
                  : 'bg-gray-600'
              }`}
              style={{
                minWidth: '2px',
                maxWidth: '4px',
              }}
            />
          );
        })}
        <motion.div
          className="absolute bottom-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20"
          layoutId="waveform-progress"
        />
      </div>
      <div className="flex justify-between text-sm text-gray-400">
        <div>{formatTime(currentTime)}</div>
        <div>{formatTime(duration)}</div>
      </div>
    </div>
  );
};

export default AudioWaveform;
