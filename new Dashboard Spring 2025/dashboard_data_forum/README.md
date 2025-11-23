# Sketches

## Sentiment & Grade Prediction Dashboard

This is a React dashboard app for visualizing sentiment analysis results and ridge regression predictions on educational forum data.

---

### Features

- **Sentiment Analysis Dashboard**
  - Showcases precomputed sentiment results for example sentences.
  - Interactive dropdown to analyze sentiment of selected sentences.

- **Grade Prediction Dashboard**
  - Visualizes regression coefficients and actual vs. predicted grades.
  - Predicts grades using Gradient Boost based on forum activity features.

- **Routing**
  - Built with React Router for multi-page navigation.

---

### Project Structure

```
app/
  routes/
    home.tsx
    sentiment.tsx
    GradePrediction.tsx
  data/
    (local data files, e.g. exampleData.ts)
  routes.ts
public/
  data/
    (static assets, e.g. .json or .csv files)
  ...
.react-router/
  types/
    app/
      routes/
        +types/
          (type definitions for route files)
```

---

### Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Open your browser:**  
   Visit [http://localhost:3000](http://localhost:3000) (or the port shown in your terminal).

---

### Adding Data

- Place TypeScript/JS data files in `app/data/`.
- For static assets (JSON/CSV), use `public/data/`.
- Import your data in route components as needed:
  ```ts
  import { exampleData } from "~/data/exampleData";
  ```

---

### Customization

- Edit `app/routes/sentiment.tsx` to change sentiment examples or logic.
- Edit `app/routes/ridgeRegression.tsx` or `app/routes/GradePrediction.tsx` to update regression features or data.
- Update type definitions in `.react-router/types/app/routes/+types/` if you change route exports or props.

---

### Tech Stack

- [React](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Recharts](https://recharts.org/) (for charts)
- [ml-matrix](https://github.com/mljs/matrix) (for regression math)

---

### License

MIT

---

*Created for educational data analysis and dashboarding.*