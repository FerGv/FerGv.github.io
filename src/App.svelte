<script>
  // Views
  import About from './views/About.svelte';
  import Experience from './views/Experience.svelte';
  import Footer from './views/Footer.svelte';
  import Header from './views/Header.svelte';
  import Projects from './views/Projects.svelte';
  import Skills from './views/Skills.svelte';

  // Components
  import Language from './components/Language.svelte';
</script>

<main>
  <Language />
  <Header />
  <About />
  <Experience />
  <Projects />
  <Skills />
  <Footer />
  <Language />
</main>
