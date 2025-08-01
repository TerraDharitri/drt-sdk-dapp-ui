import { Component, h, Method, State } from '@stencil/core';
import { ANIMATION_DELAY_PROMISE } from 'components/visual/side-panel/side-panel.constants';
import { ConnectionMonitor } from 'utils/ConnectionMonitor';
import type { IEventBus } from 'utils/EventBus';
import { EventBus } from 'utils/EventBus';

import type { IOverviewProps, ISignTransactionsPanelData } from './sign-transactions-panel.types';
import { SignEventsEnum, TransactionTabsEnum } from './sign-transactions-panel.types';
import state, { resetState } from './signTransactionsPanelStore';

@Component({
  tag: 'drt-sign-transactions-panel',
  styleUrl: 'sign-transactions-panel.scss',
  shadow: true,
})
export class SignTransactionsPanel {
  private readonly eventBus: IEventBus = new EventBus();
  private unsubscribeFunctions: (() => void)[] = [];
  private readonly connectionMonitor = new ConnectionMonitor();

  @Method() async closeWithAnimation() {
    this.isOpen = false;
    const animationDelay = await ANIMATION_DELAY_PROMISE;
    return animationDelay;
  }

  @State() isOpen: boolean = false;
  @State() activeTab: TransactionTabsEnum = TransactionTabsEnum.overview;

  @Method() async getEventBus() {
    await this.connectionMonitor.waitForConnection();
    return this.eventBus;
  }

  componentWillLoad() {
    state.onCancel = () => {
      this.handleClose();
    };

    state.onNext = () => {
      this.eventBus.publish(SignEventsEnum.NEXT);
    };

    state.onConfirm = () => {
      this.eventBus.publish(SignEventsEnum.CONFIRM);
    };

    state.onBack = () => {
      this.eventBus.publish(SignEventsEnum.BACK);
    };

    state.setPpuOption = (ppu: number) => {
      this.eventBus.publish(SignEventsEnum.SET_PPU, ppu);
    };
  }

  componentDidLoad() {
    const unsubDataUpdate = this.eventBus.subscribe(SignEventsEnum.DATA_UPDATE, this.dataUpdate);
    const unsubBack = this.eventBus.subscribe(SignEventsEnum.BACK, this.handleBack);
    this.unsubscribeFunctions.push(unsubDataUpdate, unsubBack);
    this.connectionMonitor.connect();
  }

  disconnectedCallback() {
    resetState();
    this.isOpen = false;
    this.unsubscribeFunctions.forEach(unsub => unsub());
    this.unsubscribeFunctions = [];
  }

  private readonly handleClose = () => {
    this.isOpen = false;
    resetState();
    this.eventBus.publish(SignEventsEnum.CLOSE);
  };

  private readonly dataUpdate = (payload: ISignTransactionsPanelData) => {
    this.isOpen = true;
    for (const key in payload) {
      if (Object.prototype.hasOwnProperty.call(state, key)) {
        state[key] = payload[key];
      }
    }

    state.isWaitingForSignature = false;
  };

  private setActiveTab(tab: TransactionTabsEnum) {
    this.activeTab = tab;
  }

  private readonly handleBack = () => {
    if (state.commonData.currentIndex > 0) {
      state.commonData.currentIndex -= 1;
    }
  };

  get overviewProps(): IOverviewProps {
    const { tokenTransaction, sftTransaction, nftTransaction } = state;
    const txData = sftTransaction || nftTransaction || tokenTransaction;

    return {
      identifier: txData?.identifier,
      usdValue: tokenTransaction?.usdValue,
      amount: txData?.amount || '0',
      tokenIconUrl: txData?.imageURL,
      interactor: state.commonData?.receiver,
      interactorIconUrl: state.commonData?.receiverIcon,
      action: state.commonData?.scCall,
      networkFee: state.commonData?.feeInFiatLimit,
      isApp: Boolean(state.commonData?.scCall),
    };
  }

  render() {
    const transactionTabs = Object.values(TransactionTabsEnum);

    const { commonData } = state;
    const { data, highlight } = commonData;

    return (
      <drt-side-panel
        isOpen={this.isOpen}
        onClose={this.handleClose}
        panelTitle="Confirm Transaction"
        hasBackButton={false}
      >
        <div class="sign-transactions-panel">
          <drt-sign-transactions-header />

          <div class="sign-transaction-content">
            <div class="sign-transactions-tabs">
              {transactionTabs.map(transactionTab => (
                <div
                  class={{ 'sign-transactions-tab': true, 'active': transactionTab === this.activeTab }}
                  onClick={() => this.setActiveTab(transactionTab)}
                >
                  <div class="sign-transactions-tab-text">{transactionTab}</div>
                </div>
              ))}
            </div>

            {this.activeTab === TransactionTabsEnum.overview ? (
              <drt-sign-transactions-overview style={{ width: '100%' }} {...this.overviewProps} />
            ) : (
              <drt-sign-transactions-advanced style={{ width: '100%' }} data={data} highlight={highlight} />
            )}
          </div>

          <drt-sign-transactions-footer />
        </div>
      </drt-side-panel>
    );
  }
}
