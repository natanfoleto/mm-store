exports.build = async function (response) {
  if (typeof response.errno === "number") {
    return error(response);
  }

  if (response !== undefined) {
    return success(response);
  }
}

async function success(success) {
  return new Promise(async (resolve, reject) => {
    try {
      return resolve({
        result: 'success',
        sql: success
      });
    } catch (err) {
      reject(err);
    }
  });
}

async function error(erro) {
  return new Promise(async (resolve, reject) => {
    try {
      let errno;

      if (typeof (erro.errno)) {
        errno = erro.errno;
      }

      resolve({
        result: 'error',
        errno
      });
    } catch (err) {
      reject(err);
    }
  });
}