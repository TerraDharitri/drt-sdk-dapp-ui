import { h } from '@stencil/core';
import { BrowserEnum } from 'constants/browser.enum';
import type { IProviderBase } from 'types/provider.types';
import { ProviderTypeEnum } from 'types/provider.types';
import { getDetectedBrowser } from 'utils/getDetectedBrowser';

interface IProviderButtonIcon {
  providerType: IProviderBase['type'];
  extensionProviderIconWidth?: number;
  extensionProviderIconHeight?: number;
}

export const getProviderButtonIcon = ({
  providerType,
  extensionProviderIconWidth,
  extensionProviderIconHeight,
}: IProviderButtonIcon): HTMLElement => {
  const detectedBrowser = getDetectedBrowser();

  switch (providerType) {
    case ProviderTypeEnum.extension:
      switch (detectedBrowser) {
        case BrowserEnum.Edge:
          return (
            <drt-edge-extension-provider-icon width={extensionProviderIconWidth} height={extensionProviderIconHeight} />
          );
        case BrowserEnum.Firefox:
          return (
            <drt-firefox-extension-provider-icon
              width={extensionProviderIconWidth}
              height={extensionProviderIconHeight}
            />
          );
        case BrowserEnum.Brave:
          return (
            <drt-brave-extension-provider-icon
              width={extensionProviderIconWidth}
              height={extensionProviderIconHeight}
            />
          );
        case BrowserEnum.Arc:
          return (
            <drt-arc-extension-provider-icon width={extensionProviderIconWidth} height={extensionProviderIconHeight} />
          );
        case BrowserEnum.Chrome:
          return (
            <drt-extension-provider-icon width={extensionProviderIconWidth} height={extensionProviderIconHeight} />
          );
        default:
          return <drt-wallet-provider-icon />;
      }
    case ProviderTypeEnum.metamask:
      return <drt-metamask-provider-icon />;
    case ProviderTypeEnum.passkey:
      return <drt-passkey-provider-icon />;
    case ProviderTypeEnum.walletConnect:
      return <drt-dharitri-logo-icon />;
    case ProviderTypeEnum.ledger:
      return <drt-ledger-provider-icon />;
    case ProviderTypeEnum.crossWindow:
      return <drt-wallet-provider-icon />;

    default:
      return <drt-dharitri-logo-icon />;
  }
};
