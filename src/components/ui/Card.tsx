import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  const isClickable = !!onClick;

  return (
    <div
      className={`
        bg-white rounded-lg shadow-md p-4 md:p-6
        ${isClickable ? 'cursor-pointer hover:shadow-lg transition-shadow duration-200 focus-within:ring-2 focus-within:ring-purple-500' : ''}
        ${className}
      `}
      onClick={onClick}
      onKeyDown={
        isClickable
          ? (e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      {children}
    </div>
  );
};

export default Card;
