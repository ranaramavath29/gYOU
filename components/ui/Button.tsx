import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "solid" | "outline" | "accent";
export type ButtonSize = "md" | "lg";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Optional icon. Decorative: the label carries the meaning. */
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = CommonProps & { href: string } & Omit<
    ComponentPropsWithoutRef<typeof Link>,
    keyof CommonProps | "href"
  >;

type NativeButtonProps = CommonProps & { href?: undefined } & Omit<
    ComponentPropsWithoutRef<"button">,
    keyof CommonProps
  >;

export type ButtonProps = LinkButtonProps | NativeButtonProps;

const variants: Record<ButtonVariant, string> = {
  solid:
    "bg-fg text-bg shadow-[inset_0_-2px_0_rgb(0_0_0/0.08)] hover:bg-white hover:shadow-[0_12px_32px_-12px_rgb(255_255_255/0.45)]",
  outline:
    "border border-line-strong bg-white/[0.02] text-fg backdrop-blur-sm hover:border-fg-subtle hover:bg-white/[0.07]",
  accent:
    "bg-accent text-ink shadow-[inset_0_-2px_0_rgb(0_0_0/0.1)] hover:bg-[#ddff75] hover:shadow-[0_14px_36px_-12px_rgb(214_255_92/0.6)]",
};

const sizes: Record<ButtonSize, string> = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-13 px-7 text-base",
};

function classes(variant: ButtonVariant, size: ButtonSize, className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2.5 rounded-full font-sans font-semibold whitespace-nowrap",
    "transition-[background-color,border-color,color,box-shadow,translate,scale] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] select-none",
    "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]",
    "[&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:translate-x-0.5 hover:[&_svg]:-translate-y-0.5",
    "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}

function Content({
  icon,
  iconPosition,
  children,
}: Pick<CommonProps, "icon" | "iconPosition" | "children">) {
  return (
    <>
      {icon && iconPosition === "start" ? icon : null}
      <span>{children}</span>
      {icon && iconPosition === "end" ? icon : null}
    </>
  );
}

/**
 * Pill button. Renders a Next.js Link when `href` is given, otherwise a <button>.
 * cn() does not merge conflicting utilities, so don't pass display classes
 * like "hidden" via className; control visibility with a wrapper instead.
 */
export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const {
      variant = "solid",
      size = "md",
      icon,
      iconPosition = "start",
      className,
      children,
      ...rest
    } = props;
    return (
      <Link {...rest} className={classes(variant, size, className)}>
        <Content icon={icon} iconPosition={iconPosition}>
          {children}
        </Content>
      </Link>
    );
  }
  const {
    variant = "solid",
    size = "md",
    icon,
    iconPosition = "start",
    className,
    children,
    type = "button",
    ...rest
  } = props;
  return (
    <button {...rest} type={type} className={classes(variant, size, className)}>
      <Content icon={icon} iconPosition={iconPosition}>
        {children}
      </Content>
    </button>
  );
}
