#!/bin/bash

# Load environment variables
source .env

# Convert PuTTY key to OpenSSH format
echo "Converting PuTTY key to OpenSSH format..."
puttygen "$DEPLOY_PUTTY_KEY" -O private-openssh -o deploy.key
chmod 600 deploy.key

# Upload public directory
echo "Uploading public directory to $DEPLOY_HOST..."
# sftp -i deploy.key "$DEPLOY_USERNAME@$DEPLOY_HOST" <<EOF
# cd $DEPLOY_PUBLIC_DIRECTORY
# lcd public
# put -r *
# exit
# EOF

echo "Deployment complete!"
