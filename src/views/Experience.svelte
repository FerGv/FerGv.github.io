<script>
  // Components
  import ExperienceJob from '../components/ExperienceJob.svelte';

  // Store
  import { language } from '../store';

  const translation = {
    en: {
      title: 'Work experience',
      jobs: [
        {
          company: 'Warriors Labs',
          period: 'Jan - Aug (2018)',
          title: 'Web Developer',
        },
        {
          company: 'WeeCompany',
          period: 'Mar - Jul (2019)',
          title: 'Web Developer',
        },
        {
          company: 'Klatus',
          period: 'Jul (2018) - Current',
          title: 'Web Developer',
        },
        {
          company: 'Keyence',
          period: 'Jan (2020) - Current',
          title: 'Web Developer',
        },
      ],
    },
    es: {
      title: 'Experiencia laboral',
      jobs: [
        {
          company: 'Warriors Labs',
          period: 'Ene - Ago (2018)',
          title: 'Desarrollador Web',
        },
        {
          company: 'WeeCompany',
          period: 'Mar - Jul (2019)',
          title: 'Desarrollador Web',
        },
        {
          company: 'Klatus',
          period: 'Jul (2018) - Actual',
          title: 'Desarrollador Web',
        },
        {
          company: 'Keyence',
          period: 'Ene (2020) - Actual',
          title: 'Desarrollador Web',
        },
      ],
    },
  };
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
    {#each translation[$language].jobs as { company, period, title }}
      <ExperienceJob {company} {period} {title} />
    {/each}
  </section>
</section>
