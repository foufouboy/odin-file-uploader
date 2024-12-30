import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://scfnwgfnghaxuwuyvcvt.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjZm53Z2ZuZ2hheHV3dXl2Y3Z0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNTIyNjcyMywiZXhwIjoyMDUwODAyNzIzfQ.wwHOYdBHKqH_MzbGQ1DHyFvveESW8DF0Ivk59v9VuCw";
const supabase = createClient(supabaseUrl, supabaseKey);

const uploadFile = async (bucketName: string, file: any) => {
    const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(file?.originalname, file.buffer, {
            contentType: file.mimetype,
        });

    return { data, error };
}

const getLongSignedUrl = async (bucketName: string, filePath: any) => {
    const TEN_YEARS_IN_SECONDS = 3600 * 24 * 365 * 10;

    const { data, error } = await supabase.storage
        .from(bucketName)
        .createSignedUrl(filePath, TEN_YEARS_IN_SECONDS);
    
    return data?.signedUrl;
}

export default supabase;
export {
    uploadFile,
    getLongSignedUrl
};