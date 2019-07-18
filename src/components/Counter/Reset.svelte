<script>
  import { counter } from 'store/counter';

  function reset() {
    counter.set(0);
  }
</script>

<button on:click={reset}>Reset</button>

<style>
  button {
    margin-inline-start: 1rem;
  }
</style>
