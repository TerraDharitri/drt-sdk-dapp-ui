import { Component, h, Method, State } from '@stencil/core';
import { ANIMATION_DELAY_PROMISE } from 'components/visual/side-panel/side-panel.constants';
import type { IProviderBase } from 'types/provider.types';
import { ProviderTypeEnum } from 'types/provider.types';
import { ConnectionMonitor } from 'utils/ConnectionMonitor';
import type { IEventBus } from 'utils/EventBus';
import { EventBus } from 'utils/EventBus';

import { PendingTransactionsEventsEnum } from './pending-transactions-panel.types';

const getProviderIntroText = (providerType?: IProviderBase['type']) => {
  switch (providerType) {
    case ProviderTypeEnum.extension:
      return 'Check  the DharitrI Browser Extension to connect to your wallet.';
    case ProviderTypeEnum.metamask:
      return 'Open the MetaMask Browser Extension to connect to your wallet.';
    case ProviderTypeEnum.passkey:
      return 'Use your predefined passkey to connect to your wallet.';
    case ProviderTypeEnum.crossWindow:
      return 'Follow the steps on DharitrI Web Wallet to connect to your wallet.';
    default:
      return 'Follow the steps on your selected provider to connect to your wallet.';
  }
};

@Component({
  tag: 'drt-pending-transactions-panel',
  styleUrl: 'pending-transactions-panel.scss',
  shadow: true,
})
export class PendingTransactionsPanel {
  private readonly eventBus: IEventBus = new EventBus();
  private unsubscribeFunctions: (() => void)[] = [];
  private readonly connectionMonitor = new ConnectionMonitor();

  @State() provider: IProviderBase = null;
  @State() isOpen: boolean = false;

  @Method() async getEventBus() {
    await this.connectionMonitor.waitForConnection();
    return this.eventBus;
  }

  @Method() async closeWithAnimation() {
    this.isOpen = false;
    const animationDelay = await ANIMATION_DELAY_PROMISE;
    return animationDelay;
  }

  componentDidLoad() {
    const unsubDataUpdate = this.eventBus.subscribe(PendingTransactionsEventsEnum.DATA_UPDATE, this.dataUpdate);
    this.unsubscribeFunctions.push(unsubDataUpdate);
    this.connectionMonitor.connect();
  }

  disconnectedCallback() {
    this.resetState();
    this.unsubscribeFunctions.forEach(unsub => unsub());
    this.unsubscribeFunctions = [];
  }

  private resetState() {
    this.provider = null;
    this.isOpen = false;
  }

  private readonly handleClose = () => {
    this.eventBus.publish(PendingTransactionsEventsEnum.CLOSE);
  };

  private readonly dataUpdate = (newData: IProviderBase) => {
    this.provider = newData;
    this.isOpen = true;
  };

  render() {
    return (
      <drt-side-panel isOpen={this.isOpen} panelTitle={this?.provider?.name} showHeader={false}>
        <drt-provider-idle-screen
          provider={this.provider}
          onClose={this.handleClose}
          introTitle="Signing Transaction"
          introText={getProviderIntroText(this.provider?.type)}
        >
          <button onClick={this.handleClose} slot="close-button">
            Close
          </button>
        </drt-provider-idle-screen>
      </drt-side-panel>
    );
  }
}
