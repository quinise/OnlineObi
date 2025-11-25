import { motion } from "framer-motion";
import React from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  as?: React.ElementType;
  className?: string;
  /** If true, render a motion button with a simple hover scale animation */
  animateOnHover?: boolean;
  /** Hover scale factor when `animateOnHover` is enabled */
  hoverScale?: number;
}

const base = "inline-flex items-center justify-center font-medium rounded-md transition-transform disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2";
const variants: Record<Variant, string> = {
  primary: "bg-forrest text-ivory hover:bg-forrest/80 active:scale-95 shadow-md",
  secondary: "bg-white text-forrest border border-forrest/20 hover:bg-forrest/5",
  ghost: "bg-transparent text-forrest hover:bg-forrest/5",
};
const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const Button = React.forwardRef<any, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className = "",
      as,
      children,
      animateOnHover = true,
      hoverScale = 1.05,
      ...rest
    },
    ref
  ) => {
    const Component: any = as || "button";
    const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim();

    if (animateOnHover) {
      // Render a motion.button for a consistent micro-animation API
      return (
        <motion.button
          ref={ref}
          className={cls}
          whileHover={{ scale: hoverScale }}
          transition={{ type: "spring", stiffness: 300 }}
          {...(rest as any)}
        >
          {children}
        </motion.button>
      );
    }

    return (
      <Component ref={ref} className={cls} {...rest}>
        {children}
      </Component>
    );
  }
);

Button.displayName = "Button";
export default Button;
