import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const AuthBackground = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-sky-400 flex items-center justify-center p-4 relative overflow-hidden">
      <div
        className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-60 animate-bounce"
        style={{ animationDelay: '0s', animationDuration: '3s' }}
      />

      <div
        className="absolute top-1/3 right-12 w-16 h-16 bg-cyan-200 rounded-full opacity-50 animate-bounce"
        style={{ animationDelay: '0.5s', animationDuration: '4s' }}
      />

      <div
        className="absolute bottom-20 left-1/4 w-24 h-24 bg-sky-200 rounded-full opacity-40 animate-bounce"
        style={{ animationDelay: '1s', animationDuration: '3.5s' }}
      />

      <div
        className="absolute bottom-32 right-1/4 w-14 h-14 bg-blue-100 rounded-full opacity-50 animate-bounce"
        style={{ animationDelay: '0.3s', animationDuration: '4.5s' }}
      />

      <div
        className="absolute top-1/4 left-1/4 w-20 h-20 bg-indigo-200 rounded-full opacity-40 animate-bounce"
        style={{ animationDelay: '0.8s', animationDuration: '3.2s' }}
      />

      <div
        className="absolute top-30 right-1/4 w-28 h-28 bg-cyan-100 rounded-full opacity-30 animate-bounce"
        style={{ animationDelay: '1.4s', animationDuration: '5s' }}
      />

      <div
        className="absolute bottom-1/3 left-1/7 w-12 h-12 bg-indigo-200 rounded-full opacity-40 animate-bounce"
        style={{ animationDelay: '0.8s', animationDuration: '3.2s' }}
      />

      <div className="relative z-10 w-full flex justify-center">
        {children}
      </div>
    </div>
  );
};
