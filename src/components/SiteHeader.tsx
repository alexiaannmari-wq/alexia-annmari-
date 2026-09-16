import { Heart, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { getBookCtaLabel, navigationLinks, siteConfig } from '../config';
import { useOptionalAdmin } from '../lib/admin/admin-context';
import { getBookLinkProps } from '../lib/booking';
import { withBase } from '../lib/paths';
import SharedField from './admin/SharedField';

const SCROLL_COMPACT_AT = 48;

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const bookLink = getBookLinkProps();
  const admin = useOptionalAdmin();
  const logo = String(admin?.getFieldValue('practice', 'logo') ?? siteConfig.logo ?? '').trim();
  const logoMark = String(
    admin?.getFieldValue('practice', 'logoMark') ?? siteConfig.logoMark ?? '',
  ).trim();
  const practiceName = String(
    admin?.getFieldValue('practice', 'practiceName') ?? siteConfig.practiceName,
  );
  const canShrink = Boolean(logo || logoMark);

  useEffect(() => {
    if (!canShrink) {
      setCompact(false);
      return;
    }

    const update = () => setCompact(window.scrollY > SCROLL_COMPACT_AT);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [canShrink]);

  const handleMarkUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !admin) return;

    setUploading(true);
    setUploadError('');
    try {
      await admin.uploadImage(file, 'logoMark', {
        sourceId: 'practice',
        fieldPath: 'logoMark',
      });
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Upload failed.');
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const showExpandedWordmark = Boolean(logo) && !compact;
  const showCompactMark = Boolean(logoMark) && (compact || !logo);
  const showNameFallback = !logo && !compact;

  return (
    <header className="border-border/80 bg-background/85 sticky top-0 z-50 border-b backdrop-blur-md">
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-[padding] duration-300 ease-out motion-reduce:transition-none lg:px-8 ${
          compact ? 'py-2.5' : 'py-4'
        }`}
      >
        <div className="flex min-w-0 items-center gap-3">
          <a
            href={withBase('/')}
            className="text-foreground flex min-w-0 items-center gap-3"
            aria-label={practiceName}
          >
            {logo ? (
              <img
                src={withBase(logo)}
                alt={showExpandedWordmark ? practiceName : ''}
                aria-hidden={!showExpandedWordmark}
                className={`origin-left object-contain object-left transition-all duration-300 ease-out motion-reduce:transition-none ${
                  showExpandedWordmark
                    ? 'h-14 w-auto max-w-[min(11rem,55vw)] opacity-100 brightness-0 invert sm:h-16 sm:max-w-[13rem] md:h-[4.5rem]'
                    : 'pointer-events-none max-h-0 max-w-0 opacity-0'
                }`}
              />
            ) : null}

            {logoMark ? (
              <img
                src={withBase(logoMark)}
                alt={showCompactMark && !showExpandedWordmark ? practiceName : ''}
                aria-hidden={!(showCompactMark && !showExpandedWordmark)}
                className={`shrink-0 object-contain transition-all duration-300 ease-out motion-reduce:transition-none ${
                  showCompactMark
                    ? 'h-9 w-auto opacity-100 brightness-0 invert sm:h-10'
                    : 'pointer-events-none h-0 w-0 opacity-0'
                }`}
              />
            ) : compact && logo ? (
              <img
                src={withBase(logo)}
                alt={practiceName}
                className="h-9 w-auto max-w-[8rem] object-contain object-left sm:h-10"
              />
            ) : !logo && !logoMark ? (
              <span className="bg-primary text-primary-foreground flex h-9 w-9 shrink-0 items-center justify-center rounded-sm">
                <Heart className="h-4 w-4" aria-hidden="true" />
              </span>
            ) : null}

            {showNameFallback ? (
              <span className="font-heading truncate text-lg font-bold sm:text-xl">
                <SharedField path="practiceName" fallback={siteConfig.practiceName} />
              </span>
            ) : null}
          </a>

          {logoMark && admin?.isEditMode && (
            <div className="flex flex-col gap-1">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className="border-primary/30 bg-background text-primary rounded-sm border px-2 py-0.5 text-xs font-bold"
              >
                {uploading ? 'Uploading…' : 'Replace mark'}
              </button>
              {uploadError && <p className="text-xs text-red-700">{uploadError}</p>}
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleMarkUpload}
              />
            </div>
          )}
        </div>

        <div className="hidden items-center gap-1 md:flex">
          {navigationLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground focus-visible:ring-ring focus-visible:ring-offset-background rounded-sm px-3 py-2 text-sm font-medium tracking-wide transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {item.label}
            </a>
          ))}
          {siteConfig.pages.book.enabled && (
            <a
              href={bookLink.href}
              target={bookLink.target}
              rel={bookLink.rel}
              className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring focus-visible:ring-offset-background ml-3 inline-flex min-h-10 items-center px-4 py-2 text-sm font-semibold tracking-wide transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {getBookCtaLabel()}
            </a>
          )}
        </div>

        <button
          type="button"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsOpen((current) => !current)}
          className="border-border text-foreground focus-visible:ring-ring focus-visible:ring-offset-background inline-flex min-h-11 min-w-11 items-center justify-center border md:hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isOpen && (
        <div id="mobile-nav" className="border-border bg-background border-t px-6 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navigationLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground focus-visible:ring-ring focus-visible:ring-offset-background rounded-sm px-2 py-3 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {item.label}
              </a>
            ))}
            {siteConfig.pages.book.enabled && (
              <a
                href={bookLink.href}
                target={bookLink.target}
                rel={bookLink.rel}
                onClick={() => setIsOpen(false)}
                className="bg-primary text-primary-foreground focus-visible:ring-ring focus-visible:ring-offset-background mt-3 inline-flex min-h-11 items-center justify-center px-5 py-3 text-center font-semibold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {getBookCtaLabel()}
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
