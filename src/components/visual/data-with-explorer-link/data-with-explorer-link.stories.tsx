import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import classNames from 'classnames';

import type { DataWithExplorerLink } from './data-with-explorer-link';

const DEVNET_EXPLORER_URL = 'https://devnet-explorer.dharitri.org';

// prettier-ignore
const styles = {
  dataWithExplorerLinkStoriesWrapper: 'data-with-explorer-link-stories-wrapper drt:flex drt:flex-col drt:flex-wrap drt:gap-6',
  dataWithExplorerLinkStoriesGrid: 'data-with-explorer-link-stories-grid drt:flex drt:gap-4 drt:flex-wrap drt:items-center',
  dataWithExplorerLinkStoriesContainer: 'data-with-explorer-link-stories-container drt:rounded',
  dataWithExplorerLinkStoriesNarrow: 'data-with-explorer-link-stories-narrow drt:w-48',
  dataWithExplorerLinkStoriesMedium: 'data-with-explorer-link-stories-medium drt:w-64',
  dataWithExplorerLinkStoriesWide: 'data-with-explorer-link-stories-wide drt:w-80',
  dataWithExplorerLinkStoriesExtraWide: 'data-with-explorer-link-stories-extra-wide drt:w-96',
  dataWithExplorerLinkStoriesSmallFont: 'data-with-explorer-link-stories-small-font drt:text-sm',
  dataWithExplorerLinkStoriesLargeFont: 'data-with-explorer-link-stories-large-font drt:text-lg',
  dataWithExplorerLinkStoriesMonospace: 'data-with-explorer-link-stories-monospace drt:font-mono',
  dataWithExplorerLinkStoriesBlue: 'data-with-explorer-link-stories-blue drt:text-blue-600',
  dataWithExplorerLinkStoriesGreen: 'data-with-explorer-link-stories-green drt:text-green-600',
  dataWithExplorerLinkStoriesRed: 'data-with-explorer-link-stories-red drt:text-red-600',
} satisfies Record<string, string>;

const storySettings: Meta<DataWithExplorerLink> = {
  tags: ['autodocs'],
  title: 'Components/DataWithExplorerLink',
  render: properties => <drt-data-with-explorer-link {...properties} />,
  args: {
    data: 'drt1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssey5egf',
    explorerLink: `${DEVNET_EXPLORER_URL}/accounts/drt1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssey5egf`,
    showCopyButton: true,
    showExplorerButton: true,
    withTooltip: false,
  },
  argTypes: {
    data: { control: 'text' },
    explorerLink: { control: 'text' },
    showCopyButton: { control: 'boolean' },
    showExplorerButton: { control: 'boolean' },
    withTooltip: { control: 'boolean' },
    class: { control: 'text' },
    dataTestId: { control: 'text' },
  },
};

export const Default: StoryObj<DataWithExplorerLink> = {
  render: () => (
    <div class={styles.dataWithExplorerLinkStoriesWrapper}>
      <drt-data-with-explorer-link
        data="drt1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssey5egf"
        explorerLink={`${DEVNET_EXPLORER_URL}/accounts/drt1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssey5egf`}
      />
    </div>
  ),
};

const buttonVisibilityScenarios = [
  { label: 'Both Buttons (Default)', showCopyButton: true, showExplorerButton: true },
  { label: 'Copy Button Only', showCopyButton: true, showExplorerButton: false },
  { label: 'Explorer Button Only', showCopyButton: false, showExplorerButton: true },
  { label: 'No Buttons (Text Only)', showCopyButton: false, showExplorerButton: false },
];

export const ButtonVisibility: StoryObj<DataWithExplorerLink> = {
  render: () => (
    <div class={styles.dataWithExplorerLinkStoriesWrapper}>
      {buttonVisibilityScenarios.map(scenario => (
        <div class={styles.dataWithExplorerLinkStoriesContainer}>
          <strong>{scenario.label}:</strong>
          <drt-data-with-explorer-link
            data="drt1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssey5egf"
            explorerLink={`${DEVNET_EXPLORER_URL}/accounts/drt1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssey5egf`}
            showCopyButton={scenario.showCopyButton}
            showExplorerButton={scenario.showExplorerButton}
          />
        </div>
      ))}
    </div>
  ),
};

const tooltipScenarios = [
  { label: 'Without Tooltips', withTooltip: false },
  { label: 'With Tooltips', withTooltip: true },
  { label: 'Tooltips with Copy Only', withTooltip: true, showCopyButton: true, showExplorerButton: false },
  { label: 'Tooltips with Explorer Only', withTooltip: true, showCopyButton: false, showExplorerButton: true },
];

