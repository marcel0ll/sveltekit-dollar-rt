<script> 
  export let exchangeRate;

  let value = 1000;

  const WIRE_TRANSFER_FEE = 30;
  const PAYONEER_FEE = 2;

  // TODO: find quotes
  const huskyQuote = exchangeRate;
  const btgQuote = exchangeRate;
  const payoneerQuote = exchangeRate;

  $: husky = (value - WIRE_TRANSFER_FEE) * (1 - .01) * huskyQuote;
  $: btg = (value - WIRE_TRANSFER_FEE) * (1 - .009)  * btgQuote;
  $: payoneer = (value - PAYONEER_FEE) * (1 - .02) * payoneerQuote;

  $: max = Math.max(husky, btg, payoneer);

  $: isHusky = husky === max;
  $: isBtg = btg === max;
  $: isPayoneer = payoneer === max;

  $: list = [
    {name: 'Husky', value: husky, isBest: isHusky},
    {name: 'BTG', value: btg, isBest: isBtg},
    {name: 'Payoneer', value: payoneer, isBest: isPayoneer},
  ].sort((a,b) => b.value - a.value);
</script>

<h1> USD -> BRL: {exchangeRate} </h1>

<div>
  <label>
    Valor:
    <input name="valor" type="number" bind:value={value} min=0>
  </label>
  <h2>Quais as melhores opções de saque?</h2>
  {#each list as { name, value }}
    <label>
      {name}:
      <output name="resultado" for="valor">{value.toFixed(2)}</output>
    </label>
  {/each}
</div>

<style>
  label {
    display: block;
  }
</style>
