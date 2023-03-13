import React, { ReactElement } from "react";
import "./AnimatedBox.scss";

export default function AnimatedBox({
  children,
  delay,
}: {
  children: ReactElement;
  delay: number;
}) {
  return (
    <div className="animated-box" style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}
