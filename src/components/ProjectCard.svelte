<script>
  export let description;
  export let image;
  export let link;
  export let title;
</script>

<style>
  img {
    height: 250px;
  }
</style>

<article class="flex flex-col sm:flex-row bg-white text-center pb-5 sm:pb-0 rounded">
  <img src="/img/{image}" alt={title} class="rounded rounded-tr-none rounded-br-none sm:w-1/2">

  <div class="flex flex-col justify-center flex-1">
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
