# Database Inspector Edge Function

This Supabase Edge Function connects to your Supabase database, lists all tables in the public schema, and selects the first record from the first table. It can be triggered manually or scheduled as a cron job to keep your Supabase database alive.

## Environment Variables

This function requires the following environment variables:

- `SUPABASE_URL` - Your Supabase project URL (e.g., `https://your-project-ref.supabase.co`)
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (found in Project Settings > API)

## Prerequisites

Make sure you've installed the Supabase CLI as described in the main [README.md](../../README.md).

## Local Development

1. Create a `.env.local` file in this directory with your environment variables:

```
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

2. Run the function locally:

```bash
npm run serve
```

Or directly with the CLI:

```bash
supabase functions serve database-inspector --env-file .env.local
```

## Deployment

1. First, update your `package.json` to include your project reference and service role key:

```json
"scripts": {
  "link": "supabase link --project-ref your-project-ref",
  "secrets:set": "supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key"
}
```

2. Login, link your project, and set secrets:

```bash
npm run login
npm run link
npm run secrets:set
```

3. Deploy the function:

```bash
npm run deploy
```

Note: The `SUPABASE_URL` environment variable is automatically available in the Edge Function environment, so you don't need to set it manually.

## Setting up a Cron Job

Once deployed, you can set up a cron job to trigger this function periodically:

1. Go to your Supabase dashboard > Database > Cron Jobs
2. Click on "New cron job"
3. Configure your cron schedule (e.g., "0 _/6 _ \* \*" for every 6 hours)
4. For the cron job command, use:

```sql
SELECT net.http_post(
  'https://your-project-ref.supabase.co/functions/v1/database-inspector',
  '{}',
  '{"Authorization": "Bearer your-anon-key-here", "Content-Type": "application/json"}'
)::text;
```

Replace `your-project-ref` with your actual Supabase project reference and `your-anon-key-here` with your project's anon key.

## Testing

You can test the function by sending a POST request to its endpoint:

```bash
curl -X POST https://your-project-ref.supabase.co/functions/v1/database-inspector \
  -H "Authorization: Bearer your-anon-key-here" \
  -H "Content-Type: application/json"
```

The response will include the list of tables found and the first record from the first table, or an appropriate error message.
