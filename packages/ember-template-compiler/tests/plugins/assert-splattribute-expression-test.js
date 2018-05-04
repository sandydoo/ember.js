import { EMBER_ANGLE_BRACKET_INVOCATION } from '@ember/canary-features';
import { moduleFor, AbstractTestCase } from 'internal-test-helpers';
import { compile } from '../../index';

if (EMBER_ANGLE_BRACKET_INVOCATION) {
  moduleFor(
    'ember-template-compiler: assert-splattribute-expression (EMBER_ANGLE_BRACKET_INVOCATION) ',
    class extends AbstractTestCase {
      '@test ...attributes is valid in element space'() {
        compile('<div ...attributes>Foo</div>');
        this.assert.ok(false);
      }
      '@test {{...attributes}} is not valid'() {
        expectAssertion(() => {
          compile('<div>{{...attributes}}</div>', {
            moduleName: 'foo-bar',
          });
        }, `Using "...attributes" can only be used in the element position e.g. <div ...attributes />. ('baz/foo-bar' @ L1:C8) `);
      }
    }
  );
}
