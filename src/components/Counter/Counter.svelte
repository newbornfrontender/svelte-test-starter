<script>
  import Increment from './Increment.svelte';
  import Decrement from './Decrement.svelte';
  import Reset from './Reset.svelte';
  import { counter } from 'store/counter';
</script>

<Increment />
<p>{$counter}</p>
<Decrement />
<Reset />
