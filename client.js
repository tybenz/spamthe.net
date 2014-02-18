function versionCompare(v1, v2, options) {
    var lexicographical = options && options.lexicographical,
        zeroExtend = options && options.zeroExtend,
        v1parts = v1.split('.'),
        v2parts = v2.split('.');

    function isValidPart(x) {
        return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
    }

    if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
        return NaN;
    }

    if (zeroExtend) {
        while (v1parts.length < v2parts.length) v1parts.push("0");
        while (v2parts.length < v1parts.length) v2parts.push("0");
    }

    if (!lexicographical) {
        v1parts = v1parts.map(Number);
        v2parts = v2parts.map(Number);
    }

    for (var i = 0; i < v1parts.length; ++i) {
        if (v2parts.length == i) {
            return 1;
        }

        if (v1parts[i] == v2parts[i]) {
            continue;
        }
        else if (v1parts[i] > v2parts[i]) {
            return 1;
        }
        else {
            return -1;
        }
    }

    if (v1parts.length != v2parts.length) {
        return -1;
    }

    return 0;
}

// Add jQuery to any page that does not have it already.
(function () {
  if ( window.jQuery ) {
    if ( versionCompare(jQuery.fn.jquery, "1.9.1") === -1 ) {
      window.jQuery = null;
    }
  }

  if ( !window.jQuery ) {
    var s = document.createElement('script');
    s.setAttribute('src', '//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js');
    document.body.appendChild(s);
    console.log('jquery loaded!');
  }

})();

// Client
(function ( jQuery, window, document ){
  var selected = jQuery( 'title' ).text();

  jQuery( '*' ).each (function () {
    jQuery( this ).css( 'border', '3px solid aqua' );
  });

  var jQueryselected = jQuery( '<div id="spam-client-selected" style="position: absolute; background: red; color: white; padding: 30px; width: 300px; height: 300px; z-index: 9999"><textarea class="spam-client-title">' + selected + '</textarea><a href="#" id="spam-post-submit">Post</a></div>' );
  var jQueryta = jQueryselected.find( 'textarea' );

  jQuery( 'body' ).prepend( jQueryselected );

  jQuery( document ).on( 'click', function ( evt ) {
    evt.preventDefault();

    var jQuerytarget = jQuery( evt.target );

    if ( !jQuerytarget.closest( '#spam-client-selected' ).length ) {
      selected = jQuery.trim( jQuerytarget.text() );

      jQueryta.val( selected );
    }
  });

  jQueryta.on( 'input', function () {
    selected = jQuery.trim( jQuery( this ).val() );
  });

  jQuery( '#spam-post-submit' ).on( 'click', function ( evt ) {
    evt.preventDefault();

    jQuery.ajax({
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
