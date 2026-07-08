#!/bin/zsh
set -e

PUBLIC_DIR="/private/tmp/sales-system-demo-public"
APP_DIR="/Users/hechuan/Documents/Codex/2026-07-05/new-chat/outputs/sales-system-demo"

mkdir -p "$PUBLIC_DIR"
cp "$APP_DIR/index.html" "$PUBLIC_DIR/index.html"
cp "$APP_DIR/app.js" "$PUBLIC_DIR/app.js"
cp "$APP_DIR/styles.css" "$PUBLIC_DIR/styles.css"
