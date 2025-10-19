const MARKDOWN_REGEX = /[_*~`>#-]/g;

export const stripMarkdown = (text: string): string => {
  return text.replace(/\[(.*?)\]\((.*?)\)/g, '$1').replace(MARKDOWN_REGEX, '');
};

export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength - 1).trimEnd()}…`;
};
