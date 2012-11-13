(function(){
    
    'use strict';
    
    var root = this;
    var YiiDebug = root.YiiDebug = {
        
        basePath : null,
        
        toolbar : null,
        
        escaper : /\\|'|\r|\n|\t|\u2028|\u2029/g,
        
        escapes : {
            "'":      "'",
            '\\':     '\\',
            '\r':     'r',
            '\n':     'n',
            '\t':     't',
            '\u2028': 'u2028',
            '\u2029': 'u2029'
        },
        
        templateSettings : {
            evaluate    : /<%([\s\S]+?)%>/g,
            interpolate : /<%=([\s\S]+?)%>/g,
            escape      : /<%-([\s\S]+?)%>/g
        },
        
        defaults : function(obj) {
            this.each(this.slice.call(arguments, 1), function(source) {
                for (var prop in source) {
                    if (obj[prop] == null) obj[prop] = source[prop];
                }
            });
            return obj;
        },
        
        template : function(file, callback) {
            var self = this;
            $.get(this.basePath + '/' + file + '.html', function(text, textStatus, jqXHR){
                callback(self.renderTemplate(text));
            });
        },
        
        renderTemplate : function(text) {
            var settings = this.defaults({}, this.templateSettings);

            // Combine delimiters into one regular expression via alternation.
            var matcher = new RegExp([
                (settings.escape || noMatch).source,
                (settings.interpolate || noMatch).source,
                (settings.evaluate || noMatch).source
                ].join('|') + '|$', 'g');

            // Compile the template source, escaping string literals appropriately.
            var index = 0;
            var source = "__p+='";
            var escapes = this.escapes;
            text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
                source += text.slice(index, offset)
                .replace(YiiDebug.escaper, function(match) {
                    return '\\' + escapes[match];
                });
                source +=
                escape ? "'+\n((__t=(" + escape + "))==null?'':YiiDebug.escape(__t))+\n'" :
                interpolate ? "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'" :
                evaluate ? "';\n" + evaluate + "\n__p+='" : '';
                index = offset + match.length;
            });
            source += "';\n";

            // If a variable is not specified, place data values in local scope.
            if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

            source = "var __t,__p='',__j=Array.prototype.join," +
            "print=function(){__p+=__j.call(arguments,'');};\n" +
            source + "return __p;\n";

            try {
                var render = new Function(settings.variable || 'obj', 'YiiDebug', source);
            } catch (e) {
                e.source = source;
                throw e;
            }

            var template = function(data) {
                return render.call(this, data, YiiDebug);
            };

            // Provide the compiled function source as a convenience for precompilation.
            template.source = 'function(obj){\n' + source + '}';

            return template;
        },
        
        init : function(basePath)
        {
            this.basePath = basePath;
            this.toolbar = new YiiDebugToolbar(this);
        },
        
        extend : function(obj) {
            this.each(this.slice.call(arguments, 1), function(source) {
                for (var prop in source) {
                    obj[prop] = source[prop];
                }
            });
            return obj;
        },
        
        slice : Array.prototype.slice,
        
        each : function(obj, iterator, context) {
            if (obj == null) return;
            if (obj.length === +obj.length) {
                for (var i = 0, l = obj.length; i < l; i++) {
                    if (iterator.call(context, obj[i], i, obj) === {}) return;
                }
            } else {
                for (var key in obj) {
                    if (YiiDebug.has(obj, key)) {
                        if (iterator.call(context, obj[key], key, obj) === {}) return;
                    }
                }
            }
        },
        has : function(obj, key) {
            return Object.prototype.hasOwnProperty.call(obj, key);
        }
    };
    
    var YiiDebugToolbar = YiiDebug.View = function(app, options) {
        this.initialize.apply(this, arguments);
    };
    
    YiiDebug.extend(YiiDebugToolbar.prototype, {
        initialize : function(app) {
            YiiDebug.template('templates/toolbar', this.render);
        }, 
        render : function(template) {
            $('body').append(template({
                'title' : 'AAAAAAAAAAAAAAAA'
            }));
        }
    });
    
    
    
}).call(this);