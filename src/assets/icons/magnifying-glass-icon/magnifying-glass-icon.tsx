import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'drt-magnifying-glass-icon',
  styleUrl: 'magnifying-glass-icon.scss',
  shadow: true,
})
export class MagnifyingGlassIcon {
  @Prop() class?: string;

  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class={{ 'magnifying-glass-icon': true, [this.class]: Boolean(this.class) }}>
        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
      </svg>
    );
  }
}
