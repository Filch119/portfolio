# React Bits implementation notes

The React Bits carousel docs are at https://reactbits.dev/components/carousel. The documented carousel accepts `items`, `baseWidth`, `autoplay`, `autoplayDelay`, `pauseOnHover`, `loop`, and `round`; each item includes `title`, `description`, `id`, and `icon`. The component is intended to be copied into the project and rendered like a normal React component.

The installation guidance is at https://reactbits.dev/get-started/installation. React Bits uses a copy-the-source workflow, with a CLI available as an alternative. For this revision, the portfolio will use the carousel pattern in a local component with project-specific data and a monochrome presentation, plus native CSS scroll-snap and accessible controls so it remains lightweight and avoids nested card surfaces.

Reference direction: sparse black background, small top navigation, compact profile header, low-contrast dividers, one prominent activity/content region, and a simple closing contact line. The redesign should keep the requested portfolio categories but present them as flat rows and sections instead of stacking cards.

## Dark Quiet reference evidence

The direct reference URL is https://unslop.site/reference/dark-quiet. The supplied HTML export identifies the reference canvas as `rgb(16, 16, 18)` with primary text `rgb(236, 236, 234)`, using Inter Tight. It uses generous outer margins around 46px, thin low-contrast borders, small uppercase tracking for navigation and metadata, sparse density, and a quiet radial light field placed behind content. The adapted portfolio follows these principles with a near-black canvas, restrained gray rules, compact profile header, generous vertical spacing, and a low-opacity React Bits particle field rather than reproducing the sample brand or copy.
