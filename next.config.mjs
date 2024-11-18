/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains: ['images.pexels.com','via.placeholder.com'],
    },
    redirects: async ()=>{
        return [
            {
                source: '/',
                destination: '/admin',
                permanent: true,
            }
        ]
    }
};

export default nextConfig;
