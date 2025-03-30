import clsx from "clsx";
import type {
  ComponentPropsWithRef,
  ElementType,
  PropsWithChildren,
} from "react";

export type HeadingProps<E extends ElementType = "h1"> = PropsWithChildren & {
  element?: E;
  className?: string;
} & ComponentPropsWithRef<E>;

export function Heading<E extends ElementType = "h1">({
  element,
  className,
  children,
  ...props
}: HeadingProps<E>) {
  const Component = element ?? "h1";
  const classes = clsx(
    "uppercase tracking-tight text-xl lg:text-4xl",
    className,
  );
  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
