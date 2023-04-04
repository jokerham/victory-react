@import url('https://rsms.me/inter/inter-ui.css');
::selection {
  background: #2D2F36;
}
::-webkit-selection {
  background: #2D2F36;
}
::-moz-selection {
  background: #2D2F36;
}
.background {
  background: white;
  font-family: 'Inter UI', sans-serif;
  margin: 0;
  padding: 0px;
  background-image: url('boxing.svg');
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
}
.page {
  background: #e2e2e5bb;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: absolute;
  place-content: center;
  width: 100%;
}
@media (max-width: 767px) {
  .page {
    height: auto;
    margin-bottom: 20px;
    padding-bottom: 20px;
  }
}
.container {
  display: flex;
  height: 320px;
  margin: 0 auto;
  width: 640px;
  opacity: 1;
}
@media (max-width: 767px) {
  .container {
    flex-direction: column;
    height: 630px;
    width: 320px;
  }
}
.left {
  background: white;
  height: calc(100% - 40px);
  top: 20px;
  position: relative;
  width: 50%;
  opacity: 1.0;
}
@media (max-width: 767px) {
  .left {
    height: 100%;
    left: 20px;
    width: calc(100% - 40px);
    max-height: 270px;
  }
}
.login {
  font-size: 50px;
  font-weight: 900;
  margin: 50px 40px 40px;
}
.eula {
  color: #999;
  font-size: 14px;
  line-height: 1.5;
  margin: 40px;
}
.right {
  background: #474A59;
  box-shadow: 0px 0px 40px 16px rgba(0,0,0,0.22);
  color: #F1F1F2;
  position: relative;
  width: 50%;
  opacity: 1.0;
}
@media (max-width: 767px) {
  .right {
    flex-shrink: 0;
    height: 100%;
    width: 100%;
    max-height: 350px;
  }
}
.sign-in-svg {
  position: absolute;
  width: 320px;
}
.sign-in-svg > path {
  fill: none;
  stroke: url(#linearGradient);;
  stroke-width: 4;
  stroke-dasharray: 240 1386;
}
.form {
  margin: 40px;
  position: absolute;
}
label {
  color:  #c2c2c5;
  display: block;
  font-size: 14px;
  height: 16px;
  margin-top: 20px;
  margin-bottom: 5px;
}
input {
  background: transparent;
  border: 0;
  color: #f2f2f2;
  font-size: 20px;
  height: 30px;
  line-height: 30px;
  outline: none !important;
  width: 100%;
}
input::-moz-focus-inner { 
  border: 0; 
}
#submit {
  color: #707075;
  margin-top: 40px;
  transition: color 300ms;
}
#submit:focus {
  color: #f2f2f2;
}
#submit:focus-visible {
  outline: none;
}
#submit:active {
  color: #d0d0d2;
}
/* https://itnext.io/fixing-focus-for-safari-b5916fef1064 */