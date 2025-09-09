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
  const [showFallback, setShowFallback] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Очищуємо попередній таймаут
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Встановлюємо таймаут для fallback (збільшуємо для великих файлів)
    timeoutRef.current = setTimeout(() => {
      if (!isLoaded) {
        setShowFallback(true);
      }
    }, 8000);

    const handleLoadedData = () => {
      setIsLoaded(true);
      setHasError(false);
      setShowFallback(false);
      // Очищуємо таймаут
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // Автоматично запускаємо відтворення після завантаження
      video.play().catch(console.warn);
    };

    const handleError = () => {
      console.warn(`Failed to load video: ${videos[currentVideoIndex]}`);
      setHasError(true);
      setShowFallback(true);
      // Очищуємо таймаут
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };

    const handleEnded = () => {
      // Переходимо до наступного відео
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    const handleCanPlay = () => {
      // Автоматично запускаємо відтворення
      video.play().catch(console.warn);
    };

    const handleLoadStart = () => {
      setIsLoaded(false);
      setShowFallback(false);
      setLoadingProgress(0);
    };

    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const duration = video.duration;
        if (duration > 0) {
          setLoadingProgress((bufferedEnd / duration) * 100);
        }
      }
    };

    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('progress', handleProgress);

    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('progress', handleProgress);
      // Очищуємо таймаут при cleanup
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentVideoIndex, videos, isLoaded]);

  useEffect(() => {
    // Скидаємо стани при зміні відео
    setIsLoaded(false);
    setHasError(false);
    setShowFallback(false);
    setLoadingProgress(0);
  }, [currentVideoIndex]);

  // Fallback фон якщо відео не завантажилося
  const fallbackStyle = {
    background: 'linear-gradient(135deg, #008E4E 0%, #006B3A 100%)',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  return (
    <div 
      className={`relative overflow-hidden ${className}`} 
      style={{ 
        height: '25vh',
        minHeight: '25vh',
        maxHeight: '25vh'
      }}
    >
      {/* Video Background */}
      {!hasError && !showFallback && videos.length > 0 && (
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
      {(hasError || showFallback) && (
        <div 
          className="absolute inset-0 w-full h-full"
          style={fallbackStyle}
        ></div>
      )}
      
      {/* Overlay для кращої читабельності тексту */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Loading indicator */}
      {!isLoaded && !hasError && !showFallback && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4"></div>
          <div className="text-white/80 text-sm">
            Завантаження відео... {Math.round(loadingProgress)}%
          </div>
          <div className="w-32 h-1 bg-white/20 rounded-full mt-2 overflow-hidden">
            <div 
              className="h-full bg-white/60 rounded-full transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
