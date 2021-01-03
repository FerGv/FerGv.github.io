<script>
  // Components
  import SkillCard from './SkillCard.svelte';

  // Store
  import { language } from '../store';

  // Translation
  import translation from '../translations/skills';
</script>

<style>
  section {
    background-image: url(/img/skills-bg.jpg);
    background-position: center;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>

<section class="py-12 px-5">
  <h3 class="text-white font-bold text-3xl text-center border mb-4 rounded">
    {translation[$language].techSkillsTitle}
  </h3>

  <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
    {#each translation[$language].techSkills as skill}
      <SkillCard {...skill} />
    {/each}
  </section>

  <h3 class="text-white font-bold text-3xl text-center border mt-10 mb-4 rounded">
    {translation[$language].softSkillsTitle}
  </h3>

  <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
    {#each translation[$language].softSkills as skill}
      <SkillCard {...skill} />
    {/each}
  </section>
</section>
