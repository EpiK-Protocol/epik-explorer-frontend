<template>
  <div class="miner-list-con bottom-10">
    <message-list :withType="false" :tableHeight="isMobile?'calc(100vh - 70px)':'calc(100vh - 110px)'"/>
  </div>
</template>
<script>
export default {
  name: "MessageListCon",
};
</script>

