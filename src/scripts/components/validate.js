
export const formValidator = (function () {
    // локальные переменные, они не видны снаружи
    const data = [];

    // публичные методы, они будут доступны в объекте Chart
    return {
        render: function (data) { /* ... */ },
        setData: function (data) { /* ... */ }
    };
}()); // IIFE возвращает объект

