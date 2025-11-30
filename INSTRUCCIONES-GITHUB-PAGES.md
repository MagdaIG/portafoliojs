# Cómo subir el Tutorial a GitHub Pages

## Opción 1: Subir todo el portafolio (Recomendado)

Si ya tienes tu repositorio `portafoliojs` en GitHub, simplemente:

1. **Asegúrate de que todos los archivos estén en GitHub:**
   ```bash
   git add .
   git commit -m "Agregar tutorial interactivo de portafolio"
   git push origin main
   ```

2. **Activa GitHub Pages:**
   - Ve a tu repositorio en GitHub
   - Settings → Pages
   - En "Source", selecciona la rama `main` (o `master`)
   - En "Folder", selecciona `/ (root)`
   - Guarda los cambios

3. **Accede a tu tutorial:**
   - Tu portafolio estará en: `https://magdaig.github.io/portafoliojs/`
   - El tutorial estará en: `https://magdaig.github.io/portafoliojs/boceto-portafolio-recetario.html`

## Opción 2: Subir solo el tutorial (Repositorio separado)

Si quieres crear un repositorio separado solo para el tutorial:

1. **Crea un nuevo repositorio en GitHub:**
   - Nombre sugerido: `tutorial-portafolio-pedagogico`

2. **Copia solo el archivo del tutorial:**
   ```bash
   # Crea una carpeta nueva
   mkdir tutorial-portafolio
   cd tutorial-portafolio
   
   # Copia el archivo
   cp ../boceto-portafolio-recetario.html index.html
   
   # Inicializa git
   git init
   git add index.html
   git commit -m "Tutorial interactivo de portafolio pedagógico"
   
   # Conecta con GitHub (reemplaza USERNAME con tu usuario)
   git remote add origin https://github.com/USERNAME/tutorial-portafolio-pedagogico.git
   git branch -M main
   git push -u origin main
   ```

3. **Activa GitHub Pages:**
   - Ve a Settings → Pages
   - Selecciona la rama `main` y carpeta `/ (root)`
   - Guarda

4. **Tu tutorial estará en:**
   - `https://USERNAME.github.io/tutorial-portafolio-pedagogico/`

## Verificar que funciona

Después de activar GitHub Pages, espera unos minutos y verifica:
- Que el archivo HTML se carga correctamente
- Que los efectos de fondo (bombillas, partículas) funcionan
- Que la navegación entre pantallas funciona
- Que el diseño responsive se ve bien en móvil

## Notas importantes

- GitHub Pages puede tardar 1-5 minutos en actualizar los cambios
- Si usas rutas relativas (como `assets/css/styles.css`), asegúrate de que todos los archivos estén en el repositorio
- El tutorial es un archivo HTML standalone, no necesita servidor backend

