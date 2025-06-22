import React from 'react';

const Modal: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      {children}
    </div>
  );
};

export default Modal;
