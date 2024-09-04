const config = {
  appwrite_URL: String(import.meta.env.VITE_APPWRITE_URL),
  appwritePROJECT_ID: String(
    import.meta.env.VITE_APPWRITE_PROJECT_ID
  ),
  appwriteDATABASE_ID: String(
    import.meta.env.VITE_APPWRITE_DATABASE_ID
  ),
  appwriteCOLLECTION_ID: String(
    import.meta.env.VITE_APPWRITE_COLLECTION_ID
  ),
  appwriteBUCKET_ID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default config;
