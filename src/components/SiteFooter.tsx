import { Mail, MapPin, Phone } from 'lucide-react';
import { getBookCtaLabel, isPhoneEnabled, siteConfig } from '../config';
import { getBookLinkProps } from '../lib/booking';
import { withBase } from '../lib/paths';
import SharedField from './admin/SharedField';

export default function SiteFooter() {
  const bookLink = getBookLinkProps();
  const practiceLinks = [
    siteConfig.pages.about,
    siteConfig.pages.specialties,
    siteConfig.pages.fees,
    siteConfig.pages.book,
  ].filter((page) => page.enabled);

  const resourceLinks = [
    siteConfig.pages.faq,
    siteConfig.pages.blog,
    siteConfig.pages.contact,
    siteConfig.pages.privacy,
  ].filter((page) => page.enabled);

  const linkClass =
    'text-muted-foreground hover:text-foreground focus-visible:ring-ring focus-visible:ring-offset-background inline-flex min-h-10 items-center transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none';

  return (
    <footer className="border-border bg-muted/30 border-t">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div className="space-y-5">
          <h2 className="font-heading text-foreground text-3xl font-semibold">
            <SharedField path="practiceName" fallback={siteConfig.practiceName} />
          </h2>
          <p className="text-muted-foreground max-w-md leading-relaxed">
            <SharedField path="tagline" fallback={siteConfig.tagline} />
          </p>
          <div className="text-muted-foreground space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <MapPin className="text-primary h-4 w-4" aria-hidden="true" />
              <SharedField path="location" fallback={siteConfig.location} />
            </p>
            <p className="flex items-center gap-2">
              <Mail className="text-primary h-4 w-4" aria-hidden="true" />
              <a href={`mailto:${siteConfig.email}`} className={linkClass}>
                <SharedField path="email" fallback={siteConfig.email} />
              </a>
            </p>
            {isPhoneEnabled() && (
              <p className="flex items-center gap-2">
                <Phone className="text-primary h-4 w-4" aria-hidden="true" />
                <a href={`tel:${siteConfig.phone}`} className={linkClass}>
                  <SharedField path="phone" fallback={siteConfig.phone} />
                </a>
              </p>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-foreground mb-5 text-xs font-semibold uppercase tracking-[0.22em]">
            {siteConfig.footer.practiceHeading}
          </h3>
          <ul className="space-y-1">
            {practiceLinks.map((link) => {
              const isBookLink = link.href === siteConfig.pages.book.href;

              return (
                <li key={link.href}>
                  <a
                    href={isBookLink ? bookLink.href : withBase(link.href)}
                    target={isBookLink ? bookLink.target : undefined}
                    rel={isBookLink ? bookLink.rel : undefined}
                    className={linkClass}
                  >
                    {isBookLink ? getBookCtaLabel() : link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h3 className="text-foreground mb-5 text-xs font-semibold uppercase tracking-[0.22em]">
            {siteConfig.footer.resourcesHeading}
          </h3>
          <ul className="space-y-1">
            {resourceLinks.map((link) => (
              <li key={link.href}>
                <a href={withBase(link.href)} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-border text-muted-foreground border-t px-6 py-5 text-center text-sm">
        © {new Date().getFullYear()}{' '}
        <SharedField path="practiceName" fallback={siteConfig.practiceName} />. All rights
        reserved.
      </div>
    </footer>
  );
}
