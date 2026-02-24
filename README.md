# Nexora AI - Landing Page Premium

Este repositorio contiene el código fuente de la landing page para **Nexora AI**, una marca especializada en la fabricación de jerseys moteros, equipación MTB y uniformes empresariales personalizados.

El diseño sigue una estética **Dark Luxury** con colores oscuros (negro y grises profundos) combinados con detalles y luces llamativas en color **Naranja Vibrante** (#F97316).

## 🚀 Características
- Sistema de colores "Dark Luxury Racing" centralizado en variables de CSS.
- **Glassmorphism**: Efectos visuales de tarjetas con vidrio esmerilado que transmiten alta calidad.
- Tarjetas tridimensionales interactivas (*Flip Cards*) en la sección de servicios.
- Partículas flotantes de luz en el inicio.
- Responsivo (Mobile First y escalado hasta Desktop XL).
- Optimizado sin librerías de estilos grandes, escrito en CSS nativo y JS Vanilla para rendimiento óptimo.

## 📁 Estructura del proyecto
- `index.html`: Estructura semántica, enlaces, secciones de navegación.
- `styles.css`: Todos los estilos, variables y animaciones del sitio.
- `script.js`: Efectos de *scroll reveal*, contador animado interactivo, menú para dispositivos móviles, control de tarjetas flip para tabletas y simulador de formulario de contacto.
- `images/`: Recursos visuales generados con IA (Logo, hero, servicios, etc.).

### Imágenes Generadas

1. **`logo.png`**: Logo principal de Nexora AI con estética Racing/Speed.
2. **`hero_visual.png`**: Ilustración principal visual 3D premium.
3. **`service_moto.png`**: Representación alta calidad de jersey tipo motocross.
4. **`service_mtb.png`**: Representación premium de ciclomontañismo de descenso (MTB).
5. **`service_corporate.png`**: Mockup corporativo estilizado con paleta naranja/negro.
6. **`service_custom.png`**: Imagen representativa del proceso de diseño a la medida, materiales y texturas.

## 🛠️ Cómo Inicializar o Visualizar
Simplemente abre el archivo `index.html` en tu navegador para ver la página interactuar en vivo.
Si planeas actualizar el sitio o probarlo desde una URL local, puedes correr un servicio como LiveServer desde VSCode o un simple servidor desde Python:
```bash
python -m http.server 8000
```

## 🎨 Paleta de colores principal
- Fondo principal: `#000000`
- Fondos de Tarjetas: Gradientes basados en `#18181B` y opacidades variables.
- Detalles Primarios / Acentos: Naranja Vibrante `#F97316` (y sus derivados en gradiente).
- Textos: Blanco Puro (`#FFFFFF`) y Grises Claros (`#E4E4E7`).
