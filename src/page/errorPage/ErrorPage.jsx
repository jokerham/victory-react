import { useEffect } from 'react';
import './ErrorPage.css';

export default function ErrorPage(props) {
  const messages = {
    '401': {title:'Permission Denied', message:'권한이 제한되어 있습니다.'},
    '404': {title:'Page Not Found',message:'페이지를 찾지 못하였습니다.'},
  };

  const statusCode = props.statusCode;
  const title = messages[statusCode].title;
  const message = messages[statusCode].message;

  useEffect(() => {
    var c = document.getElementById("c");
    var ctx = c.getContext("2d");

    //making the canvas full screen
    c.height = document.documentElement.scrollHeight; // window.innerHeight;
    c.width = window.innerWidth;

    //chinese characters - taken from the unicode charset
    //var chinese = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
    var chinese = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    //converting the string into an array of single characters
    chinese = chinese.split("");

    var fontSizeSm = 10;
    var fontSizeLg = 16;
    var columnsSm = c.width/fontSizeSm; //number of columns for the rain
    var columnsLg = c.width/fontSizeLg; //number of columns for the rain
    //an array of drops - one per column
    var dropsSm = [];
    var dropsLg = [];
    //x below is the x coordinate
    //1 = y co-ordinate of the drop(same for every drop initially)
    for(var x = 0; x < columnsSm; x++)
      dropsSm[x] = 1000; 
    for(x = 0; x < columnsLg; x++)
      dropsLg[x] = 1000; 

    //drawing the characters
    function draw()
    {
      //Black BG for the canvas
      //translucent BG to show trail
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, c.width, c.height);
      
      ctx.fillStyle = "#0F0"; //green text
      ctx.font = fontSizeSm + "px arial";
      //looping over drops
      for(var i = 0; i < dropsSm.length; i++)
      {
        //a random chinese character to print
        var text = chinese[Math.floor(Math.random()*chinese.length)];
        //x = i*font_size, y = value of drops[i]*font_size
        ctx.fillText(text, i*fontSizeSm, dropsSm[i]*fontSizeSm);
        
        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the drops scattered on the Y axis
        if(dropsSm[i]*fontSizeSm > c.height && Math.random() > 0.975)
          dropsSm[i] = 0;
        
        //incrementing Y coordinate
        dropsSm[i]++;
      }

      ctx.font = fontSizeLg + "px arial";
      //looping over drops
      for(i = 0; i < dropsLg.length; i++)
      {
        //a random chinese character to print
        text = chinese[Math.floor(Math.random()*chinese.length)];
        //x = i*font_size, y = value of drops[i]*font_size
        ctx.fillText(text, i*fontSizeLg, dropsLg[i]*fontSizeLg);
        
        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the drops scattered on the Y axis
        if(dropsLg[i]*fontSizeLg > c.height && Math.random() > 0.975)
        dropsLg[i] = 0;
        
        //incrementing Y coordinate
        dropsLg[i]++;
      }
    }

    setInterval(draw, 33);

  })

  return (
    <>
      <div id='error-page'>
        <div id='error-inner'>
          <div className='box-404'>{statusCode}</div>
          <div className='box-message'>
            <h1>{title}</h1>
            <p>{message}</p>
            <p>
              <a href='/' title='HOME'>홈페이지 돌아가기</a> ?
            </p>
            <div id='search-box'>
              <form action='/search' id='cse-search-box' method='get'>
                <input id='search-text' name='q' type='text' value='' />
                <button id='search-button' type='submit' />
              </form>
            </div>
          </div>
        </div>
      </div>
      <canvas id="c"></canvas>
    </>
  );
}

// Reference
// - https://stackoverflow.com/questions/71247020/how-to-send-params-in-react-js-using-usenavigate-in-react-router-dom-version-6
// - https://jinyisland.kr/post/react-props/
// - https://codepen.io/seocips/pen/GpGGdL