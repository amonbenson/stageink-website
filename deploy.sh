#!/bin/bash
set -euo pipefail

# Load environment variables
source .env
source .env.local

# Convert PuTTY key to OpenSSH format
echo "Converting PuTTY key to OpenSSH format..."
puttygen "$DEPLOY_PUTTY_KEY" -O private-openssh -o deploy.key
chmod 600 deploy.key

# Create backup with timestamp
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR=".backup/$TIMESTAMP"
mkdir -p "$BACKUP_DIR"

echo "Backing up remote directory to $BACKUP_DIR..."
sftp -i deploy.key "$DEPLOY_USERNAME@$DEPLOY_HOST" <<EOF
lcd $BACKUP_DIR
cd $DEPLOY_PUBLIC_DIRECTORY
get -r *
exit
EOF

echo "Backup complete!"

# Upload public directory
echo "Uploading public directory to $DEPLOY_HOST..."
# sftp -i deploy.key "$DEPLOY_USERNAME@$DEPLOY_HOST" <<EOF
# cd $DEPLOY_PUBLIC_DIRECTORY
# lcd dist
# put -r *
# exit
# EOF

echo "Deployment complete!"
