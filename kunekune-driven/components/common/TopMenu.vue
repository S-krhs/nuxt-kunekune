<script setup lang="ts">


</script>
<template>

</template>
<style scoped>
.menu-wrapper {
  min-height: 100%;
  background-image: url('@/assets/images/background/check-background.jpg');
}

.sidebar p{
  text-align: center;
}

.sidebar {
  grid-area: leftbar;
  overflow: scroll;
  overflow-x: hidden;
  background-image: var(--SidebarBackgroundImage);  
}

.sidebar-contents {
  padding-top: 25px;
}

.sidebar-access-counter {
  padding-top: 10px;
  padding-bottom: 10px;
}

.access-counter-pos {
  margin: auto;
  width: 180px;
  height: 25px;
  background-color: #000;
  text-align: center;
  line-height: 25px;
  text-indent: 0.6em;
  letter-spacing: 0.6em;
  color: white;
}

.sidebar-profile{
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 10px;
}

.my-name{
  text-align: center;
  font-size: large;
}

.my-icon-pos{
  text-align: center;
  margin: auto;
  width:170px;
  height:170px;
  /* background-color: #00f; */
  padding: 10px;
}

.my-icon-img{
  width:170px;
  height: auto;
  margin: auto;
}

.my-introduction{
  margin-top: 5px;
  text-align: center;
}

.sidebar-link{
  margin-top: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  height: 100%;
  width: 100%;
}

.headline{
  font-family: Monotype Corsiva;
  font-style: italic;
  font-size: x-large;
  font-weight: 600;
  list-style: none;
  text-align: left;
  margin-left: 20px;
}

.rows{
  padding-top: 5px;
  padding-bottom: 5px;
}

.row{
  line-height: 25px;
  list-style: none;
  text-align: left;
  text-decoration: underline;
  margin-left: 25px;
  margin-top: 5px;
}

.margin-test{
  margin-top: 70px;
}

.hidden{
  text-align: right;
  font-size: x-small;
}
</style>