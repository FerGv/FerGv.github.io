<script>
  export let name;
  export let icon;
  export let iconColor;
  export let stars;
</script>

<article class="flex flex-col bg-white text-center p-5 rounded transform hover:scale-90">
  <p>
    <i class="fas fa-{icon} fa-fw text-{iconColor} text-4xl" />
  </p>

  <p class="font-bold uppercase">{name}</p>

  <p>
    {#each Array(stars) as _}
      <i class="fas fa-star fa-fw text-yellow-400" />
    {/each}
  </p>
</article>
