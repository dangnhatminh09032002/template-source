# Build Structure

Ref Docs

- <https://khalilstemmler.com/blogs/typescript/node-starter-project>

```bash
npm init -y

npm install typescript --save-dev
npm install @types/node --save-dev

# Create file tsconfig.json
npx tsc --init --rootDir src --outDir build \
--esModuleInterop --resolveJsonModule --lib es6 \
--module commonjs --allowJs true --noImplicitAny true
```
