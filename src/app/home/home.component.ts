import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var $: any;
declare var Stats: any;
declare var Proton: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    $(window).scroll((e) => {
      this.msdLazyLoad.loadOriginalImages();
    });

    $(window).resize((e) => {
      this.msdLazyLoad.calcWidthHeight();
    });

    $('.slider-main').each(function(index, value) {
      $(value).find('.slider-inner').css({
        'width' : ($(value).find('.slides').outerWidth(true) * ($(value).find('.slides').length) * 3)
      })
      $(value).find('.clone').clone().appendTo($(value).find('.slider-inner'));
      $(value).find('.clone').eq(0).clone().appendTo($(value).find('.slider-inner'));
    });

    $('.web-solution-image-carousel img').each(function(index, value) {

    });

    function webSolutionImageFunc() {
      let webSolutionImageCounter = ($('.web-solution-image-carousel img.active').length == 0 || $('.web-solution-image-carousel img.active').index() == $('.web-solution-image-carousel img').length-1) ? 0 : parseInt($('.web-solution-image-carousel img.active').index()) + 1;

      $('.web-solution-image-carousel img').removeClass('active').eq(webSolutionImageCounter).addClass('active');
      // $('.web-solution-image-carousel img').eq(webSolutionImageCounter).addClass('active');

      setTimeout(function() {
        webSolutionImageFunc();
      }, 2000);
    };
    webSolutionImageFunc();


    // Canvas Animation Starts
    (function($, window, document) {
      var canvas;
      var context;
      var proton;
      var renderer;
      var emitter;
      var stats;
      var index;
      var randomBehaviour;
      var gravity;
      var winWidth = $(window).width();
      var winHeight = $(window).height();
      var WindowOrientation;
      var imageAddress = 'assets/images/heart-icon/';


      function defineSizes(){
        winWidth=$(window).width();
        winHeight=$(window).height();

        if(winWidth>winHeight){
          WindowOrientation='landscape';
        }else{
          WindowOrientation='portrait';
        }

        // console.log(WindowOrientation);
      }

      defineSizes();


      $(window).resize(function(){
        defineSizes();
      });

      Main();



      function Main() {
        canvas = document.getElementById("heart-anim-Canvas");

        if(WindowOrientation=='landscape'){
          canvas.width = 3 * winHeight;
          canvas.height = 1 * winHeight;
        }else{
          canvas.width = 3 * winWidth;
          canvas.height = 1 * winWidth;

        }
        
        context = canvas.getContext('2d');

        //context.globalCompositeOperation = "lighter";
        addStats();
        loadImage();
      }

      function addStats() {
        stats = new Stats();
        stats.setMode(2);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        //document.getElementById('container').appendChild(stats.domElement);

      }

      function loadImage() {
        var image = new Image()
        image.onload = function(e) {
          //var rect = new Proton.Rectangle(0, (winHeight - winWidth/1.77) / 2, e.target.width, e.target.height);
          if(WindowOrientation=='landscape') {
            var rect = new Proton.Rectangle((0.5 * winHeight), 0, (<HTMLImageElement>e.target).width, (<HTMLImageElement>e.target).height);
          }
          else {
            var rect = new Proton.Rectangle((1 * winHeight), 0, (<HTMLImageElement>e.target).width, (<HTMLImageElement>e.target).height);
          }

          if(WindowOrientation=='landscape'){
            context.drawImage(e.target, rect.x, rect.y, 1 * winHeight, 1 * winHeight);
          }else{
            context.drawImage(e.target, rect.x, rect.y, 1 * winWidth, 1 * winWidth);
          }

          createProton(rect);
          tick();
        }

        image.src = imageAddress + 'heart.png';


      }

      function createProton(rect) {
        proton = new Proton;
        emitter = new Proton.Emitter();
        //setRate
        //alert(winWidth);
        if(winWidth>767){
          emitter.rate = new Proton.Rate(new Proton.Span(3, 3), new Proton.Span(0.01));
        }else{
          emitter.rate = new Proton.Rate(new Proton.Span(3, 3), new Proton.Span(0.01));
        }
        //addInitialize
        emitter.addInitialize(new Proton.Position(new Proton.PointZone(0, 0)));
        emitter.addInitialize(new Proton.Mass(3));
        emitter.addInitialize(new Proton.Life(5));
        emitter.addBehaviour(new Proton.Alpha(1, 0));


        if(winWidth>767){
          emitter.addInitialize(new Proton.ImageTarget(
            [
              imageAddress + 'face.png',
              imageAddress + 'twter.png',
              imageAddress + 'pinterest.png',
              imageAddress + 'google.png',
              imageAddress + 'in.png',
              imageAddress + 'insyra.png',
              imageAddress + 'youtube.png',
              imageAddress + 'face.png',
              imageAddress + 'twter.png',
              imageAddress + 'pinterest.png'
            ], 
            30, 30)
          );
        }else{
          emitter.addInitialize(new Proton.ImageTarget(
            [
              imageAddress + 'face.png',
              imageAddress + 'twter.png',
              imageAddress + 'pinterest.png',
              imageAddress + 'google.png',
              imageAddress + 'in.png',
              imageAddress + 'insyra.png',
              imageAddress + 'youtube.png',
              imageAddress + 'face.png',
              imageAddress + 'twter.png',
              imageAddress + 'pinterest.png'
            ], 
            16, 16)
          );
        }



        var imagedata = context.getImageData(rect.x, rect.y, rect.width, rect.height);

        emitter.addInitialize(new Proton.P(new Proton.ImageZone(imagedata, rect.x, rect.y + 1)));
        //addBehaviour

        if(winWidth>1030){
          randomBehaviour = new Proton.RandomDrift(1, 1, .2);
        }else{
          randomBehaviour = new Proton.RandomDrift(.2, .2, .02);
        }
      
        gravity = new Proton.Gravity(0);
        emitter.addBehaviour(customScaleBehaviour());
        emitter.addBehaviour(gravity);
        emitter.addBehaviour(randomBehaviour);
        //emitter.addBehaviour(new Proton.Color(['#00aeff', '#0fa954', '#54396e', '#e61d5f']));
        emitter.addBehaviour(new Proton.CrossZone(new Proton.RectZone(0, 0, canvas.width, canvas.height), 'collision'));
        emitter.emit();
        //add emitter
        proton.addEmitter(emitter);

        //canvas renderer
        renderer = new Proton.Renderer('canvas', proton, canvas);


        //debug
        //Proton.Debug.drawEmitter(proton, canvas, emitter);

        index = 0;
        let hasEntered: boolean = false;

        renderer.start();
        context.clearRect(0, 0, canvas.width, canvas.height);

        window.addEventListener('scroll', function(e) {

          //Check if user has entered the section. If yes, starts hearts.
          if($(window).scrollTop() + $(window).height() > $('.degi-mark-sec').offset().top + $('.degi-mark-sec').height() && $(window).scrollTop() < $('.degi-mark-sec').offset().top && !hasEntered) {
            hasEntered = true;
          }
          if($(window).scrollTop() + $(window).height() > $('.degi-mark-sec').offset().top + $('.degi-mark-sec').height() && $(window).scrollTop() < $('.degi-mark-sec').offset().top && hasEntered) {
            pulseHeart();
          }
          // if($(window).scrollTop() + $(window).height() < $('.degi-mark-sec').offset().top || $(window).scrollTop() > $('.degi-mark-sec').offset().top + $('.degi-mark-sec').height() && hasEntered) {
          //   renderer.stop();
          //   hasEntered = false;
          // }
        });

        function pulseHeart(){
            randomBehaviour.reset(50, 50, .1);
            gravity.reset(0);

            setTimeout(function(){ 						
              randomBehaviour.reset(1, 1, .2);
              gravity.reset(0);
            }, 100);
        };

      }

      function customScaleBehaviour() {
        return {
          initialize : function(particle) {
            particle.oldRadius = particle.radius;
            particle.scale = 0;
          },
          applyBehaviour : function(particle) {
            if (particle.energy >= 2 / 3) {
              particle.scale = (1 - particle.energy) * 3;
            } else if (particle.energy <= 1 / 3) {
              particle.scale = particle.energy * 3;
            }
            particle.radius = particle.oldRadius * particle.scale;
          }
        }
      }

      function tick() {
        requestAnimationFrame(tick);
        stats.begin();
        proton.update();
        stats.end();
      }

    })(jQuery, window, document);
    // Canvas Animation Ends
  }

  ngAfterContentInit() {
    this.msdLazyLoad.calcWidthHeight();

    $('.owl-carousel').each(function(index, value) {
      let dataDelay = typeof $(this).attr('data-delay') !== 'undefined' ? $(this).attr('data-delay') : 3000;
      $(this).owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        pagination:true,
        autoplay:true,
        lazyLoad:true,
        autoplayTimeout:dataDelay,
        responsive:{
          0:{
            items:1
          },
          600:{
            items:1
          },
          1000:{
            items:1
          }
        }
      });
    });
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
