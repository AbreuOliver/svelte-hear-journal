<script>
  import { onMount } from "svelte";

  let currentTrack = null;
  let trackLoaded = false;
  let audio = null;

  let elements = {
    playerButtons: {
      largeToggleBtn: null,
      nextTrackBtn: null,
      previousTrackBtn: null,
      smallToggleBtn: null,
    },
    progressBar: null,
    playListRows: null,
    trackInfoBox: null,
  };

  let playAHead = false;
  let progressCounter = 0;
  let progressBarIndicator = null;

  function bufferProgress() {
    const bufferedTime = (audio.buffered.end(0) * 100) / audio.duration;
    const progressBuffer =
      elements.progressBar.children[0].children[0].children[0];

    progressBuffer.style.width = `${bufferedTime}%`;
  }

  function getXY(event) {
    const containerX = elements.progressBar.offsetLeft;
    const containerY = elements.progressBar.offsetTop;

    let coords = {
      x: null,
      y: null,
    };

    const isTouchSupported = "ontouchstart" in window;

    if (isTouchSupported) {
      coords.x = event.clientX - containerX;
      coords.y = event.clientY - containerY;
    } else if (event.offsetX || event.offsetX === 0) {
      coords.x = event.offsetX;
      coords.y = event.offsetY;
    } else if (event.layerX || event.layerX === 0) {
      coords.x = event.layerX;
      coords.y = event.layerY;
    }

    return coords;
  }

  function handleProgressIndicatorClick(event) {
    const progressBar = elements.progressBar;
    const xCoords = getXY(event).x;

    return (
      (xCoords - progressBar.offsetLeft) / progressBar.children[0].offsetWidth
    );
  }

  function initPlayer() {
    if (currentTrack === 1 || currentTrack === null) {
      elements.playerButtons.previousTrackBtn.disabled = true;
    }

    for (let i = 0; i < elements.playListRows.length; i++) {
      const smallToggleBtn = elements.playerButtons.smallToggleBtn[i];
      const playListLink = elements.playListRows[i].children[2].children[0];

      playListLink.addEventListener(
        "click",
        function (event) {
          event.preventDefault();
          const selectedTrack = parseInt(
            this.parentNode.parentNode.getAttribute("data-track-row")
          );

          if (selectedTrack !== currentTrack) {
            resetPlayStatus();
            currentTrack = null;
            trackLoaded = false;
          }

          if (trackLoaded === false) {
            // @ts-ignore
            currentTrack = parseInt(selectedTrack);
            setTrack();
          } else {
            // @ts-ignore
            playBack(this);
          }
        },
        false
      );

      smallToggleBtn.addEventListener(
        "click",
        function (event) {
          event.preventDefault();
          const selectedTrack = parseInt(
            this.parentNode.getAttribute("data-track-row")
          );

          if (selectedTrack !== currentTrack) {
            resetPlayStatus();
            currentTrack = null;
            trackLoaded = false;
          }

          if (trackLoaded === false) {
            // @ts-ignore
            currentTrack = parseInt(selectedTrack);
            setTrack();
          } else {
            // @ts-ignore
            playBack(this);
          }
        },
        false
      );
    }

    audio.addEventListener("timeupdate", trackTimeChanged, false);

    audio.addEventListener(
      "ended",
      function () {
        trackHasEnded();
      },
      false
    );

    audio.addEventListener(
      "error",
      function (event) {
        switch (event.target.error.code) {
          case event.target.error.MEDIA_ERR_ABORTED:
            alert("You aborted the audio playback.");
            break;
          case event.target.error.MEDIA_ERR_NETWORK:
            alert("A network error caused the audio download to fail.");
            break;
          case event.target.error.MEDIA_ERR_DECODE:
            alert(
              "The audio playback was aborted due to a corruption problem or because the audio used features your browser did not support."
            );
            break;
          case event.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
            alert(
              "The audio could not be loaded, either because the server or network failed or because the format is not supported."
            );
            break;
          default:
            alert("An unknown error occurred.");
            break;
        }
        trackLoaded = false;
        resetPlayStatus();
      },
      false
    );

    elements.playerButtons.largeToggleBtn.addEventListener(
      "click",
      function () {
        if (trackLoaded === false) {
          // @ts-ignore
          currentTrack = parseInt(1);
          setTrack();
        } else {
          playBack();
        }
      },
      false
    );

    elements.playerButtons.nextTrackBtn.addEventListener(
      "click",
      function () {
        if (!this.disabled) {
          currentTrack++;
          trackLoaded = false;
          resetPlayStatus();
          setTrack();
        }
      },
      false
    );

    elements.playerButtons.previousTrackBtn.addEventListener(
      "click",
      function () {
        if (!this.disabled) {
          currentTrack--;
          trackLoaded = false;
          resetPlayStatus();
          setTrack();
        }
      },
      false
    );

    elements.progressBar.children[0].children[0].children[1].addEventListener(
      "mousedown",
      mouseDown,
      false
    );
    window.addEventListener("mouseup", mouseUp, false);
  }

  // @ts-ignore
  function mouseDown(event) {
    window.addEventListener("mousemove", moveProgressIndicator, true);
    audio.removeEventListener("timeupdate", trackTimeChanged, false);
    playAHead = true;
  }

  function mouseUp(event) {
    if (playAHead === true) {
      const duration = parseFloat(audio.duration);
      // @ts-ignore
      const progressIndicatorClick = parseFloat(
        handleProgressIndicatorClick(event)
      );
      window.removeEventListener("mousemove", moveProgressIndicator, true);
      audio.currentTime = duration * progressIndicatorClick;
      audio.addEventListener("timeupdate", trackTimeChanged, false);
      playAHead = false;
    }
  }

  function moveProgressIndicator(event) {
    let newPosition = 0;
    const progressBarOffsetLeft = elements.progressBar.offsetLeft;
    let progressBarWidth = 0;
    const progressBarIndicatorWidth = progressBarIndicator.offsetWidth;
    const xCoords = getXY(event).x;

    progressBarWidth =
      elements.progressBar.children[0].offsetWidth - progressBarIndicatorWidth;
    newPosition = xCoords - progressBarOffsetLeft;

    if (newPosition >= 1 && newPosition <= progressBarWidth) {
      progressBarIndicator.style.left = `${newPosition}px`;
    }
    if (newPosition < 0) {
      progressBarIndicator.style.left = "0";
    }
    if (newPosition > progressBarWidth) {
      progressBarIndicator.style.left = `${progressBarWidth}px`;
    }
  }

  function playBack() {
    if (audio.paused) {
      audio.play();
      updatePlayStatus(true);
      document.title = `\u25B6 ${document.title}`;
    } else {
      audio.pause();
      updatePlayStatus(false);
      document.title = document.title.substr(2);
    }
  }

  function setTrack() {
    const songURL = audio.children[currentTrack - 1].src;

    audio.setAttribute("src", songURL);
    audio.load();

    trackLoaded = true;

    setTrackTitle(currentTrack, elements.playListRows);

    setActiveItem(currentTrack, elements.playListRows);

    elements.trackInfoBox.style.visibility = "visible";

    playBack();
  }

  function setActiveItem(currentTrack, playListRows) {
    for (let i = 0; i < playListRows.length; i++) {
      playListRows[i].children[2].className = "track-title";
    }

    playListRows[currentTrack - 1].children[2].className =
      "track-title active-track";
  }

  function setTrackTitle(currentTrack, playListRows) {
    const trackTitleBox = document.querySelector(
      ".player .info-box .track-info-box .track-title-text"
    );
    const trackTitle = playListRows[currentTrack - 1].children[2].outerText;

    trackTitleBox.innerHTML = null;
    trackTitleBox.innerHTML = trackTitle;

    document.title = trackTitle;
  }

  function trackHasEnded() {
    currentTrack =
      currentTrack === elements.playListRows.length ? 1 : currentTrack + 1;
    trackLoaded = false;

    resetPlayStatus();

    setTrack();
  }

  function trackTimeChanged() {
    const currentTimeBox = document.querySelector(
      ".player .info-box .track-info-box .audio-time .current-time"
    );
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const durationBox = document.querySelector(
      ".player .info-box .track-info-box .audio-time .duration"
    );
    const trackCurrentTime = trackTime(currentTime);
    const trackDuration = trackTime(duration);

    currentTimeBox.innerHTML = null;
    // @ts-ignore
    currentTimeBox.innerHTML = trackCurrentTime;

    durationBox.innerHTML = null;
    // @ts-ignore
    durationBox.innerHTML = trackDuration;

    // @ts-ignore
    updateProgressIndicator(audio);
    // @ts-ignore
    bufferProgress(audio);
  }

  function trackTime(seconds) {
    let min = 0;
    let sec = Math.floor(seconds);
    let time = 0;

    min = Math.floor(sec / 60);
    // @ts-ignore
    min = min >= 10 ? min : `0${min}`;

    sec = Math.floor(sec % 60);
    // @ts-ignore
    sec = sec >= 10 ? sec : `0${sec}`;

    // @ts-ignore
    time = `${min}:${sec}`;

    return time;
  }

  function updatePlayStatus(audioPlaying) {
    if (audioPlaying) {
      elements.playerButtons.largeToggleBtn.children[0].className =
        "large-pause-btn";
      elements.playerButtons.smallToggleBtn[
        currentTrack - 1
      ].children[0].className = "small-pause-btn";
    } else {
      elements.playerButtons.largeToggleBtn.children[0].className =
        "large-play-btn";
      elements.playerButtons.smallToggleBtn[
        currentTrack - 1
      ].children[0].className = "small-play-btn";
    }

    if (currentTrack === 1) {
      elements.playerButtons.previousTrackBtn.disabled = true;
      elements.playerButtons.previousTrackBtn.className =
        "previous-track-btn disabled";
    } else if (
      currentTrack > 1 &&
      currentTrack !== elements.playListRows.length
    ) {
      elements.playerButtons.previousTrackBtn.disabled = false;
      elements.playerButtons.previousTrackBtn.className = "previous-track-btn";
      elements.playerButtons.nextTrackBtn.disabled = false;
      elements.playerButtons.nextTrackBtn.className = "next-track-btn";
    } else if (currentTrack === elements.playListRows.length) {
      elements.playerButtons.nextTrackBtn.disabled = true;
      elements.playerButtons.nextTrackBtn.className = "next-track-btn disabled";
    }
  }

  function updateProgressIndicator() {
    const currentTime = parseFloat(audio.currentTime);
    const duration = parseFloat(audio.duration);
    let indicatorLocation = 0;
    const progressBarWidth = parseFloat(elements.progressBar.offsetWidth);
    const progressIndicatorWidth = parseFloat(progressBarIndicator.offsetWidth);
    const progressBarIndicatorWidth = progressBarWidth - progressIndicatorWidth;

    indicatorLocation = progressBarIndicatorWidth * (currentTime / duration);

    progressBarIndicator.style.left = `${indicatorLocation}px`;
  }

  function resetPlayStatus() {
    const smallToggleBtn = elements.playerButtons.smallToggleBtn;

    elements.playerButtons.largeToggleBtn.children[0].className =
      "large-play-btn";

    for (let i = 0; i < smallToggleBtn.length; i++) {
      if (smallToggleBtn[i].children[0].className === "small-pause-btn") {
        smallToggleBtn[i].children[0].className = "small-play-btn";
      }
    }
  }

  onMount(() => {
    audio = document.getElementById("audio");

    elements = {
      playerButtons: {
        largeToggleBtn: document.querySelector(".large-toggle-btn"),
        nextTrackBtn: document.querySelector(".next-track-btn"),
        previousTrackBtn: document.querySelector(".previous-track-btn"),
        smallToggleBtn: document.getElementsByClassName("small-toggle-btn"),
      },
      progressBar: document.querySelector(".progress-box"),
      playListRows: document.getElementsByClassName("play-list-row"),
      trackInfoBox: document.querySelector(".track-info-box"),
    };

    progressCounter = 0;
    progressBarIndicator =
      elements.progressBar.children[0].children[0].children[1];

    if (audio) {
      initPlayer();
    }
  });
