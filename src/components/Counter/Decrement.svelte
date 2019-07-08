<script>
  import { counter } from 'store/counter';

  function decrement() {
    counter.update((n) => n - 1);
  }
</script>

<button on:click={decrement}>Decrease</button>
