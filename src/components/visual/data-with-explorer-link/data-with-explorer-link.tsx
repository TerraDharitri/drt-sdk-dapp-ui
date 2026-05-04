import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'drt-data-with-explorer-link',
  styleUrl: 'data-with-explorer-link.scss',
  shadow: false,
})
export class DataWithExplorerLink {
  @Prop() showExplorerButton?: boolean = true;
  @Prop() showCopyButton?: boolean = true;
  @Prop() withTooltip?: boolean = false;
  @Prop() explorerLink: string;
  @Prop() dataTestId?: string;
  @Prop() class?: string;
  @Prop() data: string;

  render() {
    return (
      <div class={{ 'data-with-explorer-link': true, [this.class]: Boolean(this.class) }} data-testid={this.dataTestId}>
        <drt-trim text={this.data} class="data-with-explorer-link-trim" />

        {(this.showCopyButton || this.showExplorerButton) && (
          <div class="data-with-explorer-link-buttons" onClick={event => event.stopPropagation()}>
            {this.showCopyButton && this.withTooltip && (
              <drt-tooltip position="bottom" trigger={<drt-copy-button text={this.data} />}>
                Copy
              </drt-tooltip>
            )}

            {this.showExplorerButton && this.withTooltip && (
              <drt-tooltip position="bottom" trigger={<drt-explorer-link link={this.explorerLink} />}>
                Explore
              </drt-tooltip>
            )}

            {this.showCopyButton && !this.withTooltip && <drt-copy-button text={this.data} />}
            {this.showExplorerButton && !this.withTooltip && <drt-explorer-link link={this.explorerLink} />}
          </div>
        )}
      </div>
    );
  }
}
