<template>
  <div class="my-3" v-if="videoLink">
    <vue-plyr
      class="player"
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
import { ref, toRef } from "vue";
import { onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted } from "vue";
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
    const setupVideo = (videoLink, Poster, destroy = false) => {
      if (Hls.isSupported() && videoLink.value !== undefined) {
        const hls = new Hls({
          maxBufferSize: 3 * 1000 * 1000,
        });

        if (destroy == false) {
          console.log(plyr.value.player);
          hls.attachMedia(plyr.value.player.media);
          hls.on(Hls.Events.MEDIA_ATTACHED, () => {
            console.log("player and media are now attached");
            hls.loadSource(
              `https://vz-f26417eb-c20.b-cdn.net/${videoLink.value}/playlist.m3u8`
            );
            hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
              console.log(
                "manifest loaded, found " +
                  data.levels.length +
                  " quality level"
              );
              console.log(hls.levels);
            });
          });

          hls.autoLevelCapping = 1;

          window.hls = hls;
        }
        if (destroy == true) {
          hls.destroy();
          plyr.value.player.pause();
          hls.stopLoad();
          hls.detachMedia();
          hls.destroy();
          plyr.value.player.destroy();
        }
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
    onBeforeUnmount(() => {
      console.log("unmount");
      setupVideo(videoLink, posterLink, true);
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
