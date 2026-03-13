import React from "react";

/**
 * A highly robust Markdown renderer for AI-generated reports.
 * Specifically engineered to strip raw tags like '##' and '**' from the visual output.
 */
export function SimpleMarkdown({ content }: { content: string }) {
  if (!content) return null;

  // 1. Normalize line endings and initial cleanup
  const safeContent = String(content)
    .replace(/\r\n/g, "\n")
    .trim();
  
  // 2. Split by any newline to process line-by-line
  const lines = safeContent.split("\n");
  
  return (
    <div className="markdown-renderer space-y-4">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        
        // Skip empty lines
        if (!trimmed) return <div key={idx} className="h-2" />;

        // --- Header Detection (Aggressive) ---
        // Matches any number of '#' at the start, handles optional spaces.
        const headerMatch = trimmed.match(/^(#+)\s*(.*)$/);
        if (headerMatch && headerMatch[1].length <= 4) {
          const depth = headerMatch[1].length;
          const text = headerMatch[2];
          
          // If no text, might just be a divider line or accidental tag
          if (!text) return null;

          const Tag = depth === 1 ? "h2" : depth === 2 ? "h3" : "h4";
          
          return (
            <Tag key={idx} className={`
              ${depth === 1 ? "text-2xl mt-8 mb-4 border-b border-border/60 pb-3" : depth === 2 ? "text-xl mt-6 mb-3 font-black" : "text-lg mt-4 mb-2 font-bold"}
              font-serif text-soft-black tracking-tight
            `}>
              {renderInlines(text)}
            </Tag>
          );
        }

        // --- List Detection ---
        // Matches '-', '*', '•', '+' at the start.
        const listMatch = trimmed.match(/^([-*•+])\s*(.*)$/);
        if (listMatch) {
          const text = listMatch[2];
          return (
            <div key={idx} className="pl-6 relative mb-3 text-[15px] text-soft-black/80 font-medium leading-relaxed tracking-tight">
              <span className="absolute left-0 top-[0.6em] w-1.5 h-1.5 rounded-full bg-maroon/40 shadow-sm" />
              {renderInlines(text)}
            </div>
          );
        }

        // --- Code Block Marker Handling ---
        if (trimmed.startsWith("```") || trimmed.startsWith("'''")) {
          return null;
        }

        // --- Fallback: Standard Paragraph ---
        // We still check for internal markers even if it's not a block-level match.
        return (
          <p key={idx} className="text-[15px] text-soft-black/80 font-medium leading-[1.8] tracking-tight mb-2">
            {renderInlines(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

/**
 * Robust inline parser to replace markdown symbols with styled components.
 */
function renderInlines(text: string) {
  if (!text) return "";

  // Split by bold, italic, and code markers.
  // Using global flag to ensure we catch all of them.
  const parts = text.split(/(\*\*.*?\*\*|_.*?_|`.*?`|'''.*?'''|```.*?```)/g);

  return parts.map((part, i) => {
    if (!part) return null;

    // Bold: **text**
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      const content = part.slice(2, -2);
      return (
        <strong key={i} className="text-maroon font-bold text-[1.02em]">
          {content}
        </strong>
      );
    }
    
    // Italic: _text_
    if (part.startsWith("_") && part.endsWith("_") && part.length > 2) {
      const content = part.slice(1, -1);
      return (
        <em key={i} className="italic font-medium text-soft-black/90">
          {content}
        </em>
      );
    }
    
    // Code blocks/snippets
    const isCode = (part.startsWith("`") && part.endsWith("`")) || 
                   (part.startsWith("'''") && part.endsWith("'''")) ||
                   (part.startsWith("```") && part.endsWith("```"));
    
    if (isCode) {
      const marker = part.startsWith("'''") ? "'''" : part.startsWith("```") ? "```" : "`";
      const cleanCode = part.slice(marker.length, -marker.length).trim();
      if (!cleanCode) return null;

      return (
        <code key={i} className="mx-1 px-1.5 py-0.5 rounded bg-maroon/[0.04] text-maroon font-mono text-[0.82em] border border-maroon/10 font-bold">
          {cleanCode}
        </code>
      );
    }
    
    // Plain text: fallback
    return part;
  });
}
