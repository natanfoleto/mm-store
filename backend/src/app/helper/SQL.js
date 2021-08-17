export default async function build (response) {
  if (typeof response.errno === 'number') {
    return error(response)
  }

  if (response !== undefined) {
    return success(response)
  }
}

async function success (success) {
  try {
    return {
      result: 'success',
      sql: success
    }
  } catch (err) {
    return err
  }
}

async function error (erro) {
  try {
    let errno

    // eslint-disable-next-line no-constant-condition
    if (typeof (erro.errno)) {
      errno = erro.errno
    }

    return {
      result: 'error',
      errno,
      description: erro.toString()
    }
  } catch (err) {
    return err
  }
}
