import {
  autoUpdate,
  flip,
  offset,
  useDismiss,
  useFloating,
  type UseFloatingReturn,
  useFocus,
  useInteractions,
  type UseInteractionsReturn,
} from '@floating-ui/react';
import { useState } from 'react';

import { OFFSET_POPOVER } from './constants';

type UsePopoverReturn = {
  refs: UseFloatingReturn['refs'];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  getReferenceProps: UseInteractionsReturn['getReferenceProps'];
  getFloatingProps: () => ReturnType<
    UseInteractionsReturn['getReferenceProps']
  > & { style: React.CSSProperties };
};

export function usePopover(): UsePopoverReturn {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom',
    middleware: [flip(), offset(OFFSET_POPOVER)],
    whileElementsMounted: autoUpdate,
  });

  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    focus,
    dismiss,
  ]);

  return {
    refs,
    isOpen,
    setIsOpen,
    getReferenceProps,
    getFloatingProps: () => ({ ...getFloatingProps(), style: floatingStyles }),
  };
}
