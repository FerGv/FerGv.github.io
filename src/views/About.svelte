<script>
  // Store
  import { language } from '../store';

  const translation = {
    en: {
      firstParagraph: 'Hi, my name is Fernando.',
      secondParagraph: `I have a degree in Computer Science and I love
        software development (web, mobile, etc).`,
      thirdParagraph: 'Here you have my contact if you want to talk.',
      fourthParagraph: 'Regards :D',
      cv: {
        label: 'Download CV',
        file: 'CV_Fernando_García_(en).pdf',
      },
    },
    es: {
      firstParagraph: 'Hola, mi nombre es Fernando.',
      secondParagraph: `Soy egresado de la Lic. en Ciencias de la Informática y
        me encanta el desarrollo de aplicaciones (web, móvil, etc).`,
      thirdParagraph: 'Te dejo mi contacto por si gustas charlar.',
      fourthParagraph: 'Saludos :D',
      cv: {
        label: 'Descargar CV',
        file: 'CV_Fernando_García_(es).pdf',
      },
    },
  };

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

<section class="flex flex-col md:flex-row justify-center items-center py-12 md:px-20">
  <img
    src="/img/profile-photo.jpeg"
    alt="Me"
    loading="lazy"
    class="rounded-full w-1/3 md:w-1/5"
  />

  <section class="px-5 mt-4 md:mt-0">
    <p>{translation[$language].firstParagraph}</p>
    <br />
    <p>{translation[$language].secondParagraph}</p>
    <br />
    <p>{translation[$language].thirdParagraph}</p>
    <br />
    <p>{translation[$language].fourthParagraph}</p>

    {#each contactLinks as {text, link, icon}}
      <p class="text-center my-3">
        <a
          class="text-green-500 text-center inline-block md:transform hover:scale-125"
          href={link}
          target="_blank"
        >
          <i class="fas fa-{icon} fa-fw" />
          {text}
        </a>
      </p>
    {/each}

    <p class="text-center my-3">
      <a
        class="text-green-500 text-center inline-block md:transform hover:scale-125"
        href="/files/{translation[$language].cv.file}"
        download
      >
        <i class="fas fa-download fa-fw" />
        {translation[$language].cv.label}
      </a>
    </p>
  </section>
</section>