export const WithTooltips: StoryObj<DataWithExplorerLink> = {
  render: () => (
    <div class={styles.dataWithExplorerLinkStoriesWrapper}>
      {tooltipScenarios.map(scenario => (
        <div class={styles.dataWithExplorerLinkStoriesContainer}>
          <strong>{scenario.label}:</strong>
          <drt-data-with-explorer-link
            data="drt1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssey5egf"
            explorerLink={`${DEVNET_EXPLORER_URL}/accounts/drt1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssey5egf`}
            withTooltip={scenario.withTooltip}
            showCopyButton={scenario.showCopyButton}
            showExplorerButton={scenario.showExplorerButton}
          />
        </div>
      ))}
    </div>
  ),
};

const containerWidthScenarios = [
  { label: 'Narrow Container', className: styles.dataWithExplorerLinkStoriesNarrow },
  { label: 'Medium Container', className: styles.dataWithExplorerLinkStoriesMedium },
  { label: 'Wide Container', className: styles.dataWithExplorerLinkStoriesWide },
  { label: 'Extra Wide Container', className: styles.dataWithExplorerLinkStoriesExtraWide },
];

export const ContainerWidths: StoryObj<DataWithExplorerLink> = {
  render: () => (
    <div class={styles.dataWithExplorerLinkStoriesWrapper}>
      {containerWidthScenarios.map(scenario => (
        <div class={classNames(styles.dataWithExplorerLinkStoriesContainer, scenario.className)}>
          <strong>{scenario.label}:</strong>
          <drt-data-with-explorer-link
            data="drt1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssey5egf"
            explorerLink={`${DEVNET_EXPLORER_URL}/accounts/drt1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssey5egf`}
          />
        </div>
      ))}
    </div>
  ),
};

export const DataTypes: StoryObj<DataWithExplorerLink> = {
  render: () => (
    <div class={styles.dataWithExplorerLinkStoriesWrapper}>
      <div class={styles.dataWithExplorerLinkStoriesContainer}>
        <strong>Wallet Address:</strong>
        <drt-data-with-explorer-link
          data="drt1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssey5egf"
          explorerLink={`${DEVNET_EXPLORER_URL}/accounts/drt1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssey5egf`}
          class={styles.dataWithExplorerLinkStoriesMonospace}
        />
      </div>

      <div class={styles.dataWithExplorerLinkStoriesContainer}>
        <strong>Transaction Hash:</strong>
        <drt-data-with-explorer-link
          data="9f4d2a5b8c1e7d3f6a9b2e8c5f1a4d7b0e3c6f9a2d5b8e1c4f7a0d3b6e9c2f5a8b1e4d7f0c3a6"
          explorerLink={`${DEVNET_EXPLORER_URL}/transactions/9f4d2a5b8c1e7d3f6a9b2e8c5f1a4d7b0e3c6f9a2d5b8e1c4f7a0d3b6e9c2f5a8b1e4d7f0c3a6`}
          class={styles.dataWithExplorerLinkStoriesMonospace}
        />
      </div>

      <div class={styles.dataWithExplorerLinkStoriesContainer}>
        <strong>Smart Contract Address:</strong>
        <drt-data-with-explorer-link
          data="drt1qqqqqqqqqqqqqpgqzqvm5ywqqf524efwrhr039tjs29w0qltkklsqnrz4q"
          explorerLink={`${DEVNET_EXPLORER_URL}/accounts/drt1qqqqqqqqqqqqqpgqzqvm5ywqqf524efwrhr039tjs29w0qltkklsqnrz4q`}
          class={styles.dataWithExplorerLinkStoriesMonospace}
        />
      </div>

      <div class={styles.dataWithExplorerLinkStoriesContainer}>
        <strong>Block Hash:</strong>
        <drt-data-with-explorer-link
          data="a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456"
          explorerLink={`${DEVNET_EXPLORER_URL}/blocks/a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456`}
          class={styles.dataWithExplorerLinkStoriesMonospace}
        />
      </div>

      <div class={styles.dataWithExplorerLinkStoriesContainer}>
        <strong>NFT Identifier:</strong>
        <drt-data-with-explorer-link
          data="DHARITRIPUNKS-114fa5-01"
          explorerLink={`${DEVNET_EXPLORER_URL}/nfts/DHARITRIPUNKS-114fa5-01`}
          class={styles.dataWithExplorerLinkStoriesMonospace}
        />
      </div>

      <div class={styles.dataWithExplorerLinkStoriesContainer}>
        <strong>Token Identifier:</strong>
        <drt-data-with-explorer-link
          data="USDC-c76f1f"
          explorerLink={`${DEVNET_EXPLORER_URL}/tokens/USDC-c76f1f`}
          class={styles.dataWithExplorerLinkStoriesMonospace}
        />
      </div>

      <div class={styles.dataWithExplorerLinkStoriesContainer}>
        <strong>Username/Herotag:</strong>
        <drt-data-with-explorer-link
          data="dharitri.super.long.domain.name.example.herotag"
          explorerLink={`${DEVNET_EXPLORER_URL}/accounts/dharitri.super.long.domain.name.example.herotag`}
        />
      </div>
    </div>
  ),
};

