import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'drt-close-icon',
  styleUrl: 'close-icon.scss',
  shadow: true,
})
export class CloseIcon {
  @Prop() class?: string;

  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        class={{ 'close-icon': true, [this.class]: Boolean(this.class) }}
      >
        <path
          fill="#a3a3a3"
          d="M14.1875 15.3125L8 9.07812L1.76562 15.3125C1.48438 15.5938 1.01562 15.5938 0.6875 15.3125C0.40625 14.9844 0.40625 14.5156 0.6875 14.2344L6.92188 8L0.6875 1.8125C0.40625 1.53125 0.40625 1.0625 0.6875 0.734375C1.01562 0.453125 1.48438 0.453125 1.76562 0.734375L8 6.96875L14.1875 0.734375C14.4688 0.453125 14.9375 0.453125 15.2656 0.734375C15.5469 1.0625 15.5469 1.53125 15.2656 1.8125L9.03125 8L15.2656 14.2344C15.5469 14.5156 15.5469 14.9844 15.2656 15.3125C14.9375 15.5938 14.4688 15.5938 14.1875 15.3125Z"
        />
      </svg>
    );
  }
}
