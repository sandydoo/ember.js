import { EMBER_ANGLE_BRACKET_INVOCATION } from '@ember/canary-features';
import { moduleFor, AbstractTestCase } from 'internal-test-helpers';
import { compile } from '../../index';

if (EMBER_ANGLE_BRACKET_INVOCATION) {
  moduleFor(
    'ember-template-compiler: assert-splattribute-expression (EMBER_ANGLE_BRACKET_INVOCATION) ',
    class extends AbstractTestCase {
      '@test ...attributes is valid in element space'() {
        compile('<div ...attributes>Foo</div>');
        this.assert.ok(true);
      }
      '@test {{...attributes}} is not valid path expression'() {
        expectAssertion(() => {
          compile('<div>{{...attributes}}</div>', {
            moduleName: 'foo-bar',
          });
        }, `Using "...attributes" can only be used in the element position e.g. <div ...attributes />. It cannot be used as a path. ('foo-bar' @ L1:C7) `);
      }
      '@test {{...attributes}} is not valid modifier'() {
        expectAssertion(() => {
          compile('<div {{...attributes}}>Wat</div>', {
            moduleName: 'foo-bar',
          });
        }, `Using "...attributes" can only be used in the element position e.g. <div ...attributes />. It cannot be used as a path. ('foo-bar' @ L1:C7) `);
      }
      '@test {{...attributes}} is not valid attribute'() {
        expectAssertion(() => {
          compile('<div class={{...attributes}}>Wat</div>', {
            moduleName: 'foo-bar',
          });
        }, `Using "...attributes" can only be used in the element position e.g. <div ...attributes />. It cannot be used as a path. ('foo-bar' @ L1:C13) `);
      }
    }
  );
}
