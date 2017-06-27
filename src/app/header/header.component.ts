import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    /* ================= Open first sub menu on top menu hover Starts ================ */
    $('.nav-dropdown').mouseover(function() {
      $(this).find('.sub-menu').children('li').eq(0).find('ul').css('display', 'block');
    });

    $('.nav-dropdown').find('.sub-menu').children('li').mouseover(function(e) {
      e.stopPropagation();
      $('.nav-dropdown').find('.sub-menu').children('li').eq(0).find('ul').css('display', '');
    });
    /* ================== Open first sub menu on top menu hover Ends ================= */

    $('.menu').click(function(e) {
      if($('.nav > ul').is(':visible')) {
        $('.nav > ul').css('display', 'none');
      }
      else {
        $('.nav > ul').css('display', 'block');
      }
    });

    $('.nav-dropdown a i').click(function(e) {
      e.preventDefault();
      e.stopPropagation();

      if($(this).parent('a').next('.dropdown-block').length > 0) {
        if($(this).parent('a').next('.dropdown-block').is(':visible')) {
          $(this).parent('a').next('.dropdown-block').css('display', 'none');
        }
        else {
          $(this).parent('a').next('.dropdown-block').css('display', 'block');
        }
      }
      else if($(this).parent('a').next('ul').length > 0) {
        if($(this).parent('a').next('ul').is(':visible')) {
          $(this).parent('a').next('ul').css('display', 'none');
        }
        else {
          $(this).parent('a').next('ul').css('display', 'block');
        }
      }
    })
    
    $(window).scroll((e) => {
      if($(window).scrollTop() > 50) {
        $('#header').addClass('short-nav');
      }
      else {
        $('#header').removeClass('short-nav');
      }
    });

    $(window).resize((e) => {
      $('.nav ul, .dropdown-block').css('display', '');
    });

  }  

}
