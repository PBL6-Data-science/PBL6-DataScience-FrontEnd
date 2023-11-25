/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NAME: 'DUT - BLOG',
        FULL_NAME: 'DUT - BLOG - Da Nang University of Technology',
        NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH || "",
        //REACT_APP_SERVER_AI: "http://127.0.0.1:5000/api",
        REACT_APP_SERVER_AI: " https://ai-server-8op8.onrender.com/api",  
        //REACT_APP_SERVER: "https://localhost:5001/api",
        REACT_APP_SERVE_GG: "https://sheet.best/api/sheets",
        REACT_APP_SERVER: "https://hungahot-001-site1.atempurl.com/api",
        EXPIRES: 4, // today + 4 day

        // Firebase config
        REACT_APP_API_KEY: "AIzaSyCeScW0gbc3r1MqczOXL3ddbs8ffit0igs",
        REACT_APP_AUTH_DOMAIN: "dut-blog.firebaseapp.com",
        REACT_APP_PROJECT_ID: "dut-blog",
        REACT_APP_STORAGE_BUCKET: "dut-blog.appspot.com",
        REACT_APP_MESSAGINGSENDER_ID: "1052702575597",
        REACT_APP_APP_ID: "1:1052702575597:web:e22a5dfff7b9499b97b5e4",
        REACT_APP_MEASUREMENTID: "G-HVVSFLBM39",    
    },
}

module.exports = nextConfig
