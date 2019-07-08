<script>
  import Inner from '@/Inner.svelte';
  import Counter from '@/Counter/Counter.svelte';
  import Transition from '@/Transition.svelte';
</script>

<h1>Hello world!</h1>

<div class="inner">
  <Inner />
</div>

<Counter />

<Transition />

<style>
  h1 {
    color: red;
  }

  .inner :global(p) {
    color: green;
    font-size: 1.2rem;
  }
</style>
