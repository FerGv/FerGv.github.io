<script>
  const year = new Date().getFullYear();
  const socialIcons = [
    {
      icon: 'github',
      link: 'https://github.com/FerGv',
    },
    {
      icon: 'linkedin',
      link: 'https://www.linkedin.com/in/jose-fernando-garcia-vazquez',
    },
  ];
</script>

<footer class="bg-gray-900 text-white text-center py-10">
  <section>
    {#each socialIcons as socialIcon}
      <a href={socialIcon.link} target="_blank">
        <i class="fab fa-{socialIcon.icon} fa-fw text-3xl transform hover:scale-150" />
      </a>
    {/each}
  </section>

  <section>
    <i class="fas fa-code fa-fw text-blue-500" />
    con
    <i class="fas fa-heart fa-fw text-red-500" />
    por Fernando García en {year} &copy;
  </section>
</footer>
