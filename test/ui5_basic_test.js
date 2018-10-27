import UI5Selector from '../lib/ui5-testcafe-selector';
import { ClientFunction } from 'testcafe';

fixture`vue-js`
    .page`http://localhost:8080/test/ui5/`;

test('root node', async t => {
    const root = UI5Selector("idComboBox");
    const test = await root;

    await t
        .expect(root.exists).ok();
});