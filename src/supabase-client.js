import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cdfdcciwucuwbbdftgeu.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkZmRjY2l3dWN1d2JiZGZ0Z2V1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMDQ4MDAsImV4cCI6MjA2OTg4MDgwMH0.JT45UfIcivVG0W8vx-lLyh_auIQa6kDiSG2uPZzLBmw";

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});