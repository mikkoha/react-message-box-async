import React, { useEffect, useRef } from "react";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import xml from "highlight.js/lib/languages/xml";
import "highlight.js/styles/atom-one-dark.css";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("xml", xml);

interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.removeAttribute("data-highlighted");
      hljs.highlightElement(ref.current);
    }
  }, [code]);

  return (
    <pre
      style={{
        margin: 0,
        borderRadius: "6px",
        overflow: "auto",
        fontSize: "0.82rem",
        lineHeight: 1.55,
      }}
    >
      <code ref={ref} className="language-javascript">
        {code}
      </code>
    </pre>
  );
};

export default CodeBlock;
