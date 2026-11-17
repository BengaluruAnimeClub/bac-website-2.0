import React from "react";
import { BLOCKS } from "@contentful/rich-text-types";
import { getNodeText, slugify } from "@/lib/utils";

export const renderHeading = (Tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') => {
  return (node: any, children: any) => {
    const text = getNodeText(node);
    const id = slugify(text);
    return (
      <Tag id={id || undefined} className="group scroll-mt-20">
        {children}
        {id && (
          <a
            href={`#${id}`}
            className="ml-2 opacity-0 group-hover:opacity-60 transition-opacity text-muted-foreground no-underline hover:text-foreground select-none"
            aria-label={`Link to "${text}"`}
          >
            #
          </a>
        )}
      </Tag>
    );
  };
};

export const headingRenderNodes = {
  [BLOCKS.HEADING_1]: renderHeading('h1'),
  [BLOCKS.HEADING_2]: renderHeading('h2'),
  [BLOCKS.HEADING_3]: renderHeading('h3'),
  [BLOCKS.HEADING_4]: renderHeading('h4'),
  [BLOCKS.HEADING_5]: renderHeading('h5'),
  [BLOCKS.HEADING_6]: renderHeading('h6'),
};
