<script>
  import { fade } from 'svelte/transition';

  export let visible = false;
</script>

<div>
  <label>
    <input type="checkbox" bind:checked={visible} />

    {#if visible}Hide{:else}Show{/if}
    text
  </label>

  {#if visible}
    <p transition:fade>Hello there!</p>
  {/if}
</div>
