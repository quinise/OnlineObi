import React from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  as?: React.ElementType;
  className?: string;
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
  ({ variant = "primary", size = "md", className = "", as, children, ...rest }, ref) => {
    const Component: any = as || "button";
    const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim();
    return (
      <Component ref={ref} className={cls} {...rest}>
        {children}
      </Component>
    );
  }
);

Button.displayName = "Button";
export default Button;
