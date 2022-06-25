# Build Structure

Ref Docs

- <https://khalilstemmler.com/blogs/typescript/node-starter-project>
- <https://dev.to/santypk4/bulletproof-node-js-project-architecture-4epf>

```bash
npm init -y

npm install typescript --save-dev
npm install @types/node --save-dev

# Create file tsconfig.json
npx tsc --init --rootDir src --outDir build \
--esModuleInterop --resolveJsonModule --lib es6 \
--module commonjs --allowJs true --noImplicitAny true
```

# Start App

Download NVM <https://github.com/coreybutler/nvm-windows/releases>

```bash
npm --version
node --version 
# Check version

# npm v8.11.0
# node v16.15.1

nvm install 16.15.1
nvm use 16.15.1

sh ./scripts/start.sh
```

### Config prettierrc

- Ctr + Shift + P
- Find: Fomart Document With
- Use format Json
