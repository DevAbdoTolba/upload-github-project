<script lang="ts">
  import { auth } from "../firebase";
  import { user } from "../stores/userStore";
  import { goto } from "$app/navigation";
  import { signInWithPopup, GithubAuthProvider } from "firebase/auth";

  let error = "";
  const signInWithGitHub = async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      user.set(result.user); // Set the user in the store
      goto("/user");
    } catch (e) {
      // @ts-ignore
      error = e.message;
      console.error("Login error: ", e);
    }
  };
</script>

<div>
  <h1>Login with github</h1>
  <button class="btn" on:click={signInWithGitHub}>Login</button>
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
