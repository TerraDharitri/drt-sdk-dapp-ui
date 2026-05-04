import { Component, Fragment, h, State } from '@stencil/core';
import classNames from 'classnames';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import state from '../../signTransactionsPanelStore';

const signTransactionsFooterClasses: Record<string, string> = {
  buttonTooltip: 'drt:absolute drt:top-0 drt:h-12 drt:left-0 drt:right-0',
  actionButton: 'drt:text-base! drt:w-full',
  explorerLinkIcon: 'drt:fill-link!',
};

@Component({
  tag: 'drt-sign-transactions-footer',
  styleUrl: 'sign-transactions-footer.scss',
  shadow: true,
})
export class SignTransactionsFooter {
  @State() awaitsExternalConfirmation: boolean = false;
  @State() isWaitingForSignature: boolean = false;
  @State() lastCommonData = { ...state.commonData };

  componentWillLoad() {
    this.lastCommonData = { ...state.commonData };
  }

  componentWillRender() {
    const currentCommonData = { ...state.commonData };
    const hasChanged = JSON.stringify(currentCommonData) !== JSON.stringify(this.lastCommonData);

    if (hasChanged && this.isWaitingForSignature) {
      // Reset the waiting state when data changes
      this.isWaitingForSignature = false;
    }

    this.lastCommonData = currentCommonData;
  }

  private handleSignClick = () => {
    if (state.onConfirm) {
      this.isWaitingForSignature = true;
      state.onConfirm();
    }
  };

  render() {
    const { onCancel, onBack, onNext } = state;
    const { currentIndex, currentIndexToSign, needsSigning, username, address, explorerLink } = state.commonData;

    const isFirstTransaction = currentIndex === 0;
    const currentIndexNeedsSigning = currentIndex === currentIndexToSign;
    const currentIndexCannotBeSignedYet = currentIndex > currentIndexToSign;
    const showForwardAction = currentIndexNeedsSigning || currentIndexCannotBeSignedYet;

    return (
      <div class="sign-transactions-footer" data-testid={DataTestIdsEnum.signTransactionsFooter}>
        <div class="sign-transactions-footer-buttons" data-testid={DataTestIdsEnum.signTransactionsFooterButtons}>
          <div class="sign-transactions-footer-button-wrapper cancel">
            <drt-button
              size="small"
              onButtonClick={isFirstTransaction ? onCancel : onBack}
              variant={currentIndexCannotBeSignedYet ? 'primary' : 'secondary'}
              data-testid={isFirstTransaction ? DataTestIdsEnum.signCancelBtn : DataTestIdsEnum.signBackBtn}
              class={classNames('sign-transactions-footer-button', signTransactionsFooterClasses.actionButton)}
            >
              {isFirstTransaction ? 'Cancel' : 'Back'}
            </drt-button>
          </div>

          <div class="sign-transactions-footer-button-wrapper confirm">
            {currentIndexCannotBeSignedYet && (
              <div
                class="sign-transactions-footer-button-tooltip-wrapper"
                onClick={(event: MouseEvent) => event.stopPropagation()}
              >
                <drt-tooltip
                  trigger={
                    <div
                      class={{
                        'sign-transactions-footer-button-tooltip': true,
                        [signTransactionsFooterClasses.buttonTooltip]: true,
                      }}
                    />
                  }
                >
                  {needsSigning ? (
                    <Fragment>
                      You cannot sign this transaction yet, <br /> please go back and sign consecutively.
                    </Fragment>
                  ) : (
                    <Fragment>
                      You cannot confirm this transaction yet, <br />
                      please go back and confirm consecutively.
                    </Fragment>
                  )}
                </drt-tooltip>
              </div>
            )}

            <drt-button
              size="small"
              data-testid={DataTestIdsEnum.signNextTransactionBtn}
              onClick={showForwardAction ? this.handleSignClick : onNext}
              disabled={currentIndexCannotBeSignedYet || this.isWaitingForSignature}
              class={classNames('sign-transactions-footer-button', signTransactionsFooterClasses.actionButton)}
            >
              {showForwardAction ? (
                <span class="sign-transactions-footer-button-label-wrapper">
                  {this.isWaitingForSignature ? (
                    <span class="sign-transactions-footer-button-label">Check your device</span>
                  ) : (
                    <span class="sign-transactions-footer-button-label">{needsSigning ? 'Sign' : 'Confirm'}</span>
                  )}
                </span>
              ) : (
                <span class="sign-transactions-footer-button-label-wrapper">
                  <span class="sign-transactions-footer-button-label">Next</span>
                </span>
              )}

              {showForwardAction ? (
                <span
                  class={{
                    'sign-transactions-footer-button-icon-wrapper': true,
                    'lighter': currentIndexCannotBeSignedYet,
                  }}
                >
                  {this.isWaitingForSignature ? (
                    <span class="sign-transactions-footer-button-icon">
                      <drt-spinner-icon />
                    </span>
                  ) : (
                    <span class="sign-transactions-footer-button-icon">
                      {needsSigning ? <drt-pencil-icon /> : <drt-check-icon />}
                    </span>
                  )}
                </span>
              ) : (
                <span class="sign-transactions-footer-button-icon-wrapper">
                  <span class="sign-transactions-footer-button-icon">
                    <drt-arrow-right-icon />
                  </span>
                </span>
              )}
            </drt-button>
          </div>
        </div>

        <div class="sign-transactions-footer-identity" data-testid={DataTestIdsEnum.signTransactionsFooterIdentity}>
          <div class="sign-transactions-footer-identity-label">Sign with</div>

          {username && (
            <div
              class="sign-transactions-footer-identity-username"
              data-testid={DataTestIdsEnum.signTransactionsFooterIdentityUsername}
            >
              <span class="sign-transactions-footer-identity-username-prefix">@</span>
              <span class="sign-transactions-footer-identity-username-text">{username}</span>
            </div>
          )}

          {!username && address && (
            <drt-trim
              text={address}
              class="sign-transactions-footer-identity-address"
              data-testid={DataTestIdsEnum.signTransactionsFooterIdentityAddress}
            />
          )}

          <drt-copy-button
            text={username ?? address}
            class="sign-transactions-footer-identity-copy"
            iconClass="sign-transactions-footer-identity-copy-icon"
          />

          <drt-explorer-link link={explorerLink} iconClass={signTransactionsFooterClasses.explorerLinkIcon} />
        </div>
      </div>
    );
  }
}
