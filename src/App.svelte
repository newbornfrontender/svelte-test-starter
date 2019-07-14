<script>
  import Inner from '@/Inner.svelte';
  import Counter from '@/Counter/Counter.svelte';
  import Transition from '@/Transition.svelte';
</script>

<h1>
  Hello
  <span>world</span>
  !
</h1>

<div class="inner">
  <Inner />
</div>

<Counter />

<Transition />

<style>
  h1 {
    color: red;

    & span {
      color: red;
    }
  }

  .inner :global(p) {
    color: green;
    font-size: 1.2rem;
  }
</style>
