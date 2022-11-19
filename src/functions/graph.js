function Graph(value, width, height, startx1, startx2, starty1, starty2) {
    var autoRange=(starty1===undefined || starty1=="auto");
  
    //Properties
    if (typeof(value)=="string") {
      this.expression = new Segment(value);
    } else {
      this.expression = value;
    }
    var points = [];
    var canvas = document.createElement("canvas");
    canvas.width=width || 400;
    canvas.height=height || 400;
    var graphCanvas = document.createElement("canvas");
    graphCanvas.width = canvas.width;
    graphCanvas.height = canvas.height;
    var min;
    var max;
    var x1 = (startx1===undefined)?-10:startx1;
    var x2 = (startx2===undefined)?10:startx2;
    var y1 = (starty1===undefined)?-10:starty1;
    var y2 = (starty2===undefined)?10:starty2;
    var startMouse = new Point(0, 0);
    var mousePos = new Point(0, 0);
    var stage=0;
    var graphStage=0;
    var img=0;
    var timer=0;
    var distX=0;
    var distY=0;
  
    //Gets minimum y value in the set of points
    this.getMin = function() {
      if (min===undefined) {
        if (points.length>0) {
          var i=0;
          while (isNaN(points[i].y) || points[i].y === undefined || Math.abs(points[i].y) == Infinity) i++;
          var _min = points[i].y;
          for (i++; i<points.length; i++) {
            if (points[i].y<_min) _min = points[i].y;
          }
          min=_min;
          return min;
        } else {
          return 0;
        }
      } else {
        return min;
      }
    };
  
    //Gets maximum y value in the set of points
    this.getMax = function() {
      if (max===undefined) {
        if (points.length>0) {
          var i=0;
          while (isNaN(points[i].y) || points[i].y === undefined || Math.abs(points[i].y) == Infinity) i++;
          var _max = points[i].y;
          for (i++; i<points.length; i++) {
            if (points[i].y>_max) _max = points[i].y;
          }
          max=_max;
          return max;
        } else {
          return 0;
        }
      } else {
        return max;
      }
    };
  
    //Updates the points and graph
    this.update = function() {
      var accuracy = (x2-x1)/canvas.width;
      points = [];
      for (var i=x1; i<=x2; i+=accuracy) {
        points.push(new Point(i, this.expression.result(i)));
        if ((points[points.length-1].y!==0 && !points[points.length-1].y) || Math.abs(points[points.length-1].y)>10000) {
          points[points.length-1].y=undefined;
        }
      }
      max=undefined;
      min=undefined;
  
      if (autoRange) {
        if (this.getMax()-this.getMin()>100000) {
          y1=-100;
          y2=100;
        } else {
          y1=this.getMin()-5;
          y2=this.getMax()+5;
        }
        autoRange = false;
      }
  
      this.redraw();
    };
  
    var drawAxes = function(_x1, _x2, _y1, _y2) {
      stage.strokeStyle="#bdc3c7";
      stage.fillStyle="#bdc3c7";
      var limit=0;
      var i=0;
  
      //Draw the y axis if it is in the view
      if (0>=_x1-30 && 0<=_x2+30) {
        stage.lineWidth=2;
        stage.beginPath();
        stage.moveTo(canvas.width/2-(((_x2+_x1)/2)/(_x2-_x1))*canvas.width, 0);
        stage.lineTo(canvas.width/2-(((_x2+_x1)/2)/(_x2-_x1))*canvas.width, canvas.height);
        stage.closePath();
        stage.stroke();
        stage.textAlign = "right";
        stage.textBaseline="middle";
  
        //Draw ticks and numbers on x axis
        stage.lineWidth=1;
        limit = (Math.abs(_y2)>Math.abs(_y1))?Math.abs(_y2):Math.abs(_y1);
        for (i=0; i<=limit; i+=Math.pow(10, Math.floor(Math.log(_y2-_y1) / Math.LN10))/2) {
          if (i===0) continue;
          if (i<=_y2+50) {
            stage.beginPath();
            stage.moveTo(canvas.width/2-(((_x2+_x1)/2)/(_x2-_x1))*canvas.width-5, canvas.height-((i-_y1)/(_y2-_y1))*canvas.height);
            stage.lineTo(canvas.width/2-(((_x2+_x1)/2)/(_x2-_x1))*canvas.width+5, canvas.height-((i-_y1)/(_y2-_y1))*canvas.height);
            stage.closePath();
            stage.stroke();
            stage.fillText(""+(Math.round(i*100)/100), canvas.width/2-(((_x2+_x1)/2)/(_x2-_x1))*canvas.width-8, canvas.height-((i-_y1)/(_y2-_y1))*canvas.height);
          }
  
          if (i>=_y1-50) {
            stage.beginPath();
            stage.moveTo(canvas.width/2-(((_x2+_x1)/2)/(_x2-_x1))*canvas.width-5, canvas.height-((-i-_y1)/(_y2-_y1))*canvas.height);
            stage.lineTo(canvas.width/2-(((_x2+_x1)/2)/(_x2-_x1))*canvas.width+5, canvas.height-((-i-_y1)/(_y2-_y1))*canvas.height);
            stage.closePath();
            stage.stroke();
            stage.fillText(""+(Math.round(-i*100)/100), canvas.width/2-(((_x2+_x1)/2)/(_x2-_x1))*canvas.width-8, canvas.height-((-i-_y1)/(_y2-_y1))*canvas.height);
          }
        }
      }
  
      //Draw the x axis if it is in the view
      if (0>=_y1-50 && 0<=_y2+50) {
        stage.lineWidth=2;
        stage.beginPath();
        stage.moveTo(0, canvas.height/2+(((_y2+_y1)/2)/(_y2-_y1))*canvas.height);
        stage.lineTo(canvas.width, canvas.height/2+(((_y2+_y1)/2)/(_y2-_y1))*canvas.height);
        stage.closePath();
        stage.stroke();
        stage.textAlign = "center";
        stage.textBaseline="top";
  
        //Draw ticks and numbers on y axis
        stage.lineWidth=1;
        limit = (Math.abs(_x2)>Math.abs(_x1))?Math.abs(_x2):Math.abs(_x1);
        for (i=0; i<=limit; i+=Math.pow(10, Math.floor(Math.log(_x2-_x1) / Math.LN10))/2) {
          if (i===0) continue;
          if (i<=_x2+50) {
            stage.beginPath();
            stage.moveTo(((i-_x1)/(_x2-_x1))*canvas.width, canvas.height/2+(((_y2+_y1)/2)/(_y2-_y1))*canvas.height-5);
            stage.lineTo(((i-_x1)/(_x2-_x1))*canvas.width, canvas.height/2+(((_y2+_y1)/2)/(_y2-_y1))*canvas.height+5);
            stage.closePath();
            stage.stroke();
            stage.fillText(""+(Math.round(i*100)/100), ((i-_x1)/(_x2-_x1))*canvas.width, canvas.height/2+(((_y2+_y1)/2)/(_y2-_y1))*canvas.height+8);
          }
  
          if (i>=_x1-50) {
            stage.beginPath();
            stage.moveTo(((-i-_x1)/(_x2-_x1))*canvas.width, canvas.height/2+(((_y2+_y1)/2)/(_y2-_y1))*canvas.height-5);
            stage.lineTo(((-i-_x1)/(_x2-_x1))*canvas.width, canvas.height/2+(((_y2+_y1)/2)/(_y2-_y1))*canvas.height+5);
            stage.closePath();
            stage.stroke();
            stage.fillText(""+(Math.round(-i*100)/100), ((-i-_x1)/(_x2-_x1))*canvas.width, canvas.height/2+(((_y2+_y1)/2)/(_y2-_y1))*canvas.height+8);
          }
        }
      }
    }.bind(this);
  
    //Updates the canvas
    this.redraw = function() {
      if (points.length>1) {
        stage.fillStyle = "#FFFFFF";
        stage.fillRect(0, 0, canvas.width, canvas.height);
        graphStage.clearRect(0, 0, canvas.width, canvas.height);
        graphStage.lineCap="round";
  
        var offsetY = -y1;
  
        drawAxes(x1, x2, y1, y2);
  
        //Draw all the points
        graphStage.strokeStyle="#2980b9";
        graphStage.lineWidth=1;
        graphStage.beginPath();
  
        //Find the first point that exists
        var i=0;
        while (isNaN(points[i].y) || points[i].y === undefined || Math.abs(points[i].y) == Infinity) i++;
        graphStage.moveTo((i/points.length)*canvas.width, canvas.height-((points[i].y+offsetY)/(y2-y1))*canvas.height);
        for (i++; i<points.length; i++) {
          if (Math.abs((canvas.height-((points[i].y+offsetY)/(y2-y1))*canvas.height)-(canvas.height-((points[i-1].y+offsetY)/(y2-y1))*canvas.height))<=canvas.height && points[i].y !== undefined && Math.abs(points[i].y) != Infinity && !isNaN(points[i].y)) {
            graphStage.lineTo((i/(points.length-1))*canvas.width, canvas.height-((points[i].y+offsetY)/(y2-y1))*canvas.height);
          }
          if (points[i].y !== undefined && Math.abs(points[i].y) != Infinity && !isNaN(points[i].y)) {
            graphStage.moveTo((i/(points.length-1))*canvas.width, canvas.height-((points[i].y+offsetY)/(y2-y1))*canvas.height);
          } else {
            graphStage.moveTo((i/(points.length-1))*canvas.width, canvas.height-((0+offsetY)/(y2-y1))*canvas.height);
          }
        }
        graphStage.closePath();
        graphStage.stroke();
  
        img = graphStage.getImageData(0, 0, canvas.width, canvas.height);
        stage.drawImage(graphCanvas, 0, 0);
      } else {
        XCalc.log("Not enough points to graph.");
      }
    };
  
    //Updates the view of the graph
    this.setRange = function(_x1, _x2, _y1, _y2) {
      x1=_x1;
      x2=_x2;
      y1=_y1;
      y2=_y2;
      if (_y1=="auto" || _y1===undefined) autoRange=true;
      this.update();
    };
  
    //Gets x and y of the mouse relative to the top left of the canvas
    var getMousePos = function(evt) {
        var rect = canvas.getBoundingClientRect();
        var root = document.documentElement;
        
        // return relative mouse position
        var mouseX = evt.clientX - rect.left - root.scrollLeft;
        var mouseY = evt.clientY - rect.top - root.scrollTop;
        
        return new Point(mouseX, mouseY);
    }.bind(this);
  
    //Starts panning
    var startDrag = function(event) {
      document.addEventListener("mousemove", dragMouse, false);
      document.addEventListener("mouseup", endDrag, false);
      document.documentElement.style["-moz-user-select"] = "none";
      document.documentElement.style["-webkit-user-select"] = "none";
      document.documentElement.style["-khtml-user-select"] = "none";
      document.documentElement.style["user-select"] = "none";
      canvas.removeEventListener("mouseover", startMouseOver, false);
      canvas.removeEventListener("mousemove", moveMouse, false);
      startMouse = getMousePos(event);
    }.bind(this);
  
    //Recalculate and redraws the view based on the mouse position
    var redrawLine = function() {
      var offsetX = ((mousePos.x-startMouse.x)/canvas.width)*(x2-x1);
      var offsetY = ((mousePos.y-startMouse.y)/canvas.height)*(y2-y1);
      this.setRange(x1-offsetX, x2-offsetX, y1+offsetY, y2+offsetY);
      startMouse = mousePos;
    }.bind(this);
  
    var dragMouse = function(event) {
      stage.fillStyle = "#FFFFFF";
      stage.fillRect(0, 0, canvas.width, canvas.height);
      mousePos = getMousePos(event);
      var newx1 = x1-((mousePos.x-startMouse.x)/canvas.width)*(x2-x1);
      var newx2 = x2-((mousePos.x-startMouse.x)/canvas.width)*(x2-x1);
      var newy1 = y1+((mousePos.y-startMouse.y)/canvas.height)*(y2-y1);
      var newy2 = y2+((mousePos.y-startMouse.y)/canvas.height)*(y2-y1);
  
      //If it's been dragged far enough, recalculate the line
      if (Math.abs(mousePos.x-startMouse.x)>canvas.width*0.2 || Math.abs(mousePos.y-startMouse.y)>canvas.height*0.2) {
        redrawLine();
  
      //Otherwise, move around the drawing we already have
      } else {
        drawAxes(newx1, newx2, newy1, newy2);
        stage.drawImage(graphCanvas, mousePos.x-startMouse.x, mousePos.y-startMouse.y);
      }
  
      if (event.preventDefault) event.preventDefault();
      return false;
      
    }.bind(this);
  
    //Stops dragging, resets listeners
    var endDrag = function(event) {
      document.removeEventListener("mousemove", dragMouse, false);
      document.removeEventListener("mouseup", endDrag, false);
      document.documentElement.style["-moz-user-select"] = "auto";
      document.documentElement.style["-webkit-user-select"] = "auto";
      document.documentElement.style["-khtml-user-select"] = "auto";
      document.documentElement.style["user-select"] = "auto";
      canvas.addEventListener("mouseover", startMouseOver, false);
      canvas.addEventListener("mousemove", moveMouse, false);
      mousePos = getMousePos(event);
  
      var offsetX = ((mousePos.x-startMouse.x)/canvas.width)*(x2-x1);
      var offsetY = ((mousePos.y-startMouse.y)/canvas.height)*(y2-y1);
      this.setRange(x1-offsetX, x2-offsetX, y1+offsetY, y2+offsetY);
    }.bind(this);
  
    var startMouseOver = function(event) {
      canvas.addEventListener("mousemove", moveMouse, false);
      canvas.addEventListener("mouseout", endMouseOver, false);
    }.bind(this);
  
    //Draws coordinates over point
    var moveMouse = function(event) {
      if (distX===0 && distY===0) {
        stage.fillStyle = "#FFFFFF";
        stage.fillRect(0, 0, canvas.width, canvas.height);
        drawAxes(x1, x2, y1, y2);
        stage.drawImage(graphCanvas, 0, 0);
        mousePos = getMousePos(event);
        if (mousePos.x<0) mousePos.x=0;
        if (mousePos.y<0) mousePos.y=0;
        var offsetY = -y1;
  
        //Check if the function exists at that x value
        if (points[Math.round(mousePos.x/canvas.width*points.length)].y===0 || points[Math.round(mousePos.x/canvas.width*points.length)].y) {
  
          //Draw the coordinate
          stage.fillStyle="#2980b9";
          stage.beginPath();
          stage.arc(mousePos.x, canvas.height-((points[Math.round(mousePos.x/canvas.width*points.length)].y+offsetY)/(y2-y1))*canvas.height, 4, 0, 2*Math.PI);
          stage.closePath();
          stage.fill();
          stage.fillStyle="#000";
          stage.strokeStyle="#FFF";
          stage.lineWidth=4;
          stage.textBaseline="alphabetic";
          var txt="(" + (Math.round(points[Math.round(mousePos.x/canvas.width*points.length)].x*100)/100).toFixed(2) + ", " + (Math.round(points[Math.round(mousePos.x/canvas.width*points.length)].y*100)/100).toFixed(2) + ")";
  
          if (mousePos.x<stage.measureText(txt).width/2+2) {
            stage.textAlign = "left";
          } else if (mousePos.x>canvas.width-stage.measureText(txt).width/2-2) {
            stage.textAlign = "right";
          } else {
            stage.textAlign = "center";
          }
          stage.strokeText(txt, mousePos.x, -10+canvas.height-((points[Math.round(mousePos.x/canvas.width*points.length)].y+offsetY)/(y2-y1))*canvas.height);
          stage.fillText(txt, mousePos.x, -10+canvas.height-((points[Math.round(mousePos.x/canvas.width*points.length)].y+offsetY)/(y2-y1))*canvas.height);
        }
      }
    }.bind(this);
  
    var endMouseOver = function(event) {
      canvas.removeEventListener("mousemove", moveMouse, false);
      canvas.removeEventListener("mouseout", endMouseOver, false);
      stage.fillStyle = "#FFFFFF";
      stage.fillRect(0, 0, canvas.width, canvas.height);
      drawAxes(x1, x2, y1, y2);
      stage.drawImage(graphCanvas, 0, 0);
    }.bind(this);
  
    //Zooms based on scroll wheel
    var scrollZoom = function(event) {
      var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
      distX += delta*(x2-2*distX-x1)/25;
      distY += delta*(y2-2*distY-y1)/25;
      stage.fillStyle = "#FFFFFF";
      stage.fillRect(0, 0, canvas.width, canvas.height);
      drawAxes(x1 + distX, x2 - distX, y1 + distY, y2 - distY);
      stage.drawImage(graphCanvas, canvas.width*(1-((x2-x1)/(x2-2*distX-x1)))/2, canvas.height*(1-((y2-y1)/(y2-2*distY-y1)))/2, canvas.width*((x2-x1)/(x2-2*distX-x1)), canvas.height*((y2-y1)/(y2-2*distY-y1)));
      if (event.preventDefault) event.preventDefault();
      clearTimeout(timer);
      timer = setTimeout(updateZoom, 50);
      return false;
    }.bind(this);
  
    var updateZoom = function() {
      stage.fillStyle = "#FFFFFF";
      stage.fillRect(0, 0, canvas.width, canvas.height);
      this.setRange(x1 + distX, x2 - distX, y1 + distY, y2 - distY);
      distX=0;
      distY=0;
      clearTimeout(timer);
    }.bind(this);
  
    //Returns the canvas element
    this.getCanvas = function() {
      return canvas;
    };
  
    this.getX1 = function() {
      return x1;
    };
  
    this.getX2 = function() {
      return x2;
    };
  
    this.getY1 = function() {
      return y1;
    };
  
    this.getY2= function() {
      return y2;
    };
  
    //If canvas drawing is supported
    if (canvas.getContext) {
  
      //Get the canvas context to draw onto
      stage = canvas.getContext("2d");
      stage.font = "12px sans-serif";
      canvas.style.backgroundColor="#FFF";
  
      graphStage = graphCanvas.getContext("2d");
  
      //Make points
      this.update();
  
      canvas.addEventListener("mousedown", startDrag, false);
      canvas.addEventListener("mouseover", startMouseOver, false);
      canvas.addEventListener("mousewheel", scrollZoom, false);
      canvas.addEventListener("DOMMouseScroll", scrollZoom, false);
    } else {
      XCalc.log("Canvas not supported in this browser.");
      canvas = document.createElement("div");
      canvas.innerHTML="Canvas is not supported in this browser.";
    }
  }