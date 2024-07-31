start-dev:
	- webpack server --mode development

build-staging:
	- webpack --mode development

build-production:
	- webpack --mode production

test:
	- npm run test