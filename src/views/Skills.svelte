<script>
  // Components
  import SkillCard from '../components/SkillCard.svelte';

  // Store
  import { language } from '../store';

  const translation = {
    en: {
      techSkillsTitle: 'Tech skills',
      softSkillsTitle: 'Soft skills',
      techSkills: [
        {
          name: 'Web',
          icon: 'code',
          iconColor: 'blue-400',
          stars: 4,
        },
        {
          name: 'Mobile',
          icon: 'mobile-alt',
          iconColor: 'yellow-300',
          stars: 2,
        },
        {
          name: 'Database',
          icon: 'database',
          iconColor: 'green-500',
          stars: 3,
        },
        {
          name: 'Version control',
          icon: 'code-branch',
          iconColor: 'red-400',
          stars: 3,
        },
        {
          name: 'Cloud',
          icon: 'cloud',
          iconColor: 'blue-700',
          stars: 3,
        },
        {
          name: 'DevOps',
          icon: 'server',
          iconColor: 'blue-800',
          stars: 2,
        },
      ],
      softSkills: [
        {
          name: 'English',
          icon: 'language',
          iconColor: 'blue-400',
          stars: 4,
        },
        {
          name: 'Communication',
          icon: 'comments',
          iconColor: 'yellow-300',
          stars: 5,
        },
        {
          name: 'Teamwork',
          icon: 'users',
          iconColor: 'green-500',
          stars: 5,
        },
        {
          name: 'Laboriosity',
          icon: 'briefcase',
          iconColor: 'red-400',
          stars: 5,
        },
        {
          name: 'Leadership',
          icon: 'award',
          iconColor: 'blue-700',
          stars: 4,
        },
      ],
    },
    es: {
      techSkillsTitle: 'Habilidades técnicas',
      softSkillsTitle: 'Habilidades sociales',
      techSkills: [
        {
          name: 'Web',
          icon: 'code',
          iconColor: 'blue-400',
          stars: 4,
        },
        {
          name: 'Móvil',
          icon: 'mobile-alt',
          iconColor: 'yellow-300',
          stars: 2,
        },
        {
          name: 'Base de datos',
          icon: 'database',
          iconColor: 'green-500',
          stars: 3,
        },
        {
          name: 'Control de versiones',
          icon: 'code-branch',
          iconColor: 'red-400',
          stars: 3,
        },
        {
          name: 'Cloud',
          icon: 'cloud',
          iconColor: 'blue-700',
          stars: 3,
        },
        {
          name: 'DevOps',
          icon: 'server',
          iconColor: 'blue-800',
          stars: 2,
        },
      ],
      softSkills: [
        {
          name: 'Inglés',
          icon: 'language',
          iconColor: 'blue-400',
          stars: 4,
        },
        {
          name: 'Comunicación',
          icon: 'comments',
          iconColor: 'yellow-300',
          stars: 5,
        },
        {
          name: 'Trabajo en equipo',
          icon: 'users',
          iconColor: 'green-500',
          stars: 5,
        },
        {
          name: 'Laboriosidad',
          icon: 'briefcase',
          iconColor: 'red-400',
          stars: 5,
        },
        {
          name: 'Liderazgo',
          icon: 'award',
          iconColor: 'blue-700',
          stars: 4,
        },
      ],
    },
  };
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
    {#each translation[$language].techSkills as { name, icon, iconColor, stars }}
      <SkillCard {name} {icon} {iconColor} {stars} />
    {/each}
  </section>

  <h3 class="text-white font-bold text-3xl text-center border mt-10 mb-4 rounded">
    {translation[$language].softSkillsTitle}
  </h3>

  <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
    {#each translation[$language].softSkills as { name, icon, iconColor, stars }}
      <SkillCard {name} {icon} {iconColor} {stars} />
    {/each}
  </section>
</section>
