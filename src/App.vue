<template>
  <div class="container">
    <el-container>
      <el-main>
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
</script>

<style>
:root {
  --red: hsl(0, 78%, 62%);
  --cyan: hsl(180, 62%, 55%);
  --orange: hsl(34, 97%, 64%);

  --darkBlue: hsl(234, 12%, 34%);
  --grayishBlue: hsl(229, 6%, 66%);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  background:
		linear-gradient(90deg, #fafafa 26.5px, transparent 1%) center,
		linear-gradient(#fafafa 26.6px, transparent 1%) center,
    #a799cc;

	background-size: 28px 28px;
}

.el-main {
  padding: 0 15% !important;
}

.dialog__footer {
  display: flex;
  justify-content: end;
}
</style>
