<template>
    <div>
        overview
      <router-link to="/classInfo">classInfo</router-link>
      <router-link to="/activity">activity</router-link>
      <router-link to="/studentsInfo">studentsInfo</router-link>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
</template>
<style>

</style>
