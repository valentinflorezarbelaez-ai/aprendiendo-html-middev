---
name: semantic-html
description: "Trigger: HTML semántico, estructura HTML, elementos semánticos. Write semantic HTML with proper structure and best practices."
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Activation Contract

Use this skill when:
- Creating or modifying HTML structure
- Choosing semantic elements over div soup
- Structuring document hierarchy (h1-h6, sections, articles)
- Improving accessibility and SEO through proper markup

Do not use this skill for:
- Simple text formatting (use inline elements)
- CSS styling decisions (this is about structure, not presentation)
- JavaScript functionality (focus on markup structure)

## Hard Rules

- Always use semantic elements when available (header, nav, main, article, section, aside, footer)
- Maintain proper heading hierarchy (h1 → h2 → h3, never skip levels)
- Use landmark roles for screen reader navigation
- Ensure every interactive element has accessible labels
- Never use divs where semantic elements exist

## Decision Gates

| Content Type | Semantic Element |
|--------------|------------------|
| Navigation links | `<nav>` |
| Main content area | `<main>` |
| Self-contained content | `<article>` |
| Thematic grouping | `<section>` |
| Page header | `<header>` |
| Page footer | `<footer>` |
| Sidebar/aside content | `<aside>` |
| Figure with caption | `<figure>` + `<figcaption>` |
| Time/date | `<time>` |
| Contact info | `<address>` |

## Execution Steps

1. Analyze content purpose and relationships
2. Choose appropriate semantic elements from decision gates
3. Establish heading hierarchy starting with single h1
4. Group related content with section/article
5. Add ARIA roles only when semantic elements insufficient
6. Verify landmark regions are present and properly nested
7. Ensure all images have alt text or decorative attribute
8. Validate HTML structure (no unclosed tags, proper nesting)

## Output Contract

Return:
- Semantic HTML structure with proper element choices
- Heading hierarchy validation
- Landmark region identification
- Accessibility considerations if applicable

## References

- MDN Web Docs: HTML elements reference
- WAI-ARIA Authoring Practices Guide
- HTML5 specification on semantic elements
