import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';

import type { TransactionIconInfoType } from '../../transactions-table.type';

@Component({
  tag: 'drt-transaction-icon',
})
export class TransactionIcon {
  @Prop() class?: string;
  @Prop() iconInfo: TransactionIconInfoType;

  render() {
    if (!this.iconInfo) {
      return null;
    }

    return (
      <drt-fa-icon
        class={classNames(
          {
            'drt:text-error': this.iconInfo.icon === 'faTimes',
            'drt:text-pending': this.iconInfo.icon === 'faHourglass',
          },
          this.class,
          'transaction-icon',
        )}
        icon={this.iconInfo.icon}
        description={this.iconInfo.tooltip}
      />
    );
  }
}
