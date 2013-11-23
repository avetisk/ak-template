JS = $$(find index.js test/index.js)

clean:
	@rm -f test/build.js
	@rm -fr node_modules

buildtest:
	@./node_modules/.bin/browserify -d test/index.js > test/build.js

test: validate buildtest
	@./node_modules/.bin/karma start

validate:
	@jshint --config .jshintrc $(JS)


.PHONY: clean buildtest test validate
