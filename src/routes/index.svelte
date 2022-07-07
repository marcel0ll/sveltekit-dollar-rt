<script>
	export let exchangeRate;

	let value = 2520;

	const WIRE_TRANSFER_FEE = 30;
	const PAYONEER_FEE = 2;

	// TODO: find quotes
	const huskyQuote = exchangeRate;
	const btgQuote = exchangeRate;
	const payoneerQuote = exchangeRate;

	$: husky = (value - WIRE_TRANSFER_FEE) * (1 - 0.01) * huskyQuote;
	$: btg = (value - WIRE_TRANSFER_FEE) * (1 - 0.009) * btgQuote;
	$: payoneer = (value - PAYONEER_FEE) * (1 - 0.02) * payoneerQuote;

	$: max = Math.max(husky, btg, payoneer);

	$: isHusky = husky === max;
	$: isBtg = btg === max;
	$: isPayoneer = payoneer === max;

	$: list = [
		{ name: 'Husky', value: husky, isBest: isHusky, formula: `(valor - ${WIRE_TRANSFER_FEE}) * (1 - 1%)` },
		{ name: 'BTG', value: btg, isBest: isBtg, formula: `(valor - ${WIRE_TRANSFER_FEE}) * (1 - 0.9%)` },
		{ name: 'Payoneer', value: payoneer, isBest: isPayoneer, formula: `(valor - ${PAYONEER_FEE}) * (1 - 2%)` }
	].sort((a, b) => b.value - a.value);
</script>

<svelte:head>
  <title>Por onde sacar?</title>
</svelte:head>

<h1 class="font-bold text-2xl">Por onde sacar?</h1>

<p class="font-bold text-lg">USD → BRL: {exchangeRate.toFixed(4)}</p>

<div>
	<label class="my-2">
		Valor USD:
		<input class="border text-right" name="valor" type="number" bind:value min="0" />
	</label>
	<h2 class="font-bold mt-3">Quais as melhores opções de saque?</h2>
  <h3 class="text-sm font-thin">Passe mouse sobre valor para ver formula</h3>
	{#each list as { name, value, formula }}
		<label title={formula}>
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
