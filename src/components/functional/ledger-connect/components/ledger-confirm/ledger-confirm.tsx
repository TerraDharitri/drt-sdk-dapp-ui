import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { IConfirmScreenData } from '../../ledger-connect.types';

interface LedgerConfirmationItemType {
  label: string;
  value: string;
  highlighted?: boolean;
  explorerLink?: string;
}

const ledgerConfirmClasses: Record<string, string> = {
  button: 'drt:whitespace-nowrap drt:rounded-lg!',
};

@Component({
  tag: 'drt-ledger-confirm',
  styleUrl: 'ledger-confirm.scss',
  shadow: true,
})
export class LedgerConfirm {
  @Prop() confirmScreenData: IConfirmScreenData;

  handleSupportButtonClick(event: MouseEvent) {
    event.preventDefault();
    window.open('https://help.dharitri.org/en/');
  }

  render() {
    const ledgerConfirmationItems: LedgerConfirmationItemType[] = [
      {
        label: this.confirmScreenData.confirmAddressText,
        value: this.confirmScreenData.selectedAddress,
        explorerLink: this.confirmScreenData.explorerLink,
      },
      {
        label: this.confirmScreenData.authText,
        value: this.confirmScreenData.data,
        highlighted: true,
      },
    ];

    return (
      <div data-testid={DataTestIdsEnum.ledgerConfirmAddress} class="ledger-confirm">
        <div class="ledger-confirm-items">
          {ledgerConfirmationItems.map(ledgerConfirmationItem => (
            <div class="ledger-confirm-item">
              <div class="ledger-confirm-item-label">{ledgerConfirmationItem.label}</div>

              <div class="ledger-confirm-item-value">
                <div
                  class={{
                    'ledger-confirm-item-value-text': true,
                    'highlighted': Boolean(ledgerConfirmationItem.highlighted),
                  }}
                >
                  {ledgerConfirmationItem.value}
                </div>

                <div class="ledger-confirm-item-value-actions">
                  <drt-copy-button
                    text={ledgerConfirmationItem.value}
                    class="ledger-confirm-item-value-copy"
                    iconClass="ledger-confirm-item-value-copy-icon"
                  />

                  {ledgerConfirmationItem.explorerLink && (
                    <drt-explorer-link link={ledgerConfirmationItem.explorerLink} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div class="ledger-confirm-action">
          Select <strong>Approve</strong> on your device to confirm.
        </div>

        <div class="ledger-confirm-footer">
          <drt-triangular-warning-icon class="ledger-confirm-footer-icon" />
          <div class="ledger-confirm-footer-description">
            If the address does not match, close this page and contact support.
          </div>

          <drt-button
            size="small"
            variant="neutral"
            onButtonClick={this.handleSupportButtonClick.bind(this)}
            class={classNames('ledger-confirm-footer-button', ledgerConfirmClasses.button)}
          >
            Contact Support
          </drt-button>
        </div>
      </div>
    );
  }
}
