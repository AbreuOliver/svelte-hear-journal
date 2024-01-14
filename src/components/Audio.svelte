<script>
  import { onMount } from "svelte";

  let audioPlaying = false;
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
      elements.playerButtons.largeToggleBtn.setAttribute(
        "data-tooltip-target",
        "tooltip-pause"
      );
      elements.playerButtons.largeToggleBtn.children[1].innerHTML =
        "Pause video";
      elements.playerButtons.smallToggleBtn[
        currentTrack - 1
      ].children[0].className = "small-pause-btn";
    } else {
      elements.playerButtons.largeToggleBtn.children[0].className =
        "large-play-btn";
      elements.playerButtons.largeToggleBtn.setAttribute(
        "data-tooltip-target",
        "tooltip-play"
      );
      elements.playerButtons.largeToggleBtn.children[1].innerHTML =
        "Play video";
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
      src="https://ik.imagekit.io/bip1v395ybp/Psalm103_Kqfx8p9TB.mp3?updatedAt=1704759385420"
      data-track-number="1"
    />
    <source
      src="https://ik.imagekit.io/bip1v395ybp/Psalm34_4oiT5UJtI.mp3?updatedAt=1704759385588"
      data-track-number="2"
    />
    <source
      src="https://ik.imagekit.io/bip1v395ybp/Psalm23_aUcLuUSZ_8.mp3?updatedAt=1704759385955"
      data-track-number="3"
    />
    <!-- <source
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
    /> -->
    Your browser does not support HTML5 audio.
  </audio>

  <div class="player">
    <div class="info-box">
      <div class="track-info-box">
        <div class="track-title-text"></div>
      </div>
      <div class="progress-box">
        <div class="progress-cell">
          <div class="progress">
            <div class="progress-buffer"></div>
            <div class="progress-indicator"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="controls-box">
      <i class="previous-track-btn disabled"
        ><span class="screen-reader-text">Previous track button</span></i
      >
      <i class="next-track-btn"
        ><span class="screen-reader-text">Next track button</span></i
      >
    </div> -->
  </div>

  <div class="py-4 play-list">
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
        <a class="playlist-track" href="#" data-play-track="2">Pslam 103</a>
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
        <a class="playlist-track" href="#" data-play-track="3">Psalm 34</a>
      </div>
    </div>
  </div>
  <!-- NEW CODE -->
  <div
    class="fixed bottom-16 left-0 py-6 z-50 grid w-full h-30 grid-cols-1 px-8 bg-white border-t border-gray-200 md:grid-cols-3 dark:bg-gray-700 dark:border-gray-600"
  >
    <div class="flex items-center w-full">
      <div class="w-full">
        <div class="flex items-center justify-center mx-auto mb-4">
          <button
            data-tooltip-target="tooltip-previous"
            type="button"
            class="previous-track-btn disabled p-2.5 group rounded-full hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600"
          >
            <svg
              class="rtl:rotate-180 w-4 h-4 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 12 16"
            >
              <path
                d="M10.819.4a1.974 1.974 0 0 0-2.147.33l-6.5 5.773A2.014 2.014 0 0 0 2 6.7V1a1 1 0 0 0-2 0v14a1 1 0 1 0 2 0V9.3c.055.068.114.133.177.194l6.5 5.773a1.982 1.982 0 0 0 2.147.33A1.977 1.977 0 0 0 12 13.773V2.227A1.977 1.977 0 0 0 10.819.4Z"
              />
            </svg>
            <span class="sr-only">Previous song</span>
          </button>
          <div
            id="tooltip-previous"
            role="tooltip"
            class="next-track-btn absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Previous song
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
          <button
            data-tooltip-target="tooltip-pause"
            type="button"
            class="large-toggle-btn inline-flex items-center justify-center p-2.5 mx-2 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
            on:click={() => (audioPlaying = !audioPlaying)}
          >
            {#if audioPlaying}
              <svg
                class="large-play-btn w-6 h-6 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 10 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M0 .8C0 .358.32 0 .714 0h1.429c.394 0 .714.358.714.8v14.4c0 .442-.32.8-.714.8H.714a.678.678 0 0 1-.505-.234A.851.851 0 0 1 0 15.2V.8Zm7.143 0c0-.442.32-.8.714-.8h1.429c.19 0 .37.084.505.234.134.15.209.354.209.566v14.4c0 .442-.32.8-.714.8H7.857c-.394 0-.714-.358-.714-.8V.8Z"
                  clip-rule="evenodd"
                />
              </svg>
            {:else}
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white pl-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 16"
              >
                <path
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m2.707 14.293 5.586-5.586a1 1 0 0 0 0-1.414L2.707 1.707A1 1 0 0 0 1 2.414v11.172a1 1 0 0 0 1.707.707Z"
                />
              </svg>
            {/if}
            <span class="sr-only">Pause song</span>
          </button>
          <div
            id="tooltip-pause"
            role="tooltip"
            class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Pause song
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
          <button
            data-tooltip-target="tooltip-next"
            type="button"
            class="p-2.5 group rounded-full hover:bg-gray-100 me-1 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600"
          >
            <svg
              class="rtl:rotate-180 w-4 h-4 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 12 16"
            >
              <path
                d="M11 0a1 1 0 0 0-1 1v5.7a2.028 2.028 0 0 0-.177-.194L3.33.732A2 2 0 0 0 0 2.227v11.546A1.977 1.977 0 0 0 1.181 15.6a1.982 1.982 0 0 0 2.147-.33l6.5-5.773A1.88 1.88 0 0 0 10 9.3V15a1 1 0 1 0 2 0V1a1 1 0 0 0-1-1Z"
              />
            </svg>
            <span class="sr-only">Next video</span>
          </button>
        </div>
        <div
          class="audio-time flex items-center justify-between space-x-2 rtl:space-x-reverse"
        >
          <span
            class="current-time text-sm font-medium text-gray-500 dark:text-gray-400"
            >00:00</span
          >
          <div class="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-800">
            <div
              class="bg-blue-600 h-1.5 rounded-full"
              style="width: 65%"
            ></div>
          </div>
          <span
            class="duration text-sm font-medium text-gray-500 dark:text-gray-400"
            >00:00</span
          >
        </div>
      </div>
    </div>
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
