import { Component, h, Method, State } from '@stencil/core';
import { ConnectionMonitor } from 'utils/ConnectionMonitor';
import type { IEventBus } from 'utils/EventBus';
import { EventBus } from 'utils/EventBus';

import type { ITransactionListItem } from '../../visual/transaction-list-item/transaction-list-item.types';
import type { ITransactionToast } from '../toasts-list/components/transaction-toast/transaction-toast.type';
import { NotificationsFeedEventsEnum } from './notifications-feed.types';

@Component({
  tag: 'drt-notifications-feed',
  styleUrl: 'notifications-feed.scss',
  shadow: true,
})
export class NotificationsFeed {
  private readonly eventBus: IEventBus = new EventBus();
  private readonly connectionMonitor = new ConnectionMonitor();

  private closeEventTimeout: NodeJS.Timeout | null = null;
  private unsubscribeFunctions: (() => void)[] = [];

  @State() isOpen: boolean = false;
  @State() pendingTransactions: ITransactionToast[] = [];
  @State() transactionsHistory: ITransactionListItem[] = [];

  @Method() async closeWithAnimation() {
    this.isOpen = false;
    const animationDelay = await new Promise(resolve => setTimeout(resolve, 300));
    return animationDelay;
  }

  @Method()
  async getEventBus() {
    await this.connectionMonitor.waitForConnection();
    return this.eventBus;
  }

  disconnectedCallback() {
    this.clearTimeouts();
    this.unsubscribeFunctions.forEach(unsub => unsub());
    this.unsubscribeFunctions = [];
  }

  componentDidLoad() {
    const unsubPendingTransactions = this.eventBus.subscribe(
      NotificationsFeedEventsEnum.PENDING_TRANSACTIONS_UPDATE,
      this.pendingTransactionsUpdate,
    );
    const unsubTransactionsHistory = this.eventBus.subscribe(
      NotificationsFeedEventsEnum.TRANSACTIONS_HISTORY_UPDATE,
      this.transactionsHistoryUpdate,
    );
    const unsubOpen = this.eventBus.subscribe(NotificationsFeedEventsEnum.OPEN, this.handleViewAll);

    this.unsubscribeFunctions.push(unsubPendingTransactions, unsubTransactionsHistory, unsubOpen);

    this.connectionMonitor.connect();
  }

  private readonly handleClose = () => {
    this.isOpen = false;
    this.eventBus.publish(NotificationsFeedEventsEnum.CLOSE);
  };

  private readonly handleClear = () => {
    this.eventBus.publish(NotificationsFeedEventsEnum.CLEAR);
  };

  private readonly handleViewAll = () => {
    this.isOpen = true;
  };

  private clearTimeouts() {
    if (this.closeEventTimeout) {
      clearTimeout(this.closeEventTimeout);
      this.closeEventTimeout = null;
    }
  }

  private readonly pendingTransactionsUpdate = (payload: ITransactionToast[]) => {
    this.pendingTransactions = [...payload];
  };

  private readonly transactionsHistoryUpdate = (payload: ITransactionListItem[]) => {
    this.transactionsHistory = [...payload];
  };

  render() {
    const hasActivity = this.transactionsHistory?.length > 0;
    const hasPending = this.pendingTransactions?.length > 0;

    return (
      <drt-side-panel
        isOpen={this.isOpen}
        panelTitle="Notifications Feed"
        onClose={this.handleClose}
        hasBackButton={false}
      >
        <div class="feed-content">
          <div class="notifications-info">
            This feed is stored in your browser and will be reset when a new session is started.
            <drt-circle-exclamation-icon class="info-icon" />
          </div>

          {hasPending && (
            <div class="notifications-container">
              <div class="processing-status">Processing...</div>
              {this.pendingTransactions?.map(toast => <drt-transaction-toast fullWidth={true} {...toast} />)}
            </div>
          )}

          <div class="activity-section">
            <div class="activity-header">
              <h3 class="activity-title">Activity</h3>
              {hasActivity && (
                <button class="clear-button" onClick={this.handleClear}>
                  Clear
                </button>
              )}
            </div>

            <div class="activity-list">
              {hasActivity ? (
                this.transactionsHistory.map(transaction => <drt-transaction-list-item transaction={transaction} />)
              ) : (
                <div class="no-activity">No activity to show</div>
              )}
            </div>
          </div>
        </div>
      </drt-side-panel>
    );
  }
}
