import * as React from "react";

export type ToastProps = {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: "default" | "destructive";
  action?: React.ReactNode;
};

export type ToastActionElement = React.ReactElement<any>;

export const ToastProvider: React.FC<{ children: React.ReactNode; duration?: number }> = ({ children }) => <>{children}</>;
export const ToastViewport: React.FC<any> = () => null;
export const Toast: React.FC<any> = () => null;
export const ToastTitle: React.FC<any> = () => null;
export const ToastDescription: React.FC<any> = () => null;
export const ToastClose: React.FC<any> = () => null;
export const ToastAction: React.FC<any> = () => null;
