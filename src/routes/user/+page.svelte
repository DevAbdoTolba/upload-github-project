<script>
  import { user } from "../../stores/userStore";

  let currentUser = null;

  $: currentUser = $user;
</script>

{#if currentUser}
  <h1>Welcome {currentUser.displayName}!</h1>
{:else}
  <h1>wot</h1>
{/if}
