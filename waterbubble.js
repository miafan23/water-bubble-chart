/**
 * 水球图 wataerbubble
 * @author fiona23 (fiona_fanmy@163.com)
 * @2016.3.8 version 1.2
 *  chrome bug fixed
 * @version 1.1
 * Because the bug of chrome V 46.0.2490.86, I have to render the text after animation, so guilty.
 * I have reported this issue to google, hoping it would be sovled in the new version.
 */

(function($) {
    $.fn.waterbubble = function(options) {
            var config = $.extend({
                radius: 100,
                lineWidth: undefined,
                data: 0.5,
                waterColor: 'rgba(25, 139, 201, 1)',
                textColor: 'rgba(06, 85, 128, 0.8)',
                font: '',
                wave: true,
                txt: undefined,
                animation: true
            }, options);

            var canvas = this[0];
            config.lineWidth = config.lineWidth ? config.lineWidth : config.radius/24;

            var waterbubble = new Waterbubble(canvas, config);

            return this;
        }
        

        function Waterbubble (canvas, config) {
            this.refresh(canvas, config);
        }

        Waterbubble.prototype = {
            refresh: function (canvas, config) {
                canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
                this._init(canvas, config)
            },

            _init: function (canvas, config){
                var radius = config.radius;
                var lineWidth = config.lineWidth;

                canvas.width = radius*2 + lineWidth;
                canvas.height = radius*2 + lineWidth;

                this._buildShape(canvas, config);
            },

            _buildShape: function (canvas, config) {

                var ctx = canvas.getContext('2d');

                var gap = config.lineWidth*2;
                //raidus of water
                var r = config.radius - gap;
                var data = config.data;
                var lineWidth = config.lineWidth

                var waterColor = config.waterColor;
                var textColor = config.textColor;
                var font = config.font;

                var wave = config.wave

                // //the center of circle
                var x = config.radius + lineWidth/2;
                var y = config.radius + lineWidth/2;

                ctx.beginPath();
                
                ctx.arc(x, y, config.radius, 0, Math.PI*2);
                ctx.lineWidth = lineWidth;
                ctx.strokeStyle = waterColor;
                ctx.stroke();
                if (typeof config.txt == 'string'){
                    this._drawText(ctx, textColor, font, config.radius, data, x, y, config.txt);
                }
                //if config animation true
                if (config.animation) {
                    this._animate(ctx, r, data, lineWidth, waterColor, x, y, wave, config.txt, textColor, font)
                } else {
                    this._fillWater(ctx, r, data, lineWidth, waterColor, x, y, wave);
                }

                return;
            },

            _fillWater: function (ctx, r, data, lineWidth, waterColor, x, y, wave) {
                // this.refresh(canvas, config);
                ctx.beginPath();

                ctx.globalCompositeOperation = 'destination-over';

                //start co-ordinates
                var sy = r*2*(1 - data) + (y - r);
                var sx = x - Math.sqrt((r)*(r) - (y - sy)*(y - sy));
                //middle co-ordinates
                var mx = x;
                var my = sy;
                //end co-ordinates
                var ex = 2*mx - sx;
                var ey = sy;

                var extent; //extent

                if (data > 0.9 || data < 0.1 || !wave) {
                    extent = sy
                } else{
                    extent = sy - (mx -sx)/4
                }

                ctx.beginPath();
                
                ctx.moveTo(sx, sy)
                ctx.quadraticCurveTo((sx + mx)/2, extent, mx, my);
                ctx.quadraticCurveTo((mx + ex)/2, 2*sy - extent, ex, ey);

                var startAngle = -Math.asin((x - sy)/r)
                var endAngle = Math.PI - startAngle;

                ctx.arc(x, y, r, startAngle, endAngle, false)

                ctx.fillStyle = waterColor;
                ctx.fill()
            },

            _drawText: function (ctx, textColor, font, radius, data, x, y, txt) {
                ctx.globalCompositeOperation = 'source-over';

                var size = font ? font.replace( /\D+/g, '') : 0.4*radius;
                ctx.font = font ? font : 'bold ' + size + 'px Microsoft Yahei';

                txt = txt.length ? txt : data*100 + '%'

                var sy = y + size/2;
                var sx = x - ctx.measureText(txt).width/2

                ctx.fillStyle = textColor;
                ctx.fillText(txt, sx, sy)
            },

            _animate: function (ctx, r, data, lineWidth, waterColor, x, y, wave, txt, textColor, font) {
                var datanow = {
                    value: 0
                };
                var requestAnimationFrame = window.requestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (func) {
                    setTimeout(func, 16);
                };
                var self = this;
                var update = function () {
                    if (datanow.value < data) {
                        datanow.value += (data + 0.05 - datanow.value)/15
                        self._runing = true;
                    } else {
                        self._runing = false;
                    }
                }
                var step = function () {
                    self._fillWater(ctx, r, datanow.value, lineWidth, waterColor, x, y, wave);
                    update();
                    if (self._runing) {
                        requestAnimationFrame(step);
                    }
                }
                step(ctx, r, datanow, lineWidth, waterColor, x, y, wave, txt)
            }
        }
}(jQuery));