export const TextLengths: StoryObj<DataWithExplorerLink> = {
  render: () => (
    <div class={styles.dataWithExplorerLinkStoriesWrapper}>
      <div class={classNames(styles.dataWithExplorerLinkStoriesContainer, styles.dataWithExplorerLinkStoriesMedium)}>
        <strong>Short Data:</strong>
        <drt-data-with-explorer-link data="REWA" explorerLink={`${DEVNET_EXPLORER_URL}/tokens/REWA`} />
      </div>

      <div class={classNames(styles.dataWithExplorerLinkStoriesContainer, styles.dataWithExplorerLinkStoriesMedium)}>
        <strong>Medium Data:</strong>
        <drt-data-with-explorer-link data="USDC-c76f1f" explorerLink={`${DEVNET_EXPLORER_URL}/tokens/USDC-c76f1f`} />
      </div>

      <div class={classNames(styles.dataWithExplorerLinkStoriesContainer, styles.dataWithExplorerLinkStoriesMedium)}>
        <strong>Long Data:</strong>
        <drt-data-with-explorer-link
          data="drt1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssey5egf"
          explorerLink={`${DEVNET_EXPLORER_URL}/accounts/drt1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssey5egf`}
          class={styles.dataWithExplorerLinkStoriesMonospace}
        />
      </div>

      <div class={classNames(styles.dataWithExplorerLinkStoriesContainer, styles.dataWithExplorerLinkStoriesMedium)}>
        <strong>Extra Long Data:</strong>
        <drt-data-with-explorer-link
          data="9f4d2a5b8c1e7d3f6a9b2e8c5f1a4d7b0e3c6f9a2d5b8e1c4f7a0d3b6e9c2f5a8b1e4d7f0c3a6789abcdef"
          explorerLink={`${DEVNET_EXPLORER_URL}/transactions/9f4d2a5b8c1e7d3f6a9b2e8c5f1a4d7b0e3c6f9a2d5b8e1c4f7a0d3b6e9c2f5a8b1e4d7f0c3a6789abcdef`}
          class={styles.dataWithExplorerLinkStoriesMonospace}
        />
      </div>

      <div class={classNames(styles.dataWithExplorerLinkStoriesContainer, styles.dataWithExplorerLinkStoriesMedium)}>
        <strong>Single Character:</strong>
        <drt-data-with-explorer-link data="X" explorerLink={`${DEVNET_EXPLORER_URL}/search/X`} />
      </div>
    </div>
  ),
};

const styledVariants = [
  { label: 'Small Font', class: styles.dataWithExplorerLinkStoriesSmallFont },
  { label: 'Large Font', class: styles.dataWithExplorerLinkStoriesLargeFont },
  { label: 'Blue Text', class: styles.dataWithExplorerLinkStoriesBlue },
  { label: 'Green Text', class: styles.dataWithExplorerLinkStoriesGreen },
  { label: 'Red Text', class: styles.dataWithExplorerLinkStoriesRed },
];

export const StyledVariants: StoryObj<DataWithExplorerLink> = {
  render: () => (
    <div class={styles.dataWithExplorerLinkStoriesWrapper}>
      {styledVariants.map(variant => (
        <div class={styles.dataWithExplorerLinkStoriesContainer}>
          <strong>{variant.label}:</strong>
          <drt-data-with-explorer-link
            data="drt1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssey5egf"
            explorerLink={`${DEVNET_EXPLORER_URL}/accounts/drt1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssey5egf`}
            class={variant.class}
          />
        </div>
      ))}
    </div>
  ),
};

