'use client';

import { useState, useEffect, useRef } from 'react';

interface VideoBackgroundProps {
  videos: string[];
  className?: string;
  children?: React.ReactNode;
}

export default function VideoBackground({ videos, className = '', children }: VideoBackgroundProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoaded(true);
      setHasError(false);
    };

    const handleError = () => {
      console.warn(`Failed to load video: ${videos[currentVideoIndex]}`);
      setHasError(true);
      // Переходимо до наступного відео при помилці
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    const handleEnded = () => {
      // Переходимо до наступного відео
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    const handleCanPlay = () => {
      // Автоматично запускаємо відтворення
      video.play().catch(console.warn);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [currentVideoIndex, videos]);

  useEffect(() => {
    // Скидаємо стани при зміні відео
    setIsLoaded(false);
    setHasError(false);
  }, [currentVideoIndex]);

  // Fallback фон якщо відео не завантажилося
  const fallbackStyle = {
    background: 'linear-gradient(135deg, #008E4E 0%, #006B3A 100%)'
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Video Background */}
      {!hasError && videos.length > 0 && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop={false}
          playsInline
          preload="metadata"
          key={currentVideoIndex} // Ключ для примусового перезавантаження відео
        >
          <source src={videos[currentVideoIndex]} type="video/mp4" />
          Ваш браузер не підтримує відео.
        </video>
      )}
      
      {/* Fallback background */}
      {hasError && (
        <div 
          className="absolute inset-0 w-full h-full"
          style={fallbackStyle}
        ></div>
      )}
      
      {/* Overlay для кращої читабельності тексту */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Loading indicator */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
