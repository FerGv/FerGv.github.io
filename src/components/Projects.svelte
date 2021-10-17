<script>
  // Store
  import { language } from "../store";

  // Translation
  import translation from "../translations/projects";
</script>

<section class="py-16 px-5 bg-white">
  <h3 class="font-bold text-3xl text-center border border-black mb-4 rounded">
    {translation[$language].title}
  </h3>

  <div class="flex justify-center space-x-20">
    {#each translation[$language].sections as { buttonText, description, icon, link, title }}
      <article class="text-center space-y-5">
        <p class="text-2xl text-gray-800 font-semibold">{title}</p>

        <p class="text-gray-600">{description}</p>

        <p class="text-green-500">
          <a
            href={link}
            target="_blank"
            class="border border-green-500 py-2 px-5 rounded text-2xl hover:bg-green-500 hover:text-white"
          >
            <i class={icon} />
            {buttonText}
          </a>
        </p>
      </article>
    {/each}
  </div>
</section>
