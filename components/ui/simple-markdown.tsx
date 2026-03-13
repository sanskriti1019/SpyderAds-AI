import React from "react";

/**
 * A highly robust, regex-powered Markdown renderer for AI-generated reports.
 * Processes line-by-line to handle irregular spacing and mashed blocks.
 */
export function SimpleMarkdown({ content }: { content: string }) {
  if (!content) return null;

  // Ensure we are working with a string
  const safeContent = String(content);
  
  // Split by line to handle everything as a stream
  const lines = safeContent.split("\n");
  
  return (
    <div className="markdown-renderer space-y-3">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        
        // Skip empty lines or render as spacer
        if (!trimmed) return <div key={idx} className="h-1" />;

        // 1. Horizontal Rules
        if (trimmed === "---") {
          return <div key={idx} className="h-px bg-border/40 w-full my-6" />;
        }

        // 2. Headings (Support #, ##, ### with or without spaces)
        const headerMatch = trimmed.match(/^(#{1,4})\s*(.*)$/);
        if (headerMatch) {
          const depth = headerMatch[1].length;
          const text = headerMatch[2];
          const Tag = depth === 1 ? "h2" : depth === 2 ? "h3" : "h4";
          
          return (
            <Tag key={idx} className={`
              ${depth === 1 ? "text-2xl mt-10 mb-5" : depth === 2 ? "text-xl mt-8 mb-4 font-black" : "text-lg mt-6 mb-3 font-bold"}
              font-serif text-soft-black tracking-tight
              ${depth <= 2 ? "border-b border-maroon/10 pb-2" : ""}
            `}>
              {renderInlines(text)}
            </Tag>
          );
        }

        // 3. List Items (Detect -, *, •, + followed by optional space)
        const listMatch = trimmed.match(/^[-*•+]\s*(.*)$/);
        
        if (listMatch) {
          const text = listMatch[1];
          return (
            <div key={idx} className="pl-6 relative mb-2 text-[15px] text-soft-black/80 font-medium leading-relaxed tracking-tight">
              <span className="absolute left-0 top-[0.6em] w-1.5 h-1.5 rounded-full bg-maroon/40" />
              {renderInlines(text)}
            </div>
          );
        }

        // 4. Fallback: Regular Paragraph
        return (
          <p key={idx} className="text-[15px] text-soft-black/80 font-medium leading-[1.8] tracking-tight mb-2">
            {renderInlines(line)}
          </p>
        );
      })}
    </div>
  );
}

/**
 * Robust inline parser for bold (**), italics (_), and code snippets (`, ''', ```).
 */
function renderInlines(text: string) {
  if (!text) return "";

  // Split by supported markers
  // We include backticks, triple quotes, and bold/italic markers
  const parts = text.split(/(\*\*.*?\*\*|_.*?_|`.*?`|'''.*?'''|```.*?```)/);

  return parts.map((part, i) => {
    // Bold
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-maroon font-bold text-[1.02em]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    
    // Italic
    if (part.startsWith("_") && part.endsWith("_")) {
      return (
        <em key={i} className="italic font-medium text-soft-black opacity-90">
          {part.slice(1, -1)}
        </em>
      );
    }
    
    // Code blocks / snippets (Handle all variations)
    const isCode = (part.startsWith("`") && part.endsWith("`")) || 
                   (part.startsWith("'''") && part.endsWith("'''")) ||
                   (part.startsWith("```") && part.endsWith("```"));
    
    if (isCode) {
      const marker = part.startsWith("```") ? "```" : part.startsWith("'''") ? "'''" : "`";
      const cleanCode = part.slice(marker.length, -marker.length).trim();
      
      return (
        <code key={i} className="mx-1 px-1.5 py-0.5 rounded bg-maroon/[0.04] text-maroon font-mono text-[0.82em] border border-maroon/10 font-bold whitespace-pre-wrap">
          {cleanCode}
        </code>
      );
    }
    
    // Default text
    return part;
  });
}
