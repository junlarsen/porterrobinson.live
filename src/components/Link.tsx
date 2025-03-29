import { Link as TSRLink } from "@tanstack/react-router";
import clsx from "clsx";
import type {
  ComponentPropsWithoutRef,
  ElementType,
  PropsWithChildren,
} from "react";

export type LinkProps<E extends ElementType = typeof TSRLink> =
  PropsWithChildren & {
    element?: E;
    className?: string;
  } & ComponentPropsWithoutRef<E>;

export function Link<E extends ElementType = typeof TSRLink>({
  element,
  className,
  children,
  ...props
}: LinkProps<E>) {
  const Component = element ?? TSRLink;
  const classes = clsx(
    "text-black transition-colors duration-150 hover:text-pink-10",
    className,
  );
  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
