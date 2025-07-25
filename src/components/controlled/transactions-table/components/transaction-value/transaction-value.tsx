import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';
import type { TransactionValueType } from 'components/controlled/transactions-table/transactions-table.type';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

@Component({
  tag: 'drt-transaction-value',
  styleUrl: 'transaction-value.scss',
})
export class TransactionValue {
  @Prop() class?: string;
  @Prop() value: TransactionValueType;

  render() {
    return (
      <div class={classNames(this.class, 'transaction-value')}>
        {this.value.badge && (
          <div
            data-testid={DataTestIdsEnum.transactionNftBadge}
            class="badge badge-secondary badge-pill font-weight-light transaction-value-badge"
          >
            {this.value.badge}
          </div>
        )}

        {this.value.showFormattedAmount && (
          <drt-format-amount
            class={classNames('mr-1', { 'text-truncate': this.value.svgUrl })}
            dataTestId={DataTestIdsEnum.transactionActionFormattedAmount}
            isValid={true}
            label={this.value.rewaLabel}
            valueDecimal={this.value.valueDecimal}
            valueInteger={this.value.valueInteger}
          />
        )}

        {this.value.link && (
          <drt-explorer-link
            link={this.value.link}
            class={classNames('transaction-value-link', {
              'side-link d-flex': this.value.svgUrl,
              'text-truncate': !this.value.svgUrl,
            })}
          >
            <div class="transaction-value-content">
              {this.value.svgUrl && (
                <img src={this.value.svgUrl} alt={this.value.name ?? ''} class="transaction-value-img" />
              )}

              {this.value.linkText && (
                <span
                  class={classNames('transaction-value-link-text', {
                    truncate: this.value.ticker === this.value.collection && this.value.ticker != null,
                  })}
                >
                  {this.value.linkText}
                </span>
              )}
            </div>
          </drt-explorer-link>
        )}

        {this.value.titleText && (
          <drt-fa-icon icon={faLayerGroup} class="transaction-value-icon" title={this.value.titleText} />
        )}
      </div>
    );
  }
}
