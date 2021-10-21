<script>
  // Store
  import { language } from "../store";

  // Translation
  import translation from "../translations/projects";
</script>

<section class="py-16 px-5 bg-white">
  <h3 class="font-bold text-3xl text-center border border-green-700 mb-4 rounded text-green-700">
    {translation[$language].title}
  </h3>

  <div class="flex flex-wrap justify-center space-y-10 lg:space-y-0 lg:space-x-20">
    {#each translation[$language].sections as { buttonText, description, icon, link, title }}
      <article class="text-center space-y-5 p-5">
        <p class="text-green-500 text-6xl">
          <i class={icon} />
        </p>

        <p class="text-2xl text-gray-600 font-semibold">{title}</p>

        <p class="text-gray-400">{description}</p>

        <p class="text-green-500">
          <a
            href={link}
            target="_blank"
            class="border border-green-500 py-2 px-4 rounded text-xl hover:bg-green-500 hover:text-white"
          >
            {buttonText}
            <i class="fas fa-external-link-alt" />
          </a>
        </p>
      </article>
    {/each}
  </div>
</section>
