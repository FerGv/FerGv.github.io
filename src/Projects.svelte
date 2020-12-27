<script>
  // Components
  import ProjectCard from './components/ProjectCard.svelte';

  let projectIndex = 0;
  const projects = [
    {
      title: 'Escuela Fit',
      description: 'Proyecto dedicado a mejorar la salud de los alumnos de la UPIICSA.',
      image: 'school.jpg',
      link: 'https://github.com/e-mind/Escuela-Fit',
    },
    {
      title: 'Analizador Léxico',
      description: 'Obtención de un listado de lenguajes de programación.',
      image: 'analyzer.png',
      link: 'https://github.com/FerGv/lexical-analyzer',
    },
    {
      title: 'Biblioteca Virtual',
      description: 'Gestión de contenido multimedia (fotos, videos, imágenes, archivos).',
      image: 'library.png',
      link: 'https://github.com/FerGv/virtual-library',
    },
    {
      title: 'Cafetería',
      description: 'Gestión del inventario de una cafetería.',
      image: 'cafe.jpg',
      link: 'https://github.com/FerGv/SGI',
    },
    {
      title: 'Veterinaria',
      description: 'Gestión de clientes, mascotas (citas e historial) y doctores de una clínica veterinaria.',
      image: 'veterinary-clinic.jpg',
      link: 'https://github.com/FerGv/veterinary-clinic',
    },
  ];

  const nextProject = () => {
    projectIndex = projectIndex + 1;

    if (projectIndex >= projects.length) {
      projectIndex = 0;
    }
  }

  const lastProject = () => {
    projectIndex = projectIndex - 1;

    if (projectIndex < 0) {
      projectIndex = projects.length - 1;
    }
  }
</script>

<section class="py-10 px-5 bg-gray-400">
  <h3 class="font-bold text-3xl text-center border border-black mb-4">
    Proyectos
  </h3>

  <section class="flex">
    <div class="flex flex-col justify-center cursor-pointer hover:bg-gray-200" on:click={lastProject}>
      <i class="fas fa-chevron-left fa-fw text-4xl" />
    </div>

    <ProjectCard
      description={projects[projectIndex].description}
      image={projects[projectIndex].image}
      link={projects[projectIndex].link}
      title={projects[projectIndex].title}
    />

    <div class="flex flex-col justify-center cursor-pointer hover:bg-gray-200" on:click={nextProject}>
      <i class="fas fa-chevron-right fa-fw text-4xl" />
    </div>
  </section>
</section>
