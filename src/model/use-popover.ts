import {
  autoUpdate,
  flip,
  offset,
  useDismiss,
  useFloating,
  useFocus,
  useInteractions,
} from '@floating-ui/react';
import { useState } from 'react';

import { OFFSET_POPOVER } from './constants';

export function usePopover() {
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
