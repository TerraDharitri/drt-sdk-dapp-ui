import { Component, Element, Fragment, h, Method, Prop, State, Watch } from '@stencil/core';
import type { IEventBus, IWalletConnectPanelData } from 'components';
import { SidePanelHeaderSlotEnum } from 'components/visual/side-panel/components/side-panel-header/side-panel-header';
import { providerLabels } from 'constants/providerFactory.constants';
import QRCode from 'qrcode';
import { ConnectionMonitor } from 'utils/ConnectionMonitor';
import { EventBus } from 'utils/EventBus';

import { WalletConnectEventsEnum } from './wallet-connect.types';

@Component({
  tag: 'drt-wallet-connect',
  styleUrl: 'wallet-connect.scss',
  shadow: true,
})
export class WalletConnect {
  private readonly eventBus: IEventBus = new EventBus();
  private readonly connectionMonitor = new ConnectionMonitor();

  @State() showScanPage: boolean = true;
  @State() walletConnectDeepLink: string = '';
  @Element() hostElement: HTMLElement;

  @Prop() data: IWalletConnectPanelData = { wcURI: '' };
  @Prop() qrCodeSvg: string = '';

  @Watch('data')
  async onDataChange(newData: IWalletConnectPanelData) {
    if (newData.wcURI) {
      this.qrCodeSvg = await this.generateSVG(newData.wcURI);
    }
  }

  @Method() async getEventBus(): Promise<IEventBus> {
    await this.connectionMonitor.waitForConnection();
    return this.eventBus;
  }

  private async generateSVG(wcURI: string) {
    try {
      const svg = await QRCode.toString(wcURI, { type: 'svg' });
      return svg;
    } catch (error) {
      console.error('Error generating QR Code:', error);
      return '';
    }
  }

  private async dataUpdate(payload: IWalletConnectPanelData) {
    if (payload.walletConnectDeepLink) {
      this.walletConnectDeepLink = payload.walletConnectDeepLink;
    }

    if (payload.wcURI) {
      this.qrCodeSvg = await this.generateSVG(payload.wcURI);
    }
  }

  async componentDidLoad() {
    if (this.data.wcURI) {
      this.qrCodeSvg = await this.generateSVG(this.data.wcURI);
    }
    this.eventBus.subscribe(WalletConnectEventsEnum.DATA_UPDATE, this.dataUpdate.bind(this));

    this.connectionMonitor.connect();
  }

  disconnectedCallback() {
    this.eventBus.publish(WalletConnectEventsEnum.UI_DISCONNECTED);
    this.eventBus.unsubscribe(WalletConnectEventsEnum.DATA_UPDATE, this.dataUpdate.bind(this));
  }

  handlePageToggle(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.showScanPage = !this.showScanPage;
  }

  render() {
    return (
      <Fragment>
        <drt-side-panel-header
          hasRightButton={true}
          hasLeftButton={!this.showScanPage}
          panelTitle={providerLabels.walletConnect}
          onLeftButtonClick={this.handlePageToggle.bind(this)}
          onRightButtonClick={() => this.eventBus.publish(WalletConnectEventsEnum.CLOSE)}
        >
          {!this.showScanPage && <drt-back-arrow-icon slot={SidePanelHeaderSlotEnum.leftIcon} />}
          <drt-close-icon slot={SidePanelHeaderSlotEnum.rightIcon} class="close-icon" />
        </drt-side-panel-header>

        <div class="wallet-connect">
          {this.showScanPage ? (
            <drt-wallet-connect-scan
              qrCodeSvg={this.qrCodeSvg}
              onDownloadClick={this.handlePageToggle.bind(this)}
              walletConnectDeepLink={this.walletConnectDeepLink}
            />
          ) : (
            <drt-wallet-connect-download />
          )}
        </div>
      </Fragment>
    );
  }
}
