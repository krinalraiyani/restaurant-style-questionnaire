/*
 * Supabase connection used by index.html (clients submit answers) and admin.html (you read them).
 * Both values come from Supabase: Project Settings > API Keys / Data API.
 * The publishable key is meant to be public: the database rules in supabase/schema.sql only let it ADD answers,
 * never read or delete them. Never put a secret (sb_secret_...) or service_role key here.
 */

/** @type {string} Project URL, for example "https://abcdefghijkl.supabase.co" */
const SUPABASE_URL = "https://lrwufzsbkozmvhsbzwup.supabase.co";

/** @type {string} The publishable key (sb_publishable_...) */
const SUPABASE_ANON_KEY = "sb_publishable_RJiRncawjRIa32EvCP3sUw_4SZHNONU";

class DatabaseNotConfiguredError extends Error {}

/** Throws when config.js still holds the placeholders, so pages fail with a clear message. */
function assertDatabaseConfigured() {
  if (SUPABASE_URL.startsWith("PASTE_") || SUPABASE_ANON_KEY.startsWith("PASTE_")) {
    throw new DatabaseNotConfiguredError("The database is not connected yet. Add the Supabase URL and anon key to config.js.");
  }
}
