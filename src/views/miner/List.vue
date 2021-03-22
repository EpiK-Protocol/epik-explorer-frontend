<template>
  <div class="message-list-con bottom-10">
    <miner-list :withType="false" />
  </div>
</template>
<script>
export default {
  name: "MinerListCon",
};
</script>
<style lang="scss" scoped>
.message-list-con {
  & ::v-deep .el-table {
    height: calc(100vh - 200px) !important;
  }
}
</style>
