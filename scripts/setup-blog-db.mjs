#!/usr/bin/env node
/**
 * Display SQL migration instructions for blog_articles table
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function displayMigration() {
  try {
    console.log("🔗 Blog Articles CMS Migration\n");

    // Read the SQL file
    const sqlFilePath = path.join(
      __dirname,
      "../database/create_blog_articles_table.sql",
    );
    const sql = fs.readFileSync(sqlFilePath, "utf-8");

    console.log("✅ SQL file loaded successfully\n");
    console.log("✋ IMPORTANT: Execute this SQL in your Supabase Dashboard:\n");
    console.log("1. Go to: https://app.supabase.com/project/_/sql");
    console.log("2. Click 'New query'");
    console.log("3. Copy and paste the SQL below:");
    console.log("\n" + "=".repeat(70));
    console.log(sql);
    console.log("=".repeat(70) + "\n");
    console.log("4. Click 'Run' or press Ctrl+Enter");
    console.log(
      "5. Verify the table 'blog_articles' appears in your database\n",
    );

    console.log(
      "✅ SQL file saved at: database/create_blog_articles_table.sql",
    );
    console.log("📖 Setup guide: BLOG_CMS_SETUP.md\n");
    console.log(
      "🎉 Once executed, manage blog articles in the CMS admin panel!",
    );
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

displayMigration();
