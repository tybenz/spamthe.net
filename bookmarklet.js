javascript:(function(){;var%20numDependencies=0,loadedDependencies=0;function%20scriptLoaded()%7BloadedDependencies++;if(numDependencies===loadedDependencies)%7BafterDepsLoaded()%7D%7Dfunction%20afterDepsLoaded()%7Bfunction%20versionCompare(v1,v2,options)%7Bvar%20lexicographical=options&&options.lexicographical,zeroExtend=options&&options.zeroExtend,v1parts=v1.split(%22.%22),v2parts=v2.split(%22.%22);function%20isValidPart(x)%7Breturn(lexicographical?/%5E%5Cd+%5BA-Za-z%5D*$/:/%5E%5Cd+$/).test(x)%7Dif(!v1parts.every(isValidPart)%7C%7C!v2parts.every(isValidPart))%7Breturn%20NaN%7Dif(zeroExtend)%7Bwhile(v1parts.length%3Cv2parts.length)v1parts.push(%220%22);while(v2parts.length%3Cv1parts.length)v2parts.push(%220%22)%7Dif(!lexicographical)%7Bv1parts=v1parts.map(Number);v2parts=v2parts.map(Number)%7Dfor(var%20i=0;i%3Cv1parts.length;++i)%7Bif(v2parts.length==i)%7Breturn%201%7Dif(v1parts%5Bi%5D==v2parts%5Bi%5D)%7Bcontinue%7Delse%20if(v1parts%5Bi%5D%3Ev2parts%5Bi%5D)%7Breturn%201%7Delse%7Breturn-1%7D%7Dif(v1parts.length!=v2parts.length)%7Breturn-1%7Dreturn%200%7D(function()%7Bif(window.jQuery)%7Bif(versionCompare(jQuery.fn.jquery,%221.9.1%22)===-1)%7Bwindow.jQuery=null%7D%7Dif(!window.jQuery)%7Bvar%20s=document.createElement(%22script%22);s.setAttribute(%22src%22,%22//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js%22);document.body.appendChild(s);console.log(%22jquery%20loaded!%22)%7D%7D)();(function(jQuery,window,document)%7Bvar%20selected=jQuery(%22title%22).text();jQuery(%22*%22).each(function()%7BjQuery(this).css(%22border%22,%223px%20solid%20aqua%22)%7D);var%20jQueryselected=jQuery('%3Cdiv%20id=%22spam-client-selected%22%20style=%22position:%20absolute;%20background:%20red;%20color:%20white;%20padding:%2030px;%20width:%20300px;%20height:%20300px;%20z-index:%209999%22%3E%3Ctextarea%20class=%22spam-client-title%22%3E'+selected+'%3C/textarea%3E%3Ca%20href=%22#%22%20id=%22spam-post-submit%22%3EPost%3C/a%3E%3C/div%3E');var%20jQueryta=jQueryselected.find(%22textarea%22);jQuery(%22body%22).prepend(jQueryselected);jQuery(document).on(%22click%22,function(evt)%7Bevt.preventDefault();var%20jQuerytarget=jQuery(evt.target);if(!jQuerytarget.closest(%22#spam-client-selected%22).length)%7Bselected=jQuery.trim(jQuerytarget.text());jQueryta.val(selected)%7D%7D);jQueryta.on(%22input%22,function()%7Bselected=jQuery.trim(jQuery(this).val())%7D);jQuery(%22#spam-post-submit%22).on(%22click%22,function(evt)%7Bevt.preventDefault();jQuery.ajax(%7Burl:%22http://localhost:9098/tweet_link%22,type:%22post%22,dataType:%22json%22,data:%7Burl:window.location.origin+window.location.pathname,title:selected%7D,success:function(evt,data,response)%7Balert(%22posted!%22)%7D,error:function(xhr,data,response)%7Balert(evt.responseText)%7D%7D)%7D)%7D)(jQuery,window,document)%7DafterDepsLoaded();})()