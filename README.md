# Realtime Chat

Realtime Chat is a web messaging app for private and group conversations, file sharing, and audio and video calls. It also serves as a reference for building a Next.js app with Convex subscriptions, Clerk authentication, and LiveKit rooms.

[Features](#features) · [Local setup](#local-setup) · [Architecture](#architecture) · [Contributing](#contributing)

## Features

- **Direct and group messaging.** Send friend requests by email, start a direct conversation when a request is accepted, or create a group with friends.
- **Live conversation updates.** Receive messages as they arrive and see who has read them.
- **Attachments and emoji.** Share images, videos, audio files, and PDFs, or add emoji to text messages.
- **Audio and video calls.** Join a LiveKit room from a conversation.
- **Installable web app.** Run the production build to try the progressive web app (PWA) on a supported browser.

## Local setup

You need Git, npm, Node.js 18.17 or newer (the [Next.js 14 minimum](https://nextjs.org/docs/14/getting-started/installation)), and development accounts with [Clerk](https://dashboard.clerk.com/) and [Convex](https://dashboard.convex.dev/). Create projects in [LiveKit](https://cloud.livekit.io/) for calls and [UploadThing](https://uploadthing.com/dashboard) for attachments.

### 1. Install dependencies

```sh
git clone https://github.com/amin-da/Realtime-chat.git
cd Realtime-chat
npm ci
```

### 2. Configure Clerk and the frontend

In your Clerk application, create a JWT template using the **Convex** preset. Name the template `convex` and copy its issuer URL into the `domain` field in [`convex/auth.config.ts`](convex/auth.config.ts). Keep `applicationID` set to `convex`. Use email-based test accounts with a first and last name so friend requests and calls have the profile fields they expect.

Create `.env.local` in the repository root and fill in the values for your development projects. The calling and upload settings are needed when testing their respective features.

```dotenv
# Clerk application keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# LiveKit project URL (wss://...) and API credentials
NEXT_PUBLIC_LIVEKIT_URL=
LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=

# UploadThing v6 app ID and secret
UPLOADTHING_APP_ID=
UPLOADTHING_SECRET=
```

The `NEXT_PUBLIC_` values are exposed to the browser. Keep secret keys in `.env.local` and out of version control. For UploadThing, use the [v6 credentials](https://github.com/pingdotgg/uploadthing/blob/uploadthing%406.10.0/examples/minimal-appdir/.env.example) for the app you created.

### 3. Start Convex and connect the Clerk webhook

```sh
npx convex dev
```

Sign in when prompted and select or create a Convex project. The CLI syncs the backend functions and sets `CONVEX_DEPLOYMENT` and `NEXT_PUBLIC_CONVEX_URL` in `.env.local`. Keep it running while you develop.

In the Clerk dashboard, add a webhook endpoint using the HTTP Actions URL of the **same Convex deployment**. Append `/clerk-users-webhook` to that URL.

```text
https://<your-deployment>.convex.site/clerk-users-webhook
```

Subscribe to `user.created` and `user.updated`. Copy the endpoint's signing secret into the Convex deployment's environment variables under `CLERK_WEBHOOK_SECRET`. The [webhook handler](convex/http.ts) uses these events to populate the user records needed for friend requests and chats. Create your test accounts after the webhook is configured.

### 4. Start Next.js

In a second terminal, from the repository root:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and sign up with a test account.

## Verify the setup

1. Sign up with two test accounts in separate browser profiles. Check in the Convex dashboard that both appear in the `users` table.
2. Open **Friends** and send a request to the second account's email address. Accept it from the second profile, then open the direct conversation in both profiles.
3. Send a message and confirm it appears in the other profile without a refresh.
4. If UploadThing is configured, send an image from the conversation. If LiveKit is configured, join the same conversation's call from both profiles and grant microphone and camera access as needed.

## Architecture

| Component | Location | Responsibility |
| --- | --- | --- |
| Next.js 14, React, and TypeScript | [`app/`](app/) | App Router pages for friends and conversations, plus server routes for uploads and call tokens. |
| Convex | [`convex/`](convex/) | Database schema, reactive queries, and mutations for users, friend requests, conversations, and messages. |
| Clerk | [`providers/ConvexClientProviders.tsx`](providers/ConvexClientProviders.tsx), [`convex/http.ts`](convex/http.ts) | Sign-in, authentication for the Convex client, and user events sent to Convex. |
| LiveKit | [`app/api/livekit/`](app/api/livekit/) | Server-side access tokens for audio and video rooms. |
| UploadThing | [`app/api/uploadthing/`](app/api/uploadthing/) | Authenticated upload routes for chat attachments. |
| Tailwind CSS and shadcn/ui | [`components/`](components/) | Shared interface components and theming. |
| PWA | [`public/manifest.json`](public/manifest.json), [`next.config.mjs`](next.config.mjs) | App manifest and service worker configuration. |

When someone sends a message, a Convex mutation saves it and updates the conversation's latest message. The other participant's subscribed query receives the updated message list.

## Development commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the Next.js development server. |
| `npx convex dev` | Syncs schema and backend functions to the Convex development deployment. |
| `npm run lint` | Runs the project's ESLint checks. |
| `npm run build` | Creates a production build and generates the PWA service worker. |
| `npm start` | Serves the production build created by `npm run build`. |

Use a production build to test PWA installation. The service worker is disabled in Next.js development mode.

## Contributing

Use [GitHub Issues](https://github.com/amin-da/Realtime-chat/issues) to report bugs or propose improvements. For a bug report, include the steps to reproduce it, what you expected, and what happened. For a pull request, run `npm run lint` and describe how you verified the affected workflow.

## License

Contact [the maintainer](https://github.com/amin-da) for permission to reuse or redistribute the code.
