/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    env: {
        API_TOKEN: process.env.API_TOKEN,
    },
    images: {
        domains: []
    }
}

module.exports = nextConfig
