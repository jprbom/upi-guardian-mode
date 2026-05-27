# Architecture

UPI Guardian Mode uses React for the dashboard and Express for API services. The API enforces RBAC, validates requests, persists synthetic data in JSON, and calls a pure TypeScript domain engine.

## Runtime Ports

- Backend: 4104
- Frontend dev server: 5174
- Frontend preview server: 5104

