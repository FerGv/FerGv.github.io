<script>
  // Components
  import SkillCard from '../components/SkillCard.svelte';

  const skills = [
    {
      name: 'Python',
      icon: 'python',
      iconColor: 'blue-400',
      stars: 4,
    },
    {
      name: 'Javascript',
      icon: 'js',
      iconColor: 'yellow-300',
      stars: 4,
    },
    {
      name: 'Vue',
      icon: 'vuejs',
      iconColor: 'green-500',
      stars: 4,
    },
    {
      name: 'HTML',
      icon: 'html5',
      iconColor: 'red-400',
      stars: 4,
    },
    {
      name: 'CSS',
      icon: 'css3-alt',
      iconColor: 'blue-700',
      stars: 4,
    },
    {
      name: 'PHP',
      icon: 'php',
      iconColor: 'blue-800',
      stars: 3,
    },
  ];
</script>

<style>
  section {
    background-image: url("/img/skills-bg.jpg");
    background-position: center;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>

<section class="py-10 px-5">
  <h3 class="text-white font-bold text-3xl text-center border mb-4">Habilidades</h3>

  <section class="grid grid-cols-2 sm:grid-cols-3 gap-3">
    {#each skills as {name, icon, iconColor, stars}}
      <SkillCard {name} {icon} {iconColor} {stars} />
    {/each}
  </section>
</section>
