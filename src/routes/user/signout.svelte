<script lang="ts">
  import { signOut } from "firebase/auth";
  import { auth } from "../firebase";
  import { user } from "../../stores";
  import leave from "$lib/images/leave.png";

  async function handleSignOut() {
    try {
      localStorage.removeItem("accessToken")
      await signOut(auth);
      user.set(null);
    } catch (error) {
      console.error(error);
    }
  }
</script>

<button on:click={handleSignOut} class="signOut">
  <img src={leave} alt="Sign_OUT" height="15" width="15" />
</button>

<style>
  .signOut {
    position: absolute;
    bottom: 10ch;
    right: 5ch;
    background-color: #f44336;
    color: white;
    padding: 2ch;
    border: none;
    border-radius: 5px 50px 50px 5px;
    cursor: pointer;
  }
</style>
