#!/usr/bin/env sh

curl -sfL https://raw.githubusercontent.com/lokalise/lokalise-cli-2-go/master/install.sh | sh

./bin/lokalise2 file upload --token "${LOKALISE_TOKEN}" --project-id "${LOKALISE_PROJECT_ID}" --file app/locale/en.json --lang-iso en --keys-to-values --replace-modified --poll --cleanup-mode
