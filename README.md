## Getting Started

### Prerequirements:

- [docker](https://www.docker.com/)
- configured [github app](https://github.com/settings/apps/new)
  - Permissions: `email readonly`
  - Homepage URL: `http://localhost:3000`
  - Callback URL: `http://localhost:3000/api/auth/callback/github`
- [obs](https://obsproject.com)

### Create `.env`

```
DATABASE_URL=postgres://postgres:strongpassword@postgres:5432/streaming
PGPASSWORD=strongpassword
PGDATABASE=streaming

GITHUB_ID=Iv23liUDT9fLNBUnA53W
GITHUB_SECRET=19c318fa4450e9e5143a4b1dd614993b651d27fd

FLV_HOST=http://localhost:8080
RTMP_HOST=rtmp://localhost:1935

NEXTAUTH_SECRET=strongpassword
```

### Run it

```bash
docker compose up
```

App started on the [localhost:3000](http://localhost:3000). Sign in with GitHub. Go to the [dashboard](http://localhost:3000/dashboard) and copy server and stream key to the obs, then start translation. You can see your translation on the [home page](http://localhost:3000)

works with [srs](https://github.com/ossrs/srs)
