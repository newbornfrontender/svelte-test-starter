<script>
  import { counter } from 'store/counter';

  function increment() {
    counter.update((n) => n + 1);
  }
</script>

<button on:click={increment}>Increase</button>
