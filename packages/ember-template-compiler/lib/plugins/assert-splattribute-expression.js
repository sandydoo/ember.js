import { assert } from '@ember/debug';
import calculateLocationDisplay from '../system/calculate-location-display';
import { EMBER_ANGLE_BRACKET_INVOCATION } from '@ember/canary-features';

export default function assertSplattributeExpressions(env) {
  let { moduleName } = env.meta;

  return {
    name: 'assert-splattribute-expressions',

    visitor: {
      PathExpression({ original, loc }) {
        if (original === '...attributes') {
          assert(`${errorMessage()} ${calculateLocationDisplay(moduleName, loc)}`);
        }
      },
    },
  };
}

function errorMessage() {
  if (EMBER_ANGLE_BRACKET_INVOCATION) {
    return `Using "...attributes" can only be used in the element position e.g. <div ...attributes />.`;
  }

  return `...attributes is an invalid path`;
}
