<script>
  // Store
  import { language } from '../store';

  const translation = {
    en: {
      job: 'Developer',
    },
    es: {
      job: 'Desarrollador',
    },
  };
</script>

<style>
  header {
    background-image: url(/img/header-bg.jpg);
    background-position: center;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .name {
    background-color: rgba(0, 0, 0, 0.8);
  }
</style>

<header class="bg-gray-700 text-center min-h-screen flex flex-col justify-center">
  <section class="name py-20 text-white">
    <h1 class="text-5xl">Fernando García</h1>

    <hr class="w-1/2 m-auto my-3 border-2 border-white" />

    <h2 class="text-2xl">
      {translation[$language].job}
    </h2>
  </section>
</header>
