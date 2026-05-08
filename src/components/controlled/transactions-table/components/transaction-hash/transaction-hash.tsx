import { Component, h, Prop } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { TransactionRowType } from '../../transactions-table.type';

const transactionHashClasses: Record<string, string> = {
  explorerLink: 'drt:text-primary!',
  transactionHash: 'drt:flex drt:items-center drt:justify-center',
};

@Component({
  tag: 'drt-transaction-hash',
  styleUrl: 'transaction-hash.scss',
})
export class TransactionHash {
  @Prop() class?: string;
  @Prop() transaction: TransactionRowType;

  render() {
    if (!this.transaction) {
      return null;
    }

    return (
      <div
        class={{
          'transaction-hash': true,
          [this.class]: Boolean(this.class),
        }}
      >
        <drt-transaction-icon iconInfo={this.transaction.iconInfo} class={transactionHashClasses.transactionHash} />

        <drt-explorer-link
          dataTestId={DataTestIdsEnum.transactionLink}
          link={this.transaction.link}
          class={transactionHashClasses.explorerLink}
        >
          <drt-trim text={this.transaction.txHash} />
        </drt-explorer-link>
      </div>
    );
  }
}
