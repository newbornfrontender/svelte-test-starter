<script>
  import Inner from 'component/Inner.svelte';
  import Counter from 'component/Counter/Counter.svelte';
  import Transition from 'component/Transition.svelte';
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
    margin-inline-start: 2rem;

    & span {
      color: red;
    }
  }

  .inner :global(p) {
    color: green;
    font-size: 1.2rem;

    &:dir(rtl) {
      color: red;
    }
  }
</style>
