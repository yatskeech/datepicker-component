import { type MouseEvent, useEffect, useState } from 'react';

export function usePopover() {
  const [isOpen, setIsOpen] = useState(false);

  const handleInnerClick = (e: MouseEvent) => e.stopPropagation();

  useEffect(() => {
    const handleOutsideClick = () => setIsOpen(false);
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return { isOpen, setIsOpen, handleInnerClick };
}
