$(document).ready(function(){

  $('html').removeClass('no-js');

  // Write your Javascript!

  // Cache selectors
  var lastId,
      topMenu = $("#main-nav"),
      topMenuHeight = topMenu.outerHeight()+15,
      // All list items
      menuItems = topMenu.find("nav a"),
      // Anchors corresponding to menu items
      scrollItems = menuItems.map(function(){
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
      });

  // Bind click handler to menu items
  // so we can get a fancy scroll animation
  menuItems.click(function(e){
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
    $('html, body').stop().animate({
        scrollTop: offsetTop
    }, 300);
    e.preventDefault();
  });

  // Bind to scroll
  $(window).scroll(function(){
     // Get container scroll position
     var fromTop = $(this).scrollTop()+topMenuHeight;

     // Get id of current scroll item
     var cur = scrollItems.map(function(){
       if ($(this).offset().top < fromTop)
         return this;
     });
     // Get the id of the current element
     cur = cur[cur.length-1];
     var id = cur && cur.length ? cur[0].id : "";

     if (lastId !== id) {
         lastId = id;
         // Set/remove active class
         menuItems
           .parent().removeClass("active")
           .end().filter("[href=#"+id+"]").parent().addClass("active");
     }
  });
});

if(!$.browser.mobile){
    $(document).ready(function() {
      console.log("not a mobile device, fancybox will be enabled");
      $(".lightBox").fancybox({
        helpers : {
            title: {
                type: 'inside',
                position: 'top'
            }
        },
        iframe : {
            preload: false
        },
        afterLoad: function() {
          ga('send', 'pageview', this.href);
          ga('send', 'event', 'Lightbox', 'Open', 'this.href');
        },
        margin      : [20, 70, 20, 70],
        loop : false
      });
    }); // ready
  } // if