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

There is a separate Compose file per app, so each can be its own Nomploy
application with **autodeploy from GitHub**:

- [`docker-compose.website.yml`](docker-compose.website.yml) — the marketing site
  (set the real `SLACK_WEBHOOK_URL`)
- [`docker-compose.docs.yml`](docker-compose.docs.yml) — the docs

In Nomploy, create one application per file (point each at its Compose path in
this repo) and enable autodeploy so a push to `main` — which rebuilds the GHCR
image via CI — redeploys the container. Put a TLS-terminating proxy in front
(Traefik, which Nomploy already runs).

To run them by hand instead:

```bash
docker compose -f docker-compose.website.yml up -d
docker compose -f docker-compose.docs.yml up -d
```

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
