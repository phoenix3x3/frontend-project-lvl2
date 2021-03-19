install:
	npm install
publish:
	npm publish --dry-run
test:
	npm test --colors
test-coverage:
	npm test -- --coverage --coverageProvider=v8 --colors
lint:
	npx eslint .