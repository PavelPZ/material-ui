// @flow

import React from 'react';
import { assert } from 'chai';
import { createMount } from 'src/test-utils';
import SelectAndDialog from './fixtures/select/SelectAndDialog';
import mockPortal from '../../test/utils/mockPortal';

describe('<Select> integration', () => {
  let mount;

  before(() => {
    mount = createMount();
    mockPortal.init();
  });

  after(() => {
    mount.cleanUp();
    mockPortal.reset();
  });

  describe('with Dialog', () => {
    it('should focus the selected item', done => {
      const wrapper = mount(<SelectAndDialog open />);
      const portalLayer = wrapper
        .find('Portal')
        .instance()
        .getLayer();
      const selectDisplay = portalLayer.querySelector('[data-mui-test="SelectDisplay"]');

      wrapper.setProps({
        MenuProps: {
          onExited: () => {
            assert.strictEqual(
              document.activeElement,
              selectDisplay,
              'should focus back the select input',
            );
            done();
          },
        },
      });

      // Let's open the select component
      selectDisplay.focus();
      selectDisplay.click();

      const dialogPortalLayer = document.querySelectorAll('[data-mui-test="Modal"]')[1];

      assert.strictEqual(
        document.activeElement,
        dialogPortalLayer.querySelectorAll('li')[1],
        'should focus the selected menu item',
      );

      // Now, let's close the select component
      const backdrop = dialogPortalLayer.querySelector('[data-mui-test="Backdrop"]');
      if (backdrop) {
        backdrop.click();
      }
    });
  });
});
