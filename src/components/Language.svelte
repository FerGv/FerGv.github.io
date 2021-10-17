<script>
  // Store
  import { language } from "../store";

  // Translation
  import translation from "../translations/language";

  const changeLanguage = () => {
    const isEnglishVersion = $language === "en";
    language.set(isEnglishVersion ? "es" : "en");
    document.title = translation[$language].documentTitle;
  };
</script>

<section
  class="bg-blue-500 flex justify-center items-center text-white cursor-pointer"
  on:click={changeLanguage}
>
  <img
    src="/img/{translation[$language].icon}"
    alt={translation[$language].imgAlt}
    loading="lazy"
  />

  <span class="ml-2 font-semibold">
    {translation[$language].label}
  </span>
</section>

<style>
  img {
    width: 40px;
  }
</style>
