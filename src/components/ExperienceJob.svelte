<script>
  export let company;
  export let period;
  export let title;

  $: companyFirstLetter = company[0];
</script>

<article class="bg-white border rounded grid grid-cols-3">
  <div class="flex justify-center items-center text-5xl">
    {companyFirstLetter}
  </div>

  <div class="col-span-2 border-l text-center py-5">
    <p class="font-bold">{company}</p>
    <p>{title}</p>
    <p class="text-blue-500">{period}</p>
  </div>
</article>
