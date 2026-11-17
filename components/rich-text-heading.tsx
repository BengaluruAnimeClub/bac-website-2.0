import React from "react";
import { BLOCKS } from "@contentful/rich-text-types";
import { getNodeText, slugify, cn } from "@/lib/utils";
import parse, { HTMLReactParserOptions, domToReact, attributesToProps } from "html-react-parser";

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

/**
 * Extracts plain text recursively from a DOM node parsed by html-react-parser.
 */
export function getDomNodeText(node: any): string {
  if (!node) return "";
  if (node.type === "text" && typeof node.data === "string") return node.data;
  if (Array.isArray(node.children)) {
    return node.children.map(getDomNodeText).join("");
  }
  return "";
}

/**
 * Options for html-react-parser that enhances h1-h6 tags with anchor IDs,
 * scroll margins, and hoverable permalink links.
 */
export const htmlParseOptions: HTMLReactParserOptions = {
  replace(domNode: any) {
    if (domNode && 'name' in domNode && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(domNode.name)) {
      const Tag = domNode.name as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
      const props = attributesToProps(domNode.attribs || {});
      const text = getDomNodeText(domNode);
      const id = (props.id as string) || slugify(text);
      const className = cn("group scroll-mt-20", props.className as string);
      const children = domToReact(domNode.children, htmlParseOptions);
      return (
        <Tag
          {...props}
          id={id || undefined}
          className={className}
        >
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
    }
  },
};

/**
 * Parses raw HTML string into React elements while making any headings (h1-h6)
 * hyperlinkable with URL-safe anchor IDs and permalinks.
 */
export function parseHtmlWithHeadings(html: string) {
  return parse(html, htmlParseOptions);
}
