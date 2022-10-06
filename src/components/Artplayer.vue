<template>
  <div ref="artRef"></div>
</template>
<script>
import Artplayer from "artplayer";
import { ref, toRef } from "@vue/reactivity";
import { onBeforeMount, onBeforeUnmount, onMounted } from "@vue/runtime-core";
import moment from "moment";
import Hls from "hls.js";
export default {
  props: ["videoLink", "poster", "seekTime", "title"],
  emits: ["ended", "videoPause"],
  setup(props, ctx) {
    let artRef = ref(null);
    let player = ref(null);
    onMounted(() => {
      let videoLink = toRef(props, "videoLink");
      let posterLink = toRef(props, "poster");
      let seekTime = toRef(props, "seekTime");
      let title = toRef(props, "title");
      if (artRef.value !== null) {
        player.value = new Artplayer({
          url: `https://vz-f26417eb-c20.b-cdn.net/${videoLink.value}/playlist.m3u8`,
          poster: posterLink.value,
          autoSize: true,
          fullscreen: true,
          aspectRatio: true,
          playsInline: true,
          "webkit-playsinline": true,
          whitelist: ["*"],
          fastForward: true,
          layers: [
            {
              index: 1,
              name: "videoInfo",
              disable: title.value !== undefined ? false : true,
              html: `<div class="p-3 text-white bg-gray-700 bg-opacity-10 absolute top-0 right-0 font-bold">${title.value}<div>`,
            },
          ],
          controls: [],
          customType: {
            m3u8: function (video, url, art) {
              // console.log("url", url);

              if (art.hls) {
                art.hls.destroy();
                art.hls = null;
              }

              if (Hls.isSupported()) {
                art.hls = new Hls({ maxBufferSize: 3 * 1000 * 1000 });
                art.hls.loadSource(url);
                art.hls.attachMedia(video);
                art.on("ready", () => {
                  art.controls.add({
                    name: "hls_levels",
                    position: "right",
                    html: "quality",
                    selector: art.hls.levels.map((item, index) => {
                      return {
                        default: item.height == 480,
                        html: item.height + "P",
                        level: item.level || index,
                      };
                    }),
                    onSelect(item) {
                      console.log(art.hls, art.hls.levels, item);
                      art.hls.nextLevel = item.level;
                      return item.html;
                    },
                    mounted() {
                      const $value = art.query(
                        ".art-control-hls_levels .art-selector-value"
                      );

                      function updateHtml() {
                        const currentLevel = art.hls.levels[hls.currentLevel];
                        if (currentLevel) {
                          $value.innerHTML = currentLevel.height + "P";
                        }
                      }

                      art.hls.once(Hls.Events.LEVEL_SWITCHING, (level) => {
                        console.log("LEVEL_SWITCHING", level);
                        updateHtml();
                      });

                      art.hls.once(Hls.Events.LEVEL_SWITCHED, (level) => {
                        console.log("LEVEL_SWITCHED", level);
                        updateHtml();
                      });

                      art.hls.once(Hls.Events.LEVEL_LOADING, (level) => {
                        console.log("LEVEL_LOADING", level);
                        updateHtml();
                      });

                      art.hls.once(Hls.Events.LEVEL_LOADED, (level) => {
                        console.log("LEVEL_LOADED", level);
                        updateHtml();
                      });

                      art.hls.once(Hls.Events.LEVEL_UPDATED, (level) => {
                        console.log("LEVEL_UPDATED", level);
                        updateHtml();
                      });

                      art.hls.once(Hls.Events.LEVELS_UPDATED, (level) => {
                        console.log("LEVELS_UPDATED", level);
                        updateHtml();
                      });
                    },
                  });
                  // seek to time
                  if (seekTime.value && seekTime.value.time !== undefined) {
                    let time = seekTime.value.time
                      .split(":")
                      .reduce((acc, time) => 60 * acc + +time);
                    art.seek = time;
                  }
                });
                art.on("video:pause", () => {
                  ctx.emit("videoPause", `${art.currentTime}`);
                });
                art.on("video:ended", () => {
                  ctx.emit("ended");
                });
              } else {
                const canPlay = video.canPlayType(
                  "application/vnd.apple.mpegurl"
                );
                if (canPlay === "probably" || canPlay == "maybe") {
                  video.src = url;
                } else {
                  art.notice.show = "Does not support playback of m3u8";
                }
              }
            },
          },

          container: artRef.value,
        });
      }
    });
    onBeforeUnmount(() => {
      if (player.value && player.value.destroy) {
        player.value.destroy(false);
      }
    });
    return {
      artRef,
    };
  },
};
</script>
