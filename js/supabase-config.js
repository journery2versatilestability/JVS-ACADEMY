// Supabase Configuration
const SUPABASE_URL = "https://zjyagcajrwthoaufbsip.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_N-pU2mWfb5RvVhYcOfvEVg_8AASHtbF";

// Initialize the client
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Fetch all app data from Supabase
 */
async function fetchAppData() {
    console.log("JVS: Fetching data from Supabase...");
    try {
        const { data, error } = await supabaseClient
            .from('app_data')
            .select('*');

        if (error) {
            console.error("JVS: Supabase Fetch Error:", error.message);
            return null;
        }

        if (!data || data.length === 0) {
            console.warn("JVS: No data found in app_data table.");
            return null;
        }

        const result = {};
        data.forEach(item => {
            result[item.section_key] = item.data_value;
        });
        console.log("JVS: Data successfully fetched from Supabase.");
        return result;
    } catch (err) {
        console.error("JVS: Unexpected Fetch error:", err);
        return null;
    }
}

/**
 * Update a specific section in Supabase
 */
async function updateAppData(sectionKey, dataValue) {
    console.log(`JVS: Saving ${sectionKey} to Supabase...`);
    try {
        const { data, error } = await supabaseClient
            .from('app_data')
            .upsert({
                section_key: sectionKey,
                data_value: dataValue,
                updated_at: new Date().toISOString()
            });

        if (error) {
            console.error(`JVS: Supabase Save Error (${sectionKey}):`, error.message);
            alert(`Error saving to cloud: ${error.message}`);
            return;
        }

        console.log(`JVS: Successfully saved ${sectionKey} to Supabase.`);
    } catch (err) {
        console.error("JVS: Unexpected Save error:", err);
    }
}
