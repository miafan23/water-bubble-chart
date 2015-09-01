#water-bubble-chart
A jQuery plugin to make water bubble chart (liquid bubble chart).  
It can used in you resume to describe the degree of your master skills or react the completion of something you are doing.  
You can visit [this] for more information and watch a demo. 
  
这是一个水球图表， 可以用来反应你某项技能的掌握情况， 或者你正在做的某件事的完成情况。

#Usage
To use water bubble chart, the following files should always be included.

`<script src="http://code.jquery.com/jquery-1.10.2.min.js" type="text/javascript"></script>
<script src="waterbubble.js" type="text/javascript"></script>`

###html code
`<canvas id="waterbubble"></canvas>`
###js code  
You can use the default settings like this: 
`$('waterbubble').waterbubble();`

Or you can set following options by yourself
`$('waterbubble').waterbubble({
	radius: 100,
    lineWidth: 5,
    data: 0.5,
    waterColor: 'rgba(25, 139, 201, 1)',
    textColor: 'rgba(06, 85, 128, 0.8)',
    txt: 'JavaScript'
    font: 'bold 50px "Microsoft YaHei"',
    wave: true,
    animation: false
})`

* radius: The radius of your waterbubble and you don't need to set height or width on your canvas anymore.
* lineWidth: The thickness of your water bubble's shell. The value of it will equal radius/25 if you don't set this option.
* textColor: The color of The text. You'd better set a value of alpha of TextColor, because I think it will be more beautiful :).
* txt: The text you want to show in this chart. There will be no text if you don't set it. If you set it as `txt: ''` then the chart will show the percentage of the data.
* font: The style of text. Default size is 40% of radius.
* wave: There will be a waveform on the water if it values true otherwise it will be plane. The default value is true.
* animation: Default value is true.
