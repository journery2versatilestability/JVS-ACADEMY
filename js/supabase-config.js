// Supabase Configuration
const SUPABASE_URL = "https://zjyagcajrwthoaufbsip.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqeWFnY2Fqcnd0aG9hdWZic2lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2NjM1NDksImV4cCI6MjA4NjIzOTU0OX0.oCoHc1trYwrqHwAdPQPzaVfaOsQvS-4d0ZmqGg6Boo8";

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
 * Submit a new enquiry to Supabase
 */
async function submitEnquiry(enquiryData) {
    console.log("JVS: Submitting enquiry...");
    try {
        const { data, error } = await supabaseClient
            .from('enquiries')
            .insert({
                name: enquiryData.name || '',
                phone: enquiryData.phone || '',
                email: enquiryData.email || '',
                interest: enquiryData.interest || '',
                message: enquiryData.message || '',
                source: enquiryData.source || 'website'
            });

        if (error) {
            console.error("JVS: Enquiry Submit Error:", error.message);
            return { success: false, error: error.message };
        }

        console.log("JVS: Enquiry submitted successfully.");
        return { success: true };
    } catch (err) {
        console.error("JVS: Unexpected Enquiry error:", err);
        return { success: false, error: err.message };
    }
}

/**
 * Fetch all enquiries (admin use - requires service_role or RLS policy)
 */
async function fetchEnquiries() {
    console.log("JVS: Fetching enquiries...");
    try {
        const { data, error } = await supabaseClient
            .from('enquiries')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("JVS: Enquiries Fetch Error:", error.message);
            return [];
        }

        return data || [];
    } catch (err) {
        console.error("JVS: Unexpected Enquiries Fetch error:", err);
        return [];
    }
}

/**
 * Update enquiry status
 */
async function updateEnquiryStatus(id, status) {
    try {
        const { error } = await supabaseClient
            .from('enquiries')
            .update({ status: status })
            .eq('id', id);

        if (error) {
            console.error("JVS: Enquiry Status Update Error:", error.message);
            return false;
        }
        return true;
    } catch (err) {
        console.error("JVS: Unexpected error:", err);
        return false;
    }
}

/**
 * Delete an enquiry
 */
async function deleteEnquiry(id) {
    try {
        const { error } = await supabaseClient
            .from('enquiries')
            .delete()
            .eq('id', id);

        if (error) {
            console.error("JVS: Enquiry Delete Error:", error.message);
            return false;
        }
        return true;
    } catch (err) {
        console.error("JVS: Unexpected error:", err);
        return false;
    }
}
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
