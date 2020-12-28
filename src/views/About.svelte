<script>
  const contactLinks = [
    {
      text: '(+52) 55 3759 2020',
      link: 'tel:5537592020',
      icon: 'phone',
    },
    {
      text: 'jfer.garciav@gmail.com',
      link: 'mailto:jfer.garciav@gmail.com',
      icon: 'envelope',
    },
  ]
</script>

<section class="flex flex-col md:flex-row justify-center items-center py-20 md:px-20">
  <img
    src="https://avatars2.githubusercontent.com/u/10598981?s=460&u=834eb543ae75b8fe7d4b332672870741f0f1d036&v=4"
    alt="Me"
    class="rounded-full w-1/3 md:w-1/5"
  />

  <section class="px-5 mt-4 md:mt-0">
    <p>Hola, mi nombre es Fernando.</p>

    <br />

    <p>
      Soy egresado de la Lic. en Ciencias de la Informática y me encanta el
      desarrollo de aplicaciones (web, móvil, etc).
    </p>

    <br />

    <p>Te dejo mi contacto por si gustas charlar.</p>

    <br />

    <p>Saludos :D</p>

    {#each contactLinks as {text, link, icon}}
      <p class="text-center my-3">
        <a
          class="text-green-500 text-center inline-block transform hover:scale-125"
          href={link}
          target="_blank"
        >
          <i class="fas fa-{icon} fa-fw" />
          {text}
        </a>
      </p>
    {/each}
  </section>
</section>
