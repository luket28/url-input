(function($) {
    
    $.urlInput = function(element, options) {
        
        var defaults = {
            defaults: {}
        };
        
        var plugin = this;
        
        plugin.settings = $.extend({}, defaults, options);
        
        var $element = $(element),
            element = element,
            $hidden;
        
        plugin.url = {
            /**
             * Returns the simplified version of a url
             */
            simplify: function (url) {
                if (this.isValid(url)) {
                    var parts = this.extract(url);
                    
                    return this.buildSimple(parts);
                }
                
                return false;
            },

            build: function (parts, protocol, sub_domain, port, uri) {
                var defaults = plugin.settings.defaults;

                protocol = parts.protocol || protocol || defaults.protocol;
                sub_domain = parts.sub_domain || sub_domain || defaults.sub_domain;
                port = parts.port || port || defaults.port;
                uri = parts.uri || uri || defaults.uri;

                console.log();

                var url = '';
                
                if (!!protocol) {
                    url += protocol + '://';
                }
                
                if (!!sub_domain) {
                    url += sub_domain + '.';
                }
                
                url += parts.domain;
                
                if (!!port) {
                    url += ':' + port;
                }
                
                if (!!uri) {
                    url += uri;
                }

                return url;
            },

            buildSimple: function (parts) {
                return parts.domain + (!!parts.port ? ':' + parts.port : '') + (!!parts.uri ? parts.uri : '');
            },
            
            extract: function (url) {
                var parts = url.match(/^(?:([a-z]+)(?=\:\/\/)\:\/\/)?(?:([a-z0-9_\-]+)\.)?((?:[a-z0-9_\-]+)\.(?:(?:[a-z]{2}\.[a-z]{2})|(?:[a-z]{3,})))(?:\:(\d*))?(\/.*)?/i)
                var keys = 'full|protocol|sub_domain|domain|port|uri';
                var url = {};
                
                if (!parts) {
                    return false;
                }
                
                $(keys.split('|')).each(function (idx, keyName) {
                    url[keyName] = parts[idx];
                });
                
                return url;
            },
            
            /**
             * Returns true if url is valid
             */
            isValid: function (url) {
                return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&\'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&\'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&\'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&\'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&\'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test( url );
            }
        }
        
        /**
         * Initialize the plugin
         */
        plugin.init = function () {
            plugin.settings = $.extend({}, defaults, options);
            
            if (!!$element.attr('name')) {
                $hidden = $('<input type="hidden" name="' + element.name + '" value="' + element.value + '">');
                
                $element.removeAttr('name');
                $element.before($hidden);
                
                plugin.update(element.value);
                
                $element.on('focus', plugin.onFocus)
                $element.on('blur', plugin.onBlur);
                $element.on('change', plugin.update);
            }
        }
        
        /**
         * Called when the plugin gains focus
         * 
         * Sets primary element's value to the value of the hidden input
         */
        plugin.onFocus = function () {
            $element.data('url-input-previous', element.value);

            if ($hidden.val() != '') {
                element.value = $hidden.val();
            }
        }
        
        /**
         * Called when the primary element is blur'd
         * 
         * Switch the values between primary & hidden elements
         */
        plugin.onBlur = function () {
            if ($element.data('url-input-previous')) {
                element.value = $element.data('url-input-previous');
            }
            
            $element.removeData('url-input-previous');
        }
        
        /**
         * Update the primary input with the hidden input's value
         */
        plugin.update = function () {
            if (element.value == '') {
                $hidden.val('');
                return ;
            }

            var value = element.value;
            var parts = plugin.url.extract(value);
            
            if (!!parts) {
                element.value = plugin.url.buildSimple(parts);
            }

            $hidden.val(plugin.url.build(parts));
            
            $element.removeData('url-input-previous');
        }

        plugin.init();
    }
    
    $.fn.urlInput = function (options) {
        
        return this.each(function () {
            if (undefined == $(this).data('urlInput')) {
                var plugin = new $.urlInput(this, options);
                $(this).data('urlInput', plugin);
            }
        });
        
    }
    
})(jQuery);
