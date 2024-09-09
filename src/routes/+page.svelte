<script>
  import { goto } from "$app/navigation";
  import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
  import { firebaseApp } from "./firebase";
  import { setContext } from "svelte";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  const auth = getAuth(firebaseApp);
  let error = "";

  function handleLogin() {
    signInWithPopup(auth, new GithubAuthProvider())
      .then((result) => {
        if (result.user) {
          const credential = GithubAuthProvider.credentialFromResult(result);
          // @ts-ignore
          const accessToken = credential.accessToken; // Store the GitHub access token
          localStorage.setItem("accessToken", accessToken);
          setContext("user", result.user);
          goto("/user");
        } else {
          error = "No user found";
        }
      })
      .catch((error) => {
        console.log("Log in error: ", error);
      });
  }
</script>

<div>
  <h1>Login with GitHub</h1>
  <button class="btn" on:click={handleLogin}> Login </button>

  {#if error}
    <p class="error">{error}</p>
  {/if}
</div>

<style>
  .btn {
    /* modern clean soft nemorpihc design */
    background-color: #f0f0f0;
    height: fit-content;
    width: 100%;
    border: 1px solid #0f0f0f;
    border-radius: 5px;
    color: #333;
    cursor: pointer;
    display: inline-block;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 0.375rem 0.75rem;
    text-align: center;
    text-decoration: none;
    transition:
      background-color 0.15s,
      border-color 0.15s,
      color 0.15s;
  }

  .btn:hover {
    background-color: #e6e6e6;
    border-color: #e6e6e6;
    color: #333;
  }

  .btn:active {
    background-color: #d9d9d9;
    border-color: #d9d9d9;
    color: #333;
  }

  .error {
    color: red;
  }
</style>
