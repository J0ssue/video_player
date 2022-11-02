import { ReactNode } from "react";

interface SemanticHTMLType {
  children?: ReactNode;
  className?: string;
}

export const Header = ({ children, className }: SemanticHTMLType) => (
  <header className={className}>{children}</header>
);

export const Main = ({ children }: SemanticHTMLType) => <main>{children}</main>;

export const Container = ({ children, className }: SemanticHTMLType) => (
  <div className={className}>{children}</div>
);

export const Section = ({ children, className }: SemanticHTMLType) => (
  <section className={className}>{children}</section>
);
