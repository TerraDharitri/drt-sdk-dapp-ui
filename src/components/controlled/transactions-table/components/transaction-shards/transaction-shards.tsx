import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { TransactionRowType } from '../../transactions-table.type';

const transactionShardsClasses: Record<string, string> = {
  explorerLink: 'drt:text-primary!',
};

@Component({
  tag: 'drt-transaction-shards',
  styleUrl: 'transaction-shards.scss',
})
export class TransactionShards {
  @Prop() class?: string;
  @Prop() transaction: TransactionRowType;

  render() {
    return (
      <div class={classNames(this.class, 'transaction-shards')}>
        <drt-explorer-link
          link={this.transaction.sender.shardLink}
          class={transactionShardsClasses.explorerLink}
          data-testid={DataTestIdsEnum.shardFromLink}
        >
          <span data-testid={DataTestIdsEnum.senderShard}>{this.transaction.sender.shard}</span>
        </drt-explorer-link>

        <span class="transaction-shards-arrow">
          <drt-arrow-right-icon />
        </span>

        <drt-explorer-link
          link={this.transaction.receiver.shardLink}
          data-testid={DataTestIdsEnum.shardToLink}
          class={transactionShardsClasses.explorerLink}
        >
          <span data-testid={DataTestIdsEnum.receiverShard}>{this.transaction.receiver.shard}</span>
        </drt-explorer-link>
      </div>
    );
  }
}
