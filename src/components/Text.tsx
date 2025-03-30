import clsx from "clsx";
import type {
  ComponentPropsWithRef,
  ElementType,
  PropsWithChildren,
} from "react";

export type TextProps<E extends ElementType = "p"> = PropsWithChildren & {
  element?: E;
  className?: string;
} & ComponentPropsWithRef<E>;

export function Text<E extends ElementType = "p">({
  element,
  className,
  children,
  ...props
}: TextProps<E>) {
  const Component = element ?? "p";
  const classes = clsx(className);
  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
