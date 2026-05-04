import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop } from '@stencil/core';
import classNames from 'classnames';

import type { IConnectScreenData } from '../../ledger-connect.types';

const ledgerIntroClasses: Record<string, string> = {
  icon: 'drt:w-50 drt:h-auto drt:xs:w-100 drt:xs:h-85',
  button: 'drt:w-48 drt:xs:mt-5',
};

@Component({
  tag: 'drt-ledger-intro',
  styleUrl: 'ledger-intro.scss',
  shadow: true,
})
export class LedgerIntro {
  @Event() connect?: EventEmitter;

  @Prop() connectScreenData?: IConnectScreenData;
  @Prop() isAwaiting?: boolean = false;

  handleLedgerConnectClick(event: MouseEvent) {
    event.preventDefault();

    if (this.connect) {
      this.connect.emit(event);
    }
  }

  render() {
    const showError = this.connectScreenData && this.connectScreenData.error;

    return (
      <div class="ledger-intro">
        <div class="ledger-intro-wrapper">
          <drt-ledger-icon
            class={classNames('ledger-intro-icon', {
              [ledgerIntroClasses.icon]: true,
            })}
          />

          <div class="ledger-intro-description">
            Connect your device <br />
            and open the DharitrI App
          </div>

          <drt-button
            disabled={Boolean(this.isAwaiting)}
            onClick={this.handleLedgerConnectClick.bind(this)}
            class={classNames('ledger-intro-button', ledgerIntroClasses.button)}
          >
            {this.isAwaiting ? (
              <span class="ledger-intro-button-label">Connecting...</span>
            ) : (
              <span class="ledger-intro-button-label">{showError ? 'Retry Connection' : 'Connect Ledger'}</span>
            )}

            {this.isAwaiting && <drt-spinner-icon />}
          </drt-button>

          {showError && <div class="ledger-intro-error">{this.connectScreenData.error}</div>}
        </div>

        <a
          href="https://support.ledger.com/hc/en-us/articles/115005165269-Connection-issues-with-Windows-or-Linux"
          target="_blank"
          rel="noopener noreferrer"
          class="ledger-intro-issues"
        >
          Having connection issues?
        </a>
      </div>
    );
  }
}
