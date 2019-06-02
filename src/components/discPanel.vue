<template>
<div class="discPanel">
  <div class="gradient-background">

    <div class="turntable">
      <div class="disc spin">
        <div class="disc-reflection-left">
        </div>
        <div class="disc-reflection-right">
        </div>
        <div class="disc-groove">
        </div>
        <div class="label ">
          <div class="disc-font disc-title">
          </div>
          <div class="disc-font disc-group">
          </div>
        </div>
      </div>

      <div class="tone-arm oscillating">
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'discPanel',
}
</script>

<style>
.discPanel {
  position: fixed;
  bottom: 360px;
  z-index: 0;
}

.gradient-background {
  margin: auto;
  position: absolute;
}

.turntable {}

.disc {
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 100vw;
  background: #fff271;
  border-radius: 50%;
}

.disc::after {
  content: "";
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 50%;
  width: 8px;
  height: 8px;
  background: rgba(#fce715, 0);
  border: solid 1px #FDE816;
}

.disc-reflection-left,
.disc-reflection-right {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: absolute;
  background-color: #fff698;
}

.disc-reflection-left {
  clip-path: polygon(50% 50%, 0 75%, 10% 100%);
}

.disc-reflection-right {
  clip-path: polygon(90% 0, 50% 50%, 100% 25%);
}

.disc-groove {
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  border: solid 2px #FDE816;
}

.disc-groove:before,
.disc-groove:after {
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 50%;
  border: solid 2px #FDE816;
}

.disc-groove:before {
  content: "";
  width: 180px;
  height: 180px;
}

.disc-groove:after {
  content: "";
  width: 160px;
  height: 160px;
}

.label {
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  background: #ffef50;
}

.label::before,
.label::after {
  content: "";
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 50%;
}

.label::before {
  width: 70px;
  height: 70px;
  background: #fff69a;
  border: solid 1px #FDE816;
}

.label::after {
  width: 65px;
  height: 32.5px;
  bottom: 32.5px;
  background: #FDE816;
  border-radius: 32.5px 32.5px 0 0;
}

.disc-font {
  font-family: Roboto, Arial, Sans-serif;
  font-size: 0.5em;
  text-align: center;
  z-index: 10;
  position: absolute;
  color: #fff8b1;
}

.disc-title {
  margin: 20px;
}

.disc-group {
  top: 50px;
  left: 10px;
  width: 60px;
}

.tone-arm {
  position: absolute;
  margin: auto;
  top: 0;
  left: 280px;
  bottom: 220px;
  right: 0;
  width: 20px;
  height: 40px;
  background: #FDE816;
  border-radius: 10%;
  transform: rotate(20deg);
}

.tone-arm:before,
.tone-arm:after {
  content: "";
  position: absolute;
  margin: auto;
  background: #FDE816;
}

.tone-arm:before {
  left: 0;
  right: 1px;
  top: 40px;
  width: 7px;
  height: 120px;
}

.tone-arm:after {
  left: -2px;
  right: 0;
  bottom: 0;
  top: 300px;
  width: 20px;
  height: 30px;
  border-radius: 20%;
}

.spin {
  animation: spin 4s linear infinite;
}

.oscillating {
  animation: oscillating 2s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes oscillating {
  0% {
    transform: rotate(20deg);
  }

  30% {
    transform: rotate(20.5deg);
  }

  60% {
    transform: rotate(20deg);
  }

  90% {
    transform: rotate(20.5deg);
  }

  100% {
    transform: rotate(20deg);
  }
}
</style>
