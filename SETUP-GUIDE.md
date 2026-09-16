# Ops checklist

Short checklist for day-to-day site operations — not a developer handbook. For commands, config, calendar sync, and deploy details, see [README.md](README.md).

---

## 1. Domain and hosting

- The site deploys from GitHub Pages when changes land on `main`.
- After a push (or an admin save that commits to `main`), wait for the **Deploy to GitHub Pages** workflow to finish, then refresh the live site.
- To use a custom domain: GitHub repo → **Settings → Pages → Custom domain**, then follow GitHub’s DNS instructions at your registrar.
- With a custom domain configured, the site serves from the root of that domain (no `/repo-name/` prefix).

---

## 2. Forms

Decide how Contact and Book submissions should arrive:

| Approach | When to use it |
| --- | --- |
| Formspree, Basin, or Formbold | Want form submissions in an inbox/dashboard without building a backend |
| Email-only (`basic`) | Prefer visitors email Alexia directly; hide the form fields |
| Demo | Local preview only — does **not** deliver real messages |

Checklist:

- [ ] Form backend is set for production (not `demo`)
- [ ] Endpoint / form ID matches the account you control
- [ ] Submissions go to the correct inbox
- [ ] If captcha is on, site keys are set and the form provider verifies responses
- [ ] Someone is responsible for checking and replying to new submissions

Ask a maintainer to change backends or captcha in `src/config/site.structural.ts` if you do not edit code yourself.

---

## 3. Content updates

Preferred path for non-developers: **`/admin`** on the live site.

1. Sign in with a GitHub personal access token that can write to this repo.
2. Use:
   - **Site Settings** — name, contact email, photos, packages, nav labels, form labels
   - **FAQ** — questions and answers
   - **Edit mode** on a page — that page’s headlines, body copy, and images
3. Save. Changes commit to `main` and redeploy automatically.

Also editable via admin / files:

| Content | Where |
| --- | --- |
| Brand, packages, booking copy | Settings → `practice.json` |
| FAQ | FAQ admin → `faq.json` |
| Home, About, Contact, etc. | Inline edit → `pages/*.json` |
| Service pages | Inline edit → `src/content/specialties/` |
| Blog posts | Inline edit → `src/content/blog/` |

Local editing (developer machine only) is covered in the README.

---

## 4. Before you publish

- [ ] Contact email in Site Settings is a real address (not a placeholder)
- [ ] Package names, prices, and engagement notes match what you offer
- [ ] FAQ answers are accurate for current clients
- [ ] Photos and logos are ones you have rights to use
- [ ] Book / Contact pages behave as intended (form or email-only)
- [ ] Spot-check Home, About, Services, and Packages on phone and desktop after deploy

---

## 5. When something breaks

- Undo the last admin save or git commit if a bad edit went live.
- Confirm the GitHub Actions deploy finished successfully.
- For theme, forms backends, calendar sync, or build errors, hand off to a maintainer and point them at [README.md](README.md).
