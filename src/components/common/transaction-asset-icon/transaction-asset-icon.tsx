import { Component, h, Prop } from '@stencil/core';
import type { ITransactionListItem } from 'components/visual/transaction-list-item/transaction-list-item.types';

export enum IconSizeEnumType {
  small = 'small',
  large = 'large',
}

@Component({
  tag: 'drt-transaction-asset-icon',
  styleUrl: 'transaction-asset-icon.scss',
  shadow: true,
})
export class TransactionAssetIcon {
  @Prop() transaction: ITransactionListItem;
  @Prop() iconSize: IconSizeEnumType;

  render() {
    if (this.transaction?.asset === null) {
      return this.iconSize === IconSizeEnumType.small ? (
        <drt-default-transaction-icon-small />
      ) : (
        <drt-default-transaction-icon-large />
      );
    }

    if (this.transaction.asset.imageUrl) {
      return (
        <img
          src={this.transaction.asset.imageUrl}
          alt="Transaction icon"
          loading="lazy"
          class="transaction-asset-image"
        />
      );
    }

    if (this.transaction.asset.icon) {
      return <drt-fa-icon icon={this.transaction.asset.icon} />;
    }

    if (this.transaction.asset.text) {
      return <span>{this.transaction.asset.text}</span>;
    }

    return this.iconSize === IconSizeEnumType.small ? (
      <drt-default-transaction-icon-small />
    ) : (
      <drt-default-transaction-icon-large />
    );
  }
}
