import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { TransactionRowType } from '../../../transactions-table.type';
import { TransactionShards } from '../transaction-shards';

describe('TransactionShards', () => {
  const createMockTransaction = (senderShard: string, receiverShard: string): TransactionRowType => ({
    age: { timeAgo: '1 min ago', tooltip: '1 minute ago' },
    method: { name: 'transfer' },
    iconInfo: { tooltip: 'Transfer' },
    link: '/tx/123',
    receiver: {
      address: 'drt1receiver...',
      description: 'Receiver',
      isContract: false,
      isTokenLocked: false,
      link: '/address/drt1receiver...',
      name: 'Receiver',
      shard: receiverShard,
      shardLink: `/blocks?shard=${receiverShard}`,
      showLink: true,
    },
    sender: {
      address: 'drt1sender...',
      description: 'Sender',
      isContract: false,
      isTokenLocked: false,
      link: '/address/drt1sender...',
      name: 'Sender',
      shard: senderShard,
      shardLink: `/blocks?shard=${senderShard}`,
      showLink: true,
    },
    txHash: 'hash123',
    value: {
      rewaLabel: 'xREWA',
      valueDecimal: '0',
      valueInteger: '100',
    },
    direction: 'in',
  });

  it('renders with default props', async () => {
    const transaction = createMockTransaction('0', '1');

    const page = await newSpecPage({
      components: [TransactionShards],
      template: () => <drt-transaction-shards transaction={transaction}></drt-transaction-shards>,
    });

    expect(page.root).toEqualHtml(`
      <drt-transaction-shards>
          <div class="transaction-shards">
            <drt-explorer-link class="drt:text-blue-link!" data-testid="${DataTestIdsEnum.shardFromLink}" link="/blocks?shard=0">
              <span data-testid="${DataTestIdsEnum.senderShard}">0</span>
            </drt-explorer-link>
            <span class="transaction-shards-arrow">&#10132;</span>
            <drt-explorer-link class="drt:text-blue-link!" data-testid="${DataTestIdsEnum.shardToLink}" link="/blocks?shard=1">
              <span data-testid="${DataTestIdsEnum.receiverShard}">1</span>
            </drt-explorer-link>
          </div>
      </drt-transaction-shards>
    `);
  });

  it('renders with custom class', async () => {
    const transaction = createMockTransaction('0', '1');

    const page = await newSpecPage({
      components: [TransactionShards],
      template: () => <drt-transaction-shards class="custom-class" transaction={transaction}></drt-transaction-shards>,
    });

    expect(page.root).toEqualHtml(`
      <drt-transaction-shards class="custom-class">
          <div class="custom-class transaction-shards">
            <drt-explorer-link class="drt:text-blue-link!" data-testid="${DataTestIdsEnum.shardFromLink}" link="/blocks?shard=0">
              <span data-testid="${DataTestIdsEnum.senderShard}">0</span>
            </drt-explorer-link>
            <span class="transaction-shards-arrow">&#10132;</span>
            <drt-explorer-link class="drt:text-blue-link!" data-testid="${DataTestIdsEnum.shardToLink}" link="/blocks?shard=1">
              <span data-testid="${DataTestIdsEnum.receiverShard}">1</span>
            </drt-explorer-link>
          </div>
      </drt-transaction-shards>
    `);
  });

  it('renders with different shard values', async () => {
    const transaction = createMockTransaction('2', '3');

    const page = await newSpecPage({
      components: [TransactionShards],
      template: () => <drt-transaction-shards transaction={transaction}></drt-transaction-shards>,
    });

    const senderShard = page.root.querySelector(`[data-testid="${DataTestIdsEnum.senderShard}"]`);
    const receiverShard = page.root.querySelector(`[data-testid="${DataTestIdsEnum.receiverShard}"]`);

    expect(senderShard.textContent).toBe('2');
    expect(receiverShard.textContent).toBe('3');
  });
});
