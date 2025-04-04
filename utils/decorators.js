// utils/executionTimer.js
function executionTimer(fn, name = fn.name || "función") {
  return async function (...args) {
    const start = Date.now();
    const result = await fn(...args);
    const duration = Date.now() - start;
    console.log(`⏱️ Tiempo de ejecución de ${name}: ${duration}ms`);
    return result;
  };
}

module.exports = executionTimer;
