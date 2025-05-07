# Environment Variables & Secrets Management Guide

## Security Best Practices

When working with sensitive credentials like your Supabase Service Role Key, follow these practices:

1. **NEVER commit credentials to git**

   - Do not store real credentials in any file that might be committed
   - Use `.env.local` files for local development (these are git-ignored)
   - Use Supabase's secrets manager for production credentials

2. **Keep credentials out of your command history**
   - Avoid typing credentials directly in terminal commands
   - Use environment files when possible

## Important Naming Restrictions

The Supabase CLI has a restriction against setting secrets that start with `SUPABASE_` as a security measure. Therefore:

- Use `SERVICE_ROLE_KEY` instead of `SUPABASE_SERVICE_ROLE_KEY` when setting secrets
- This modified naming is already reflected in the code

## Local Development Setup

For local testing, create a `.env.local` file in the Edge Function directory:

```bash
# Create the environment file
touch supabase/functions/database-inspector/.env.local

# Edit the file and add these variables (note the naming difference)
# SUPABASE_URL=https://your-project-ref.supabase.co
# SERVICE_ROLE_KEY=your-service-role-key
```

Then use the `serve:env` script to run the function locally:

```bash
npm run serve:env
```

## Production Deployment

For production, set your secrets securely using the Supabase CLI:

```bash
# Login to Supabase
npm run login

# Link to your project (use ONLY the project reference ID, not the full URL)
npm run link -- --project-ref your-project-ref-id

# Set your service role key (note the naming without SUPABASE_ prefix)
npm run secrets:set -- SERVICE_ROLE_KEY=your-service-role-key

# Deploy the function
npm run deploy
```

The `SUPABASE_URL` variable is automatically available in the Edge Function environment based on your project link, so you don't need to set it manually.

## Recommended Workflow

1. Set up local environment for development and testing
2. Use the CLI commands for setting production secrets
3. Never store real credentials in files that might be committed
4. Regularly rotate your service role key if you suspect it may have been exposed
