import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop } from '@stencil/core';
import classNames from 'classnames';
import { type IProviderBase, ProviderTypeEnum } from 'types/provider.types';

export enum UnlockPanelGroupSlotEnum {
  groupLabel = 'group-label',
}

const unlockPanelGroupClasses: Record<string, string> = {
  detectedPanelGroup: 'drt:hidden drt:sm:block',
  lastProviderButton: 'drt:rounded-bl-lg drt:rounded-br-lg drt:overflow-hidden',
};

@Component({
  tag: 'drt-unlock-panel-group',
  styleUrl: 'unlock-panel-group.scss',
  shadow: true,
})
export class UnlockPanelGroup {
  @Event({ composed: false, bubbles: false }) login: EventEmitter<IProviderBase>;

  @Prop() providers: IProviderBase[] = [];
  @Prop() class?: string;

  private handleLogin = (provider: IProviderBase) => {
    this.login.emit(provider);
  };

  render() {
    const isInstallableExtension = (provider: IProviderBase<ProviderTypeEnum>) =>
      [ProviderTypeEnum.extension, ProviderTypeEnum.metamask].includes(provider.type as ProviderTypeEnum);

    return (
      <div class={{ 'unlock-panel-group': true, [this.class]: Boolean(this.class) }}>
        <div class="unlock-panel-group-label">
          <slot name={UnlockPanelGroupSlotEnum.groupLabel} />
        </div>

        <div class="unlock-panel-group-providers">
          {this.providers.map((provider, providerIndex) => (
            <drt-unlock-provider-button
              provider={provider}
              onClick={() => this.handleLogin(provider)}
              class={classNames({
                [unlockPanelGroupClasses.detectedPanelGroup]: isInstallableExtension(provider),
                [unlockPanelGroupClasses.lastProviderButton]: providerIndex === this.providers.length - 1,
              })}
            />
          ))}

          <slot />
        </div>
      </div>
    );
  }
}
