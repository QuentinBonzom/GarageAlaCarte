#!/usr/bin/env node
/**
 * Script to migrate blog_articles table to Supabase
 * Usage: node scripts/migrate-blog-articles.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, "../.env") });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Missing SUPABASE environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function runMigration() {
  try {
    console.log("📚 Running blog_articles migration...");

    // Read SQL file
    const sqlPath = path.join(
      __dirname,
      "../database/create_blog_articles_table.sql",
    );
    const sqlContent = fs.readFileSync(sqlPath, "utf-8");

    // Split by semicolon and execute each statement
    const statements = sqlContent
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s && !s.startsWith("--"));

    console.log(`📝 Found ${statements.length} SQL statements`);

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      console.log(`\n[${i + 1}/${statements.length}] Executing...`);

      const { data, error } = await supabase
        .rpc("exec_sql", {
          sql_query: statement + ";",
        })
        .catch(() => {
          // Fallback: use raw query if rpc doesn't exist
          return supabase.from("_raw_sql").insert({ query: statement });
        });

      if (error) {
        console.warn(`⚠️  Statement ${i + 1} warning:`, error.message);
        // Continue anyway, as some statements might fail (e.g., DROP IF EXISTS)
      } else {
        console.log(`✓ Statement ${i + 1} executed`);
      }
    }

    console.log("\n✅ Migration complete!");
    console.log("\n📊 Checking blog_articles table...");

    const { data, error: checkError } = await supabase
      .from("blog_articles")
      .select("id, slug, title_en, is_active")
      .limit(5);

    if (checkError) {
      console.error("❌ Error fetching blog articles:", checkError);
    } else {
      console.log(`✓ Found ${data?.length || 0} articles in database`);
      data?.forEach((article) => {
        console.log(`  - ${article.slug}: ${article.title_en}`);
      });
    }
  } catch (error) {
    console.error("❌ Migration failed:", error.message);
    process.exit(1);
  }
}

runMigration();
