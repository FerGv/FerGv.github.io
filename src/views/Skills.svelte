<script>
  // Components
  import SkillCard from '../components/SkillCard.svelte';

  const techSkills = [
    {
      name: 'Desarrollo Web',
      icon: 'code',
      iconColor: 'blue-400',
      stars: 4,
    },
    {
      name: 'Desarrollo Móvil',
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
  ];

  const softSkills = [
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
  ];
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

<section class="py-20 px-5">
  <h3 class="text-white font-bold text-3xl text-center border mb-4 rounded">
    Habilidades técnicas
  </h3>

  <section class="grid grid-cols-2 sm:grid-cols-3 gap-3">
    {#each techSkills as { name, icon, iconColor, stars }}
      <SkillCard {name} {icon} {iconColor} {stars} />
    {/each}
  </section>

  <h3 class="text-white font-bold text-3xl text-center border mt-10 mb-4 rounded">
    Habilidades sociales
  </h3>

  <section class="grid grid-cols-2 sm:grid-cols-3 gap-3">
    {#each softSkills as { name, icon, iconColor, stars }}
      <SkillCard {name} {icon} {iconColor} {stars} />
    {/each}
  </section>
</section>
