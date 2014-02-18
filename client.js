// Add jQuery to any page that does not have it already.
(function () {

  if ( !window.jQuery ) {
    var s = document.createElement('script');
    s.setAttribute('src', '//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js');
    document.body.appendChild(s);
    console.log('jquery loaded!');
  }

})();

// Client
(function ( $, window, document ){
  var selected = $( 'title' ).text();

  $( '*' ).each (function () {
    $( this ).css( 'border', '3px solid aqua' );
  });

  var $selected = $( '<div id="spam-client-selected" style="position: absolute; background: red; color: white; padding: 30px; width: 300px; height: 300px; z-index: 9999"><textarea class="spam-client-title">' + selected + '</textarea><a href="#" id="spam-post-submit">Post</a></div>' );
  var $ta = $selected.find( 'textarea' );

  $( 'body' ).prepend( $selected );

  $( document ).on( 'click', function ( evt ) {
    evt.preventDefault();

    var $target = $( evt.target );

    if ( !$target.closest( '#spam-client-selected' ).length ) {
      selected = $.trim( $target.text() );

      $ta.val( selected );
    }
  });

  $ta.on( 'input', function () {
    selected = $.trim( $( this ).val() );
  });

  $( '#spam-post-submit' ).on( 'click', function ( evt ) {
    evt.preventDefault();

    $.ajax({
      url: 'http://localhost:9098/tweet_link',
      type: 'post',
      dataType: 'json',
      data: { url: window.location.origin + window.location.pathname, title: selected },
      success: function ( evt, data, response ) {
        alert( 'posted!' );
      },
      error: function ( xhr, data, response ) {
        alert( evt.responseText );
      }
    });
  });
})( jQuery, window, document );
