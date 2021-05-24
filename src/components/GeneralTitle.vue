<template>
  <div class="general-title border-bottom">
    <span class="title">{{ title }}</span>
    <span class="detail copy" @click="docopy(detail,'copy')">{{ detail }}</span>
  </div>
</template>
<script>
export default {
  name: "GeneralTitle",
  props: {
    title: {
      type: String
    },
    detail: {
      type: String
    }
  }
};
</script>
<style lang="scss" scoped>
.general-title {
  height: 70px;
  line-height: 70px;
  border-radius: 5px;
  margin-bottom: 10px;
  // background: var(--general-title-bg-color);
  background: var(--board-item-bg-color);
  .title {
    margin-left: 90px;
    min-width: 210px;
    display: inline-block;
    
  }
  .detail {
    color: white;
    
  }
}
</style>
