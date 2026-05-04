import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';

import type { ExplorerLink } from './explorer-link';

const DEVNET_EXPLORER_URL = 'https://devnet-explorer.dharitri.org';

// prettier-ignore
const styles = {
  explorerStoriesGrid: 'explorer-stories-grid drt:flex drt:gap-4 drt:flex-wrap',
  explorerStoriesIconSmall: 'explorer-stories-icon-small drt:w-3! drt:h-3! ',
  explorerStoriesIconDefault: 'explorer-stories-icon-default ',
  explorerStoriesIconLarge: 'explorer-stories-icon-large drt:w-5! drt:h-5! ',
  explorerStoriesIconExtraLarge: 'explorer-stories-icon-extra-large drt:w-6! drt:h-6! ',
  explorerStoriesIconHuge: 'explorer-stories-icon-huge drt:w-8! drt:h-8! ',
  explorerStoriesIconBlue: 'explorer-stories-icon-blue drt:text-blue-600! hover:drt:text-blue-500!',
  explorerStoriesIconGreen: 'explorer-stories-icon-green drt:text-green-600! hover:drt:text-green-500!',
  explorerStoriesIconRed: 'explorer-stories-icon-red drt:text-red-600! hover:drt:text-red-500!',
  explorerStoriesIconPurple: 'explorer-stories-icon-purple drt:text-purple-600! hover:drt:text-purple-500!',
  explorerStoriesIconOrange: 'explorer-stories-icon-orange drt:text-orange-600! hover:drt:text-orange-500!',
  explorerStoriesButtonDefault: 'explorer-stories-button-default drt:text-gray-700! hover:drt:text-gray-900!',
  explorerStoriesButtonBackground: 'explorer-stories-button-background drt:bg-gray-200! drt:p-2! drt:rounded! hover:drt:bg-gray-300! drt:text-gray-800!',
  explorerStoriesButtonBorder: 'explorer-stories-button-border drt:border! drt:border-gray-400! drt:p-2! drt:rounded! hover:drt:border-gray-500! drt:text-gray-800!',
  explorerStoriesButtonCircular: 'explorer-stories-button-circular drt:bg-blue-100! drt:p-2! drt:rounded-full! hover:drt:bg-blue-200! drt:text-blue-800!',
  explorerStoriesButtonShadow: 'explorer-stories-button-shadow drt:bg-white! drt:p-2! drt:rounded! drt:shadow-md! hover:drt:shadow-lg! drt:text-gray-800! drt:border! drt:border-gray-200!',
  explorerStoriesIconBackground: 'explorer-stories-icon-background drt:text-gray-700! hover:drt:text-gray-900!',
  explorerStoriesIconBorder: 'explorer-stories-icon-border drt:text-gray-700! hover:drt:text-gray-900!',
  explorerStoriesIconCircular: 'explorer-stories-icon-circular drt:text-blue-600! hover:drt:text-blue-800!',
  explorerStoriesIconShadow: 'explorer-stories-icon-shadow drt:text-gray-700! hover:drt:text-gray-900!',
  explorerStoriesIconPrimaryDefault: 'explorer-stories-icon-primary-default ',
  explorerStoriesButtonLargeBlue: 'explorer-stories-button-large-blue drt:bg-blue-50! drt:p-2! drt:rounded! hover:drt:bg-blue-100!',
  explorerStoriesIconLargeBlue: 'explorer-stories-icon-large-blue drt:w-5! drt:h-5! drt:text-blue-600! hover:drt:text-blue-500!',
  explorerStoriesButtonCompactGreen: 'explorer-stories-button-compact-green drt:border! drt:border-green-300! drt:p-1! drt:rounded!',
  explorerStoriesIconCompactGreen: 'explorer-stories-icon-compact-green drt:w-3! drt:h-3! drt:text-green-600!',
} satisfies Record<string, string>;

const storySettings: Meta<ExplorerLink> = {
  tags: ['autodocs'],
  title: 'Components/ExplorerLink',
  render: properties => <drt-explorer-link {...properties} />,
  args: {
    link: DEVNET_EXPLORER_URL,
  },
  argTypes: {
    link: { control: 'text' },
    iconClass: { control: 'text' },
    class: { control: 'text' },
  },
};

export const Default: StoryObj<ExplorerLink> = {
  render: () => <drt-explorer-link link={DEVNET_EXPLORER_URL} />,
};

export const Sizes: StoryObj<ExplorerLink> = {
  render: () => (
    <div class={styles.explorerStoriesGrid}>
      <drt-explorer-link link={DEVNET_EXPLORER_URL} iconClass={styles.explorerStoriesIconSmall} />
      <drt-explorer-link link={DEVNET_EXPLORER_URL} iconClass={styles.explorerStoriesIconDefault} />
      <drt-explorer-link link={DEVNET_EXPLORER_URL} iconClass={styles.explorerStoriesIconLarge} />
      <drt-explorer-link link={DEVNET_EXPLORER_URL} iconClass={styles.explorerStoriesIconExtraLarge} />
      <drt-explorer-link link={DEVNET_EXPLORER_URL} iconClass={styles.explorerStoriesIconHuge} />
    </div>
  ),
};

export const Colors: StoryObj<ExplorerLink> = {
  render: () => (
    <div class={styles.explorerStoriesGrid}>
      <drt-explorer-link link={DEVNET_EXPLORER_URL} iconClass={styles.explorerStoriesIconBlue} />
      <drt-explorer-link link={DEVNET_EXPLORER_URL} iconClass={styles.explorerStoriesIconGreen} />
      <drt-explorer-link link={DEVNET_EXPLORER_URL} iconClass={styles.explorerStoriesIconRed} />
      <drt-explorer-link link={DEVNET_EXPLORER_URL} iconClass={styles.explorerStoriesIconPurple} />
      <drt-explorer-link link={DEVNET_EXPLORER_URL} iconClass={styles.explorerStoriesIconOrange} />
    </div>
  ),
};

export const ButtonStyles: StoryObj<ExplorerLink> = {
  render: () => (
    <div class={styles.explorerStoriesGrid}>
      <drt-explorer-link link={DEVNET_EXPLORER_URL} iconClass={styles.explorerStoriesButtonDefault} />

      <drt-explorer-link
        link={DEVNET_EXPLORER_URL}
        class={styles.explorerStoriesButtonBackground}
        iconClass={styles.explorerStoriesIconBackground}
      />

      <drt-explorer-link
        link={DEVNET_EXPLORER_URL}
        class={styles.explorerStoriesButtonBorder}
        iconClass={styles.explorerStoriesIconBorder}
      />

      <drt-explorer-link
        link={DEVNET_EXPLORER_URL}
        class={styles.explorerStoriesButtonCircular}
        iconClass={styles.explorerStoriesIconCircular}
      />

      <drt-explorer-link
        link={DEVNET_EXPLORER_URL}
        class={styles.explorerStoriesButtonShadow}
        iconClass={styles.explorerStoriesIconShadow}
      />
    </div>
  ),
};

export default storySettings;
