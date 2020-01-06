$(document).ready(function () {
    $('.inner').hover(function (e) {
        animate(e.target.id);
    })
});

function animate (id) {
    // Get the correct card
    let container = $(".container")[id];
    let inner = $(".inner")[id];

    let containers = $(".container");
    let inners = $(".inner");
    console.log('Containers: ', containers);
  
    // Mouse stuff
    let mouse = {
      _x: 0,
      _y: 0,
      x: 0,
      y: 0,
      updatePosition: function (event) {
        let e = event || window.event;
        this.x = e.clientX - this._x;
        this.y = (e.clientY - this._y) * -1;
      },
      setOrigin: function (e) {
        this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
        this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
      },
      show: function () {
        return "(" + this.x + ", " + this.y + ")";
      }
    };
  
    // Track the mouse position relative to the center of the container.
    mouse.setOrigin(container);
    
    let counter = 0;
    let updateRate = 10;
    let isTimeToUpdate = function () {
      return counter++ % updateRate === 0;
    };
  
  
    let onMouseEnterHandler = function (event) {
      update(event);
    };
  
    let onMouseLeaveHandler = function () {
      inner.style = "";
    };
  
    let onMouseMoveHandler = function (event) {
      if (isTimeToUpdate()) {
        update(event);
      }
    };
    
    let update = function (event) {
      mouse.updatePosition(event);
      updateTransformStyle(
        (mouse.y / inner.offsetHeight / 2).toFixed(2),
        (mouse.x / inner.offsetWidth / 2).toFixed(2)
      );
    };
  
    let updateTransformStyle = function (x, y) {
      let style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
      inner.style.transform = style;
      inner.style.webkitTransform = style;
      inner.style.mozTransform = style;
      inner.style.msTransform = style;
      inner.style.oTransform = style;
    };
    
    container.onmouseenter = onMouseEnterHandler;
    container.onmouseleave = onMouseLeaveHandler;
    container.onmousemove = onMouseMoveHandler;
  }