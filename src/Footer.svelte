<script>
  const year = new Date().getFullYear();
  const socialIcons = ['github', 'linkedin'];
</script>

<footer class="bg-gray-900 text-white text-center py-5">
  <section>
    {#each socialIcons as icon}
      <i class="fab fa-{icon} fa-fw text-3xl transform hover:scale-150" />
    {/each}
  </section>

  <section>
    <i class="fas fa-code fa-fw text-blue-500" />
    con
    <i class="fas fa-heart fa-fw text-red-500" />
    por Fernando García en {year} &copy;
  </section>
</footer>
