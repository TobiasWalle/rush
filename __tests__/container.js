'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
const testUtils = require('../utils/test-utils');

describe('generator-trb:container', () => {
  const CONTAINER_NAME = 'hello-world';

  const FILE_NAME = path.join(`${CONTAINER_NAME}.container.ts`);

  const COMPONENT_CLASS_NAME = 'HelloWorldComponent';
  const CLASS_NAME = 'HelloWorldContainer';
  const PROPS_NAME = 'HelloWorldContainerProps';

  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/container'))
      .withOptions({destination: '.', module: 'app'})
      .withArguments([CONTAINER_NAME]);
  });

  it('creates files', () => {
    assert.file([
      FILE_NAME
    ]);
  });

  it('should add content to files', () => {
    testUtils.assertFileContains(FILE_NAME, [
      COMPONENT_CLASS_NAME, CLASS_NAME, PROPS_NAME
    ]);
  });
});
