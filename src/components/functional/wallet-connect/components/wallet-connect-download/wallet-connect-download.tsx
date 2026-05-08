import type { JSX } from '@stencil/core';
import { Component, h, Prop } from '@stencil/core';

const TDHARITRI_APP_GALLERY_LINK = 'https://appgallery.huawei.com/app/C104325151';
const TDHARITRI_APP_STORE_LINK = 'https://apps.apple.com/us/app/tdharitri/id1519405832';
const TDHARITRI_PLAY_STORE_LINK = 'https://play.google.com/store/apps/details?id=com.numbat.durian.wallet&hl=ro&pli=1';

interface TDharitriDownloadOptionType {
  image: JSX.Element;
  link: string;
}

const tDharitriDownloadOptions: TDharitriDownloadOptionType[] = [
  { image: <drt-wallet-connect-app-store-icon />, link: TDHARITRI_APP_STORE_LINK },
  { image: <drt-wallet-connect-google-play-icon />, link: TDHARITRI_PLAY_STORE_LINK },
  { image: <drt-wallet-connect-app-gallery-icon />, link: TDHARITRI_APP_GALLERY_LINK },
];

@Component({
  tag: 'drt-wallet-connect-download',
  styleUrl: 'wallet-connect-download.scss',
  shadow: true,
})
export class WalletConnect {
  @Prop() class?: string;

  render() {
    return (
      <div class={{ 'wallet-connect-download': true, [this.class]: Boolean(this.class) }}>
        <div class="wallet-connect-download-wrapper">
          <drt-tdharitri-download-qr-icon class="wallet-connect-download-qr" />

          <div class="wallet-connect-download-description">
            Scan this QR code on your phone <br /> to get the tDharitri app
          </div>
        </div>

        <div class="wallet-connect-download-options">
          {tDharitriDownloadOptions.map(tDharitriDownloadOption => (
            <a
              class="wallet-connect-download-option"
              href={tDharitriDownloadOption.link}
              target="_blank"
              rel="noreferrer"
            >
              {tDharitriDownloadOption.image}
            </a>
          ))}
        </div>
      </div>
    );
  }
}
