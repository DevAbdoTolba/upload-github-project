<script lang="ts">
  import { onMount } from "svelte";
  import { user } from "../../stores"; // Import the user store

  interface Repo {
    full_name: string;
    name: string;
  }

  type Repos = Repo[];

  let selectedRepo = "";
  let repoList: Repos = [];
  let accessToken: string | null = null;
  let error = "";
  let numberOfRepos = 0;
  let loading = false;

  $: {
    numberOfRepos = repoList.length;
    console.log(repoList);
  }

  onMount(() => {
    accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      fetchGitHubRepos();
    } else {
      error = "No access token found.";
    }
  });

  async function fetchGitHubRepos() {
    let page = 1;
    let shouldFetchMore = true;
    let allRepos: Repos = [];

    try {
      while (shouldFetchMore) {
        const response = await fetch(
          `https://api.github.com/user/repos?per_page=100&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          allRepos = [...allRepos, ...data];

          // If fewer than 100 repos are returned, stop fetching more
          if (data.length < 100) {
            shouldFetchMore = false;
          }
          page++; // Move to the next page
        } else {
          error = `Error fetching repositories: ${response.status}`;
          shouldFetchMore = false;
        }
      }

      repoList = allRepos; // Update the list with all fetched repos
    } catch (fetchError) {
      console.error("Error fetching repositories:", fetchError);
      error = "An error occurred while fetching repositories.";
    }
  }

  function handleSubmit() {
    if (selectedRepo === "") {
      return;
    }
  }
</script>

{#if $user}
  <h1>Welcome, {$user.displayName}!</h1>
{:else}
  wot
{/if}

<div>
  {#if repoList.length > 0}
    <label for="repos"
      >Select a Repository <span class="numOfRepos">{numberOfRepos}</span
      >:</label
    >
    <select id="repos" bind:value={selectedRepo}>
      {#each repoList as repo}
        <option value={repo.full_name}>{repo.name}</option>
      {/each}
    </select>

    <div class="selection">
      <p>
        You selected:
        <a href="https://github.com/{selectedRepo}">
          {selectedRepo}
        </a>
      </p>
      <button
        class="submit"
        on:click={handleSubmit}
        disabled={selectedRepo === "" || loading ? true : false}
      >
        Submit
      </button>
    </div>
  {/if}
</div>

<style>
  select {
    width: 100%;
    padding: 0.5rem;
    margin: 0.5rem 0;
  }

  /* make custom modern styling for the select body and options */
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #f0f0f0;
    border: 1px solid #0f0f0f;
    border-radius: 5px;
    color: #333;
    cursor: pointer;
    display: inline-block;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 0.375rem 0.75rem;
    text-decoration: none;
    transition:
      background-color 0.15s,
      border-color 0.15s,
      color 0.15s;
  }

  option {
    font-family: monospace;
    padding: 0.5rem;
  }

  .selection {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    gap: 1ch;
  }
  .submit {
    /* modern clean soft nemorpihc design */
    background-color: #f0f0f0;
    height: fit-content;
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

  .submit:hover {
    background-color: #e0e0e0;
    border: 1px solid #0f0f0f;
    color: #333;
  }

  .submit:active {
    background-color: #d0d0d0;
    border: 1px solid #0f0f0f;
    color: #333;
  }

  .submit[disabled] {
    background-color: #9f9f9f;
    border: 1px solid #0f0f0f;
    color: #333;
    cursor: not-allowed;
  }

  .numOfRepos {
    font-size: 1ch;
    font-weight: 700;
  }
</style>