</script>

<div class="container px-6">
  <audio id="audio" preload="none" tabindex="0">
    <source
      src="https://ik.imagekit.io/bip1v395ybp/Psalm23_aUcLuUSZ_8.mp3?updatedAt=1704759385955"
      data-track-number="1"
    />
    <source
      src="https://ik.imagekit.io/bip1v395ybp/Psalm34_4oiT5UJtI.mp3?updatedAt=1704759385588"
      data-track-number="2"
    />
    <source
      src="https://archive.org/download/slac2002-02-15/slac2002-02-15d1t07_64kb.mp3"
      data-track-number="3"
    />
    <source
      src="https://archive.org/download/blitzentrapper2009-02-24.flac16/blitzentrapper2009-02-24t02_64kb.mp3"
      data-track-number="4"
    />
    <source
      src="https://archive.org/download/samples2003-11-21.flac16/samples2003-11-21d2t04.mp3"
      data-track-number="5"
    />
    <source
      src="https://archive.org/download/mikedoughty2004-06-16.flac16/d1t13.mp3"
      data-track-number="6"
    />
    <source
      src="https://archive.org/download/glove2004-03-18.shnf/glove2004-03-18d1t05.mp3"
      data-track-number="7"
    />
    <source
      src="https://archive.org/download/guster2005-11-12.flac16/guster2005-11-12d2t04.mp3"
      data-track-number="8"
    />
    <source
      src="https://archive.org/download/oar2004-11-12.flac/oar2004-11-12d1t01.mp3"
      data-track-number="9"
    />
    <source
      src="https://archive.org/download/mmj2003-09-26.shnf/mmj2003-09-26d2t08.mp3"
      data-track-number="10"
    />
    Your browser does not support HTML5 audio.
  </audio>

  <div class="player">
    <div class="large-toggle-btn">
      <i class="large-play-btn"
        ><span class="screen-reader-text">Large toggle button</span></i
      >
    </div>
    <!-- /.play-box -->

    <div class="info-box">
      <div class="track-info-box">
        <div class="track-title-text"></div>
        <div class="audio-time">
          <span class="current-time">00:00</span> /
          <span class="duration">00:00</span>
        </div>
      </div>
      <!-- /.info-box -->

      <div class="progress-box">
        <div class="progress-cell">
          <div class="progress">
            <div class="progress-buffer"></div>
            <div class="progress-indicator"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- /.progress-box -->

    <div class="controls-box">
      <i class="previous-track-btn disabled"
        ><span class="screen-reader-text">Previous track button</span></i
      >
      <i class="next-track-btn"
        ><span class="screen-reader-text">Next track button</span></i
      >
    </div>
    <!-- /.controls-box -->
  </div>
  <!-- /.player -->

  <div class="play-list">
    <div class="play-list-row" data-track-row="1">
      <div class="small-toggle-btn">
        <i class="small-play-btn"
          ><span class="screen-reader-text">Small toggle button</span></i
        >
      </div>
      <div class="track-number">1.</div>
      <div class="track-title">
        <a class="playlist-track" href="#" data-play-track="1">Psalm 23</a>
      </div>
    </div>
    <div class="play-list-row" data-track-row="2">
      <div class="small-toggle-btn">
        <i class="small-play-btn"
          ><span class="screen-reader-text">Small toggle button</span></i
        >
      </div>
      <div class="track-number">2.</div>
      <div class="track-title">
        <a class="playlist-track" href="#" data-play-track="2">Pslam 34</a>
      </div>
    </div>
    <div class="play-list-row" data-track-row="3">
      <div class="small-toggle-btn">
        <i class="small-play-btn"
          ><span class="screen-reader-text">Small toggle button</span></i
        >
      </div>
      <div class="track-number">3.</div>
      <div class="track-title">
        <a class="playlist-track" href="#" data-play-track="3">Psalm 103</a>
      </div>
    </div>
    <!-- <div class="play-list-row" data-track-row="4">
      <div class="small-toggle-btn">
        <i class="small-play-btn"
          ><span class="screen-reader-text">Small toggle button</span></i
        >
      </div>
      <div class="track-number">4.</div>
      <div class="track-title">
        <a class="playlist-track" href="#" data-play-track="4"
          >Blitzen Trapper - Saturday Night</a
        >
      </div>
    </div>
    <div class="play-list-row" data-track-row="5">
      <div class="small-toggle-btn">
        <i class="small-play-btn"
          ><span class="screen-reader-text">Small toggle button</span></i
        >
      </div>
      <div class="track-number">5.</div>
      <div class="track-title">
        <a class="playlist-track" href="#" data-play-track="5"
          >The Samples - Feel Us Shaking</a
        >
      </div>
    </div>
    <div class="play-list-row" data-track-row="6">
      <div class="small-toggle-btn">
        <i class="small-play-btn"
          ><span class="screen-reader-text">Small toggle button</span></i
        >
      </div>
      <div class="track-number">6.</div>
      <div class="track-title">
        <a class="playlist-track" href="#" data-play-track="6"
          >Mike Doughty - American Car</a
        >
      </div>
    </div>
    <div class="play-list-row" data-track-row="7">
      <div class="small-toggle-btn">
        <i class="small-play-btn"
          ><span class="screen-reader-text">Small toggle button</span></i
        >
      </div>
      <div class="track-number">7.</div>
      <div class="track-title">
        <a class="playlist-track" href="#" data-play-track="7"
          >G. Love &amp; Special Sauce - Dreamin'</a
        >
      </div>
    </div>
    <div class="play-list-row" data-track-row="8">
      <div class="small-toggle-btn">
        <i class="small-play-btn"
          ><span class="screen-reader-text">Small toggle button</span></i
        >
      </div>
      <div class="track-number">8.</div>
      <div class="track-title">
        <a class="playlist-track" href="#" data-play-track="8"
          >Guster - Amsterdam</a
        >
      </div>
    </div>
    <div class="play-list-row" data-track-row="9">
      <div class="small-toggle-btn">
        <i class="small-play-btn"
          ><span class="screen-reader-text">Small toggle button</span></i
        >
      </div>
      <div class="track-number">9.</div>
      <div class="track-title">
        <a class="playlist-track" href="#" data-play-track="9"
          >O.A.R. - About Mr. Brown</a
        >
      </div>
    </div> -->
    <!-- <div class="play-list-row" data-track-row="10">
      <div class="small-toggle-btn">
        <i class="small-play-btn"
          ><span class="screen-reader-text">Small toggle button</span></i
        >
      </div>
      <div class="track-number">10.</div>
      <div class="track-title">
        <a class="playlist-track" href="#" data-play-track="10"
          >My Morning Jacket - Phone Went West</a
        >
      </div>
    </div> -->
  </div>
