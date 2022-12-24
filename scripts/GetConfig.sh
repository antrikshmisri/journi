# Get the firebase config for journi app from firebase console
# Usage: ./GetConfig.sh


# Get the firebase config from firebase console
firebase apps:sdkconfig web --json > src/firebaseConfig.json

