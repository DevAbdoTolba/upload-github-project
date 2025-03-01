<script lang="ts">
  import { onMount } from "svelte";
  import { user } from "../../stores";
  import { goto } from "$app/navigation";
  import { db } from "../firebase";
  import { collection, getDocs } from "firebase/firestore";

  interface TaskData {
    email: string;
    githubRepo: string;
    task: string;
  }

  let tasks: TaskData[] = [];
  let loading = true;
  let error = "";
  let detailedError = "";

  onMount(async () => {
    // Admin access protection - client-side only
    if (!$user || $user.email !== "devabdotolba@gmail.com") {
      goto("/");
      return;
    }

    try {
      const tasksCollection = collection(db, "tasks");
      const taskSnapshot = await getDocs(tasksCollection);
      
      tasks = taskSnapshot.docs.map(doc => {
        const data = doc.data() as TaskData;
        return data;
      });
      
      console.log("Successfully fetched tasks:", tasks.length);
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : "Unknown error";
      console.error("Error fetching tasks:", e);
      error = "Failed to load dashboard data";
      detailedError = errorMsg;
    } finally {
      loading = false;
    }
  });

  // Extract username from email
  function getUserName(email: string): string {
    return email.split('@')[0] || 'Unknown';
  }

  // Generate GitHub Pages URL from repo URL
  function getGitHubPagesUrl(repoUrl: string): string {
    try {
      const urlParts = repoUrl.replace('https://github.com/', '').split('/');
      if (urlParts.length >= 2) {
        return `https://${urlParts[0]}.github.io/${urlParts[1]}`;
      }
      return 'Invalid URL';
    } catch {
      return 'Invalid URL';
    }
  }
</script>

<div class="dashboard">
  <h1>Admin Dashboard</h1>
  
  {#if loading}
    <p>Loading dashboard data...</p>
  {:else if error}
    <div class="error">
      <p>{error}</p>
      {#if detailedError}
        <p class="error-details">Details: {detailedError}</p>
        <p class="error-help">
          Make sure your Firestore security rules allow admin access to the "tasks" collection.
        </p>
      {/if}
    </div>
  {:else if tasks.length === 0}
    <p>No submissions found in the database.</p>
  {:else}
    <table>
      <thead>
        <tr>
          <th>User Name</th>
          <th>Email</th>
          <th>GitHub Repo</th>
          <th>GitHub Pages URL</th>
        </tr>
      </thead>
      <tbody>
        {#each tasks as task}
          <tr>
            <td>{getUserName(task.email)}</td>
            <td>{task.email}</td>
            <td>
              <a href={task.githubRepo} target="_blank" rel="noopener noreferrer">
                {task.githubRepo}
              </a>
            </td>
            <td>
              <a href={getGitHubPagesUrl(task.githubRepo)} target="_blank" rel="noopener noreferrer">
                {getGitHubPagesUrl(task.githubRepo)}
              </a>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
  
  <div class="controls">
    <button class="back-btn" on:click={() => goto('/user')}>Back to User Page</button>
  </div>
</div>

<style>
  .dashboard {
    width: 100%;
    min-width: 100%;
    margin: 0 auto;
  }

  h1 {
    text-align: center;
    margin-bottom: 20px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  }

  th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #f1f1f1;
  }

  a {
    color: #0066cc;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  .error {
    color: red;
    text-align: center;
    background-color: #ffebee;
    padding: 15px;
    border-radius: 4px;
    margin: 10px 0;
  }

  .error-details {
    font-family: monospace;
    background-color: #f5f5f5;
    padding: 8px;
    border-radius: 3px;
    color: #d32f2f;
  }

  .error-help {
    color: #555;
    font-size: 0.9em;
    margin-top: 10px;
  }

  .controls {
    margin-top: 20px;
    text-align: center;
  }

  .back-btn {
    background-color: #555;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .back-btn:hover {
    background-color: #333;
  }
</style>
