import { ArrowRight, Check } from 'lucide-react';
import type { PageSection } from '../content-data/pages.schema';
import { getBookCtaLabel, siteConfig } from '../config';
import { getBookLinkProps } from '../lib/booking';
import { withBase } from '../lib/paths';
import { hasText } from '../lib/utils';
import { useOptionalAdmin } from '../lib/admin/admin-context';
import ContentField, { ContentCardList } from './admin/ContentField';
import ImageField from './admin/ImageField';
import SharedField from './admin/SharedField';
import MarkdownText from './MarkdownText';

export type PageSectionSpecialty = {
  slug: string;
  title: string;
  description: string;
};

type PageSectionsProps = {
  sourceId: string;
  sections: PageSection[];
  specialties?: PageSectionSpecialty[];
  /** Compact stacked prose inside a single card (privacy-style pages). */
  variant?: 'default' | 'article';
};

function sectionPath(index: number, field: string) {
  return `sections.${index}.${field}`;
}

const linkFocus =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

function HeroSection({
  sourceId,
  section,
  index,
}: {
  sourceId: string;
  section: Extract<PageSection, { type: 'hero' }>;
  index: number;
}) {
  const bookLink = getBookLinkProps();
  const consultationHref = siteConfig.pages.book.enabled
    ? bookLink.href
    : withBase(siteConfig.pages.contact.href);
  const consultationLabel = siteConfig.pages.book.enabled
    ? getBookCtaLabel()
    : siteConfig.pages.contact.label;

  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-8">
        <div className="space-y-8">
          <div className="space-y-5">
            <SharedField
              path="practiceName"
              fallback={siteConfig.practiceName}
              className="font-heading text-foreground text-4xl font-semibold tracking-tight md:text-5xl"
            />
            <ContentField
              sourceId={sourceId}
              path={sectionPath(index, 'eyebrow')}
              fallback={section.eyebrow}
              className="text-primary block text-xs font-semibold uppercase tracking-[0.28em]"
            />
            <h1 className="font-heading text-foreground text-4xl font-semibold leading-[1.08] md:text-6xl lg:text-7xl">
              <SharedField path="tagline" fallback={siteConfig.tagline} />
            </h1>
            <ContentField
              sourceId={sourceId}
              path={sectionPath(index, 'subtitle')}
              fallback={section.subtitle}
              as="p"
              className="text-muted-foreground max-w-xl text-lg leading-relaxed md:text-xl"
              multiline
              markdown
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={consultationHref}
              target={bookLink.target}
              rel={bookLink.rel}
              className={`bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3 text-sm font-semibold tracking-wide transition-colors ${linkFocus}`}
            >
              {consultationLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            {siteConfig.pages.specialties.enabled && hasText(section.specialtiesCta) && (
              <a
                href={withBase('/specialties')}
                className={`border-border text-foreground hover:border-primary hover:text-primary inline-flex min-h-11 items-center justify-center border px-6 py-3 text-sm font-semibold tracking-wide transition-colors ${linkFocus}`}
              >
                <ContentField
                  sourceId={sourceId}
                  path={sectionPath(index, 'specialtiesCta')}
                  fallback={section.specialtiesCta}
                />
              </a>
            )}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:max-w-none">
          <svg className="absolute h-0 w-0 overflow-hidden" aria-hidden="true" focusable="false">
            <defs>
              <clipPath id="hero-headshot-clip" clipPathUnits="objectBoundingBox">
                <path d="M0.55 0.015 C0.78 0.02 0.96 0.16 0.985 0.38 C1.01 0.62 0.93 0.82 0.78 0.93 C0.64 1.02 0.42 1.01 0.26 0.94 C0.1 0.86 0.01 0.68 0.015 0.46 C0.02 0.24 0.14 0.07 0.34 0.025 C0.41 0.01 0.48 0.012 0.55 0.015 Z" />
              </clipPath>
              <clipPath id="hero-headshot-accent" clipPathUnits="objectBoundingBox">
                <path d="M0.58 0.03 C0.8 0.04 0.97 0.2 0.99 0.42 C1.015 0.66 0.92 0.86 0.76 0.95 C0.6 1.03 0.38 1.01 0.22 0.93 C0.07 0.84 0.0 0.66 0.01 0.44 C0.02 0.22 0.16 0.05 0.38 0.02 C0.45 0.01 0.52 0.02 0.58 0.03 Z" />
              </clipPath>
            </defs>
          </svg>

          {/* Offset accent silhouette */}
          <div
            className="bg-primary/35 absolute inset-[6%] translate-x-3 translate-y-4 sm:translate-x-4 sm:translate-y-5"
            style={{ clipPath: 'url(#hero-headshot-accent)' }}
            aria-hidden="true"
          />

          {/* Soft glow behind frame */}
          <div
            className="bg-primary/20 absolute inset-[12%] blur-2xl"
            style={{ clipPath: 'url(#hero-headshot-clip)' }}
            aria-hidden="true"
          />

          <div className="relative">
            <div
              className="relative aspect-[4/5] w-full overflow-hidden"
              style={{ clipPath: 'url(#hero-headshot-clip)' }}
            >
              <ImageField
                path="heroImage"
                fallback={siteConfig.heroImage}
                fieldKey="hero"
                alt={siteConfig.practitionerName}
                wrapperClassName="h-full w-full"
                className="h-full w-full object-cover object-[50%_18%]"
              />

              {/* Film grain / paper texture */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.28] mix-blend-soft-light"
                aria-hidden="true"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")",
                }}
              />

              {/* Subtle ink wash for depth */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-primary/10 mix-blend-multiply"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10"
                aria-hidden="true"
              />
            </div>

            {/* Hairline contour to define the cut edge */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M55 1.5 C78 2 96 16 98.5 38 C101 62 93 82 78 93 C64 102 42 101 26 94 C10 86 1 68 1.5 46 C2 24 14 7 34 2.5 C41 1 48 1.2 55 1.5 Z"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeOpacity="0.55"
                strokeWidth="0.7"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProseSection({
  sourceId,
  section,
  index,
  compact = false,
}: {
  sourceId: string;
  section: Extract<PageSection, { type: 'prose' }>;
  index: number;
  compact?: boolean;
}) {
  const titleClass = compact
    ? 'font-heading text-foreground text-2xl font-semibold'
    : 'font-heading text-foreground text-4xl font-semibold md:text-5xl';
  const bodyClass = compact
    ? 'text-muted-foreground leading-relaxed'
    : 'text-muted-foreground text-lg leading-relaxed';
  const showTitle = hasText(section.title);
  const visibleParagraphs = section.paragraphs
    .map((paragraph, paragraphIndex) => ({ paragraph, paragraphIndex }))
    .filter(({ paragraph }) => hasText(paragraph));

  if (!showTitle && visibleParagraphs.length === 0 && !section.withImage) {
    return null;
  }

  const paragraphs = (
    <>
      {showTitle && (
        <ContentField
          sourceId={sourceId}
          path={sectionPath(index, 'title')}
          fallback={section.title}
          as="h2"
          className={titleClass}
        />
      )}
      {visibleParagraphs.map(({ paragraph, paragraphIndex }) => (
        <ContentField
          key={`${index}-${paragraphIndex}`}
          sourceId={sourceId}
          path={sectionPath(index, `paragraphs.${paragraphIndex}`)}
          fallback={paragraph}
          as="p"
          className={bodyClass}
          multiline
          markdown
        />
      ))}
    </>
  );

  if (section.withImage) {
    return (
      <section className="border-b border-border px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
          <ImageField
            path="aboutImage"
            fallback={siteConfig.aboutImage}
            fieldKey="about"
            wrapperClassName="lg:sticky lg:top-28"
            className="aspect-[4/5] w-full border border-border object-cover object-top"
          />
          <div className="space-y-6 border-l border-primary/40 pl-6 md:pl-8">
            <SharedField
              path="credentials"
              fallback={siteConfig.credentials}
              className="text-primary text-xs font-semibold uppercase tracking-[0.28em]"
            />
            {paragraphs}
          </div>
        </div>
      </section>
    );
  }

  if (compact) {
    return <div className="space-y-3">{paragraphs}</div>;
  }

  return (
    <section className="border-b border-border px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-6 border-l border-border pl-6 md:pl-8">
        {paragraphs}
      </div>
    </section>
  );
}

function CardsSection({
  sourceId,
  section,
  index,
}: {
  sourceId: string;
  section: Extract<PageSection, { type: 'cards' }>;
  index: number;
}) {
  const showEyebrow = hasText(section.eyebrow);
  const showTitle = hasText(section.title);
  const showDescription = hasText(section.description);
  const showHeader = showEyebrow || showTitle || showDescription;

  return (
    <section className="border-b border-border px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {showHeader && (
          <div className="max-w-2xl">
            {showEyebrow && (
              <ContentField
                sourceId={sourceId}
                path={sectionPath(index, 'eyebrow')}
                fallback={section.eyebrow}
                className="text-primary text-xs font-semibold uppercase tracking-[0.28em]"
              />
            )}
            {showTitle && (
              <ContentField
                sourceId={sourceId}
                path={sectionPath(index, 'title')}
                fallback={section.title}
                as="h2"
                className={`font-heading text-foreground text-4xl font-semibold md:text-5xl ${showEyebrow ? 'mt-4' : ''}`}
              />
            )}
            {showDescription && (
              <ContentField
                sourceId={sourceId}
                path={sectionPath(index, 'description')}
                fallback={section.description}
                as="p"
                className="text-muted-foreground mt-5 text-lg leading-relaxed"
                multiline
                markdown
              />
            )}
          </div>
        )}

        <div
          className={`grid gap-0 border-t border-border md:grid-cols-3 ${showHeader ? 'mt-14' : ''}`}
        >
          <ContentCardList
            sourceId={sourceId}
            path={sectionPath(index, 'items')}
            fallback={section.items}
            renderItem={(item, itemIndex) => (
              <div className="border-border space-y-4 border-b py-8 md:border-b-0 md:border-r md:px-8 md:py-10 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                <p className="text-primary font-mono text-xs tracking-[0.2em]">
                  {String(itemIndex + 1).padStart(2, '0')}
                </p>
                {hasText(item.title) && (
                  <h3 className="font-heading text-foreground text-2xl font-semibold md:text-3xl">
                    {item.title}
                  </h3>
                )}
                {hasText(item.description) && (
                  <MarkdownText className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </MarkdownText>
                )}
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
}

function BulletsSection({
  sourceId,
  section,
  index,
}: {
  sourceId: string;
  section: Extract<PageSection, { type: 'bullets' }>;
  index: number;
}) {
  const admin = useOptionalAdmin();
  const items = (admin?.getFieldValue(sourceId, sectionPath(index, 'items')) ??
    section.items) as string[];
  const showEyebrow = hasText(section.eyebrow);
  const showTitle = hasText(section.title);
  const showDescription = hasText(section.description);
  const visibleItems = admin?.isEditMode
    ? items.map((item, itemIndex) => ({ item, itemIndex }))
    : items
        .map((item, itemIndex) => ({ item, itemIndex }))
        .filter(({ item }) => hasText(item));

  return (
    <section className="bg-muted/40 border-b border-border px-6 py-20 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
        <div className="lg:sticky lg:top-28">
          {showEyebrow && (
            <ContentField
              sourceId={sourceId}
              path={sectionPath(index, 'eyebrow')}
              fallback={section.eyebrow}
              className="text-primary text-xs font-semibold uppercase tracking-[0.28em]"
            />
          )}
          {showTitle && (
            <ContentField
              sourceId={sourceId}
              path={sectionPath(index, 'title')}
              fallback={section.title}
              as="h2"
              className={`font-heading text-foreground text-4xl font-semibold md:text-5xl ${showEyebrow ? 'mt-4' : ''}`}
            />
          )}
          {showDescription && (
            <ContentField
              sourceId={sourceId}
              path={sectionPath(index, 'description')}
              fallback={section.description}
              as="p"
              className="text-muted-foreground mt-5 text-lg leading-relaxed"
              multiline
              markdown
            />
          )}
        </div>
        <ul className="divide-border border-border divide-y border-y">
          {visibleItems.map(({ item, itemIndex }) => (
            <li key={`${index}-${itemIndex}`} className="py-5">
              {admin?.isEditMode ? (
                <textarea
                  value={item}
                  onChange={(event) => {
                    const next = [...items];
                    next[itemIndex] = event.currentTarget.value;
                    admin.setFieldValue(sourceId, sectionPath(index, 'items'), next);
                  }}
                  className="border-primary/40 bg-background/95 w-full border px-3 py-2 outline-none"
                  rows={2}
                />
              ) : (
                <div className="text-foreground flex gap-4 text-base leading-relaxed md:text-lg">
                  <Check
                    className="text-primary mt-1 h-5 w-5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <MarkdownText>{item}</MarkdownText>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SpecialtiesPreviewSection({
  sourceId,
  section,
  index,
  specialties,
}: {
  sourceId: string;
  section: Extract<PageSection, { type: 'specialtiesPreview' }>;
  index: number;
  specialties: PageSectionSpecialty[];
}) {
  if (!siteConfig.pages.specialties.enabled || specialties.length === 0) {
    return null;
  }

  return (
    <section className="border-b border-border px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 border-b border-border pb-8 md:flex-row md:items-end">
          <div>
            <ContentField
              sourceId={sourceId}
              path={sectionPath(index, 'eyebrow')}
              fallback={section.eyebrow}
              className="text-primary text-xs font-semibold uppercase tracking-[0.28em]"
            />
            <ContentField
              sourceId={sourceId}
              path={sectionPath(index, 'title')}
              fallback={section.title}
              as="h2"
              className="font-heading text-foreground mt-4 text-4xl font-semibold md:text-5xl"
            />
          </div>
          {hasText(section.seeAllLabel) && (
            <a
              href={withBase('/specialties')}
              className={`text-foreground hover:text-primary inline-flex min-h-11 items-center gap-2 text-sm font-semibold tracking-wide transition-colors ${linkFocus}`}
            >
              <ContentField
                sourceId={sourceId}
                path={sectionPath(index, 'seeAllLabel')}
                fallback={section.seeAllLabel}
              />
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>

        <div className="mt-2">
          {specialties.map((specialty, specialtyIndex) => (
            <a
              key={specialty.slug}
              href={withBase(`/specialties/${specialty.slug}`)}
              className={`group border-border hover:bg-muted/50 grid gap-3 border-b px-1 py-8 transition-colors md:grid-cols-[5rem_1fr_auto] md:items-center md:gap-8 ${linkFocus}`}
            >
              <span className="text-primary font-mono text-xs tracking-[0.2em]">
                {String(specialtyIndex + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-heading text-foreground group-hover:text-primary text-2xl font-semibold transition-colors md:text-3xl">
                  {specialty.title}
                </h3>
                <p className="text-muted-foreground mt-2 max-w-2xl leading-relaxed">
                  {specialty.description}
                </p>
              </div>
              <ArrowRight
                className="text-muted-foreground group-hover:text-primary hidden h-5 w-5 transition-colors md:block"
                aria-hidden="true"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection({
  sourceId,
  section,
  index,
}: {
  sourceId: string;
  section: Extract<PageSection, { type: 'cta' }>;
  index: number;
}) {
  const bookLink = getBookLinkProps();
  const consultationHref = siteConfig.pages.book.enabled
    ? bookLink.href
    : withBase(siteConfig.pages.contact.href);
  const consultationLabel = siteConfig.pages.book.enabled
    ? getBookCtaLabel()
    : siteConfig.pages.contact.label;
  const showTitle = hasText(section.title);
  const showDescription = hasText(section.description);

  if (!showTitle && !showDescription) {
    return null;
  }

  return (
    <section className="border-b border-border px-6 py-20 lg:px-8">
      <div className="border-primary mx-auto flex max-w-6xl flex-col gap-8 border-l-2 py-2 pl-6 md:flex-row md:items-end md:justify-between md:pl-10">
        <div className="max-w-2xl">
          {showTitle && (
            <ContentField
              sourceId={sourceId}
              path={sectionPath(index, 'title')}
              fallback={section.title}
              as="h2"
              className="font-heading text-foreground text-4xl font-semibold md:text-5xl"
            />
          )}
          {showDescription && (
            <ContentField
              sourceId={sourceId}
              path={sectionPath(index, 'description')}
              fallback={section.description}
              as="p"
              className="text-muted-foreground mt-4 text-lg leading-relaxed"
              multiline
              markdown
            />
          )}
        </div>
        <a
          href={consultationHref}
          target={siteConfig.pages.book.enabled ? bookLink.target : undefined}
          rel={siteConfig.pages.book.enabled ? bookLink.rel : undefined}
          className={`bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-11 shrink-0 items-center justify-center gap-2 px-7 py-3 text-sm font-semibold tracking-wide transition-colors ${linkFocus}`}
        >
          {consultationLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

export default function PageSections({
  sourceId,
  sections,
  specialties = [],
  variant = 'default',
}: PageSectionsProps) {
  const compact = variant === 'article';

  const rendered = sections.map((section, index) => {
    switch (section.type) {
      case 'hero':
        return (
          <HeroSection
            key={`section-${index}`}
            sourceId={sourceId}
            section={section}
            index={index}
          />
        );
      case 'prose':
        return (
          <ProseSection
            key={`section-${index}`}
            sourceId={sourceId}
            section={section}
            index={index}
            compact={compact}
          />
        );
      case 'cards':
        return (
          <CardsSection
            key={`section-${index}`}
            sourceId={sourceId}
            section={section}
            index={index}
          />
        );
      case 'bullets':
        return (
          <BulletsSection
            key={`section-${index}`}
            sourceId={sourceId}
            section={section}
            index={index}
          />
        );
      case 'specialtiesPreview':
        return (
          <SpecialtiesPreviewSection
            key={`section-${index}`}
            sourceId={sourceId}
            section={section}
            index={index}
            specialties={specialties}
          />
        );
      case 'cta':
        return (
          <CtaSection
            key={`section-${index}`}
            sourceId={sourceId}
            section={section}
            index={index}
          />
        );
      default:
        return null;
    }
  });

  if (compact) {
    return <div className="space-y-8">{rendered}</div>;
  }

  return <>{rendered}</>;
}
