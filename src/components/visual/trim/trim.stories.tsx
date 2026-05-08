import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import classNames from 'classnames';

import type { Trim } from './trim';

// prettier-ignore
const styles = {
  trimStoriesWrapper: 'trim-stories-wrapper drt:flex drt:flex-col drt:flex-wrap drt:gap-6',
  trimStoriesGrid: 'trim-stories-grid drt:flex drt:gap-4 drt:flex-wrap drt:items-center',
  trimStoriesContainer: 'trim-stories-container drt:rounded',
  trimStoriesNarrow: 'trim-stories-narrow drt:w-40',
  trimStoriesMedium: 'trim-stories-medium drt:w-48',
  trimStoriesWide: 'trim-stories-wide drt:w-80',
  trimStoriesExtraWide: 'trim-stories-extra-wide drt:w-96',
  trimStoriesSmallFont: 'trim-stories-small-font drt:text-sm',
  trimStoriesLargeFont: 'trim-stories-large-font drt:text-lg',
  trimStoriesExtraLargeFont: 'trim-stories-extra-large-font drt:text-xl drt:text-primary!',
  trimStoriesMonospace: 'trim-stories-monospace drt:font-mono',
  trimStoriesBackground: 'trim-stories-background drt:p-2 drt:rounded',
  trimStoriesBlue: 'trim-stories-blue drt:text-blue-600',
  trimStoriesGreen: 'trim-stories-green drt:text-green-600',
  trimStoriesRed: 'trim-stories-red drt:text-red-600',
} satisfies Record<string, string>;

const storySettings: Meta<Trim> = {
  tags: ['autodocs'],
  title: 'Components/Trim',
  render: properties => <drt-trim {...properties} />,
  args: {
    text: 'This is a long text that might need to be trimmed when the container is too narrow',
  },
  argTypes: {
    text: { control: 'text' },
    class: { control: 'text' },
    dataTestId: { control: 'text' },
  },
};

export const Default: StoryObj<Trim> = {
  render: () => (
    <div class={styles.trimStoriesWrapper}>
      <div class={styles.trimStoriesContainer}>
        <drt-trim text="This is a default trim component that will show trimming behavior when the container is narrow" />
      </div>
    </div>
  ),
};

export const ContainerWidths: StoryObj<Trim> = {
  render: () => (
    <div class={styles.trimStoriesWrapper}>
      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesNarrow)}>
        <strong>Narrow (128px):</strong>
        <drt-trim text="This text will definitely be trimmed in this narrow container" />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Medium (192px):</strong>
        <drt-trim text="This text might be trimmed depending on the font size and content length" />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesWide)}>
        <strong>Wide (320px):</strong>
        <drt-trim text="This text has more space but might still be trimmed if it's very long like this example" />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesExtraWide)}>
        <strong>Extra Wide (384px):</strong>
        <drt-trim text="This container provides plenty of space for most text content without needing trimming" />
      </div>
    </div>
  ),
};

export const FontSizes: StoryObj<Trim> = {
  render: () => (
    <div class={styles.trimStoriesWrapper}>
      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Small Font:</strong>

        <drt-trim
          text="This text uses a smaller font size which allows more content to fit"
          class={styles.trimStoriesSmallFont}
        />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Default Font:</strong>

        <drt-trim text="This text uses the default font size for normal content" />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Large Font:</strong>

        <drt-trim
          text="This text uses a larger font which means less content fits"
          class={styles.trimStoriesLargeFont}
        />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Extra Large Font:</strong>

        <drt-trim
          text="This text uses extra large font with even less content fitting"
          class={styles.trimStoriesExtraLargeFont}
        />
      </div>
    </div>
  ),
};

export const RealWorldExamples: StoryObj<Trim> = {
  render: () => (
    <div class={styles.trimStoriesWrapper}>
      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Wallet Address:</strong>

        <drt-trim
          text="drt1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssey5egf"
          class={styles.trimStoriesMonospace}
        />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Transaction Hash:</strong>

        <drt-trim
          text="9f4d2a5b8c1e7d3f6a9b2e8c5f1a4d7b0e3c6f9a2d5b8e1c4f7a0d3b6e9c2f5a8b1e4d7f0c3a6"
          class={styles.trimStoriesMonospace}
        />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Smart Contract Address:</strong>

        <drt-trim
          text="drt1qqqqqqqqqqqqqpgqzqvm5ywqqf524efwrhr039tjs29w0qltkklsqnrz4q"
          class={styles.trimStoriesMonospace}
        />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Collection Identifier:</strong>
        <drt-trim text="DHARITRIPUNKS-114fa5-01" class={styles.trimStoriesMonospace} />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Long Username:</strong>
        <drt-trim text="dharitri.super.long.domain.name.example.herotag" />
      </div>
    </div>
  ),
};

export const TextLengths: StoryObj<Trim> = {
  render: () => (
    <div class={styles.trimStoriesWrapper}>
      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Short Text:</strong>
        <drt-trim text="Short" />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Medium Text:</strong>
        <drt-trim text="This is a medium length text" />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Long Text:</strong>
        <drt-trim text="This is a very long text that will definitely need trimming in most containers" />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Extra Long Text:</strong>
        <drt-trim text="This is an extremely long text that contains many words and will definitely be trimmed in any reasonably sized container, demonstrating the trimming behavior clearly" />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Single Word:</strong>
        <drt-trim text="Antidisestablishmentarianism" />
      </div>
    </div>
  ),
};

export const StyledVariants: StoryObj<Trim> = {
  render: () => (
    <div class={styles.trimStoriesWrapper}>
      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Background Style:</strong>

        <drt-trim
          text="This trim component has a background style applied to it"
          class={styles.trimStoriesBackground}
        />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Blue Text:</strong>
        <drt-trim text="This trim component uses blue colored text" class={styles.trimStoriesBlue} />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Green Text:</strong>
        <drt-trim text="This trim component uses green colored text" class={styles.trimStoriesGreen} />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Red Text:</strong>
        <drt-trim text="This trim component uses red colored text" class={styles.trimStoriesRed} />
      </div>
    </div>
  ),
};

export const EdgeCases: StoryObj<Trim> = {
  render: () => (
    <div class={styles.trimStoriesWrapper}>
      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesNarrow)}>
        <strong>Single Character:</strong>
        <drt-trim text="X" />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesNarrow)}>
        <strong>Two Characters:</strong>
        <drt-trim text="XX" />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesNarrow)}>
        <strong>Numbers Only:</strong>
        <drt-trim text="1234567890123456789012345678901234567890" />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesNarrow)}>
        <strong>Special Characters:</strong>
        <drt-trim text="!@#$%^&*()_+-=[]{}|;:,.<>?/~`" />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesNarrow)}>
        <strong>Unicode Characters:</strong>
        <drt-trim text="🚀🌟💎⚡🔥🌈✨💫🎯🎨🎪🎭🎪" />
      </div>
    </div>
  ),
};

export default storySettings;
