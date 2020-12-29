<script>
  // Store
  import { language } from '../store';

  const translation = {
    en: {
      icon: 'lang-es.svg',
      label: 'Ver versión en español',
      imgAlt: 'Cambiar idioma',
    },
    es: {
      icon: 'lang-en.svg',
      label: 'View English version',
      imgAlt: 'Change language',
    },
  };

  const changeLanguage = () => {
    const isEnglishVersion = $language === 'en';
    language.set(isEnglishVersion ? 'es' : 'en');
  };
</script>

<style>
  img {
    width: 30px;
  }
</style>

<section
  class="bg-gray-300 flex justify-center items-center text-blue-500 cursor-pointer"
  on:click={changeLanguage}
>
  <img src="/img/{translation[$language].icon}" alt={translation[$language].imgAlt} />
  <span class="ml-2">{translation[$language].label}</span>
</section>
