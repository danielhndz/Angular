import { Component, OnInit, AfterViewInit } from '@angular/core';
import Swiper, { Navigation, Pagination } from 'swiper';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit, AfterViewInit {

  images: string[] = [
    'assets/images/banner-1.jpg',
    'assets/images/banner-2.jpg',
    'assets/images/banner-3.jpg'
  ];
  swiper: Swiper;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    Swiper.use([Navigation, Pagination]);
    this.swiper = new Swiper('.swiper-container', {
      spaceBetween: 30,
      centeredSlides: true,

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },

      // Pagination
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
        // clickable: true,
        // dynamicBullets: true
      },

      /*
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      */

      // Optional parameters
      // observer: true,
      // observeParents: true,
      // preventClicks: false,
      // preventClicksPropagation: false
    });
  }

}
