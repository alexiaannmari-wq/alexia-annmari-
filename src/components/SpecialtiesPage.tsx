import { ArrowRight } from 'lucide-react';
import { pageContent } from '../lib/content';
import { withBase } from '../lib/paths';
import ContentField from './admin/ContentField';
import PageShell from './PageShell';

export type SpecialtySummary = {
  slug: string;
  title: string;
  description: string;
  heroImage: string;
};

type SpecialtiesPageProps = {
  specialties: SpecialtySummary[];
};

const content = pageContent.specialties;

export default function SpecialtiesPage({ specialties }: SpecialtiesPageProps) {
  return (
    <PageShell
      eyebrow={content.shell.eyebrow}
      title={content.shell.title}
      description={content.shell.description}
    >
      <section className="px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-5xl">
          {specialties.map((specialty, index) => (
            <a
              key={specialty.slug}
              href={withBase(`/specialties/${specialty.slug}`)}
              className="group border-border hover:bg-muted/40 focus-visible:ring-ring focus-visible:ring-offset-background grid gap-4 border-b py-8 transition-colors last:border-b-0 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:grid-cols-[5rem_10rem_1fr_auto] md:items-center md:gap-8"
            >
              <span className="text-primary font-mono text-xs tracking-[0.2em]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <img
                src={withBase(specialty.heroImage)}
                alt=""
                className="border-border hidden aspect-square w-full border object-cover md:block"
              />
              <div>
                <h2 className="font-heading text-foreground group-hover:text-primary text-2xl font-semibold transition-colors md:text-3xl">
                  {specialty.title}
                </h2>
                <p className="text-muted-foreground mt-2 max-w-xl leading-relaxed">
                  {specialty.description}
                </p>
                <span className="text-primary mt-4 inline-flex items-center gap-2 text-sm font-semibold md:hidden">
                  <ContentField
                    sourceId="pages.specialties"
                    path="cardCta"
                    fallback={content.cardCta}
                  />
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
              <ArrowRight
                className="text-muted-foreground group-hover:text-primary hidden h-5 w-5 transition-colors md:block"
                aria-hidden="true"
              />
            </a>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
