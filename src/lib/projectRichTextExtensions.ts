import { mergeAttributes } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { isSafeRichTextImageSrc, isSafeRichTextLinkHref } from './projectRichTextSecurity';

export interface ProjectRichTextExtensionOptions {
  /** Public page: navigate on click; admin editor: false */
  openOnClick: boolean;
  autolink?: boolean;
  linkOnPaste?: boolean;
}

/** Shared StarterKit + Image + Link + TextAlign used by admin editor and ProjectDetail reader. */
export function createProjectRichTextExtensions(opts: ProjectRichTextExtensionOptions) {
  const { openOnClick, autolink = true, linkOnPaste = true } = opts;

  const StrictImage = Image.extend({
    renderHTML({ HTMLAttributes }) {
      const { src, ...rest } = HTMLAttributes;
      if (!isSafeRichTextImageSrc(src as string)) {
        return [
          'p',
          {
            class:
              'text-sm text-gray-500 italic border border-dashed border-gray-300 rounded px-3 py-2 bg-gray-50',
          },
          'This image URL is not allowed and was blocked.',
        ];
      }
      return ['img', mergeAttributes(this.options.HTMLAttributes, { ...rest, src })];
    },
  });

  return [
    StarterKit,
    StrictImage.configure({
      inline: false,
      allowBase64: false,
    }),
    Link.configure({
      openOnClick,
      autolink,
      linkOnPaste,
      protocols: [],
      isAllowedUri: (href) => isSafeRichTextLinkHref(typeof href === 'string' ? href : ''),
      HTMLAttributes: {
        class: 'text-[var(--color-green-5)] underline hover:text-[var(--color-green-4)]',
        target: '_blank',
        rel: 'noopener noreferrer nofollow',
      },
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
  ];
}
