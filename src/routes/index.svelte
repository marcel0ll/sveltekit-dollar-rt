<script>
	export let exchangeRate;

	let value = 2520;

	const WIRE_TRANSFER_FEE = 30;
	const PAYONEER_FEE = 2;

	// TODO: find quotes
	const huskyQuote = exchangeRate;
	const btgQuote = exchangeRate;
	const payoneerQuote = exchangeRate;
	const interQuote = exchangeRate;

	$: husky = (value - WIRE_TRANSFER_FEE) * (1 - 0.01) * huskyQuote;
	$: btg = (value - WIRE_TRANSFER_FEE) * (1 - 0.009) * btgQuote;
	$: payoneer = (value - PAYONEER_FEE) * (1 - 0.02) * payoneerQuote;
  $: inter = (value) * (1 - 0.01465) * interQuote;

	$: max = Math.max(husky, btg, payoneer, inter);

	$: isHusky = husky === max;
	$: isBtg = btg === max;
	$: isPayoneer = payoneer === max;
  $: isInter = inter === max;

	$: list = [
		{
			name: 'Husky',
			value: husky,
			isBest: isHusky,
			formula: `(valor - ${WIRE_TRANSFER_FEE}) * (1 - 1%)`
		},
		{
			name: 'BTG',
			value: btg,
			isBest: isBtg,
			formula: `(valor - ${WIRE_TRANSFER_FEE}) * (1 - 0.9%)`
		},
		{
			name: 'Payoneer',
			value: payoneer,
			isBest: isPayoneer,
			formula: `(valor - ${PAYONEER_FEE}) * (1 - 2%)`
		},
		{
			name: 'Inter',
			value: inter,
			isBest: isInter,
			formula: `(valor) * (1 - 1.1%)`
		}
	].sort((a, b) => b.value - a.value);
</script>

<svelte:head>
	<title>Por onde sacar?</title>
</svelte:head>

<header>
	<h1 class="font-bold text-2xl">Por onde sacar?</h1>
</header>

<p class="font-bold text-lg">USD → BRL: {exchangeRate.toFixed(4)}</p>

<main>
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
</main>

<footer>
	<a href="https://github.com/marcel0ll/sveltekit-dollar-rt">
		<svg
			class="inline-block"
			width="20"
			height="20"
			role="img"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>GitHub</title>
			<path
				d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
			/>
		</svg>
		Github repo
	</a>
</footer>

<style>
	:global(html),
	:global(body) {
		height: 100%;
	}

	:global(body) {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
	}

	label {
		display: block;
	}
</style>
