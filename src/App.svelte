<script>
  import Inner from './components/Inner.svelte';
  import Counter from './components/Counter/Counter.svelte';
</script>

<h1>Hello world!</h1>

<div class="inner">
  <Inner />

  <Counter />
</div>

<style>
  h1 {
    color: red;
  }

  .inner :global(p) {
    color: green;
    font-size: 1.2rem;
  }
</style>
