// components/ui/toast.ts
import React from 'react';

export type ToastActionElement = React.ReactNode;

export type ToastProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  onOpenChange?: (open: boolean) => void; // Ensure this is defined
};
