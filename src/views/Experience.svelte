<script>
  // Components
  import ExperienceJob from '../components/ExperienceJob.svelte';

  // Store
  import { language } from '../store';

  // Translation
  import translation from '../translations/experience';
</script>

<style>
  section {
    background-image: url(/img/experience-bg.jpg);
    background-position: center;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>

<section class="py-12 px-5">
  <h3 class="font-bold text-3xl text-center text-white border border-white mb-4 rounded">
    {translation[$language].title}
  </h3>

  <section class="grid grid-cols-1 sm:grid-cols-2 gap-5">
    {#each translation[$language].jobs as job}
      <ExperienceJob {...job} />
    {/each}
  </section>
</section>
