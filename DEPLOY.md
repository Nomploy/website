# Deploying the Nomploy website & docs

This repo builds two container images and publishes them to the GitHub
Container Registry (GHCR):

- `ghcr.io/nomploy/website` — the marketing site (`nomploy.com`)
- `ghcr.io/nomploy/docs` — the documentation (`docs.nomploy.com`)

Both are Next.js apps that listen on **port 3000**.

---

## What you need

1. **GitHub Actions enabled** for the `Nomploy` org — the CI
   ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) builds and
   pushes the images. (Org → Settings → Actions → General.)
2. **A host that runs Docker** — your own Nomploy instance (dogfooding), any VPS,
   or a container platform. *(Alternative: Vercel — see the bottom.)*
3. **DNS control** for `nomploy.com` and `docs.nomploy.com`.
4. **A way to pull the images** — either make the GHCR packages public, or give
   the host `docker login ghcr.io` credentials (a PAT with `read:packages`).
5. **One runtime secret**: `SLACK_WEBHOOK_URL` (the contact form posts to it).
   Nothing else is required now that the blog is hidden.

---

## Step 1 — Build the images (CI)

1. Enable Actions for the org (see above).
2. Push to `main`, or run the **Build Docker images** workflow manually
   (Actions tab → Run workflow — `workflow_dispatch` is enabled).
3. Confirm the images appear under the org's **Packages**:
   `ghcr.io/nomploy/website:latest` and `ghcr.io/nomploy/docs:latest`.
4. First time only: the packages are created **private** — either set each to
   **public** (Package → Settings → Change visibility) or configure pull
   credentials on the host.

## Step 2 — Run the containers

Example `docker-compose.yml` for the host (put a TLS-terminating proxy in front,
e.g. Traefik — which Nomploy already runs):

```yaml
services:
  website:
    image: ghcr.io/nomploy/website:latest
    restart: always
    environment:
      SLACK_WEBHOOK_URL: "https://hooks.slack.com/services/XXX/YYY/ZZZ"
    ports:
      - "3000:3000"

  docs:
    image: ghcr.io/nomploy/docs:latest
    restart: always
    ports:
      - "3001:3000"
```

Or deploy each image through the Nomploy UI as an application and set the env
there.

## Step 3 — DNS & TLS

- `nomploy.com` (and `www`) → the **website** container
- `docs.nomploy.com` → the **docs** container
- Issue TLS certificates via Let's Encrypt (Nomploy/Traefik does this
  automatically once the domains point at it).

## Step 4 — Environment variables

| App | Build-time | Runtime |
| --- | --- | --- |
| website | `NEXT_PUBLIC_APP_URL` (defaults to `https://nomploy.com` in the Dockerfile) | `SLACK_WEBHOOK_URL` |
| docs | — | — |

> The blog is currently hidden. To re-enable it, add `GHOST_URL` and
> `GHOST_KEY` as **build args** (they are baked in at build time — see
> [`Dockerfile.website`](Dockerfile.website)) and restore the blog nav links.

---

## Alternative: Vercel (no Docker/GHCR)

Vercel runs Next.js natively — simplest if you don't want to manage containers:

1. Create **two** Vercel projects from this repo, with **Root Directory** set to
   `apps/website` and `apps/docs` respectively.
2. Set env vars per project (website: `SLACK_WEBHOOK_URL`,
   `NEXT_PUBLIC_APP_URL`; docs: none).
3. Assign the domains: `nomploy.com` → website, `docs.nomploy.com` → docs.

---

## Quick checklist

- [ ] Org GitHub Actions enabled
- [ ] CI ran → `ghcr.io/nomploy/{website,docs}:latest` published
- [ ] Packages public (or host has pull credentials)
- [ ] Containers running (website + docs)
- [ ] `SLACK_WEBHOOK_URL` set on the website container
- [ ] DNS: `nomploy.com` + `docs.nomploy.com` pointed at the host, TLS issued
- [ ] Product screenshots recaptured (see [SCREENSHOTS-TODO.md](SCREENSHOTS-TODO.md))