</div>

<style lang="scss">
  @import "//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.css";

  //General mixins

  //Clearfix mixin
  @mixin clearfix() {
    *zoom: 1;
    &:before,
    &:after {
      content: " ";
      display: table;
    }
    &:after {
      clear: both;
      display: block;
      font-size: 0;
      height: 0;
      visibility: hidden;
    }
  }

  //Media query mixin
  @mixin media($type) {
    @if $type == tablet {
      /* Small devices (tablets, 768px and up) */
      @media (min-width: 768px) and (max-width: 991px) {
        @content;
      }
    } @else if $type == mediumDesktop {
      /* Medium devices (desktops, 992px and up) */
      @media (min-width: 992px) and (max-width: 1100px) {
        @content;
      }
    } @else if $type == largeDesktop {
      /* Large devices (large desktops, 1200px and up) */
      @media (min-width: 1200px) {
        @content;
      }
    }
  }

  //General classes
  .screen-reader-text {
    /* Reusable, toolbox kind of class */
    position: absolute;
    top: -9999px;
    left: -9999px;
  }
  .disabled {
    color: #666;
    cursor: default;
  }
  .show {
    display: inline-block !important;
  }

  //General CSS
  body {
    margin: 10px 0 0 0;

    .container {
      font-family: arial, helvetica, sans-serif;
      font-size: 1em;
      margin: 0 auto;
      width: 500px;
      .player {
        height: 60px;
        margin: 0;
        position: relative;
        width: 400px;
        @include media(tablet) {
          width: 470px;
        }
        @include media(mediumDesktop) {
          width: 470px;
        }
        @include media(largeDesktop) {
          width: 470px;
        }
        .large-toggle-btn {
          border: 1px solid #d9d9d9;
          border-radius: 2px;
          float: left;
          font-size: 1.5em;
          height: 50px;
          margin: 0 10px 0 0;
          overflow: hidden;
          padding: 5px 0 0 0;
          position: relative;
          text-align: center;
          vertical-align: bottom;
          width: 54px;
          .large-play-btn {
            &:before {
              content: "\f04b";
              font: 1.5em/1.75 "FontAwesome";
            }
            cursor: pointer;
            display: inline-block;
            position: relative;
            top: -14%;
          }
          .large-pause-btn {
            &:before {
              content: "\f04c";
              font: 1.5em/1.75 "FontAwesome";
            }
            cursor: pointer;
            display: inline-block;
            position: relative;
            top: -13%;
          }
        } //end .play-box
        .info-box {
          bottom: 10px;
          left: 65px;
          position: absolute;
          top: 15px;
          .track-info-box {
            float: left;
            font-size: 12px;
            margin: 0 0 6px 0;
            visibility: hidden;
            width: 400px;
            .track-title-text {
              display: inline-block;
            }
            .audio-time {
              display: inline-block;
              padding: 0 0 0 5px;
              width: 80px;
            }
            @include clearfix();
          }
        }
        .progress-box {
          float: left;
          min-width: 40%;
          position: relative;
          .progress-cell {
            height: 12px;
            position: relative;
            .progress {
              background: #fff;
              border: 1px solid #d9d9d9;
              height: 8px;
              position: relative;
              width: auto;
              .progress-buffer {
                background: #337ab7;
                height: 100%;
                width: 0;
              }
              .progress-indicator {
                background: #fff;
                border: 1px solid #bebebe;
                border-radius: 3px;
                cursor: pointer;
                height: 10px;
                left: 0;
                overflow: hidden;
                position: absolute;
                top: -2px;
                width: 22px;
              }
            }
          }
        } //end .prgoress-box
        .controls-box {
          bottom: 10px;
          left: 70%;
          position: absolute;
          .previous-track-btn {
            &:before {
              content: "\f049";
              font: 1em "FontAwesome";
            }
            cursor: pointer;
            display: inline-block;
          }
          .next-track-btn {
            &:before {
              content: "\f050";
              font: 1em "FontAwesome";
            }
            cursor: pointer;
            display: inline-block;
          }
        }
        @include clearfix();
      } //end .player

      .play-list {
        display: block;
        margin: 0 auto 20px auto;
        width: 100%;
        .play-list-row {
          display: block;
          margin: 10px 0;
          width: 100%;
          .track-title {
            .playlist-track {
              &:hover {
                text-decoration: underline;
              }
              color: #000;
              text-decoration: none;
            }
          }
          .small-toggle-btn {
            border: 1px solid #d9d9d9;
            border-radius: 2px;
            cursor: pointer;
            display: inline-block;
            height: 20px;
            margin: 0 auto;
            overflow: hidden;
            position: relative;
            text-align: center;
            vertical-align: middle;
            width: 20px;
            .small-play-btn {
              &:before {
                content: "\f04b";
                font: 0.85em "FontAwesome";
              }
              display: inline-block;
            }
            .small-pause-btn {
              &:before {
                content: "\f04c";
                font: 0.85em "FontAwesome";
              }
              display: inline-block;
            }
          }
          .track-number {
            display: inline-block;
          }
          .track-title {
            display: inline-block;
            .playlist-track {
              text-decoration: none;
              &:hover {
                text-decoration: underline;
              }
            }
          }
          .track-title.active-track {
            font-weight: bold;
          }
          @include clearfix();
        }
      }
    } //end .container
  }
</style>
