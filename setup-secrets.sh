#!/bin/bash

echo "Setting up Cloudflare Worker secrets..."
echo "Make sure you're logged in to Wrangler first: wrangler login"
echo ""

# You'll need to replace these with your actual values
echo "Please run these commands with your actual secret values:"
echo ""
echo "wrangler secret put PAYLOAD_SECRET"
echo "wrangler secret put RESEND_API_KEY"
echo "wrangler secret put RESEND_FROM_EMAIL"
echo "wrangler secret put R2_BUCKET"
echo "wrangler secret put R2_ACCESS_KEY_ID" 
echo "wrangler secret put R2_SECRET_ACCESS_KEY"
echo "wrangler secret put R2_ENDPOINT"
echo ""
echo "Each command will prompt you to enter the secret value securely."
echo ""
echo "After setting secrets, deploy with: wrangler deploy"