import React, { useRef, useEffect, useState } from "react";
import { Text } from "@/ui/atoms";
import { Tooltip } from "@/ui/atoms";

interface TextWithTooltipProps extends React.ComponentProps<typeof Text> {
  children: string;
}

function TextWithTooltip({ children, ...textProps }: TextWithTooltipProps) {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current) {
        const textElement = containerRef.current.querySelector("p");
        if (textElement) {
          const isTextOverflowing =
            textElement.scrollWidth > textElement.clientWidth;
          setIsOverflowing(isTextOverflowing);
        }
      }
    };

    checkOverflow();

    const observer = new ResizeObserver(checkOverflow);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [children]);

  if (isOverflowing) {
    return (
      <Tooltip content={children}>
        <div ref={containerRef}>
          <Text {...textProps}>{children}</Text>
        </div>
      </Tooltip>
    );
  }

  return (
    <div ref={containerRef}>
      <Text {...textProps}>{children}</Text>
    </div>
  );
}

export default TextWithTooltip;
