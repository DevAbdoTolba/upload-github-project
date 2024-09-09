<script>
  import plantsWP from "$lib/images/plantsWP.jpg";
</script>

<svelte:head></svelte:head>

<body style="background-image: url({plantsWP});">
  <main class="main">
    <slot />
  </main>
</body>

<style>
  * {
    font-family: "Courier New", Courier, monospace;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    margin: 0;
    padding: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 100svh;
    width: 100vw;
  }

  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 20px;
    border-radius: 10px;
  }
</style>
