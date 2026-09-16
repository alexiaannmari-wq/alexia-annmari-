import { useAdmin } from '../../lib/admin/admin-context';

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

export default function FeesEditor() {
  const admin = useAdmin();
  const packages = (admin.getFieldValue('practice', 'packages') ?? []) as PackageTier[];
  const addOns = (admin.getFieldValue('practice', 'addOns') ?? []) as AddOn[];
  const engagementNotes = (admin.getFieldValue('practice', 'fees.insuranceNotes') ?? []) as string[];
  const engagementHeading = String(
    admin.getFieldValue('practice', 'fees.insuranceHeading') ?? 'Engagement notes',
  );

  const updatePackage = (index: number, patch: Partial<PackageTier>) => {
    const next = [...packages];
    next[index] = { ...next[index], ...patch };
    admin.setFieldValue('practice', 'packages', next);
  };

  const updatePackageList = (
    index: number,
    key: 'includes' | 'communication',
    listIndex: number,
    value: string,
  ) => {
    const next = [...packages];
    const list = [...next[index][key]];
    list[listIndex] = value;
    next[index] = { ...next[index], [key]: list };
    admin.setFieldValue('practice', 'packages', next);
  };

  const addPackage = () => {
    admin.setFieldValue('practice', 'packages', [
      ...packages,
      {
        name: 'New package',
        eyebrow: 'Tier',
        summary: 'Describe this package.',
        price: '$0/mo',
        includes: ['Included item'],
        communication: ['Communication detail'],
      },
    ]);
  };

  const removePackage = (index: number) => {
    admin.setFieldValue(
      'practice',
      'packages',
      packages.filter((_, itemIndex) => itemIndex !== index),
    );
  };

  const updateAddOn = (index: number, patch: Partial<AddOn>) => {
    const next = [...addOns];
    next[index] = { ...next[index], ...patch };
    admin.setFieldValue('practice', 'addOns', next);
  };

  const addAddOn = () => {
    admin.setFieldValue('practice', 'addOns', [...addOns, { label: 'New add-on', price: '$0' }]);
  };

  const removeAddOn = (index: number) => {
    admin.setFieldValue(
      'practice',
      'addOns',
      addOns.filter((_, itemIndex) => itemIndex !== index),
    );
  };

  const updateEngagementNote = (index: number, value: string) => {
    const next = [...engagementNotes];
    next[index] = value;
    admin.setFieldValue('practice', 'fees.insuranceNotes', next);
  };

  const addEngagementNote = () => {
    admin.setFieldValue('practice', 'fees.insuranceNotes', [...engagementNotes, 'New note']);
  };

  const removeEngagementNote = (index: number) => {
    admin.setFieldValue(
      'practice',
      'fees.insuranceNotes',
      engagementNotes.filter((_, itemIndex) => itemIndex !== index),
    );
  };

  return (
    <div className="space-y-10">
      <section className="space-y-6">
        <div>
          <h2 className="font-heading text-2xl font-bold">Packages</h2>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            Monthly tiers shown on the Packages page.
          </p>
        </div>

        {packages.map((item, index) => (
          <div key={`${item.name}-${index}`} className="bg-card space-y-3 rounded-md border border-border p-6">
            <div className="grid gap-3 md:grid-cols-2">
              <label className="block space-y-2">
                <span className="text-sm font-bold">Package name</span>
                <input
                  value={item.name}
                  onChange={(event) => updatePackage(index, { name: event.currentTarget.value })}
                  className="border-border bg-background w-full rounded-sm border px-4 py-3 outline-none"
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-bold">Price</span>
                <input
                  value={item.price}
                  onChange={(event) => updatePackage(index, { price: event.currentTarget.value })}
                  className="border-border bg-background w-full rounded-sm border px-4 py-3 outline-none"
                />
              </label>
            </div>
            <label className="block space-y-2">
              <span className="text-sm font-bold">Eyebrow</span>
              <input
                value={item.eyebrow}
                onChange={(event) => updatePackage(index, { eyebrow: event.currentTarget.value })}
                className="border-border bg-background w-full rounded-sm border px-4 py-3 outline-none"
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-bold">Summary</span>
              <textarea
                value={item.summary}
                onChange={(event) => updatePackage(index, { summary: event.currentTarget.value })}
                rows={3}
                className="border-border bg-background w-full rounded-sm border px-4 py-3 outline-none"
              />
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <span className="text-sm font-bold">Includes</span>
                {item.includes.map((line, lineIndex) => (
                  <textarea
                    key={`includes-${index}-${lineIndex}`}
                    value={line}
                    onChange={(event) =>
                      updatePackageList(index, 'includes', lineIndex, event.currentTarget.value)
                    }
                    rows={2}
                    className="border-border bg-background w-full rounded-sm border px-4 py-3 outline-none"
                  />
                ))}
              </div>
              <div className="space-y-2">
                <span className="text-sm font-bold">Communication</span>
                {item.communication.map((line, lineIndex) => (
                  <textarea
                    key={`communication-${index}-${lineIndex}`}
                    value={line}
                    onChange={(event) =>
                      updatePackageList(index, 'communication', lineIndex, event.currentTarget.value)
                    }
                    rows={2}
                    className="border-border bg-background w-full rounded-sm border px-4 py-3 outline-none"
                  />
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => removePackage(index)}
              className="text-sm font-bold text-red-400"
            >
              Remove package
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addPackage}
          className="rounded-sm border border-border px-5 py-2 font-bold"
        >
          Add package
        </button>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="font-heading text-2xl font-bold">Add-ons</h2>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            Optional intensives and add-on pricing.
          </p>
        </div>

        {addOns.map((item, index) => (
          <div key={`${item.label}-${index}`} className="bg-card space-y-3 rounded-md border border-border p-6">
            <div className="grid gap-3 md:grid-cols-2">
              <label className="block space-y-2">
                <span className="text-sm font-bold">Label</span>
                <input
                  value={item.label}
                  onChange={(event) => updateAddOn(index, { label: event.currentTarget.value })}
                  className="border-border bg-background w-full rounded-sm border px-4 py-3 outline-none"
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-bold">Price</span>
                <input
                  value={item.price}
                  onChange={(event) => updateAddOn(index, { price: event.currentTarget.value })}
                  className="border-border bg-background w-full rounded-sm border px-4 py-3 outline-none"
                />
              </label>
            </div>
            <button
              type="button"
              onClick={() => removeAddOn(index)}
              className="text-sm font-bold text-red-400"
            >
              Remove add-on
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addAddOn}
          className="rounded-sm border border-border px-5 py-2 font-bold"
        >
          Add add-on
        </button>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="font-heading text-2xl font-bold">Engagement notes</h2>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            Heading and notes shown below packages on the Packages page.
          </p>
        </div>

        <label className="block space-y-2">
          <span className="text-sm font-bold">Section heading</span>
          <input
            value={engagementHeading}
            onChange={(event) =>
              admin.setFieldValue('practice', 'fees.insuranceHeading', event.currentTarget.value)
            }
            className="border-border bg-background w-full rounded-sm border px-4 py-3 outline-none"
          />
        </label>

        {engagementNotes.map((note, index) => (
          <div key={`${note}-${index}`} className="bg-card space-y-3 rounded-md border border-border p-6">
            <textarea
              value={note}
              onChange={(event) => updateEngagementNote(index, event.currentTarget.value)}
              rows={3}
              className="border-border bg-background w-full rounded-sm border px-4 py-3 outline-none"
            />
            <button
              type="button"
              onClick={() => removeEngagementNote(index)}
              className="text-sm font-bold text-red-400"
            >
              Remove note
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addEngagementNote}
          className="rounded-sm border border-border px-5 py-2 font-bold"
        >
          Add note
        </button>
      </section>

      <button
        type="button"
        onClick={() => void admin.saveDirty()}
        disabled={admin.dirtySourceIds.length === 0 || admin.saveState === 'saving'}
        className="bg-primary text-primary-foreground rounded-sm px-5 py-2 font-bold"
      >
        Save & publish
      </button>
    </div>
  );
}
