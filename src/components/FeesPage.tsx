import { Check } from 'lucide-react';
import { siteConfig } from '../config';
import { pageContent } from '../lib/content';
import { useOptionalAdmin } from '../lib/admin/admin-context';
import ContentField from './admin/ContentField';
import MarkdownText from './MarkdownText';
import PageShell from './PageShell';

const content = pageContent.fees;

type PackageTier = {
  name: string;
  eyebrow: string;
  summary: string;
  price: string;
  includes: string[];
  communication: string[];
};

type AddOn = {
  label: string;
  price: string;
};

export default function FeesPage() {
  const admin = useOptionalAdmin();
  const packages = (admin?.getFieldValue('practice', 'packages') ??
    siteConfig.packages) as PackageTier[];
  const addOns = (admin?.getFieldValue('practice', 'addOns') ?? siteConfig.addOns) as AddOn[];
  const engagementNotes = (admin?.getFieldValue('practice', 'fees.insuranceNotes') ??
    siteConfig.fees.insuranceNotes) as string[];

  return (
    <PageShell
      eyebrow={content.shell.eyebrow}
      title={content.shell.title}
      description={content.shell.description}
    >
      <section className="px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-5xl space-y-16">
          {packages.map((item, packageIndex) => (
            <article
              key={item.name}
              className="border-border grid gap-8 border-b pb-16 last:border-b-0 last:pb-0 lg:grid-cols-[1fr_auto] lg:gap-12"
            >
              <div>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <p className="text-primary font-mono text-xs tracking-[0.2em]">
                    {String(packageIndex + 1).padStart(2, '0')}
                  </p>
                  <p className="text-primary text-xs font-semibold uppercase tracking-[0.28em]">
                    {item.eyebrow}
                  </p>
                </div>
                <h2 className="font-heading text-foreground mt-4 text-3xl font-semibold md:text-4xl">
                  {item.name}
                </h2>
                <MarkdownText className="text-muted-foreground mt-4 max-w-2xl text-lg leading-relaxed">
                  {item.summary}
                </MarkdownText>

                <div className="mt-10 grid gap-10 md:grid-cols-2">
                  <div>
                    <h3 className="text-foreground text-sm font-semibold uppercase tracking-[0.18em]">
                      What&apos;s included
                    </h3>
                    <ul className="mt-5 space-y-4">
                      {item.includes.map((line) => (
                        <li key={line} className="text-muted-foreground flex gap-3 leading-relaxed">
                          <Check
                            className="text-primary mt-1 h-4 w-4 flex-shrink-0"
                            aria-hidden="true"
                          />
                          <MarkdownText>{line}</MarkdownText>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-foreground text-sm font-semibold uppercase tracking-[0.18em]">
                      Communication rhythm
                    </h3>
                    <ul className="mt-5 space-y-4">
                      {item.communication.map((line) => (
                        <li key={line} className="text-muted-foreground flex gap-3 leading-relaxed">
                          <Check
                            className="text-primary mt-1 h-4 w-4 flex-shrink-0"
                            aria-hidden="true"
                          />
                          <MarkdownText>{line}</MarkdownText>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-border lg:border-l lg:pl-10">
                <p className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.2em]">
                  Monthly
                </p>
                <p className="font-heading text-foreground mt-2 text-4xl font-semibold md:text-5xl">
                  {item.price}
                </p>
              </div>
            </article>
          ))}

          {addOns.length > 0 && (
            <div className="space-y-8">
              <div className="max-w-2xl">
                <ContentField
                  sourceId="pages.fees"
                  path="addOnsHeading"
                  fallback={content.addOnsHeading ?? 'Intensives and add-ons'}
                  as="h2"
                  className="font-heading text-foreground text-3xl font-semibold md:text-4xl"
                />
                <ContentField
                  sourceId="pages.fees"
                  path="addOnsDescription"
                  fallback={content.addOnsDescription ?? ''}
                  as="p"
                  className="text-muted-foreground mt-4 leading-relaxed"
                  multiline
                  markdown
                />
              </div>
              <ul className="divide-border border-border divide-y border-y">
                {addOns.map((item) => (
                  <li
                    key={item.label}
                    className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <p className="text-foreground font-medium">{item.label}</p>
                    <p className="text-primary text-sm font-semibold tracking-wide">{item.price}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="border-primary border-l-2 py-2 pl-6 md:pl-8">
            <ContentField
              sourceId="practice"
              path="fees.insuranceHeading"
              fallback={siteConfig.fees.insuranceHeading}
              as="h2"
              className="font-heading text-foreground text-3xl font-semibold"
            />
            <div className="mt-6 space-y-4">
              {engagementNotes.map((note) => (
                <div key={note} className="text-muted-foreground flex gap-3 leading-relaxed">
                  <Check className="text-primary mt-1 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  <MarkdownText>{note}</MarkdownText>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
