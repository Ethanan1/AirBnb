
const newError = (status, message, errors) => {
    const err = new Error();
    err.status = status;
    err.message = message;
    err.errors = errors;

    return err;
}

module.exports = newError;