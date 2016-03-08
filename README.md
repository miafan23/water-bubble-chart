#water-bubble-chart

This is a jQuery plugin to render specific data into water bubble chart (or liquid bubble chart).  
For instance, it can used in your resume to describe the extent to which you master some skills, or to reflect as a progress bar for completing a specific task.
You can visit [this](http://fiona23.github.io/water-bubble-chart/) for more information, with a demo included as well.   

  
这是一个水球图表， 可以用来反应你某项技能的掌握情况， 或者你正在做的某件事的完成情况。
查看[demo](http://fiona23.github.io/water-bubble-chart/)

![waterbubble](js.png)

#Update
* 2016.3 
chrome bug fixed. 
* 2015.12 
Because of the [bug](http://stackoverflow.com/questions/34012767/why-there-is-a-white-line-on-the-edge-while-using-canvas-destination-over) of newest version of chrome V 46.0.2490.86, I have to render the text after animation.  
I have reported this issue to google, hoping it would be sovled in the new version.

#Usage
To implement the water bubble charts, the following files should always be included.

```html
<script src="http://code.jquery.com/jquery-1.10.2.min.js" type="text/javascript"></script>
<script src="waterbubble.js" type="text/javascript"></script>
```

###html code
```html
<canvas id="waterbubble"></canvas>
```
###js code  
You can use the default settings like this: 
```javascript
$('#waterbubble').waterbubble();
```

Or you can set following options by yourself
```javascript
$('#waterbubble').waterbubble({
	radius: 100,
    lineWidth: 5,
    data: 0.5,
    waterColor: 'rgba(25, 139, 201, 1)',
    textColor: 'rgba(06, 85, 128, 0.8)',
    txt: 'JavaScript',
    font: 'bold 30px "Microsoft YaHei"',
    wave: true,
    animation: false
})
```
There are 9 optional parameters to be set with water-bubble-chart, none of which is mandatory.  
* radius: The radius of your waterbubble. Once set, there is no need to further set height or width on your canvas.
* lineWidth: The thickness of your water bubble's shell. The value of it equals to radius/25, unless you specify it to other values.
* textColor: The color of the text. You'd better set the value of alpha of textColor, because I think it should be more beautiful :).
* txt: The text content you'd like to display in the chart. There will be no text if you don't set it. If set as `txt: ''` then the chart will show the percentage data.
* font: The style of text. Default size is 40% of radius.
* wave: This indicates whether a wave shape should be shown in the chart, if set to be false, a plane is shown instead of the wave. The default value is true.
* animation: Default value is true.
