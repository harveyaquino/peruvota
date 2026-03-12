# 🗳️ PerúVota 2026

App de cartas coleccionables para comparar candidatos presidenciales del Perú — Elecciones Generales 12 de Abril 2026.

## 🚀 Deploy rápido

### 1. Clona y entra al proyecto
```powershell
cd peru-vota
npm install
```

### 2. Configura tu API key de Claude
Crea un archivo `.env` en la raíz del proyecto:
```
REACT_APP_ANTHROPIC_API_KEY=sk-ant-...tu-key...
```

### 3. Corre en local
```powershell
npm start
```

### 4. Sube a GitHub
```powershell
git init
git add .
git commit -m "feat: PeruVota 2026 inicial"
git remote add origin https://github.com/TU_USUARIO/peru-vota.git
git push -u origin main
```

### 5. Deploy en Vercel
1. Ve a [vercel.com](https://vercel.com) → New Project
2. Importa tu repo de GitHub
3. En **Environment Variables** agrega:
   - `REACT_APP_ANTHROPIC_API_KEY` = tu API key
4. Click Deploy ✅

## 🃏 Features
- Cartas coleccionables tipo Panini de 6 candidatos principales
- Flip card con stats y propuestas por tema
- Comparador de hasta 3 candidatos lado a lado
- Análisis IA con Claude en tiempo real
- Pantalla de resultado compartible por WhatsApp
- Mobile-first, responsive

## 📊 Temas comparados
- 💰 Economía
- 🛡️ Seguridad
- 📚 Educación
- 🏥 Salud
- ⚖️ Anti-Corrupción
- 🌿 Medio Ambiente

## ⚠️ Disclaimer
Contenido educativo basado en propuestas públicas. No afiliado a ningún partido político.
