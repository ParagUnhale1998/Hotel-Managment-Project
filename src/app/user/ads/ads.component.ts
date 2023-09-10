import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss'],
})
export class AdsComponent implements OnInit, OnDestroy {
  images: any[] = [
    'https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_204,dpr_2/offermgmt/images/BBD/ICICIEMI_RR_HOTELS_24072023.png',
    'https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_204,dpr_2/offermgmt/images/BBD/CTINTL_RR_HOTELS_07022023.png',
    'https://www.cleartrip.com/offers/sites/default/files/styles/destination-top/public/op_iciciemi_hotels-min.png?itok=NhT6pp3J',
    'https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/BBD/OTA_RR_FLIGHTS_03072023.png',
    'https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/BBD/GiftCards_RR_12072023.png',
    'https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_204,dpr_2/offermgmt/images/BBD/CTHOTEL_RR_HOTELS_05052023.png',
    'https://www.cleartrip.com/offers/sites/default/files/styles/destination-top/public/op_canaracc_hotels-min.png?itok=scit52eY',
  ];
  
  i = 0;
  imagesAds = this.images[this.i];
  intervalId: any;

  ngOnInit(): void {
    this.intervalId =  setInterval(() => {
      if (this.i === this.images.length - 1) {
        this.i = 0;
      }
      this.i++;
      this.imagesAds = this.images[this.i];
      console.log(this.i);
    }, 2000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
