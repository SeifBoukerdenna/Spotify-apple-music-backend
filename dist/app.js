"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register"); // Ensure module-alias works in production
const express_1 = __importDefault(require("express"));
const tokenRoutes_1 = __importDefault(require("@/routes/tokenRoutes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Setup routes and other configurations here
app.use("/api", tokenRoutes_1.default);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
exports.default = app;
