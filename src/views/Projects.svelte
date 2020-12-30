<script>
  // Components
  import ProjectCard from '../components/ProjectCard.svelte';

  // Store
  import { language } from '../store';

  // Translation
  import translation from '../translations/projects';

  let projectIndex = 0;

  $: projects = translation[$language].projects;
  $: currentProject = projects[projectIndex];

  function nextProject() {
    projectIndex = projectIndex + 1;

    if (projectIndex >= projects.length) {
      projectIndex = 0;
    }
  }

  function lastProject() {
    projectIndex = projectIndex - 1;

    if (projectIndex < 0) {
      projectIndex = projects.length - 1;
    }
  }
</script>

<section class="py-12 px-5 bg-gray-300">
  <h3 class="font-bold text-3xl text-center border border-black mb-4 rounded">
    {translation[$language].title}
  </h3>

  <section class="flex justify-center">
    <div
      class="flex flex-col justify-center cursor-pointer hover:bg-gray-200"
      on:click={lastProject}
    >
      <i class="fas fa-chevron-left fa-fw text-4xl" />
    </div>

    {#if currentProject}
      <ProjectCard {...currentProject} />
    {/if}

    <div
      class="flex flex-col justify-center cursor-pointer hover:bg-gray-200"
      on:click={nextProject}
    >
      <i class="fas fa-chevron-right fa-fw text-4xl" />
    </div>
  </section>
</section>
