#!/usr/bin/env bash
set -ex

# ✅ fallback: instalează ddev dacă nu există
if ! command -v ddev &> /dev/null; then
  echo "ddev not found, installing..."
  curl -fsSL https://get.ddev.com | bash
fi

wait_for_docker() {
  while true; do
    docker ps > /dev/null 2>&1 && break
    sleep 1
  done
  echo "Docker is ready."
}

wait_for_docker

# download images beforehand, optional
ddev debug download-images

# avoid errors on rebuilds
ddev poweroff

# start ddev project automatically
ddev start -y

# further automated install / setup steps, e.g.
ddev composer install
