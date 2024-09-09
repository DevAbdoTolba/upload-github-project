<script>
  import plantsWP from "$lib/images/plantsWP.jpg";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { user } from "../stores/userStore";

  import { onAuthStateChanged } from "firebase/auth";
  import { auth } from "../firebase";

  onMount(() => {
    const unsubscribe = onAuthStateChanged(auth, (userData) => {
      user.set(userData); // Update the store with the user data
      if (!userData && window.location.pathname.startsWith("/user")) {
        goto("/");
      }
    });
    return unsubscribe;
  });
</script>

<body style="background-image: url({plantsWP});">
  <main class="main">
    <slot />
  </main>
</body>

<style>
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
