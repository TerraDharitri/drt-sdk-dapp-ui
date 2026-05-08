import { newSpecPage } from '@stencil/core/testing';
import * as copyUtils from 'utils/copyToClipboard';

import { CopyButton } from '../copy-button';

describe('CopyButton', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [CopyButton],
      html: '<drt-copy-button text="Copy me"></drt-copy-button>',
    });

    expect(page.root).toEqualHtml(`
      <drt-copy-button text="Copy me">
        <div class="copy-button">
          <drt-copy-icon class="copy-button-icon"></drt-copy-icon>
        </div>
      </drt-copy-button>
    `);
  });

  it('renders with custom class', async () => {
    const page = await newSpecPage({
      components: [CopyButton],
      html: '<drt-copy-button class="custom-class" text="Copy me"></drt-copy-button>',
    });

    expect(page.root).toEqualHtml(`
      <drt-copy-button class="custom-class" text="Copy me">
        <div class="copy-button custom-class">
          <drt-copy-icon class="copy-button-icon"></drt-copy-icon>
        </div>
      </drt-copy-button>
    `);
  });

  it('changes to success icon when clicked and copy succeeds', async () => {
    jest.spyOn(copyUtils, 'copyToClipboard').mockResolvedValue(true);

    const page = await newSpecPage({
      components: [CopyButton],
      html: '<drt-copy-button text="Copy me"></drt-copy-button>',
    });

    const copyButton = page.root;
    const component = page.rootInstance as CopyButton;
    await component.handleClick(new MouseEvent('click') as any);
    await page.waitForChanges();

    expect(copyButton).toEqualHtml(`
      <drt-copy-button text="Copy me">
        <div class="copy-button">
          <drt-check-icon class="check copy-button-icon"></drt-check-icon>
        </div>
      </drt-copy-button>
    `);
  });

  it('remains with copy icon when clicked and copy fails', async () => {
    jest.spyOn(copyUtils, 'copyToClipboard').mockResolvedValue(false);

    const page = await newSpecPage({
      components: [CopyButton],
      html: '<drt-copy-button text="Copy me"></drt-copy-button>',
    });

    const copyButton = page.root;
    const component = page.rootInstance as CopyButton;
    await component.handleClick(new MouseEvent('click') as any);
    await page.waitForChanges();

    expect(copyButton).toEqualHtml(`
      <drt-copy-button text="Copy me">
        <div class="copy-button">
          <drt-copy-icon class="copy-button-icon"></drt-copy-icon>
        </div>
      </drt-copy-button>
    `);
  });

  it('prevents default behavior and stops propagation on click', async () => {
    const page = await newSpecPage({
      components: [CopyButton],
      html: '<drt-copy-button text="Copy me"></drt-copy-button>',
    });

    const mockEvent = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    };

    const component = page.rootInstance as CopyButton;
    await component.handleClick(mockEvent as any);

    expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(mockEvent.stopPropagation).toHaveBeenCalledTimes(1);
  });
});
