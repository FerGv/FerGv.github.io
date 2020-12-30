<script>
  // Store
  import { language } from '../store';

  // Translation
  import translation from '../translations/language';

  const changeLanguage = () => {
    const isEnglishVersion = $language === 'en';
    language.set(isEnglishVersion ? 'es' : 'en');
    document.title = translation[$language].documentTitle;
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
  <img
    src="/img/{translation[$language].icon}"
    alt={translation[$language].imgAlt}
    loading="lazy"
  />

  <span class="ml-2">
    {translation[$language].label}
  </span>
</section>