export const EdgeCases: StoryObj<DataWithExplorerLink> = {
  render: () => (
    <div class={styles.dataWithExplorerLinkStoriesWrapper}>
      <div class={classNames(styles.dataWithExplorerLinkStoriesContainer, styles.dataWithExplorerLinkStoriesNarrow)}>
        <strong>Empty Explorer Link:</strong>
        <drt-data-with-explorer-link
          data="drt1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssey5egf"
          explorerLink=""
          showExplorerButton={true}
        />
      </div>

      <div class={classNames(styles.dataWithExplorerLinkStoriesContainer, styles.dataWithExplorerLinkStoriesNarrow)}>
        <strong>Numbers Only:</strong>
        <drt-data-with-explorer-link
          data="1234567890123456789012345678901234567890"
          explorerLink={`${DEVNET_EXPLORER_URL}/search/1234567890123456789012345678901234567890`}
          class={styles.dataWithExplorerLinkStoriesMonospace}
        />
      </div>

      <div class={classNames(styles.dataWithExplorerLinkStoriesContainer, styles.dataWithExplorerLinkStoriesNarrow)}>
        <strong>Special Characters:</strong>
        <drt-data-with-explorer-link
          data="!@#$%^&*()_+-=[]{}|;:,.<>?/~`"
          explorerLink={`${DEVNET_EXPLORER_URL}/search/special`}
        />
      </div>

      <div class={classNames(styles.dataWithExplorerLinkStoriesContainer, styles.dataWithExplorerLinkStoriesNarrow)}>
        <strong>Unicode/Emoji:</strong>
        <drt-data-with-explorer-link data="🚀🌟💎⚡🔥🌈✨💫🎯🎨" explorerLink={`${DEVNET_EXPLORER_URL}/search/emoji`} />
      </div>

      <div class={classNames(styles.dataWithExplorerLinkStoriesContainer, styles.dataWithExplorerLinkStoriesNarrow)}>
        <strong>Mixed Case:</strong>
        <drt-data-with-explorer-link
          data="drt1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssey5egf"
          explorerLink={`${DEVNET_EXPLORER_URL}/accounts/drt1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssey5egf`}
          class={styles.dataWithExplorerLinkStoriesMonospace}
        />
      </div>
    </div>
  ),
};

export const InteractiveScenarios: StoryObj<DataWithExplorerLink> = {
  render: () => (
    <div class={styles.dataWithExplorerLinkStoriesWrapper}>
      <div class={styles.dataWithExplorerLinkStoriesContainer}>
        <strong>Transaction with Tooltips:</strong>
        <drt-data-with-explorer-link
          data="a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456"
          explorerLink={`${DEVNET_EXPLORER_URL}/transactions/a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456`}
          withTooltip={true}
          dataTestId="transaction-with-tooltips"
          class={styles.dataWithExplorerLinkStoriesMonospace}
        />
      </div>

      <div class={styles.dataWithExplorerLinkStoriesContainer}>
        <strong>Account with Copy Only + Tooltip:</strong>
        <drt-data-with-explorer-link
          data="drt1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssey5egf"
          explorerLink={`${DEVNET_EXPLORER_URL}/accounts/drt1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssey5egf`}
          withTooltip={true}
          showCopyButton={true}
          showExplorerButton={false}
          dataTestId="account-copy-tooltip"
          class={styles.dataWithExplorerLinkStoriesMonospace}
        />
      </div>

      <div class={styles.dataWithExplorerLinkStoriesContainer}>
        <strong>Token with Explorer Only + Tooltip:</strong>
        <drt-data-with-explorer-link
          data="WREWA-bd4d79"
          explorerLink={`${DEVNET_EXPLORER_URL}/tokens/WREWA-bd4d79`}
          withTooltip={true}
          showCopyButton={false}
          showExplorerButton={true}
          dataTestId="token-explorer-tooltip"
        />
      </div>

      <div class={styles.dataWithExplorerLinkStoriesContainer}>
        <strong>NFT Collection (All Features):</strong>
        <drt-data-with-explorer-link
          data="DHARITRIPUNKS-114fa5-0a1b2c"
          explorerLink={`${DEVNET_EXPLORER_URL}/nfts/DHARITRIPUNKS-114fa5-0a1b2c`}
          withTooltip={true}
          showCopyButton={true}
          showExplorerButton={true}
          dataTestId="nft-all-features"
          class={classNames(styles.dataWithExplorerLinkStoriesMonospace, styles.dataWithExplorerLinkStoriesBlue)}
        />
      </div>
    </div>
  ),
};

const responsiveLayouts = [
  { label: 'Mobile Size', className: styles.dataWithExplorerLinkStoriesNarrow },
  { label: 'Tablet Size', className: styles.dataWithExplorerLinkStoriesMedium },
  { label: 'Desktop Size', className: styles.dataWithExplorerLinkStoriesWide },
  { label: 'Large Desktop', className: styles.dataWithExplorerLinkStoriesExtraWide },
];

export const ResponsiveLayouts: StoryObj<DataWithExplorerLink> = {
  render: () => (
    <div class={styles.dataWithExplorerLinkStoriesWrapper}>
      {responsiveLayouts.map(layout => (
        <div class={classNames(styles.dataWithExplorerLinkStoriesContainer, layout.className)}>
          <strong>{layout.label}:</strong>
          <drt-data-with-explorer-link
            data="drt1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssey5egf"
            explorerLink={`${DEVNET_EXPLORER_URL}/accounts/drt1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssey5egf`}
          />
        </div>
      ))}
    </div>
  ),
};

export default storySettings;
