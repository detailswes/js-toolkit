# Setup Guide

## 1. Install dependencies

```bash
cd /path/to/daily-utils
npm install
```

## 2. Initialize as a git repo (if not already)

```bash
git init
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git add .
git commit -m "initial project setup"
git push -u origin main
```

## 3. Set up the cron job

Open your crontab:

```bash
crontab -e
```

Add this line (runs every weekday at 9:15am):

```
15 9 * * 1-5 cd /path/to/daily-utils && /usr/bin/node scripts/auto-commit.js >> /tmp/auto-commit.log 2>&1
```

To verify it was added:

```bash
crontab -l
```

## 4. Test it manually first

```bash
node scripts/auto-commit.js
```

Check the output — it should move one file, update CHANGELOG.md, commit and push.

## 5. Adding more files to the queue

When the queue runs out (after 30 days), add new files:
- Create `031-yourFunction.js` in the `queue/` folder
- Add a new entry to `queue/commits.json` with the file name, destination, and a realistic commit message
- The script will pick it up on the next run

## Notes

- The script commits exactly **one file per run**
- If cron runs but your machine is off, nothing happens that day (skipped, not doubled up)
- Commit times are the actual time cron runs — they look natural because they are natural
- The `queue/` folder is intentionally excluded from git (add it to .gitignore)
