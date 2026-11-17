# The World That Could Be — Website

Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide · Resend.

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production check
```

## Structure

```
src/app/                 pages (/, /about-the-book, /about-the-author, /contact), API route, sitemap, robots, OG image
src/components/home/     the nine homepage sections (footer lives in layout/)
src/components/ui/       motion primitives, starfield, motifs, book cover, buttons, social icons
src/lib/content.ts       all supplied copy, verbatim from the Word document
src/lib/site.ts          site config, external links, navigation
src/lib/validation.ts    contact validation shared by browser and server
```

## Deploy to Vercel — environment variables

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | yes | Resend API key (server only) |
| `CONTACT_TO_EMAIL` | no | Defaults to `krzysztoflukiewski@gmail.com` |
| `CONTACT_FROM_EMAIL` | recommended | Verified sender, e.g. `The World That Could Be <contact@yourdomain.com>` |
| `NEXT_PUBLIC_SITE_URL` | yes | Production URL, used for canonical URLs, sitemap, Open Graph |
| `NEXT_PUBLIC_FACEBOOK_URL` | when supplied | Activates the Facebook icon |
| `NEXT_PUBLIC_INSTAGRAM_URL` | when supplied | Activates the Instagram icon |

### Resend setup
1. Create an account at resend.com and an API key.
2. Testing: the default sender `onboarding@resend.dev` only delivers to the Resend account owner's own address, so sign up with `krzysztoflukiewski@gmail.com` or verify a domain.
3. Production: verify a domain in Resend and set `CONTACT_FROM_EMAIL`.
4. Without `RESEND_API_KEY` the form returns an error and never shows a success message.

## Items not supplied (not invented)
- Facebook and Instagram URLs. The icons render as inactive placeholders until the env vars above are set.
- Contact-page introduction line. It is short UI copy written for the page; replace it in `src/app/contact/page.tsx` if you have approved text.
- Photography. Imagery comes from the supplied cover plus generated SVG/canvas art; swap in licensed photos where wanted.
