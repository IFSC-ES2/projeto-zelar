import "./database";
import { sequelize } from "./database/connection";
import app from "./app";

const PORT = process.env.PORT ?? 8000;

sequelize
  .authenticate()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err: Error) => {
    console.error(`\n❌ ${err.message}\n`);
    process.exit(1);
  });
