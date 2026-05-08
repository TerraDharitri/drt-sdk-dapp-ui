import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';

import type { CopyButton } from './copy-button';

// prettier-ignore
const styles = {
  buttonStoriesGrid: 'button-stories-grid drt:flex drt:gap-4 drt:flex-wrap',
  buttonStoriesIconSmall: 'button-stories-icon-small drt:w-3! drt:h-3!',
  buttonStoriesIconDefault: 'button-stories-icon-default',
  buttonStoriesIconLarge: 'button-stories-icon-large drt:w-5! drt:h-5!',
  buttonStoriesIconExtraLarge: 'button-stories-icon-extra-large drt:w-6! drt:h-6!',
  buttonStoriesIconHuge: 'button-stories-icon-huge drt:w-8! drt:h-8!',
  buttonStoriesIconBlue: 'button-stories-icon-blue drt:text-blue-600! hover:drt:text-blue-500!',
  buttonStoriesIconGreen: 'button-stories-icon-green drt:text-green-600! hover:drt:text-green-500!',
  buttonStoriesIconRed: 'button-stories-icon-red drt:text-red-600! hover:drt:text-red-500!',
  buttonStoriesIconPurple: 'button-stories-icon-purple drt:text-purple-600! hover:drt:text-purple-500!',
  buttonStoriesIconOrange: 'button-stories-icon-orange drt:text-orange-600! hover:drt:text-orange-500!',
  buttonStoriesButtonDefault: 'button-stories-button-default drt:text-gray-700! hover:drt:text-gray-900!',
  buttonStoriesButtonBackground: 'button-stories-button-background drt:bg-gray-200! drt:p-2! drt:rounded! hover:drt:bg-gray-300! drt:text-gray-800!',
  buttonStoriesButtonBorder: 'button-stories-button-border drt:border! drt:border-gray-400! drt:p-2! drt:rounded! hover:drt:border-gray-500! drt:text-gray-800!',
  buttonStoriesButtonCircular: 'button-stories-button-circular drt:bg-blue-100! drt:p-2! drt:rounded-full! hover:drt:bg-blue-200! drt:text-blue-800!',
  buttonStoriesButtonShadow: 'button-stories-button-shadow drt:bg-white! drt:p-2! drt:rounded! drt:shadow-md! hover:drt:shadow-lg! drt:text-gray-800! drt:border! drt:border-gray-200!',
  buttonStoriesIconBackground: 'button-stories-icon-background drt:text-gray-700! hover:drt:text-gray-900!',
  buttonStoriesIconBorder: 'button-stories-icon-border drt:text-gray-700! hover:drt:text-gray-900!',
  buttonStoriesIconCircular: 'button-stories-icon-circular drt:text-blue-600! hover:drt:text-blue-800!',
  buttonStoriesIconShadow: 'button-stories-icon-shadow drt:text-gray-700! hover:drt:text-gray-900!',
  buttonStoriesIconPrimaryDefault: 'button-stories-icon-primary-default',
  buttonStoriesButtonLargeBlue: 'button-stories-button-large-blue drt:bg-blue-50! drt:p-2! drt:rounded! hover:drt:bg-blue-100!',
  buttonStoriesIconLargeBlue: 'button-stories-icon-large-blue drt:w-5! drt:h-5! drt:text-blue-600! hover:drt:text-blue-500!',
  buttonStoriesButtonCompactGreen: 'button-stories-button-compact-green drt:border! drt:border-green-300! drt:p-1! drt:rounded!',
  buttonStoriesIconCompactGreen: 'button-stories-icon-compact-green drt:w-3! drt:h-3! drt:text-green-600!',
} satisfies Record<string, string>;

const storySettings: Meta<CopyButton> = {
  tags: ['autodocs'],
  title: 'Components/CopyButton',
  render: properties => <drt-copy-button {...properties} />,
  args: {
    text: 'Hello World!',
  },
  argTypes: {
    text: { control: 'text' },
    iconClass: { control: 'text' },
    class: { control: 'text' },
  },
};

export const Default: StoryObj<CopyButton> = {
  render: () => <drt-copy-button text="Copy this text" />,
};

export const Sizes: StoryObj<CopyButton> = {
  render: () => (
    <div class={styles.buttonStoriesGrid}>
      <drt-copy-button text="Copy small" iconClass={styles.buttonStoriesIconSmall} />
      <drt-copy-button text="Copy default" iconClass={styles.buttonStoriesIconDefault} />
      <drt-copy-button text="Copy large" iconClass={styles.buttonStoriesIconLarge} />
      <drt-copy-button text="Copy XL" iconClass={styles.buttonStoriesIconExtraLarge} />
      <drt-copy-button text="Copy huge" iconClass={styles.buttonStoriesIconHuge} />
    </div>
  ),
};

export const Colors: StoryObj<CopyButton> = {
  render: () => (
    <div class={styles.buttonStoriesGrid}>
      <drt-copy-button text="Copy blue" iconClass={styles.buttonStoriesIconBlue} />
      <drt-copy-button text="Copy green" iconClass={styles.buttonStoriesIconGreen} />
      <drt-copy-button text="Copy red" iconClass={styles.buttonStoriesIconRed} />
      <drt-copy-button text="Copy purple" iconClass={styles.buttonStoriesIconPurple} />
      <drt-copy-button text="Copy orange" iconClass={styles.buttonStoriesIconOrange} />
    </div>
  ),
};

export const ButtonStyles: StoryObj<CopyButton> = {
  render: () => (
    <div class={styles.buttonStoriesGrid}>
      <drt-copy-button text="Default" iconClass={styles.buttonStoriesButtonDefault} />

      <drt-copy-button
        text="Background"
        class={styles.buttonStoriesButtonBackground}
        iconClass={styles.buttonStoriesIconBackground}
      />

      <drt-copy-button
        text="Border"
        class={styles.buttonStoriesButtonBorder}
        iconClass={styles.buttonStoriesIconBorder}
      />

      <drt-copy-button
        text="Circular"
        class={styles.buttonStoriesButtonCircular}
        iconClass={styles.buttonStoriesIconCircular}
      />

      <drt-copy-button
        text="Shadow"
        class={styles.buttonStoriesButtonShadow}
        iconClass={styles.buttonStoriesIconShadow}
      />
    </div>
  ),
};

export default storySettings;
