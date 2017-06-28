import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-mobile-app-development',
  templateUrl: './mobile-app-development.component.html',
  styleUrls: ['./mobile-app-development.component.scss']
})
export class MobileAppDevelopmentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(window).scroll((e) => {
      this.msdLazyLoad.loadOriginalImages();
    });

    $(window).resize((e) => {
      this.msdLazyLoad.calcWidthHeight();
    });
  }

  ngAfterContentInit() {
    this.msdLazyLoad.calcWidthHeight();
  }

  msdLazyLoad: any = {
    calcWidthHeight : function() {
      $('.msd-lazyload').each(function(index, value) {
        if($(this).attr('data-src') != $(this).attr('src')) {
          $(this)
          .width('100%')
          .height($(this).width() * $(this).attr('data-img-ratio').split(':')[1] / parseInt($(this).attr('data-img-ratio').split(':')[0]));
        }
      });
      this.loadOriginalImages();
    },
    loadOriginalImages : function() {
      $('.msd-lazyload').each(function(index, value) {
        if($(this).attr('src') != $(this).attr('data-src')) {
          if($(window).scrollTop() + $(window).height() + 100 > $(this).offset().top && $(window).scrollTop() - 100 < $(this).offset().top + $(this).height()) {
            var $this = $(this);
            $(this).css('opacity', 0)
            .attr('src', $(this).attr('data-src'))
            .on('load', function() {
              $this
              .animate({'opacity': 1}, 300)
              .css({
                'width': '',
                'height': ''
              });
            });
          }
        }
      });
    }
  };

}
