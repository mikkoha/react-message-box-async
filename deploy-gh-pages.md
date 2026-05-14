# Deploying example app to GitHub Pages

The example app is in /example folder. The app is built and the build files are copied to the root of the repository and pushed to the `gh-pages` branch, which is used for GitHub Pages.

0. Make sure the packages are installed (`npm i`, both for the root and the example folder) and the lib is built (`npm run build` in the root folder) before starting the deployment process.

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

Note: Remove old js and css files. Add new index.html, and the new js and css files that the index.html references.

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
