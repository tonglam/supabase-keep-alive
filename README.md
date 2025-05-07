# Supabase Keep-Alive

A simple solution to keep your Supabase database active by periodically listing tables and querying the first record.

## What's This For?

Free and hobby tier Supabase databases may be paused after periods of inactivity. This project provides a straightforward way to prevent that by periodically executing lightweight queries using Supabase Edge Functions and Cron Jobs.

## How It Works

This project contains a Supabase Edge Function (`database-inspector`) that:

1. Lists all valid tables in your database's public schema
2. Selects the first record from the first table found
3. Returns the results or appropriate error messages

This function can be scheduled to run at regular intervals (e.g., every 6 hours) using Supabase's built-in Cron Jobs feature, ensuring your database remains active.

## Directory Structure

```
supabase-keep-alive/
├── supabase/
│   └── functions/
│       └── database-inspector/
│           ├── index.ts        # The Edge Function code
│           └── README.md       # Detailed function documentation
├── ENV-GUIDE.md                # Environment and secrets management guide
└── README.md                   # This file
```

## Prerequisites

You'll need to install the Supabase CLI to deploy functions. On macOS, the recommended method is:

```bash
# Install with Homebrew (recommended for macOS)
brew install supabase/tap/supabase

# Verify installation
supabase --version
```

For other operating systems, see the [Supabase CLI installation guide](https://supabase.com/docs/guides/cli/getting-started).

## Quick Deployment

For security reasons, credentials are managed through CLI commands rather than stored in files:

```bash
# Login to Supabase
npm run login

# Link to your project (use ONLY the project ID, not the full URL)
# Example: for URL https://app.supabase.com/project/abcdefghijk
# Use:  npm run link -- --project-ref abcdefghijk
npm run link -- --project-ref your-project-id

# Set your service role key (use SERVICE_ROLE_KEY, not SUPABASE_SERVICE_ROLE_KEY)
npm run secrets:set -- SERVICE_ROLE_KEY=your-service-role-key

# Deploy the function
npm run deploy
```

**⚠️ Important Notes:**

- Use only the project ID portion of your Supabase URL, not the full dashboard URL
- Due to Supabase CLI restrictions, you must use `SERVICE_ROLE_KEY` (without the SUPABASE\_ prefix)

## Setting Up the Cron Job

After successful deployment:

1. Go to your Supabase dashboard > Database > Cron Jobs
2. Click on "New cron job"
3. Configure the cron schedule (e.g., "0 _/6 _ \* \*" for every 6 hours)
4. Use this SQL command (replace values with your actual data):

```sql
SELECT net.http_post(
  'https://your-project-ref.supabase.co/functions/v1/database-inspector',
  '{}',
  '{"Authorization": "Bearer your-anon-key", "Content-Type": "application/json"}'
)::text;
```

## Security Considerations

This solution uses the Supabase service role key, which has administrative privileges. For detailed information on secure credential management, see [ENV-GUIDE.md](ENV-GUIDE.md).

## License

MIT
