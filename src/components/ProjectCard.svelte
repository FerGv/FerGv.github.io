<script>
  export let description;
  export let image;
  export let link;
  export let title;
</script>

<style>
  img {
    height: 195px;
  }

  .project-info {
    min-height: 180px;
  }

  @media (min-width: 640px) {
    img {
      min-height: 300px;
    }

    .project-info {
      min-height: auto;
    }
  }
</style>

<article class="flex flex-col sm:flex-row bg-white text-center rounded flex-1">
  <img
    src="/img/{image}"
    alt={title}
    class="rounded rounded-tr-none rounded-br-none sm:w-1/2"
  >

  <div class="project-info flex flex-col justify-center content-center px-5 sm:px-10 flex-1">
    <p class="font-bold uppercase">{title}</p>

    <p>{description}</p>

    <p class="mt-3">
      <a href={link} class="text-blue-500" target="_blank">
        Ver
        <i class="fas fa-external-link-alt fa-fw" />
      </a>
    </p>
  </div>
</article>
