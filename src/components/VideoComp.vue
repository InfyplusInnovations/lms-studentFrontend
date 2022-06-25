<template>
  <div class="tw-my-3">
    <vue-plyr
      class="player tw-max-h-96"
      ref="plyr"
      @ended="handleVideoEnd"
      @pause="handleVideoPause"
      :poster="poster"
      @loadeddata="handleReady"
    >
      <video data-plyr-config="{'autoplay': false}"></video>
    </vue-plyr>
  </div>
</template>
<script>
import { ref, toRef } from "@vue/reactivity";
import { onBeforeUpdate, onMounted } from "@vue/runtime-core";
import moment from "moment";
import Hls from "hls.js";
// REQUIRED PROPS
// videolink = videoID
// poster = posterlink url
// seekTime = seconds
export default {
  props: ["videoLink", "poster", "seekTime"],
  emits: ["ended", "videoPause"],
  setup(props, ctx) {
    let plyr = ref(null);
    const setupVideo = (videoLink, Poster) => {
      if (Hls.isSupported() && videoLink.value !== undefined) {
        const hls = new Hls();
        hls.loadSource(
          `https://vz-f26417eb-c20.b-cdn.net/${videoLink.value}/playlist.m3u8`
        );
        hls.autoLevelCapping = 1;

        hls.attachMedia(plyr.value.player.media);

        window.hls = hls;
      }
      if (Poster.value !== undefined && plyr.value !== null) {
        plyr.value.player.poster = Poster.value;
      }
    };
    let videoLink = toRef(props, "videoLink");
    let posterLink = toRef(props, "poster");
    let seekTime = toRef(props, "seekTime");
    onBeforeUpdate(async () => {
      setupVideo(videoLink, posterLink);
    });
    onMounted(() => {
      setupVideo(videoLink, posterLink);
    });
    const handleVideoEnd = () => {
      ctx.emit("ended");
    };
    const handleVideoPause = () => {
      let time = ref(plyr.value.player.currentTime);
      ctx.emit("videoPause", `${time.value}`);
    };
    const handleReady = () => {
      if (seekTime.value !== undefined) {
        if (seekTime.value !== null && plyr.value !== null) {
          let md = moment.duration(seekTime.value.time);
          let seekTimeInSeconds = md.asSeconds();
          plyr.value.player.currentTime = seekTimeInSeconds;
        }
      }
    };
    return {
      plyr,
      handleReady,
      handleVideoEnd,
      handleVideoPause,
    };
  },
};
</script>
