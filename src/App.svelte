<script>
  import Inner from './components/Inner.svelte';
</script>

<h1>Hello world!</h1>

<div>
  <Inner />
</div>

<style>
  div :global(.text) {
    color: green;
    font-size: 1.2rem;
  }

  h1 {
    color: red;
  }
</style>
