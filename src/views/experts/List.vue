<template>
  <div class="message-list-con bottom-10">
    <experts-list :withType="false" />
  </div>
</template>
<script>
export default {
  name: "ExpertsListCon",
};
</script>
<style lang="scss" scoped>
.message-list-con {
  & ::v-deep .el-table {
    height: calc(100vh - 200px) !important;
  }
}
</style>
