import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'drt-single-angle-left-icon',
  styleUrl: 'single-angle-left-icon.scss',
  shadow: true,
})
export class SingleAngleLeftIcon {
  @Prop() class?: string;

  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
        class={{ 'single-angle-left-icon': true, [this.class]: Boolean(this.class) }}
      >
        <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
      </svg>
    );
  }
}
