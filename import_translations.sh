#!/usr/bin/env sh

curl -sfL https://raw.githubusercontent.com/lokalise/lokalise-cli-2-go/master/install.sh | sh

./bin/lokalise2 file download --project-id "${LOKALISE_PROJECT_ID}" --token "${LOKALISE_TOKEN}" --format json --original-filenames=false --unzip-to app --indentation 2sp --placeholder-format icu
