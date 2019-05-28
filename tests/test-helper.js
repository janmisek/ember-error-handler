import resolver from './helpers/resolver';
import enableQUnitConsoleErrors from './helpers/qunit-console-errors';
import { start } from 'ember-cli-qunit';
import {setResolver} from '@ember/test-helpers';


enableQUnitConsoleErrors();
setResolver(resolver);
start();
