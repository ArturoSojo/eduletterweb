import { useEffect, useRef } from 'react';

type Props = {
  url: string;
};

export default function EpubReader({ url }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let book: any;
    let rendition: any;

    (async () => {
      const ePub = (await import('epubjs')).default;
      book = ePub(url);
      rendition = book.renderTo(containerRef.current!, {
        width: '100%',
        height: '100%',
        spread: 'auto'
      });

      rendition.themes.register('sepia', {
        body: { background: '#F5ECD9', color: '#5B4636' }
      });

      await rendition.display();
    })();

    return () => {
      rendition?.destroy?.();
      book?.destroy?.();
    };
  }, [url]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}
