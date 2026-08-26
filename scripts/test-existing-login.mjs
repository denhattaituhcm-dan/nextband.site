import { createClient } from "@supabase/supabase-js";

const url = "https://gzpdlqxjggyxlkeatvvf.supabase.co";
const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6cGRscXhqZ2d5eGxrZWF0dnZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyOTc3NjMsImV4cCI6MjEwMDg3Mzc2M30.M7uMAo2qJCDQtxQMP-_58VKF1LfSBdwR31gpvqcCN6I";

const supabase = createClient(url, anonKey);

async function testExistingLogin() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: "hoangmai@gmai.com",
    password: "wrongpassword123",
  });
  console.log("Error on existing user wrong password:", error);
}

testExistingLogin();
