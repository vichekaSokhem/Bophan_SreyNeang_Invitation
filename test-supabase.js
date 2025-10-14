// Test Supabase connection and create table if needed
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://smghbdljkdvluvyzqfwr.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtZ2hiZGxqa2R2bHV2eXpxZndyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MDYzNTEsImV4cCI6MjA3NTQ4MjM1MX0.msInecJteCxv6ZreHbIoFRR1fnepEFc3D3aVkDO1ZFM";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSupabase() {
  console.log("🔍 Testing Supabase connection...");

  // Test basic connection
  try {
    const { data, error } = await supabase
      .from("comments")
      .select("count", { count: "exact" });

    if (error) {
      console.error("❌ Error connecting to Supabase:", error.message);

      if (
        error.message.includes("relation") &&
        error.message.includes("does not exist")
      ) {
        console.log(
          "📝 The 'comments' table doesn't exist. Here's the SQL to create it:"
        );
        console.log(`
CREATE TABLE comments (
  id BIGSERIAL PRIMARY KEY,
  name TEXT,
  text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Create policies to allow read and insert for all users
CREATE POLICY "Allow all users to read comments" ON comments FOR SELECT USING (true);
CREATE POLICY "Allow all users to insert comments" ON comments FOR INSERT WITH CHECK (true);
        `);

        console.log("🔧 Please run this SQL in your Supabase SQL editor:");
        console.log("1. Go to https://supabase.com/dashboard");
        console.log("2. Select your project");
        console.log("3. Go to SQL Editor");
        console.log("4. Paste and run the SQL above");
      }
    } else {
      console.log("✅ Connected to Supabase successfully!");
      console.log(`📊 Found ${data[0]?.count || 0} comments in the database`);

      // Try to fetch a few comments
      const { data: comments, error: fetchError } = await supabase
        .from("comments")
        .select("*")
        .limit(5);

      if (fetchError) {
        console.error("❌ Error fetching comments:", fetchError.message);
      } else {
        console.log("📝 Sample comments:", comments);
      }
    }
  } catch (err) {
    console.error("💥 Unexpected error:", err.message);
  }
}

testSupabase();
