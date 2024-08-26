# Deploying example app to GitHub Pages

1. Build the app:

```bash
cd example
# Remove existing build files to make sure we are not pushing unnecessary files
rm -rf dist
npm run build
cd ..
```

2. Switch to gh-pages branch:

```bash
git checkout gh-pages
```

3. Copy new build files to root:

```bash
cp -R example/dist/* .
```

4. Add changed page files, remove old files:

```bash
git add index.html index.xxx.js index.xxx.js.map
git rm index.yyy.js index.yyy.js.map
```

5. Commit and push:

```bash
git commit -m "Deploy example app to GitHub Pages"
git push origin gh-pages
```

6. Switch back to main branch:

```bash
git checkout main
```
