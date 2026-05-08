import './button.scss';

import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import capitalize from 'lodash.capitalize';

import type { Button } from './button';
import { ButtonSizeEnum, ButtonVariantEnum } from './button.types';

// prettier-ignore
const styles = {
  buttonStoriesGrid: 'button-stories-grid drt:flex drt:gap-4 drt:flex-wrap',
} satisfies Record<string, string>;

const storySettings: Meta<Button> = {
  tags: ['autodocs'],
  title: 'Components/Button',
  render: properties => <drt-button {...properties}>Button Text</drt-button>,
  args: { variant: 'primary', size: 'large', disabled: false },
  argTypes: {
    variant: { control: { type: 'select' }, options: Object.values(ButtonVariantEnum) },
    size: { control: { type: 'select' }, options: Object.values(ButtonSizeEnum) },
    disabled: { control: 'boolean' },
    class: { control: 'text' },
  },
};

export const Primary: StoryObj<Button> = {
  render: () => <drt-button>Button</drt-button>,
};

export const DefaultSize: StoryObj<Button> = {
  render: () => (
    <div class={styles.buttonStoriesGrid}>
      {Object.values(ButtonVariantEnum).map(variant => (
        <drt-button variant={variant}>{capitalize(variant)}</drt-button>
      ))}
    </div>
  ),
};

export const SmallSize: StoryObj<Button> = {
  render: () => (
    <div class={styles.buttonStoriesGrid}>
      {Object.values(ButtonVariantEnum).map(variant => (
        <drt-button variant={variant} size="small">
          {capitalize(variant)}
        </drt-button>
      ))}
    </div>
  ),
};

export const DisabledVariants: StoryObj<Button> = {
  render: () => (
    <div class={styles.buttonStoriesGrid}>
      {Object.values(ButtonVariantEnum).map(variant => (
        <drt-button variant={variant} disabled={true}>
          {capitalize(variant)}
        </drt-button>
      ))}
    </div>
  ),
};

export default storySettings;
