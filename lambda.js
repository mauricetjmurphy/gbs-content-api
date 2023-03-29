import app from "./src/app.js";

import serverless from "serverless-http";

export const handler = serverless(app);

// const port = process.env.PORT || 4000;

// app.listen(port, () => {
//   console.log(`App listening at http://localhost:${port}`);
// });
